import { resumeValidation } from "@/lib/validations/careers";
import { apiUrl } from "@/lib/site";

/**
 * Public form submission, straight from the browser to the gateway.
 *
 * This used to be four Next route handlers that forwarded to the same endpoints. They existed so
 * the browser posted same-origin: no CORS preflight, and the gateway's address stayed out of the
 * page. Static hosting has no server to run them, so the preflight and the visible gateway origin
 * are the price of the move, and the gateway needs this site's origin in its CORS allow-list or
 * every form fails in the browser with nothing in any server log.
 *
 * One thing improves. The old handler forwarded `x-forwarded-for` so the gateway's per-IP rate
 * limit applied to the visitor rather than to the storefront, which was a workaround for the
 * storefront being the client. Now the visitor really is the client, so the limit lands on the
 * right address without being told.
 *
 * The error envelope is flattened here for the same reason `gateway.ts` flattened it: the forms
 * read `data.error` for the message and `data.details.email` under the input, and the API answers
 * `{ success, error: { code, message, details } }`. Translating keeps every form component and
 * every message a visitor sees exactly as it was.
 */

export interface FormError {
  error: string;
  /** Per-field messages, keyed by input name. The forms render these under the input. */
  details?: Record<string, string>;
  retryAfter?: number;
}

export interface FormResult {
  ok: boolean;
  status: number;
  data: FormError;
}

const GENERIC = "Something went wrong. Please try again.";

/**
 * `name` is the endpoint segment: "contact", "newsletter" or "careers".
 *
 * A plain object is sent as JSON; FormData is sent as multipart. The content-type is set by hand
 * only for JSON, because FormData generates its own with the boundary the file part is delimited
 * by, and setting that header manually drops the boundary and breaks the upload.
 */
export async function postForm(
  name: string,
  body: FormData | Record<string, unknown>,
): Promise<FormResult> {
  const isMultipart = typeof FormData !== "undefined" && body instanceof FormData;
  let response: Response;
  try {
    response = await fetch(apiUrl(`/public/forms/${name}`), {
      method: "POST",
      ...(isMultipart ? {} : { headers: { "Content-Type": "application/json" } }),
      body: isMultipart ? body : JSON.stringify(body),
    });
  } catch {
    // Network failure, DNS, or a CORS rejection. The browser does not say which.
    return { ok: false, status: 0, data: { error: "Service temporarily unavailable. Please try again." } };
  }

  // Only the careers form uploads anything, so this is always really about the resume. The gateway
  // refuses an oversized body before cerberus sees it and answers in its own words.
  if (response.status === 413) {
    return {
      ok: false,
      status: 413,
      data: { error: `Resume file size must be less than ${resumeValidation.maxSizeMB}MB` },
    };
  }

  const text = await response.text();
  if (response.ok) {
    try {
      return { ok: true, status: response.status, data: JSON.parse(text) };
    } catch {
      return { ok: true, status: response.status, data: { error: "" } };
    }
  }

  try {
    const payload = JSON.parse(text) as {
      error?: { message?: string; details?: Record<string, unknown> } | string;
      message?: string;
    };
    const envelope =
      typeof payload.error === "object" && payload.error !== null ? payload.error : null;
    const raw = envelope?.details;

    // `retryAfter` rides inside details over the wire, but the forms expect it top-level.
    const retryAfter = typeof raw?.retryAfter === "number" ? raw.retryAfter : undefined;

    // Everything else in details is a per-field message. Anything that is not a string is dropped
    // rather than coerced, because it would be rendered straight into the form as "[object Object]".
    const details = raw
      ? Object.fromEntries(
          Object.entries(raw).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
        )
      : undefined;
    const hasDetails = details !== undefined && Object.keys(details).length > 0;

    return {
      ok: false,
      status: response.status,
      data: {
        error:
          envelope?.message ??
          (typeof payload.error === "string" ? payload.error : undefined) ??
          payload.message ??
          GENERIC,
        ...(hasDetails && retryAfter === undefined ? { details } : {}),
        ...(retryAfter !== undefined ? { retryAfter } : {}),
      },
    };
  } catch {
    // Not JSON (a proxy error page, say). Give the forms something they can display.
    return { ok: false, status: response.status, data: { error: GENERIC } };
  }
}

/**
 * Public config for the forms. The only value today is the Turnstile site key, which is held by
 * cerberus so it can be rotated without rebuilding this site.
 *
 * A failure answers `null` rather than throwing, because the widget treats null as "no challenge
 * configured" and renders nothing. An error would leave the form stuck on a loading state.
 */
export async function fetchFormConfig(): Promise<{ turnstileSiteKey: string | null }> {
  try {
    const response = await fetch(apiUrl("/public/forms/config"), { cache: "no-store" });
    if (!response.ok) return { turnstileSiteKey: null };
    return await response.json();
  } catch {
    return { turnstileSiteKey: null };
  }
}
