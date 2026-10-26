/**
 * Converted from `footer.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { asset } from "@/lib/cdn";
import { SOCIAL } from "@/lib/social";
import { designedHref, designedText } from "../t";
import Image from "next/image";

import Link from "next/link";

const COMPANY_FACTS = ["founded", "hq", "engineering", "builtFor"];

/** Three link columns of five rows each, so they line up row for row; the header's grouping. */
const COLUMNS: Array<{ heading: string; links: Array<[string, string]> }> = [
  {
    heading: "measureHeading",
    links: [
      ["/en/product/decision-audit", "2"],
      ["/en/product/decision-verification", "3"],
      ["/en/product/return-verification", "returnName"],
      ["/en/product/promotion-audit", "promotionName"],
      ["/en/product/decision-monitor", "4"],
    ],
  },
  {
    heading: "liveHeading",
    links: [
      ["/en/product/decision-api", "apiName"],
      ["/en/product/search", "searchName"],
      ["/en/product/recommendations", "recsName"],
      ["/en/product/pages", "pagesName"],
      ["/en/product/merchandising-studio", "studioName"],
    ],
  },
  {
    heading: "6",
    links: [
      ["/en/about", "7"],
      ["/en/opensource", "opensourceLink"],
      ["/en/pricing", "5"],
      ["/en/contact", "8"],
      ["/en/careers", "9"],
    ],
  },
];

const SOCIALS = [
  { name: "LinkedIn", href: SOCIAL.linkedin, icon: "i-linkedin" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/The-Pulse-API/61591908084667/",
    icon: "i-facebook",
  },
  { name: "GitHub", href: SOCIAL.github, icon: "i-github" },
];

export function DesignedFooter() {
  const t = designedText("shell.designed-footer");
  return (
    <footer className="border-t border-line bg-card">
      <div className="frame pt-20 pb-12 lg:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link
              href={designedHref("/en")}
              aria-label="Pulse home"
              className="hit-area inline-flex"
            >
              <Image
                src={asset("brand/logo.webp")}
                alt="Pulse"
                width={84}
                height={28}
                loading="lazy"
                className="h-7 w-auto theme-dark:hidden"
              />
              <Image
                src={asset("brand/logo-white.webp")}
                alt=""
                width={84}
                height={28}
                loading="lazy"
                className="hidden h-7 w-auto theme-dark:inline"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-pretty text-muted">
              {t("tagline")}
            </p>
            {/* Contact sits under the logo (2026-10-26): the brand column carries who we are and
                how to reach us, so the three link columns can line up row for row. */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Pulse on ${s.name} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out-soft hover:border-primary hover:text-primary"
                >
                  <svg className="size-5" aria-hidden="true">
                    <use href={`#${s.icon}`} />
                  </svg>
                </a>
              ))}
            </div>
            <a
              href="mailto:getintouch@thepulseapi.com"
              className="mt-3 inline-flex min-h-11 items-center text-sm wrap-anywhere text-muted transition-colors duration-200 ease-out-soft hover:text-ink"
            >
              {t("11")}
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-nav font-semibold">{t(col.heading)}</h2>
              <ul className="mt-6 space-y-5 text-sm text-muted">
                {col.links.map(([href, key]) => (
                  <li key={href}>
                    <Link
                      href={designedHref(href)}
                      className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink"
                    >
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Company facts, the owner's Direction A (mockup pin 9): who and where, the first thing an
            investor looks for. Same wording as the About page. Hairlines are a 1px gap over `line`. */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_FACTS.map((key) => (
            <div key={key} className="bg-card px-5 py-4">
              <dt className="text-caption text-muted">{t(`${key}Label`)}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">
                {t(`${key}Value`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="border-t border-line">
        <div className="frame flex flex-col gap-3 py-4 text-data text-ink sm:flex-row sm:items-center sm:justify-between">
          <p>{t("12")}</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <li>
              <Link
                href={designedHref("/en/privacy")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("13")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/terms")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("14")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/cookies")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("15")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/gdpr")}
                className="-my-2.5 inline-flex min-h-11 min-w-11 items-center justify-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("16")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
