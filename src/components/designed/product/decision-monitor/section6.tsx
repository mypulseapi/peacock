/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section6Section() {
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="reveal text-title">The ones that decide it</h2>
                </div>
                <div className="reveal border-t border-line lg:col-span-8">
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      How often should we run it?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-6 text-body text-muted">
                      Match it to how often your catalogue actually changes. A
                      marketplace onboarding sellers weekly wants weekly. A
                      specialist retailer with two seasonal ranges wants monthly or
                      even quarterly. Running it more often than your catalogue
                      changes just produces identical numbers.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Does Pulse need access to my database, servers, or website
                      backend?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-6 text-body text-muted">
                      No. It reads the same export the audit read. If you can
                      schedule that export, monitoring works, and nothing on your
                      site or in your stack changes.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Can we monitor categories we have not audited?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-6 text-body text-muted">
                      They need an audit first to set the baseline. After that,
                      monitoring keeps measuring against it.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      Will we have technical support during the monitoring process?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-6 text-body text-muted">
                      Yes. Monitoring is a running engagement rather than a
                      delivered file, so you keep the same contact through it:
                      someone who knows your taxonomy, reads the alerts with you and
                      helps decide which ones are worth acting on.
                    </p>
                  </details>
                  <details className="group border-b border-line">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary"
                    >
                      What can Pulse see of our systems and our shoppers?
                      <svg
                        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-6 text-body text-muted">
                      Only the export you send. Monitor reads the same category
                      export the audit read: no integration, nothing installed on
                      your site, no access to your internal systems, and no personal
                      data about shoppers.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </section>
  );
}
