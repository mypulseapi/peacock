/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
export function Section2Section() {
  const t = designedText("product.decision-monitor.section2");
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              {/* the home page's How it works card: a flat 6% Pulse Blue tint, rounded-3xl, primary-line border */}
              <div
                className="bg-primary-wash grid gap-10 rounded-3xl border border-primary-line px-5 py-14 sm:px-10 lg:grid-cols-12 lg:gap-x-12 lg:px-14 lg:py-20"
              >
                <div className="min-w-0 lg:col-span-7">
                  <h2 className="reveal text-title text-balance">
                    {t('1')}
                  </h2>
                  <p
                    className="reveal mt-6 flex flex-wrap items-baseline gap-x-3 delay-100"
                  >
                    <span
                      className="font-display text-display font-semibold text-ink tabular-nums"
                      data-count="94"
                      >94</span
                    >
                    <span className="text-body text-muted"
                      >{t('2')}</span
                    >
                  </p>
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
                <div className="reveal min-w-0 delay-200 lg:col-span-5 lg:self-center">
                  <div
                    className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8"
                  >
                    <p className="text-h3 text-ink">
                      {t('7')}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {t('8')}
                    </p>
                    <ul className="mt-6 space-y-5">
                      <li>
                        <div
                          className="flex flex-wrap items-baseline justify-between gap-x-3"
                        >
                          <span className="text-data font-semibold text-ink"
                            >{t('9')}</span
                          >
                          <span
                            className="font-display text-h3 font-semibold text-ink tabular-nums"
                            >{t('10')}</span
                          >
                        </div>
                        <span
                          className="mt-2 block h-2 overflow-hidden rounded-full bg-surface-1"
                          aria-hidden="true"
                          ><span
                            className="reveal-bar block h-full w-15/32 rounded-full bg-chart-main delay-300"
                          ></span
                        ></span>
                      </li>
                      <li>
                        <div
                          className="flex flex-wrap items-baseline justify-between gap-x-3"
                        >
                          <span className="text-data font-semibold text-ink"
                            >{t('11')}</span
                          >
                          <span
                            className="font-display text-h3 font-semibold text-ink tabular-nums"
                            >{t('12')}</span
                          >
                        </div>
                        <span
                          className="mt-2 block h-2 overflow-hidden rounded-full bg-surface-1"
                          aria-hidden="true"
                          ><span
                            className="reveal-bar block h-full w-2/32 rounded-full bg-chart-second delay-450"
                          ></span
                        ></span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-caption text-muted lg:col-span-12">
                  {t('13')}
                </p>
              </div>
            </div>
          </section>
  );
}
