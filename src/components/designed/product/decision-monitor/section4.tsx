/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
export function Section4Section() {
  const t = designedText("product.decision-monitor.section4");
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance">
                {t('1')}
              </h2>
              {/* Timeline (as on the Decision Audit and Verification pages): the calm line grows across the three stops */}
              <div className="relative mt-14">
                <div
                  className="absolute inset-x-0 top-2 hidden h-1 overflow-hidden rounded-full bg-surface-1 md:block"
                  aria-hidden="true"
                >
                  <span
                    className="reveal-bar block h-full w-full rounded-full bg-calm-gradient delay-150"
                  ></span>
                </div>
                <div
                  className="absolute top-2 bottom-0 left-2 w-1 rounded-full bg-primary-line md:hidden"
                  aria-hidden="true"
                ></div>
                <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
                  <li className="reveal relative pl-9 delay-150 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">{t('2')}</p>
                    <h3 className="mt-4 text-h3 text-ink">{t('3')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('4')}
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-500 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">
                      {t('5')}
                    </p>
                    <h3 className="mt-4 text-h3 text-ink">{t('6')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('7')}
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-850 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">
                      {t('8')}
                    </p>
                    <h3 className="mt-4 text-h3 text-ink">
                      {t('9')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      {t('10')}
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </section>
  );
}
