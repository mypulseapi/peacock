/**
 * The drawing on each Research card (owner's pick, version 1 of five, 28 Oct 2026), standing in until
 * the owner's generated pictures arrive. Each is drawn from its finding's own numbers in
 * `content/pages/research.ts`: 162 of 216 against 2 of 32, 52.6%, 216 to 94 to 5, the four misread
 * shares, 17 of 36 readings, 4 built and 2 not.
 *
 * A measured finding is drawn solid on `surface-1`; one waiting on a first merchant is drawn in dashed
 * outline on a dashed frame, so the status reads before the badge does. No words or figures inside:
 * the card carries them, in both languages. Decorative, so `aria-hidden`.
 */
import type { ReactNode } from "react";
import type { FigureKey } from "@/content/pages/research";

const DASH = "5 4";

const Bar = ({
  x,
  y,
  w,
  h,
  className,
  rx = 6,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className: string;
  rx?: number;
  dashed?: boolean;
}) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={rx}
    className={className}
    strokeDasharray={dashed ? DASH : undefined}
  />
);

/** Processor: missing on 162 of 216 products, asked for by 2 of 32 stated requirements. */
function Audit() {
  const track = 280;
  const rows = [
    { share: 162 / 216, fill: "fill-chart-missing" },
    { share: 2 / 32, fill: "fill-chart-main" },
  ];
  return (
    <>
      {rows.map(({ share, fill }, i) => {
        const y = 58 + i * 58;
        return (
          <g key={fill}>
            <Bar x={84} y={y} w={track} h={26} rx={13} className="fill-line" />
            <Bar
              x={84}
              y={y}
              w={Math.max(track * share, 26)}
              h={26}
              rx={13}
              className={fill}
            />
          </g>
        );
      })}
      <Bar
        x={40}
        y={58}
        w={26}
        h={26}
        className="fill-none stroke-gap-strong"
        dashed
      />
      <path
        d="M40 120 h26 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-14 l-7 6 v-6 h-5 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4z"
        className="fill-primary-tint stroke-primary"
      />
    </>
  );
}

/** 52.6% of recorded values repeat the photograph: 53 of 100 cells. */
function Photographs() {
  const filled = Math.round(52.6);
  return (
    <>
      <Bar
        x={36}
        y={40}
        w={130}
        h={120}
        rx={10}
        className="fill-card stroke-line"
      />
      <circle cx={132} cy={72} r={12} className="fill-sky" />
      <path
        d="M44 152 l40 -48 l28 30 l18 -18 l28 36z"
        className="fill-primary-tint"
      />
      {Array.from({ length: 100 }, (_, i) => (
        <Bar
          key={i}
          x={206 + (i % 10) * 16}
          y={40 + Math.floor(i / 10) * 12}
          w={12}
          h={9}
          rx={2}
          className={i < filled ? "fill-sky" : "fill-line"}
        />
      ))}
    </>
  );
}

/** 216 products; about 94 left by knowing the shopper, 5 by knowing the products. */
function Bits() {
  const rows = 9;
  return (
    <>
      {Array.from({ length: 216 }, (_, i) => {
        const left = 216 - i;
        return (
          <circle
            key={i}
            cx={38 + Math.floor(i / rows) * 14.1}
            cy={44 + (i % rows) * 14}
            r={4.6}
            className={
              left <= 5
                ? "fill-chart-main"
                : left <= 94
                  ? "fill-sky"
                  : "fill-line"
            }
          />
        );
      })}
    </>
  );
}

/** Misread before the fix, 29, 94, 78 and 34%, as ghost bars; none after, the line at zero. */
function Parser() {
  return (
    <>
      <line x1={40} y1={166} x2={360} y2={166} className="stroke-line" />
      {[29, 94, 78, 34].map((v, i) => {
        const x = 62 + i * 76;
        const h = (130 * v) / 100;
        return (
          <g key={v}>
            <Bar
              x={x}
              y={166 - h}
              w={40}
              h={h}
              className="fill-baseline/20 stroke-baseline"
              dashed
            />
            <Bar
              x={x - 4}
              y={163}
              w={48}
              h={6}
              rx={3}
              className="fill-chart-main"
            />
          </g>
        );
      })}
    </>
  );
}

