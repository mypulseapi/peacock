/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../t";
import Link from "next/link";

export function Section4Section() {
  const t = designedText("about.section4");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  {t('1')}
                </h2>
                <p
                  className="mt-4 max-w-sm text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              <div className="lg:col-span-7">
                <div
                  className="grid gap-10 rounded-3xl border border-primary-line bg-primary-wash p-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line lg:p-8"
                >
                  <div className="md:pr-8">
                    <h3
                      className="flex items-center gap-2 border-b-2 border-success pb-3 text-h3 text-ink"
                    >
                      <svg className="size-5 shrink-0 text-success" aria-hidden="true">
                        <use href="#i-circle-check" /></svg
                      >{t('3')}
                    </h3>
                    <dl className="mt-4 divide-y divide-line">
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('4')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('5')}
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('6')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('7')}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="md:pl-8">
                    <h3
                      className="flex items-center gap-2 border-b-2 border-warning pb-3 text-h3 text-ink"
                    >
                      <svg className="size-5 shrink-0 text-warning" aria-hidden="true">
                        <use href="#i-circle-alert" /></svg
                      >{t('8')}
                    </h3>
                    <dl className="mt-4 divide-y divide-line">
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('9')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('10')}
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('11')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('12')}
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('13')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('14')}
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          {t('15')}
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          {t('threeWays')}{" "}
                          <Link                         href={designedHref("/en/research/photographs")}
                            className="text-link underline underline-offset-4 hover:text-primary-hover"
                            >{t('16')}</Link>.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <p className="mt-10 border-t border-line pt-6 text-body text-ink">
                  {t('oneExport')}{" "}
                  <Link                 href={designedHref("/en/contact")}
                    className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                    >{t('17')}</Link>
                </p>
              </div>
            </div>
          </section>
  );
}
