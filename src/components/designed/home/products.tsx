/**
 * The product line, in the order it is sold. Not from the designer's index.html: added 2026-10-25
 * because the home page linked to no product at all, and a merchant new to Pulse (Vietnam is a
 * new market) should see everything on offer without opening the menu.
 *
 * The Decision Audit is the product; the other three act on what it finds, so it gets the wide
 * card and they share the row below. Names and blurbs match the header menu (shell 3 to 10).
 *
 * 2026-10-26, from the Impeccable critique: the audit card was distinct by size alone and only
 * described the output. It now sits on the primary wash with the About page's example ranking
 * (same numbers, same "Example data" label, nothing new claimed). Requesting the audit stays the
 * header's and the closing band's job, so the card has one action: read about it.
 * The storefront tier is a plain list rather than five more cards, so it reads as "later" and
 * stops competing with the one product a new merchant should start with.
 */
import Link from "next/link";
import { designedHref, designedText } from "../t";

const OFFERINGS = [
  {
    href: "/en/product/decision-verification",
    name: "verifyName",
    blurb: "verifyBlurb",
  },
  {
    href: "/en/product/decision-monitor",
    name: "monitorName",
    blurb: "monitorBlurb",
    tag: "monitorTag",
  },
  {
    href: "/en/product/return-verification",
    name: "returnsName",
    blurb: "returnsBlurb",
  },
];

// The storefront products, the menu's third column, after the catalogue tools.
const STOREFRONT = [
  { href: "/en/product/decision-api", name: "apiName", blurb: "apiBlurb" },
  { href: "/en/product/search", name: "searchName", blurb: "searchBlurb" },
  { href: "/en/product/recommendations", name: "recsName", blurb: "recsBlurb" },
  { href: "/en/product/pages", name: "pagesName", blurb: "pagesBlurb" },
  {
    href: "/en/product/merchandising-studio",
    name: "studioName",
    blurb: "studioBlurb",
  },
];

export function ProductsSection() {
  const t = designedText("home.products");
  const example = [1, 2, 3, 4].map((n) => ({
    name: t(`ex${n}Name`),
    need: t(`ex${n}Need`),
    missing: t(`ex${n}Missing`),
  }));
  return (
    <section id="products" className="scroll-mt-16 border-b border-line">
      <div className="frame py-20 lg:py-28">
        <h2 className="reveal text-title text-balance text-ink">
          {t("title")}
        </h2>
        <div className="reveal mt-12 lg:mt-16">
          <article className="grid gap-8 rounded-2xl border border-primary-line bg-primary-wash p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <h3 className="flex flex-wrap items-center gap-3 text-h2 text-ink">
                {t("auditName")}
                {/* No pill: on the wash a bordered badge read as a second card; the tag is just a label. */}
                <span className="text-sm font-semibold text-primary">{t("auditTag")}</span>
              </h3>
              <p className="mt-4 max-w-2xl text-body text-pretty text-ink">
                {t("auditBlurb")}
              </p>
              <p className="mt-2 max-w-2xl text-pretty text-muted">
                {t("auditMore")}
              </p>
              <p className="mt-6 text-sm font-medium tabular-nums text-ink">
                {t("facts")}
              </p>
              <Link
                href={designedHref("/en/product/decision-audit")}
                className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline"
              >
                {t("auditCta")}
              </Link>
            </div>
            <figure className="rounded-xl border border-line bg-card p-5 shadow-sm">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold text-ink">{t("exampleTitle")}</p>
                <span className="shrink-0 text-xs text-muted">{t("exampleNote")}</span>
              </div>
              <ol className="mt-4 divide-y divide-line">
                {example.map((row, i) => (
                  <li key={row.name} className="flex items-center gap-3 py-2.5 text-sm">
                    <span className="w-4 shrink-0 tabular-nums text-muted">{i + 1}</span>
                    <span className="min-w-0 flex-1 font-medium text-ink">{row.name}</span>
                    <span className="shrink-0 tabular-nums text-ink">{row.need}</span>
                    {/* ponytail: the hero's flag, held still; its stripes only drift while a demo plays */}
                    <span className="missing-flag shrink-0 animate-none">
                      <svg className="size-3" aria-hidden="true">
                        <use href="#i-triangle-alert" />
                      </svg>
                      {row.missing}
                    </span>
                  </li>
                ))}
              </ol>
              <figcaption className="mt-4 text-sm text-pretty text-muted">
                {t("exampleCaption")}
              </figcaption>
            </figure>
          </article>
        </div>
        <ProductGrid items={OFFERINGS} t={t} />
        <h3 className="reveal mt-16 text-h2 text-balance text-ink">
          {t("storefrontTitle")}
        </h3>
        <ul className="reveal mt-6 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {STOREFRONT.map((o) => (
            <li key={o.href}>
              <Link
                href={designedHref(o.href)}
                className="group block rounded-md"
              >
                <span className="font-semibold text-ink underline-offset-4 group-hover:underline">
                  {t(o.name)}
                </span>
                <span className="mt-1 block text-sm text-pretty text-muted">
                  {t(o.blurb)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductGrid({
  items,
  t,
}: {
  items: { href: string; name: string; blurb: string; tag?: string }[];
  t: (key: string) => string;
}) {
  return (
    <ul className="mt-6 grid gap-6 md:grid-cols-3">
      {items.map((o) => (
        <li key={o.href} className="reveal">
          <Link
            href={designedHref(o.href)}
            className="group relative block h-full rounded-2xl border border-line bg-card p-6 shadow-sm transition-colors duration-150 ease-out-soft hover:bg-surface-1"
          >
            {/* Points out of the card at rest, turns to point along the reading line on hover. */}
            <svg
              className="absolute top-6 right-6 size-5 -rotate-45 text-muted transition-[rotate,translate,color] duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:rotate-0 group-hover:text-primary group-focus-visible:rotate-0 group-focus-visible:text-primary motion-reduce:transition-none"
              aria-hidden="true"
            >
              <use href="#i-arrow-right" />
            </svg>
            <span className="flex flex-wrap items-center gap-2 pr-8 font-semibold text-ink">
              {t(o.name)}
              {o.tag ? <span className="badge">{t(o.tag)}</span> : null}
            </span>
            <span className="mt-2 block text-sm text-pretty text-muted">
              {t(o.blurb)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