/** A strip and a grid, not yet ranked on a merchant's traffic. */
function StripGrid() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Bar
          key={`s${i}`}
          x={40 + i * 66}
          y={30}
          w={56}
          h={40}
          className="fill-none stroke-line-control"
          dashed
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <Bar
          key={`g${i}`}
          x={40 + (i % 3) * 110}
          y={86 + Math.floor(i / 3) * 46}
          w={100}
          h={38}
          className="fill-none stroke-line-control"
          dashed
        />
      ))}
    </>
  );
}

/** 9 listings by 4 facets: 17 of 36 readings missing from the fields, each found in the page text. */
function Prose() {
  // (k * 11) % 36 runs through 0..35 once, so exactly 17 cells fall below 17, spread over the grid.
  const missing = (k: number) => (k * 11) % 36 < 17;
  return (
    <>
      {Array.from({ length: 36 }, (_, k) => {
        const x = 40 + (k % 4) * 34;
        const y = 30 + Math.floor(k / 4) * 16;
        return missing(k) ? (
          <g key={k}>
            <rect
              x={x}
              y={y}
              width={28}
              height={12}
              rx={3}
              className="fill-gap-fill stroke-gap-strong"
              strokeDasharray="3 2"
            />
            <circle
              cx={x + 14}
              cy={y + 6}
              r={2.6}
              className="fill-chart-main"
            />
          </g>
        ) : (
          <Bar
            key={k}
            x={x}
            y={y}
            w={28}
            h={12}
            rx={3}
            className="fill-primary-tint"
          />
        );
      })}
      <Bar
        x={206}
        y={30}
        w={154}
        h={140}
        rx={10}
        className="fill-card stroke-line"
      />
      {[120, 96, 128, 84, 116, 104, 90, 122].map((w, i) => (
        <Bar
          key={i}
          x={220}
          y={46 + i * 15}
          w={w}
          h={6}
          rx={3}
          className="fill-line"
        />
      ))}
      {[
        [1, 236, 34],
        [3, 270, 26],
        [5, 226, 40],
        [6, 288, 22],
      ].map(([i, x, w]) => (
        <Bar
          key={i}
          x={x}
          y={44 + i * 15}
          w={w}
          h={10}
          rx={3}
          className="fill-primary-tint stroke-primary"
        />
      ))}
    </>
  );
}

const outline = "fill-none stroke-line-control";

/** A price cut, a voucher and free shipping, not yet judged on a real seller's orders. */
function Promotion() {
  return (
    <>
      <path
        d="M48 70 h80 l30 30 l-30 30 h-80z"
        className={outline}
        strokeDasharray={DASH}
      />
      <circle cx={66} cy={100} r={6} className={outline} />
      <path
        d="M180 60 h90 v28 a12 12 0 0 0 0 24 v28 h-90 v-28 a12 12 0 0 0 0 -24z"
        className={outline}
        strokeDasharray={DASH}
      />
      <path
        d="M298 92 h40 l16 18 v26 h-56z M298 92 v44"
        className={outline}
        strokeDasharray={DASH}
      />
      <circle
        cx={312}
        cy={140}
        r={8}
        className="fill-card stroke-line-control"
      />
      <circle
        cx={342}
        cy={140}
        r={8}
        className="fill-card stroke-line-control"
      />
    </>
  );
}

/** A parcel coming back, not yet read on a merchant's returns. */
function Returns() {
  return (
    <>
      <path
        d="M110 70 l60 -24 l60 24 v70 l-60 24 l-60 -24z M110 70 l60 24 l60 -24 M170 94 v70"
        className={outline}
        strokeDasharray={DASH}
      />
      <path
        d="M250 120 c60 0 80 -60 40 -80"
        className={outline}
        strokeDasharray={DASH}
      />
      <path d="M282 34 l12 6 l-8 12" className={outline} />
    </>
  );
}

