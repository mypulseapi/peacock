/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function WhySection() {
  return (
    <section
            id="why"
            className="bg-soft-gradient scroll-mt-16 border-b border-line"
            data-why
          >
            <div className="frame grid lg:grid-cols-10">
              <div
                className="flex flex-col justify-center py-16 lg:col-span-3 lg:border-r lg:border-line lg:py-24 lg:pr-10"
              >
                <h2 className="reveal text-title text-balance">
                  Why ecommerce brands should choose Pulse
                </h2>
                {/* Phones and no-JS: the five reasons as a scannable list. Title on its own line, explanation under it,
                     hairlines between; the muted number is the desktop card's "Reason 0N / 05". role=list keeps the list
                     announced in Safari with the markers off. */}
                <ol
                  className="mt-8 divide-y divide-line border-y border-line text-data js:hidden max-md:js:block"
                  role="list"
                >
                  <li className="flex gap-3 py-4">
                    <span
                      className="w-4 shrink-0 tabular-nums text-muted"
                      aria-hidden="true"
                      >1</span
                    >
                    <div className="min-w-0">
                      <p className="font-semibold text-balance text-ink">
                        Capture shopper intent from the first interaction
                      </p>
                      <p className="mt-1 leading-relaxed text-pretty text-muted">
                        Pulse reads what a shopper is trying to decide from their
                        very first interaction, before they search, filter or leave.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 py-4">
                    <span
                      className="w-4 shrink-0 tabular-nums text-muted"
                      aria-hidden="true"
                      >2</span
                    >
                    <div className="min-w-0">
                      <p className="font-semibold text-balance text-ink">
                        Connect shoppers with the right products
                      </p>
                      <p className="mt-1 leading-relaxed text-pretty text-muted">
                        Each shopper&rsquo;s intent is matched with the products
                        whose attributes actually answer it, so they reach a
                        suitable product sooner.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 py-4">
                    <span
                      className="w-4 shrink-0 tabular-nums text-muted"
                      aria-hidden="true"
                      >3</span
                    >
                    <div className="min-w-0">
                      <p className="font-semibold text-balance text-ink">
                        Reduce losing sales opportunities from early shopper exits
                      </p>
                      <p className="mt-1 leading-relaxed text-pretty text-muted">
                        When products can&rsquo;t be told apart, shoppers leave
                        early. Fixing the attributes that decide the purchase keeps
                        them choosing.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 py-4">
                    <span
                      className="w-4 shrink-0 tabular-nums text-muted"
                      aria-hidden="true"
                      >4</span
                    >
                    <div className="min-w-0">
                      <p className="font-semibold text-balance text-ink">
                        Turn commerce data into actionable marketing intelligence
                      </p>
                      <p className="mt-1 leading-relaxed text-pretty text-muted">
                        Your catalogue and shopper signals become a ranked list of
                        what to fix and promote first, not another dashboard to
                        read.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 py-4">
                    <span
                      className="w-4 shrink-0 tabular-nums text-muted"
                      aria-hidden="true"
                      >5</span
                    >
                    <div className="min-w-0">
                      <p className="font-semibold text-balance text-ink">
                        Uncover insights others miss or fail to collect
                      </p>
                      <p className="mt-1 leading-relaxed text-pretty text-muted">
                        Pulse measures the attributes shoppers need but your
                        catalogue never recorded: the gaps a completeness report
                        cannot see.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              <div
                className="flex items-center justify-center border-t border-line py-16 max-md:hidden lg:col-span-7 lg:border-t-0 lg:py-20 lg:pl-10"
              >
                <div
                  className="reveal why-orbit-size relative aspect-square shrink-0"
                  data-why-orbit
                >
                  <svg
                    className="absolute inset-0 size-full"
                    viewBox="0 0 400 400"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="176"
                      className="stroke-primary"
                      strokeOpacity="0.45"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="1 13"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="64"
                      className="stroke-sky"
                      strokeOpacity="0.6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 9"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 grid place-items-center"
                    aria-hidden="true"
                  >
                    <span
                      className="size-1/6 overflow-hidden rounded-full shadow-glow transition duration-500 ease-out-soft pre-shown:scale-75 pre-shown:opacity-0"
                    >
                      {/* the icon file has a light margin round its circle: zoom 1.3× (circle is 144 of 180px) to crop it */}
                      <img
                        src="/assets/brand/apple-touch-icon.png"
                        alt=""
                        width={180}
                        height={180}
                        className="size-full scale-130"
                      />
                    </span>
                  </div>
                  <div
                    className="why-spin absolute inset-0 hidden js:block"
                    data-why-spin
                  >
                    <button
                      type="button"
                      className="group absolute left-1/2 top-3/50 -translate-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-expanded="false"
                      aria-controls="why-card"
                      data-why-tab
                    >
                      <span className="why-upright block">
                        <span
                          className="block transition duration-400 ease-out-soft delay-250 pre-shown:scale-50 pre-shown:opacity-0"
                        >
                          <span
                            className="grid size-14 place-items-center rounded-full border-2 border-line-control bg-card text-muted transition duration-300 ease-out-soft group-hover:border-primary group-hover:text-primary group-data-active:size-16 group-data-active:border-primary group-data-active:bg-primary group-data-active:text-on-primary group-data-active:shadow-glow"
                          >
                            <svg
                              className="size-5 fill-none stroke-current stroke-2 group-data-active:size-6"
                              aria-hidden="true"
                            >
                              <use href="#i-pointer" />
                            </svg>
                          </span>
                          <span
                            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-ink group-data-active:font-semibold group-data-active:text-ink"
                            >Shopper intent</span
                          >
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group absolute left-23/25 top-73/200 -translate-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-expanded="false"
                      aria-controls="why-card"
                      data-why-tab
                    >
                      <span className="why-upright block">
                        <span
                          className="block transition duration-400 ease-out-soft delay-350 pre-shown:scale-50 pre-shown:opacity-0"
                        >
                          <span
                            className="grid size-14 place-items-center rounded-full border-2 border-line-control bg-card text-muted transition duration-300 ease-out-soft group-hover:border-primary group-hover:text-primary group-data-active:size-16 group-data-active:border-primary group-data-active:bg-primary group-data-active:text-on-primary group-data-active:shadow-glow"
                          >
                            <svg
                              className="size-5 group-data-active:size-6"
                              aria-hidden="true"
                            >
                              <use href="#i-cart" />
                            </svg>
                          </span>
                          <span
                            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-ink group-data-active:font-semibold group-data-active:text-ink"
                            >Right products</span
                          >
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group absolute left-19/25 top-171/200 -translate-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-expanded="false"
                      aria-controls="why-card"
                      data-why-tab
                    >
                      <span className="why-upright block">
                        <span
                          className="block transition duration-400 ease-out-soft delay-450 pre-shown:scale-50 pre-shown:opacity-0"
                        >
                          <span
                            className="grid size-14 place-items-center rounded-full border-2 border-line-control bg-card text-muted transition duration-300 ease-out-soft group-hover:border-primary group-hover:text-primary group-data-active:size-16 group-data-active:border-primary group-data-active:bg-primary group-data-active:text-on-primary group-data-active:shadow-glow"
                          >
                            <svg
                              className="size-5 group-data-active:size-6"
                              aria-hidden="true"
                            >
                              <use href="#i-trending-up" />
                            </svg>
                          </span>
                          <span
                            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-ink group-data-active:font-semibold group-data-active:text-ink"
                            >Reduce bounce rate</span
                          >
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group absolute left-6/25 top-171/200 -translate-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-expanded="false"
                      aria-controls="why-card"
                      data-why-tab
                    >
                      <span className="why-upright block">
                        <span
                          className="block transition duration-400 ease-out-soft delay-550 pre-shown:scale-50 pre-shown:opacity-0"
                        >
                          <span
                            className="grid size-14 place-items-center rounded-full border-2 border-line-control bg-card text-muted transition duration-300 ease-out-soft group-hover:border-primary group-hover:text-primary group-data-active:size-16 group-data-active:border-primary group-data-active:bg-primary group-data-active:text-on-primary group-data-active:shadow-glow"
                          >
                            <svg
                              className="size-5 group-data-active:size-6"
                              aria-hidden="true"
                            >
                              <use href="#i-clipboard-check" />
                            </svg>
                          </span>
                          <span
                            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-ink group-data-active:font-semibold group-data-active:text-ink"
                            >Marketing intelligence</span
                          >
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group absolute left-2/25 top-73/200 -translate-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-expanded="false"
                      aria-controls="why-card"
                      data-why-tab
                    >
                      <span className="why-upright block">
                        <span
                          className="block transition duration-400 ease-out-soft delay-650 pre-shown:scale-50 pre-shown:opacity-0"
                        >
                          <span
                            className="grid size-14 place-items-center rounded-full border-2 border-line-control bg-card text-muted transition duration-300 ease-out-soft group-hover:border-primary group-hover:text-primary group-data-active:size-16 group-data-active:border-primary group-data-active:bg-primary group-data-active:text-on-primary group-data-active:shadow-glow"
                          >
                            <svg
                              className="size-5 group-data-active:size-6"
                              aria-hidden="true"
                            >
                              <use href="#i-sparkles" />
                            </svg>
                          </span>
                          <span
                            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-ink group-data-active:font-semibold group-data-active:text-ink"
                            >Hidden insights</span
                          >
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                {/* Card slot: always beside the orbit (nothing slides). Shows a hint until a reason is picked, then the card, with a line from the circle at 3 o'clock */}
                <div className="why-slot relative shrink-0" data-why-slot>
                  <p
                    className="why-hint absolute top-1/2 left-12 hidden -translate-y-1/2 items-center gap-2 text-sm text-muted js:flex"
                  >
                    <svg className="size-4 rotate-180" aria-hidden="true">
                      <use href="#i-arrow-right" /></svg
                    >Select a circle to read each reason.
                  </p>
                  <span
                    className="why-card absolute top-1/2 left-0 h-px w-12 bg-line-control"
                    aria-hidden="true"
                  ></span>
                  <div
                    id="why-card"
                    className="why-card relative ml-12 w-80 rounded-2xl border border-line-control bg-card p-6 shadow-xl"
                    role="region"
                    aria-label="Reason"
                    data-why-card
                  >
                    <button
                      type="button"
                      className="hit-area absolute top-4 right-4 grid size-7 place-items-center rounded-full text-muted transition-colors duration-150 ease-out-soft hover:bg-surface-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                      aria-label="Close"
                      data-why-close
                    >
                      <svg className="size-4" aria-hidden="true">
                        <use href="#i-x" />
                      </svg>
                    </button>
                    <div className="why-panel" data-why-panel>
                      <span
                        className="inline-flex rounded-full border border-line-control px-2.5 py-0.5 text-xs font-semibold text-ink tabular-nums"
                        >Reason 01 / 05</span
                      >
                      <h3 className="mt-4 text-h3 text-ink">
                        Capture shopper intent from the first interaction
                      </h3>
                      <p className="mt-2 text-data leading-relaxed text-muted">
                        Pulse reads what a shopper is trying to decide from their
                        very first interaction, before they search, filter or leave.
                      </p>
                      <div className="mt-4 border-t border-line pt-4">
                        <button
                          type="button"
                          className="hit-area inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                          data-why-next
                        >
                          Next: Right products<svg
                            className="size-3"
                            aria-hidden="true"
                          >
                            <use href="#i-arrow-right" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="why-panel" data-why-panel>
                      <span
                        className="inline-flex rounded-full border border-line-control px-2.5 py-0.5 text-xs font-semibold text-ink tabular-nums"
                        >Reason 02 / 05</span
                      >
                      <h3 className="mt-4 text-h3 text-ink">
                        Connect shoppers with the right products
                      </h3>
                      <p className="mt-2 text-data leading-relaxed text-muted">
                        Each shopper&rsquo;s intent is matched with the products
                        whose attributes actually answer it, so they reach a
                        suitable product sooner.
                      </p>
                      <div className="mt-4 border-t border-line pt-4">
                        <button
                          type="button"
                          className="hit-area inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                          data-why-next
                        >
                          Next: Reduce bounce rate<svg
                            className="size-3"
                            aria-hidden="true"
                          >
                            <use href="#i-arrow-right" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="why-panel" data-why-panel>
                      <span
                        className="inline-flex rounded-full border border-line-control px-2.5 py-0.5 text-xs font-semibold text-ink tabular-nums"
                        >Reason 03 / 05</span
                      >
                      <h3 className="mt-4 text-h3 text-ink">
                        Reduce losing sales opportunities from early shopper exits
                      </h3>
                      <p className="mt-2 text-data leading-relaxed text-muted">
                        When products can&rsquo;t be told apart, shoppers leave
                        early. Fixing the attributes that decide the purchase keeps
                        them choosing.
                      </p>
                      <div className="mt-4 border-t border-line pt-4">
                        <button
                          type="button"
                          className="hit-area inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                          data-why-next
                        >
                          Next: Marketing intelligence<svg
                            className="size-3"
                            aria-hidden="true"
                          >
                            <use href="#i-arrow-right" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="why-panel" data-why-panel>
                      <span
                        className="inline-flex rounded-full border border-line-control px-2.5 py-0.5 text-xs font-semibold text-ink tabular-nums"
                        >Reason 04 / 05</span
                      >
                      <h3 className="mt-4 text-h3 text-ink">
                        Turn commerce data into actionable marketing intelligence
                      </h3>
                      <p className="mt-2 text-data leading-relaxed text-muted">
                        Your catalogue and shopper signals become a ranked list of
                        what to fix and promote first, not another dashboard to
                        read.
                      </p>
                      <div className="mt-4 border-t border-line pt-4">
                        <button
                          type="button"
                          className="hit-area inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                          data-why-next
                        >
                          Next: Hidden insights<svg
                            className="size-3"
                            aria-hidden="true"
                          >
                            <use href="#i-arrow-right" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="why-panel" data-why-panel>
                      <span
                        className="inline-flex rounded-full border border-line-control px-2.5 py-0.5 text-xs font-semibold text-ink tabular-nums"
                        >Reason 05 / 05</span
                      >
                      <h3 className="mt-4 text-h3 text-ink">
                        Uncover insights others miss or fail to collect
                      </h3>
                      <p className="mt-2 text-data leading-relaxed text-muted">
                        Pulse measures the attributes shoppers need but your
                        catalogue never recorded: the gaps a completeness report
                        cannot see.
                      </p>
                      <div className="mt-4 border-t border-line pt-4">
                        <button
                          type="button"
                          className="hit-area inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                          data-why-next
                        >
                          Next: Shopper intent<svg
                            className="size-3"
                            aria-hidden="true"
                          >
                            <use href="#i-arrow-right" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
