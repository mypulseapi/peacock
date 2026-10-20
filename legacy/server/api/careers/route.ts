import { forwardToGateway } from "@/lib/gateway";

/**
 * careers form, proxied to the gateway.
 *
 * The handling (validation, rate limiting, Turnstile, mail) lives in cerberus now. This stays only
 * so the client keeps posting to a same-origin path, which avoids a CORS preflight on every
 * submission and keeps the gateway's address out of the browser.
 */
export async function POST(request: Request) {
  return forwardToGateway(request, "/public/forms/careers");
}
