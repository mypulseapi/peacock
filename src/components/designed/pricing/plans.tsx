/**
 * The plans, in USD (2026-11-04: every price is quoted and paid in USD).
 *
 * The amounts are rainbow's `ODIN/product/PRICING.md` §3.7, v0.4, printed by
 * `scripts/pricing-unit-margin.py`, which refuses any price below a 40% margin on cost to serve.
 * Change a price there first, then here, or the page and the invoice disagree. A private price for
 * one organisation is applied at checkout and never appears on this page.
 */
import { designedText } from "../t";

// [key, USD a month (Enterprise is "from"), calls included, Visual Evidence products included]
const PLANS = [
  ["free", "0", "", ""],
  ["starter", "349", "10,000", "1,000"],
  ["growth", "990", "100,000", "5,000"],
  ["scale", "2,390", "2,500,000", "25,000"],
  ["enterprise", "6,990", "10,000,000", "100,000"],
] as const;
const EXTRAS = ["extra1", "extra2", "extra3", "extra4", "extra5"] as const;

export function PlansSection() {
  const t = designedText("pricing.plans");
  return (
    <section id="plans" className="scroll-mt-24 border-b border-line">
      <div className="frame py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal text-title text-balance">{t("title")}</h2>
          <p className="reveal mt-3 text-body text-pretty text-muted delay-100">
            {t("lede")}
          </p>
        </div>
        <ul className="reveal mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-5 delay-100 sm:grid-cols-2 lg:grid-cols-5">
          {PLANS.map(([key, usd, calls, products]) => (
            <li
              key={key}
              className="flex flex-col rounded-2xl border border-line bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{t(`${key}Name`)}</h3>
              <p className="mt-3">
                {key === "enterprise" && (
                  <span className="block text-sm text-muted">{t("from")}</span>
                )}
                <span className="text-h2 font-semibold text-ink">${usd}</span>
                <span className="text-sm text-muted"> {t("perMonth")}</span>
              </p>
              <p className="mt-2 text-data text-pretty text-muted">
                {t(`${key}For`)}
              </p>
              <ul className="mt-4 space-y-2 text-data text-ink">
                {calls && (
                  <li>
                    {calls} {t("calls")}
                  </li>
                )}
                {products && (
                  <li>
                    {products} {t("products")}
                  </li>
                )}
                <li>{t(`${key}Includes`)}</li>
              </ul>
            </li>
          ))}
        </ul>
        <div className="reveal mx-auto mt-8 max-w-[1000px] rounded-2xl border border-line bg-card p-6 delay-100">
          <p className="text-sm font-semibold text-primary">{t("extrasHead")}</p>
          <ul className="mt-3">
            {EXTRAS.map((k) => {
              const [what, price] = t(k).split(" | ");
              return (
                <li
                  key={k}
                  className="flex justify-between gap-4 border-t border-line py-3 text-data first:border-t-0"
                >
                  <span className="text-pretty text-muted">{what}</span>
                  <span className="shrink-0 font-semibold text-ink">{price}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="reveal mx-auto mt-6 max-w-2xl text-center text-sm text-pretty text-muted">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
