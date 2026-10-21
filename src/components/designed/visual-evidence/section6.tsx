/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section6Section() {
  const t = designedText("visual-evidence.section6");
  return (
    <section className="bg-void border-b border-line">
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
                <ol className="divide-y divide-line">
                  <li className="py-5 first:pt-0">
                    <h3 className="text-h3 text-ink">{t('3')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('4')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-ink">
                      {t('5')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('6')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-ink">
                      {t('7')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('8')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-ink">{t('9')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('10')}
                    </p>
                  </li>
                  <li className="py-5 last:pb-0">
                    <h3 className="text-h3 text-ink">
                      {t('11')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('12')}
                    </p>
                  </li>
                </ol>
                <p
                  className="mt-10 border-t border-line pt-6 text-h3 text-balance text-ink"
                >
                  {t('13')}
                </p>
              </div>
            </div>
          </section>
  );
}
