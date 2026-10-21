/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedHref, designedText } from "../t";
import Link from "next/link";

export function MonitorSection() {
  const t = designedText("product.monitor");
  return (
    <section id="monitor" className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <h2 className="reveal text-title text-balance">
                    Decision Monitor.{" "}
                    <span className="text-muted">{t('1')}</span>
                  </h2>
                  <p className="reveal mt-5 text-body leading-relaxed text-muted">
                    {t('2')}
                  </p>
                  <p
                    className="reveal mt-6 border-t border-line pt-5 text-sm text-muted"
                  >
                    <strong className="font-semibold text-ink"
                      >{t('3')}</strong
                    >
                    {t('4')}
                  </p>
                  <Link                 href={designedHref("/en/product/decision-monitor")}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >{t('5')}<svg
                      className="size-3.5 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <use href="#i-arrow-right" /></svg
                  ></Link>
                </div>
                <div className="reveal delay-200 lg:col-span-6">
                  <ul
                    className="space-y-3 rounded-2xl border border-line bg-card p-6 text-data text-ink shadow-sm"
                  >
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('6')}</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >{t('7')}</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >{t('8')}</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('9')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}
