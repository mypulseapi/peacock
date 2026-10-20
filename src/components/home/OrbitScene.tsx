"use client";

import { useLocale } from "next-intl";
import { Sparkles, Shirt, Laptop, Apple, Armchair, Cog, Check, X } from "lucide-react";
import { blindSpot } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { EASE } from "@/components/charts/tokens";

/**
 * The shelf at the centre, the questions orbiting it.
 *
 * Built in the reference's illustration language rather than our chart one:
 * a saturated ground, dotted orbit rings, category bubbles sitting on them and
 * pill chips floating over the edge. Our figures elsewhere are deliberately
 * thin and recessive because they carry data and the dataviz rules apply. This
 * one carries an idea, so it is allowed to be loud.
 *
 * The idea: some questions your catalogue can answer, and the ones that decide
 * the sale it cannot. Green ticks are price and brand, which every catalogue
 * records. The crossed ones are the attributes from the six categories below.
 *
 * Rings rotate slowly; nothing with text on it rotates. Everything stops under
 * reduced motion, where the scene renders at its final state.
 */
/** Six points on a circle, kept well inside the box so nothing clips. */
const BUBBLES = [
  { Icon: Sparkles, x: 50, y: 13 },
  { Icon: Shirt, x: 78, y: 30 },
  { Icon: Laptop, x: 78, y: 70 },
  { Icon: Apple, x: 50, y: 87 },
  { Icon: Armchair, x: 22, y: 70 },
  { Icon: Cog, x: 22, y: 30 },
];

export function OrbitScene() {
  const b = blindSpot(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();

  // Two answerable, four not. The chips sit outside the rings on purpose: the
  // catalogue is the middle, the questions are what surrounds it.
  const chips = [
    { label: b.answerable[0], ok: true, pos: "top-[7%] left-[6%]" },
    { label: b.shelves[0].attr, ok: false, pos: "top-[22%] right-[6%]" },
    { label: b.shelves[2].attr, ok: false, pos: "bottom-[24%] left-[5%]" },
    { label: b.answerable[1], ok: true, pos: "bottom-[8%] right-[8%]" },
  ];

  return (
    <div
      ref={ref}
      className="relative grid min-h-[26rem] w-full flex-1 place-items-center overflow-hidden rounded-3xl p-6"
      style={{ background: "var(--panel-0)" }}
    >
      {/*
        One square stage for everything.

        The rings were an SVG with a fixed square viewBox, which letterboxes and
        centres itself inside a non-square box, while the HTML bubbles centred
        on the box itself. The two centres did not coincide, so the shelf sat
        visibly left of the orbit it was supposed to be the middle of. Both now
        share this square, so there is only one centre to get wrong.
      */}
      <div className="relative aspect-square w-full max-w-[26rem]">
      {/* Orbit rings. Dashed circles, slow counter-rotation, no text. */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <g style={{ transformOrigin: "200px 200px", animation: reduced ? undefined : "orbit-cw 70s linear infinite" }}>
          <circle cx="200" cy="200" r="178" fill="none" stroke="var(--sig)" strokeOpacity="0.32"
                  strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: reduced ? undefined : "orbit-ccw 50s linear infinite" }}>
          <circle cx="200" cy="200" r="126" fill="none" stroke="#ffc95c" strokeOpacity="0.42"
                  strokeWidth="3" strokeLinecap="round" strokeDasharray="1 12" />
        </g>
      </svg>

      {/* The shelf, centred by a grid overlay rather than by left-1/2 plus a
          -50% translate. That arithmetic put it 71px off in both axes and was
          not worth debugging twice. */}
      <div className="absolute inset-0 grid place-items-center">
      <div
        className="grid aspect-square w-[34%] place-items-center rounded-full px-4 text-center"
        style={{
          background: "var(--sig)",
          opacity: shown ? 1 : 0,
          transform: `scale(${shown ? 1 : 0.86})`,
          transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
        }}
      >
        <span>
          <span className="ed-num block text-[clamp(1.375rem,3vw,2rem)] leading-none font-bold text-[color:var(--on-sig)]">216</span>
          <span className="mt-1 block text-[clamp(0.625rem,1.4vw,0.8125rem)] leading-tight font-semibold text-[color:var(--on-sig)]/70">
            {b.centreLabel}
          </span>
        </span>
      </div>
      </div>

      {/* Category bubbles on the inner orbit. */}
      {BUBBLES.map(({ Icon, x, y }, i) => (
        <span
          key={i}
          className="absolute grid aspect-square w-[12%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{
            left: `${x}%`, top: `${y}%`,
            background: "rgb(255 255 255 / 0.1)",
            border: "1px solid rgb(255 255 255 / 0.16)",
            opacity: shown ? 1 : 0,
            transform: `translate(-50%,-50%) scale(${shown ? 1 : 0.7})`,
            transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
            transitionDelay: `${260 + i * 90}ms`,
          }}
          aria-hidden
        >
          <Icon className="h-[46%] w-[46%] text-[color:var(--sig)]" />
        </span>
      ))}

      {/* Floating chips: what the shelf can and cannot answer. */}
      {chips.map((c, i) => (
        <span
          key={c.label}
          className={`absolute inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[clamp(0.6875rem,1.5vw,0.875rem)] font-semibold shadow-lg ${c.pos}`}
          style={{
            background: c.ok ? "var(--sig)" : "#ffffff",
            color: c.ok ? "var(--on-sig)" : "#b91c1c",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 460ms ${EASE}, transform 460ms ${EASE}`,
            transitionDelay: `${820 + i * 130}ms`,
          }}
        >
          {c.ok ? <Check className="h-3.5 w-3.5" aria-hidden /> : <X className="h-3.5 w-3.5" aria-hidden />}
          <span style={{ textDecoration: c.ok ? "none" : "line-through" }}>{c.label}</span>
        </span>
      ))}
      </div>
    </div>
  );
}
