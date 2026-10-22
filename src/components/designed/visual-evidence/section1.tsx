/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Redesigned, not rewritten: every word on this page is the measurement it was published with.
 *
 * Three changes. An eyebrow, so the page announces what it is before the headline argues it, as
 * the sector heroes do. The headline bounded by its measure rather than left to a 48rem column,
 * where it broke to three lines and read heavier than any other h1 on the site. And the provenance
 * line lifted here from the foot of the page: a page whose whole claim is that it counted
 * something should say when it counted and that it is not selling anything before the argument,
 * not eight sections after it.
 *
 * `text-wrap: balance` with a bounded measure, not a forced break. A hardcoded line break is right
 * at one width in one language and wrong everywhere else, and this page is published in two.
 */
import { designedText } from "../t";
export function Section1Section() {
  const t = designedText("visual-evidence.section1");
  return (
    <section className="bg-soft-gradient border-b border-line">
            <div className="frame pt-16 pb-16 lg:pt-20 lg:pb-20">
              <div className="reveal mx-auto max-w-4xl text-center">
                <p className="eyebrow">{t('eyebrow')}</p>
                <h1 className="mx-auto mt-3 max-w-[34ch] text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted"
                >
                  {t('2')}
                </p>
                {/* What this page is, and is not, said up front. */}
                <p className="mx-auto mt-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-card/70 px-4 py-2 text-caption text-muted">
                  <svg className="size-3.5 shrink-0 text-primary" aria-hidden="true">
                    <use href="#i-flask" />
                  </svg>
                  <span className="text-pretty">{t('provenance')}</span>
                </p>
              </div>
            </div>
          </section>
  );
}
