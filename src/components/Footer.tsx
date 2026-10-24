"use client";

/*
 * A client component, which it was not before the move to a static export.
 *
 * `useTranslations` in a *server* component resolves the locale through next-intl's request
 * config, which falls back to `headers()`. There is no request in a static export, so every page
 * that renders the footer failed to prerender -- including /_not-found, which sits outside
 * [locale] and has no locale to set in the first place.
 *
 * As a client component it reads the locale from the NextIntlClientProvider that both trees
 * already wrap it in, so one change covers the locale pages and the 404 together. The cost is the
 * footer's strings in the client bundle, which is a list of links.
 */
import { useTranslations } from "next-intl";
import { SOCIAL } from "@/lib/social";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Github, Linkedin, Facebook } from "lucide-react";
import { img } from "@/lib/cdn";

const SOCIALS = [
  { label: "LinkedIn", href: SOCIAL.linkedin, Icon: Linkedin, bg: "#0a66c2" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/thepulseapi",
    Icon: Facebook,
    bg: "#1877f2",
  },
  { label: "GitHub", href: SOCIAL.github, Icon: Github, bg: "#24292f" },
];

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

/**
 * Flat ink surface with a hairline top edge.
 *
 * This was a full-bleed red-to-violet gradient with a white card floating on
 * it. Against the new ink identity the gradient was the loudest thing on any
 * page, and once the text tokens moved to ink the column headings went white
 * on a white card and disappeared. Columns are also left aligned now: centred
 * link lists make the eye hunt for a new left edge on every row.
 *
 * Server component, the newsletter form moved out (it already lives in
 * `NewsletterForm.tsx`, used directly by /blog and /status), so nothing here
 * needs state and the footer now ships zero JavaScript.
 */
export function Footer() {
  const t = useTranslations("footer");

  /**
   * Three columns, matching the table in the 2026-10 review.
   *
   * The first pass at this read only the summary line above that table, "reduce
   * it to 3 columns", and invented the contents. The table is specific: Pricing
   * belongs under Product because it is a product question, Company is the
   * three pages about us rather than a catch-all, and Other information is two
   * links, not six. Restored here against the table itself.
   *
   * The column is titled Company and the link inside it is About us. Both are
   * deliberate: the review asked for an About us entry point in the header and
   * the footer, not for the footer column to be renamed.
   */
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("product"),
      links: [
        { label: t("decisionAudit"), href: "/product/decision-audit" },
        {
          label: t("decisionVerification"),
          href: "/product/decision-verification",
        },
        { label: t("decisionMonitor"), href: "/product/decision-monitor" },
        { label: t("pricing"), href: "/pricing" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("aboutUs"), href: "/about" },
        { label: t("contact"), href: "/contact" },
        { label: t("career"), href: "/careers", badge: t("hiring") },
      ],
    },
  ];

  /** Legal sits on the copyright row, which is where people look for it. */
  const legal: FooterLink[] = [
    { label: t("privacyPolicy"), href: "/privacy" },
    { label: t("termsOfService"), href: "/terms" },
    { label: t("cookiePolicy"), href: "/cookies" },
    { label: t("gdpr"), href: "/gdpr" },
  ];

  return (
    <footer className="relative z-10 border-t border-[color:var(--chrome-line)] bg-[color:var(--chrome)]">
      <div className="mx-auto max-w-shell px-5 pt-20 pb-12 sm:px-6 lg:pt-24">
        {/* Brand rail, then the link columns. One row rather than the two the
            footer used to have, so the columns line up on a single baseline
            instead of starting at three different heights. */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Link href="/" aria-label="Pulse home" className="inline-flex">
              <Image
                src={img("brand/logo.webp")}
                alt="Pulse"
                width={600}
                height={200}
                sizes="104px"
                className="logo-light h-7 w-auto"
              />
              <Image
                src={img("brand/logo-white.webp")}
                alt=""
                aria-hidden
                width={600}
                height={200}
                sizes="104px"
                className="logo-dark h-7 w-auto"
              />
            </Link>
          </div>

          {/* Contact point sits with the link columns, not on the brand rail.
              The review moved it there explicitly: an arrow from the social
              icons to the right-hand side, and the left reduced to the logo. */}
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[0.9375rem] font-semibold text-[color:var(--on-chrome)]">
                {col.title}
              </h2>
              <ul className="mt-6 space-y-3.5 text-[0.875rem] text-[color:var(--on-chrome-2)]">
                {col.links.map((link) => (
                  <li key={link.label} className="flex items-start gap-2">
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[24px] items-center leading-[1.6] transition hover:text-[color:var(--on-chrome)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[24px] items-center leading-[1.6] transition hover:text-[color:var(--on-chrome)]"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.badge && (
                      <span className="mt-1 inline-flex h-[18px] shrink-0 items-center rounded bg-[color:var(--sig)] px-1.5 text-[9.5px] font-semibold whitespace-nowrap text-[color:var(--on-sig)]">
                        {link.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[0.9375rem] font-semibold text-[color:var(--on-chrome)]">
              {t("contactPoint")}
            </h2>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--chrome-line)] text-[color:var(--on-chrome-2)] transition hover:border-[color:var(--sig)] hover:text-[color:var(--sig)]"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </a>
              ))}
            </div>
            <ul className="mt-5 space-y-3.5 text-[0.875rem] text-[color:var(--on-chrome-2)]">
              {/* ponytail: still hidden until someone supplies a real number. */}
              {t("phone") && (
                <li>
                  <a
                    href={`tel:${t("phone").replace(/\s/g, "")}`}
                    className="inline-flex min-h-[24px] items-center transition hover:text-[color:var(--on-chrome)]"
                  >
                    {t("phone")}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="inline-flex min-h-[24px] items-center transition hover:text-[color:var(--on-chrome)]"
                >
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full bleed and solid white. The bar reads as a distinct band under the
          footer rather than as part of it, so the rule is meant to be seen. */}
      <div className="h-px w-full bg-white" aria-hidden />

      <div className="mx-auto flex max-w-shell flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[0.8125rem] text-[color:var(--on-panel)]">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.8125rem] text-[color:var(--on-panel)]">
          {legal.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-[24px] items-center transition hover:opacity-70"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
