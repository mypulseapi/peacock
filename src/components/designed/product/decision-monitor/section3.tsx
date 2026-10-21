/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { Figure } from "../figures/figure";
export function Section3Section() {
  const t = designedText("product.decision-monitor.section3");
  return (
    <section className="scroll-mt-16 border-b border-line bg-surface-1/50">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:order-last lg:col-span-4 lg:pl-12">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
                <p
                  className="reveal mt-6 max-w-sm text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              {/*
                The designer's exported figure, in place of the hand-converted rows. Same four
                week notes, localized from `text.json`.
              */}
              <Figure
                product="decision-monitor"
                name="decision-monitor-gap-grows"
                className="reveal lg:col-span-8"
              />
            </div>
          </section>
  );
}
