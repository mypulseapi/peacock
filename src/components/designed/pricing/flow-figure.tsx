import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderLocale } from "@/i18n/render-locale";
import VI from "./figures/text.json";

/**
 * The four pricing-flow illustrations, read at build time and inlined, like the product figures.
 *
 * Inlined rather than an <img> so the labels can be translated: each `>Label<` in the SVG is
 * swapped for its Vietnamese line from `figures/text.json`. Three labels from the designer's files
 * were replaced before they landed, because they described a "+32%" result nobody measured and
 * features Pulse does not have (generated content, image scoring, data enrichment).
 */
const DIR = join(
  process.cwd(),
  "src",
  "components",
  "designed",
  "pricing",
  "figures",
);
export type FlowFigureName = keyof typeof VI;

export function FlowFigure({
  name,
  label,
}: {
  name: FlowFigureName;
  label: string;
}) {
  let svg = readFileSync(join(DIR, `${name}.svg`), "utf8");
  if (renderLocale() === "vi") {
    for (const [en, vi] of Object.entries(VI[name] as Record<string, string>)) {
      svg = svg.split(`>${en}<`).join(`>${vi}<`);
    }
  }
  return (
    <div
      role="img"
      aria-label={label}
      className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
