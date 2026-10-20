"use client";

import { UserRound, Store, FileText, Wallet, Hourglass } from "lucide-react";
import { Section, SectionHead } from "@/components/home/Section";
import { useInView, useCountUp } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Third-party figures on a story page.
 *
 * These pages argued entirely from our own measurement of one shelf. That is
 * honest and it is also a sample of one, and a reader who accepts every word
 * can still ask whether it generalises. Nothing here is ours: each figure
 * names its source and links to it.
 *
 * Same three hues as the homepage band, and the numeral ships in the markup so
 * a crawler sees it rather than an empty span.
 */
const HUES = ["#b91c1c", "#d97706", "var(--sig-deep)"] as const;

/**
 * Ten of the thing the percentage counts, so the figure is a picture and not
 * only a numeral. A percentage about shoppers draws shoppers; the band was
 * three coloured numbers on white and a reader had nothing to look at.
 */
const GLYPHS = { shopper: UserRound, store: Store, page: FileText, cost: Wallet, wait: Hourglass } as const;
export type Glyph = keyof typeof GLYPHS;

function Fig({ value, unit, label, source, href, glyph, i }: {
  value: number; unit: string; label: string; source: string; href: string; glyph?: Glyph; i: number;
}) {
  const { ref, shown, reduced } = useInView<HTMLLIElement>();
  const num = useCountUp(value, shown, reduced);
  const hue = HUES[i % HUES.length];
  const Glyph = GLYPHS[glyph ?? "shopper"];
  // Ten units, rounded. 38% lights four: the row is the order of magnitude,
  // and the numeral above it carries the precision.
  const lit = Math.round(value / 10);
  return (
    <li
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ${EASE}, transform 500ms ${EASE}`,
        transitionDelay: `${i * 110}ms`,
      }}
    >
      <span className="ed-num block text-[clamp(2rem,3.4vw,2.75rem)] leading-none font-bold" style={{ color: hue }}>
        <span ref={num}>{value}</span>{unit}
      </span>
      <span aria-hidden className="mt-4 flex gap-1.5">
        {Array.from({ length: 10 }, (_, k) => (
          <Glyph
            key={k}
            className="h-[1.375rem] w-[1.375rem]"
            style={{
              color: k < lit ? hue : "#d7dbe2",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0) scale(1)" : "translateY(4px) scale(0.85)",
              transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}, color 300ms ${EASE}`,
              transitionDelay: `${i * 110 + 260 + k * 55}ms`,
            }}
          />
        ))}
      </span>
      <span className="mt-4 block max-w-[26ch] text-[0.9375rem] leading-snug text-[color:var(--ed-ink)]">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-3 inline-flex min-h-[24px] items-center text-[0.8125rem] underline underline-offset-4 transition hover:text-[color:var(--ed-ink)]"
        style={{ color: C.mute }}
      >
        {source}
      </a>
    </li>
  );
}

export function EvidenceBand({ e }: {
  e: { eyebrow: string; heading: string; items: { value: number; unit: string; label: string; source: string; href: string; glyph?: Glyph }[] };
}) {
  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={e.eyebrow} title={e.heading} />
      <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
        {e.items.map((f, i) => <Fig key={f.label} {...f} i={i} />)}
      </ul>
    </Section>
  );
}
