/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { Figure } from "../figures/figure";
export function Section5Section() {
  const t = designedText("product.decision-audit.section5");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal max-w-2xl text-title text-balance">
                {t('1')}
              </h2>
              {/*
                The designer's exported figure, in place of the two hand-converted cards. Same
                titles, bodies and captions, localized from `text.json`.

                `card-2-legend` is the one line it holds that the catalogue does not: it reads
                figures off the chart next to it rather than prose, so it stays English in both
                locales until the designer re-exports it.
              */}
              <Figure product="decision-audit" name="decision-audit-gains" className="reveal mt-14" />
            </div>
          </section>
  );
}
