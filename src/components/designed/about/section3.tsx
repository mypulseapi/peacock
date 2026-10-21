/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section3Section() {
  const t = useTranslations("designed.about.section3");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">{t('1')}</h2>
                <p
                  className="mt-4 max-w-sm text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">{t('3')}</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    {t('4')}
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">{t('5')}</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    {t('6')}
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">{t('7')}</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    Our ranking is steady at the top and less steady below it, and
                    we say so{" "}
                    <a
                      href="#ranking"
                      className="text-link underline underline-offset-4 hover:text-primary-hover"
                      >{t('8')}</a
                    >{t('9')}
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">{t('10')}</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    {t('11')}
                  </p>
                </li>
              </ul>
            </div>
          </section>
  );
}
