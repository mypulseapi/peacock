/**
 * Converted from `pricing.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
import Link from "next/link";

export function Section1Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div className="frame pt-12 pb-16 lg:pb-20">
              <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="reveal text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="reveal max-w-xl text-body text-pretty text-muted delay-100"
                >
                  {t('2')}
                </p>
              </div>
              <ul
                className="reveal mt-12 grid grid-cols-1 gap-5 delay-100 lg:grid-cols-3"
                aria-label="Plans"
              >
                <li
                  className="relative isolate grid min-w-0 overflow-hidden rounded-3xl border border-line bg-card shadow-sm lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0"
                >
                  <div
                    className="pricing-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-24"
                    aria-hidden="true"
                  ></div>
                  <div className="px-6 pt-6 lg:px-7">
                    <p className="text-sm text-muted">{t('3')}</p>
                    <h2
                      className="mt-1 text-h2 text-balance wrap-break-word hyphens-auto text-ink"
                    >
                      {t('4')}
                    </h2>
                    <p className="mt-2 max-w-xs text-data text-pretty text-muted">
                      {t('5')}
                    </p>
                  </div>
                  <div className="px-6 pt-5 lg:px-7">
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-h3 font-semibold text-ink">
                        {t('6')}
                      </p>
                      <p className="text-sm leading-snug text-muted">
                        {t('7')}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-6 lg:px-7">
                    <Link href="/en/contact" className="btn-primary w-full justify-center"
                      >{t('8')}</Link>
                  </div>
                  <ul
                    className="space-y-2.5 border-t border-line px-6 pt-5 pb-6 text-data text-ink lg:px-7"
                  >
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('9')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('10')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('11')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('12')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('13')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('14')}</span>
                    </li>
                  </ul>
                </li>
                <li
                  className="relative isolate grid min-w-0 overflow-hidden rounded-3xl border border-line bg-card shadow-sm lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0"
                >
                  <div
                    className="pricing-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-24"
                    aria-hidden="true"
                  ></div>
                  <div className="px-6 pt-6 lg:px-7">
                    <p className="text-sm text-muted">{t('15')}</p>
                    <h2
                      className="mt-1 text-h2 text-balance wrap-break-word hyphens-auto text-ink"
                    >
                      {t('16')}
                    </h2>
                    <p className="mt-2 max-w-xs text-data text-pretty text-muted">
                      {t('17')}
                    </p>
                  </div>
                  <div className="px-6 pt-5 lg:px-7">
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-h3 font-semibold text-ink">
                        {t('18')}
                      </p>
                      <p className="text-sm leading-snug text-muted">
                        {t('19')}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-6 lg:px-7">
                    <Link href="/en/contact" className="btn-primary w-full justify-center"
                      >{t('20')}<span className="sr-only">
                        {t('21')}</span
                      ></Link>
                  </div>
                  <ul
                    className="space-y-2.5 px-6 pt-5 pb-6 text-data text-ink border-t border-line lg:px-7"
                  >
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('22')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('23')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('24')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('25')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('26')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('27')}</span>
                    </li>
                  </ul>
                </li>
                <li
                  className="relative isolate grid min-w-0 overflow-hidden rounded-3xl border border-line bg-card shadow-sm lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0"
                >
                  <div className="px-6 pt-6 lg:px-7">
                    <p className="text-sm text-muted">{t('28')}</p>
                    <h2
                      className="mt-1 text-h2 text-balance wrap-break-word hyphens-auto text-ink"
                    >
                      {t('29')}
                    </h2>
                    <p className="mt-2 max-w-xs text-data text-pretty text-muted">
                      {t('30')}
                    </p>
                  </div>
                  <div className="px-6 pt-5 lg:px-7">
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-h3 font-semibold text-ink">
                        {t('31')}
                      </p>
                      <p className="text-sm leading-snug text-muted">
                        {t('32')}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-6 lg:px-7">
                    <Link                   href="/en/contact"
                      className="btn-secondary w-full justify-center"
                      >{t('33')}<span className="sr-only">
                        {t('34')}</span
                      ></Link>
                  </div>
                  <ul
                    className="space-y-2.5 px-6 pt-5 pb-6 text-data text-ink border-t border-line lg:px-7"
                  >
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('35')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('36')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('37')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('38')}</span>
                    </li>
                    <li className="flex gap-2.5">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-ink"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('39')}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>
  );
}
