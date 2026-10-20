"use client";

import { useLocale } from "next-intl";
import { scenes } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { C, EASE } from "@/components/charts/tokens";

/**
 * Two hundred fields, and the twenty that matter.
 *
 * The situation section made its case in three paragraphs ending on "you need
 * to be told which twenty fields out of two hundred to do first". That is a
 * picture, and it was being spelled out instead: 203 words, no figure, no icon,
 * no motion, on a page whose other sections average seventy.
 *
 * So the pull quote is the illustration. Two hundred cells settle in as a grey
 * field, then twenty light: the ones a decision actually turns on. The rest
 * stay, because the argument is not that the others are worthless, it is that
 * they are not where you start.
 */
const TOTAL = 200;
/** Scattered rather than clustered: a real catalogue's useful fields are not contiguous. */
const PICKED = new Set([3, 11, 18, 27, 34, 46, 52, 61, 73, 84, 96, 108, 117, 129, 138, 147, 159, 168, 181, 193]);

export function FieldGridScene() {
  const s = scenes(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl px-6 py-9 sm:px-9 sm:py-11"
      style={{ background: "linear-gradient(145deg, #f4f6fd 0%, #f2f7e8 100%)" }}
    >
      <span aria-hidden className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full"
            style={{ background: "var(--sig-deep)", opacity: 0.12, filter: "blur(70px)" }} />

      <div className="relative">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
            {s.fieldsInSchema}
          </p>
          <p className="ed-num text-[0.8125rem] font-semibold" style={{ color: C.mute }}>{TOTAL}</p>
        </div>

        <div
          className="mt-5 grid gap-[5px]"
          style={{ gridTemplateColumns: "repeat(25, minmax(0,1fr))" }}
          role="img"
          aria-label={s.fieldGridAlt(PICKED.size, TOTAL)}
        >
          {Array.from({ length: TOTAL }, (_, i) => {
            const hit = PICKED.has(i);
            return (
              <span
                key={i}
                className="aspect-square rounded-[2px]"
                style={{
                  background: shown && hit ? "var(--sig-deep)" : "#dfe3ec",
                  boxShadow: shown && hit ? "0 0 0 2px rgb(77 124 15 / 0.18)" : "none",
                  transform: shown && hit ? "scale(1.25)" : "scale(1)",
                  transition: `background-color 320ms ${EASE}, transform 320ms ${EASE}, box-shadow 320ms ${EASE}`,
                  // The grey field lands first, then the twenty light in order.
                  transitionDelay: hit ? `${700 + [...PICKED].indexOf(i) * 55}ms` : `${(i % 25) * 8}ms`,
                }}
              />
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2.5">
          <span className="flex items-center gap-2.5 text-[0.8125rem]" style={{ color: C.ink }}>
            <span className="h-3 w-3 rounded-[2px]" style={{ background: "var(--sig-deep)" }} aria-hidden />
            <strong className="font-semibold">{s.worthDoingFirst}</strong>
          </span>
          <span className="flex items-center gap-2.5 text-[0.8125rem]" style={{ color: C.mid }}>
            <span className="h-3 w-3 rounded-[2px]" style={{ background: "#dfe3ec" }} aria-hidden />
            {s.everythingElse}
          </span>
        </div>
      </div>
    </div>
  );
}
