/**
 * Converted from `technology.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section5Section() {
  const t = useTranslations("designed.industries.technology.section5");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="max-w-2xl">
                <h2 className="reveal text-title text-balance">{t('1')}</h2>
                <p
                  className="reveal mt-6 text-body leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
              <ol
                className="reveal mt-12 grid grid-cols-1 gap-8 rounded-3xl border border-primary-line bg-primary-wash p-6 md:grid-cols-3 lg:p-10"
              >
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >1</span
                  >
                  <h3 className="mt-5 text-h3">{t('3')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('4')}
                  </p>
                </li>
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >2</span
                  >
                  <h3 className="mt-5 text-h3">{t('5')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('6')}
                  </p>
                </li>
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >3</span
                  >
                  <h3 className="mt-5 text-h3">{t('7')}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {t('8')}
                  </p>
                </li>
              </ol>
              <ul
                className="reveal mt-6 flex flex-wrap gap-2"
                aria-label="What it takes"
              >
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >{t('9')}
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >{t('10')}
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >{t('11')}
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >{t('12')}
                </li>
              </ul>
            </div>
          </section>
  );
}
