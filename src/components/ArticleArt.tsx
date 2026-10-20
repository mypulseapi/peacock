"use client";

import { C } from "@/components/charts/tokens";
import { useInView } from "@/components/charts/useInView";

/**
 * A hero image per article, drawn rather than photographed.
 *
 * Stock photography of somebody at a laptop says nothing about a piece on
 * attribute coverage, and it is the thing that makes a B2B blog look like every
 * other B2B blog. These are generative marks built from the article's own
 * subject: a grid with holes in it for a coverage piece, a rising curve for a
 * growth piece, two ranked columns for a disagreement piece.
 *
 * Each is keyed off the article slug so it is stable, recognisable as that
 * article's image, and free of an HTTP request. They animate once on scroll and
 * render static under reduced motion.
 */
export type ArtKind = "grid" | "rise" | "split" | "scan" | "stack" | "seal";

const HUE: Record<ArtKind, string> = {
  grid: C.warn, rise: C.work, split: C.warn, scan: C.work, stack: C.good, seal: C.good,
};

export function ArticleArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const hue = HUE[kind];

  return (
    <div
      ref={ref}
      className={`screen relative overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: "16 / 7" }}
      aria-hidden
    >
      <span
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 78% 12%, ${hue}1f 0%, transparent 62%)` }}
      />
      <svg viewBox="0 0 640 280" className="relative h-full w-full" preserveAspectRatio="xMidYMid slice">
        {kind === "grid" && (
          /* A shelf with holes in it. The holes are the subject. */
          Array.from({ length: 96 }, (_, i) => {
            const c = i % 16, r = Math.floor(i / 16);
            const hole = [5, 9, 18, 23, 34, 41, 52, 57, 66, 71, 80, 88].includes(i);
            return (
              <rect
                key={i} x={40 + c * 35} y={40 + r * 34} width={26} height={24} rx={4}
                fill={hole ? "none" : "#e8ebf0"}
                stroke={hole ? hue : "none"} strokeWidth={hole ? 1.6 : 0}
                strokeDasharray={hole ? "3 3" : undefined}
                style={{ opacity: shown ? 1 : 0, transition: "opacity 420ms ease", transitionDelay: `${i * 9}ms` }}
              />
            );
          })
        )}

        {kind === "rise" && (
          <>
            {[0, 1, 2].map((i) => (
              <line key={i} x1={40} x2={600} y1={80 + i * 60} y2={80 + i * 60} stroke="#eef0f4" strokeWidth="1" />
            ))}
            <path
              d="M40 220 C 160 214, 250 206, 330 190 S 470 120, 600 46"
              fill="none" stroke={hue} strokeWidth="3" strokeLinecap="round"
              style={{ strokeDasharray: 900, strokeDashoffset: shown ? 0 : 900, transition: "stroke-dashoffset 1400ms cubic-bezier(.22,.61,.36,1)" }}
            />
            <circle cx={600} cy={46} r={7} fill={hue} stroke="#fff" strokeWidth="3"
                    style={{ opacity: shown ? 1 : 0, transition: "opacity 300ms ease 1100ms" }} />
          </>
        )}

        {kind === "split" && (
          /* Two rankings that disagree, and the one row that crosses. */
          <>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={54} y={56 + i * 44} width={180} height={30} rx={6} fill={i === 3 ? `${C.warn}1a` : "#eef0f4"} />
                <rect x={406} y={56 + i * 44} width={180} height={30} rx={6} fill={i === 0 ? `${C.good}1f` : "#eef0f4"} />
              </g>
            ))}
            <path
              d="M242 200 C 300 200, 340 78, 398 78"
              fill="none" stroke={C.warn} strokeWidth="2.5" strokeLinecap="round"
              style={{ strokeDasharray: 400, strokeDashoffset: shown ? 0 : 400, transition: "stroke-dashoffset 1000ms cubic-bezier(.22,.61,.36,1) 200ms" }}
            />
          </>
        )}

        {kind === "scan" && (
          /* A field being read out of a line of text. */
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={54} y={62 + i * 34} rx={5} height={14}
                    width={[300, 420, 250, 380, 200][i]} fill="#e8ebf0" />
            ))}
            <rect x={54} y={96} width={92} height={14} rx={5} fill={hue}
                  style={{ opacity: shown ? 1 : 0, transition: "opacity 400ms ease 500ms" }} />
            <rect x={54} y={164} width={64} height={14} rx={5} fill={hue}
                  style={{ opacity: shown ? 1 : 0, transition: "opacity 400ms ease 700ms" }} />
            <rect
              x={40} width={2} y={34} height={212} fill={hue}
              style={{ transform: shown ? "translateX(520px)" : "translateX(0)", transition: "transform 1600ms cubic-bezier(.4,.1,.3,1)" }}
            />
          </>
        )}

        {kind === "stack" && (
          /* Bars filling, for a piece about measurement. */
          [0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={54} y={58 + i * 46} width={532} height={22} rx={11} fill="#eef0f4" />
              <rect
                x={54} y={58 + i * 46} height={22} rx={11} fill={i === 0 ? hue : C.base}
                width={shown ? [532, 340, 250, 150][i] : 0}
                style={{ transition: "width 900ms cubic-bezier(.22,.61,.36,1)", transitionDelay: `${i * 110}ms` }}
              />
            </g>
          ))
        )}

        {kind === "seal" && (
          /* A check inside a ring, for the honesty piece. */
          <>
            <circle cx={320} cy={140} r={74} fill="none" stroke="#e8ebf0" strokeWidth="10" />
            <circle
              cx={320} cy={140} r={74} fill="none" stroke={hue} strokeWidth="10" strokeLinecap="round"
              transform="rotate(-90 320 140)"
              style={{ strokeDasharray: 465, strokeDashoffset: shown ? 70 : 465, transition: "stroke-dashoffset 1300ms cubic-bezier(.22,.61,.36,1)" }}
            />
            <path
              d="M288 140 l22 22 l44 -46" fill="none" stroke={hue} strokeWidth="9"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 120, strokeDashoffset: shown ? 0 : 120, transition: "stroke-dashoffset 500ms ease 900ms" }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
