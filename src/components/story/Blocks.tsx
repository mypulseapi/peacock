"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, X, Upload, Gauge, Wrench, CircleDot, Paperclip } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { StepArt } from "@/components/story/StepArt";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Alternate shapes for the three repeated blocks on a story page.
 *
 * Thirteen pages share one template, and from "how it works" downwards all
 * thirteen rendered identically: three cards, a two-column icon list, two
 * bordered panels. Unique scenes at the top of a page cannot fix that, because
 * the bottom sixty percent is where a visitor spends their time.
 *
 * Each block now has three shapes and every page picks a combination, so no
 * two pages read alike. They are variants of one component rather than
 * thirteen bespoke layouts: the copy shape is genuinely the same across the
 * portfolio, and pretending otherwise would be thirteen things to maintain.
 */

export type StepsShape = "cards" | "timeline" | "rail";
export type GetsShape = "grid" | "manifest" | "showcase";
export type LimitsShape = "cards" | "ledger" | "split";

export interface StoryStep { n: string; title: string; body: string; meta?: string }
export interface StoryItem { icon: LucideIcon; title: string; body: string }

/**
 * What actually reaches the client blocks.
 *
 * `StoryItem.icon` is a component, and a function cannot cross a server to
 * client boundary. The server renders the element; each variant sizes and
 * colours it from the wrapper, which works because lucide strokes with
 * currentColor.
 */
export interface StoryItemNode { icon: ReactNode; title: string; body: string }

const STEP_ICONS = [Upload, Gauge, Wrench];

/* ------------------------------------------------------------------ steps */

/** The original: three bordered cards. */
function StepsCards({ items }: { items: readonly StoryStep[] }) {
  return (
    <Reveal as="ol" className="mt-12 grid gap-7 lg:grid-cols-3">
      {items.map((s, i) => {
        const Icon = STEP_ICONS[i] ?? CircleDot;
        return (
          <li key={s.n} className="ed-raise rounded-2xl border border-[color:var(--ed-line)] p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
                <Icon className="h-5 w-5" style={{ color: "var(--accent-primary)" }} aria-hidden />
              </span>
              {s.meta && <span className="ed-eyebrow">{s.meta}</span>}
            </div>
            <span className="ed-num mt-6 block text-[0.8125rem] font-bold tracking-wider text-[color:var(--accent-primary)]">{s.n}</span>
            <h3 className="ed-d4 mt-2 text-[color:var(--ed-ink)]">{s.title}</h3>
            <p className="ed-body mt-3">{s.body}</p>
          </li>
        );
      })}
    </Reveal>
  );
}

