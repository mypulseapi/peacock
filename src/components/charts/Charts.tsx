"use client";

import { C, EASE, type Tone } from "./tokens";
import { useInView, useCountUp } from "./useInView";

/**
 * Five chart forms, one per job.
 *
 * Bar for magnitude across categories, Dumbbell for a before-and-after on the
 * same measure, Waffle for a proportion of a whole, Trend for change over time,
 * and Figure for a single headline number that is not a chart at all.
 *
 * Shared rules, applied here rather than per chart so they cannot drift:
 * thin marks, recessive grid, a direct label on every mark so identity is never
 * colour alone, a caption naming the source, and a <table> behind a details
 * element so the numbers are reachable without reading a picture. Everything
 * animates on first scroll into view and renders at final state under reduced
 * motion. One axis only; there are no dual-scale charts here.
 */

function Shell({
  title, source, note, children, table,
}: {
  title: string;
  source: string;
  note?: string;
  children: React.ReactNode;
  table: { head: string[]; rows: (string | number)[][] };
}) {
  return (
    <figure className="ed-raise my-12 rounded-2xl border border-[color:var(--ed-line)] p-6 sm:p-8">
      <figcaption className="mb-7">
        <p className="text-[1.0625rem] leading-snug font-bold" style={{ color: C.ink }}>{title}</p>
        <cite className="mt-1.5 block text-[0.8125rem] not-italic" style={{ color: C.mute }}>{source}</cite>
      </figcaption>

      {children}

      {note && <p className="mt-6 text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{note}</p>}

      <details className="mt-6">
        <summary className="cursor-pointer text-[0.8125rem] font-semibold" style={{ color: C.mid }}>
          View as table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-[0.8125rem]">
            <thead>
              <tr>{table.head.map((h) => (
                <th key={h} scope="col" className="border-b py-2 pr-4 font-semibold" style={{ borderColor: C.grid, color: C.mid }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) => (
                    <td key={j} className="border-b py-2 pr-4" style={{ borderColor: C.grid, color: j === 0 ? C.ink : C.mid }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

export interface BarDatum { label: string; value: number; tone?: Tone; suffix?: string; icon?: string }

/** Magnitude across categories. Horizontal, because category names are words. */
export function BarChart({
  title, source, note, data, max, suffix = "%",
}: { title: string; source: string; note?: string; data: BarDatum[]; max?: number; suffix?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const top = max ?? Math.max(...data.map((d) => d.value));
  return (
    <Shell title={title} source={source} note={note}
           table={{ head: ["", "Value"], rows: data.map((d) => [d.label, `${d.value}${d.suffix ?? suffix}`]) }}>
      <div ref={ref} className="space-y-3.5">
        {data.map((d, i) => {
          const hue = C[d.tone ?? "base"];
          return (
            <div key={d.label} className="grid grid-cols-[minmax(7rem,11rem)_1fr_auto] items-center gap-3 sm:gap-4">
              <span className="flex min-w-0 items-center gap-2 text-[0.875rem] font-medium" style={{ color: C.ink }}>
                {d.icon && (
                  /*
                   * The mark, drawn with the label's own colour.
                   *
                   * A mask rather than an `<img>`: the source is black line art on transparent, so
                   * as an image it would stay black whatever the theme and vanish on the dark one.
                   * Masked, `currentColor` means it is always exactly as dark as the word beside
                   * it, in either theme, with no second file.
                   */
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    style={{
                      backgroundColor: "currentColor",
                      maskImage: `url(${d.icon})`,
                      WebkitMaskImage: `url(${d.icon})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                )}
                <span className="truncate">{d.label}</span>
              </span>
              <span className="h-3 overflow-hidden rounded-full" style={{ background: C.baseBg }}>
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: shown ? `${(d.value / top) * 100}%` : "0%",
                    background: hue,
                    transition: `width 900ms ${EASE}`,
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </span>
              <span className="ed-num w-14 text-right text-[0.875rem] font-bold" style={{ color: hue }}>
                {d.value}{d.suffix ?? suffix}
              </span>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/** A before and an after on one measure. The line between them is the story. */
export function Dumbbell({
  title, source, note, rows, suffix = "%", beforeLabel = "Before", afterLabel = "After",
}: {
  title: string; source: string; note?: string; suffix?: string;
  beforeLabel?: string; afterLabel?: string;
  rows: { label: string; before: number; after: number }[];
}) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const lo = Math.min(...rows.flatMap((r) => [r.before, r.after]));
  const hi = Math.max(...rows.flatMap((r) => [r.before, r.after]));
  const span = hi - lo || 1;
  const pos = (v: number) => ((v - lo) / span) * 88 + 6; // 6% padding each end

  return (
    <Shell title={title} source={source} note={note}
           table={{ head: ["", beforeLabel, afterLabel],
                    rows: rows.map((r) => [r.label, `${r.before}${suffix}`, `${r.after}${suffix}`]) }}>
      <div className="mb-5 flex flex-wrap items-center gap-5 text-[0.8125rem]" style={{ color: C.mid }}>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: C.hold }} aria-hidden />{beforeLabel}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: C.good }} aria-hidden />{afterLabel}
        </span>
      </div>

      <div ref={ref} className="space-y-5">
        {rows.map((r, i) => {
          const a = pos(r.before), b = pos(r.after);
          const left = Math.min(a, b), width = Math.abs(b - a);
          return (
            <div key={r.label}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-[0.875rem] font-medium" style={{ color: C.ink }}>{r.label}</span>
                <span className="ed-num text-[0.8125rem]" style={{ color: C.mute }}>
                  {r.before}{suffix} <span aria-hidden>&rarr;</span>{" "}
                  <span className="font-bold" style={{ color: C.good }}>{r.after}{suffix}</span>
                </span>
              </div>
              <div className="relative h-5">
                <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2" style={{ background: C.grid }} aria-hidden />
                <span
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${left}%`,
                    width: shown ? `${width}%` : "0%",
                    background: C.good,
                    transition: `width 800ms ${EASE}`,
                    transitionDelay: `${i * 110 + 150}ms`,
                  }}
                  aria-hidden
                />
                <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
                      style={{ left: `${a}%`, background: C.hold, ...({ "--tw-ring-color": "#fff" } as React.CSSProperties) }} aria-hidden />
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
                  style={{
                    left: shown ? `${b}%` : `${a}%`,
                    background: C.good,
                    transition: `left 800ms ${EASE}`,
                    transitionDelay: `${i * 110 + 150}ms`,
                    ...({ "--tw-ring-color": "#fff" } as React.CSSProperties),
                  }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/** A proportion of a whole, as squares. Reads faster than a pie at any size. */
export function Waffle({
  title, source, note, percent, label, rest, tone = "warn", cells = 100,
}: {
  title: string; source: string; note?: string; percent: number;
  label: string; rest: string; tone?: Tone; cells?: number;
}) {
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const num = useCountUp(percent, shown, reduced);
  const filled = Math.round((percent / 100) * cells);
  const hue = C[tone];
  return (
    <Shell title={title} source={source} note={note}
           table={{ head: ["", "Share"], rows: [[label, `${percent}%`], [rest, `${100 - percent}%`]] }}>
      <div ref={ref} className="flex flex-col gap-7 sm:flex-row sm:items-center">
        <div
          className="grid max-w-[15rem] flex-1 gap-[3px]"
          style={{ gridTemplateColumns: "repeat(10, minmax(0,1fr))" }}
          role="img"
          aria-label={`${percent}% ${label}, ${100 - percent}% ${rest}`}
        >
          {Array.from({ length: cells }, (_, i) => (
            <span
              key={i}
              className="aspect-square rounded-[2px]"
              style={{
                background: shown && i < filled ? hue : C.baseBg,
                transition: `background-color 320ms ${EASE}`,
                transitionDelay: `${(i % 10) * 14 + Math.floor(i / 10) * 36}ms`,
              }}
            />
          ))}
        </div>
        <div className="sm:w-[16rem]">
          <span className="ed-num block text-[3rem] leading-none font-bold" style={{ color: hue }}>
            <span ref={num}>{percent}</span>%
          </span>
          <span className="mt-3 block text-[0.9375rem] leading-snug font-semibold" style={{ color: C.ink }}>{label}</span>
          <span className="mt-2 flex items-center gap-2 text-[0.8125rem]" style={{ color: C.mute }}>
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: C.baseBg }} aria-hidden />
            {rest}
          </span>
        </div>
      </div>
    </Shell>
  );
}

/** Change over time. One series, so no legend: the title names it. */
export function Trend({
  title, source, note, points, suffix = "", valueLabel,
}: {
  title: string; source: string; note?: string; suffix?: string; valueLabel?: string;
  points: { x: string; y: number }[];
}) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const W = 560, H = 170, P = 8;
  const hi = Math.max(...points.map((p) => p.y));
  const lo = Math.min(0, ...points.map((p) => p.y));
  const span = hi - lo || 1;
  const px = (i: number) => P + (i / (points.length - 1)) * (W - P * 2);
  const py = (v: number) => H - P - ((v - lo) / span) * (H - P * 2);
  const d = points.map((p, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(p.y).toFixed(1)}`).join(" ");
  const last = points[points.length - 1];

  return (
    <Shell title={title} source={source} note={note}
           table={{ head: [valueLabel ?? "Period", "Value"], rows: points.map((p) => [p.x, `${p.y}${suffix}`]) }}>
      <div ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
             aria-label={`${title}. From ${points[0].y}${suffix} to ${last.y}${suffix}.`}>
          {[0, 0.5, 1].map((f) => (
            <line key={f} x1={P} x2={W - P} y1={P + f * (H - P * 2)} y2={P + f * (H - P * 2)}
                  stroke={C.grid} strokeWidth="1" />
          ))}
          <path
            d={d} fill="none" stroke={C.work} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              strokeDasharray: 2000,
              strokeDashoffset: shown ? 0 : 2000,
              transition: `stroke-dashoffset 1200ms ${EASE}`,
            }}
          />
          {points.map((p, i) => (
            <circle key={p.x} cx={px(i)} cy={py(p.y)} r="4.5" fill={C.work} stroke="#fff" strokeWidth="2"
                    style={{ opacity: shown ? 1 : 0, transition: `opacity 300ms ${EASE}`, transitionDelay: `${600 + i * 90}ms` }}>
              <title>{`${p.x}: ${p.y}${suffix}`}</title>
            </circle>
          ))}
        </svg>
        <div className="mt-3 flex justify-between text-[0.75rem]" style={{ color: C.mute }}>
          {points.map((p) => <span key={p.x} className="ed-num">{p.x}</span>)}
        </div>
      </div>
    </Shell>
  );
}

/** Not a chart. One number, when a number is the whole point. */
export function Figure({
  value, unit = "", label, source, tone = "work",
}: { value: number; unit?: string; label: string; source: string; tone?: Tone }) {
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const dp = value % 1 !== 0 ? 2 : 0;
  const num = useCountUp(value, shown, reduced, 900, dp);
  const hue = C[tone];
  return (
    <figure ref={ref} className="ed-raise my-10 rounded-2xl border border-[color:var(--ed-line)] p-7">
      <span className="ed-num block text-[3rem] leading-none font-bold" style={{ color: hue }}>
        <span ref={num}>{value.toFixed(dp)}</span>{unit}
      </span>
      <figcaption className="mt-4">
        <span className="block text-[0.9375rem] leading-snug font-medium" style={{ color: C.ink }}>{label}</span>
        <cite className="mt-2 block text-[0.8125rem] not-italic" style={{ color: C.mute }}>{source}</cite>
      </figcaption>
    </figure>
  );
}
