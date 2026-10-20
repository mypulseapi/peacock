/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section5Section() {
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  What does this change about the audit?
                </h2>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  It adds a question we were not asking, and it turns out to be the
                  one with the money in it.
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="text-body leading-relaxed text-pretty text-muted">
                  A shopper can be told a fact in three ways: a field they can
                  filter on, a picture they can look at, or a sentence they will
                  actually read. The audit measures the first one. So the right
                  question is not whether an attribute is recorded. It is whether
                  the shopper can perceive it at all, and then what the cheapest
                  repair is.
                </p>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  That last part matters, because the cheapest repair is often not
                  the one we currently recommend. Today the audit says record this
                  attribute. Quite often the attribute is already recorded and the
                  real repair is to put it on the picture, or into the comparison
                  table, or into the first line of the description where someone
                  will read it.
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="border-t-2 border-primary pt-5">
                    <h3 className="text-h3 text-ink">The fact does not exist</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Somebody has to go and get it. This is the audit we already
                      sell, and it is the half of the problem we know how to price.
                    </p>
                  </div>
                  <div className="border-t-2 border-warning pt-5">
                    <h3 className="text-h3 text-ink">
                      The fact exists and nobody can see it
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Somebody has to show it. This is new, we do not sell it yet,
                      and on our own catalogue it is the larger of the two piles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
