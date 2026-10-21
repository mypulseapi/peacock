import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { FALLBACK_LOCALE } from "./locales";

/** A plain JSON object tree, which is all a message catalogue is. */
type Messages = { [key: string]: string | Messages };

/**
 * English underneath, the requested locale on top.
 *
 * The designed pages carry over 1,500 strings and they will not all be translated in one
 * sitting. Without a merge, a key present in `en` and missing in `vi` renders as the key
 * itself, so a page that is 90% translated looks broken rather than 90% translated. With it, an
 * untranslated string is simply still in English, which is what `locales.ts` already promises:
 * anything a module has not translated falls back to English rather than throwing, so a locale
 * can ship partially and fill in over time.
 *
 * Deep rather than shallow, because the catalogue is nested per component and a shallow merge
 * would let a half-filled `designed.home.hero` hide the whole English one.
 */
const mergeable = (v: unknown): v is Messages =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function deepMerge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = out[k];
    // An array is a leaf. `typeof [] === "object"`, so recursing on one spreads it into a plain
    // object and the array is gone: the legal pages read their clauses with `t.raw()` and then
    // `.map` over them, which is where that showed up, three pages into the build.
    out[k] = mergeable(v) && mergeable(b) ? deepMerge(b, v) : v;
  }
  return out;
}

async function load(locale: string): Promise<Messages> {
  const [ui, designed] = await Promise.all([
    import(`../../messages/${locale}.json`).then((m) => m.default as Messages),
    /*
     * The designed pages' strings live in their own file.
     *
     * They are generated out of the markup by `scripts/extract-designed-strings.py`, and
     * regenerating them should not rewrite the hand-written UI strings sitting next to them.
     * A locale with no designed catalogue yet is not an error, it is just untranslated.
     */
    import(`../../messages/designed.${locale}.json`)
      .then((m) => m.default as Messages)
      .catch(() => ({}) as Messages),
  ]);
  return { ...ui, designed };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages =
    locale === FALLBACK_LOCALE
      ? await load(FALLBACK_LOCALE)
      : deepMerge(await load(FALLBACK_LOCALE), await load(locale));

  return { locale, messages };
});
