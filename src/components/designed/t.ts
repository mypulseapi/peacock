import en from "../../../messages/designed.en.json";
import vi from "../../../messages/designed.vi.json";
import { designedLocale } from "./locale";

/**
 * The designed pages' text, looked up by component namespace.
 *
 * Deliberately not next-intl. Its server-side hooks resolve the locale from a request, and a
 * static export has none, so every designed component rendered English on `/vi`. The
 * catalogues are two JSON files; reading them directly is less machinery than working around
 * that, and it keeps the components synchronous.
 *
 * English underneath, the requested locale on top, so a string nobody has translated yet is
 * still in English rather than rendering as its own key. That is what `locales.ts` promises:
 * a locale can ship partially and fill in over time.
 */
type Catalogue = { [key: string]: string | Catalogue };

const BY_LOCALE: Record<string, Catalogue> = { en: en as Catalogue, vi: vi as Catalogue };

function at(root: Catalogue, namespace: string): Record<string, string> {
  let node: Catalogue | string | undefined = root;
  for (const part of namespace.split(".")) {
    if (typeof node !== "object" || node === null) return {};
    node = node[part];
  }
  return typeof node === "object" && node !== null ? (node as Record<string, string>) : {};
}

/**
 * `t` for one component, e.g. `designedText("pricing.section1")`.
 *
 * A missing key returns the key, which is loud in the page rather than silent in a log. It
 * should be unreachable: the catalogue is generated from the same markup that reads it.
 */
export function designedText(namespace: string): (key: string) => string {
  const locale = designedLocale();
  const base = at(BY_LOCALE.en, namespace);
  const over = locale === "en" ? {} : at(BY_LOCALE[locale] ?? {}, namespace);
  const table = { ...base, ...over };
  return (key: string) => table[key] ?? key;
}
