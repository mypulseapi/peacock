/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section2Section() {
  return (
    <section className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              {/* the home page's How it works card: a flat 6% Pulse Blue tint, rounded-3xl, primary-line border */}
              <div
                className="bg-primary-wash grid gap-10 rounded-3xl border border-primary-line px-5 py-14 sm:px-10 lg:grid-cols-12 lg:gap-x-12 lg:px-14 lg:py-20"
              >
                <div className="min-w-0 lg:col-span-7">
                  <h2 className="reveal text-title text-balance">
                    A more complete catalogue isn’t always better
                  </h2>
                  <h3 className="reveal mt-6 text-h3 text-ink delay-100">
                    But are the right product attributes included?
                  </h3>
                  <p
                    className="reveal mt-3 text-body leading-relaxed text-pretty text-muted delay-100"
                  >
                    Higher catalogue completeness doesn’t guarantee better product
                    discovery. Missing decisive attributes can still make products
                    difficult to compare and choose.
                  </p>
                  <p
                    className="reveal mt-6 text-lg font-medium text-pretty text-ink delay-200"
                  >
                    Focus on attribute importance, not just completeness.
                  </p>
                </div>
                {/* Before / after meter (story scene, plays once: data-story data-once, src/main.js). One bar holds 71%; at beat 2 the
                     After figure 93% rises in beside the Before 71% while the 22 new points grow out of
                     the 71 marker; at beat 3 the "+22 percentage points" chip lands at the bar's end. Written in the final frame,
                     so without JS or with reduced motion the 93% state shows. */}
                <div className="reveal min-w-0 delay-200 lg:col-span-5 lg:self-center">
                  <div
                    className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8"
                    data-story
                    data-once
                  >
                    <div
                      className="how-scene"
                      data-scene
                      data-beats="0 900 2100"
                      role="img"
                      aria-label="Fields filled on the example shelf: 71% before, 93% after, up 22 percentage points."
                    >
                      <div
                        className="flex flex-wrap justify-between gap-x-12 gap-y-6"
                        aria-hidden="true"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-muted">Before</p>
                          <p
                            className="mt-1 font-display text-display font-semibold text-muted tabular-nums"
                          >
                            71%
                          </p>
                          <p className="text-sm text-muted">Fields filled</p>
                        </div>
                        <div className="ml-auto min-w-0 text-right">
                          <p className="text-sm text-muted">After</p>
                          <p
                            className="mt-1 font-display text-display font-semibold text-ink tabular-nums"
                          >
                            <span
                              className="block transition duration-500 ease-out-soft pre-2:translate-y-full pre-2:opacity-0"
                              >93%</span
                            >
                          </p>
                          <p className="text-sm text-muted">Fields filled</p>
                        </div>
                      </div>
                      <div className="relative mt-6 h-7" aria-hidden="true">
                        <span
                          className="absolute bottom-1 left-82/100 inline-flex w-max origin-bottom -translate-x-1/2 items-center gap-1 text-xs font-semibold text-primary tabular-nums transition duration-300 ease-out-soft pre-3:translate-y-1 pre-3:scale-95 pre-3:opacity-0"
                          ><svg className="size-3.5" aria-hidden="true">
                            <use href="#i-trending-up" /></svg
                          >+22 points</span
                        >
                      </div>
                      {/* the meter: 71% already filled (grey), the 22 new points grow out of the 71 marker (blue) */}
                      <div className="relative" aria-hidden="true">
                        <div
                          className="relative h-3 overflow-hidden rounded-full bg-surface-1"
                        >
                          <span
                            className="absolute inset-y-0 left-0 w-71/100 rounded-l-full bg-chart-baseline"
                          ></span>
                          <span
                            className="absolute inset-y-0 left-71/100 w-22/100 origin-left rounded-r-full bg-chart-main transition-transform duration-700 ease-emphasized pre-2:scale-x-0"
                          ></span>
                        </div>
                        <span
                          className="absolute -top-1 left-71/100 h-5 w-0.5 -translate-x-1/2 rounded-full bg-ink"
                        ></span>
                        <div
                          className="relative mt-2 h-4 text-caption text-muted tabular-nums"
                        >
                          <span className="absolute left-71/100 -translate-x-1/2"
                            >71%</span
                          >
                        </div>
                      </div>
                      <p
                        className="mt-6 border-t border-line pt-4 text-sm text-pretty text-muted"
                      >
                        The catalogue is 22 percentage points fuller. Example data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
