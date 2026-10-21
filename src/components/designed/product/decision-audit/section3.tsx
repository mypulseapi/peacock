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
export function Section3Section() {
  const t = designedText("product.decision-audit.section3");
  return (
    <section className="bg-soft-gradient scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
                <p className="reveal mt-5 text-lg text-pretty text-muted delay-100">
                  {t('2')}
                </p>
              </div>
              {/*
                The designer's exported figure, in place of the hand-converted list. Its text is
                drawn rather than editable, so it stays English in both locales until there is a
                Vietnamese export.
              */}
              <Figure product="decision-audit" name="decision-audit-repair-list" className="reveal mt-14" />
            </div>
          </section>
  );
}
