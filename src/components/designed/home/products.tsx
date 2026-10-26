/**
 * The product line, in the order it is sold. Not from the designer's index.html: added 2026-10-25
 * because the home page linked to no product at all, and a merchant new to Pulse (Vietnam is a
 * new market) should see everything on offer without opening the menu.
 *
 * The Decision Audit is the product; the other three act on what it finds, so it gets the wide
 * card and they share the row below. Names and blurbs match the header menu (shell 3 to 10).
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
  return (
    <section id="products" className="scroll-mt-16 border-b border-line">
      <div className="frame py-20 lg:py-28">
        <h2 className="reveal text-title text-balance text-ink">
          {t("title")}
        </h2>
        <Link
          href={designedHref("/en/product/decision-audit")}
          className="reveal mt-12 block rounded-2xl border border-line bg-card p-6 shadow-sm transition-colors duration-150 ease-out-soft hover:bg-surface-1 lg:mt-16 lg:p-10"
        >
          <span className="flex flex-wrap items-center gap-3 text-h2 text-ink">
            {t("auditName")}
            <span className="badge-primary">{t("auditTag")}</span>
          </span>
          <span className="mt-4 block max-w-3xl text-body text-pretty text-ink">
            {t("auditBlurb")}
          </span>
          <span className="mt-2 block max-w-3xl text-pretty text-muted">
            {t("auditMore")}
          </span>
          <span className="mt-6 inline-block font-semibold text-primary">
            {t("auditCta")}
          </span>
        </Link>
        <ProductGrid items={OFFERINGS} t={t} />
        <h3 className="reveal mt-16 text-h2 text-balance text-ink">
          {t("storefrontTitle")}
        </h3>
        <ProductGrid items={STOREFRONT} t={t} />
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
            className="block h-full rounded-2xl border border-line bg-card p-6 shadow-sm transition-colors duration-150 ease-out-soft hover:bg-surface-1"
          >
            <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
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
