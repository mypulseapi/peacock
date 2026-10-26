"use client";

import { useLocale } from "next-intl";
import { AlertTriangle, Check } from "lucide-react";
import type { SectorAttribute } from "@/content/industries";
import { ui } from "@/content/locale";

/**
 * One figure, parameterised per sector, rather than six bespoke ones.
 *
 * What it draws is the disagreement the whole product rests on: coverage down
 * the left, whether a decision in this sector turns on that attribute down the
 * right. The rows that matter and are empty are the ones the audit surfaces,
 * and they are the ones a coverage report buries.
 *
 * Six hand-drawn figures would drift apart and say the same thing six ways.
 * The values come from each sector's own `attributes`, so the picture differs
 * by sector while the argument stays identical.
 */
const INK = "#16181d", MID = "#4c5563", MUTE = "#5f6773";
const GOOD = "var(--sig-deep)", WARN = "#b91c1c", WARN_BG = "#fdeceb";

export function SectorVisual({ attributes, caption }: { attributes: SectorAttribute[]; caption: string }) {
  const t = ui(useLocale());
  return (
    <figure className="screen overflow-hidden rounded-xl">
      <div className="screen-bar flex items-center gap-3 px-4 py-3">
        <span className="text-[0.875rem] font-bold" style={{ color: INK }}>{t.coverageVsDecision}</span>
        <span
          className="ml-auto rounded-md px-2.5 py-1 text-[0.75rem] font-bold"
          style={{ background: WARN_BG, color: WARN }}
        >
          {t.theGap}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="mb-2.5 flex items-center gap-3 text-[0.6875rem] font-semibold tracking-wider uppercase" style={{ color: MUTE }}>
          <span className="flex-1">{t.attribute}</span>
          <span className="w-[6.5rem] text-right">{t.recorded}</span>
          <span className="w-[5.5rem] text-right">{t.decidesIt}</span>
        </div>

        <ul className="space-y-1">
          {attributes.map((a) => {
            // The interesting row: a buyer decides on it and it is mostly absent.
            const urgent = a.decisive && a.coverage < 60;
            return (
              <li
                key={a.label}
                className="flex items-center gap-3 rounded-md px-2 py-2"
                style={{ background: urgent ? WARN_BG : "transparent" }}
              >
                <span
                  className="min-w-0 flex-1 truncate text-[0.8125rem]"
                  style={{ color: urgent ? INK : MID, fontWeight: urgent ? 700 : 500 }}
                >
                  {a.label}
                </span>

                <span className="flex w-[6.5rem] items-center justify-end gap-2">
                  <span className="inline-block h-2 w-14 overflow-hidden rounded-full" style={{ background: "#eef0f4" }}>
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${a.coverage}%`, background: urgent ? WARN : MUTE }}
                    />
                  </span>
                  <span className="ed-num w-8 text-right text-[0.75rem]" style={{ color: urgent ? WARN : MUTE }}>
                    {a.coverage}%
                  </span>
                </span>

                <span className="flex w-[5.5rem] justify-end">
                  {a.decisive ? (
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.6875rem] font-bold"
                      style={{ background: urgent ? "#fff" : "var(--sig-tint)", color: urgent ? WARN : GOOD }}
                    >
                      {urgent ? <AlertTriangle className="h-3 w-3" aria-hidden /> : <Check className="h-3 w-3" aria-hidden />}
                      {t.yes}
                    </span>
                  ) : (
                    <span className="text-[0.6875rem] font-semibold" style={{ color: MUTE }}>{t.no}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{caption}</p>
      </div>
    </figure>
  );
}
