/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { renderLocale } from "@/i18n/render-locale";
import Image from "next/image";
import { img } from "@/lib/cdn";
import FIGURE_TEXT from "../figures/text.json";

/**
 * The three steps, as markup rather than as the exported SVG figure.
 *
 * The export drew the rail, the labels, the titles and the bodies inside three `foreignObject`
 * blocks, which fixed their order: label, title, body, and nowhere for an illustration to go. The
 * order here is rail, then illustration, then the words, and that cannot be expressed without
 * taking the pieces out of the drawing. It is also where the empty band under this section came
 * from: each block reserved 286 units of a 330-unit viewBox while the words filled about 130.
 *
 * Nothing is retyped to do it. The copy is still the figure's own `text.json`, keyed per step and
 * already carrying both locales, so `/vi` reads exactly as it did when the SVG rendered it.
 *
 * The illustrations are this page's own: they show a catalogue arriving as CSV and JSON, the
 * attributes being measured, and the ranked report that comes back, which is this page's three
 * steps and not the verification page's.
 */
const STEPS = [
  { n: "step-1", src: "product/decision-audit-catalogue-export-csv-json.webp", w: 514, h: 836, alt: "figure1Alt" },
  { n: "step-2", src: "product/decision-audit-attribute-coverage-measured.webp", w: 489, h: 670, alt: "figure2Alt" },
  { n: "step-3", src: "product/decision-audit-ranked-opportunities-report.webp", w: 486, h: 920, alt: "figure3Alt" },
] as const;

const LINES = FIGURE_TEXT as Record<string, Record<string, { en: string; vi: string }>>;

export function Section4Section() {
  const t = designedText("product.decision-audit.section4");
  const locale = renderLocale() === "vi" ? "vi" : "en";
  const lines = LINES["decision-audit/decision-audit-how-it-works"] ?? {};
  const line = (key: string) => lines[key]?.[locale] ?? lines[key]?.en ?? "";

  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance">
                {t('1')}
              </h2>
              <div className="relative reveal mt-12 lg:mt-14">
                {/*
                  The rail runs behind the row; each column carries its own dot, so the dots land
                  on the column heads at every width. Positioning them along the rail instead
                  would mean restating the grid's own column maths in per cent, and the two would
                  disagree the moment the gap or the column count changed.
                */}
                <div
                  className="absolute inset-x-0 top-1.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-primary"
                  aria-hidden="true"
                />
                <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {STEPS.map((s) => (
                    <li key={s.n} className="min-w-0">
                      <span
                        className="block size-3.5 rounded-full border-4 border-card bg-primary ring-1 ring-primary/25"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-sm font-semibold text-primary">
                        {line(`${s.n}-label`)}
                      </p>
                      {/*
                        The illustration, between the label and the words it illustrates. The three
                        are different shapes (514x836, 489x670, 486x920), so the panel is a fixed
                        band and the image is centred in it on both axes. Sizing the image by width
                        instead would make one tall column and two short ones.
                      */}
                      <div className="how-glow mt-4 flex min-h-[26rem] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 p-4 sm:p-5">
                        <Image
                          src={img(s.src)}
                          alt={t(s.alt)}
                          width={s.w}
                          height={s.h}
                          sizes="(min-width: 640px) 30vw, 90vw"
                          className="max-h-[24rem] w-auto max-w-full object-contain"
                        />
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-balance text-ink">
                        {line(`${s.n}-title`)}
                      </h3>
                      <p className="mt-2 leading-relaxed text-pretty text-muted">
                        {line(`${s.n}-body`)}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
  );
}