/** A rail with numbered nodes on it, so the sequence is drawn rather than implied. */
function StepsTimeline({ items }: { items: readonly StoryStep[] }) {
  const { ref, shown } = useInView<HTMLOListElement>();
  return (
    <ol ref={ref} className="relative mt-12 grid gap-9 lg:grid-cols-3 lg:gap-7">
      {/* The rail itself, drawn once behind the nodes. */}
      <span
        aria-hidden
        className="absolute top-5 left-5 hidden h-0.5 lg:block"
        style={{
          width: shown ? "calc(100% - 2.5rem)" : "0%",
          background: "linear-gradient(90deg, var(--sig-deep) 0%, var(--sig) 100%)",
          transition: `width 1100ms ${EASE} 160ms`,
        }}
      />
      {items.map((s, i) => (
        <li
          key={s.n}
          className="relative flex flex-col"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 480ms ${EASE}, transform 480ms ${EASE}`,
            transitionDelay: `${360 + i * 180}ms`,
          }}
        >
          <span
            className="ed-num relative z-10 grid h-10 w-10 place-items-center rounded-full text-[0.8125rem] font-bold text-[color:var(--on-sig)]"
            style={{ background: i === items.length - 1 ? "var(--sig)" : "var(--sig-deep)" }}
          >
            {s.n}
          </span>
          {s.meta && (
            <span className="mt-5 inline-block rounded-md px-2 py-0.5 text-[0.6875rem] font-bold tracking-wide uppercase"
                  style={{ background: "#eef3fe", color: "var(--sig-deep)" }}>
              {s.meta}
            </span>
          )}
          <h3 className="ed-d4 mt-3 text-[color:var(--ed-ink)]">{s.title}</h3>
          <p className="ed-body mt-2.5 max-w-[38ch]">{s.body}</p>
          {i < 3 && <StepArt step={(i + 1) as 1 | 2 | 3} place="below" />}
        </li>
      ))}
    </ol>
  );
}

/** Full-width rows, each one a band. Reads as a process, not a menu. */
function StepsRail({ items }: { items: readonly StoryStep[] }) {
  const { ref, shown } = useInView<HTMLOListElement>();
  const TONES = [
    { bg: "var(--sig-tint)", hue: "var(--sig-deep)" },
    { bg: "#eef3fe", hue: "var(--sig-deep)" },
    { bg: "#fdf1dd", hue: "#A16207" },
  ];
  return (
    <ol ref={ref} className="mt-12 grid gap-3">
      {items.map((s, i) => {
        const tone = TONES[i % TONES.length];
        const Icon = STEP_ICONS[i] ?? CircleDot;
        return (
          <li
            key={s.n}
            className="grid items-start gap-5 rounded-2xl p-6 sm:grid-cols-[auto_minmax(0,18rem)_minmax(0,1fr)] sm:items-center sm:gap-7"
            style={{
              background: tone.bg,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-12px)",
              transition: `opacity 460ms ${EASE}, transform 460ms ${EASE}`,
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <span className="flex items-center gap-3">
              <span className="ed-num text-[2rem] leading-none font-bold" style={{ color: tone.hue, opacity: 0.35 }}>
                {s.n}
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[rgb(var(--raise-rgb)/0.7)]">
                <Icon className="h-4.5 w-4.5" style={{ color: tone.hue }} aria-hidden />
              </span>
            </span>
            <span>
              <h3 className="ed-d4 text-[color:var(--ed-ink)]">{s.title}</h3>
              {s.meta && (
                <span className="mt-1.5 block text-[0.6875rem] font-bold tracking-wide uppercase" style={{ color: tone.hue }}>
                  {s.meta}
                </span>
              )}
            </span>
            <p className="ed-body">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function StepsBlock({ shape = "cards", items }: { shape?: StepsShape; items: readonly StoryStep[] }) {
  if (shape === "timeline") return <StepsTimeline items={items} />;
  if (shape === "rail") return <StepsRail items={items} />;
  return <StepsCards items={items} />;
}

/* ------------------------------------------------------------------- gets */

function GetsGrid({ items }: { items: readonly StoryItemNode[] }) {
  return (
    <Reveal className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
      {items.map(({ icon, title, body }) => (
        <article key={title} className="flex gap-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl [&>svg]:h-5 [&>svg]:w-5"
                style={{ background: "var(--brand-lav-100)", color: "var(--accent-primary)" }}>
            {icon}
          </span>
          <span>
            <h3 className="ed-d4 text-[color:var(--ed-ink)]">{title}</h3>
            <p className="ed-body mt-2.5 max-w-[46ch]">{body}</p>
          </span>
        </article>
      ))}
    </Reveal>
  );
}

/**
 * What actually arrives, drawn as the thing it is: a list of attachments.
 * For pages whose "what you get" is literally a set of files in an inbox.
 */
function GetsManifest({ items }: { items: readonly StoryItemNode[] }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--ed-line)] bg-white">
      <div className="flex items-center gap-2.5 border-b border-[color:var(--ed-line)] px-5 py-3.5"
           style={{ background: "#f7f8fa" }}>
        <Paperclip className="h-4 w-4" style={{ color: C.mute }} aria-hidden />
        <span className="ed-num text-[0.8125rem] font-bold" style={{ color: C.mid }}>{items.length}</span>
      </div>
      <ul>
        {items.map(({ icon, title, body }, i) => (
          <li
            key={title}
            className="grid items-start gap-4 border-b border-[color:var(--ed-line)] px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,17rem)_minmax(0,1fr)] sm:items-center"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 380ms ${EASE}, transform 380ms ${EASE}`,
              transitionDelay: `${i * 90}ms`,
            }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg [&>svg]:h-4 [&>svg]:w-4"
                  style={{ background: "var(--sig-tint)", color: "var(--sig-deep)" }}>
              {icon}
            </span>
            <h3 className="text-[0.9375rem] font-bold" style={{ color: C.ink }}>{title}</h3>
            <p className="text-[0.875rem] leading-relaxed" style={{ color: C.mid }}>{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The first item is the headline deliverable; the rest support it. */
function GetsShowcase({ items }: { items: readonly StoryItemNode[] }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <div ref={ref} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <article
        className="flex flex-col justify-center rounded-2xl p-8"
        style={{
          background: "linear-gradient(150deg, var(--sig-tint) 0%, #eef3fe 100%)",
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
        }}
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl text-[color:var(--on-sig)] [&>svg]:h-5 [&>svg]:w-5"
              style={{ background: "var(--sig-deep)" }}>
          {lead.icon}
        </span>
        <h3 className="ed-d3 mt-6 text-[color:var(--ed-ink)]">{lead.title}</h3>
        <p className="ed-body mt-3 max-w-[40ch]">{lead.body}</p>
      </article>

      <div className="grid content-start gap-3">
        {rest.map(({ icon, title, body }, i) => (
          <article
            key={title}
            className="flex gap-4 rounded-2xl border border-[color:var(--ed-line)] bg-white p-5"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(10px)",
              transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
              transitionDelay: `${180 + i * 110}ms`,
            }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg [&>svg]:h-4 [&>svg]:w-4"
                  style={{ background: "#eef3fe", color: "var(--sig-deep)" }}>
              {icon}
            </span>
            <span>
              <h3 className="text-[0.9375rem] font-bold" style={{ color: C.ink }}>{title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed" style={{ color: C.mid }}>{body}</p>
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function GetsBlock({ shape = "grid", items }: { shape?: GetsShape; items: readonly StoryItemNode[] }) {
  if (shape === "manifest") return <GetsManifest items={items} />;
  if (shape === "showcase") return <GetsShowcase items={items} />;
  return <GetsGrid items={items} />;
}

/* ----------------------------------------------------------------- limits */

interface LimitsProps { will: readonly string[]; wont: readonly string[]; willLabel: string; wontLabel: string }

function LimitsCards({ will, wont, willLabel, wontLabel }: LimitsProps) {
  return (
    <Reveal className="mt-12 grid gap-7 lg:grid-cols-2">
      {[
        { t: willLabel, items: will, good: true },
        { t: wontLabel, items: wont, good: false },
      ].map(({ t, items, good }) => {
        const Icon = good ? Check : X;
        return (
          <div key={t} className="ed-raise rounded-2xl border border-[color:var(--ed-line)] p-7">
            <h3 className="ed-d4 text-[color:var(--ed-ink)]">{t}</h3>
            <ul className="mt-6 space-y-5">
              {items.map((it) => (
                <li key={it} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                        style={{ background: good ? "var(--brand-lav-200)" : "var(--brand-blush-100)" }}>
                    <Icon className="h-3 w-3" style={{ color: good ? "var(--accent-primary)" : "var(--brand-coral-ink)" }} aria-hidden />
                  </span>
                  <span className="ed-body flex-1">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Reveal>
  );
}

/** One continuous ledger, alternating sides. Reads as terms rather than two brochures. */
function LimitsLedger({ will, wont, willLabel, wontLabel }: LimitsProps) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const rows = [
    ...will.map((t) => ({ t, good: true })),
    ...wont.map((t) => ({ t, good: false })),
  ];
  return (
    <div ref={ref} className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--ed-line)]">
      {rows.map((r, i) => {
        const Icon = r.good ? Check : X;
        const hue = r.good ? "var(--sig-deep)" : "#b91c1c";
        const first = i === 0 || (!r.good && rows[i - 1]?.good);
        return (
          <div
            key={r.t}
            className="grid items-center gap-4 border-b border-[color:var(--ed-line)] px-5 py-4 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
            style={{
              background: r.good ? "#fbfdf6" : "#fffbfb",
              opacity: shown ? 1 : 0,
              transition: `opacity 340ms ${EASE}`,
              transitionDelay: `${i * 70}ms`,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: hue }}>
                {/* On a filled disc, so this is ink on the fill. */}
                <Icon className="h-3 w-3 text-[color:var(--on-sig)]" aria-hidden />
              </span>
              {first && (
                <span className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase" style={{ color: hue }}>
                  {r.good ? willLabel : wontLabel}
                </span>
              )}
            </span>
            <span className="text-[0.9375rem] leading-relaxed" style={{ color: C.ink }}>{r.t}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Two tinted halves, edge to edge. The most emphatic of the three. */
function LimitsSplit({ will, wont, willLabel, wontLabel }: LimitsProps) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-12 grid overflow-hidden rounded-2xl lg:grid-cols-2">
      {[
        { label: willLabel, items: will, good: true, bg: "var(--sig-tint)", hue: "var(--sig-deep)" },
        { label: wontLabel, items: wont, good: false, bg: "#fdeceb", hue: "#b91c1c" },
      ].map((col, ci) => {
        const Icon = col.good ? Check : X;
        return (
          <div
            key={col.label}
            className="p-8"
            style={{
              background: col.bg,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 480ms ${EASE}, transform 480ms ${EASE}`,
              transitionDelay: `${ci * 150}ms`,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: col.hue }}>
                {/* On the filled tile, and white carries on both the accent
                    (6.87:1) and the red (6.35:1). */}
                <Icon className="h-4 w-4 text-[color:var(--on-sig)]" aria-hidden />
              </span>
              <h3 className="text-[0.75rem] font-bold tracking-[0.12em] uppercase" style={{ color: col.hue }}>
                {col.label}
              </h3>
            </span>
            <ul className="mt-7 space-y-4">
              {col.items.map((it) => (
                <li key={it} className="border-b pb-4 text-[0.9375rem] leading-relaxed last:border-b-0 last:pb-0"
                    style={{ color: C.ink, borderColor: "rgb(0 0 0 / 0.07)" }}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function LimitsBlock({ shape = "cards", ...p }: LimitsProps & { shape?: LimitsShape }) {
  if (shape === "ledger") return <LimitsLedger {...p} />;
  if (shape === "split") return <LimitsSplit {...p} />;
  return <LimitsCards {...p} />;
}
