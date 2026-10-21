/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section3Section() {
  const t = designedText("home.section3");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance text-ink">
                {t('1')}
              </h2>
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
                <article
                  className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm lg:p-10"
                >
                  <p className="eyebrow">{t('2')}</p>
                  <h3 className="mt-4 text-h2 text-balance text-ink">
                    <span className="xl:block">{t('3')}</span>
                    <span className="xl:block"
                      >{t('4')}</span
                    >
                  </h3>
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('5')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        The product packaging shows whether it&rsquo;s
                        fragrance-free, but this information{" "}
                        <strong
                          className="font-semibold whitespace-nowrap text-gap-strong"
                          >{t('6')}</strong
                        >{" "}
                        {t('7')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('8')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        {t('fragranceLead')}{" "}
                        <strong className="font-semibold tabular-nums">40</strong>{" "}
                        {t('fragranceTail')}
                      </dd>
                    </div>
                  </dl>
                </article>
                <article
                  className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm delay-100 lg:p-10"
                >
                  <p className="eyebrow">{t('9')}</p>
                  <h3 className="mt-4 text-h2 text-balance text-ink">
                    <span className="xl:block">{t('10')}</span>
                    <span className="xl:block"
                      >{t('11')}</span
                    >
                  </h3>
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('12')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        Screen size appears in{" "}
                        <strong className="font-semibold tabular-nums"
                          >{t('13')}</strong
                        >{" "}
                        product titles, but{" "}
                        <strong
                          className="font-semibold whitespace-nowrap text-gap-strong"
                          >{t('14')}</strong
                        >{" "}
                        {t('15')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('16')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        Without clear product attributes, shoppers struggle to see
                        the differences between{" "}
                        <strong className="font-semibold tabular-nums"
                          >{t('17')}</strong
                        >{" "}
                        {t('18')}
                      </dd>
                    </div>
                  </dl>
                </article>
              </div>
            </div>
          </section>
  );
}
