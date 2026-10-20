"use client";

import { useLocale } from "next-intl";
import { Sparkles, Shirt, Laptop, Apple, Armchair, Cog, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "./Section";
import { blindSpot, type ShelfKey } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";
import { OrbitScene } from "./OrbitScene";

/**
 * Six categories, six missing filters, and one sentence.
 *
 * The previous version had a question per card, a label above the chips, three
 * chips each and a long closing paragraph: about 150 words to make a point that
 * takes twelve. A reader does not need six worked examples to understand that
 * the pattern is not about laptops; they need to see their own category in a
 * row and move on.
 *
 * The rule strikes through on scroll, one card after another. That is the whole
 * animation and it is the whole argument: the attribute exists, the filter does
 * not.
 */
const ICONS: Record<ShelfKey, LucideIcon> = {
  beauty: Sparkles, apparel: Shirt, electronics: Laptop,
  grocery: Apple, furniture: Armchair, parts: Cog,
};

export function ProblemSection() {
  const b = blindSpot(useLocale());
  const { ref, shown } = useInView<HTMLUListElement>();

  return (
    <Section tone="tint">
      <SectionHead eyebrow={b.eyebrow} title={b.title} body={b.body} />

      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:items-stretch lg:gap-14">
        <div className="flex"><OrbitScene /></div>
        <ul ref={ref} className="grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-1">
        {b.shelves.map((s, i) => {
          const Icon = ICONS[s.key];
          return (
            <li key={s.key} className="ed-rule flex items-center gap-4 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color:var(--brand-lav-100)]">
                <Icon className="h-4 w-4" style={{ color: "var(--accent-primary)" }} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.75rem] text-[color:var(--ed-ink-3)]">{s.name}</span>
                <span className="relative mt-0.5 inline-block text-[0.9375rem] font-semibold text-[color:var(--ed-ink)]">
                  {s.attr}
                  {/* Drawn rather than text-decoration, so it can sweep. */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-0 h-[2px] origin-left rounded-full"
                    style={{
                      width: "100%",
                      background: C.warn,
                      transform: shown ? "scaleX(1)" : "scaleX(0)",
                      transition: `transform 420ms ${EASE}`,
                      transitionDelay: `${i * 110 + 200}ms`,
                    }}
                  />
                </span>
              </span>
            </li>
          );
        })}
        </ul>
      </div>
    </Section>
  );
}
