/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section2Section() {
  const t = designedText("careers.section2");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-4 lg:pr-12">
                <h2 className="reveal text-title text-balance">{t('1')}</h2>
                <p
                  className="reveal mt-6 max-w-md text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              <div
                className="reveal grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8"
              >
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('3')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('4')}
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('5')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('6')}
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('7')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('8')}
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('9')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('10')}
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('11')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('12')}
                  </p>
                </div>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3">{t('13')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('14')}
                  </p>
                </div>
              </div>
            </div>
          </section>
  );
}
