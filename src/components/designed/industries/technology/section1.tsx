/**
 * Converted from `technology.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../../t";
import Link from "next/link";

export function Section1Section() {
  const t = designedText("industries.technology.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div
              className="frame grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-6 lg:pr-16">
                <h1 className="reveal text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="reveal mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted delay-100"
                >
                  {t('2')}
                </p>
                <div className="reveal mt-8 flex flex-wrap gap-3 delay-200">
                  <Link href={designedHref("/en/contact")} className="btn-primary"
                    >{t('3')}</Link>
                  <Link href={designedHref("/en/product/decision-audit")} className="btn-secondary"
                    >{t('4')}</Link>
                </div>
                <p className="reveal mt-6 text-sm text-muted delay-300">
                  <span className="font-semibold text-ink"
                    >{t('5')}</span
                  >{" "}
                  {t('6')}
                </p>
              </div>
              <figure className="reveal delay-200 lg:col-span-6">
                <div className="card">
                  <p className="text-sm font-semibold text-ink">
                    {t('7')}
                  </p>
                  <p className="mt-1 text-caption text-muted">
                    {t('8')}
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li
                      className="-mx-2 grid grid-cols-12 items-center gap-x-3 gap-y-1.5 rounded-lg border border-signal bg-signal-tint px-2 py-2 ring-1 ring-signal"
                    >
                      <p
                        className="col-span-12 sm:col-span-4 flex items-center gap-2 text-sm font-semibold text-ink"
                      >
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded bg-signal text-caption tabular-nums text-on-step"
                          aria-label="Rank 1"
                          >1</span
                        >{t('9')}
                      </p>
                      <div
                        className="col-span-10 h-2.5 sm:col-span-6 rounded-full bg-card"
                      >
                        <div
                          className="reveal-bar h-full rounded-full bg-chart-highlight w-63/100"
                        ></div>
                      </div>
                      <p
                        className="col-span-2 text-right text-sm font-semibold tabular-nums text-signal-text"
                      >
                        63%
                      </p>
                    </li>
                    <li className="grid grid-cols-12 items-center gap-x-3 gap-y-1.5">
                      <p
                        className="col-span-12 sm:col-span-4 flex items-center gap-2 text-sm text-ink"
                      >
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption tabular-nums text-on-step"
                          aria-label="Rank 2"
                          >2</span
                        >{t('10')}
                      </p>
                      <div
                        className="col-span-10 h-2.5 sm:col-span-6 rounded-full bg-surface-1"
                      >
                        <div
                          className="reveal-bar h-full rounded-full bg-chart-baseline w-72/100"
                        ></div>
                      </div>
                      <p
                        className="col-span-2 text-right text-sm tabular-nums text-ink"
                      >
                        72%
                      </p>
                    </li>
                    <li className="grid grid-cols-12 items-center gap-x-3 gap-y-1.5">
                      <p
                        className="col-span-12 sm:col-span-4 flex items-center gap-2 text-sm text-ink"
                      >
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption tabular-nums text-on-step"
                          aria-label="Rank 3"
                          >3</span
                        >{t('11')}
                      </p>
                      <div
                        className="col-span-10 h-2.5 sm:col-span-6 rounded-full bg-surface-1"
                      >
                        <div
                          className="reveal-bar h-full rounded-full bg-chart-baseline w-74/100"
                        ></div>
                      </div>
                      <p
                        className="col-span-2 text-right text-sm tabular-nums text-ink"
                      >
                        74%
                      </p>
                    </li>
                    <li className="grid grid-cols-12 items-center gap-x-3 gap-y-1.5">
                      <p
                        className="col-span-12 sm:col-span-4 flex items-center gap-2 text-sm text-ink"
                      >
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption tabular-nums text-on-step"
                          aria-label="Rank 4"
                          >4</span
                        >{t('12')}
                      </p>
                      <div
                        className="col-span-10 h-2.5 sm:col-span-6 rounded-full bg-surface-1"
                      >
                        <div
                          className="reveal-bar h-full rounded-full bg-chart-baseline w-25/100"
                        ></div>
                      </div>
                      <p
                        className="col-span-2 text-right text-sm tabular-nums text-ink"
                      >
                        25%
                      </p>
                    </li>
                  </ul>
                  <details className="group mt-6 border-t border-line pt-1">
                    <summary
                      className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
                    >
                      {t('13')}<svg
                        className="size-4 transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <div className="mt-4 overflow-hidden rounded-lg border border-line">
                      <table className="w-full text-data">
                        <caption className="sr-only">
                          {t('14')}
                        </caption>
                        <thead className="bg-surface-1 text-xs text-muted">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left font-sans font-medium"
                            >
                              {t('15')}
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-right font-sans font-medium"
                            >
                              {t('16')}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          <tr>
                            <th
                              scope="row"
                              className="px-4 py-2 text-left font-sans font-normal"
                            >
                              {t('17')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">63%</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="px-4 py-2 text-left font-sans font-normal"
                            >
                              {t('18')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">72%</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="px-4 py-2 text-left font-sans font-normal"
                            >
                              {t('19')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">74%</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="px-4 py-2 text-left font-sans font-normal"
                            >
                              {t('20')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">25%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
                <figcaption className="mt-4 max-w-xl text-caption text-muted">
                  {t('21')}
                </figcaption>
              </figure>
            </div>
          </section>
  );
}
