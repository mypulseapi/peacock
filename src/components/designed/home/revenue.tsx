/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function RevenueSection() {
  const t = designedText("home.revenue");
  return (
    <section className="scroll-mt-16 border-b border-line" id="revenue">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <h2 className="reveal text-title text-balance lg:col-span-7">
                  {t('1')}
                </h2>
                <p
                  className="reveal text-lg text-pretty text-muted delay-100 lg:col-span-5"
                >
                  {t('2')}
                </p>
              </div>
              <ol
                className="mt-12 flex flex-wrap gap-x-6 gap-y-10"
                aria-label="Affected SKUs over time"
              >
                <li className="reveal min-w-0 flex-1 basis-32 delay-100 lg:basis-0">
                  <p className="text-sm text-muted">{t('3')}</p>
                  <p
                    className="mt-1 font-display text-h1 font-semibold text-ink tabular-nums"
                  >
                    <span data-count="26">26</span>
                  </p>
                  <p className="text-sm text-muted">{t('4')}</p>
                  <span
                    className="mt-4 block h-2 overflow-hidden rounded-full bg-surface-1"
                    aria-hidden="true"
                    ><span
                      className="reveal-bar block h-full rounded-full bg-chart-main delay-200 w-26/680"
                    ></span
                  ></span>
                </li>
                <li className="reveal min-w-0 flex-1 basis-32 delay-200 lg:basis-0">
                  <p className="text-sm text-muted">{t('5')}</p>
                  <p
                    className="mt-1 font-display text-h1 font-semibold text-ink tabular-nums"
                  >
                    <span data-count="105">105</span>
                  </p>
                  <p className="text-sm text-muted">{t('6')}</p>
                  <span
                    className="mt-4 block h-2 overflow-hidden rounded-full bg-surface-1"
                    aria-hidden="true"
                    ><span
                      className="reveal-bar block h-full rounded-full bg-chart-main delay-300 w-105/680"
                    ></span
                  ></span>
                </li>
                <li className="reveal min-w-0 flex-1 basis-32 delay-300 lg:basis-0">
                  <p className="text-sm text-muted">{t('7')}</p>
                  <p
                    className="mt-1 font-display text-h1 font-semibold text-ink tabular-nums"
                  >
                    <span data-count="340">340</span>
                  </p>
                  <p className="text-sm text-muted">{t('8')}</p>
                  <span
                    className="mt-4 block h-2 overflow-hidden rounded-full bg-surface-1"
                    aria-hidden="true"
                    ><span
                      className="reveal-bar block h-full rounded-full bg-chart-main delay-400 w-340/680"
                    ></span
                  ></span>
                </li>
                <li className="reveal min-w-0 flex-1 basis-32 delay-400 lg:basis-0">
                  <p className="text-sm text-muted">{t('9')}</p>
                  <p
                    className="mt-1 font-display text-h1 font-semibold text-ink tabular-nums"
                  >
                    <span data-count="680">680</span>
                  </p>
                  <p className="text-sm text-muted">{t('10')}</p>
                  <span
                    className="mt-4 block h-2 overflow-hidden rounded-full bg-surface-1"
                    aria-hidden="true"
                    ><span
                      className="reveal-bar block h-full rounded-full bg-chart-main delay-500 w-full"
                    ></span
                  ></span>
                </li>
              </ol>
              <p className="reveal mt-6 text-caption text-muted">
                {t('11')}
              </p>

              {/* the calculator, in the home page's wash card */}
              <div
                className="bg-primary-wash mt-16 grid gap-10 rounded-3xl border border-primary-line px-5 py-10 sm:px-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-12 lg:px-14 lg:py-14"
                data-calc
              >
                <div className="min-w-0 lg:col-span-7">
                  <h3 className="reveal text-h2 text-balance text-ink">
                    {t('12')}
                  </h3>
                  <p
                    className="reveal mt-3 text-body leading-relaxed text-pretty text-muted delay-100"
                  >
                    {t('13')}
                  </p>
                  <form
                    className="reveal mt-8 grid gap-6 rounded-2xl border border-line bg-card p-5 shadow-sm delay-200 sm:grid-cols-2 sm:p-6"
                  >
                    <div>
                      <label htmlFor="calc-visits" className="text-sm font-medium text-ink"
                        >{t('14')}</label
                      >
                      <input
                        id="calc-visits"
                        name="visits"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="100000000"
                        step="1000"
                        defaultValue="100000"
                        className="field mt-2 tabular-nums"
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-aov" className="text-sm font-medium text-ink"
                        >{t('15')}</label
                      >
                      <input
                        id="calc-aov"
                        name="aov"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="100000"
                        step="0.01"
                        defaultValue="50"
                        className="field mt-2 tabular-nums"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <label htmlFor="calc-conv" className="text-sm font-medium text-ink"
                          >{t('16')}</label
                        >
                        <output
                          htmlFor="calc-conv"
                          data-out="conv"
                          aria-hidden="true"
                          className="text-sm font-semibold text-ink tabular-nums"
                          >10%</output
                        >
                      </div>
                      <input
                        id="calc-conv"
                        name="conv"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        defaultValue="10"
                        className="range-control mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <label
                          htmlFor="calc-uplift"
                          className="text-sm font-medium text-ink"
                          >{t('17')}</label
                        >
                        <output
                          htmlFor="calc-uplift"
                          data-out="uplift"
                          aria-hidden="true"
                          className="text-sm font-semibold text-ink tabular-nums"
                          >{t('18')}</output
                        >
                      </div>
                      <input
                        id="calc-uplift"
                        name="uplift"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        defaultValue="2.2"
                        className="range-control mt-1"
                      />
                      <p data-out="relative" className="text-caption text-muted">
                        {t('19')}
                      </p>
                    </div>
                  </form>
                </div>
                <div className="reveal min-w-0 delay-300 lg:col-span-5 lg:self-center">
                  <div
                    className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8"
                  >
                    <p className="text-sm text-muted">{t('20')}</p>
                    <p
                      className="mt-1 font-display text-h1 font-semibold wrap-anywhere text-ink tabular-nums"
                    >
                      <output
                        htmlFor="calc-visits calc-aov calc-conv"
                        data-out="current"
                        aria-live="polite"
                        >$500,000</output
                      >
                    </p>
                    <div className="mt-6 border-t border-line pt-6">
                      <p className="text-sm text-muted">
                        {t('21')}
                      </p>
                      <p
                        className="mt-1 font-display text-display font-semibold wrap-anywhere text-primary tabular-nums"
                      >
                        <output
                          htmlFor="calc-visits calc-aov calc-uplift"
                          data-out="extra"
                          aria-live="polite"
                          >+$110,000</output
                        >
                      </p>
                    </div>
                    <p className="mt-6 text-caption text-pretty text-muted">
                      {t('22')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
