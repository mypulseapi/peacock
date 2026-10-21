/**
 * Converted from `header.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function DesignedHeader() {
  return (
    <header
          className="sticky top-0 z-50 border-b border-line bg-card font-display"
          data-nav
        >
          <div
            className="frame flex h-17 items-center justify-between gap-4 lg:gap-2 xl:gap-4"
          >
            <Link           href="/en"
              aria-label="Pulse home"
              className="hit-area shrink-0"
            >
              <img
                src="/assets/brand/logo.webp"
                alt="Pulse"
                width={84}
                height={28}
                className="h-7 w-auto theme-dark:hidden"
              /><img
                src="/assets/brand/logo-white.webp"
                alt=""
                width={84}
                height={28}
                className="hidden h-7 w-auto theme-dark:inline"
                aria-hidden="true"
              />
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
                      Product
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
                            Measure &amp; repair
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/product/decision-audit"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Decision Audit</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Rank which missing fields to fix first</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/product/decision-verification"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Decision Verification</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Re-measure what moved after a repair</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            Keep it measured
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/product/decision-monitor"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Decision Monitor
                                  <span
                                    className="rounded bg-primary-tint px-1.5 py-0.5 text-label font-semibold text-primary uppercase"
                                    >Recurring</span
                                  ></span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Get told when a shelf slips, and why</span
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
                                  >How it works</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >From a blank cell to a measured result</span
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
                      Templates
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
                            Everyday
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/industries/ecommerce"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Ecommerce and retail</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Mixed catalogues, many shelves</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/industries/fmcg"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >FMCG and consumer goods</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Fragrance-free, allergens, pack size</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            Home &amp; beauty
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/industries/furniture"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Furniture and homewares</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Dimensions, capacity, material</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/industries/cosmetics"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Cosmetics and personal care</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Shade, skin type, finish</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            Technical
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/industries/technology"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Technology and electronics</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Screen size, memory, storage</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/industries/distribution"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >B2B and industrial</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Compatibility and technical specs</span
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
                      Resources
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
                            Learn
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <a
                                href="https://developer.thepulseapi.com/"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Documentation</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Integrate in ten lines, or not at all</span
                                >
                              </a>
                            </li>
                            <li>
                              <Link                             href="/en/visual-evidence"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Research</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >What we measured about product photographs</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-column w-76 p-3">
                          <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                            Company
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <Link                             href="/en/about"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >About us</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Who builds Pulse, and why</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/contact"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Contact</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >Talk to the team</span
                                >
                              </Link>
                            </li>
                            <li>
                              <Link                             href="/en/careers"
                                className="block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                              >
                                <span
                                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                                  >Career</span
                                >
                                <span
                                  className="mt-1 block text-sm text-pretty text-muted"
                                  >How we work, and how to reach us</span
                                >
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <li><Link href="/en/pricing" className="nav-link">Pricing</Link></li>
              </ul>
              <div className="nav-viewport" data-nav-viewport>
                <div className="nav-viewport-stack" data-nav-stack></div>
              </div>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <div className="relative">
                <details className="group" data-dropdown>
                  <summary
                    className="hit-area flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-ink"
                    aria-label="EN, switch language"
                  >
                    <svg className="size-4 text-primary" aria-hidden="true">
                      <use href="#i-globe" />
                    </svg>
                    EN
                    <svg
                      className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <use href="#i-chevron-down" />
                    </svg>
                  </summary>
                  <div
                    data-panel
                    className="absolute top-full right-0 mt-2 w-44 animate-dropdown rounded-2xl border border-line bg-card p-1.5 shadow-xl motion-reduce:animate-none"
                  >
                    <p
                      className="border-b border-line px-3 py-2 text-label font-medium text-muted uppercase"
                    >
                      Switch language
                    </p>
                    <a
                      role="link"
                      aria-disabled="true"
                      aria-current="true"
                      className="mt-1 flex min-h-11 items-center gap-3 rounded-control bg-primary-tint px-3 py-2.5 text-sm font-medium text-primary"
                    >
                      <span aria-hidden="true">🇺🇸</span> English
                      <svg className="ml-auto size-4" aria-hidden="true">
                        <use href="#i-check" />
                      </svg>
                    </a>
                    {/* Tiếng Việt: add back (with hreflang) when the Vietnamese page exists, guideline §9 */}
                  </div>
                </details>
              </div>
              <Link href="/en/signin" className="nav-link">Sign In</Link>
              <Link             href="/en/contact"
                className="group btn-primary gap-1.5 rounded-control text-nav whitespace-nowrap"
              >
                Request an audit
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
                <p className="mt-6 px-4 eyebrow">Product</p>
                <ul className="mt-2">
                  <li>
                    <Link                   href="/en/product/decision-audit"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-clipboard-check" /></svg></span
                      >Decision Audit</Link>
                  </li>
                  <li>
                    <Link                   href="/en/product/decision-verification"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-compare" /></svg></span
                      >Decision Verification</Link>
                  </li>
                  <li>
                    <Link                   href="/en/product/decision-monitor"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-bell-ring" /></svg></span
                      >Decision Monitor</Link>
                  </li>
                </ul>

                <p className="mt-6 px-4 eyebrow">Templates</p>
                <ul className="mt-2">
                  <li>
                    <Link                   href="/en/industries/ecommerce"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-cart" /></svg></span
                      >Ecommerce and retail</Link>
                  </li>
                  <li>
                    <Link                   href="/en/industries/fmcg"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-basket" /></svg></span
                      >FMCG and consumer goods</Link>
                  </li>
                  <li>
                    <Link                   href="/en/industries/technology"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-cpu" /></svg></span
                      >Technology and electronics</Link>
                  </li>
                  <li>
                    <Link                   href="/en/industries/furniture"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-sofa" /></svg></span
                      >Furniture and homewares</Link>
                  </li>
                  <li>
                    <Link                   href="/en/industries/cosmetics"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-sparkles" /></svg></span
                      >Cosmetics and personal care</Link>
                  </li>
                  <li>
                    <Link                   href="/en/industries/distribution"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-factory" /></svg></span
                      >B2B and industrial</Link>
                  </li>
                </ul>

                <p className="mt-6 px-4 eyebrow">Resources</p>
                <ul className="mt-2">
                  <li>
                    <a
                      href="https://developer.thepulseapi.com/"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-file-text" /></svg></span
                      >Documentation</a
                    >
                  </li>
                  <li>
                    <Link                   href="/en/visual-evidence"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-flask" /></svg></span
                      >Research</Link>
                  </li>
                  {/* The desktop panel splits Resources into Learn and Company; on mobile the
                       two run together, so About us closes the list as Company does there. */}
                  <li>
                    <Link                   href="/en/about"
                      className="flex items-center gap-4 rounded-control px-4 py-2.5 text-lg text-ink"
                      ><span className="nav-icon-tile size-9"
                        ><svg className="size-4" aria-hidden="true">
                          <use href="#i-user-round" /></svg></span
                      >About us</Link>
                  </li>
                </ul>

                <div className="mt-6 border-t border-line pt-6">
                  <Link                 href="/en/pricing"
                    className="block rounded-control px-4 py-3 text-lg font-medium text-ink"
                    >Pricing</Link>

                  <Link                 href="/en/signin"
                    className="block rounded-control px-4 py-3 text-lg font-medium text-ink"
                    >Sign In</Link>
                  <Link                 href="/en/contact"
                    className="btn-primary mt-4 w-full rounded-control text-nav"
                    >Request a Decision Audit
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
