/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section1Section() {
  const t = useTranslations("designed.visual-evidence.section1");
  return (
    <section className="bg-soft-gradient border-b border-line">
            <div className="frame pt-20 pb-20 lg:pt-28 lg:pb-24">
              <div className="reveal mx-auto max-w-3xl text-center">
                <h1 className="text-display text-balance">
                  {t('1')}
                </h1>
                <p
                  className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>
            </div>
          </section>
  );
}
