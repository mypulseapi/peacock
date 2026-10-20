/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section4Section() {
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance">
                How does the audit work?
              </h2>
              {/* Timeline: the calm line grows across the three stops as the section scrolls in (reveal-bar); on phones the
                   stops stack along a static line on the left. */}
              <div className="relative mt-14">
                <div
                  className="absolute top-2 inset-x-0 hidden h-1 overflow-hidden rounded-full bg-surface-1 md:block"
                  aria-hidden="true"
                >
                  <span
                    className="reveal-bar block h-full w-full rounded-full bg-calm-gradient delay-150"
                  ></span>
                </div>
                <div
                  className="absolute top-2 bottom-0 left-2 w-1 rounded-full bg-primary-line md:hidden"
                  aria-hidden="true"
                ></div>
                <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
                  <li className="reveal relative pl-9 delay-150 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">You</p>
                    <h3 className="mt-4 text-h3 text-ink">Send one category</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Provide a CSV or JSON file containing product names,
                      descriptions, categories, prices, and existing attributes.
                      Choose a category where shoppers struggle to find the right
                      product.
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-500 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">Us</p>
                    <h3 className="mt-4 text-h3 text-ink">We measure it</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Within 48 hours, we measure how much each attribute helps tell
                      products apart, and what it would be worth if recorded across
                      the category, in bits rather than clicks.
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-850 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">Both</p>
                    <h3 className="mt-4 text-h3 text-ink">We walk you through it</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Receive a ranked list of attributes and supporting files. We
                      walk you through the findings and discuss what it would take
                      to act on them.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </section>
  );
}
