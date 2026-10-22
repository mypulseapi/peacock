/**
 * Converted from `furniture.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import Image from "next/image";
import { img } from "@/lib/cdn";
export function Section3Section() {
  const t = designedText("industries.furniture.section3");
  return (
    <section className="border-b border-line bg-surface-1/50">
            <div className="frame py-16 lg:py-20">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="reveal mx-auto max-w-[36rem] text-title text-balance">
                  {t('1')}
                </h2>
                <div className="reveal mt-5 delay-100">
                  <p className="text-sm text-muted">
                    {t('2')}
                  </p>
                  <p className="mt-1.5 text-h3 text-pretty text-ink">
                    {t('3')}
                  </p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
                {/*
                  The piece the reasons are about, with the measurements that decide the purchase
                  drawn on it. Opaque, with no alpha, so the box keeps a light fill pinned in both
                  themes; without it the photograph would read as a white slab once the theme flips.
                */}
                <figure className="reveal min-w-0">
                  <div className="overflow-hidden rounded-2xl border border-line bg-[#fdfdfd]">
                    <Image
                      src={img("sectors/furniture-chair-measurements-callouts.webp")}
                      alt={t('figureAlt')}
                      width={1100}
                      height={755}
                      sizes="(min-width: 1024px) 48vw, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                </figure>
              <div className="reveal min-w-0 delay-100">
                <div className="card">
                  <ul className="divide-y divide-line">
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('4')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('5')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('6')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('7')}
                      </p>
                    </li>
                  </ul>
                  <div className="mt-5 flex gap-4 border-t border-line pt-5">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-file-text" />
                    </svg>
                    <p className="text-body text-pretty text-muted">
                      <span className="font-semibold text-ink"
                        >{t('8')}</span
                      >{" "}
                      {t('9')}
                    </p>
                  </div>
                </div>
              </div>
              </div>

              {/*
                The measured coverage as data, moved here from under the hero. Orphaned beneath a
                hero it read as a stray link; this is the section a reader who wants the numbers
                comes to, and it sits next to the sentence about where the evidence already lives.

                Closed by default, and a real table rather than a picture of one: the figures are
                selectable, translatable and read out in order, which the ranked bars in the hero
                illustration are not.
              */}
              <details className="reveal group mx-auto mt-10 max-w-2xl border-t border-line pt-1 delay-200">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover">
                  {t('13')}<svg
                    className="size-4 transition-transform duration-200 ease-out-soft group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <use href="#i-chevron-down" />
                  </svg>
                </summary>
                <div className="mt-4 overflow-hidden rounded-lg border border-line">
                  <table className="w-full text-data">
                    <caption className="sr-only">{t('14')}</caption>
                    <thead className="bg-surface-1 text-xs text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left font-sans font-medium">
                          {t('15')}
                        </th>
                        <th scope="col" className="px-4 py-2 text-right font-sans font-medium">
                          {t('16')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                          <tr>
                            <th scope="row" className="px-4 py-2 text-left font-sans font-normal">
                              {t('17')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">18%</td>
                          </tr>
                          <tr>
                            <th scope="row" className="px-4 py-2 text-left font-sans font-normal">
                              {t('18')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">44%</td>
                          </tr>
                          <tr>
                            <th scope="row" className="px-4 py-2 text-left font-sans font-normal">
                              {t('19')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">52%</td>
                          </tr>
                          <tr>
                            <th scope="row" className="px-4 py-2 text-left font-sans font-normal">
                              {t('20')}
                            </th>
                            <td className="px-4 py-2 text-right tabular-nums">95%</td>
                          </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-caption text-pretty text-muted">{t('21')}</p>
              </details>
            </div>
          </section>
  );
}
