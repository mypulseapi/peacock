/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
export function Section3Section() {
  const t = designedText("product.decision-audit.section3");
  return (
    <section className="bg-soft-gradient scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
                <p className="reveal mt-5 text-lg text-pretty text-muted delay-100">
                  {t('2')}
                </p>
              </div>
              {/* The repair list at full width: the audit's real output, the spine of the page. Bars are fractions of the
                   bit values (1.067 is the longest); the #1 row carries the priority ring. */}
              <div
                className="reveal mt-14 rounded-2xl border border-line bg-card p-3 shadow-sm delay-200 sm:p-4 lg:mt-16"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 pb-3 sm:px-3"
                >
                  <p className="text-data font-semibold text-ink">
                    {t('3')}
                  </p>
                  <span
                    className="rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-semibold text-primary-hover"
                    >{t('4')}</span
                  >
                </div>
                <div
                  className="hidden grid-cols-12 gap-x-4 px-5 pb-2 text-caption text-muted sm:grid"
                  aria-hidden="true"
                >
                  <span className="col-span-4">{t('5')}</span>
                  <span className="col-span-2">{t('6')}</span>
                  <span className="col-span-4">{t('7')}</span>
                  <span className="col-span-2 text-right">{t('8')}</span>
                </div>
                <ol className="space-y-2">
                  <li
                    className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 sm:grid sm:grid-cols-12 rounded-xl border px-4 py-4 delay-100 sm:px-5 border-signal bg-signal-tint ring-1 ring-signal"
                  >
                    <span
                      className="col-span-8 flex min-w-0 flex-1 items-center gap-3 sm:col-span-4"
                      ><span
                        className="grid size-7 shrink-0 place-items-center rounded-md bg-signal text-sm font-semibold text-on-step tabular-nums"
                        >1</span
                      ><span className="text-h3 text-ink">{t('9')}</span></span
                    >
                    <span
                      className="col-span-4 ml-auto text-right font-mono text-h3 font-semibold text-primary tabular-nums sm:order-last sm:col-span-2"
                      >1.067</span
                    >
                    <span
                      className="col-span-12 flex basis-full items-center gap-1.5 text-sm font-medium text-gap-strong tabular-nums sm:col-span-2"
                      ><svg className="size-3.5 shrink-0" aria-hidden="true">
                        <use href="#i-triangle-alert" /></svg
                      >{t('10')}</span
                    >
                    <span
                      className="col-span-12 h-2.5 basis-full overflow-hidden rounded-full bg-surface-1 sm:col-span-4"
                      ><span
                        className="reveal-bar block h-full rounded-full bg-chart-main delay-300 w-full"
                      ></span
                    ></span>
                  </li>
                  <li
                    className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 sm:grid sm:grid-cols-12 rounded-xl border px-4 py-4 delay-200 sm:px-5 border-transparent"
                  >
                    <span
                      className="col-span-8 flex min-w-0 flex-1 items-center gap-3 sm:col-span-4"
                      ><span
                        className="grid size-7 shrink-0 place-items-center rounded-md bg-baseline text-sm font-semibold text-on-step tabular-nums"
                        >2</span
                      ><span className="text-h3 text-ink">{t('11')}</span></span
                    >
                    <span
                      className="col-span-4 ml-auto text-right font-mono text-h3 font-semibold text-primary tabular-nums sm:order-last sm:col-span-2"
                      >1.012</span
                    >
                    <span
                      className="col-span-12 flex basis-full items-center gap-1.5 text-sm font-medium text-gap-strong tabular-nums sm:col-span-2"
                      ><svg className="size-3.5 shrink-0" aria-hidden="true">
                        <use href="#i-triangle-alert" /></svg
                      >{t('12')}</span
                    >
                    <span
                      className="col-span-12 h-2.5 basis-full overflow-hidden rounded-full bg-surface-1 sm:col-span-4"
                      ><span
                        className="reveal-bar block h-full rounded-full bg-chart-main delay-400 w-1012/1067"
                      ></span
                    ></span>
                  </li>
                  <li
                    className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 sm:grid sm:grid-cols-12 rounded-xl border px-4 py-4 delay-300 sm:px-5 border-transparent"
                  >
                    <span
                      className="col-span-8 flex min-w-0 flex-1 items-center gap-3 sm:col-span-4"
                      ><span
                        className="grid size-7 shrink-0 place-items-center rounded-md bg-baseline text-sm font-semibold text-on-step tabular-nums"
                        >3</span
                      ><span className="text-h3 text-ink">{t('13')}</span></span
                    >
                    <span
                      className="col-span-4 ml-auto text-right font-mono text-h3 font-semibold text-primary tabular-nums sm:order-last sm:col-span-2"
                      >0.747</span
                    >
                    <span
                      className="col-span-12 flex basis-full items-center gap-1.5 text-sm font-medium text-gap-strong tabular-nums sm:col-span-2"
                      ><svg className="size-3.5 shrink-0" aria-hidden="true">
                        <use href="#i-triangle-alert" /></svg
                      >{t('14')}</span
                    >
                    <span
                      className="col-span-12 h-2.5 basis-full overflow-hidden rounded-full bg-surface-1 sm:col-span-4"
                      ><span
                        className="reveal-bar block h-full rounded-full bg-chart-main delay-500 w-747/1067"
                      ></span
                    ></span>
                  </li>
                  <li
                    className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 sm:grid sm:grid-cols-12 rounded-xl border px-4 py-4 delay-400 sm:px-5 border-transparent"
                  >
                    <span
                      className="col-span-8 flex min-w-0 flex-1 items-center gap-3 sm:col-span-4"
                      ><span
                        className="grid size-7 shrink-0 place-items-center rounded-md bg-baseline text-sm font-semibold text-on-step tabular-nums"
                        >4</span
                      ><span className="text-h3 text-ink">{t('15')}</span></span
                    >
                    <span
                      className="col-span-4 ml-auto text-right font-mono text-h3 font-semibold text-primary tabular-nums sm:order-last sm:col-span-2"
                      >0.688</span
                    >
                    <span
                      className="col-span-12 flex basis-full items-center gap-1.5 text-sm font-medium text-gap-strong tabular-nums sm:col-span-2"
                      ><svg className="size-3.5 shrink-0" aria-hidden="true">
                        <use href="#i-triangle-alert" /></svg
                      >{t('16')}</span
                    >
                    <span
                      className="col-span-12 h-2.5 basis-full overflow-hidden rounded-full bg-surface-1 sm:col-span-4"
                      ><span
                        className="reveal-bar block h-full rounded-full bg-chart-main delay-600 w-688/1067"
                      ></span
                    ></span>
                  </li>
                </ol>
                <p className="px-2 pt-4 pb-1 text-xs text-muted sm:px-3">
                  {t('17')}
                </p>
              </div>
            </div>
          </section>
  );
}
