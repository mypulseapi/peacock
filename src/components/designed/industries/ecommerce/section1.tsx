/**
 * Converted from `ecommerce.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { AttributeIcon } from "../../attribute-icon";
import { designedHref, designedText } from "../../t";
import Link from "next/link";
import Image from "next/image";
import { img } from "@/lib/cdn";

export function Section1Section() {
  const t = designedText("industries.ecommerce.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div
              className="frame grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-6 lg:pr-16">
                <h1 className="reveal text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="reveal mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted delay-100"
                >
                  {t('2')}
                </p>
                <div className="reveal mt-8 flex flex-wrap gap-3 delay-200">
                  <Link href={designedHref("/en/contact")} className="btn-primary"
                    >{t('3')}</Link>
                  <Link href={designedHref("/en/product/decision-audit")} className="btn-secondary"
                    >{t('4')}</Link>
                </div>
                <p className="reveal mt-6 text-sm text-muted delay-300">
                  <span className="font-semibold text-ink"
                    >{t('5')}</span
                  >{" "}
                  {t('6')}
                </p>
              </div>
              <figure className="reveal delay-200 lg:col-span-6">
                <Image
                  src={img("industries/ecommerce-shelf-filter-coverage.webp")}
                  alt={t('figureAlt')}
                  width={1400}
                  height={845}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="h-auto w-full"
                />
                <figcaption className="mt-4 max-w-xl text-caption text-muted">
                  {t('figureSource')}
                </figcaption>
              </figure>
            </div>
          </section>
  );
}
