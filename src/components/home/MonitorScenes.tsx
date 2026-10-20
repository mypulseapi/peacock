"use client";

import { useLocale } from "next-intl";
import { FileWarning, Rocket, UserMinus, TrendingDown, Bell } from "lucide-react";
import { monitor } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Scenes for Decision Monitor.
 *
 * Three deliberately different shapes, because the two pages before this one
 * already used a five-across chain, a two-track comparison and a memo. A
 * visitor walking the staircase should be able to tell the products apart by
 * their pictures alone.
 *
 * Every number here derives from the one figure the page already stated: 340
 * products arrived without processor data across a quarter, taking laptops
 * from 71 to 62. The weekly arrival rate and the four scope figures are
 * arithmetic on that, labelled as such, not a second claim.
 */

/**
 * A quarter of drift, and the two moments you could learn about it.
 *
 * Was thirteen flat bars at 55% opacity, which read as a generic chart rather
 * than a story: no axis, no week, and a muddy gold that said nothing. An area
 * chart with the two moments annotated on the curve itself puts the argument
 * where the eye already is, and the shaded region under it is the loss.
 *
 * Geometry is computed, not eyeballed: readiness 71 to 62 over 13 weeks mapped
 * into a 60-to-72 axis so a nine point fall reads as a fall.
 */
