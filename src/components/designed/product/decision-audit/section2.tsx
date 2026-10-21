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
export function Section2Section() {
  const t = designedText("product.decision-audit.section2");
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              {/* the home page's How it works card: a flat 6% Pulse Blue tint, rounded-3xl, primary-line border */}
              <div
                className="bg-primary-wash grid gap-10 rounded-3xl border border-primary-line px-5 py-14 sm:px-10 lg:grid-cols-12 lg:gap-x-12 lg:px-14 lg:py-20"
              >
                <div className="min-w-0 lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <h2 className="reveal text-title text-balance">
                      {t('1')}
                    </h2>
                    <p className="reveal mt-5 text-lg text-pretty text-muted delay-100">
                      {t('2')}
                    </p>
                  </div>
                </div>
                {/*
                  The designer's exported figure, in place of 959 lines of hand-converted shelf.

                  Same four beats, and the same 216 squares. The conversion had rebuilt the
                  designer's scene as JSX with pre-N: / at-N: classes driving each beat; the
                  export is that scene as its author drew it, animating itself.
                */}
                <Figure
                  product="decision-audit"
                  name="decision-audit-shelf-story"
                  className="reveal min-w-0 delay-100 lg:col-span-8"
                />
              </div>
            </div>
          </section>
  );
}
