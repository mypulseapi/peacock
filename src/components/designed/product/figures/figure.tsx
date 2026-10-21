import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderLocale } from "@/i18n/render-locale";
import TEXT from "./text.json";

/**
 * A designer-exported figure, inlined into the page.
 *
 * Inlined rather than `<img src>`, and that is not a preference. An `<img>` SVG is a separate
 * document: it cannot see `data-theme`, and none of the `--pulse-*` variables the figures read
 * can reach across that boundary. An `<img>` figure would follow the operating system's light or
 * dark setting while the page followed the theme button, so a visitor who chose Light on a dark
 * laptop would get dark figures in a light page. The theme control shipped earlier this month is
 * the whole reason this has to be inline.
 *
 * Read at build time, not fetched at runtime. This is a static export, so `readFileSync` here
 * runs during prerender and the markup lands in the HTML: no request, no loading state, and
 * nothing to go wrong on a slow connection. After the import script strips the embedded fonts
 * the eleven figures cost 30.6 KB gzipped in total, against 274.9 KB as exported, so there is no
 * longer a weight argument for keeping them out of the document.
 *
 * Each file brings its own `<title>` and `<desc>` with the figures spelled out, wired up with
 * `role="img"` and `aria-labelledby`, so there is no accessible name to add here. The ids are
 * prefixed per file (`das-`, `dah-`, ...), which is what lets four of them share one page.
 */
const DIR = join(process.cwd(), "src", "components", "designed", "product", "figures");

export type FigureProduct = "decision-audit" | "decision-verification" | "decision-monitor";

type Line = { en: string; vi: string };
const LINES = TEXT as Record<string, Record<string, Line>>;

/** `&` and `<` in a translated line would otherwise end the text node early. */
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Put the page's language into the figure.
 *
 * The export carries its copy in English, and these sections were translated in B13, so inlining
 * the file as exported would quietly put English back on `/vi`. The `data-edit` attributes are
 * the designer's hook for exactly this, and `text.json` holds what each one says in each locale,
 * derived at import time by matching the exported English against the catalogue.
 *
 * Only the text node directly inside a `data-edit` element is replaced, never a nested one:
 * `data-edit="step-1"` wraps the three `step-1-*` lines, and `[^<]*` stops at the first child
 * tag, so a wrapper simply matches nothing and its children are rewritten individually.
 *
 * A figure with no entry, or a line with no translation, keeps the English it was exported with.
 * That is the honest failure: a missing translation should read as untranslated, not as a gap.
 */
function localize(svg: string, id: string, locale: string): string {
  if (locale === "en") return svg;
  const lines = LINES[id];
  if (!lines) return svg;

  return svg.replace(
    // The same two shapes the import script matches, and the same exclusion: the optional middle
    // group sees through one presentational wrapper but not past a nested `data-edit`, so a
    // container of editable children is left alone rather than flattened into one string.
    /(data-edit="([^"]+)"[^>]*>(?:<(?!\/)(?:(?!data-edit)[^>])*>)?)([^<]+)/g,
    (whole, open: string, key: string, current: string) => {
      const line = lines[key];
      if (!line || !current.trim()) return whole;
      const translated = line[locale as keyof Line];
      return translated ? `${open}${escape(translated)}` : whole;
    },
  );
}

export function Figure({
  product,
  name,
  className = "",
  priority = false,
}: {
  product: FigureProduct;
  name: string;
  /** Sizing and placement. The figure fills the width it is given; `viewBox` keeps the ratio. */
  className?: string;
  /**
   * Set on a figure above the fold, so it plays on load instead of waiting to be scrolled to.
   * Everything else holds its first frame until it comes into view, because nine of the eleven
   * play once and a figure that finishes above the fold has played to nobody.
   */
  priority?: boolean;
}) {
  const svg = localize(
    readFileSync(join(DIR, product, `${name}.svg`), "utf8"),
    `${product}/${name}`,
    renderLocale(),
  );

  return (
    <div
      className={`figure${priority ? "" : " figure-hold"} ${className}`.trim()}
      // The file is ours, written by the import script from the designer's export, and it is read
      // off disk at build time. There is no user input anywhere on this path.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
