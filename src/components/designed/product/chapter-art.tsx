/**
 * The chain charts on Return Verification and Promotion Audit (owner's mockup, 26 Oct 2026: hero A,
 * sections C). They are markup, because their labels are words a reader needs and must localise;
 * their words come from each page's content module (`art`). The pages' other pictures are the
 * owner's generated ones (`product-pictures.tsx`, 28 Oct 2026), which replaced the drawings here.
 *
 * Nothing here is measured. Each chart carries the page's "Illustration" badge, bar lengths are
 * shapes rather than values, and no number appears (ODIN hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9).
 */
import type { ReactNode } from "react";

export interface ReturnsArtText {
  note: string;
  rate: string;
  /** Three facts a return reason can name, then two reasons no listing could fix. */
  facts: [string, string, string];
  others: [string, string];
}

export interface PromotionsArtText {
  note: string;
  voucher: string;
  orders: string;
  failed: string;
  returned: string;
  kept: string;
}

function Panel({
  heading,
  note,
  children,
}: {
  heading: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="@container p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <p className="text-h3 text-ink">{heading}</p>
        <span className="badge border-line bg-surface-1 text-muted">
          {note}
        </span>
      </div>
      {children}
    </div>
  );
}

const Swatch = ({ className }: { className: string }) => (
  <span
    className={`size-2.5 shrink-0 rounded-sm ${className}`}
    aria-hidden="true"
  />
);

/** One return rate, then the same returns split by the reason given. */
export function ReturnsChain({ l }: { l: ReturnsArtText }) {
  const segs = [
    { w: 22, c: "fill-chart-main", s: "bg-chart-main", t: l.facts[0] },
    { w: 16, c: "fill-chart-main/70", s: "bg-chart-main/70", t: l.facts[1] },
    { w: 12, c: "fill-chart-main/45", s: "bg-chart-main/45", t: l.facts[2] },
    {
      w: 28,
      c: "fill-chart-baseline",
      s: "bg-chart-baseline",
      t: l.others[0],
    },
    {
      w: 22,
      c: "fill-chart-baseline/55",
      s: "bg-chart-baseline/55",
      t: l.others[1],
    },
  ];
  let x = 0;
  return (
    <Panel heading={l.rate} note={l.note}>
      <div
        className="mt-4 h-10 rounded-lg border border-line bg-surface-1"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="mt-3 block h-10 w-full overflow-hidden rounded-lg"
        aria-hidden="true"
      >
        {segs.map((s) => {
          const r = (
            <rect
              key={s.t}
              x={x}
              y="0"
              width={s.w - 0.6}
              height="10"
              className={s.c}
            />
          );
          x += s.w;
          return r;
        })}
      </svg>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted @md:grid-cols-3">
        {segs.map((s) => (
          <li key={s.t} className="flex items-center gap-2">
            <Swatch className={s.s} />
            {s.t}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** The orders a voucher bought, less those refused at the door and those sent back. */
export function PromotionsChain({ l }: { l: PromotionsArtText }) {
  const rows: [string, number, number, string][] = [
    [l.orders, 0, 100, "fill-chart-main/35"],
    [l.failed, 80, 20, "fill-chart-baseline"],
    [l.returned, 62, 18, "fill-chart-baseline/60"],
    [l.kept, 0, 62, "fill-chart-main"],
  ];
  return (
    <Panel heading={l.voucher} note={l.note}>
      <ul className="mt-4 grid gap-3">
        {rows.map(([t, x, w, c]) => (
          <li
            key={t}
            className="grid grid-cols-12 items-center gap-3 text-data text-ink"
          >
            <span className="col-span-4">{t}</span>
            <svg
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              className="col-span-8 h-6 w-full"
              aria-hidden="true"
            >
              <rect x={x} y="0" width={w} height="10" rx="1.5" className={c} />
            </svg>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
