"use client";

import { useLocale } from "next-intl";
import { UserRound, Search, Smartphone, Zap, Globe, Check, X } from "lucide-react";
import { scenes } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * The shopper, and what the shelf can answer for them.
 *
 * Every figure on this site was abstract: grids, bars, lanes. None of them had
 * a person in, and the product exists because somebody is standing in front of
 * a shelf trying to choose.
 *
 * Laid out as two cards of equal height rather than a person floating in a wide
 * empty field, which is what the first pass was: the left column was more than
 * half dead space and the two sides ended at different heights. Both columns
 * stretch now, so the panel has no slack in it, and the signal beam between
 * them runs continuously because a session does not pause to be looked at.
 */
export function ShopperScene() {
  const s = scenes(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();

  const signals = [
    { Icon: Smartphone, label: s.sigDevice },
    { Icon: Globe, label: s.sigLocation },
    { Icon: Zap, label: s.sigLive },
  ];
  // Named as the kind of constraint rather than one shelf's specs, and
  // illustrated from three different verticals: a beauty merchant reading
  // "13 inch screen, 16GB memory" concluded this was somebody else's problem.
  const asks = [
    { label: s.askFit, eg: s.egFit, ok: false },
    { label: s.askMaterial, eg: s.egMaterial, ok: false },
    { label: s.askPrice, eg: s.egPrice, ok: true },
  ];
  const missed = asks.filter((a) => !a.ok).length;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
      style={{ background: "linear-gradient(140deg, #eef3fe 0%, #f3f7ea 58%, #fdf4e7 100%)" }}
    >
      <span aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full"
            style={{ background: "var(--sig-deep)", opacity: 0.13, filter: "blur(70px)" }} />
      <span aria-hidden className="pointer-events-none absolute -right-20 -bottom-24 h-56 w-56 rounded-full"
            style={{ background: "var(--sig-deep)", opacity: 0.13, filter: "blur(70px)" }} />

      <div className="relative grid gap-3.5">
        {/* The session, laid across rather than down: it shares a column with
            the heading now, so height is the scarce dimension. */}
        <div className="flex items-center gap-5 rounded-2xl bg-[rgb(var(--raise-rgb)/0.7)] px-5 py-4 shadow-sm backdrop-blur-sm">
          <span className="relative grid h-[5rem] w-[5rem] shrink-0 place-items-center">
            {/* Two rings, offset, so the pulse never fully clears. */}
            {[0, 1].map((k) => (
              <span
                key={k}
                aria-hidden
                className={`absolute inset-0 rounded-full ${reduced ? "" : "session-pulse"}`}
                style={{ background: "var(--sig-deep)", opacity: 0.18, animationDelay: `${k * 1.2}s` }}
              />
            ))}
            <span className="relative grid h-[3.5rem] w-[3.5rem] place-items-center rounded-full shadow-md"
                  style={{ background: "var(--sig-deep)" }}>
              <UserRound className="h-6 w-6 text-[color:var(--on-sig)]" aria-hidden />
            </span>
          </span>

          <ul className="grid min-w-0 flex-1 gap-1.5">
            {signals.map(({ Icon, label }, i) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[0.6875rem] font-semibold shadow-sm"
                style={{
                  color: C.mid,
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 360ms ${EASE}, transform 360ms ${EASE}`,
                  transitionDelay: `${240 + i * 110}ms`,
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--sig-deep)" }} aria-hidden />
                {label}
                {/* The beam sits on each signal, so it reads as this signal
                    arriving rather than as a stray rule under the card. */}
                <span aria-hidden className={`ml-auto h-1 w-8 rounded-full ${reduced ? "" : "beam-flow"}`}
                      style={{ background: "#dbe3f7" }} />
              </li>
            ))}
          </ul>
        </div>

        {/* What they asked, and what the shelf could answer. */}
        <div className="rounded-2xl bg-[rgb(var(--raise-rgb)/0.7)] px-5 py-4 shadow-sm backdrop-blur-sm">
          <p className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.16em] uppercase"
             style={{ color: C.mute }}>
            <Search className="h-3.5 w-3.5" aria-hidden />
            {s.whatTheyAsked}
          </p>

          <ul className="mt-3.5 space-y-2">
            {asks.map((a, i) => (
              <li
                key={a.label}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                style={{
                  background: a.ok ? "var(--sig-tint-2)" : "#fdeceb",
                  boxShadow: `inset 0 0 0 1.5px ${a.ok ? "var(--sig-deep)" : "#f0c4c0"}`,
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateX(0)" : "translateX(-10px)",
                  transition: `opacity 400ms ${EASE}, transform 400ms ${EASE}`,
                  transitionDelay: `${560 + i * 140}ms`,
                }}
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: a.ok ? "var(--sig-deep)" : "#b91c1c" }} aria-hidden>
                  {a.ok ? <Check className="h-3 w-3 text-[color:var(--on-sig)]" /> : <X className="h-3 w-3 text-[color:var(--on-sig)]" />}
                </span>
                <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
                  <span className="text-[0.8125rem] font-semibold" style={{ color: C.ink }}>{a.label}</span>
                  <span className="text-[0.6875rem]" style={{ color: C.mid }}>{a.eg}</span>
                </span>
                <span className="text-[0.6875rem] font-bold" style={{ color: a.ok ? "var(--sig-deep)" : "#b91c1c" }}>
                  {a.ok ? s.canFilter : s.cannotFilter}
                </span>
              </li>
            ))}
          </ul>

          {/* The count, not a sentence about the count. */}
          <p className="mt-3.5 flex items-center gap-2.5 text-[0.8125rem]" style={{ color: C.mid }}>
            <span className="ed-num rounded-md px-2 py-0.5 text-[0.8125rem] font-bold"
                  style={{ background: "#fdeceb", color: "#b91c1c" }}>
              {missed}/{asks.length}
            </span>
            {s.shopperNote}
          </p>
        </div>
      </div>
    </div>
  );
}
