/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Section2Section() {
  const t = useTranslations("designed.about.section2");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-0">
                <h2 className="text-title text-balance lg:col-span-5 lg:pr-16">
                  {t('1')}
                </h2>
                <div
                  className="space-y-5 text-body leading-relaxed text-pretty text-muted lg:col-span-7"
                >
                  <p>
                    {t('2')}
                  </p>
                  <p>
                    {t('3')}
                  </p>
                </div>
              </div>
              <div
                className="mt-16 grid gap-8 border-t border-line pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-0"
              >
                <div className="lg:col-span-5 lg:pr-16">
                  <p
                    className="font-display text-title font-semibold tabular-nums text-primary"
                  >
                    {t('4')}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-pretty text-muted">
                    {t('5')}
                  </p>
                  <p className="mt-6">
                    <Link                   href="/en/product/decision-audit"
                      className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                      >{t('6')}</Link>
                  </p>
                </div>
                <div className="w-full max-w-lg lg:col-span-7 lg:justify-self-center">
                  <div className="card min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      {t('7')}
                    </p>
                    <table className="mt-3 w-full table-fixed text-sm">
                      <thead className="font-sans text-caption text-muted">
                        <tr>
                          <th scope="col" className="w-1/2 py-1 text-left font-medium">
                            {t('8')}
                          </th>
                          <th scope="col" className="py-1 text-left font-medium">
                            {t('9')}
                          </th>
                          <th scope="col" className="py-1 text-left font-medium">
                            {t('10')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            {t('11')}
                          </th>
                          <td className="py-2 pr-2 text-ink">{t('12')}</td>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >{t('13')}</span
                            >
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            {t('14')}
                          </th>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >{t('15')}</span
                            >
                          </td>
                          <td className="py-2 pr-2 text-ink">{t('16')}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            {t('17')}
                          </th>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >{t('18')}</span
                            >
                          </td>
                          <td className="py-2 pr-2 text-ink">{t('19')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
