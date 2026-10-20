/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function RequestSection() {
  return (
    <section
            id="request"
            className="cta-dots scroll-mt-16 border-t border-line"
            data-cta
          >
            <div className="frame py-24 text-center lg:py-32">
              <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
                Discover your shoppers’ intent with Pulse
              </h2>

              <div
                className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200"
              >
                <Link href="/en/contact" className="btn-primary"
                  >Request a Decision Audit</Link>
                <Link href="/en#method" className="btn-secondary"
                  >Read the method first</Link>
              </div>
            </div>
          </section>
  );
}
