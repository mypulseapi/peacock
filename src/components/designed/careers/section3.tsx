/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section3Section() {
  const t = useTranslations("designed.careers.section3");
  return (
    <section className="border-b border-line bg-surface-1/50">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-6 lg:pr-16">
                <h2 className="reveal text-title text-balance">{t('1')}</h2>
                <p
                  className="reveal mt-6 max-w-xl text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              <ul
                className="reveal grid grid-cols-1 content-start gap-4 text-h3 text-ink sm:grid-cols-2 lg:col-span-6"
              >
                <li className="flex gap-3">
                  <svg className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  ><span>{t('3')}</span>
                </li>
                <li className="flex gap-3">
                  <svg className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  ><span>{t('4')}</span>
                </li>
                <li className="flex gap-3">
                  <svg className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  ><span>{t('5')}</span>
                </li>
                <li className="flex gap-3">
                  <svg className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  ><span>{t('6')}</span>
                </li>
              </ul>
              <dl
                className="reveal grid grid-cols-2 divide-line border-t border-line sm:grid-cols-4 sm:divide-x lg:col-span-12"
              >
                <div className="px-0 py-6 sm:px-6 sm:first:pl-0">
                  <dt className="text-sm text-muted">{t('7')}</dt>
                  <dd
                    className="mt-1 font-display text-h1 font-semibold tabular-nums text-ink"
                  >
                    15+
                  </dd>
                </div>
                <div className="px-0 py-6 sm:px-6 sm:first:pl-0">
                  <dt className="text-sm text-muted">{t('8')}</dt>
                  <dd
                    className="mt-1 font-display text-h1 font-semibold tabular-nums text-ink"
                  >
                    2
                  </dd>
                </div>
                <div className="px-0 py-6 sm:px-6 sm:first:pl-0">
                  <dt className="text-sm text-muted">{t('9')}</dt>
                  <dd className="mt-1 font-display text-h2 font-semibold text-ink">
                    {t('10')}
                  </dd>
                </div>
                <div className="px-0 py-6 sm:px-6 sm:first:pl-0">
                  <dt className="text-sm text-muted">{t('11')}</dt>
                  <dd
                    className="mt-1 font-display text-h1 font-semibold tabular-nums text-ink"
                  >
                    2025
                  </dd>
                </div>
              </dl>
            </div>
          </section>
  );
}
