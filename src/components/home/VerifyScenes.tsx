"use client";

import { useLocale } from "next-intl";
import { UserRound, ArrowRight, CheckCircle2, Hourglass, Zap, CircleAlert, TrendingUp } from "lucide-react";
import { verify } from "@/content/home";
import { useInView, useCountUp } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * The hero scene: the question somebody is going to ask, and the answer.
 *
 * Shaped as a memo rather than the session card the audit page uses, because
 * repeating that layout on the next page in the staircase would tell a visitor
 * the two products are the same product.
 *
 * The person in it is the one who approved the budget. That is who this product
 * is actually sold to: the merchandiser did the work, and cannot prove it.
 */
export function ProofScene() {
  const v = verify(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const before = useCountUp(94, shown, reduced);
  const after = useCountUp(31, shown, reduced);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
      style={{ background: "linear-gradient(140deg, #fdf4e7 0%, #f3f7ea 62%, var(--sig-tint) 100%)" }}
    >
      <span aria-hidden className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full"
            style={{ background: "#A16207", opacity: 0.13, filter: "blur(70px)" }} />

      {/* The question, from the person who signed it off. */}
      <div className="relative flex items-center gap-3 rounded-2xl bg-[rgb(var(--raise-rgb)/0.75)] px-4 py-3 shadow-sm backdrop-blur-sm">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "#A16207" }}>
          <UserRound className="h-5 w-5 text-[color:var(--on-panel)]" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.625rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
            {v.askedBy}
          </span>
          <span className="block text-[0.875rem] font-semibold" style={{ color: C.ink }}>{v.theQuestion}</span>
        </span>
      </div>

      {/* The answer, as the only number that moved. */}
      <div className="relative mt-3.5 rounded-2xl bg-[rgb(var(--raise-rgb)/0.75)] px-5 py-6 shadow-sm backdrop-blur-sm">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
          {v.readinessLabel}
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <span className="text-center">
            <span ref={before} className="ed-num block text-[2.5rem] leading-none font-bold" style={{ color: "#A16207" }}>94</span>
            <span className="mt-1.5 block text-[0.6875rem] font-semibold" style={{ color: C.mute }}>{v.beforeLabel}</span>
          </span>
          <ArrowRight className="h-6 w-6 shrink-0" style={{ color: C.mute }} aria-hidden />
          <span className="text-center">
            <span ref={after} className="ed-num block text-[2.5rem] leading-none font-bold" style={{ color: "var(--sig-deep)" }}>31</span>
            <span className="mt-1.5 block text-[0.6875rem] font-semibold" style={{ color: C.mute }}>{v.afterLabel}</span>
          </span>
        </div>
        <p className="mt-5 text-center text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{v.answerNote}</p>
      </div>

      {/* When it arrived. The whole product is in this line. */}
      <div className="relative mt-3.5 flex items-center gap-2.5 rounded-2xl px-4 py-3"
           style={{ background: "var(--sig-tint-2)", boxShadow: "inset 0 0 0 1.5px var(--sig-deep)" }}>
        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--sig-deep)" }} aria-hidden />
        <span className="text-[0.8125rem] font-bold" style={{ color: "var(--sig-deep)" }}>{v.sameWeek}</span>
      </div>
    </div>
  );
}

/**
 * Two routes to the same proof, drawn to scale.
 *
 * The argument is the length of the bars, so the bars are the section. One
 * route needs enough traffic to power a test and a full business cycle to read
 * it; the other reads a property of the catalogue and is done. Drawn as two
 * tracks rather than the five-across chain on the audit page.
 */
export function ProofPathScene() {
  const v = verify(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();

  const lanes = [
    { ...v.slowPath, hue: "#A16207", bg: "#fdf1dd", Icon: Hourglass, width: 100, Mark: CircleAlert },
    { ...v.fastPath, hue: "var(--sig-deep)", bg: "var(--sig-tint)", Icon: Zap, width: 17, Mark: CheckCircle2 },
  ];

  return (
    <div ref={ref} className="grid gap-5">
      {lanes.map((lane, i) => (
        <div key={lane.title} className="rounded-2xl border border-[color:var(--ed-line)] bg-white p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: lane.hue }}>
              <lane.Icon className="h-4 w-4 text-[color:var(--on-sig)]" aria-hidden />
            </span>
            <h3 className="ed-d4 flex-1" style={{ color: C.ink }}>{lane.title}</h3>
            <span className="ed-num rounded-md px-2.5 py-1 text-[0.8125rem] font-bold"
                  style={{ background: lane.bg, color: lane.hue }}>
              {lane.duration}
            </span>
          </div>

          {/* Drawn to scale against each other: six weeks against one. */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-3 flex-1 overflow-hidden rounded-full" style={{ background: "#eef0f4" }}>
              <span
                className="block h-full rounded-full"
                style={{
                  width: shown ? `${lane.width}%` : "0%",
                  background: lane.hue,
                  transition: `width 1100ms ${EASE}`,
                  transitionDelay: `${i * 260}ms`,
                }}
              />
            </span>
            <lane.Mark className="h-5 w-5 shrink-0" style={{ color: lane.hue }} aria-hidden />
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            {lane.beats.map((b: string, k: number) => (
              <li key={b} className="rounded-lg px-3 py-2 text-[0.75rem] leading-snug font-medium"
                  style={{
                    background: lane.bg, color: C.mid,
                    opacity: shown ? 1 : 0,
                    transition: `opacity 420ms ${EASE}`,
                    transitionDelay: `${420 + i * 260 + k * 110}ms`,
                  }}>
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[0.8125rem] font-bold" style={{ color: lane.hue }}>{lane.verdict}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The situation, drawn: the dashboard went up and proved nothing.
 *
 * Completeness counts the fields somebody thought to define, so it rises
 * whether or not the quarter was spent on the fields that decide anything.
 * Two tiles, because the whole tension is that one of them has an answer and
 * the other does not.
 */
export function FilledNotProvenScene() {
  const v = verify(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const pct = useCountUp(93, shown, reduced);

  return (
    <div ref={ref} className="grid gap-3.5">
      <div className="rounded-2xl border border-[color:var(--ed-line)] bg-white p-6">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
          {v.filledLabel}
        </p>
        <p className="mt-3 flex items-baseline gap-2.5">
          <span className="ed-num text-[0.9375rem] font-semibold" style={{ color: C.mute }}>71%</span>
          <ArrowRight className="h-3.5 w-3.5 self-center" style={{ color: C.mute }} aria-hidden />
          <span ref={pct} className="ed-num text-[2.25rem] leading-none font-bold" style={{ color: "var(--sig-deep)" }}>93</span>
          <span className="ed-num text-[1.25rem] font-bold" style={{ color: "var(--sig-deep)" }}>%</span>
          <TrendingUp className="h-5 w-5 self-center" style={{ color: "var(--sig-deep)" }} aria-hidden />
        </p>
        <span className="mt-4 block h-2.5 overflow-hidden rounded-full" style={{ background: "#eef0f4" }}>
          <span className="block h-full rounded-full"
                style={{ width: shown ? "93%" : "0%", background: "var(--sig-deep)", transition: `width 1000ms ${EASE}` }} />
        </span>
        <p className="mt-3.5 text-[0.8125rem]" style={{ color: C.mid }}>{v.filledNote}</p>
      </div>

    </div>
  );
}
