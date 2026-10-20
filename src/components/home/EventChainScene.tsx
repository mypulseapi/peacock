"use client";

import { useLocale } from "next-intl";
import { Globe, Search, SlidersHorizontal, MousePointerClick, LogOut, Clock, Zap } from "lucide-react";
import { chain } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * One shopper's session, as a chain, and the two ways of knowing where it broke.
 *
 * This is the argument the page was missing. Every section described what the
 * audit produces; none of them said why anyone else cannot produce it. The
 * chain makes it visible: an engagement-ranked tool has to wait for these
 * events to happen, and can only ever weigh fields that already exist, so the
 * field nobody recorded is invisible to it no matter how much traffic runs.
 *
 * The audit computes the break point from the catalogue alone, before a single
 * session. That is a property of the method rather than a claim about us, and
 * it is the whole reason this product can be sold to a merchant on day one.
 *
 * The chain must not be read as something we observe. This product takes no
 * traffic and no tag; it predicts where the chain WOULD break. The lanes below
 * say exactly that, because implying otherwise would contradict the lede.
 */
const STEPS = [Globe, Search, SlidersHorizontal, MousePointerClick, LogOut] as const;

export function EventChainScene() {
  const c = chain(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const breakAt = 2; // the filter step: the constraint with no field behind it

  return (
    <div ref={ref}>
      {/* The session, left to right. A new shape on this page: every other
          block is a two-column grid or a row of equal cards. */}
      <ol className="grid gap-2.5 sm:grid-cols-5">
        {c.steps.map((st: { k: string; v: string }, i: number) => {
          const Icon = STEPS[i];
          const broke = i === breakAt;
          const hue = broke ? "#b91c1c" : i > breakAt ? "#A16207" : "var(--sig-deep)";
          const bg = broke ? "#fdeceb" : i > breakAt ? "#fdf1dd" : "#eef3fe";
          return (
            <li
              key={st.k}
              className="relative rounded-2xl border bg-white p-4"
              style={{
                borderColor: broke ? "#f0c4c0" : "var(--ed-line)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
                transitionDelay: `${i * 130}ms`,
              }}
            >
              <span className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: bg }}>
                  <Icon className="h-4 w-4" style={{ color: hue }} aria-hidden />
                </span>
                <span className="ed-num text-[0.6875rem] font-bold" style={{ color: C.mute }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <p className="mt-3 text-[0.8125rem] font-bold" style={{ color: C.ink }}>{st.k}</p>
              <p className="mt-1 text-[0.75rem] leading-snug" style={{ color: C.mid }}>{st.v}</p>

              {/* The signal travelling to the next event, continuously. */}
              {i < c.steps.length - 1 && (
                <span aria-hidden
                      className={`absolute top-1/2 -right-2.5 hidden h-1 w-2.5 sm:block ${reduced ? "" : "beam-flow"}`}
                      style={{ background: "#dbe3f7" }} />
              )}
              {broke && (
                <span className="mt-3 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[0.625rem] font-bold"
                      style={{ background: "#b91c1c", color: "#fff" }}>
                  {c.brokeHere}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-6 max-w-[70ch] text-[0.9375rem] leading-relaxed" style={{ color: C.mid }}>
        {c.breakNote}{" "}
        <a href={c.sourceHref} target="_blank" rel="noopener noreferrer nofollow"
           className="underline underline-offset-4" style={{ color: C.mid }}>
          {c.source}
        </a>
      </p>

      {/* Two ways of finding that out, and the only difference that matters. */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          { ...c.themLane, Icon: Clock, hue: "#A16207", bg: "#fdf1dd", border: "#eed9b0" },
          { ...c.usLane, Icon: Zap, hue: "var(--sig-deep)", bg: "var(--sig-tint)", border: "var(--sig-line)" },
        ].map((lane, i) => (
          <div
            key={lane.title}
            className="rounded-2xl p-6"
            style={{
              background: lane.bg,
              boxShadow: `inset 0 0 0 1.5px ${lane.border}`,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
              transitionDelay: `${760 + i * 160}ms`,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: lane.hue }}>
                <lane.Icon className="h-4 w-4 text-[color:var(--on-sig)]" aria-hidden />
              </span>
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase" style={{ color: lane.hue }}>
                {lane.eyebrow}
              </span>
            </span>
            <h3 className="ed-d4 mt-4" style={{ color: C.ink }}>{lane.title}</h3>
            <p className="ed-body mt-2.5 max-w-[46ch]">{lane.body}</p>
            <p className="ed-num mt-5 text-[0.8125rem] font-bold" style={{ color: lane.hue }}>{lane.needs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