export function DriftScene() {
  const m = monitor(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();

  const W = 520, H = 190, PAD_T = 22, PAD_B = 30, PAD_X = 14, LO = 60, HI = 72;
  // Stepped, not a straight line. The three sharp falls are the three causes
  // named in the section below: a supplier export change, a rushed range, a
  // taxonomy owner leaving. A smooth slope would imply a steady process, and
  // the point of the page is that decay arrives in lumps nobody notices.
  const SERIES = [71.0, 68.0, 67.9, 67.8, 65.2, 65.1, 65.0, 64.9, 63.4, 63.2, 62.6, 62.3, 62.0];
  const WEEKS = SERIES.length;
  const pt = (i: number) =>
    [
      PAD_X + ((W - 2 * PAD_X) * i) / (WEEKS - 1),
      PAD_T + (H - PAD_T - PAD_B) * ((HI - SERIES[i]) / (HI - LO)),
    ] as const;
  const pts = Array.from({ length: WEEKS }, (_, i) => pt(i));
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} ${W - PAD_X},${H - PAD_B} ${PAD_X},${H - PAD_B}`;
  const [gx, gy] = pts[1];
  const [rx, ry] = pts[WEEKS - 1];

  return (
    <div ref={ref} className="rounded-3xl border border-[color:var(--ed-line)] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
          {m.readinessLabel}
        </p>
        <p className="ed-num text-[0.75rem] font-semibold" style={{ color: C.mute }}>{m.weeksLabel}</p>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label={m.driftNote}>
        <defs>
          <linearGradient id="drift-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A16207" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A16207" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line x1="0" y1={H - PAD_B} x2={W} y2={H - PAD_B} stroke="#eef0f4" strokeWidth="1" />

        <polygon points={area} fill="url(#drift-fill)"
                 style={{ opacity: shown ? 1 : 0, transition: `opacity 900ms ${EASE} 260ms` }} />
        <polyline
          points={line} fill="none" stroke="#A16207" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          pathLength={1}
          style={reduced ? undefined : {
            strokeDasharray: 1,
            strokeDashoffset: shown ? 0 : 1,
            transition: `stroke-dashoffset 1400ms ${EASE}`,
          }}
        />

        {/* Week 2: still recoverable. Week 13: the quarterly review. */}
        {[[gx, gy, "var(--sig-deep)"], [rx, ry, "#b91c1c"]].map(([x, y, hue], i) => (
          <g key={i} style={{ opacity: shown ? 1 : 0, transition: `opacity 420ms ${EASE} ${1100 + i * 220}ms` }}>
            <circle cx={x as number} cy={y as number} r="9" fill={hue as string} opacity="0.16" />
            <circle cx={x as number} cy={y as number} r="4.5" fill={hue as string} stroke="#fff" strokeWidth="2" />
          </g>
        ))}

        <text x={PAD_X} y={pts[0][1] - 10} fontSize="12" fontWeight="700" fill="var(--sig-deep)">71</text>
        <text x={W - PAD_X} y={pts[WEEKS - 1][1] - 10} fontSize="12" fontWeight="700" fill="#b91c1c"
              textAnchor="end">62</text>
        <text x={PAD_X} y={H - 8} fontSize="10" fontWeight="600" fill="#9aa1ad">{m.weekOne}</text>
        <text x={W - PAD_X} y={H - 8} fontSize="10" fontWeight="600" fill="#9aa1ad" textAnchor="end">
          {m.weekThirteen}
        </text>
      </svg>

      {/* The same fact, learned twice, three months apart. */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {[
          { Icon: Bell, t: m.wouldHaveSaid, hue: "var(--sig-deep)", bg: "var(--sig-tint-2)", border: "var(--sig-deep)" },
          { Icon: TrendingDown, t: m.noticedAt, hue: "#b91c1c", bg: "#fdeceb", border: "#f0c4c0" },
        ].map((x, i) => (
          <p
            key={x.t}
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[0.8125rem] font-semibold"
            style={{
              background: x.bg, color: x.hue, boxShadow: `inset 0 0 0 1.5px ${x.border}`,
              opacity: shown ? 1 : 0,
              transition: `opacity 460ms ${EASE}`, transitionDelay: `${1300 + i * 160}ms`,
            }}
          >
            <x.Icon className="h-4 w-4 shrink-0" aria-hidden />
            {x.t}
          </p>
        ))}
      </div>

      <p className="mt-4 text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{m.driftNote}</p>
    </div>
  );
}

/** Three ordinary events, one shelf. Converging, because nobody chose this. */
export function ThreeCausesScene() {
  const m = monitor(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();
  const ICONS = [FileWarning, Rocket, UserMinus] as const;

  return (
    <div ref={ref} className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_2.5rem_auto]">
      <ul className="grid gap-2.5">
        {m.causes.map((c: { k: string; v: string }, i: number) => {
          const Icon = ICONS[i];
          return (
            <li
              key={c.k}
              className="flex items-start gap-3 rounded-xl border border-[color:var(--ed-line)] bg-white px-4 py-3"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
                transitionDelay: `${i * 140}ms`,
              }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: "#fdf1dd" }}>
                <Icon className="h-4 w-4" style={{ color: "#A16207" }} aria-hidden />
              </span>
              <span>
                <span className="block text-[0.8125rem] font-bold" style={{ color: C.ink }}>{c.k}</span>
                <span className="block text-[0.75rem] leading-snug" style={{ color: C.mid }}>{c.v}</span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Where all three land. */}
      {/* Three lines meeting one point, so the convergence is drawn and not
          merely implied by two columns sitting near each other. */}
      <svg viewBox="0 0 40 120" className="hidden h-[7.5rem] w-10 sm:block" aria-hidden
           style={{ opacity: shown ? 1 : 0, transition: `opacity 500ms ${EASE} 520ms` }}>
        {[18, 60, 102].map((y) => (
          <path key={y} d={`M0 ${y} C 20 ${y}, 20 60, 38 60`} fill="none"
                stroke="#e4c98f" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <circle cx="38" cy="60" r="3" fill="#b91c1c" />
      </svg>

      <div
        className="justify-self-center rounded-2xl px-6 py-5 text-center sm:justify-self-end"
        style={{
          background: "#fdeceb", boxShadow: "inset 0 0 0 1.5px #f0c4c0",
          opacity: shown ? 1 : 0,
          transition: `opacity 520ms ${EASE}`, transitionDelay: "620ms",
        }}
      >
        <TrendingDown className="mx-auto h-6 w-6" style={{ color: "#b91c1c" }} aria-hidden />
        <p className="ed-num mt-2 text-[2rem] leading-none font-bold" style={{ color: "#b91c1c" }}>{m.causesOut}</p>
        <p className="mt-1.5 text-[0.6875rem] font-semibold" style={{ color: C.mid }}>{m.causesOutLabel}</p>
      </div>
    </div>
  );
}

/** The same defect, priced by when you find it. */
export function DecayCostScene() {
  const m = monitor(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();
  // 26.15 products a week, from the 340-over-a-quarter figure the page states.
  const steps = [
    { ...m.costSteps[0], n: 26, w: 4, hue: "var(--sig-deep)", bg: "var(--sig-tint)" },
    { ...m.costSteps[1], n: 105, w: 15, hue: "#A16207", bg: "#fdf1dd" },
    { ...m.costSteps[2], n: 340, w: 50, hue: "#c2410c", bg: "#fdefe6" },
    { ...m.costSteps[3], n: 680, w: 100, hue: "#b91c1c", bg: "#fdeceb" },
  ];

  return (
    <div ref={ref}>
      {/* The count sits outside the bar, so the bar can be a true proportion.
          With the number inside it needed a minimum width, and a floor on the
          small bars flattened 26 against 680 into barely three to one. */}
      <ul className="grid max-w-[58rem] gap-2.5">
        {steps.map((s, i) => (
          <li key={s.when} className="grid items-center gap-x-4 gap-y-1 sm:grid-cols-[4.5rem_3.25rem_minmax(0,1fr)_17rem]">
            <span className="text-[0.8125rem] font-bold" style={{ color: C.ink }}>{s.when}</span>
            <span className="ed-num text-right text-[0.9375rem] font-bold" style={{ color: s.hue }}>{s.n}</span>
            <span className="flex h-8 items-center">
              <span
                className="h-full rounded-lg"
                style={{
                  width: shown ? `${s.w}%` : "0%",
                  background: s.bg,
                  boxShadow: `inset 0 0 0 1.5px ${s.hue}`,
                  transition: `width 900ms ${EASE}`,
                  transitionDelay: `${i * 170}ms`,
                }}
              />
            </span>
            <span className="text-[0.75rem] leading-snug" style={{ color: C.mid }}>{s.cost}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[64ch] text-[0.8125rem] leading-relaxed" style={{ color: C.mute }}>{m.costNote}</p>
    </div>
  );
}
