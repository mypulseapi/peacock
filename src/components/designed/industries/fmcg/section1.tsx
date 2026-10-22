/**
 * Converted from `fmcg.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Rebuilt from the supplied brief as a centred, editorial hero rather than a 50/50 split. The
 * split was fighting the illustration: the figure is detailed and wants horizontal room, and the
 * headline was wrapping to four lines in a column too narrow for it. Centring the words and
 * running the figure full width underneath gives each what it needs.
 *
 * Order: industry, the buying problem, the short explanation, the calls to action, then the visual
 * proof, then what Pulse makes of it. The coverage table that used to sit under the figure has
 * moved out: orphaned under a hero, it read as a stray link, and the evidence section that follows
 * is where a reader looking for the numbers goes.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import { designedHref, designedText } from "../../t";
import Link from "next/link";

/** What the figure proves, in three beats, as the brief set them out. */
const BEATS = ["step1", "step2", "step3"] as const;

export function Section1Section() {
  const t = designedText("industries.fmcg.section1");
  return (
    <section className="hero-bg overflow-hidden border-b border-line">
            <div className="frame pt-8 pb-14 lg:pt-10 lg:pb-16">
              <div className="mx-auto max-w-3xl text-center">
                <p className="reveal eyebrow">{t('eyebrow')}</p>
                <h1 className="reveal mt-3 text-headline text-balance">
                  {t('1')}
                </h1>
                {/*
                  The short lede, not the original paragraph. That one explained the mechanism in
                  full before the reader had seen the figure that shows it; this says what is bought
                  on and where the facts sit, and lets the picture carry the rest.
                */}
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
                reclaimed width does not scroll the page sideways, and the panel is the same width on every sector page. The image fills that panel rather than being bounded against
                the screen inside it: a height bound with `object-contain` letterboxed it, leaving
                pale bands down both sides of the border.

                Opaque, with no alpha, so the box keeps a light fill pinned in both themes.
              */}
              <figure className="reveal mt-7 delay-200 lg:mt-8 lg:bleed-x">
                <div className="mx-auto max-w-[880px] overflow-hidden rounded-2xl border border-line bg-[#fdfdfd]">
                  <Image
                    src={img("sectors/fmcg-shelf-label-evidence-coverage-ranked.webp")}
                    alt={t('figureAlt')}
                    width={1400}
                    height={891}
                    sizes="(min-width: 1280px) 880px, 94vw"
                    priority
                    className="h-auto w-full"
                  />
                </div>

                {/* What the figure means, read left to right under it. */}
                <ol className="mx-auto mt-7 grid max-w-[880px] grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
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
