/**
 * The closing ask.
 *
 * New in this pass: the page ended on a feature list, which asks a visitor to decide between three
 * paid things when the next step is the free one. Deliberately plain, and the only thing on it is
 * the smallest commitment the page can offer.
 */
import { designedHref, designedText } from "../t";
import Link from "next/link";

export function Section4Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="hero-bg border-b border-line">
      <div className="frame py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal text-title text-balance">{t("finalTitle")}</h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-body leading-relaxed text-pretty text-muted delay-100">
            {t("finalLede")}
          </p>
          <div className="reveal mt-8 flex justify-center delay-200">
            <Link href={designedHref("/en/contact")} className="btn-primary">
              {t("finalCta")}
              <svg className="size-4" aria-hidden="true">
                <use href="#i-arrow-right" />
              </svg>
            </Link>
          </div>
          <p className="reveal mt-5 text-sm text-muted delay-300">
            {t("finalNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
