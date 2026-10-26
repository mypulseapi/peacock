/**
 * The product line, in the order it is sold. Not from the designer's index.html: added 2026-10-25
 * because the home page linked to no product at all, and a merchant new to Pulse (Vietnam is a
 * new market) should see everything on offer without opening the menu.
 *
 * The Decision Audit is the product; the other three act on what it finds, so it gets the wide
 * card and they stack beside it. Names and blurbs match the header menu (shell 3 to 10).
 *
 * 2026-10-26, from the Impeccable critique: the audit card was distinct by size alone and only
 * described the output. It now sits on the primary wash with the About page's example ranking
 * (same numbers, same "Example data" label, nothing new claimed). Requesting the audit stays the
 * header's and the closing band's job, so the card has one action: read about it. Since
 * 2026-10-26 that action is the whole card, as on the three beside it, and the "See the Decision
 * Audit" link under it is gone (owner's request).
 *
 * 2026-10-26, the owner's Direction A ("Pulse site directions" mockup, pin 4): a bento. The
 * "everything else follows" line leads the section beside the heading, the audit card takes 7 of
 * 12 columns with its ranking underneath, and the three follow-ons stack in the other 5, so the
 * row has no empty space. The storefront tier is one hairline-divided panel rather than five more
 * cards, so it still reads as "later". Icons come from the sprite only, one per product.
 */
import Link from "next/link";
import { designedHref, designedText } from "../t";

const OFFERINGS = [
  {
    href: "/en/product/decision-verification",
    name: "verifyName",
    blurb: "verifyBlurb",
    icon: "i-circle-check",
  },
  {
    href: "/en/product/decision-monitor",
    name: "monitorName",
    blurb: "monitorBlurb",
    tag: "monitorTag",
    icon: "i-bell-ring",
  },
  {
    href: "/en/product/return-verification",
    name: "returnsName",
    blurb: "returnsBlurb",
    icon: "i-compare",
  },
];

