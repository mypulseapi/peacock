import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { THEME_SCRIPT } from "@/lib/theme-script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { NavigationProgress } from "@/components/NavigationProgress";
import { PulseAnalytics } from "@/components/PulseAnalytics";
import { IntentPanel } from "@/components/IntentPanel";
import { IconSprite } from "@/components/designed/icon-sprite";
import {
  DesignedFooter,
  DesignedHeader,
  DesignedSkipLink,
} from "@/components/designed/shell";
import { DesignedMotion } from "@/components/designed/motion";

// The typeface, for body and headings alike. Inter above is only the fallback in
// the stack: globals.css sets `--font-sans: var(--font-jakarta)` and every
// font-family rule lists jakarta first.
// Monospace for code/terminal panels.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.www),
  title: {
    // Descriptive first, brand last, matching every other page rather than
    // inverting the pattern on the one page that gets the most traffic.
    default: "Know which product data to fix first | Pulse",
    template: "%s | Pulse",
  },
  description:
    "PULSE measures whether a merchant's product data is ready to support the buying decisions their shoppers are trying to make, ranked, in their own catalogue, in 48 hours. Then it reads the live session to decide what to show, and when one more question is worth asking.",
  keywords: [
    "personalization",
    "AI",
    "inference engine",
    "real-time",
    "persona",
    "catalogue enrichment",
    "product data quality",
    "decision audit",
    "value of information",
    "guided selling",
    "e-commerce personalization",
    "behavioral inference",
    "recommendation engine",
    "product discovery",
    "privacy-first personalization",
    "cookieless personalization",
    "user engagement",
    "machine learning",
    "B2B SaaS",
  ],
  authors: [{ name: "Pulse" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.www,
    siteName: "Pulse",
    title: "Pulse | Decide what to show, and when to ask",
    description:
      "Is your product data ready to support the decisions shoppers are trying to make? Measured on your own catalogue in 48 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse | Decide what to show, and when to ask",
    description:
      "Is your product data ready to support the decisions shoppers are trying to make? Measured on your own catalogue in 48 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Built from the declared origins rather than written out, so adding a service to `SITE` cannot
 * leave it blocked by a policy nobody remembered to edit.
 */
const CSP = [
  "default-src 'self'",
  /*
   * `'unsafe-eval'` in development only.
   *
   * Next's dev runtime compiles with eval, so without it HMR dies and the console fills with
   * "eval() is not supported in this environment". It is never emitted in a production build --
   * the old header-based CSP made the same exception for the same reason, and it was lost in the
   * move to a meta tag.
   */
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.unsplash.com ${SITE.cdn}`,
  "font-src 'self' data:",
  // Deduped: auth and api are usually the same host, and a repeated origin in a CSP is noise
  // that makes a real one harder to spot when something is blocked.
  `connect-src 'self' ${[...new Set([SITE.api, SITE.auth, SITE.cdn])].join(' ')}`,
  "base-uri 'self'",
  // The forms post to the gateway now, so it has to be allowed as a form target.
  `form-action 'self' ${SITE.api}`,
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale.
  //
  // The locale is passed explicitly rather than left to `setRequestLocale` above. Without it
  // next-intl resolves `requestLocale` from `headers()`, and a static export has no request:
  // every page then fails to prerender with `dynamic = "error"`, naming headers() and not this.
  const messages = await getMessages({ locale });

  /*
   * The designer's shell is English-only markup, like the page bodies it wraps. One flag so the
   * two can never disagree about which half of the site a visitor is on.
   */
  const designed = locale === "en";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        {/*
            The Content-Security-Policy, as a meta tag rather than a response header.
            GitHub Pages serves files and sets no custom headers, so the only CSP this site can
            carry is one inside the document. See next.config.ts for the full accounting; in
            short, `frame-ancestors` and `Permissions-Policy` are header-only by specification and
            do not survive the move, so this site is now framable where it was DENY.
            What it still covers is the one that matters most, script-src.

            `'unsafe-inline'` stays in script-src, measured rather than lazy: App Router streaming
            emits around twenty inline `__next_f.push(...)` bootstrap scripts per page, different
            on every page, so no set of hashes can cover them. A strict policy blocks the payload
            and the page dies with React #412. It stays in style-src because this codebase styles
            with the React `style` prop in hundreds of places, and every one of those is an inline
            style attribute.

            The origins are interpolated from SITE so this policy cannot drift from what the app
            actually talks to -- the failure mode of a hand-maintained list is a blocked fetch in
            production and a green build. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={CSP}
        />
        {/* Shared with src/lib/theme-script.ts: why it is inline, and why that is survivable. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* No JSON-LD here, deliberately. The standard requires exactly one ld+json block per
            document holding a single @graph, because nodes in separate blocks cannot reference
            each other by @id. A layout cannot know the page's own nodes, so the whole graph is
            built per page through <PageSchema />. See src/lib/schema.ts. */}
      </head>
      <body className={`antialiased min-h-screen${designed ? "" : " legacy-ui bg-grid"}`}>
        {/*
            `locale` is passed explicitly. Without it next-intl resolves the locale on the server
            through `getLocale()`, which reads the request config and ends at `headers()`. A
            static export has no request, so every page in the site failed to prerender -- and the
            error names headers() rather than this line, which is why it reads as 139 unrelated
            failures instead of one. */}
        {/* 41 symbols, defined once. Every designed page references them by `<use href="#i-...">`,
            so this has to be in the document before any of them render. */}
        <IconSprite />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            {/*
                English gets the designer's shell; Vietnamese keeps the app's own.

                The page converter reads <main> only, so the shell was never part of it: the
                converted bodies rendered inside this app's dark navbar and footer while being
                the designer's light design themselves. That mismatch is most of why the rebuild
                looked nothing like staging even once the pages were faithful.

                Vietnamese stays on Navbar and Footer because those are translated and the
                designer's shell is English markup, the same reason the page bodies split.
            */}
            {designed ? <DesignedSkipLink /> : null}
            {designed ? <DesignedHeader /> : <Navbar />}
            <main id="main">{children}</main>
            {/* B4: ordered by what this visit has not answered. Renders nothing when nothing is. */}
            <Suspense fallback={null}></Suspense>
            {designed ? <DesignedFooter /> : <Footer />}
            {/* Ask Pulse, on every page and in both languages. This replaces the designer's
                static chat shell from chat.html, which had the panel but nothing behind it. */}
            <AssistantPanel lang={locale === "vi" ? "vi" : "en"} />
            {/* The motion the designer's markup declares through data attributes. Without it every
                `.reveal` stays at opacity 0, which is 363 elements across the converted pages. */}
            {designed ? <DesignedMotion /> : null}
            {/* B6: shows the inference and lets the visitor correct it. */}
            <Suspense fallback={null}>
              <IntentPanel />
            </Suspense>
            {/* B1: the site emits. Renders nothing when unconfigured. */}
            <Suspense fallback={null}>
              <PulseAnalytics />
            </Suspense>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
