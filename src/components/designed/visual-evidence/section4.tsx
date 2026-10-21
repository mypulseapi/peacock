/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section4Section() {
  const t = useTranslations("designed.visual-evidence.section4");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  {t('1')}
                </h2>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  {t('2')}
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="card">
                  <dl className="divide-y divide-line">
                    <div
                      className="flex items-baseline justify-between gap-4 py-4 first:pt-0"
                    >
                      <dt className="text-ink">{t('3')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-ink">100.0%</span>
                        <span className="w-28 text-right text-sm text-muted"
                          >{t('4')}</span
                        >
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">{t('5')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">45.2%</span>
                        <span className="w-28 text-right text-sm text-muted">{t('6')}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">{t('7')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">21.3%</span>
                        <span className="w-28 text-right text-sm text-muted">{t('8')}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">{t('9')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">12.9%</span>
                        <span className="w-28 text-right text-sm text-muted">{t('10')}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">{t('11')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">7.2%</span>
                        <span className="w-28 text-right text-sm text-muted">{t('12')}</span>
                      </dd>
                    </div>
                    <div
                      className="flex items-baseline justify-between gap-4 py-4 last:pb-0"
                    >
                      <dt className="text-ink">{t('13')}</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">3.5%</span>
                        <span className="w-28 text-right text-sm text-muted">{t('14')}</span>
                      </dd>
                    </div>
                  </dl>
                </div>
                <blockquote
                  className="mt-8 border-l-2 border-signal pl-6 text-h3 text-balance text-ink"
                >
                  {t('15')}
                </blockquote>
                <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      {t('16')}
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">52.6%</dd>
                  </div>
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      {t('17')}
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">47.4%</dd>
                  </div>
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      {t('18')}
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">0.90</dd>
                  </div>
                </dl>
                <p className="mt-8 text-body leading-relaxed text-pretty text-muted">
                  {t('19')}
                </p>
              </div>
            </div>
          </section>
  );
}
