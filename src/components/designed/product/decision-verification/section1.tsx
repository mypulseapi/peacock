/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../../t";
import Image from "next/image";
import { img } from "@/lib/cdn";

import Link from "next/link";
import { HeroAurora } from "@/components/designed/hero-aurora";

export function Section1Section() {
  const t = designedText("product.decision-verification.section1");
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <HeroAurora />
            {/* the frame keeps the page margins; the figure below then reclaims them, so the words sit
                 in the page column and the image spans the screen */}
            <div className="frame">
              {/*
                The copy above the figure rather than beside it.

                The words are the page's heading and its description, and they still have to be the
                first thing a reader and a crawler meet, so they stay an `h1` and a paragraph in
                source order. What changed is their weight: they are sized down and centred over a
                narrow column, because the figure is what a merchant actually reads this page for.
              */}
              <div className="pt-12 pb-0 lg:pt-16">
                {/* The page headline at the home hero's size (owner's Version A, 26 Oct 2026); it was the
                    section-title size, so it read no bigger than the headings below it. max-w-4xl so each
                    of its two lines still fits at 54px, in Vietnamese too. */}
                <div className="mx-auto max-w-4xl text-center">
                  <h1 className="reveal text-hero text-balance">
                    {/*
                      `sm:block` only breaks the line from 640px up. Below that the two spans are
                      inline, and JSX drops the newline between them, so the headline rendered as
                      "productdata", "fixagainst" and "shelfstopped" on every phone. The explicit
                      space is the fix: it separates them when they are inline and collapses
                      harmlessly at the end of a line once they are blocks.
                    */}
                    <span className="sm:block">{t('1')}</span>{" "}
                    <span className="sm:block">{t('2')}</span>
                  </h1>
                  <p
                    className="reveal mx-auto mt-4 max-w-xl text-body leading-relaxed text-pretty text-muted delay-100"
                  >
                    {t('3')}
                  </p>
                  {/* "Ask AI" is a placeholder, hidden until the AI assistant exists: remove "hidden" and wire it up then */}
                  <div className="reveal mt-7 flex flex-wrap justify-center gap-3 delay-200">
                    <Link href={designedHref("/en/contact")} className="btn-primary"
                      >{t('4')}</Link>
                    <button type="button" className="btn-secondary hidden" data-ask-ai>
                      <svg className="size-4 text-primary" aria-hidden="true">
                        <use href="#i-sparkles" /></svg
                      >{t('5')}
                    </button>
                  </div>
                </div>
                {/*
                  The figure, under the words and across the whole screen.

                  An image as supplied, not a built scene. `bleed-x` gives back the page margins the
                  frame took; the section clips, so the reclaimed width does not scroll the page
                  sideways. The height cap is what makes the whole figure visible at once: the image
                  is 2:1, so at full page width it stands 720px tall on a 1440px screen and its lower
                  half falls below the fold. `max-h` in `svh` bounds it against the screen rather
                  than the page, and `object-contain` fits the whole image inside that bound instead
                  of cropping it.
                */}
                <div className="reveal mt-8 delay-200 lg:mt-10 lg:bleed-x">
                  <Image
                    src={img("product/decision-verification-attribute-evidence-check.webp")}
                    alt={t('figureAlt')}
                    width={1774}
                    height={887}
                    sizes="100vw"
                    priority
                    className="mx-auto h-auto w-full object-contain lg:max-h-[calc(100svh-28rem)]"
                  />
                </div>
              </div>
            </div>
          </section>
  );
}
