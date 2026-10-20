/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section5Section() {
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="reveal text-title">The ones that decide it</h2>
                </div>
                <div className="reveal border-t border-line lg:col-span-8">
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      How soon after the repair can we verify?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Immediately. The measurement reads your catalogue, not your
                      traffic, so there is nothing to wait for. Merchants usually
                      verify the week the population work finishes, while the team
                      still remembers what they did.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Does a partial repair still measure?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Yes, and it is often the more useful run. Populating 60% of a
                      field and measuring tells you whether the remaining 40% is
                      worth the effort, which is a question nobody can answer from a
                      completeness percentage.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Can we verify a category you did not audit?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Not meaningfully. Verification is a comparison against a
                      baseline, so the category needs an audit first to establish
                      what it was.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Can Pulse be customized for different product categories?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Yes. Pulse adapts the product attributes, the buying criteria
                      and the recommendations it produces to your specific product
                      category, so a laptop shelf and a skincare shelf are not
                      scored against the same questions.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </section>
  );
}
