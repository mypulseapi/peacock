"use client";

import { useLocale } from "next-intl";
import { Upload, ListOrdered, CheckCircle2, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "./Section";
import { steps } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { EASE } from "@/components/charts/tokens";

/**
 * Three steps, drawn as a sequence.
 *
 * These were three bordered boxes of text with a numeral in the corner, which
 * reads as a list rather than as a process: nothing said the second follows the
 * first. An icon per step and a rule that draws itself left to right on scroll
 * does, and it costs one element.
 *
 * The connector is hidden below lg, where the cards stack and a horizontal line
 * between them would be wrong.
 */
const ICONS: LucideIcon[] = [Upload, ListOrdered, CheckCircle2];

export function HowItWorksSection() {
  const locale = useLocale();
  const STEPS = steps(locale);
  const { ref, shown } = useInView<HTMLDivElement>();

  return (
    <Section>
      <SectionHead eyebrow={STEPS.eyebrow} title={STEPS.title} />

      <div ref={ref} className="relative mt-12">
        {/* The thread the three steps sit on. */}
        <span
          aria-hidden
          className="absolute top-[2.25rem] right-0 left-0 hidden h-px origin-left lg:block"
          style={{
            background: "var(--ed-line)",
            transform: shown ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 900ms ${EASE}`,
          }}
        />

        <ol className="relative grid gap-7 lg:grid-cols-3">
          {STEPS.items.map((s, i) => {
            const Icon = ICONS[i] ?? ListOrdered;
            return (
              <li
                key={s.n}
                className="ed-raise rounded-2xl border border-[color:var(--ed-line)] p-7 transition hover:border-[color:var(--brand-lav-300)]"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 480ms ${EASE}, transform 480ms ${EASE}`,
                  transitionDelay: `${i * 130 + 200}ms`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
                    <Icon className="h-5 w-5" style={{ color: "var(--accent-primary)" }} aria-hidden />
                  </span>
                  <span className="ed-eyebrow">{s.meta}</span>
                </div>
                <span className="ed-num mt-6 block text-[0.8125rem] font-bold tracking-wider text-[color:var(--accent-primary)]">
                  {s.n}
                </span>
                <h3 className="ed-d4 mt-2 text-[color:var(--ed-ink)]">{s.title}</h3>
                <p className="ed-body mt-4">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
