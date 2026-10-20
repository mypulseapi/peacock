"use client";

import type { LucideIcon } from "lucide-react";
import {
  Check, X, ArrowRight, Circle, AlertTriangle, Clock, Zap, UserRound,
  Laptop, Shirt, Footprints, Headphones, Sofa, Watch, Package,
} from "lucide-react";
import { useInView, useCountUp } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * A small kit of scene shapes, driven by data.
 *
 * Ten story pages had no picture at all. Writing thirty bespoke components
 * would have produced thirty things to maintain and, in practice, thirty
 * near-copies, so the shapes are parameterised and each page supplies its own
 * content. The variety comes from which shape a page picks and what it puts in
 * it, which is the same trick as the block variants.
 *
 * Scene data lives in the page's content module, so it localises with
 * everything else rather than being hardcoded English inside a component.
 * That was the original sin on this site and it is not being repeated.
 *
 * Every hue here is from the validated palette in `charts/tokens.ts`. Grey is
 * never a data mark.
 */

const HUES = {
  good: { fg: "var(--sig-deep)", bg: "var(--sig-tint)", line: "var(--sig-line)" },
  work: { fg: "var(--sig-deep)", bg: "#eef3fe", line: "#c9d8fb" },
  hold: { fg: "#A16207", bg: "#fdf1dd", line: "#eed9b0" },
  warn: { fg: "#b91c1c", bg: "#fdeceb", line: "#f0c4c0" },
} as const;
export type Tone = keyof typeof HUES;

/* --------------------------------------------------------------- flow */

export interface FlowSpec {
  kind: "flow";
  steps: readonly { k: string; v: string; tone?: Tone }[];
  note?: string;
  source?: { label: string; href: string };
}

