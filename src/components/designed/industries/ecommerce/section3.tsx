/**
 * Converted from `ecommerce.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
/**
 * The shelf this sector's figures were measured on, and what was recorded on it.
 *
 * `figureSource` in the hero states the same counts: 216 products, screen size on 136, memory 156,
 * storage 161, processor 54. The percentage is derived here rather than written beside them, so the
 * table and the catalogue window in the hero cannot drift apart.
 */
const SHELF = 216;
const COVERAGE = [
  { key: "screen", n: 136 },
  { key: "memory", n: 156 },
  { key: "storage", n: 161 },
  { key: "processor", n: 54 },
] as const;

export function Section3Section() {
  const t = designedText("industries.ecommerce.section3");
  return (
    <section className="border-b border-line bg-surface-1/50">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
                <div className="reveal mt-8 max-w-md">
                  <p className="text-sm text-muted">
                    {t('2')}
                  </p>
                  <p className="mt-2 text-h3 text-pretty text-ink">
                    {t('3')}
                  </p>
                </div>
              </div>
              <div className="reveal lg:col-span-7">
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

              {/*
                The measured coverage as data, moved here from the hero that was rebuilt as live
                markup. A real table rather than a picture of one, so the figures are selectable,
                translatable and read out in order.

                The percentages are derived from the counts `figureSource` states, exactly as the
                hero derives them, so the table and the catalogue window can never disagree.
              */}
              <details className="reveal group col-span-full mx-auto mt-10 max-w-2xl border-t border-line pt-1 delay-200">
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
                      {COVERAGE.map((row, i) => (
                        <tr key={row.key}>
                          <th scope="row" className="px-4 py-2 text-left font-sans font-normal">
                            {t(String(17 + i))}
                          </th>
                          <td className="px-4 py-2 text-right tabular-nums">
                            {Math.round((100 * row.n) / SHELF)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-caption text-pretty text-muted">{t('21')}</p>
              </details>
            </div>
          </section>
  );
}
