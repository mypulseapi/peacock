import { cache } from "react";
import { setRequestLocale } from "next-intl/server";
import { FALLBACK_LOCALE } from "./locales";

/**
 * Which language this render is in.
 *
 * next-intl's own `setRequestLocale` does not survive here. This is a static export, so there
 * is no request for it to hang the locale on, which is the same reason the layout has to pass
 * `locale` to `getMessages` explicitly instead of letting it resolve. The visible symptom was
 * `useLocale()` returning `en` inside a page being prerendered at `/vi`, so every designed
 * component rendered English on both halves of the site.
 *
 * `cache()` gives a store scoped to one render pass, which is exactly the scope wanted: the
 * layout sets it, the components beneath it read it, and a concurrent prerender of the other
 * locale gets its own. The alternative was threading a `locale` prop through 104 generated
 * components and the barrels above them, for a value every one of them wants and none varies.
 *
 * It lives here rather than under `components/designed` because the fault is not specific to
 * those pages. `StoryPage` and the industries index had it too: both read `useLocale()` in a
 * Server Component and both rendered `/vi` pages that linked to `/en`.
 *
 * It defaults to English rather than throwing. A component rendered outside a page that set it
 * is a bug, but it should read in English rather than take the page down.
 */
const store = cache((): { locale: string } => ({ locale: FALLBACK_LOCALE }));

export function setRenderLocale(locale: string): void {
  store().locale = locale;
}

/**
 * Set BOTH locale stores for this render. Call it at the top of every page and layout.
 *
 * **The layout alone is not enough, and that was a real bug.** Next does not re-render a layout
 * segment that has not changed, so navigating from `/vi` to `/vi/pricing` in the browser renders
 * only the page: the layout never runs, `setRenderLocale` is never called, and every component
 * beneath reads the default. The page arrived in English under Vietnamese chrome, and a hard
 * refresh fixed it, which is the signature of a layout-only side effect.
 *
 * So the page sets it too. One function rather than two calls, because the failure mode of
 * remembering one and forgetting the other is silent: the page renders, in the wrong language.
 */
export function prepareLocale(locale: string): void {
  // next-intl's, for `useTranslations` and `getTranslations` in client and server components.
  setRequestLocale(locale);
  // Ours, for the designed components, which next-intl cannot reach in a static export.
  setRenderLocale(locale);
}

export function renderLocale(): string {
  return store().locale;
}
