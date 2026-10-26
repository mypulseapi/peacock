import { DEFAULT_LOCALE } from "@/i18n/locales";
import { SITE } from "@/lib/site";

/** The redirect document itself, shared by every locale-less URL that has to resolve. */
export function RedirectDocument({ target }: { target: string }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      {/* A whole document on purpose: these redirect pages render their own <html> (see app/page.tsx). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
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
