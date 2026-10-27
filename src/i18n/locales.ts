/**
 * The locale registry. One list, and everything else derives from it.
 *
 * Before this, adding a language meant editing `routing.ts`, the switcher's own
 * hardcoded copy of the list, and every content accessor's `l === "vi"`
 * ternary. Three of those four places would be found by a type error and the
 * switcher would not, so a new locale would route and render and simply never
 * appear in the menu.
 *
 * To add one: append an entry here, add `messages/<code>.json`, and add the
 * code as a key wherever a content module exports its variants. Anything a
 * module has not translated falls back to English rather than throwing, so a
 * locale can ship partially and fill in over time.
 */
export interface LocaleMeta {
  code: string;
  /** Endonym: what speakers call the language, not what English calls it. */
  label: string;
  shortLabel: string;
  /** BCP 47 tag for `hreflang` and `<html lang>`. */
  tag: string;
  dir?: "ltr" | "rtl";
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", shortLabel: "EN", tag: "en" },
  { code: "vi", label: "Tiếng Việt", shortLabel: "VI", tag: "vi" },
];

/**
 * What a bare URL resolves to. Vietnamese since 2026-10: Vietnam is the market
 * being sold into, and the review found visitors landing on English and having
 * to find the switcher.
 *
 * This is NOT the content fallback. A content module that has no variant for a
 * locale falls back to FALLBACK_LOCALE, which has to be the one locale that is
 * complete for every module, or an untranslated module renders `undefined`.
 * English is that locale and is expected to stay that way.
 */
export const DEFAULT_LOCALE = "vi";
export const FALLBACK_LOCALE = "en";

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export const localeMeta = (code: string): LocaleMeta =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0];

export const isLocale = (code: string): boolean => LOCALE_CODES.includes(code);

/**
 * Expand a list of route params across every locale.
 *
 * `output: "export"` requires each `generateStaticParams` to return every dynamic segment in the
 * route, not just its own. On a server Next composes a child's params with its parent's; a static
 * export has no request to resolve the parent from, so `[locale]/blog/[slug]` has to name the
 * locale itself or the build fails with "returned incomplete params".
 *
 *   forEachLocale(slugs.map((slug) => ({ slug })))
 *     -> [{ locale: "en", slug: "a" }, { locale: "vi", slug: "a" }, ...]
 */
export const forEachLocale = <T extends Record<string, string>>(
  params: T[],
): Array<T & { locale: string }> =>
  LOCALE_CODES.flatMap((locale) => params.map((item) => ({ ...item, locale })));
