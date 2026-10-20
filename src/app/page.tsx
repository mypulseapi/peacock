import { DEFAULT_LOCALE } from "@/i18n/locales";
import { SITE } from "@/lib/site";

/**
 * The bare `/` URL.
 *
 * `localePrefix` is "always", so there is no page at the root: every real page lives under a
 * locale. On a server this redirect was next-intl's middleware. A static export has no middleware
 * and no way to emit a 302, so the redirect has to be a document that performs it in the browser.
 *
 * Three mechanisms, because each covers a reader the others miss:
 *
 *   - `<meta http-equiv="refresh" content="0;url=...">` is what a crawler reads. Google treats an
 *     instant meta refresh as a permanent redirect and passes ranking signals through it. It needs
 *     no JavaScript.
 *   - `location.replace` runs first in a real browser and leaves no history entry, so Back from
 *     the homepage returns to wherever the visitor came from rather than bouncing through here.
 *   - A plain link, for anyone the first two fail: a text browser, a reader with JavaScript off
 *     and meta refresh disabled. A redirect page with no visible link is a dead end for them.
 *
 * `rel="canonical"` names the destination so the root URL never competes with it in an index.
 *
 * This is the only page in the app that renders its own `<html>`. It can, because the root layout
 * is a pass-through: `[locale]/layout.tsx` is what wraps every other page in a document.
 */
export default function RootRedirect() {
  const target = `/${DEFAULT_LOCALE}`;

  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content={`0;url=${target}`} />
        <link rel="canonical" href={`${SITE.www}${target}`} />
        {/* Nothing here should be indexed in its own right; the destination carries the content. */}
        <meta name="robots" content="noindex, follow" />
        <title>Pulse</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)} + location.search + location.hash)`,
          }}
        />
      </head>
      <body>
        <a href={target}>Continue to Pulse</a>
      </body>
    </html>
  );
}
