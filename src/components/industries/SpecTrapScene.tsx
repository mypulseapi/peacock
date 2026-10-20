"use client";

import { FileText, Filter, X, Check } from "lucide-react";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * The fact exists. It is just not somewhere a filter can reach.
 *
 * Every sector page argues this and none of them drew it. The coverage table
 * shows how much is missing and the ranked chart shows which attribute to fix,
 * but neither shows the actual defect: the value is sitting in a sentence, and
 * a shopper filtering on it gets nothing.
 *
 * Built from the sector's own decisive attributes rather than hardcoded, so the
 * same component says "thread size" on distribution and "skin type" on beauty,
 * and it localises because the labels come from the localised content module.
 */
export function SpecTrapScene({
  attributes,
  proseLabel,
  fieldLabel,
  noteLabel,
}: {
  attributes: readonly { label: string; coverage: number; decisive: boolean }[];
  proseLabel: string;
  fieldLabel: string;
  noteLabel: string;
}) {
  const { ref, shown } = useInView<HTMLDivElement>();
  // The decisive ones are the argument; the rest are already filterable.
  const decisive = attributes.filter((a) => a.decisive).slice(0, 3);
  if (decisive.length === 0) return null;

  return (
    <div ref={ref} className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Where the value actually is. */}
      <div className="flex flex-col rounded-2xl border border-[color:var(--ed-line)] bg-white p-6">
        <p className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] uppercase"
           style={{ color: C.mute }}>
          <FileText className="h-3.5 w-3.5" aria-hidden />
          {proseLabel}
        </p>

        <div className="mt-4 flex flex-1 flex-col justify-center rounded-xl p-4" style={{ background: "#faf9f7" }}>
          {[0, 1, 2, 3].map((i) => {
            const spec = decisive[i];
            return (
              <p key={i} className="mb-2 flex flex-wrap items-center gap-1.5 last:mb-0">
                <span className="inline-block h-2 rounded-full"
                      style={{ width: i % 2 ? "3.5rem" : "5rem", background: "#e4e6ea" }} />
                {spec && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[0.75rem] font-semibold"
                    style={{
                      background: "#fdf1dd",
                      color: "#A16207",
                      boxShadow: shown ? "inset 0 0 0 1.5px #A16207" : "inset 0 0 0 0 #A16207",
                      transition: `box-shadow 420ms ${EASE}`,
                      transitionDelay: `${240 + i * 160}ms`,
                    }}
                  >
                    {spec.label}
                  </span>
                )}
                <span className="inline-block h-2 rounded-full"
                      style={{ width: i % 2 ? "4.5rem" : "2.5rem", background: "#e4e6ea" }} />
              </p>
            );
          })}
        </div>
      </div>

      {/* Where a buyer goes looking for it. */}
      <div className="rounded-2xl border border-[color:var(--ed-line)] bg-white p-6">
        <p className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] uppercase"
           style={{ color: C.mute }}>
          <Filter className="h-3.5 w-3.5" aria-hidden />
          {fieldLabel}
        </p>

        <ul className="mt-4 space-y-2">
          {decisive.map((a, i) => (
            <li
              key={a.label}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
              style={{
                background: "#fdeceb",
                boxShadow: "inset 0 0 0 1.5px #f0c4c0",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(8px)",
                transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
                transitionDelay: `${420 + i * 150}ms`,
              }}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: "#b91c1c" }}>
                <X className="h-3 w-3 text-[color:var(--on-sig)]" aria-hidden />
              </span>
              <span className="flex-1 text-[0.8125rem] font-semibold" style={{ color: C.ink }}>{a.label}</span>
              <span className="ed-num text-[0.75rem] font-bold" style={{ color: "#b91c1c" }}>{a.coverage}%</span>
            </li>
          ))}
          {/* the one that is already a field, for contrast */}
          {attributes
            .filter((a) => !a.decisive)
            .slice(0, 1)
            .map((a) => (
              <li
                key={a.label}
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                style={{
                  background: "var(--sig-tint)",
                  boxShadow: "inset 0 0 0 1.5px var(--sig-deep)",
                  opacity: shown ? 1 : 0,
                  transition: `opacity 420ms ${EASE}`,
                  transitionDelay: "900ms",
                }}
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: "var(--sig-deep)" }}>
                  <Check className="h-3 w-3 text-[color:var(--on-sig)]" aria-hidden />
                </span>
                <span className="flex-1 text-[0.8125rem] font-semibold" style={{ color: C.ink }}>{a.label}</span>
                <span className="ed-num text-[0.75rem] font-bold" style={{ color: "var(--sig-deep)" }}>{a.coverage}%</span>
              </li>
            ))}
        </ul>

        <p className="mt-4 text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{noteLabel}</p>
      </div>
    </div>
  );
}
