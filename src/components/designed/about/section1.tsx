/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
import { HeroAurora } from "@/components/designed/hero-aurora";
import { HeroPicture } from "@/components/designed/hero-picture";
export function Section1Section() {
  const t = designedText("about.section1");
  return (
    <section className="relative isolate bg-soft-gradient border-b border-line">
      <HeroAurora />
            <div className="frame pt-12 pb-20 lg:pt-16 lg:pb-24">
              <div className="reveal mx-auto max-w-3xl text-center">
                <h1 className="text-display text-balance">
                  {t('1')}
                </h1>
                <p
                  className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
              </div>

              {/* The owner's picture (28 Oct 2026), in place of the drawn ranking figure that stood here.
                  A photo, so it sits framed in the page column rather than bleeding to the edges. */}
              <div className="reveal mt-14 delay-200 lg:mt-16">
                {/* Light and dark are two drawings of the same scene; each theme shows one, as the logo does. The
                    light one is the page's LCP in the default theme, so it is the preloaded `HeroPicture`; the
                    dark one stays lazy, so the default theme does not fetch both. */}
                <HeroPicture
                  src="about/who-we-are-shopping-network.webp"
                  alt={t("pictureAlt")}
                  width={1735}
                  height={906}
                  sizes="(min-width: 96rem) 80rem, (min-width: 64rem) 70rem, 100vw"
                  className="h-auto w-full rounded-2xl border border-line shadow-sm theme-dark:hidden"
                />
                <HeroPicture
                  src="about/who-we-are-shopping-network-dark.webp"
                  alt={t("pictureAlt")}
                  width={1735}
                  height={906}
                  sizes="(min-width: 96rem) 80rem, (min-width: 64rem) 70rem, 100vw"
                  className="hidden h-auto w-full rounded-2xl border border-line shadow-sm theme-dark:block"
                  lazy
                />
              </div>
            </div>
          </section>
  );
}
