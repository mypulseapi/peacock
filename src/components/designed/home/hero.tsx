/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../t";
import Image from "next/image";

import Link from "next/link";

export function HeroSection() {
  const t = designedText("home.hero");
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
                      >{t('1')}</span
                    >
                    <span className="block xl:whitespace-nowrap"
                      >{t('2')}</span
                    >
                  </h1>
                  <p
                    className="reveal mt-6 max-w-md text-lg leading-relaxed text-pretty text-muted delay-200"
                  >
                    {t('3')}
                  </p>
                  <div className="reveal mt-8 flex flex-wrap gap-3 delay-300">
                    <Link href={designedHref("/en/contact")} className="btn-primary"
                      >{t('4')}</Link>
                    <a href="#method" className="btn-secondary">{t('5')}</a>
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
                            ><span className="max-sm:sr-only">{t('6')}</span></span
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
                            ><span className="max-sm:sr-only">{t('7')}</span></span
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
                            ><span className="max-sm:sr-only">{t('8')}</span></span
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
                            ><span className="max-sm:sr-only">{t('9')}</span></span
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
                            ><span className="max-sm:sr-only">{t('10')}</span></span
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
                            >{t('11')}</span
                          >
                          <div className="flex flex-1 items-center justify-end gap-2">
                            <span
                              className="rounded-full border border-line bg-card px-2 py-0.5 text-xs font-medium whitespace-nowrap text-muted"
                              >{t('12')}</span
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
                                  {t('13')}
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
                                    >{t('14')}</strong
                                  >
                                  {t('15')}
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
                                        {t('16')}
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
                                            >{t('17')}</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('18')}</span
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
                                            >{t('19')}</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('20')}</span
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
                                            >{t('21')}</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('22')}</span
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
                                            >{t('23')}</span
                                          ></span
                                        ><span
                                          className="mt-1 flex items-center gap-1 text-caption font-bold text-gap-strong"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('24')}</span
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
                                          >{t('25')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('26')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-200"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('27')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-200"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('28')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        {t('29')}
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
                                          >{t('30')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('31')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('32')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('33')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-300"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('34')}</span
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
                                          >{t('35')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-400"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('36')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('37')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-400"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('38')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        {t('39')}
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
                                          >{t('40')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('41')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('42')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('43')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span className="demo-in missing-flag delay-500"
                                          ><svg className="size-3" aria-hidden="true">
                                            <use href="#i-triangle-alert" /></svg
                                          >{t('44')}</span
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
                                  {t('45')}
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
                                  {t('46')}
                                </p>
                                <span
                                  className="demo-pill flex-col items-stretch gap-1 border-line bg-surface-1 text-muted"
                                  ><span className="flex items-center gap-2"
                                    ><span
                                      className="size-3 animate-spin rounded-full border-2 border-current border-t-surface-1 motion-reduce:animate-none"
                                      aria-hidden="true"
                                    ></span
                                    >{t('47')}</span
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
                                    >{t('48')}</span
                                  ><span className="tabular-nums text-xs text-muted"
                                    >{t('49')}</span
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
                                        {t('50')}
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
                                            >{t('51')}</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >{t('52')}<span
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
                                            >{t('53')}</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >{t('54')}<span
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
                                            >{t('55')}</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >{t('56')}<span
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
                                            >{t('57')}</span
                                          ></span
                                        ><span
                                          className="mt-1 block text-caption font-normal text-muted"
                                          >{t('58')}<span
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
                                          >{t('59')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('60')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('61')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('62')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        {t('63')}
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
                                          >{t('64')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('65')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('66')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('67')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('68')}</span
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
                                          >{t('69')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('70')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('71')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('72')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3 hidden sm:table-cell"
                                      >
                                        {t('73')}
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
                                          >{t('74')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap text-muted sm:px-3"
                                      >
                                        {t('75')}
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('76')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('77')}</span
                                        >
                                      </td>
                                      <td
                                        className="px-2 py-2.5 whitespace-nowrap sm:px-3 hidden sm:table-cell"
                                      >
                                        <span
                                          className="inline-flex rounded-md bg-surface-1 px-2 py-1 text-label font-semibold text-muted uppercase"
                                          >{t('78')}</span
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
                                  {t('79')}
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
                                  {t('80')}
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
                                      <p className="eyebrow">{t('81')}</p>
                                      <p className="mt-0.5 text-caption text-muted">
                                        {t('82')}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="flex h-4.5 items-center">
                                        <Image
                                          src="/assets/brand/logo.webp"
                                          alt="Pulse"
                                          width={54}
                                          height={18}
                                          className="h-4.5 w-auto theme-dark:hidden" priority /><Image
                                          src="/assets/brand/logo-white.webp"
                                          alt=""
                                          width={54}
                                          height={18}
                                          className="hidden h-4.5 w-auto theme-dark:inline"
                                          aria-hidden="true" priority />
                                      </p>
                                      <p className="mt-0.5 text-caption text-muted">
                                        {t('83')}
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
                                              >{t('84')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('85')}</span
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
                                              >{t('86')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('87')}</span
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
                                              >{t('88')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('89')}</span
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
                                              >{t('90')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('91')}</span
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
                                              >{t('92')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('93')}</span
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
                                              >{t('94')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('95')}</span
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
                                              >{t('96')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('97')}</span
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
                                              >{t('98')}</span
                                            ><span
                                              className="block tabular-nums text-caption text-muted"
                                              >{t('99')}</span
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
                                          ><span>{t('100')}</span><span>↓</span
                                          ><span>{t('101')}</span></span
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
                                      {t('102')}
                                    </p>
                                    <p className="mt-0.5 mb-5 text-xs text-muted">
                                      {t('103')}
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
                                            >{t('104')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('105')}</span
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
                                            >{t('106')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('107')}</span
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
                                            >{t('108')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('109')}</span
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
                                            >{t('110')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('111')}</span
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
                                        >{t('112')}</span
                                      >
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="flex h-4.5 items-center">
                                      <Image
                                        src="/assets/brand/logo.webp"
                                        alt="Pulse"
                                        width={54}
                                        height={18}
                                        className="h-4.5 w-auto theme-dark:hidden" priority /><Image
                                        src="/assets/brand/logo-white.webp"
                                        alt=""
                                        width={54}
                                        height={18}
                                        className="hidden h-4.5 w-auto theme-dark:inline"
                                        aria-hidden="true" priority />
                                    </p>
                                    <p className="mt-0.5 mb-5 text-xs text-muted">
                                      {t('113')}
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
                                            >{t('114')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('115')}</span
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
                                            >{t('116')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('117')}</span
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
                                            >{t('118')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('119')}</span
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
                                            >{t('120')}</span
                                          ><span
                                            className="block tabular-nums text-caption text-muted"
                                            >{t('121')}</span
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
                                    >{t('122')}</strong
                                  >
                                  is missing from 162 products, so a traditional
                                  audit ranks it first. But only 2 of 32 shopper
                                  requirements mention it, so Pulse ranks it last.{" "}
                                  <strong className="font-bold text-ink"
                                    >{t('123')}</strong
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
                                  {t('124')}
                                </p>
                                <span
                                  className="demo-pill border-primary bg-primary font-bold text-on-primary"
                                  ><svg className="size-3.5" aria-hidden="true">
                                    <use href="#i-check" /></svg
                                  >{t('125')}</span
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
                                    >Currently, Pulse identifies{" "}
                                    <strong className="font-bold text-primary"
                                      >{t('126')}</strong
                                    >
                                    {t('127')}</span
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
                                      >{t('128')}</span
                                    >
                                  </p>
                                  <p
                                    className="max-w-56 text-data leading-relaxed text-pretty text-muted"
                                  >
                                    The other{" "}
                                    <strong className="tabular-nums font-bold text-ink"
                                      >55</strong
                                    >
                                    {t('129')}
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
                                  >{t('130')}
                                </p>
                                <ul className="space-y-3">
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-300"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >{t('131')}
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >{t('132')}</mark
                                      >
                                      {t('133')}</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-520"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >{t('134')}</span
                                    >
                                  </li>
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-500"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >{t('135')}
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >{t('136')}</mark
                                      >
                                      {t('137')}</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-720"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >{t('138')}</span
                                    >
                                  </li>
                                  <li
                                    className="demo-in flex flex-wrap items-center gap-3 rounded-lg border border-surface-1 bg-surface-0 px-4 py-3.5 delay-700"
                                  >
                                    <span
                                      className="min-w-0 flex-1 truncate text-xs text-muted"
                                      >{t('139')}
                                      <mark
                                        className="rounded bg-primary-tint px-1 font-bold text-primary-hover"
                                        >15.6</mark
                                      >
                                      {t('140')}</span
                                    ><svg
                                      className="hidden size-3.5 text-primary sm:block"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-sparkles" /></svg
                                    ><span
                                      className="demo-in inline-flex items-center gap-1.5 rounded-md bg-primary-tint px-1.5 py-0.5 tabular-nums text-xs font-bold text-primary ring-1 ring-primary-line ring-inset delay-920"
                                      ><svg className="size-3.5" aria-hidden="true">
                                        <use href="#i-check" /></svg
                                      >{t('141')}</span
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
                                  {t('142')}
                                </p>
                                <span
                                  className="demo-pill border-primary bg-primary font-bold text-on-primary"
                                  ><svg className="size-3.5" aria-hidden="true">
                                    <use href="#i-check" /></svg
                                  >{t('143')}</span
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
                                      >{t('144')}</span
                                    >
                                    <span className="flex items-center gap-2.5"
                                      ><span
                                        className="size-3.5 rounded-sm bg-line"
                                        aria-hidden="true"
                                      ></span
                                      >{t('145')}</span
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
                                    Adding one attribute helped shoppers distinguish{" "}
                                    <span className="whitespace-nowrap text-primary"
                                      >{t('146')}</span
                                    >.
                                  </p>
                                  <div className="min-w-52">
                                    <p className="eyebrow">{t('147')}</p>
                                    <div
                                      className="mt-2.5 space-y-1.5 tabular-nums text-xs"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-11 text-muted">{t('148')}</span
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
                                        <span className="w-11 text-muted">{t('149')}</span
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
                            >{t('150')}</span
                          >
                          <span className="demo-step" data-demo-caption
                            >{t('151')}</span
                          >
                          <span className="demo-step" data-demo-caption></span>
                          <span className="demo-step" data-demo-caption></span>
                          <span className="demo-step" data-demo-caption
                            >{t('152')}</span
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
