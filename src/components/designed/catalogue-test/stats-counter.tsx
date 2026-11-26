"use client";

import { useEffect, useState } from "react";
import { testStats } from "@/lib/catalogue-test";

/**
 * The public counter (store-url-audit NLR § 9): counts spider produced, nothing estimated. Hidden
 * until there is something to count, so a new deployment never shows a row of zeros.
 */
export function StatsCounter({
  labels,
  locale,
  align = "center",
  quiet = false,
}: {
  labels: Record<string, string>;
  locale: string;
  align?: "center" | "start";
  /** Small type, as a footer line (variant D). */
  quiet?: boolean;
}) {
  const [s, setS] = useState<Awaited<ReturnType<typeof testStats>> | null>(
    null,
  );
  useEffect(() => {
    testStats()
      .then(setS)
      .catch(() => setS(null));
  }, []);
  if (!s || !s.storesTested) return null;
  const n = (v: number) =>
    new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(v);
  const items: [number, string][] = [
    // Gaps and products only: a small store count read as "nobody uses this" (2026-11-26).
    [s.gapsFound, labels.statGaps!],
    [s.productsChecked, labels.statProducts!],
  ];
  return (
    <dl
      className={`${quiet ? "" : "mt-6"} flex flex-wrap ${align === "start" ? "justify-start" : "justify-center"} gap-x-8 gap-y-2 text-sm`}
    >
      {items.map(([v, l]) => (
        <div key={l} className="flex items-baseline gap-1.5">
          <dt className="sr-only">{l}</dt>
          <dd
            className={`font-mono font-semibold text-ink tabular-nums ${quiet ? "text-sm" : "text-xl"}`}
          >
            {n(v)}
          </dd>
          <span aria-hidden="true" className="text-muted">
            {l}
          </span>
        </div>
      ))}
    </dl>
  );
}
