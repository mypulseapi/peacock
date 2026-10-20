import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Static export, for GitHub Pages.
 *
 * `output: "export"` writes a plain tree of HTML, CSS and JS into `out/`. There is no Node at the
 * other end, which removes three things this config used to do and one thing the app used to do:
 *
 *   - **`headers()` is gone.** Not disabled, unsupported: `next build` refuses to run with both
 *     `output: "export"` and a `headers()` function. Every security header it set is now the
 *     host's business, and GitHub Pages does not let you set response headers at all. See below
 *     for what survives and what does not, because this is a real reduction and not a tidy-up.
 *   - **Route handlers are gone.** They were pure proxies to the gateway; `src/lib/forms.ts` posts
 *     to it directly now. See `legacy/README.md`.
 *   - **Middleware is gone**, so `/` is a static redirect document (`src/app/page.tsx`) rather
 *     than next-intl's 302.
 *   - **The R2 `assetPrefix` is gone.** It existed to serve `_next/static` from the CDN on Vercel.
 *     Pages serves those itself. Images are unaffected: they still come from the CDN through
 *     `img()`, which reads `NEXT_PUBLIC_CDN_URL`.
 *
 * What is NOT lost: `generateStaticParams` already covered every dynamic route, both locales
 * prerender, and the sitemap and robots metadata routes export as files.
 *
 * ## The headers, one by one
 *
 * GitHub Pages sends `Strict-Transport-Security` itself once "Enforce HTTPS" is enabled on the
 * custom domain, and sets `X-Content-Type-Options: nosniff`. Those two survive the move without
 * us doing anything.
 *
 * The Content-Security-Policy is reduced rather than kept. A `<meta http-equiv>` CSP works for
 * `script-src`, `style-src`, `img-src`, `connect-src` and `font-src`, which is most of it, and it
 * is set in `[locale]/layout.tsx` so it travels with the document. It cannot express
 * `frame-ancestors`, `X-Frame-Options` or `Permissions-Policy`: those are response headers by
 * specification and a meta tag is ignored for them. So this site is framable by anyone, where it
 * was `DENY` before.
 *
 * That is the honest cost of the host. It is acceptable here only because this is a marketing site
 * with no authenticated session and nothing worth clickjacking: the dashboard is a separate origin
 * and keeps its own headers. If a signed-in surface ever lands on this origin it needs a host that
 * can set headers, and that is a hosting decision rather than a config one.
 */
const nextConfig: NextConfig = {
  output: "export",

  images: {
    // Required by `output: "export"`: there is no server to run the optimizer on request. This was
    // already true for a different reason (the assets are pre-sized WebP on the CDN and the
    // account's optimization quota is exhausted), so nothing changes in what is served.
    unoptimized: true,
  },

  /*
   * Fail the build on a type error rather than shipping it.
   *
   * Stated explicitly because a static export has no runtime to catch anything later: whatever
   * lands in `out/` is what visitors get until someone pushes again. There is no matching `eslint`
   * key: Next 16 removed it, and lint runs as its own step in CI.
   */
  typescript: { ignoreBuildErrors: false },
};

export default withNextIntl(nextConfig);
