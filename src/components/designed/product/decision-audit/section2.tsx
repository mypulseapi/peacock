/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
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
                <div className="min-w-0 lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <h2 className="reveal text-title text-balance">
                      One shelf, from the gap to the fix
                    </h2>
                    <p className="reveal mt-5 text-lg text-pretty text-muted delay-100">
                      The example laptop shelf through the four steps of an audit:
                      what is missing, what shoppers need, what to fix first, and
                      the repair.
                    </p>
                  </div>
                </div>
                {/* Shelf board (Decision Audit page): the home demo's first four steps on a shelf of 216 squares, one per laptop
         (data-story, src/main.js). Problem: 94 amber squares cannot be told apart → audit: a scan sweeps the shelf and
         the need bars fill → priority: ranks appear, screen size #1 → repair: 63 squares turn blue (122 → 185) and screen
         size reads 216 of 216. Written in the final frame; earlier beats are pre-N: / at-N: classes, so without JS or
         with reduced motion the repaired, ranked board shows. */}
                <div className="reveal min-w-0 delay-100 lg:col-span-8">
                  <div
                    className="rounded-2xl border border-line bg-card shadow-sm"
                    data-story
                    data-pausable
                  >
                    <div
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3"
                    >
                      <p className="text-sm font-semibold text-ink">
                        Laptop shelf, <span className="tabular-nums">216</span> products
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full border border-line px-2 py-0.5 text-xs font-medium whitespace-nowrap text-muted"
                          >Example data</span
                        >
                        <button
                          type="button"
                          className="hit-area hidden size-6 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out-soft hover:bg-surface-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus motion-safe:js:inline-flex"
                          aria-label="Pause animation"
                          aria-pressed="false"
                          data-pause
                        >
                          <svg className="size-3.5" aria-hidden="true">
                            <use href="#i-pause" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className="how-scene p-5 sm:p-6"
                      data-scene
                      data-beats="0 2800 5600 8400"
                    >
                      <ol
                        className="grid grid-cols-4 gap-2 border-b border-line pb-4 text-xs font-medium"
                        aria-label="Steps of the audit"
                      >
                        <li>
                          <button
                            type="button"
                            className="hit-area flex w-full cursor-pointer items-center gap-2 rounded text-left transition-colors duration-300 ease-out-soft text-muted pre-2:text-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-focus disabled:cursor-default"
                            data-story-step="1"
                            disabled
                          >
                            <span
                              className="size-2 shrink-0 rounded-full transition-colors duration-300 ease-out-soft bg-line pre-2:bg-primary"
                            ></span
                            ><span className="tabular-nums">01</span
                            ><span className="max-sm:sr-only">The problem</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="hit-area flex w-full cursor-pointer items-center gap-2 rounded text-left transition-colors duration-300 ease-out-soft text-muted at-2:text-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-focus disabled:cursor-default"
                            data-story-step="2"
                            disabled
                          >
                            <span
                              className="size-2 shrink-0 rounded-full transition-colors duration-300 ease-out-soft bg-line at-2:bg-primary"
                            ></span
                            ><span className="tabular-nums">02</span
                            ><span className="max-sm:sr-only">The audit</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="hit-area flex w-full cursor-pointer items-center gap-2 rounded text-left transition-colors duration-300 ease-out-soft text-muted at-3:text-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-focus disabled:cursor-default"
                            data-story-step="3"
                            disabled
                          >
                            <span
                              className="size-2 shrink-0 rounded-full transition-colors duration-300 ease-out-soft bg-line at-3:bg-primary"
                            ></span
                            ><span className="tabular-nums">03</span
                            ><span className="max-sm:sr-only">The priority</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="hit-area flex w-full cursor-pointer items-center gap-2 rounded text-left transition-colors duration-300 ease-out-soft text-ink pre-4:text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus disabled:cursor-default"
                            data-story-step="4"
                            disabled
                          >
                            <span
                              className="size-2 shrink-0 rounded-full transition-colors duration-300 ease-out-soft bg-primary pre-4:bg-line"
                            ></span
                            ><span className="tabular-nums">04</span
                            ><span className="max-sm:sr-only">The repair</span>
                          </button>
                        </li>
                      </ol>

                      <div
                        className="mt-6 grid gap-6 sm:grid-cols-5"
                        role="img"
                        aria-label="Example: a laptop shelf of 216 products. 1, the problem: 357 fields are missing and 94 products cannot be told apart. 2, the audit: each attribute is scored against 32 shopper requirements. 3, the priority: ranked by bits of decision information, screen size comes first and processor is only third, although 162 products miss it. 4, the repair: screen size is recorded on all 216 products, and 185 of 216 can now be told apart, up from 122."
                      >
                        <div className="min-w-0 sm:col-span-3">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="grid grid-cols-18 gap-0.5 sm:gap-1">
                              <span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-0 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-15 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-30 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-45 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-60 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-75 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-90 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-105 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-120 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-135 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-150 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-165 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-180 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-195 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-210 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-225 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-240 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-255 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-270 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-285 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-300 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-315 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-330 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-345 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-360 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-375 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-390 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-405 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-420 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-435 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-450 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-465 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-480 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-495 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-510 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-525 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-540 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-555 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-570 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-585 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-600 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-615 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-630 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-645 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-660 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-675 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-690 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-705 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-720 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-735 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-750 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-765 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-780 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-795 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-810 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-825 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-840 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-855 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-870 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-885 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-900 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-915 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main transition-colors duration-300 ease-out-soft delay-930 pre-4:bg-chart-missing sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span
                              ><span
                                className="aspect-square rounded-xs bg-chart-main sm:rounded-sm"
                              ></span>
                            </div>
                            <span
                              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 translate-x-5/1 bg-linear-to-r from-transparent via-scan-band to-transparent transition-transform duration-1000 ease-in-out-cubic pre-2:-translate-x-full"
                            ></span>
                          </div>
                          <div
                            className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-caption text-muted"
                          >
                            <span className="flex items-center gap-1.5"
                              ><span className="size-2 rounded-xs bg-chart-main"></span
                              ><span className="font-semibold tabular-nums text-ink"
                                ><span className="grid"
                                  ><span
                                    className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 pre-4:opacity-100"
                                    >122</span
                                  ><span
                                    className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft pre-4:opacity-0"
                                    >185</span
                                  ></span
                                ></span
                              >can be told apart</span
                            >
                            <span className="flex items-center gap-1.5"
                              ><span
                                className="size-2 rounded-xs bg-chart-missing"
                              ></span
                              ><span className="font-semibold tabular-nums text-ink"
                                ><span className="grid"
                                  ><span
                                    className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 pre-4:opacity-100"
                                    >94</span
                                  ><span
                                    className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft pre-4:opacity-0"
                                    >31</span
                                  ></span
                                ></span
                              >cannot</span
                            >
                          </div>
                        </div>
                        <div className="min-w-0 sm:col-span-2">
                          <p className="grid text-caption text-muted">
                            <span
                              className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 ease-out-soft pre-3:opacity-100"
                              >Products missing each attribute, of 216</span
                            ><span
                              className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                              >Ranked by bits of decision information</span
                            >
                          </p>
                          <ol className="mt-2">
                            <li
                              className="relative isolate flex items-center gap-2.5 border-b border-line bg-card px-2 py-2 transition-transform duration-700 ease-in-out-cubic pre-3:translate-y-full"
                            >
                              <span
                                className="absolute inset-0 -z-10 rounded-lg border border-signal bg-signal-tint ring-1 ring-signal transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                              ></span>
                              <span
                                className="grid size-5 shrink-0 place-items-center rounded bg-signal text-caption font-semibold tabular-nums text-on-step transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                                >1</span
                              >
                              <span className="min-w-0 flex-1">
                                <span
                                  className="flex flex-wrap items-baseline justify-between gap-x-2"
                                  ><span className="text-sm font-semibold text-ink"
                                    >Screen size</span
                                  ><span
                                    className="text-caption tabular-nums text-muted transition-opacity duration-300 ease-out-soft delay-0 pre-2:opacity-0"
                                    >1.067 bits</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block h-1 rounded-full bg-surface-1"
                                  ><span
                                    className="block h-full w-full origin-left rounded-full bg-chart-main transition-transform duration-700 ease-emphasized delay-0 pre-2:scale-x-0"
                                  ></span
                                ></span>
                                <span
                                  className="mt-1 block text-caption tabular-nums text-muted"
                                  ><span className="grid"
                                    ><span
                                      className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 pre-4:opacity-100"
                                      >80 missing</span
                                    ><span
                                      className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft pre-4:opacity-0"
                                      ><span
                                        className="inline-flex items-center gap-1 font-medium text-success"
                                        ><svg className="size-3" aria-hidden="true">
                                          <use href="#i-circle-check" /></svg
                                        >216 of 216</span
                                      ></span
                                    ></span
                                  ></span
                                >
                              </span>
                            </li>
                            <li
                              className="relative isolate flex items-center gap-2.5 border-b border-line bg-card px-2 py-2 transition-transform duration-700 ease-in-out-cubic pre-3:translate-y-full"
                            >
                              <span
                                className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption font-semibold tabular-nums text-on-step transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                                >2</span
                              >
                              <span className="min-w-0 flex-1">
                                <span
                                  className="flex flex-wrap items-baseline justify-between gap-x-2"
                                  ><span className="text-sm font-semibold text-ink"
                                    >Memory</span
                                  ><span
                                    className="text-caption tabular-nums text-muted transition-opacity duration-300 ease-out-soft delay-100 pre-2:opacity-0"
                                    >1.012 bits</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block h-1 rounded-full bg-surface-1"
                                  ><span
                                    className="block h-full w-1012/1067 origin-left rounded-full bg-chart-main transition-transform duration-700 ease-emphasized delay-100 pre-2:scale-x-0"
                                  ></span
                                ></span>
                                <span
                                  className="mt-1 block text-caption tabular-nums text-muted"
                                  >60 missing</span
                                >
                              </span>
                            </li>
                            <li
                              className="relative isolate z-10 flex items-center gap-2.5 border-b border-line bg-card px-2 py-2 transition-transform duration-700 ease-in-out-cubic pre-3:-translate-y-2/1"
                            >
                              <span
                                className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption font-semibold tabular-nums text-on-step transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                                >3</span
                              >
                              <span className="min-w-0 flex-1">
                                <span
                                  className="flex flex-wrap items-baseline justify-between gap-x-2"
                                  ><span className="text-sm font-semibold text-ink"
                                    >Processor</span
                                  ><span
                                    className="text-caption tabular-nums text-muted transition-opacity duration-300 ease-out-soft delay-200 pre-2:opacity-0"
                                    >0.747 bits</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block h-1 rounded-full bg-surface-1"
                                  ><span
                                    className="block h-full w-747/1067 origin-left rounded-full bg-chart-main transition-transform duration-700 ease-emphasized delay-200 pre-2:scale-x-0"
                                  ></span
                                ></span>
                                <span
                                  className="mt-1 block text-caption tabular-nums text-muted"
                                  >162 missing</span
                                >
                              </span>
                            </li>
                            <li
                              className="relative isolate flex items-center gap-2.5 border-b border-line bg-card px-2 py-2 transition-transform duration-700 ease-in-out-cubic"
                            >
                              <span
                                className="grid size-5 shrink-0 place-items-center rounded bg-baseline text-caption font-semibold tabular-nums text-on-step transition-opacity duration-300 ease-out-soft pre-3:opacity-0"
                                >4</span
                              >
                              <span className="min-w-0 flex-1">
                                <span
                                  className="flex flex-wrap items-baseline justify-between gap-x-2"
                                  ><span className="text-sm font-semibold text-ink"
                                    >Storage</span
                                  ><span
                                    className="text-caption tabular-nums text-muted transition-opacity duration-300 ease-out-soft delay-300 pre-2:opacity-0"
                                    >0.688 bits</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block h-1 rounded-full bg-surface-1"
                                  ><span
                                    className="block h-full w-688/1067 origin-left rounded-full bg-chart-main transition-transform duration-700 ease-emphasized delay-300 pre-2:scale-x-0"
                                  ></span
                                ></span>
                                <span
                                  className="mt-1 block text-caption tabular-nums text-muted"
                                  >55 missing</span
                                >
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <p
                        className="mt-5 grid border-t border-line pt-4 text-sm text-pretty text-ink"
                        aria-hidden="true"
                      >
                        <span
                          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 pre-2:opacity-100"
                          >216 laptops: 94 of them cannot be told apart. 357 fields
                          are missing.</span
                        ><span
                          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 at-2:opacity-100"
                          >Every attribute is scored against 32 shopper
                          requirements.</span
                        ><span
                          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft opacity-0 at-3:opacity-100"
                          >Screen size comes first. Processor, the emptiest, is only
                          third.</span
                        ><span
                          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft pre-4:opacity-0"
                          >Screen size recorded on all 216: 185 laptops can now be
                          told apart, up from 122.</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