/** Left to right, one node per step. For anything that is a sequence. */
function Flow({ s }: { s: FlowSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      {/* auto-fit at 9rem gave three columns in a hero-width container, which
          strands a fourth step on its own row. Pair them instead. */}
      <ol
        className="grid gap-2.5"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${s.steps.length === 4 ? "12rem" : "9rem"}, 1fr))` }}
      >
        {s.steps.map((st, i) => {
          const h = HUES[st.tone ?? "work"];
          return (
            <li
              key={st.k}
              className="relative rounded-2xl border bg-white p-4"
              style={{
                borderColor: st.tone && st.tone !== "work" ? h.line : "var(--ed-line)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: h.bg }}>
                  <Circle className="h-2.5 w-2.5" style={{ color: h.fg, fill: h.fg }} aria-hidden />
                </span>
                <span className="ed-num text-[0.6875rem] font-bold" style={{ color: C.mute }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <p className="mt-3 text-[0.8125rem] font-bold" style={{ color: C.ink }}>{st.k}</p>
              <p className="mt-1 text-[0.75rem] leading-snug" style={{ color: C.mid }}>{st.v}</p>
              {/* No connector between cards. This grid wraps at narrow widths
                  and a row break is not knowable here, so a beam on the last
                  card of a row pointed into empty space. The staggered reveal
                  and the numbering carry the sequence instead. */}
            </li>
          );
        })}
      </ol>
      {s.note && (
        <p className="mt-6 max-w-[72ch] text-[0.9375rem] leading-relaxed" style={{ color: C.mid }}>
          {s.note}{" "}
          {s.source && (
            <a href={s.source.href} target="_blank" rel="noopener noreferrer nofollow"
               className="underline underline-offset-4" style={{ color: C.mid }}>
              {s.source.label}
            </a>
          )}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- lanes */

export interface LanesSpec {
  kind: "lanes";
  lanes: readonly { eyebrow: string; title: string; body: string; verdict: string; tone: Tone }[];
}

/** Two ways of doing the same thing, and the one difference that matters. */
function Lanes({ s }: { s: LanesSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const ICONS: Record<Tone, LucideIcon> = { good: Zap, work: Zap, hold: Clock, warn: AlertTriangle };
  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-2">
      {s.lanes.map((lane, i) => {
        const h = HUES[lane.tone];
        const Icon = ICONS[lane.tone];
        return (
          <div
            key={lane.title}
            className="rounded-2xl p-6"
            style={{
              background: h.bg,
              boxShadow: `inset 0 0 0 1.5px ${h.line}`,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
              transitionDelay: `${i * 160}ms`,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: h.fg }}>
                <Icon className="h-4 w-4 text-[color:var(--on-sig)]" aria-hidden />
              </span>
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase" style={{ color: h.fg }}>
                {lane.eyebrow}
              </span>
            </span>
            <h3 className="ed-d4 mt-4" style={{ color: C.ink }}>{lane.title}</h3>
            <p className="ed-body mt-2.5 max-w-[46ch]">{lane.body}</p>
            <p className="ed-num mt-5 text-[0.8125rem] font-bold" style={{ color: h.fg }}>{lane.verdict}</p>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- bars */

/**
 * A nested funnel, drawn as one cell per item rather than as bars.
 *
 * The rows here are SUBSETS of each other: of 200 results a shopper reads 10,
 * and of those 10 only 6 can be told apart. On a shared linear axis that is a
 * full-width bar beside two slivers at 5% and 3%, which is what the search page
 * was showing: three bars, two of them unreadable, and a reader left to guess
 * whether the small ones were a different measure or the same one.
 *
 * Drawing one cell per result was the first attempt and it was worse: 200 tiles
 * filled the section, the middle band was indistinguishable from the outer one,
 * and the reader counted boxes instead of reading an argument.
 *
 * So it shows the SCREEN instead. One shopper, the ten results they actually
 * read, six of them separable and four identical, and the 200 reduced to a rule
 * underneath because that part already works and should not be the loudest
 * thing here. Ten tiles a reader can take in at a glance, rather than 200 they
 * have to scan.
 *
 * Every figure carries its own number and label, so the colour is reinforcement
 * and never the only signal.
 */
export interface FunnelSpec {
  kind: "funnel";
  total: number;
  /** Outermost first. Each value is a subset of the one before it. */
  bands: readonly { label: string; value: number; note?: string; tone: Tone }[];
  /**
   * The three sentences the scene says out loud. They live in the spec because
   * this component renders in both locales, and a string written into the JSX
   * is a string Vietnamese never gets.
   */
  lead: { before: string; after: string };
  alike: string;
  reached: string;
  note?: string;
  source?: { label: string; href: string };
}

/** Six unlike things, so "you can tell these apart" is shown rather than asserted.
 *  Deliberately across categories: the page is not about any one shelf. */
const DISTINCT = [Laptop, Shirt, Footprints, Headphones, Sofa, Watch] as const;

function Funnel({ s }: { s: FunnelSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const [outer, middle, inner] = [...s.bands].sort((a, b) => b.value - a.value);
  const seen = middle.value;
  const apart = inner.value;
  const alike = seen - apart;

  return (
    <div ref={ref} className="max-w-[46rem]">
      {/* The shopper, because the number that matters is the one screen they
          actually look at, not the 200 behind it. */}
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
          style={{ background: HUES[middle.tone].bg, boxShadow: `inset 0 0 0 1.5px ${HUES[middle.tone].fg}` }}
        >
          <UserRound className="h-5 w-5" style={{ color: HUES[middle.tone].fg }} aria-hidden />
        </span>
        <p className="text-[0.9375rem] leading-snug" style={{ color: C.ink }}>
          {s.lead.before}{" "}
          <span className="ed-num font-bold" style={{ color: HUES[middle.tone].fg }}>{seen}</span>{" "}
          {s.lead.after}
        </p>
      </div>

      {/*
        * The screen itself. These are PRODUCTS, so they are drawn as products.
        *
        * The separable ones each get a different object and a tick. The rest all
        * get the SAME one, which is the argument made rather than stated: four
        * identical boxes is what "indistinguishable" looks like, and a reader
        * gets it before reading the caption under it.
        */}
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${apart} of ${seen} can be told apart`}>
        {Array.from({ length: seen }, (_, i) => {
          const ok = i < apart;
          const h = HUES[inner.tone];
          const Icon = ok ? DISTINCT[i % DISTINCT.length] : Package;
          return (
            <li
              key={i}
              className="relative grid h-14 w-14 place-items-center rounded-xl"
              style={{
                background: ok ? h.bg : "transparent",
                boxShadow: `inset 0 0 0 1.5px ${ok ? h.fg : "var(--state-off)"}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(6px)",
                transition: `opacity 380ms ${EASE}, transform 380ms ${EASE}`,
                transitionDelay: `${i * 55}ms`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: ok ? h.fg : "var(--on-panel-3)" }} aria-hidden />
              {ok && (
                <span
                  className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full"
                  style={{ background: h.fg }}
                  aria-hidden
                >
                  <Check className="h-3 w-3" style={{ color: "var(--on-sig)" }} strokeWidth={3} />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <ul className="mt-4 flex flex-wrap items-baseline gap-x-7 gap-y-1.5">
        <li className="flex items-baseline gap-2">
          <span className="ed-num text-[1.0625rem] font-bold" style={{ color: HUES[inner.tone].fg }}>{apart}</span>
          <span className="text-[0.8125rem]" style={{ color: C.mid }}>{inner.label}</span>
        </li>
        <li className="flex items-baseline gap-2">
          <span className="ed-num text-[1.0625rem] font-bold" style={{ color: "var(--on-panel-3)" }}>{alike}</span>
          <span className="text-[0.8125rem]" style={{ color: C.mid }}>{s.alike}</span>
        </li>
      </ul>

      {/* The 200 stays as context, as a rule rather than as 200 boxes: it is the
          part that already works, so it should not be the loudest thing here. */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between text-[0.8125rem]">
          <span style={{ color: C.mid }}>
            <span className="ed-num font-bold" style={{ color: HUES[outer.tone].fg }}>{outer.value}</span>{" "}
            {outer.label} · {outer.note}
          </span>
          <span style={{ color: C.mute }}>{seen} {s.reached}</span>
        </div>
        <span className="mt-2 block h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--state-off)" }}>
          <span
            className="block h-full rounded-full"
            style={{
              width: shown ? `${(seen / outer.value) * 100}%` : "0%",
              background: HUES[outer.tone].fg,
              transition: `width 900ms ${EASE} 400ms`,
            }}
          />
        </span>
      </div>

      {s.note && (
        <p className="mt-6 max-w-[68ch] text-[0.8125rem] leading-relaxed" style={{ color: C.mute }}>{s.note}</p>
      )}
    </div>
  );
}

export interface BarsSpec {
  kind: "bars";
  rows: readonly { label: string; value: number; unit?: string; note?: string; tone: Tone }[];
  note?: string;
  source?: { label: string; href: string };
}

/** Proportional bars. The lengths are the argument, so nothing has a floor. */
function Bars({ s, tight }: { s: BarsSpec; tight?: boolean }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const max = Math.max(...s.rows.map((r) => r.value));
  return (
    <div ref={ref}>
      <ul className={tight ? "grid gap-3.5" : "grid max-w-[58rem] gap-2.5"}>
        {s.rows.map((r, i) => {
          const h = HUES[r.tone];
          return (
            <li
              key={r.label}
              className={tight
                ? "grid gap-1"
                : "grid items-center gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,10rem)_4rem_minmax(0,1fr)_minmax(0,15rem)]"}
            >
              <span className={tight ? "flex items-baseline justify-between gap-3" : "contents"}>
                <span className="text-[0.8125rem] font-bold" style={{ color: C.ink }}>{r.label}</span>
                <span className="ed-num text-right text-[0.9375rem] font-bold" style={{ color: h.fg }}>
                  {r.value}{r.unit}
                </span>
              </span>
              <span className={tight ? "flex h-6 items-center" : "flex h-8 items-center"}>
                <span
                  className="h-full rounded-lg"
                  style={{
                    width: shown ? `${(r.value / max) * 100}%` : "0%",
                    background: h.bg,
                    boxShadow: `inset 0 0 0 1.5px ${h.fg}`,
                    transition: `width 900ms ${EASE}`,
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </span>
              <span className="text-[0.75rem] leading-snug" style={{ color: C.mid }}>{r.note}</span>
            </li>
          );
        })}
      </ul>
      {s.note && (
        <p className="mt-6 max-w-[68ch] text-[0.8125rem] leading-relaxed" style={{ color: C.mute }}>
          {s.note}{" "}
          {s.source && (
            <a href={s.source.href} target="_blank" rel="noopener noreferrer nofollow"
               className="underline underline-offset-4" style={{ color: C.mute }}>
              {s.source.label}
            </a>
          )}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- facts */

export interface FactsSpec {
  kind: "facts";
  facts: readonly { value: string; label: string; note?: string; tone: Tone }[];
  note?: string;
  /** A figure that is not ours carries the link to whoever measured it. */
  source?: { label: string; href: string };
}

/**
 * Three numbers that are not the same unit, so they do not share an axis.
 *
 * This replaced a bar chart whose rows were products, clicks and a rank
 * position. On one proportional scale the second and third rows vanished,
 * which read as a rendering fault rather than as the argument, and putting
 * unlike units on a shared axis is the error the chart guidance warns about
 * first.
 */
function Facts({ s }: { s: FactsSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  // Three across leaves a fourth tile stranded on its own row. Pair them up
  // instead when there are four.
  const cols = s.facts.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div ref={ref}>
      <ul className={`grid gap-4 ${cols}`}>
        {s.facts.map((f, i) => {
          const h = HUES[f.tone];
          return (
            <li
              key={f.label}
              className="rounded-2xl p-6"
              style={{
                background: h.bg,
                boxShadow: `inset 0 0 0 1.5px ${h.line}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 480ms ${EASE}, transform 480ms ${EASE}`,
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <p className="ed-num text-[2.75rem] leading-none font-bold" style={{ color: h.fg }}>{f.value}</p>
              <p className="mt-3.5 text-[0.9375rem] font-bold" style={{ color: C.ink }}>{f.label}</p>
              {f.note && <p className="mt-1.5 text-[0.8125rem] leading-snug" style={{ color: C.mid }}>{f.note}</p>}
            </li>
          );
        })}
      </ul>
      {s.note && (
        <p className="mt-6 max-w-[68ch] text-[0.8125rem] leading-relaxed" style={{ color: C.mute }}>
          {s.note}{" "}
          {s.source && (
            <a href={s.source.href} target="_blank" rel="noopener noreferrer nofollow"
               className="underline underline-offset-4" style={{ color: C.mute }}>
              {s.source.label}
            </a>
          )}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- delta */

export interface DeltaSpec {
  kind: "delta";
  eyebrow?: string;
  question?: string;
  label: string;
  before: { v: number; label: string };
  after: { v: number; label: string };
  note?: string;
  footer?: string;
}

/** Before, arrow, after. For any page whose product is a number that moved. */
function Delta({ s }: { s: DeltaSpec }) {
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const b = useCountUp(s.before.v, shown, reduced);
  const a = useCountUp(s.after.v, shown, reduced);
  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
      style={{ background: "linear-gradient(140deg, #fdf4e7 0%, #f3f7ea 62%, var(--sig-tint) 100%)" }}
    >
      {s.question && (
        <div className="rounded-2xl bg-[rgb(var(--raise-rgb)/0.75)] px-4 py-3 shadow-sm backdrop-blur-sm">
          {s.eyebrow && (
            <span className="block text-[0.625rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
              {s.eyebrow}
            </span>
          )}
          <span className="block text-[0.875rem] font-semibold" style={{ color: C.ink }}>{s.question}</span>
        </div>
      )}
      <div className="mt-3.5 rounded-2xl bg-[rgb(var(--raise-rgb)/0.75)] px-5 py-6 shadow-sm backdrop-blur-sm">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>{s.label}</p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <span className="text-center">
            <span ref={b} className="ed-num block text-[2.5rem] leading-none font-bold" style={{ color: HUES.hold.fg }}>
              {s.before.v}
            </span>
            <span className="mt-1.5 block text-[0.6875rem] font-semibold" style={{ color: C.mute }}>{s.before.label}</span>
          </span>
          <ArrowRight className="h-6 w-6 shrink-0" style={{ color: C.mute }} aria-hidden />
          <span className="text-center">
            <span ref={a} className="ed-num block text-[2.5rem] leading-none font-bold" style={{ color: HUES.good.fg }}>
              {s.after.v}
            </span>
            <span className="mt-1.5 block text-[0.6875rem] font-semibold" style={{ color: C.mute }}>{s.after.label}</span>
          </span>
        </div>
        {s.note && <p className="mt-5 text-center text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{s.note}</p>}
      </div>
      {s.footer && (
        <div className="mt-3.5 flex items-center gap-2.5 rounded-2xl px-4 py-3"
             style={{ background: "var(--sig-tint-2)", boxShadow: `inset 0 0 0 1.5px ${HUES.good.fg}` }}>
          <Check className="h-4 w-4 shrink-0" style={{ color: HUES.good.fg }} aria-hidden />
          <span className="text-[0.8125rem] font-bold" style={{ color: "var(--sig-deep)" }}>{s.footer}</span>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- asks */

export interface AsksSpec {
  kind: "asks";
  eyebrow: string;
  rows: readonly { label: string; eg?: string; ok: boolean }[];
  okLabel: string;
  noLabel: string;
  note?: string;
}

/** What was asked for, and what could be answered. */
function Asks({ s }: { s: AsksSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const missed = s.rows.filter((r) => !r.ok).length;
  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
      style={{ background: "linear-gradient(140deg, #eef3fe 0%, #f3f7ea 58%, #fdf4e7 100%)" }}
    >
      <div className="rounded-2xl bg-[rgb(var(--raise-rgb)/0.75)] px-5 py-4 shadow-sm backdrop-blur-sm">
        <p className="text-[0.6875rem] font-bold tracking-[0.16em] uppercase" style={{ color: C.mute }}>{s.eyebrow}</p>
        <ul className="mt-3.5 space-y-2">
          {s.rows.map((r, i) => (
            <li
              key={r.label}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
              style={{
                background: r.ok ? HUES.good.bg : HUES.warn.bg,
                boxShadow: `inset 0 0 0 1.5px ${r.ok ? HUES.good.fg : HUES.warn.line}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 400ms ${EASE}, transform 400ms ${EASE}`,
                transitionDelay: `${180 + i * 130}ms`,
              }}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: r.ok ? HUES.good.fg : HUES.warn.fg }} aria-hidden>
                {r.ok ? <Check className="h-3 w-3 text-[color:var(--on-sig)]" /> : <X className="h-3 w-3 text-[color:var(--on-sig)]" />}
              </span>
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
                <span className="text-[0.8125rem] font-semibold" style={{ color: C.ink }}>{r.label}</span>
                {r.eg && <span className="text-[0.6875rem]" style={{ color: C.mid }}>{r.eg}</span>}
              </span>
              <span className="text-[0.6875rem] font-bold" style={{ color: r.ok ? HUES.good.fg : HUES.warn.fg }}>
                {r.ok ? s.okLabel : s.noLabel}
              </span>
            </li>
          ))}
        </ul>
        {s.note && (
          <p className="mt-3.5 flex items-center gap-2.5 text-[0.8125rem]" style={{ color: C.mid }}>
            <span className="ed-num rounded-md px-2 py-0.5 text-[0.8125rem] font-bold"
                  style={{ background: HUES.warn.bg, color: HUES.warn.fg }}>
              {missed}/{s.rows.length}
            </span>
            {s.note}
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- grid */

export interface GridSpec {
  kind: "grid";
  total: number;
  lit: number;
  label: string;
  litLabel: string;
  restLabel: string;
  tone?: Tone;
}

/** N cells, M of them lit. For "which few out of many". */
function CellGrid({ s }: { s: GridSpec }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const h = HUES[s.tone ?? "good"];
  // A seeded Fisher-Yates, so the lit cells scatter and there are exactly
  // `lit` of them. Striding by a fixed step collided at some ratios, lighting
  // fewer cells than the caption claimed, and at others produced visible bands
  // rather than a scatter. Seeded so the server and the client agree.
  const picked = (() => {
    const idx = Array.from({ length: s.total }, (_, i) => i);
    let seed = 1013904223;
    for (let i = s.total - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      const j = seed % (i + 1);
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return new Set(idx.slice(0, s.lit));
  })();
  return (
    <div ref={ref} className="rounded-2xl p-6" style={{ background: h.bg }}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>{s.label}</p>
        <p className="ed-num text-[0.8125rem] font-bold" style={{ color: C.mid }}>{s.total}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        {Array.from({ length: s.total }, (_, i) => {
          const on = picked.has(i);
          return (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{
                background: on ? h.fg : "rgb(0 0 0 / 0.07)",
                opacity: shown ? 1 : on ? 0 : 1,
                transition: `opacity 260ms ${EASE}`,
                transitionDelay: on ? `${(i / s.total) * 900}ms` : "0ms",
              }}
            />
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.75rem]">
        <span className="flex items-center gap-1.5 font-semibold" style={{ color: C.ink }}>
          <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: h.fg }} />{s.litLabel}
        </span>
        <span className="flex items-center gap-1.5" style={{ color: C.mid }}>
          <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: "rgb(0 0 0 / 0.07)" }} />{s.restLabel}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- dispatch */

export type SceneSpec = FlowSpec | LanesSpec | BarsSpec | DeltaSpec | AsksSpec | GridSpec | FactsSpec | FunnelSpec;

export type Slot = "hero" | "situation" | "chain";

export function Scene({ spec, slot = "chain" }: { spec: SceneSpec; slot?: Slot }) {
  switch (spec.kind) {
    case "flow": return <Flow s={spec} />;
    case "lanes": return <Lanes s={spec} />;
    case "bars": return <Bars s={spec} tight={slot !== "chain"} />;
    case "delta": return <Delta s={spec} />;
    case "asks": return <Asks s={spec} />;
    case "grid": return <CellGrid s={spec} />;
    case "facts": return <Facts s={spec} />;
    case "funnel": return <Funnel s={spec} />;
  }
}
