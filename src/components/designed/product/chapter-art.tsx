/**
 * The pictures on Return Verification and Promotion Audit (owner's mockup, 26 Oct 2026: hero A, sections C).
 *
 * Two kinds. The hero panel and the chain chart are markup, because their labels are words a reader
 * needs and must localise; their words come from each page's content module (`art`). The step and
 * chapter drawings are inline SVG with no text and no figures, painted from the theme tokens, like
 * the gains pictures in `gains.tsx` (ODIN design/IMAGE-PLAN.md, "data gets drawn").
 *
 * Nothing here is measured. Every panel carries the page's "Illustration" badge, bar lengths are
 * shapes rather than values, and no number appears (ODIN hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9).
 */
import type { ReactNode } from "react";

export interface ReturnsArtText {
  note: string;
  heading: string;
  missing: string;
  setAside: string;
  /** Three reasons a listing fact could have prevented, then two it could not. */
  reasons: [string, string, string, string, string];
  /** The fact each of the first three reasons names. */
  facts: [string, string, string];
  yours: string;
  notYours: string;
  rate: string;
}

export interface PromotionsArtText {
  note: string;
  heading: string;
  /** No offer first, then voucher, price cut, free shipping, listing repair. */
  offers: [string, string, string, string, string];
  beats: string;
  test: string;
  nothing: string;
  baseline: string;
  orders: string;
  failed: string;
  returned: string;
  kept: string;
}

const Icon = ({
  id,
  className = "size-3.5",
}: {
  id: string;
  className?: string;
}) => (
  <svg className={`shrink-0 ${className}`} aria-hidden="true">
    <use href={`#i-${id}`} />
  </svg>
);

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

