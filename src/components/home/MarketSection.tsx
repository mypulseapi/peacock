"use client";

import { useLocale } from "next-intl";
import { Section, SectionHead } from "./Section";
import { market } from "@/content/home";
import { useInView, useCountUp } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Three cited figures, each drawn in the form its number actually wants.
 *
 * Three identical donuts would be decoration. A share of a whole is a donut, a
 * second share of a whole reads better as a unit grid so the two do not look
 * like the same chart twice, and a multiple over time is a pair of bars. The
 * form is chosen per job, which is the one rule that makes a set of charts
 * worth having.
 *
 * Hues checked as a categorical set on this surface: lightness band, chroma,
 * CVD separation (worst adjacent ΔE 16.2 deutan), normal-vision floor (18.8)
 * and contrast all pass.
 *
 * Every numeral is rendered in the markup and only zeroed on the client at the
 * moment it animates, so a crawler and a reader with reduced motion both get
 * the real figure rather than a nought.
 */
const HUES = ["#b91c1c", "#d97706", "var(--sig-deep)"] as const;

/** A share of a whole. The arc sweeps from twelve o'clock. */
function Donut({ pct, hue, shown }: { pct: number; hue: string; shown: boolean }) {
  const R = 52, CIRC = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 128 128" className="h-32 w-32" role="img" aria-label={`${pct}%`}>
      <circle cx="64" cy="64" r={R} fill="none" stroke={C.baseBg} strokeWidth="16" />
      <circle
        cx="64" cy="64" r={R} fill="none" stroke={hue} strokeWidth="16" strokeLinecap="round"
        transform="rotate(-90 64 64)"
        style={{
          strokeDasharray: CIRC,
          strokeDashoffset: shown ? CIRC * (1 - pct / 100) : CIRC,
          transition: `stroke-dashoffset 1100ms ${EASE} 120ms`,
        }}
      />
    </svg>
  );
}

/** The same kind of quantity, drawn a different way so the set is not repetitive. */
function Waffle({ pct, hue, shown }: { pct: number; hue: string; shown: boolean }) {
  const filled = Math.round(pct);
  return (
    <div className="grid w-32 gap-[3px]" style={{ gridTemplateColumns: "repeat(10,minmax(0,1fr))" }}
         role="img" aria-label={`${pct}%`}>
      {Array.from({ length: 100 }, (_, i) => (
        <span key={i} className="aspect-square rounded-[2px]"
              style={{
                background: shown && i < filled ? hue : C.baseBg,
                transition: `background-color 260ms ${EASE}`,
                transitionDelay: `${(i % 10) * 16 + Math.floor(i / 10) * 40}ms`,
              }} />
      ))}
    </div>
  );
}

/** A multiple, which is a change rather than a share. Two bars, one baseline. */
function Growth({ pct, hue, shown, baselineLabel, nowLabel }: {
  pct: number; hue: string; shown: boolean; baselineLabel: string; nowLabel: string;
}) {
  const now = 100 + pct;                 // index: last year = 100
  const h = (v: number) => (v / now) * 100;
  return (
    <div className="flex h-32 w-32 items-end gap-4" role="img" aria-label={`${pct}% growth`}>
      {[{ v: 100, c: C.hold, l: baselineLabel }, { v: now, c: hue, l: nowLabel }].map((b, i) => (
        <span key={b.l} className="flex h-full flex-1 flex-col justify-end gap-2">
          <span className="w-full rounded-t-md"
                style={{
                  height: shown ? `${h(b.v)}%` : "0%",
                  background: b.c,
                  transition: `height 900ms ${EASE}`,
                  transitionDelay: `${i * 150 + 120}ms`,
                }} />
          <span className="text-center text-[0.6875rem] font-medium" style={{ color: C.mute }}>{b.l}</span>
        </span>
      ))}
    </div>
  );
}

function Stat({ value, unit, label, source, href, i, baselineLabel, nowLabel }: {
  value: number; unit: string; label: string; source: string; href: string; i: number;
  baselineLabel: string; nowLabel: string;
}) {
  const { ref, shown, reduced } = useInView<HTMLLIElement>();
  const num = useCountUp(value, shown, reduced);
  const hue = HUES[i] ?? HUES[0];

  return (
    <li ref={ref} className="flex flex-col items-start">
      <div className="flex h-32 items-center">
        {i === 0 && <Donut pct={value} hue={hue} shown={shown} />}
        {i === 1 && <Waffle pct={value} hue={hue} shown={shown} />}
        {i === 2 && <Growth pct={value} hue={hue} shown={shown} baselineLabel={baselineLabel} nowLabel={nowLabel} />}
      </div>

      <span className="ed-num mt-8 block text-[clamp(2rem,3.4vw,2.75rem)] leading-[0.95] font-bold" style={{ color: hue }}>
        <span ref={num}>{value}</span>{unit}
      </span>
      <span className="mt-4 block max-w-[24ch] text-[1.0625rem] leading-snug text-[color:var(--ed-ink)]">{label}</span>
      <a href={href} target="_blank" rel="noopener noreferrer nofollow"
         className="mt-4 inline-flex min-h-[24px] items-center text-[0.8125rem] text-[color:var(--ed-ink-3)] underline underline-offset-4 transition hover:text-[color:var(--ed-ink)]">
        {source}
      </a>
    </li>
  );
}

export function MarketSection() {
  const m = market(useLocale());
  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={m.eyebrow} title={m.title} />
      <ul className="mt-12 grid gap-14 md:grid-cols-3 md:gap-10">
        {m.figures.map((f, i) => (
          <Stat key={f.label} {...f} i={i} baselineLabel={m.baselineLabel} nowLabel={m.nowLabel} />
        ))}
      </ul>
    </Section>
  );
}