// The storefront products, the menu's third column, after the catalogue tools.
const STOREFRONT = [
  {
    href: "/en/product/decision-api",
    name: "apiName",
    blurb: "apiBlurb",
    icon: "i-terminal",
  },
  {
    href: "/en/product/search",
    name: "searchName",
    blurb: "searchBlurb",
    icon: "i-user-search",
  },
  {
    href: "/en/product/recommendations",
    name: "recsName",
    blurb: "recsBlurb",
    icon: "i-sparkles",
  },
  {
    href: "/en/product/pages",
    name: "pagesName",
    blurb: "pagesBlurb",
    icon: "i-file-text",
  },
  {
    href: "/en/product/merchandising-studio",
    name: "studioName",
    blurb: "studioBlurb",
    icon: "i-chart-pie",
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
        <div className="reveal grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 className="text-title text-balance text-ink lg:col-span-5">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-body text-pretty text-muted lg:col-span-7">
            {t("auditMore")}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          {/* The whole card is the link, like the three beside it. The anchor wraps only the name and
              its ::after covers the card, so a screen reader hears "Decision Audit" rather than the
              whole example ranking read out as one link name. The focus ring moves to that ::after;
              `outline-none!` is needed because globals.css styles `*:focus-visible` outside a layer,
              which no plain utility can override, and the name would get a second ring. */}
          <article className="group reveal relative flex flex-col rounded-2xl border border-primary-line bg-primary-wash p-6 transition-colors duration-150 ease-out-soft hover:border-primary lg:col-span-7 lg:p-10">
            {/* The arrow sits in the title row, centred on its first line (the 40px icon tile, so
                mt-2.5 for a 20px arrow), and stays there when the tag wraps on a phone. */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="flex flex-wrap items-center gap-3 text-h2 text-ink">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-card text-primary">
                  <svg className="size-5" aria-hidden="true">
                    <use href="#i-clipboard-check" />
                  </svg>
                </span>
                <Link
                  href={designedHref("/en/product/decision-audit")}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none! focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
                >
                  {t("auditName")}
                </Link>
                {/* No pill: on the wash a bordered badge read as a second card; the tag is just a label. */}
                <span className="text-sm font-semibold text-primary">
                  {t("auditTag")}
                </span>
              </h3>
              <svg
                className="mt-2.5 size-5 shrink-0 -rotate-45 text-muted transition-[rotate,translate,color] duration-200 ease-out-soft group-focus-within:rotate-0 group-focus-within:text-primary group-hover:translate-x-0.5 group-hover:rotate-0 group-hover:text-primary motion-reduce:transition-none"
                aria-hidden="true"
              >
                <use href="#i-arrow-right" />
              </svg>
            </div>
            <p className="mt-4 max-w-2xl text-body text-pretty text-ink">
              {t("auditBlurb")}
            </p>
            <figure className="mt-6 rounded-xl border border-line bg-card p-5 shadow-sm">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold text-ink">
                  {t("exampleTitle")}
                </p>
                <span className="shrink-0 text-xs text-muted">
                  {t("exampleNote")}
                </span>
              </div>
              <ol className="mt-4 divide-y divide-line">
                {example.map((row, i) => (
                  <li
                    key={row.name}
                    className="flex items-center gap-3 py-2.5 text-sm"
                  >
                    <span className="w-4 shrink-0 tabular-nums text-muted">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 font-medium text-ink">
                      {row.name}
                    </span>
                    <span className="shrink-0 tabular-nums text-ink">
                      {row.need}
                    </span>
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
            <p className="mt-6 text-sm font-medium tabular-nums text-ink">
              {t("facts")}
            </p>
          </article>
          <ProductGrid items={OFFERINGS} t={t} />
        </div>
        <h3 className="reveal mt-16 text-h2 text-balance text-ink">
          {t("storefrontTitle")}
        </h3>
        {/* Hairlines from a 1px gap over the line colour, so they stay right when the grid wraps.
            The fifth cell spans the row at two columns, or it would leave a line-coloured hole. */}
        <ul className="reveal mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {STOREFRONT.map((o) => (
            <li
              key={o.href}
              className="bg-card sm:last:col-span-2 lg:last:col-span-1"
            >
              <Link
                href={designedHref(o.href)}
                className="group flex h-full flex-col gap-3 p-6 transition-colors duration-150 ease-out-soft hover:bg-surface-1 focus-visible:-outline-offset-4"
              >
                <svg className="size-5 text-primary" aria-hidden="true">
                  <use href={`#${o.icon}`} />
                </svg>
                <span className="font-semibold text-ink underline-offset-4 group-hover:underline">
                  {t(o.name)}
                </span>
                <span className="text-sm text-pretty text-muted">
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
  items: {
    href: string;
    name: string;
    blurb: string;
    tag?: string;
    icon: string;
  }[];
  t: (key: string) => string;
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-3 lg:col-span-5 lg:auto-rows-fr lg:grid-cols-1">
      {items.map((o) => (
        <li key={o.href} className="reveal">
          <Link
            href={designedHref(o.href)}
            className="group relative flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-6 shadow-sm transition-colors duration-150 ease-out-soft hover:bg-surface-1"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-1 text-muted transition-colors duration-150 ease-out-soft group-hover:text-primary group-focus-visible:text-primary">
              <svg className="size-5" aria-hidden="true">
                <use href={`#${o.icon}`} />
              </svg>
            </span>
            {/* Centred in the card (owner, 26 Oct 2026): beside the tall audit card the three cards stretch to share its
                height, and top-aligned content left the space all below it. The arrow is in the title row, so it moves
                with the title. */}
            <span className="min-w-0 flex-1">
              <span className="flex items-start justify-between gap-3">
                <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  {t(o.name)}
                  {o.tag ? <span className="badge">{t(o.tag)}</span> : null}
                </span>
                {/* Points out of the card at rest, turns to point along the reading line on hover.
                    In the title row, centred on its first line (24px, so mt-0.5 for a 20px arrow). */}
                <svg
                  className="mt-0.5 size-5 shrink-0 -rotate-45 text-muted transition-[rotate,translate,color] duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:rotate-0 group-hover:text-primary group-focus-visible:rotate-0 group-focus-visible:text-primary motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <use href="#i-arrow-right" />
                </svg>
              </span>
              <span className="mt-2 block text-sm text-pretty text-muted">
                {t(o.blurb)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
