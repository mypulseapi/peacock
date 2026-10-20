/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section4Section() {
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="min-w-0 lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  Then we checked our own catalogue, and it was worse
                </h2>
                <p className="mt-4 text-body leading-relaxed text-pretty text-muted">
                  2,176 products in the catalogue we use for our own demonstrations.
                  We counted coverage per attribute, left out ratings and sales
                  counts because those describe the listing rather than the product,
                  and asked of each one whether a single product photograph already
                  answers it.
                </p>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <div className="card">
                  <dl className="divide-y divide-line">
                    <div
                      className="flex items-baseline justify-between gap-4 py-4 first:pt-0"
                    >
                      <dt className="text-ink">Colour</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-ink">100.0%</span>
                        <span className="w-28 text-right text-sm text-muted"
                          >photo shows it</span
                        >
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">Size</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">45.2%</span>
                        <span className="w-28 text-right text-sm text-muted">no</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">Capacity</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">21.3%</span>
                        <span className="w-28 text-right text-sm text-muted">no</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">Storage</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">12.9%</span>
                        <span className="w-28 text-right text-sm text-muted">no</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-ink">Memory</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">7.2%</span>
                        <span className="w-28 text-right text-sm text-muted">no</span>
                      </dd>
                    </div>
                    <div
                      className="flex items-baseline justify-between gap-4 py-4 last:pb-0"
                    >
                      <dt className="text-ink">Variant</dt>
                      <dd className="flex items-baseline gap-4">
                        <span className="tabular-nums text-muted">3.5%</span>
                        <span className="w-28 text-right text-sm text-muted">no</span>
                      </dd>
                    </div>
                  </dl>
                </div>
                <blockquote
                  className="mt-8 border-l-2 border-signal pl-6 text-h3 text-balance text-ink"
                >
                  The only attribute recorded on every single product is the only
                  one the photograph already answers.
                </blockquote>
                <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      Recorded values the photo repeats
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">52.6%</dd>
                  </div>
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      Recorded values that add something
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">47.4%</dd>
                  </div>
                  <div className="border-t-2 border-primary pt-4">
                    <dt className="text-sm text-muted">
                      Facts per product you cannot get by looking
                    </dt>
                    <dd className="text-h2 tabular-nums text-ink">0.90</dd>
                  </div>
                </dl>
                <p className="mt-8 text-body leading-relaxed text-pretty text-muted">
                  Over half of everything this catalogue records is a second copy of
                  what the picture shows. The average product carries less than one
                  fact a shopper cannot get by looking at it. And every product has
                  exactly one image. Not a median of one. All 2,176.
                </p>
              </div>
            </div>
          </section>
  );
}
