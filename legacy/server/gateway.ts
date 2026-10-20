import { resumeValidation } from "@/lib/validations/careers";

/**
 * Forward a form submission to the API gateway.
 *
 * The storefront used to handle these itself, which meant this Next.js app held the SMTP password,
 * the Turnstile secret, and credentials for its own Redis account that it rate-limited against.
 * None of those belong in a frontend, and the second cache broke the rule that there is exactly
 * one Redis in the platform, owned by the API services.
 *
 * So the route handlers became this: the frontend talks to the gateway, the gateway enforces its
 * per-IP rate limits and proxies to cerberus, and cerberus owns mail, Turnstile and the cache.
 *
 * The body is forwarded as raw bytes rather than re-serialized JSON, because the careers form is
 * multipart and re-encoding it would lose the boundary the resume part is delimited by. Passing
 * `content-type` through unchanged is what makes that work.
 */

/**
 * Server-to-server base URL for the gateway.
 *
 * `GATEWAY_INTERNAL_URL` lets production point at an internal address that never leaves the
 * cluster; it falls back to the public URL the browser-side auth client already uses.
 */
export const GATEWAY_URL =
  process.env.GATEWAY_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function forwardToGateway(request: Request, path: string): Promise<Response> {
  const body = await request.arrayBuffer();
  const contentType = request.headers.get("content-type");

  // The gateway rate-limits per client IP, and from its point of view the client is this server.
  // Passing the chain along means the limit applies to the actual visitor.
  const forwardedFor = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip");

  try {
    const response = await fetch(`${GATEWAY_URL}/api/v1${path}`, {
      method: "POST",
      headers: {
        ...(contentType ? { "content-type": contentType } : {}),
        ...(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
      },
      body,
    });

    /*
     * A body the gateway refuses outright never reaches cerberus, so it answers in its own words
     * ("Request body is too large") rather than the form's. Only the careers form can produce this
     * -- it is the only one that uploads anything -- and the size it is really about is the resume.
     */
    if (response.status === 413) {
      return Response.json(
        { error: `Resume file size must be less than ${resumeValidation.maxSizeMB}MB` },
        { status: 413 },
      );
    }

    const text = await response.text();
    if (response.ok) {
      return new Response(text, {
        status: response.status,
        headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
      });
    }

    /*
     * Flatten the API's error envelope into the shape the form components already read.
     *
     * The API answers `{ success: false, error: { code, message, details } }`, while these forms
     * were written against the flat `{ error: "...", details: { field: "..." } }` the storefront
     * used to return itself -- they render `data.error` as the message and `data.details.email`
     * under the input. Translating here keeps that contract, so moving the handlers to the backend
     * changed no component code and no message a user sees.
     */
    try {
      const payload = JSON.parse(text) as {
        error?: { message?: string; details?: Record<string, unknown> } | string;
        message?: string;
      };
      const envelope = typeof payload.error === "object" && payload.error !== null ? payload.error : null;
      const details = envelope?.details;
      // `retryAfter` rides inside details over the wire, but the forms expect it top-level.
      const retryAfter = details && typeof details.retryAfter === "number" ? details.retryAfter : undefined;

      return Response.json(
        {
          error:
            envelope?.message ??
            (typeof payload.error === "string" ? payload.error : undefined) ??
            payload.message ??
            "Something went wrong. Please try again.",
          ...(details && retryAfter === undefined ? { details } : {}),
          ...(retryAfter !== undefined ? { retryAfter } : {}),
        },
        { status: response.status },
      );
    } catch {
      // Not JSON (a proxy error page, say). Give the forms something they can display.
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error(`Gateway request to ${path} failed:`, error);
    return Response.json(
      { error: "Service temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }
}
