/**
 * Converted from `fmcg.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section2Section() {
  const t = useTranslations("designed.industries.fmcg.section2");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-4 lg:pr-12">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
              </div>
              <ul
                className="reveal divide-y divide-line border-y border-line lg:col-span-8"
              >
                <li className="flex items-baseline gap-5 py-5 sm:gap-8">
                  <p
                    className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24"
                  >
                    38%
                  </p>
                  <div>
                    <p className="text-body text-pretty text-ink">
                      {t('2')}
                    </p>
                    <p className="mt-1 text-caption text-muted">{t('3')}</p>
                  </div>
                </li>
                <li className="flex items-baseline gap-5 py-5 sm:gap-8">
                  <p
                    className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24"
                  >
                    34%
                  </p>
                  <div>
                    <p className="text-body text-pretty text-ink">
                      {t('4')}
                    </p>
                    <p className="mt-1 text-caption text-muted">{t('5')}</p>
                  </div>
                </li>
                <li className="flex items-baseline gap-5 py-5 sm:gap-8">
                  <p
                    className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24"
                  >
                    79%
                  </p>
                  <div>
                    <p className="text-body text-pretty text-ink">
                      {t('6')}
                    </p>
                    <p className="mt-1 text-caption text-muted">{t('7')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
  );
}
