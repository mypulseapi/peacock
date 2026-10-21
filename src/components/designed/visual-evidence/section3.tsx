/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section3Section() {
  const t = useTranslations("designed.visual-evidence.section3");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-0">
                <div className="lg:col-span-5 lg:pr-16">
                  <h2 className="text-title text-balance">
                    {t('1')}
                  </h2>
                  <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                    {t('2')}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="card overflow-x-auto">
                    <table className="w-full text-left text-body">
                      <caption className="sr-only">
                        {t('3')}
                      </caption>
                      <thead>
                        <tr className="border-b border-line text-sm text-muted">
                          <th scope="col" className="py-3 pr-4 font-medium">
                            {t('4')}
                          </th>
                          <th scope="col" className="py-3 pr-4 font-medium">
                            {t('5')}
                          </th>
                          <th scope="col" className="py-3 font-medium">
                            {t('6')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('7')}
                          </th>
                          <td className="py-3 pr-4 text-ink">{t('8')}</td>
                          <td className="py-3 text-muted">{t('9')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('10')}
                          </th>
                          <td className="py-3 pr-4 text-ink">{t('11')}</td>
                          <td className="py-3 text-muted">{t('12')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('13')}
                          </th>
                          <td className="py-3 pr-4 text-ink">{t('14')}</td>
                          <td className="py-3 text-muted">{t('15')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('16')}
                          </th>
                          <td className="py-3 pr-4 text-ink">{t('17')}</td>
                          <td className="py-3 text-muted">{t('18')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('19')}
                          </th>
                          <td className="py-3 pr-4 text-muted">{t('20')}</td>
                          <td className="py-3 text-muted">{t('21')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('22')}
                          </th>
                          <td className="py-3 pr-4 text-muted">{t('23')}</td>
                          <td className="py-3 text-muted">{t('24')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('25')}
                          </th>
                          <td className="py-3 pr-4 text-muted">{t('26')}</td>
                          <td className="py-3 text-muted">{t('27')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('28')}
                          </th>
                          <td className="py-3 pr-4 text-muted">{t('29')}</td>
                          <td className="py-3 text-muted">{t('30')}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-3 pr-4 font-normal text-ink">
                            {t('31')}
                          </th>
                          <td className="py-3 pr-4 text-muted">{t('32')}</td>
                          <td className="py-3 font-medium text-ink">{t('33')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                    <div className="border-t-2 border-primary pt-4">
                      <dt className="text-sm text-muted">{t('34')}</dt>
                      <dd className="text-h2 tabular-nums text-ink">{t('35')}</dd>
                    </div>
                    <div className="border-t-2 border-primary pt-4">
                      <dt className="text-sm text-muted">{t('36')}</dt>
                      <dd className="text-h2 tabular-nums text-ink">{t('37')}</dd>
                    </div>
                    <div className="border-t-2 border-signal pt-4">
                      <dt className="text-sm text-muted">{t('38')}</dt>
                      <dd className="text-h2 tabular-nums text-ink">{t('39')}</dd>
                    </div>
                  </dl>
                  <p className="mt-8 text-body leading-relaxed text-pretty text-ink">
                    {t('40')}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
                    {t('41')}
                  </p>
                </div>
              </div>
            </div>
          </section>
  );
}
