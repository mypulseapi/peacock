/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
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
                Set it once, then hear about it when it matters
              </h2>
              {/* Timeline (as on the Decision Audit and Verification pages): the calm line grows across the three stops */}
              <div className="relative mt-14">
                <div
                  className="absolute inset-x-0 top-2 hidden h-1 overflow-hidden rounded-full bg-surface-1 md:block"
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
                    <p className="text-data font-semibold text-primary md:mt-8">Once</p>
                    <h3 className="mt-4 text-h3 text-ink">Set the cadence</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Weekly or monthly, matched to how often your catalogue
                      changes. It reads the same export the audit read, so there is
                      nothing new to build and no integration to maintain.
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-500 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">
                      Ongoing
                    </p>
                    <h3 className="mt-4 text-h3 text-ink">Monitor re-measures</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      The same method on every run, so the numbers are comparable
                      over time rather than a series of unrelated snapshots.
                    </p>
                  </li>
                  <li className="reveal relative pl-9 delay-850 md:pl-0">
                    <span
                      className="absolute top-0.5 left-0 size-5 rounded-full border-4 border-card bg-primary ring-1 ring-primary-line md:static md:block"
                      aria-hidden="true"
                    ></span>
                    <p className="text-data font-semibold text-primary md:mt-8">
                      When it matters
                    </p>
                    <h3 className="mt-4 text-h3 text-ink">
                      You get told, with the reason
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-muted"
                    >
                      Not a dashboard you have to remember to open. An alert naming
                      the shelf, the attribute and what caused the drop.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </section>
  );
}
