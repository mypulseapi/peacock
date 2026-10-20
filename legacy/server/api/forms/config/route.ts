import { GATEWAY_URL } from "@/lib/gateway";

/**
 * Public config for the marketing forms, fetched from the backend rather than held here.
 *
 * Same-origin so the browser needs no CORS preflight and never learns the gateway's address.
 * The only value today is the Turnstile site key, which used to be a NEXT_PUBLIC_* variable in
 * this app -- inlined at build time, and kept in step with cerberus's secret by hand.
 */
/*
 * Resolved at request time, never at build time.
 *
 * With `revalidate` set, Next fetched this during the build and wrote the backend's response into
 * .next/server as a baked artifact -- which puts the key back into the storefront's build output,
 * the exact thing moving it to the backend was meant to stop. (It never reached the browser
 * bundle, but a build-time copy still has to be rebuilt to rotate.)
 *
 * Freshness costs nothing here: the browser caches the response for five minutes via the header
 * below, and the widget fetches it once per page load however many forms are on the page.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(`${GATEWAY_URL}/api/v1/public/forms/config`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Form config fetch failed: HTTP ${response.status}`);
      return Response.json({ turnstileSiteKey: null }, { status: 200 });
    }

    return Response.json(await response.json(), {
      headers: { "cache-control": "public, max-age=300" },
    });
  } catch (error) {
    /*
     * Answer 200 with a null key rather than an error.
     *
     * The widget treats null as "no challenge configured" and renders nothing, which is exactly
     * how this app behaved when the variable was unset. Returning an error instead would leave
     * the forms stuck on a loading state.
     */
    console.error("Form config fetch failed:", error);
    return Response.json({ turnstileSiteKey: null }, { status: 200 });
  }
}
