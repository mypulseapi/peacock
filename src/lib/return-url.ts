import { SITE } from "./site";

/**
 * Where to send a merchant after sign-in: the page they asked for, if it is on the merchant
 * dashboard, and the dashboard's own default otherwise (website sign-in FR-08, D-WSI-09).
 *
 * The dashboard sends signed-out visitors here with an absolute `?redirect=https://app.../path`,
 * and a bare path is accepted too. Anything whose origin is not the dashboard's falls back:
 * `//evil.com`, `javascript:`, `https://app.thepulseapi.com.evil.com`, and every other
 * `thepulseapi.com` subdomain. Comparing parsed origins, never prefixes, is what makes those safe.
 */
export function safeReturnUrl(raw: string | null | undefined, app: string = SITE.app): string {
  if (!raw) return app;
  try {
    const home = new URL(app);
    const url = new URL(raw, home);
    return url.origin === home.origin ? url.href : app;
  } catch {
    return app;
  }
}
