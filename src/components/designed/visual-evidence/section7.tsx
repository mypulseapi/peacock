/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function Section7Section() {
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  What this does not prove yet
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-body leading-relaxed text-pretty text-muted">
                  It proves the overlap, because the overlap is a property of the
                  catalogue and we counted it. It does not prove anyone loses a sale
                  over it. The evidence for that would be a shopper opening a
                  picture, opening it again, and leaving. We do not collect that,
                  which is an uncomfortable thing to admit halfway down a page
                  arguing it matters.
                </p>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  So this is a measurement and a hypothesis, kept apart on purpose.
                  Two things would kill it. Reordering a product gallery turns out
                  not to change what people buy. Or merchants take the suggested
                  photograph, shoot it, and nothing moves. We would rather find
                  either of those out early, and we will publish it here when we do.
                </p>
                <p className="mt-6 text-body leading-relaxed text-pretty text-ink">
                  Measured in October 2026. Nothing on this page is for sale.
                  <Link                 href="/en/about"
                    className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                    >What we can and cannot claim</Link>
                  is the rest of it.
                </p>
              </div>
            </div>
          </section>
  );
}