/** The audit's measurement, run again and again, not yet on a repaired catalogue. */
function Rerun() {
  return (
    <>
      <line
        x1={40}
        y1={160}
        x2={360}
        y2={160}
        className="stroke-line-control"
        strokeDasharray={DASH}
      />
      {Array.from({ length: 4 }, (_, i) => {
        const x = 48 + i * 82;
        return (
          <g key={i}>
            <Bar x={x} y={50} w={64} h={90} rx={8} className={outline} dashed />
            {[40, 30, 22].map((w, j) => (
              <Bar
                key={w}
                x={x + 10}
                y={66 + j * 20}
                w={w}
                h={8}
                rx={3}
                className="fill-line"
              />
            ))}
            <circle
              cx={x + 32}
              cy={160}
              r={5}
              className="fill-card stroke-line-control"
            />
          </g>
        );
      })}
    </>
  );
}

/** Four things built, two named as not built. */
function Studio() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const x = 64 + (i % 3) * 96;
        const y = 36 + Math.floor(i / 3) * 68;
        return i < 4 ? (
          <g key={i}>
            <Bar
              x={x}
              y={y}
              w={80}
              h={56}
              rx={8}
              className="fill-primary-tint stroke-primary"
            />
            <Bar
              x={x + 12}
              y={y + 14}
              w={36}
              h={7}
              rx={3}
              className="fill-chart-main"
            />
            <Bar
              x={x + 12}
              y={y + 30}
              w={52}
              h={6}
              rx={3}
              className="fill-line"
            />
          </g>
        ) : (
          <Bar
            key={i}
            x={x}
            y={y}
            w={80}
            h={56}
            rx={8}
            className={outline}
            dashed
          />
        );
      })}
    </>
  );
}

/** Open code: the SDK, the MCP server and the examples available, three formats planned. */
function Opensource() {
  return (
    <>
      <path
        d="M70 40 q-22 0 -22 22 v20 q0 18 -16 18 q16 0 16 18 v20 q0 22 22 22"
        className="fill-none stroke-primary"
        strokeWidth={4}
      />
      <path
        d="M330 40 q22 0 22 22 v20 q0 18 16 18 q-16 0 -16 18 v20 q0 22 -22 22"
        className="fill-none stroke-primary"
        strokeWidth={4}
      />
      {Array.from({ length: 6 }, (_, i) => {
        const x = 92 + (i % 3) * 76;
        const y = 52 + Math.floor(i / 3) * 54;
        return i < 3 ? (
          <Bar
            key={i}
            x={x}
            y={y}
            w={64}
            h={42}
            rx={8}
            className="fill-primary-tint stroke-primary"
          />
        ) : (
          <Bar
            key={i}
            x={x}
            y={y}
            w={64}
            h={42}
            rx={8}
            className={outline}
            dashed
          />
        );
      })}
    </>
  );
}

const FIGURES: Record<FigureKey, () => ReactNode> = {
  audit: Audit,
  photographs: Photographs,
  bits: Bits,
  parser: Parser,
  "strip-grid": StripGrid,
  prose: Prose,
  promotion: Promotion,
  returns: Returns,
  rerun: Rerun,
  studio: Studio,
  opensource: Opensource,
};

export function ResearchFigure({
  figure,
  waiting,
}: {
  figure: FigureKey;
  waiting: boolean;
}) {
  const Drawing = FIGURES[figure];
  return (
    <div
      className={`aspect-2/1 overflow-hidden rounded-2xl ${waiting ? "border border-dashed border-line-control" : "bg-surface-1"}`}
    >
      <svg
        viewBox="0 0 400 200"
        className="size-full"
        aria-hidden="true"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Drawing />
      </svg>
    </div>
  );
}
