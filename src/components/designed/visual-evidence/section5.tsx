/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section5Section() {
  const t = designedText("visual-evidence.section5");
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
                <p className="text-body leading-relaxed text-pretty text-muted">
                  {t('3')}
                </p>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  {t('4')}
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="border-t-2 border-primary pt-5">
                    <h3 className="text-h3 text-ink">{t('5')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('6')}
                    </p>
                  </div>
                  <div className="border-t-2 border-warning pt-5">
                    <h3 className="text-h3 text-ink">
                      {t('7')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('8')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
