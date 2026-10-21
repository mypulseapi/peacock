/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { HeroScene } from "../hero-scene";
import { designedHref, designedText } from "../../t";

import Link from "next/link";

export function Section1Section() {
  const t = designedText("product.decision-verification.section1");
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <HeroScene variant="verification" />
            </div>
            {/* the frame keeps the page margins; the box inside it is the hero's height (540 / 800px) with the title and
                 the description under it at the top left */}
            <div className="frame">
              {/* The designer set `lg:min-h-200` here, a forced 800px. These three heroes carry less
                   than the home page's demo rail does, so on a wide screen it reserved about 390px
                   of empty gradient under the content. Dropped so the hero sizes to what is in it,
                   like every other designed hero; the padding and the small-screen minimum stay. */}
              <div className="min-h-135 py-14 lg:py-20">
                <h1 className="reveal max-w-2xl text-headline text-balance">
                  <span className="sm:block">{t('1')}</span>
                  <span className="sm:block">{t('2')}</span>
                </h1>
                <p
                  className="reveal mt-6 max-w-lg text-lg leading-relaxed text-balance text-muted delay-100"
                >
                  {t('3')}
                </p>
                {/* "Ask AI" is a placeholder, hidden until the AI assistant exists: remove "hidden" and wire it up then */}
                <div className="reveal mt-8 flex flex-wrap gap-3 delay-200">
                  <Link href={designedHref("/en/contact")} className="btn-primary"
                    >{t('4')}</Link>
                  <button type="button" className="btn-secondary hidden" data-ask-ai>
                    <svg className="size-4 text-primary" aria-hidden="true">
                      <use href="#i-sparkles" /></svg
                    >{t('5')}
                  </button>
                </div>
              </div>
            </div>
          </section>
  );
}
