/**
 * Every origin this site points at, declared once and read from the environment.
 *
 * The rule is that no production URL is written into a component, a piece of
 * content, or a JSON-LD block. Before this file there were seventeen copies of
 * "https://thepulseapi.com" across nine files, which is how `metadataBase`, the
 * sitemap and the Organization node can disagree about what this site is called
 * without anything failing.
 *
 * Defaults here are localhost and nothing else, on purpose. A default that is a
 * real production host is indistinguishable from a hardcoded one: it keeps
 * working when the variable is missing, so the variable never gets set and the
 * deploy quietly ships somebody else's domain. Instead a production build with
 * a missing variable throws, naming the variable, and CI stops.
 *
 * `NEXT_PUBLIC_*` values are inlined at build time, so these must be present when
 * `next build` runs, not when the page is served. On GitHub Pages there is no
 * runtime to read them later.
 */

const DEV_FALLBACKS = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3003",
  NEXT_PUBLIC_DOCS_URL: "http://localhost:3004",
  NEXT_PUBLIC_APP_URL: "http://localhost:3002",
  NEXT_PUBLIC_API_URL: "http://localhost:4000",
  NEXT_PUBLIC_CDN_URL: "http://localhost:3003",
  NEXT_PUBLIC_DEMO_URL: "http://localhost:3000",
  NEXT_PUBLIC_AUTH_URL: "http://localhost:4005",
} as const;

type Key = keyof typeof DEV_FALLBACKS;

/** Trailing slashes are stripped so `${SITE.www}/en/contact` never doubles up. */
const trimEnd = (value: string) => value.replace(/\/+$/, "");

function origin(key: Key, raw: string | undefined): string {
  const value = (raw ?? "").trim();
  if (value !== "") return trimEnd(value);

  // `next build` runs with NODE_ENV=production, which is exactly when a missing
  // origin would be baked into every page as a localhost link.
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `${key} is not set. Every public origin must be declared in the environment; ` +
        `see .env.example. Production builds do not fall back to a default.`,
    );
  }
  return DEV_FALLBACKS[key];
}

/*
 * Each value is read as a separate literal `process.env.X` expression rather than
 * through a loop. Next replaces `process.env.NEXT_PUBLIC_X` textually at build
 * time, so a computed lookup like `process.env[key]` is never substituted and
 * arrives in the browser as undefined.
 */
export const SITE = {
  /** The marketing site: this app. */
  www: origin("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
  /** The developer handbook, a separate deployment. */
  docs: origin("NEXT_PUBLIC_DOCS_URL", process.env.NEXT_PUBLIC_DOCS_URL),
  /** The merchant dashboard, where an account and an API key are created. */
  app: origin("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL),
  /** The public API gateway. Forms post here directly; there is no server to proxy through. */
  api: origin("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL),
  /** Asset CDN. Images stay here rather than in the repository. */
  cdn: origin("NEXT_PUBLIC_CDN_URL", process.env.NEXT_PUBLIC_CDN_URL),
  /** The interactive demo storefront. */
  demo: origin("NEXT_PUBLIC_DEMO_URL", process.env.NEXT_PUBLIC_DEMO_URL),
  /** The auth service, which owns the session cookie and is not this origin. */
  auth: origin("NEXT_PUBLIC_AUTH_URL", process.env.NEXT_PUBLIC_AUTH_URL),
} as const;

/** Paths on the dashboard that the site deep-links to. */
export const APP_PATHS = {
  // Merchant sign-in lives in the dashboard: one page, Create account a mode of it.
  signIn: process.env.NEXT_PUBLIC_APP_SIGNIN_PATH || "/sign-in",
  signUp: process.env.NEXT_PUBLIC_APP_SIGNUP_PATH || "/sign-in?mode=create",
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY_PATH || "/settings/api",
} as const;

/** The API's version prefix, on its own so a page can show the URL's parts separately. */
export const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/v1";

/** The browser SDK, versioned by a path so a release does not need a code change. */
export const SDK_SRC = `${SITE.cdn}${process.env.NEXT_PUBLIC_SDK_PATH || "/sdk/v0/pulse.iife.js"}`;

/** Absolute URL on the marketing site, for canonicals and structured data. */
export const url = (path = "/") =>
  `${SITE.www}${path.startsWith("/") ? path : `/${path}`}`;

/** Absolute URL on the dashboard. `appUrl(APP_PATHS.apiKey)` is the API key screen. */
export const appUrl = (path = "/") =>
  `${SITE.app}${path.startsWith("/") ? path : `/${path}`}`;

/** Absolute URL in the developer handbook. */
export const docsUrl = (path = "/") =>
  `${SITE.docs}${path.startsWith("/") ? path : `/${path}`}`;

/** Versioned API endpoint, e.g. `apiUrl("/session")`. */
export const apiUrl = (path = "") =>
  `${SITE.api}${API_BASE_PATH}${path && !path.startsWith("/") ? `/${path}` : path}`;
