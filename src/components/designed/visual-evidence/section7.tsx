/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../t";
import Link from "next/link";

export function Section7Section() {
  const t = designedText("visual-evidence.section7");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  {t('1')}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-body leading-relaxed text-pretty text-muted">
                  {t('2')}
                </p>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  {t('3')}
                </p>
                <p className="mt-6 text-body leading-relaxed text-pretty text-ink">
                  {t('measuredIn')}{" "}
                  <Link                 href={designedHref("/en/about")}
                    className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                    >{t('4')}</Link>{" "}
                  {t('isTheRest')}
                </p>
              </div>
            </div>
          </section>
  );
}
