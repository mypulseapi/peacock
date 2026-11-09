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
}: {
  labels: Record<string, string>;
  locale: string;
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
    [s.storesTested, labels.statStores!],
    [s.productsChecked, labels.statProducts!],
    [s.requirementsTested, labels.statRequirements!],
    [s.gapsFound, labels.statGaps!],
  ];
  return (
    <dl className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
      {items.map(([v, l]) => (
        <div key={l} className="flex items-baseline gap-1.5">
          <dt className="sr-only">{l}</dt>
          <dd className="font-mono font-semibold text-ink">{n(v)}</dd>
          <span aria-hidden="true" className="text-muted">
            {l}
          </span>
        </div>
      ))}
    </dl>
  );
}
