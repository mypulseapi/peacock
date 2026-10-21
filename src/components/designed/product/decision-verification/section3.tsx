/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { Figure } from "../figures/figure";
export function Section3Section() {
  const t = designedText("product.decision-verification.section3");
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance">
                {t('1')}
              </h2>
              {/*
                The designer's exported figure, in place of the hand-converted timeline.

                It carries the same three steps, and the same words: `text.json` puts the
                catalogue's Vietnamese back into the `data-edit` lines, so `/vi` reads as it did
                before. What the markup could not do is the motion.
              */}
              <Figure
                product="decision-verification"
                name="decision-verification-how-it-works"
                className="reveal mt-14"
              />
            </div>
          </section>
  );
}
