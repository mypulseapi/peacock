"use client";

import { useLocale } from "next-intl";
import { Section, SectionHead } from "./Section";
import { disagreement } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Two plans, two bars each. Roughly twenty words of prose.
 *
 * What was here explained that ranking by absence and ranking by demand
 * disagree, using processor at #3 versus #4 on a laptop shelf, across a long
 * lede, a caveat paragraph and two dense data cards. All true, and none of it
 * is a merchant's problem: nobody outside this building cares which ranking
 * function we use.
 *
 * Same evidence, stated as the thing it costs them. One plan touches twice as
 * many products and helps almost nobody; the other is the cheaper job and does
 * the work. The bars are the argument, so there is very little left to read.
 */
function Plan({
  label, effort, gain, effortLabel, gainLabel, max, tone, shown, delay,
}: {
  label: string; effort: number; gain: number; effortLabel: string; gainLabel: string;
  max: number; tone: "warn" | "good"; shown: boolean; delay: number;
}) {
  const hue = C[tone];
  return (
    <div className="rounded-2xl border border-[rgb(var(--veil-rgb)/0.15)] bg-[rgb(var(--veil-rgb)/0.06)] p-7 backdrop-blur-sm">
      <p className="text-[1.0625rem] font-semibold text-[color:var(--on-panel)]">{label}</p>

      <div className="mt-7 space-y-6">
        {[
          { k: effortLabel, v: effort, c: C.hold },
          { k: gainLabel, v: gain, c: hue },
        ].map((row, i) => (
          <div key={row.k}>
            <div className="mb-2.5 flex items-baseline justify-between gap-4">
              <span className="text-[0.875rem] text-[color:var(--on-panel-2)]">{row.k}</span>
              <span className="ed-num text-[1.5rem] leading-none font-bold" style={{ color: i ? hue : C.hold }}>
                {row.v}
              </span>
            </div>
            <span className="block h-2.5 overflow-hidden rounded-full bg-[rgb(var(--veil-rgb)/0.1)]">
              <span
                className="block h-full rounded-full"
                style={{
                  width: shown ? `${(row.v / max) * 100}%` : "0%",
                  background: row.c,
                  transition: `width 900ms ${EASE}`,
                  transitionDelay: `${delay + i * 140}ms`,
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DisagreementSection() {
  const d = disagreement(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();
  const max = Math.max(d.wrong.effort, d.wrong.gain, d.right.effort, d.right.gain);

  return (
    <Section tone="ink">
      <SectionHead eyebrow={d.eyebrow} title={d.title} body={d.body} invert />

      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-2">
        <Plan label={d.wrongLabel} effort={d.wrong.effort} gain={d.wrong.gain}
              effortLabel={d.effortLabel} gainLabel={d.gainLabel}
              max={max} tone="warn" shown={shown} delay={120} />
        <Plan label={d.rightLabel} effort={d.right.effort} gain={d.right.gain}
              effortLabel={d.effortLabel} gainLabel={d.gainLabel}
              max={max} tone="good" shown={shown} delay={320} />
      </div>

      <p className="mt-9 max-w-[62ch] text-[0.8125rem] leading-relaxed text-[color:var(--on-panel-3)]">{d.caveat}</p>
    </Section>
  );
}
