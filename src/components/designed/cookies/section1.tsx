/**
 * Converted from `cookies.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function Section1Section() {
  const t = useTranslations("designed.cookies.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div className="frame py-20 lg:py-24">
              <h1 className="reveal max-w-3xl text-headline text-balance">
                {t('1')}
              </h1>
              <p
                className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100"
              >
                {t('2')}
              </p>
            </div>
          </section>
  );
}
