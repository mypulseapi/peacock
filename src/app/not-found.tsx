import "./globals.css";
import { THEME_SCRIPT } from "@/lib/theme-script";
import { setRenderLocale } from "@/i18n/render-locale";
import { ThemeProvider } from "@/context/ThemeContext";
import { IconSprite } from "@/components/designed/icon-sprite";
import {
  DesignedFooter,
  DesignedHeader,
  DesignedSkipLink,
} from "@/components/designed/shell";
import { DesignedNotFound } from "@/components/designed/not-found";

/*
 * Pages serves /en as en.html, so /en/ (a real page typed with a trailing slash) lands here.
 * Drop the slash and load the real page. A path that is missing either way comes back here
 * without the slash and stops, so a mistyped URL still shows the 404 below.
 */
const TRAILING_SLASH = `(function(){var p=location.pathname;if(p.length>1&&p.slice(-1)==='/'){location.replace(p.slice(0,-1)+location.search+location.hash)}})();`;

// The 404.html GitHub Pages serves for every missing path, with a 404 status. It sits outside
// [locale], so it renders the designed shell itself, in English: one file serves both locales.
export default function RootNotFound() {
  setRenderLocale("en");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TRAILING_SLASH }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased min-h-screen">
        <IconSprite />
        <ThemeProvider>
          <DesignedSkipLink />
          <DesignedHeader />
          <main id="main">
            <DesignedNotFound />
          </main>
          <DesignedFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
