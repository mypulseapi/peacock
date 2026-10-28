/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../../t";
import Link from "next/link";
import { CtaBoxes } from "@/components/designed/cta-boxes";

export function RequestSection() {
  const t = designedText("product.decision-verification.request");
  return (
    <section
            id="request"
            className="cta-boxes scroll-mt-16 border-t border-line"
          >
            <CtaBoxes />
            <div className="frame py-24 text-center lg:py-32">
              <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
                {t('1')}
              </h2>

              <div
                className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200"
              >
                <Link href={designedHref("/en/contact")} className="btn-primary"
                  >{t('2')}</Link>
                <Link href={designedHref("/en#method")} className="btn-secondary"
                  >{t('3')}</Link>
              </div>
            </div>
          </section>
  );
}
