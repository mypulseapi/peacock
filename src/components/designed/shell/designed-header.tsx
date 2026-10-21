/**
 * Converted from `header.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { DesignedLocaleSwitch } from "./designed-locale-switch";
import { designedHref, designedText } from "../t";
import Image from "next/image";

import Link from "next/link";

export function DesignedHeader() {
  const t = designedText("shell.designed-header");
  return (
    <header
          className="sticky top-0 z-50 border-b border-line bg-card font-display"
          data-nav
        >
          <div
            className="frame flex h-17 items-center justify-between gap-4 lg:gap-2 xl:gap-4"
          >
            <Link           href={designedHref("/en")}
              aria-label="Pulse home"
              className="hit-area shrink-0"
            >
              <Image
                src="/assets/brand/logo.webp"
                alt="Pulse"
                width={84}
                height={28}
                className="h-7 w-auto theme-dark:hidden" priority /><Image
                src="/assets/brand/logo-white.webp"
                alt=""
                width={84}
                height={28}
                className="hidden h-7 w-auto theme-dark:inline"
                aria-hidden="true" priority />
            </Link>

            {/* Desktop menu */}
            <nav aria-label="Main" className="relative hidden lg:block" data-mega-nav>
              <ul className="flex items-center gap-0.5">
                {/* About us is deliberately not a top-level item. It lives once, under
                     Resources > Company. Two entry points to /about read as two destinations. */}
                <li className="relative">
                  <details className="group" data-dropdown data-mega>
                    <summary
                      className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink"
                    >
                      {t('1')}
                      <svg
                        className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <div
                      data-panel
                      className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                    >
                      <div data-nav-content className="nav-content flex">
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('2')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/product/decision-audit")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('3')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('4')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/product/decision-verification")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('5')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('6')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('7')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/product/decision-monitor")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('8')}
                                  <span
                                    className="rounded bg-primary-tint px-1.5 py-0.5 text-label font-semibold text-primary uppercase"
                                    >{t('9')}</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('10')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <a
                                href="#method"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('11')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('12')}</span
                                >
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <li className="relative">
                  <details className="group" data-dropdown data-mega>
                    <summary
                      className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink"
                    >
                      {t('13')}
                      <svg
                        className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <div
                      data-panel
                      className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                    >
                      <div data-nav-content className="nav-content flex">
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('14')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/industries/ecommerce")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('15')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('16')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/industries/fmcg")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('17')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('18')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('19')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/industries/furniture")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('20')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('21')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/industries/cosmetics")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('22')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('23')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('24')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/industries/technology")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('25')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('26')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/industries/distribution")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('27')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('28')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <li className="relative">
                  <details className="group" data-dropdown data-mega>
                    <summary
                      className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink"
                    >
                      {t('29')}
                      <svg
                        className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <use href="#i-chevron-down" />
                      </svg>
                    </summary>
                    <div
                      data-panel
                      className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                    >
                      <div data-nav-content className="nav-content flex">
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('30')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <a
                                href="https://developer.thepulseapi.com/"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('31')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('32')}</span
                                >
                              </a>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/visual-evidence")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('33')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('34')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            {t('35')}
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href={designedHref("/en/about")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('36')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('37')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/contact")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('38')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('39')}</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href={designedHref("/en/careers")}
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >{t('40')}</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >{t('41')}</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <li><Link href={designedHref("/en/pricing")} className="nav-link">{t('42')}</Link></li>
              </ul>
              <div className="nav-viewport" data-nav-viewport>
                <div className="nav-viewport-stack" data-nav-stack></div>
              </div>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <DesignedLocaleSwitch heading={t('44')} />
              <Link href={designedHref("/en/signin")} className="nav-link">{t('46')}</Link>
              <Link             href={designedHref("/en/contact")}
                className="group btn-primary gap-1.5 rounded-control text-nav whitespace-nowrap"
              >
                {t('47')}
                <svg
                  className="size-3.5 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <use href="#i-arrow-right" />
                </svg>
              </Link>
            </div>

            {/* Mobile menu */}
            <details className="group lg:hidden" data-mobile-menu>
              <summary
                className="hit-area flex size-9 cursor-pointer items-center justify-center rounded-control text-ink"
                aria-label="Open menu"
              >
                <svg className="size-5 group-open:hidden" aria-hidden="true">
                  <use href="#i-menu" />
                </svg>
                <svg className="hidden size-5 group-open:block" aria-hidden="true">
                  <use href="#i-x" />
                </svg>
              </summary>
              <div
                className="fixed inset-x-0 top-17 bottom-0 animate-dropdown overflow-y-auto border-t border-line bg-card pt-4 pb-10 motion-reduce:animate-none md:px-4"
              >
                {/* About us moved down into Resources, so the mobile menu lists it in the same
                     one place the desktop one does. */}
                <p className="mt-6 px-4 eyebrow">{t('48')}</p>
                <ul className="mt-2">
                  <li>
                    <Link                   href={designedHref("/en/product/decision-audit")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-clipboard-check" /></svg></span
                      >{t('49')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/product/decision-verification")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-compare" /></svg></span
                      >{t('50')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/product/decision-monitor")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-bell-ring" /></svg></span
                      >{t('51')}</Link>
                  </li>
                </ul>

                <p className="mt-6 px-4 eyebrow">{t('52')}</p>
                <ul className="mt-2">
                  <li>
                    <Link                   href={designedHref("/en/industries/ecommerce")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-cart" /></svg></span
                      >{t('53')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/industries/fmcg")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-basket" /></svg></span
                      >{t('54')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/industries/technology")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-cpu" /></svg></span
                      >{t('55')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/industries/furniture")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-sofa" /></svg></span
                      >{t('56')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/industries/cosmetics")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-sparkles" /></svg></span
                      >{t('57')}</Link>
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/industries/distribution")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-factory" /></svg></span
                      >{t('58')}</Link>
                  </li>
                </ul>

                <p className="mt-6 px-4 eyebrow">{t('59')}</p>
                <ul className="mt-2">
                  <li>
                    <a
                      href="https://developer.thepulseapi.com/"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-file-text" /></svg></span
                      >{t('60')}</a
                    >
                  </li>
                  <li>
                    <Link                   href={designedHref("/en/visual-evidence")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-flask" /></svg></span
                      >{t('61')}</Link>
                  </li>
                  {/* The desktop panel splits Resources into Learn and Company; on mobile the
                       two run together, so About us closes the list as Company does there. */}
                  <li>
                    <Link                   href={designedHref("/en/about")}
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-user-round" /></svg></span
                      >{t('62')}</Link>
                  </li>
                </ul>

                <div className="mt-6 border-t border-line pt-6">
                  <Link                 href={designedHref("/en/pricing")}
                    className="block rounded-control px-4 py-3 text-lg font-medium text-ink"
                    >{t('63')}</Link>

                  <Link                 href={designedHref("/en/signin")}
                    className="block rounded-control px-4 py-3 text-lg font-medium text-ink"
                    >{t('64')}</Link>
                  <Link                 href={designedHref("/en/contact")}
                    className="btn-primary mt-4 w-full rounded-control text-nav"
                    >{t('65')}
                    <svg className="size-3.5" aria-hidden="true">
                      <use href="#i-arrow-right" /></svg
                  ></Link>
                </div>
              </div>
            </details>
          </div>
        </header>
  );
}
