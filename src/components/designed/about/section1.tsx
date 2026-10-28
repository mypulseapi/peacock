/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import { designedText } from "../t";
import { HeroAurora } from "@/components/designed/hero-aurora";
export function Section1Section() {
  const t = designedText("about.section1");
  return (
    <section className="relative isolate bg-soft-gradient border-b border-line">
      <HeroAurora />
            <div className="frame pt-20 pb-20 lg:pt-28 lg:pb-24">
              <div className="reveal mx-auto max-w-3xl text-center">
                <h1 className="text-display text-balance">
                  {t('1')}
                </h1>
                <p
                  className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
                {/* Who we are (owner, 28 Oct 2026): who the customers are, in small type under the description. */}
                <p className="mx-auto mt-6 max-w-xl text-sm text-pretty text-muted">
                  {t("audience")}
                </p>
              </div>

              {/* The owner's picture (28 Oct 2026), in place of the drawn ranking figure that stood here.
                  A photo, so it sits framed in the page column rather than bleeding to the edges. */}
              <div className="reveal mt-14 delay-200 lg:mt-16">
                <Image
                  src={img("about/who-we-are-shopping-network.webp")}
                  alt={t("pictureAlt")}
                  width={1735}
                  height={906}
                  sizes="(min-width: 96rem) 80rem, (min-width: 64rem) 70rem, 100vw"
                  priority
                  className="h-auto w-full rounded-2xl border border-line shadow-sm"
                />
              </div>
            </div>
          </section>
  );
}
