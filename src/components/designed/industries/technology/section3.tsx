/**
 * Converted from `technology.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
export function Section3Section() {
  const t = designedText("industries.technology.section3");
  return (
    <section className="border-b border-line bg-surface-1/50">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
                <div className="reveal mt-8 max-w-md">
                  <p className="text-sm text-muted">
                    {t('2')}
                  </p>
                  <p className="mt-2 text-h3 text-pretty text-ink">
                    {t('3')}
                  </p>
                </div>
              </div>
              <div className="reveal lg:col-span-7">
                <div className="card">
                  <ul className="divide-y divide-line">
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('4')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('5')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('6')}
                      </p>
                    </li>
                    <li className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span
                        className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
                        aria-hidden="true"
                      ></span>
                      <p className="text-body text-pretty text-ink">
                        {t('7')}
                      </p>
                    </li>
                  </ul>
                  <div className="mt-5 flex gap-4 border-t border-line pt-5">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-file-text" />
                    </svg>
                    <p className="text-body text-pretty text-muted">
                      <span className="font-semibold text-ink"
                        >{t('8')}</span
                      >{" "}
                      {t('9')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
