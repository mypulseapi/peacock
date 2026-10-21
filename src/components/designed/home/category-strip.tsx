/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function CategoryStripSection() {
  const t = useTranslations("designed.home.category-strip");
  return (
    <section
            className="hidden border-b border-line"
            aria-label="Categories Pulse audits"
          >
            <div className="frame overflow-hidden">
              <ul
                className="-mr-px -mb-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
              >
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('1')}</span
                  >
                  <span className="text-xs text-muted">{t('2')}</span>
                </li>
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('3')}</span
                  >
                  <span className="text-xs text-muted">{t('4')}</span>
                </li>
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('5')}</span
                  >
                  <span className="text-xs text-muted">{t('6')}</span>
                </li>
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('7')}</span
                  >
                  <span className="text-xs text-muted">{t('8')}</span>
                </li>
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('9')}</span
                  >
                  <span className="text-xs text-muted">{t('10')}</span>
                </li>
                <li
                  className="flex h-24 flex-col items-center justify-center gap-1 border-r border-b border-line"
                >
                  <span className="font-display text-lg font-semibold text-ink"
                    >{t('11')}</span
                  >
                  <span className="text-xs text-muted">{t('12')}</span>
                </li>
              </ul>
            </div>
          </section>
  );
}
