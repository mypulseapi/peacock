/**
 * Converted from `pricing.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Restructured so the page reads as an engagement journey rather than three near-equivalent tiers.
 *
 * Two things were wrong with the three-card row it replaces. The Decision Audit is the entry point
 * and the only free step, but it sat in one of three equal columns, so nothing told a visitor where
 * to start; it is now a single wide card above the rest. And Decision Monitor, a product with its
 * own page, appeared only as one bullet inside the repair card; it now has a card of its own
 * beside the other two.
 *
 * The cards are generated from one shape rather than repeated by hand. The original was four
 * near-identical blocks of fifty lines each, where a change to the check icon or the row padding
 * had to be made four times and could be made three.
 */
import { designedHref, designedText } from "../t";
import { Lanes } from "./lanes";
import Link from "next/link";

/** The three steps after the audit, in the order a customer takes them. */
const STEPS = [
  {
    badge: "15",
    name: "16",
    lede: "17",
    price: "18",
    priceNote: "19",
    cta: "20",
    ctaSr: "21",
    bullets: ["22", "23", "24", "25", "26", "27"],
  },
  {
    badge: "monitorBadge",
    name: "monitorName",
    lede: "monitorLede",
    price: "monitorPrice",
    priceNote: "monitorPriceNote",
    cta: "monitorCta",
    ctaSr: "monitorCtaSr",
    bullets: ["monitor1", "monitor2", "monitor3", "monitor4", "monitor5"],
  },
  {
    badge: "28",
    name: "29",
    lede: "30",
    price: "31",
    priceNote: "32",
    cta: "33",
    ctaSr: "34",
    bullets: ["35", "36", "37", "38", "39"],
  },
] as const;

/** The audit's own bullets, which are what the free step actually returns. */
const AUDIT_BULLETS = ["9", "10", "11", "12", "13", "14"] as const;

function Check() {
  return (
    <svg className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true">
      <use href="#i-check" />
    </svg>
  );
}

export function Section1Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="hero-bg border-b border-line">
      <div className="frame pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* The product pages' hero size (`text-hero`, owner, 28 Oct 2026). The column is wider than
              theirs so the longer second line still fits on one line on a wide screen. */}
          <h1 className="reveal mx-auto text-hero text-balance">
            <span className="sm:block">{t("heroTitle")}</span>{" "}
            <span className="sm:block">{t("heroTitle2")}</span>
          </h1>
          <p className="reveal mx-auto mt-4 max-w-2xl text-body leading-relaxed text-pretty text-muted delay-100">
            {t("heroLede")}
          </p>
        </div>

        <Lanes />

        {/* The catalogue lane in detail: the free audit, then what follows it. */}
        <h2
          id="catalogue"
          className="reveal mx-auto mt-20 max-w-2xl scroll-mt-24 text-center text-title text-balance"
        >
          {t("lane2Name")}
        </h2>

        {/*
                The entry point, on its own and wide.

                It is the only free step and the one every other step follows from, so it is not one
                of three columns competing for the same glance.
              */}
        <div className="reveal mx-auto mt-12 max-w-[1000px] delay-100">
          <div className="relative isolate overflow-hidden rounded-3xl border border-primary-line bg-card p-6 shadow-sm lg:p-10">
            <div
              className="pricing-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-32"
              aria-hidden="true"
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div className="min-w-0">
                <p className="eyebrow-primary">{t("3")}</p>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h2 className="text-h2 text-balance wrap-break-word text-ink">
                    {t("4")}
                  </h2>
                  <p className="font-display text-h3 font-semibold text-ink">
                    {t("6")}
                  </p>
                </div>
                <p className="mt-3 max-w-sm text-body text-pretty text-muted">
                  {t("5")}
                </p>
                <p className="mt-2 text-sm leading-snug text-muted">{t("7")}</p>
                <Link
                  href={designedHref("/en/contact")}
                  className="btn-primary mt-7 w-full justify-center sm:w-auto"
                >
                  {t("8")}
                  <svg className="size-4" aria-hidden="true">
                    <use href="#i-arrow-right" />
                  </svg>
                </Link>
              </div>
              <ul className="min-w-0 space-y-2.5 border-t border-line pt-6 text-data text-ink lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                {AUDIT_BULLETS.map((k) => (
                  <li key={k} className="flex gap-2.5">
                    <Check />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What follows, once the audit has found something worth the work. */}
        <div className="mx-auto mt-16 max-w-2xl text-center lg:mt-20">
          <h2 className="reveal text-title text-balance">{t("afterTitle")}</h2>
          <p className="reveal mt-3 text-body text-pretty text-muted delay-100">
            {t("afterLede")}
          </p>
        </div>

        <ul
          className="reveal mt-10 grid grid-cols-1 gap-5 delay-100 lg:grid-cols-3"
          aria-label={t("afterTitle")}
        >
          {STEPS.map((step) => (
            <li
              key={step.name}
              className="relative isolate grid min-w-0 overflow-hidden rounded-3xl border border-line bg-card shadow-sm lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0"
            >
              <div
                className="pricing-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-24"
                aria-hidden="true"
              />
              <div className="px-6 pt-6 lg:px-7">
                <p className="text-sm text-muted">{t(step.badge)}</p>
                <h3 className="mt-1 text-h2 text-balance wrap-break-word hyphens-auto text-ink">
                  {t(step.name)}
                </h3>
                <p className="mt-2 max-w-xs text-data text-pretty text-muted">
                  {t(step.lede)}
                </p>
              </div>
              <div className="px-6 pt-5 lg:px-7">
                <div className="flex flex-col gap-1">
                  <p className="font-display text-h3 font-semibold text-ink">
                    {t(step.price)}
                  </p>
                  <p className="text-sm leading-snug text-muted">
                    {t(step.priceNote)}
                  </p>
                </div>
              </div>
              <div className="px-6 pt-6 pb-6 lg:px-7">
                <Link
                  href={designedHref("/en/contact")}
                  className="btn-secondary w-full justify-center"
                >
                  {t(step.cta)}
                  <span className="sr-only">{t(step.ctaSr)}</span>
                </Link>
              </div>
              <ul className="space-y-2.5 border-t border-line px-6 pt-5 pb-6 text-data text-ink lg:px-7">
                {step.bullets.map((k) => (
                  <li key={k} className="flex gap-2.5">
                    <Check />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
