/**
 * Converted from `footer.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Image from "next/image";

import Link from "next/link";

export function DesignedFooter() {
  return (
    <footer className="border-t border-line bg-card">
          <div className="frame pt-20 pb-12 lg:pt-24">
            <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              <div>
                <Link               href="/en"
                  aria-label="Pulse home"
                  className="hit-area inline-flex"
                  ><Image
                    src="/assets/brand/logo.webp"
                    alt="Pulse"
                    width={84}
                    height={28}
                    loading="lazy"
                    className="h-7 w-auto theme-dark:hidden" /><Image
                    src="/assets/brand/logo-white.webp"
                    alt=""
                    width={84}
                    height={28}
                    loading="lazy"
                    className="hidden h-7 w-auto theme-dark:inline"
                    aria-hidden="true" /></Link>
              </div>
              <div>
                <h2 className="text-nav font-semibold">Product</h2>
                <ul className="mt-6 space-y-5 text-sm text-muted">
                  <li>
                    <Link                   href="/en/product/decision-audit"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Decision Audit</Link>
                  </li>
                  <li>
                    <Link                   href="/en/product/decision-verification"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Decision Verification</Link>
                  </li>
                  <li>
                    <Link                   href="/en/product/decision-monitor"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Decision Monitor</Link>
                  </li>
                  <li>
                    <Link                   href="/en/pricing"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Pricing</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-nav font-semibold">Company</h2>
                <ul className="mt-6 space-y-5 text-sm text-muted">
                  <li>
                    <Link                   href="/en/about"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >About us</Link>
                  </li>
                  <li>
                    <Link                   href="/en/contact"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Contact</Link>
                  </li>
                  <li>
                    <Link                   href="/en/careers"
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                      >Career</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-nav font-semibold">Contact point</h2>
                <div className="mt-6 flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/108237732/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pulse on LinkedIn (opens in a new tab)"
                    className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out-soft hover:border-primary hover:text-primary"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                  <a
                    href="https://www.facebook.com/people/The-Pulse-API/61591908084667/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pulse on Facebook (opens in a new tab)"
                    className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out-soft hover:border-primary hover:text-primary"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-facebook" /></svg
                  ></a>
                  <a
                    href="https://github.com/thepulseapi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pulse on GitHub (opens in a new tab)"
                    className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out-soft hover:border-primary hover:text-primary"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-github" /></svg
                  ></a>
                </div>
                <ul className="mt-5 space-y-3.5 text-sm text-muted">
                  <li>
                    <a
                      href="mailto:getintouch@thepulseapi.com"
                      className="-my-2.5 inline-flex min-h-11 items-center wrap-anywhere transition-colors duration-200 ease-out-soft hover:text-ink"
                      >getintouch@thepulseapi.com</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-line">
            <div
              className="frame flex flex-col gap-3 py-4 text-data text-ink sm:flex-row sm:items-center sm:justify-between"
            >
              <p>© 2026 Pulse. All rights reserved.</p>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-5">
                <li>
                  <Link                 href="/en/privacy"
                    className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
                    >Privacy Policy</Link>
                </li>
                <li>
                  <Link                 href="/en/terms"
                    className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
                    >Terms of Service</Link>
                </li>
                <li>
                  <Link                 href="/en/cookies"
                    className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
                    >Cookie Policy</Link>
                </li>
                <li>
                  <Link                 href="/en/gdpr"
                    className="-my-2.5 inline-flex min-h-11 min-w-11 items-center justify-center transition-colors duration-200 ease-out-soft hover:text-primary"
                    >GDPR</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
  );
}
