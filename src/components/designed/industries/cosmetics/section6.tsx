/**
 * Converted from `cosmetics.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../../t";
import Link from "next/link";

export function Section6Section() {
  const t = designedText("industries.cosmetics.section6");
  return (
    <section className="cta-dots" data-cta>
            <div className="frame py-24 text-center lg:py-32">
              <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
                {t('1')}
              </h2>
              <p
                className="reveal mx-auto mt-6 max-w-xl text-lg text-pretty text-muted delay-100"
              >
                {t('2')}
              </p>
              <div
                className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200"
              >
                <Link href={designedHref("/en/contact")} className="btn-primary"
                  >{t('3')}</Link>
                <Link href={designedHref("/en/pricing")} className="btn-secondary">{t('4')}</Link>
              </div>
              <p
                className="reveal mx-auto mt-6 max-w-md text-sm text-pretty text-muted delay-300"
              >
                {t('5')}
              </p>
            </div>
          </section>
  );
}