/** Return reasons read for the fact they name; the ones no listing could fix are set aside. */
export function ReturnsReport({ l }: { l: ReturnsArtText }) {
  return (
    <Panel heading={l.heading} note={l.note}>
      <ul>
        {l.reasons.map((reason, i) => (
          <li
            key={reason}
            className={`grid gap-1.5 border-b border-line py-3 text-data last:border-b-0 @md:grid-cols-2 @md:items-center @md:gap-4 ${i < 3 ? "text-ink" : "text-muted"}`}
          >
            <span>{reason}</span>
            <span className="flex items-center gap-3">
              <Icon
                id="arrow-right"
                className="hidden size-4 text-line-control @md:block"
              />
              {i < 3 ? (
                <span className="missing-flag">
                  {l.facts[i]} · {l.missing}
                </span>
              ) : (
                <span className="badge border-line bg-surface-1 text-muted">
                  {l.setAside}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <Swatch className="bg-chart-missing" />
          {l.yours}
        </span>
        <span className="inline-flex items-center gap-2">
          <Swatch className="bg-chart-baseline" />
          {l.notYours}
        </span>
      </div>
    </Panel>
  );
}

/**
 * Each offer's range against doing nothing (the dashed line). Recommended only when the cautious
 * end of the range still clears the line; one that straddles it is a test, one below it is not
 * worth giving. The positions are shapes, not results.
 */
const OFFER_RANGES: [number, number, "test" | "nothing" | "beats"][] = [
  [28, 55, "test"],
  [12, 34, "nothing"],
  [46, 72, "beats"],
  [52, 84, "beats"],
];

function Track({ range }: { range?: [number, number, string] }) {
  const fill =
    range?.[2] === "beats"
      ? "fill-chart-main"
      : range?.[2] === "test"
        ? "fill-chart-second"
        : "fill-chart-baseline";
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="h-5 w-full"
      aria-hidden="true"
    >
      <line
        x1="40"
        x2="40"
        y1="0"
        y2="20"
        className="stroke-chart-baseline"
        strokeWidth="2"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
      />
      {range ? (
        <rect
          x={range[0]}
          y="6"
          width={range[1] - range[0]}
          height="8"
          rx="2"
          className={fill}
        />
      ) : (
        <rect
          x="39"
          y="4"
          width="2"
          height="12"
          className="fill-chart-baseline"
        />
      )}
    </svg>
  );
}

export function PromotionsReport({ l }: { l: PromotionsArtText }) {
  const chip = {
    beats: (
      <span className="badge-primary">
        <Icon id="check" />
        {l.beats}
      </span>
    ),
    test: (
      <span className="badge-warning">
        <Icon id="flask" />
        {l.test}
      </span>
    ),
    nothing: (
      <span className="badge border-line bg-surface-1 text-muted">
        {l.nothing}
      </span>
    ),
  };
  return (
    <Panel heading={l.heading} note={l.note}>
      <ul>
        {l.offers.map((offer, i) => {
          const range = OFFER_RANGES[i - 1];
          return (
            <li
              key={offer}
              className="grid grid-cols-12 items-center gap-x-3 gap-y-2 border-b border-line py-3 text-data text-ink last:border-b-0"
            >
              <span className="col-span-7 @md:col-span-3">{offer}</span>
              <span className="col-span-5 justify-self-end text-right @md:order-last @md:col-span-4">
                {range && chip[range[2]]}
              </span>
              <span className="col-span-12 @md:col-span-5">
                <Track range={range} />
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span
            className="h-3 border-l-2 border-dashed border-chart-baseline"
            aria-hidden="true"
          />
          {l.baseline}
        </span>
      </div>
    </Panel>
  );
}

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
      t: l.reasons[3],
    },
    {
      w: 22,
      c: "fill-chart-baseline/55",
      s: "bg-chart-baseline/55",
      t: l.reasons[4],
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
    <Panel heading={l.offers[1]} note={l.note}>
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

/* ---------- drawings: no text, no figures ---------- */

const Drawing = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 240 160"
    aria-hidden="true"
    className="illo-lift w-5/6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

/** A spreadsheet: a header band and rows of cells, one of them missing when `gapRow` is set. */
function Sheet({
  x,
  y,
  w,
  rows,
  gapRow,
}: {
  x: number;
  y: number;
  w: number;
  rows: number;
  gapRow?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={22 + rows * 18}
        rx="10"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      <rect
        x={x + 1}
        y={y + 1}
        width={w - 2}
        height="19"
        rx="9"
        className="fill-surface-1"
      />
      {Array.from({ length: rows }, (_, i) => {
        const yy = y + 30 + i * 18;
        return (
          <g key={i}>
            <rect
              x={x + 10}
              y={yy}
              width={w * 0.28}
              height="6"
              rx="3"
              className="fill-surface-1"
            />
            <rect
              x={x + 14 + w * 0.3}
              y={yy}
              width={w * 0.22}
              height="6"
              rx="3"
              className="fill-primary-tint"
            />
            {gapRow === i ? (
              <rect
                x={x + w * 0.6}
                y={yy - 4}
                width={w * 0.32}
                height="14"
                rx="4"
                className="fill-gap-fill stroke-gap-strong"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            ) : (
              <rect
                x={x + w * 0.62}
                y={yy}
                width={w * 0.26}
                height="6"
                rx="3"
                className="fill-surface-1"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

const Download = () => (
  <g>
    <circle cx="200" cy="30" r="16" className="fill-primary" />
    <path
      d="M200 22v14M193 30l7 7 7-7"
      className="fill-none stroke-on-primary"
      strokeWidth="2.5"
    />
  </g>
);

/** Two lines moving together until a repair, then one of them falls away. */
const Diverge = () => (
  <>
    <rect
      x="16"
      y="16"
      width="208"
      height="128"
      rx="12"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    <path d="M34 120h172" className="stroke-line" strokeWidth="1.5" />
    <path
      d="M128 32v88"
      className="stroke-baseline"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    <path
      d="M34 70l23-6 23 8 24-6 24 4 24-2 26 4 26 2"
      className="fill-none stroke-baseline"
      strokeWidth="3"
    />
    <path
      d="M34 76l23-6 23 8 24-6 24 4 24 18 26 10 26 8"
      className="fill-none stroke-primary"
      strokeWidth="3"
    />
    <circle cx="128" cy="78" r="6" className="fill-primary" />
  </>
);

export const RETURNS_ART = {
  /** Returns, sorted into the ones a listing could have prevented and the ones it could not. */
  situation: (
    <Drawing>
      {[
        [96, 14],
        [114, 9],
        [132, 16],
        [105, 30],
        [123, 28],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="16"
          height="13"
          rx="3"
          className={i % 2 ? "fill-baseline" : "fill-primary"}
        />
      ))}
      <path
        d="M120 50v12M120 62L68 86M120 62l52 24"
        className="fill-none stroke-line"
        strokeWidth="2.5"
      />
      <path
        d="M26 92h84l-7 46H33z"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      <path
        d="M130 92h84l-7 46h-70z"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={42 + i * 19}
          y="104"
          width="15"
          height="12"
          rx="3"
          className="fill-primary"
        />
      ))}
      {[0, 1].map((i) => (
        <rect
          key={i}
          x={153 + i * 22}
          y="104"
          width="15"
          height="12"
          rx="3"
          className="fill-baseline"
        />
      ))}
      <rect
        x="50"
        y="124"
        width="36"
        height="5"
        rx="2.5"
        className="fill-primary-tint"
      />
      <rect
        x="154"
        y="124"
        width="36"
        height="5"
        rx="2.5"
        className="fill-surface-1"
      />
    </Drawing>
  ),
  steps: [
    <Drawing key="export">
      <Sheet x={40} y={18} w={160} rows={6} />
      <rect
        x="150"
        y="44"
        width="40"
        height="106"
        rx="6"
        className="fill-none stroke-baseline"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M160 92l20 20M180 92l-20 20"
        className="stroke-baseline"
        strokeWidth="3"
      />
      <Download />
    </Drawing>,
    <Drawing key="join">
      <Sheet x={14} y={24} w={88} rows={5} />
      <Sheet x={138} y={24} w={88} rows={5} gapRow={2} />
      <path
        d="M102 57C120 57 120 93 138 93M102 75C120 75 120 75 138 75M102 111C120 111 120 93 138 93"
        className="fill-none stroke-primary"
        strokeWidth="2"
      />
      <circle cx="138" cy="93" r="4" className="fill-primary" />
    </Drawing>,
    <Drawing key="verify">
      <Diverge />
    </Drawing>,
  ],
};

export const PROMOTIONS_ART = {
  /** An offer's orders, with the returned and refused ones cut off the end. */
  situation: (
    <Drawing>
      <rect
        x="22"
        y="30"
        width="196"
        height="100"
        rx="12"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="50"
        width="160"
        height="20"
        rx="5"
        className="fill-primary/35"
      />
      <rect
        x="40"
        y="90"
        width="108"
        height="20"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="152"
        y="90"
        width="24"
        height="20"
        rx="5"
        className="fill-baseline"
      />
      <rect
        x="180"
        y="90"
        width="20"
        height="20"
        rx="5"
        className="fill-none stroke-baseline"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
    </Drawing>
  ),
  steps: [
    <Drawing key="export">
      <Sheet x={40} y={18} w={160} rows={6} />
      <Download />
    </Drawing>,
    <Drawing key="measure">
      <rect
        x="16"
        y="16"
        width="208"
        height="128"
        rx="12"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      <path
        d="M104 30v100"
        className="stroke-baseline"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {(
        [
          [44, 60, 120, "fill-baseline"],
          [74, 118, 196, "fill-primary"],
          [104, 84, 150, "fill-sky"],
        ] as const
      ).map(([y, a, b, c]) => (
        <g key={y}>
          <rect
            x="30"
            y={y - 3}
            width="24"
            height="6"
            rx="3"
            className="fill-surface-1"
          />
          <rect
            x={a}
            y={y - 5}
            width={b - a}
            height="10"
            rx="5"
            className={c}
          />
        </g>
      ))}
    </Drawing>,
    <Drawing key="test">
      <rect
        x="16"
        y="16"
        width="208"
        height="128"
        rx="12"
        className="fill-card stroke-line"
        strokeWidth="1.5"
      />
      <path
        d="M120 30v100"
        className="stroke-line"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <circle
            cx={44 + (i % 4) * 15}
            cy={56 + Math.floor(i / 4) * 20}
            r="5"
            className="fill-baseline"
          />
          <circle
            cx={152 + (i % 4) * 15}
            cy={56 + Math.floor(i / 4) * 20}
            r="5"
            className="fill-primary"
          />
        </g>
      ))}
    </Drawing>,
  ],
};
