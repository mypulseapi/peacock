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
export function Section2Section() {
  const t = designedText("product.decision-monitor.section2");
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              {/* the home page's How it works card: a flat 6% Pulse Blue tint, rounded-3xl, primary-line border */}
              <div
                className="bg-primary-wash grid gap-10 rounded-3xl border border-primary-line px-5 py-14 sm:px-10 lg:grid-cols-12 lg:gap-x-12 lg:px-14 lg:py-20"
              >
                <div className="min-w-0 lg:col-span-12">
                  <h2 className="reveal text-title text-balance">
                    {t('1')}
                  </h2>
                  {/*
                    The stat lives in the figure, not here as well.
                    
                    Both were saying "94 of 216 products a shopper still cannot tell apart", one
                    counting up in the copy and one drawn in the figure below, so the section read
                    the same sentence twice with two different numbers while the counters were mid
                    animation. The figure is the designer's and composes the number with the chart
                    it belongs to, so the hand-converted copy of it is the one that goes.
                  */}
                  <h3 className="reveal mt-6 text-h3 text-ink delay-100">
                    {t('3')}
                  </h3>
                  <p
                    className="reveal mt-3 text-body leading-relaxed text-pretty text-muted delay-100"
                  >
                    {t('4')}
                  </p>
                  <p
                    className="reveal mt-3 text-body leading-relaxed text-pretty text-muted delay-100"
                  >
                    {t('5')}
                  </p>
                  <p
                    className="reveal mt-6 text-lg font-medium text-pretty text-ink delay-200"
                  >
                    {t('6')}
                  </p>
                </div>
                {/*
                  The designer's exported figure, in place of the hand-converted shelf. Same
                  stat caption, card title and subtitle, localized from `text.json`.
                */}
                {/*
                  Full width, under the copy, because the figure is 1000 by 262: a 3.8:1 chart in
                  five of twelve columns rendered at about a third of its intended size with the
                  rest of the column left empty. Every other figure on these pages is already
                  placed by its ratio; this was the one that was not.
                */}
                <Figure
                  product="decision-monitor"
                  name="decision-monitor-shelf-slips"
                  className="reveal mt-4 min-w-0 delay-200 lg:col-span-12"
                />
                <p className="text-caption text-muted lg:col-span-12">
                  {t('13')}
                </p>
              </div>
            </div>
          </section>
  );
}
