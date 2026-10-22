/**
 * Converted from `cosmetics.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Built as a centred, editorial hero, matching the FMCG and furniture pages so the sector pages
 * read as one set. The 50/50 split it replaced was fighting the illustration: the figure is
 * detailed and wants horizontal room, and the headline was wrapping narrow beside it.
 *
 * The hand-built coverage bars are gone with it. The supplied figure already ranks concern
 * addressed 24, skin type 29, key ingredient 41 and volume 88; drawing the same four twice left
 * two places for them to disagree. The table of those numbers now sits in the evidence section,
 * where a reader who wants them goes.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import { designedHref, designedText } from "../../t";
import Link from "next/link";

/** What the figure proves, in three beats. */
const BEATS = ["step1", "step2", "step3"] as const;

export function Section1Section() {
  const t = designedText("industries.cosmetics.section1");
  return (
    <section className="hero-bg overflow-hidden border-b border-line">
            <div className="frame pt-8 pb-14 lg:pt-10 lg:pb-16">
              <div className="mx-auto max-w-3xl text-center">
                <p className="reveal eyebrow">{t('eyebrow')}</p>
                <h1 className="reveal mt-3 text-headline text-balance">
                  {t('1')}
                </h1>
                <p className="reveal mx-auto mt-3 max-w-2xl text-body leading-relaxed text-pretty text-muted delay-100">
                  {t('lede')}
                </p>
                <div className="reveal mt-6 flex flex-wrap justify-center gap-3 delay-200">
                  <Link href={designedHref("/en/contact")} className="btn-primary"
                    >{t('3')}</Link>
                  <Link href={designedHref("/en/product/decision-audit")} className="btn-secondary"
                    >{t('4')}</Link>
                </div>
                <p className="reveal mt-5 flex items-center justify-center gap-2.5 text-sm text-muted delay-300">
                  <svg className="size-4 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-sparkles" />
                  </svg>
                  <span>
                    <span className="font-semibold text-ink">{t('5')}</span>{" "}
                    {t('6')}
                  </span>
                </p>
              </div>

              {/*
                The figure, under the words and wider than the page column.

                `bleed-x` gives back the page margins the frame took and the section clips, so the
                reclaimed width does not scroll the page sideways; the 1200px cap is the width the
                illustration was drawn for. It fills that panel rather than being bounded against
                the screen inside it, which would letterbox it and leave pale bands down both sides.

                Opaque, with no alpha, so the box keeps a light fill pinned in both themes.
              */}
              <figure className="reveal mt-7 delay-200 lg:mt-8 lg:bleed-x">
                <div className="mx-auto max-w-[940px] overflow-hidden rounded-2xl border border-line bg-[#fdfdfd]">
                  <Image
                    src={img("sectors/cosmetics-shelf-suitability-attribute-coverage.webp")}
                    alt={t('figureAlt')}
                    width={1400}
                    height={700}
                    sizes="(min-width: 1280px) 940px, 94vw"
                    priority
                    className="h-auto w-full"
                  />
                </div>

                {/* What the figure means, read left to right under it. */}
                <ol className="mx-auto mt-7 grid max-w-[940px] grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
                  {BEATS.map((key, i) => (
                    <li key={key} className="flex gap-3">
                      <span
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary-tint text-caption font-semibold tabular-nums text-primary"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-body font-semibold text-ink">{t(key)}</p>
                        <p className="mt-1 text-data text-pretty text-muted">{t(`${key}Body`)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </figure>
            </div>
          </section>
  );
}
