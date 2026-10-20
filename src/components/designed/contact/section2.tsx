/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section2Section() {
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="reveal text-title">Frequently Asked Questions</h2>
                </div>
                <div className="reveal border-t border-line lg:col-span-8">
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink"
                    >
                      How long does the first audit take?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Forty-eight hours from the moment your export lands. There is
                      nothing to integrate first, because the audit reads a file
                      rather than your website. Most teams get the export out of
                      their PIM or platform in under an hour.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink"
                    >
                      Is the first audit really free?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Yes. One category, one export, no account and no card. We
                      would rather you judged the method on your own products than
                      on somebody else&apos;s case study. What comes after is priced per
                      cycle, and nobody has to decide that on day one.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink"
                    >
                      How quickly will someone reply?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Usually the same working day. The inbox is read by the people
                      who do the work rather than by a queue, so the reply comes
                      from someone who can actually open your catalogue.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink"
                    >
                      Do you work with agencies and consultants?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="pb-6 text-body text-muted">
                      Yes. We are building a partner programme for agencies,
                      consultants and systems integrators who run catalogue work for
                      their clients, and we are talking to the first partners now.
                      An audit takes the same single export whether it comes from
                      you or from your client. Write to{" "}
                      <a
                        href="mailto:partners@thepulseapi.com"
                        className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                        >partners@thepulseapi.com</a
                      >
                      and tell us whose catalogue it is.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </section>
  );
}
