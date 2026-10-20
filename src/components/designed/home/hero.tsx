/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function HeroSection() {
  return (
    <section
            className="hero-bg hero-screen flex items-center overflow-x-clip border-b border-line"
            data-hero
          >
            <div className="w-full">
              <div
                className="frame grid grid-cols-1 items-center gap-12 py-12 xl:grid-cols-10 xl:gap-14"
              >
                <div className="@container xl:col-span-3">
                  <h1 className="reveal text-hero">
                    <span className="block xl:whitespace-nowrap"
                      >Uncover shoppers’ intent</span
                    >
                    <span className="block xl:whitespace-nowrap"
                      >and catalogue gaps</span
                    >
                  </h1>
                  <p
                    className="reveal mt-6 max-w-md text-lg leading-relaxed text-pretty text-muted delay-200"
                  >
                    Pulse ranks the product data your catalogue is missing by how
                    many shoppers need it, not by how empty a field is.
                  </p>
                  <div className="reveal mt-8 flex flex-wrap gap-3 delay-300">
                    <a href="./contact.html" className="btn-primary"
                      >Request a Decision Audit</a
                    >
                    <a href="#method" className="btn-secondary">See how it works</a>
                  </div>
                </div>

                <div className="reveal delay-400 xl:col-span-7">
                  <div className="hero-glow">
                    <div className="relative" data-demo data-pausable>
                      {/* Timeline: one segment per step; the active segment fills while its step plays (demo-timer), done steps stay full */}
                      <div
                        className="mb-4 hidden grid-cols-5 gap-3 js:grid"
                        role="tablist"
                        aria-label="How a Decision Audit works"
                      >
                        <button
                          type="button"
                          role="tab"
                          id="demo-tab-1"
                          aria-controls="demo-step-1"
                          className="group hit-area flex flex-col gap-2 rounded-sm text-left text-xs font-medium text-muted transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-active:text-ink"
                          aria-selected="true"
                          data-demo-tab
                          data-active
                        >
                          <span
                            className="block h-1 overflow-hidden rounded-full bg-line"
                            aria-hidden="true"
                            ><span
                              className="demo-timer block h-full rounded-full bg-step-1"
                            ></span
                          ></span>
                          <span className="flex items-center gap-1.5"
                            ><span className="tabular-nums">01</span
                            ><span className="max-sm:sr-only">The problem</span></span
                          >
                        </button>
                        <button
                          type="button"
                          role="tab"
                          id="demo-tab-2"
                          aria-controls="demo-step-2"
                          className="group hit-area flex flex-col gap-2 rounded-sm text-left text-xs font-medium text-muted transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-active:text-ink"
                          aria-selected="false"
                          data-demo-tab
                        >
                          <span
                            className="block h-1 overflow-hidden rounded-full bg-line"
                            aria-hidden="true"
                            ><span
                              className="demo-timer block h-full rounded-full bg-step-2"
                            ></span
                          ></span>
                          <span className="flex items-center gap-1.5"
                            ><span className="tabular-nums">02</span
                            ><span className="max-sm:sr-only">The audit</span></span
                          >
                        </button>
                        <button
                          type="button"
                          role="tab"
                          id="demo-tab-3"
                          aria-controls="demo-step-3"
                          className="group hit-area flex flex-col gap-2 rounded-sm text-left text-xs font-medium text-muted transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-active:text-ink"
                          aria-selected="false"
                          data-demo-tab
                        >
                          <span
                            className="block h-1 overflow-hidden rounded-full bg-line"
                            aria-hidden="true"
                            ><span
                              className="demo-timer block h-full rounded-full bg-step-3"
                            ></span
                          ></span>
                          <span className="flex items-center gap-1.5"
                            ><span className="tabular-nums">03</span
                            ><span className="max-sm:sr-only">The priority</span></span
                          >
                        </button>
                        <button
                          type="button"
                          role="tab"
                          id="demo-tab-4"
                          aria-controls="demo-step-4"
                          className="group hit-area flex flex-col gap-2 rounded-sm text-left text-xs font-medium text-muted transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-active:text-ink"
                          aria-selected="false"
                          data-demo-tab
                        >
                          <span
                            className="block h-1 overflow-hidden rounded-full bg-line"
                            aria-hidden="true"
                            ><span
                              className="demo-timer block h-full rounded-full bg-step-4"
                            ></span
                          ></span>
                          <span className="flex items-center gap-1.5"
                            ><span className="tabular-nums">04</span
                            ><span className="max-sm:sr-only">The repair</span></span
                          >
                        </button>
                        <button
                          type="button"
                          role="tab"
                          id="demo-tab-5"
                          aria-controls="demo-step-5"
                          className="group hit-area flex flex-col gap-2 rounded-sm text-left text-xs font-medium text-muted transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-active:text-ink"
                          aria-selected="false"
                          data-demo-tab
                        >
                          <span
                            className="block h-1 overflow-hidden rounded-full bg-line"
                            aria-hidden="true"
                            ><span
                              className="demo-timer block h-full rounded-full bg-step-5"
                            ></span
                          ></span>
                          <span className="flex items-center gap-1.5"
                            ><span className="tabular-nums">05</span
                            ><span className="max-sm:sr-only">The outcome</span></span
                          >
                        </button>
                      </div>
                      {/* App window (attio.com style): a light frame with the window controls, the app panel inset in it */}
                      <div
                        className="rounded-2xl border border-line bg-surface-1 p-1.5 shadow-sm"
                        data-demo-window
                      >
                        <div className="flex h-8 items-center gap-3 px-2.5">
                          <div className="flex flex-1 gap-1.5" aria-hidden="true">
                            <span className="size-2.5 rounded-full bg-signal"></span>
                            <span className="size-2.5 rounded-full bg-gap"></span>
                            <span className="size-2.5 rounded-full bg-sky"></span>
                          </div>
                          <span className="text-xs text-muted max-sm:hidden"
                            >app.thepulseapi.com / audits / laptops</span
                          >
                          <div className="flex flex-1 items-center justify-end gap-2">
                            <span
                              className="rounded-full border border-line bg-card px-2 py-0.5 text-xs font-medium whitespace-nowrap text-muted"
                              >Example data</span
                            >
                            <button
                              type="button"
                              className="hit-area hidden size-6 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out-soft hover:bg-card hover:text-ink focus-visible:outline-2 focus-visible:outline-focus motion-safe:js:inline-flex"
                              aria-label="Pause demo"
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
                          className="overflow-hidden rounded-xl border border-line bg-card"
                        >
                          <div className="demo-stack lg:min-h-145">
                            {/* 01 The problem */}
                            <div
                              className="demo-step flex flex-col"
                              id="demo-step-1"
                              role="tabpanel"
                              aria-labelledby="demo-tab-1"
                              data-demo-step
                              data-active
                            >
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-0 px-5 py-3.5"
                              >
                                <p
                                  className="font-display text-base font-semibold text-ink"
                                >
                                  My laptop catalogue: 216 products
                                </p>
                              </div>
                              <div
                                className="demo-in flex items-center gap-3 border-b border-dashed border-gap bg-gap-fill px-5 py-3"
                              >
                                <span
                                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gap text-on-step"
                                  ><svg className="size-3" aria-hidden="true">
                                    <use href="#i-triangle-alert" /></svg
                                ></span>
                                <p className="text-data leading-snug text-gap-strong">
                                  <strong className="font-bold"
                                    >357 fields are missing information.</strong
                                  >
                                  Shoppers can&rsquo;t use them to filter products,
                                  and your search can&rsquo;t either.
                                </p>
                              </div>
                              <div className="relative flex-1 overflow-x-clip">
                                <table
                                  className="h-full w-full text-left tabular-nums text-xs"
                                >
                                  <thead>
                                    <tr className="border-b border-line">
                                      <th
                                        className="pt-4 pr-2 pb-3 pl-5 text-xs font-semibold text-muted sm:pr-5"
                                      >
                                        Name
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >1</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Screen size</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >80 missing</span
                                        >
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >2</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Memory</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >60 missing</span
                                        >
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >4</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Processor</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >162 missing</span
                                        >
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >3</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Storage</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >55 missing</span
                                        >
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-surface-1">
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >LG 16Z90TS-G</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        16.0&quot;
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-200"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-200"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        512GB
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >Spectre x360</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        16GB
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >ThinkPad X1 Carbon Gen 9</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-400"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        32GB
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-400"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        1TB
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >Razer Blade</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        15.6&quot;
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >Missing</span
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-1 px-5 py-4"
                              >
                                <p className="text-data text-muted">
                                  Every blank cell is a question your catalogue
                                  cannot answer.
                                </p>
                              </div>
                            </div>
                            {/* 02 The audit */}
                            <div
                              className="demo-step relative flex flex-col"
                              id="demo-step-2"
                              role="tabpanel"
                              aria-labelledby="demo-tab-2"
                              data-demo-step
                            >
                              <span className="demo-scan" aria-hidden="true"></span>
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-0 px-5 py-3.5"
                              >
                                <p
                                  className="font-display text-base font-semibold text-ink"
                                >
                                  My laptop catalogue: 216 products
                                </p>
                                <span
                                  className="demo-pill flex-col items-stretch gap-1 border-line bg-surface-1 text-muted"
                                  ><span className="flex items-center gap-2"
                                    ><span
                                      className="size-3 animate-spin rounded-full border-2 border-current border-t-surface-1 motion-reduce:animate-none"
                                      aria-hidden="true"
                                    ></span
                                    >Auditing attributes</span
                                  ><span
                                    className="scan-track block h-0.75 w-full overflow-hidden rounded-full"
                                    ><span
                                      className="demo-bar demo-bar-scan block h-full rounded-full bg-chart-main delay-0"
                                    ></span></span
                                ></span>
                              </div>
                              <div
                                className="border-b border-line bg-surface-0 px-5 py-3"
                              >
                                <div
                                  className="flex items-baseline justify-between gap-4"
                                >
                                  <span className="text-data font-semibold text-primary"
                                    >Auditing 216 products against 32 buying
                                    requirements</span
                                  ><span className="tabular-nums text-xs text-muted"
                                    >4 attributes</span
                                  >
                                </div>
                              </div>
                              <div className="relative flex-1 overflow-x-clip">
                                <table
                                  className="h-full w-full text-left tabular-nums text-xs"
                                >
                                  <thead>
                                    <tr className="border-b border-line">
                                      <th
                                        className="pt-4 pr-2 pb-3 pl-5 text-xs font-semibold text-muted sm:pr-5"
                                      >
                                        Name
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >1</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Screen size</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >auditing…<span
                                            className="scan-track block h-1 w-full overflow-hidden rounded-full mt-1"
                                            ><span
                                              className="demo-bar demo-bar-scan block h-full rounded-full bg-chart-main delay-0"
                                            ></span></span
                                        ></span>
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >2</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Memory</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >auditing…<span
                                            className="scan-track block h-1 w-full overflow-hidden rounded-full mt-1"
                                            ><span
                                              className="demo-bar demo-bar-scan block h-full rounded-full bg-chart-main delay-180"
                                            ></span></span
                                        ></span>
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >4</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Processor</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >auditing…<span
                                            className="scan-track block h-1 w-full overflow-hidden rounded-full mt-1"
                                            ><span
                                              className="demo-bar demo-bar-scan block h-full rounded-full bg-chart-main delay-360"
                                            ></span></span
                                        ></span>
                                      </th>
                                      <th
                                        className="px-2 pt-4 pb-3 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="flex items-center gap-1.5"
                                          ><span
                                            className="invisible hidden size-4.5 items-center justify-center rounded bg-primary text-caption font-bold text-on-primary sm:flex"
                                            aria-hidden="true"
                                            >3</span
                                          ><span
                                            className="text-xs font-semibold text-ink"
                                            >Storage</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >auditing…<span
                                            className="scan-track block h-1 w-full overflow-hidden rounded-full mt-1"
                                            ><span
                                              className="demo-bar demo-bar-scan block h-full rounded-full bg-chart-main delay-540"
                                            ></span></span
                                        ></span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-surface-1">
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >LG 16Z90TS-G</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        16.0&quot;
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        512GB
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >Spectre x360</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        16GB
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >ThinkPad X1 Carbon Gen 9</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        32GB
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        1TB
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="py-3 pr-2 pl-5 font-medium text-ink sm:pr-5 sm:whitespace-nowrap"
                                      >
                                        <span className="flex items-center gap-3"
                                          ><span
                                            className="hidden size-5 shrink-0 rounded bg-surface-1 sm:block"
                                            aria-hidden="true"
                                          ></span
                                          >Razer Blade</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        15.6&quot;
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >Auditing</span
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-1 px-5 py-4"
                              >
                                <p
                                  className="flex flex-wrap items-center gap-3 text-data text-muted"
                                >
                                  Reading titles, descriptions and supplier specs.
                                </p>
                              </div>
                            </div>
                            {/* 03 The priority */}
                            <div
                              className="demo-step flex flex-col"
                              id="demo-step-3"
                              role="tabpanel"
                              aria-labelledby="demo-tab-3"
                              data-demo-step
                            >
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-0 px-5 py-3.5"
                              >
                                <p
                                  className="font-display text-sm font-semibold text-ink"
                                >
                                  Two ways to rank the same four missing attributes
                                </p>
                              </div>
                              <div
                                className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7"
                              >
                                {/* Below sm: the same two ranked columns and the 1st → last arrow, sized for phones. One grid holds both
                                   columns, so a row is as tall on both sides even when a name wraps and the arrow always runs from
                                   the first row to the last (row centres at 1/8 and 7/8: the rows have no gap, only padding). */}
                                <div className="sm:hidden">
                                  <div className="mb-2 grid grid-cols-2 gap-x-10">
                                    <div>
                                      <p className="eyebrow">Traditional audit</p>
                                      <p className="mt-0.5 text-caption text-muted">
                                        ranks by what is absent
                                      </p>
                                    </div>
                                    <div>
                                      <p className="flex h-4.5 items-center">
                                        <img
                                          src="/assets/brand/logo.webp"
                                          alt="Pulse"
                                          width={54}
                                          height={18}
                                          className="h-4.5 w-auto theme-dark:hidden"
                                        /><img
                                          src="/assets/brand/logo-white.webp"
                                          alt=""
                                          width={54}
                                          height={18}
                                          className="hidden h-4.5 w-auto theme-dark:inline"
                                          aria-hidden="true"
                                        />
                                      </p>
                                      <p className="mt-0.5 text-caption text-muted">
                                        ranks by what shoppers need
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className="@container relative grid auto-rows-fr grid-cols-2 gap-x-10"
                                  >
                                    <ol
                                      className="contents"
                                      aria-label="Traditional audit: ranks by what is absent"
                                    >
                                      <li className="col-start-1 row-start-1 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-100 border-baseline bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-baseline text-on-step"
                                            >1</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Processor</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >162 missing</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-1 row-start-2 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-200 border-line bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                            >2</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Screen size</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >80 missing</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-1 row-start-3 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-300 border-line bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                            >3</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Memory</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >60 missing</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-1 row-start-4 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-400 border-line bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                            >4</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Storage</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >55 missing</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                    </ol>
                                    <ol
                                      className="contents"
                                      aria-label="Pulse: ranks by what shoppers need"
                                    >
                                      <li className="col-start-2 row-start-1 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-500 border-signal bg-signal-tint ring-1 ring-signal"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-signal text-on-step"
                                            >1</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Screen size</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >15 of 32</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-2 row-start-2 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-600 border-line bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                            >2</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Memory</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >13 of 32</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-2 row-start-3 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-700 border-line bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                            >3</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Storage</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >10 of 32</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                      <li className="col-start-2 row-start-4 py-1">
                                        <div
                                          className="demo-in flex h-full flex-col items-start justify-center gap-1 rounded-lg border px-2 py-2 @rank-inline:flex-row @rank-inline:items-center @rank-inline:justify-start @rank-inline:gap-2 delay-800 border-baseline bg-card"
                                        >
                                          <span
                                            className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-baseline text-on-step"
                                            >4</span
                                          ><span className="min-w-0 flex-1"
                                            ><span
                                              className="block text-data font-semibold hyphens-auto text-ink"
                                              >Processor</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >2 of 32</span
                                            ></span
                                          >
                                        </div>
                                      </li>
                                    </ol>
                                    <div
                                      className="pointer-events-none absolute inset-y-0 left-1/2 w-10 -translate-x-1/2"
                                      aria-hidden="true"
                                    >
                                      <svg
                                        className="absolute inset-0 size-full overflow-visible"
                                        viewBox="0 0 40 200"
                                        preserveAspectRatio="none"
                                        fill="none"
                                      >
                                        <path
                                          className="demo-draw stroke-baseline delay-700"
                                          d="M0 25 C 40 25, 0 175, 40 175"
                                          pathLength="1"
                                          strokeWidth="1.25"
                                        />
                                      </svg>
                                      <div
                                        className="absolute inset-0 flex items-center justify-center"
                                      >
                                        <span
                                          className="demo-in flex flex-col items-center rounded-md bg-baseline px-1 py-1 text-label leading-tight font-bold text-on-step delay-1000"
                                          ><span>1st</span><span>↓</span
                                          ><span>last</span></span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="hidden items-start gap-3 sm:flex sm:gap-5"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="eyebrow">
                                      Traditional Catalogue Audit
                                    </p>
                                    <p className="mt-0.5 mb-5 text-xs text-muted">
                                      ranks by what is absent
                                    </p>
                                    <ol className="space-y-3">
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-100 border-baseline bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-baseline text-on-step"
                                          >1</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Processor</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >162 products missing it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-200 border-line bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                          >2</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Screen size</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >80 products missing it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-300 border-line bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                          >3</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Memory</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >60 products missing it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-400 border-line bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                          >4</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Storage</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >55 products missing it</span
                                          ></span
                                        >
                                      </li>
                                    </ol>
                                  </div>
                                  <div
                                    className="relative hidden w-16 shrink-0 self-stretch sm:block"
                                    aria-hidden="true"
                                  >
                                    <svg
                                      className="absolute inset-x-0 top-19 h-62 w-full overflow-visible"
                                      viewBox="0 0 40 200"
                                      preserveAspectRatio="none"
                                      fill="none"
                                    >
                                      <path
                                        className="demo-draw stroke-baseline delay-700"
                                        d="M0 8 C 40 8, 0 192, 40 192"
                                        pathLength="1"
                                        strokeWidth="1.25"
                                      />
                                    </svg>
                                    <div
                                      className="absolute inset-0 flex items-center justify-center pt-8"
                                    >
                                      <span
                                        className="demo-in rounded-md bg-baseline px-1.5 py-0.5 text-label font-bold whitespace-nowrap text-on-step delay-1000"
                                        >1st → last</span
                                      >
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="flex h-4.5 items-center">
                                      <img
                                        src="/assets/brand/logo.webp"
                                        alt="Pulse"
                                        width={54}
                                        height={18}
                                        className="h-4.5 w-auto theme-dark:hidden"
                                      /><img
                                        src="/assets/brand/logo-white.webp"
                                        alt=""
                                        width={54}
                                        height={18}
                                        className="hidden h-4.5 w-auto theme-dark:inline"
                                        aria-hidden="true"
                                      />
                                    </p>
                                    <p className="mt-0.5 mb-5 text-xs text-muted">
                                      ranks by what shoppers need
                                    </p>
                                    <ol className="space-y-3">
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-500 border-signal bg-signal-tint ring-1 ring-signal"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-signal text-on-step"
                                          >1</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Screen size</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >15 of 32 requirements need it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-600 border-line bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                          >2</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Memory</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >13 of 32 requirements need it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-700 border-line bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-surface-1 text-muted"
                                          >3</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Storage</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >10 of 32 requirements need it</span
                                          ></span
                                        >
                                      </li>
                                      <li
                                        className="demo-in flex h-16 items-center gap-3 rounded-lg border px-4 py-2 delay-800 border-baseline bg-card"
                                      >
                                        <span
                                          className="flex size-5 shrink-0 items-center justify-center rounded tabular-nums text-caption font-bold bg-baseline text-on-step"
                                          >4</span
                                        ><span className="min-w-0 flex-1"
                                          ><span
                                            className="block truncate text-data font-semibold text-ink"
                                            >Processor</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >2 of 32 requirements need it</span
                                          ></span
                                        >
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                                <p
                                  className="demo-in mt-12 text-data leading-relaxed text-pretty text-muted delay-1200"
                                >
                                  <strong className="font-bold text-ink"
                                    >Processor</strong
                                  >
                                  is missing from 162 products, so a traditional
                                  audit ranks it first. But only 2 of 32 shopper
                                  requirements mention it, so Pulse ranks it last.
                                  <strong className="font-bold text-ink"
                                    >Fixing it first could waste time and resources
                                    with little impact on shoppers.</strong
                                  >
                                </p>
                              </div>
                            </div>
                            {/* 04 The repair */}
                            <div
                              className="demo-step flex flex-col"
                              id="demo-step-4"
                              role="tabpanel"
                              aria-labelledby="demo-tab-4"
                              data-demo-step
                            >
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-0 px-5 py-3.5"
                              >
                                <p
                                  className="font-display text-sm font-semibold text-ink"
                                >
                                  Recovering screen size
                                </p>
                                <span
                                  className="demo-pill border-primary bg-primary font-bold text-on-primary"
                                  ><svg className="size-3.5" aria-hidden="true">
                                    <use href="#i-check" /></svg
                                  >No new data purchased</span
                                >
                              </div>
                              <div
                                className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7"
                              >
                                <p
                                  className="mb-8 flex items-center gap-2.5 rounded-lg border border-primary-line bg-primary-tint px-3.5 py-2.5 text-data font-medium text-ink"
                                >
                                  <svg
                                    className="size-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                  >
                                    <use href="#i-sparkles" />
                                  </svg>
                                  <span
                                    >Currently, Pulse identifies
                                    <strong className="font-bold text-primary"
                                      >Screen size</strong
                                    >
                                    as the attribute that needs priority
                                    correction.</span
                                  >
                                </p>
                                <div
                                  className="flex flex-wrap items-end justify-between gap-4"
                                >
                                  <p
                                    className="max-w-md font-display text-lg font-semibold text-ink"
                                  >
                                    <span
                                      className="font-display text-5xl leading-none font-semibold text-primary tabular-nums"
                                      data-demo-count="161"
                                      >161</span
                                    ><span
                                      className="tabular-nums text-base font-semibold text-muted"
                                    >
                                      / 216</span
                                    ><span className="mt-1 block"
                                      >values were found in your existing product
                                      titles.</span
                                    >
                                  </p>
                                  <p
                                    className="max-w-56 text-data leading-relaxed text-pretty text-muted"
                                  >
                                    The other
                                    <strong className="tabular-nums font-bold text-ink"
                                      >55</strong
                                    >
                                    genuinely need acquiring. We tell you which, so
                                    you can cost it before you commit.
                                  </p>
                                </div>
                                <div
                                  className="scan-track mt-8 h-3 overflow-hidden rounded-full"
                                >
                                  <div
                                    className="demo-bar h-full w-161/216 rounded-full bg-chart-main delay-200"
                                  ></div>
                                </div>
                                <p
                                  className="mt-10 mb-4 flex items-center gap-1.5 eyebrow-primary"
                                >
                                  <svg className="size-3" aria-hidden="true">
                                    <use href="#i-file-text" /></svg
                                  >Pulled straight out of your product titles
                                </p>
                                <ul className="space-y-3">
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-300"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >HP Spectre x360
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >13.5&quot;</mark
                                      >
                                      OLED Touch, 16GB</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-520"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >13.5&quot;</span
                                    >
                                  </li>
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-500"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >Lenovo ThinkPad X1 Carbon G9
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >14 inch</mark
                                      >
                                      WUXGA</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-720"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >14.0&quot;</span
                                    >
                                  </li>
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-700"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >MSI GS66 Stealth
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >15.6</mark
                                      >
                                      FHD 240Hz</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-920"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >15.6&quot;</span
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* 05 The outcome */}
                            <div
                              className="demo-step flex flex-col"
                              id="demo-step-5"
                              role="tabpanel"
                              aria-labelledby="demo-tab-5"
                              data-demo-step
                            >
                              <div
                                className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-0 px-5 py-3.5"
                              >
                                <p
                                  className="font-display text-sm font-semibold text-ink"
                                >
                                  What your shoppers can now do
                                </p>
                                <span
                                  className="demo-pill border-primary bg-primary font-bold text-on-primary"
                                  ><svg className="size-3.5" aria-hidden="true">
                                    <use href="#i-check" /></svg
                                  >Verified on your catalogue</span
                                >
                              </div>
                              <div
                                className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-7"
                              >
                                <div
                                  className="flex flex-wrap items-center justify-between gap-4"
                                >
                                  <div
                                    className="flex flex-wrap items-center gap-x-6 gap-y-2 text-data font-medium text-muted"
                                  >
                                    <span className="flex items-center gap-2.5"
                                      ><span
                                        className="size-3.5 rounded-sm bg-primary"
                                        aria-hidden="true"
                                      ></span
                                      >A shopper can tell these apart</span
                                    >
                                    <span className="flex items-center gap-2.5"
                                      ><span
                                        className="size-3.5 rounded-sm bg-line"
                                        aria-hidden="true"
                                      ></span
                                      >Still indistinguishable</span
                                    >
                                  </div>
                                </div>
                                <div
                                  className="mt-8 hidden grid-cols-24 gap-1 js:grid sm:grid-cols-27 sm:gap-1.5"
                                  data-demo-grid
                                  data-total="216"
                                  data-before="122"
                                  data-after="185"
                                  role="img"
                                  aria-label="216 laptops: a shopper can tell 122 apart before screen size is recorded and 185 after"
                                ></div>
                                <div
                                  className="mt-8 flex flex-wrap items-end justify-between gap-4"
                                >
                                  <p
                                    className="max-w-md font-display text-lg font-semibold text-pretty text-ink"
                                  >
                                    Adding one attribute helped shoppers distinguish
                                    <span className="whitespace-nowrap text-primary"
                                      >63 more products</span
                                    >.
                                  </p>
                                  <div className="min-w-52">
                                    <p className="eyebrow">Screen size recorded</p>
                                    <div
                                      className="mt-2.5 space-y-1.5 tabular-nums text-xs"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-11 text-muted">Before</span
                                        ><span
                                          className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-1"
                                          ><span
                                            className="block h-full w-136/216 rounded-full bg-warning"
                                          ></span></span
                                        ><span className="w-16 text-right text-warning"
                                          >136 / 216</span
                                        >
                                      </div>
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-11 text-muted">After</span
                                        ><span
                                          className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-1"
                                          ><span
                                            className="demo-bar block h-full w-full rounded-full bg-chart-main delay-1000"
                                          ></span></span
                                        ><span className="w-16 text-right text-primary"
                                          ><span
                                            data-demo-count="216"
                                            data-from="136"
                                            data-delay="1000"
                                            >216</span
                                          >
                                          / 216</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Step caption under the window (follows the active step) */}
                      <div className="mt-5 hidden js:block">
                        <p
                          className="demo-stack text-center text-sm font-medium text-ink"
                          aria-live="polite"
                        >
                          <span className="demo-step" data-active data-demo-caption
                            >94 out of 216 products have unclear differences for
                            shoppers</span
                          >
                          <span className="demo-step" data-demo-caption
                            >Every attribute scored against real buying
                            decisions</span
                          >
                          <span className="demo-step" data-demo-caption></span>
                          <span className="demo-step" data-demo-caption></span>
                          <span className="demo-step" data-demo-caption
                            >63 more products a shopper can tell apart (122 →
                            185)</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
