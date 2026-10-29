/**
 * The hero figure of the two solution pages, Cut Fixable Returns and Decide Which Promotions Pay, on
 * the product pages' template (`ChapterPage`, owner's pick B, 29 Oct 2026). Their step and gain
 * pictures are generated ones (`product/product-pictures.tsx`); only the hero is markup, because its
 * products are links and its words must localise.
 *
 * A solution is products in order, so the hero shows the merchant's own data above the products as
 * a numbered row, each a link to its product page. The words come from each page's content module
 * (`art`). Nothing in the panel is measured (ODIN hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9): it carries
 * the "Illustration" badge, and its bars are shapes rather than values.
 */
import type { CSSProperties, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { renderLocale } from "@/i18n/render-locale";

export interface ReturnsSolutionArt {
  note: string;
  returns: string;
  /** Three return reasons, each with the fact it names. */
  reasons: [string, string][];
  /** Two reasons no listing could fix. */
  others: [string, string];
  setAside: string;
}

export interface PromotionsSolutionArt {
  note: string;
  campaign: string;
  /** Voucher, price cut, free shipping. */
  offers: [string, string, string];
  kept: string;
  back: string;
}

const at = (i: number): CSSProperties => ({ "--i": i }) as CSSProperties;

const Swatch = ({ className }: { className: string }) => (
  <span className={`size-2.5 rounded-sm ${className}`} aria-hidden="true" />
);

function Heading({ title, badge }: { title: string; badge: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <span className="badge border-line bg-surface-1 text-muted">{badge}</span>
    </div>
  );
}

/** The hero: the merchant's data, then the products in order, each a link to its page. */
export function SolutionHero({
  panel,
  products,
  note,
}: {
  panel: ReactNode;
  products: { label: string; note: string; href: string }[];
  note?: string;
}) {
  const locale = renderLocale();
  return (
    <div className="rounded-2xl border border-line bg-card text-left">
      <div className="p-5 sm:p-6">{panel}</div>
      <ol
        className={`grid gap-3 border-t border-line p-4 sm:p-5 ${products.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {products.map((p, i) => (
          <li key={p.href} className="fig-item" style={at(i + 3)}>
            <Link
              locale={locale}
              href={p.href}
              className="group flex h-full gap-3 rounded-xl border border-line bg-surface-1 p-3 transition-colors duration-200 ease-out-soft hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold tabular-nums text-on-primary">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink group-hover:text-primary">
                  {p.label}
                </span>
                <span className="mt-0.5 block text-caption text-pretty text-muted">
                  {p.note}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {note && (
        <p className="border-t border-line px-5 py-3 text-caption text-pretty text-muted sm:px-6">
          {note}
        </p>
      )}
    </div>
  );
}

/** Cut Fixable Returns: each return reason with the fact it names, or set aside. */
export function ReturnsPanel({ l }: { l: ReturnsSolutionArt }) {
  const rows: [string, ReactNode][] = [
    ...l.reasons.map(([reason, fact]): [string, ReactNode] => [
      reason,
      <span key={fact} className="missing-flag">
        {fact}
      </span>,
    ]),
    ...l.others.map((o): [string, ReactNode] => [
      o,
      <span key={o} className="badge border-line bg-surface-1 text-muted">
        {l.setAside}
      </span>,
    ]),
  ];
  return (
    <>
      <Heading title={l.returns} badge={l.note} />
      <ul className="grid">
        {rows.map(([label, value], i) => (
          <li
            key={label}
            className="fig-item flex items-center justify-between gap-3 border-t border-line py-2.5 text-sm text-ink first:border-t-0"
            style={at(i)}
          >
            <span className="min-w-0">{label}</span>
            <span className="shrink-0">{value}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Decide Which Promotions Pay: each offer's orders, kept or come back. */
export function PromotionsPanel({ l }: { l: PromotionsSolutionArt }) {
  const kept = [55, 74, 40];
  return (
    <>
      <Heading title={l.campaign} badge={l.note} />
      <ul className="grid gap-3">
        {l.offers.map((o, i) => (
          <li
            key={o}
            className="fig-item grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-center gap-3 text-sm text-ink"
            style={at(i)}
          >
            {o}
            <span className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-surface-1">
              <span
                className="fig-bar block h-full rounded-full bg-primary"
                style={{ width: `${kept[i]}%`, ...at(i) }}
              />
              <span
                className="fig-bar block h-full rounded-full bg-gap"
                style={{ width: `${99 - kept[i]}%`, ...at(i + 1) }}
              />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
        <span className="flex items-center gap-2">
          <Swatch className="bg-primary" />
          {l.kept}
        </span>
        <span className="flex items-center gap-2">
          <Swatch className="bg-gap" />
          {l.back}
        </span>
      </p>
    </>
  );
}
