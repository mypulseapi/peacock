"use client";

import { useState, type CSSProperties } from "react";
import { model, type Inputs } from "./calc";

/**
 * The interactive part of the calculator. Text arrives as props from the server component, because
 * `designedText` reads the locale from the static export's render store, which a client cannot.
 *
 * It opens filled in with an example store (owner, 2026-11-04: the gain has to be visible before
 * anyone types), labelled as an example, with a reset. The lift is the example's assumption and the
 * merchant's to change; the page never presents it as a Pulse result.
 *
 * The headline is the outcome, extra gross profit a month, with the lift slider directly under it,
 * so moving the lever moves the number the merchant cares about. The funnel breakdown sits below.
 * Currency is a two-option toggle, not a native select: a select's arrow and padding render
 * differently per browser, and two choices read faster as buttons.
 */
export interface CalculatorLabels {
  inputsTitle: string;
  exampleNote: string;
  reset: string;
  spend: string;
  visits: string;
  orders: string;
  aov: string;
  margin: string;
  currency: string;
  lift: string;
  liftNote: string;
  headline: string;
  headlineSub: string;
  resultsTitle: string;
  spendPerVisit: string;
  conversion: string;
  costPerOrder: string;
  revenuePerVisit: string;
  perTenthPoint: string;
  empty: string;
}

type Field = Exclude<keyof Inputs, "lift">;
type Currency = "USD" | "VND";
const FIELDS: Field[] = ["spend", "visits", "orders", "aov", "margin"];
const MONEY = new Set<Field>(["spend", "aov"]);

// ponytail: an illustrative store, not a benchmark; the VND set is the same store at about 25,000 VND
// per USD. Labelled "example" on the page, replaced by the merchant's own numbers.
const EXAMPLE: Record<Currency, Record<Field, number>> = {
  USD: {
    spend: 100_000,
    visits: 1_000_000,
    orders: 10_000,
    aov: 200,
    margin: 20,
  },
  VND: {
    spend: 2_500_000_000,
    visits: 1_000_000,
    orders: 10_000,
    aov: 5_000_000,
    margin: 20,
  },
};
const EXAMPLE_LIFT = 10;

export function Calculator({
  labels: t,
  locale,
}: {
  labels: CalculatorLabels;
  locale: string;
}) {
  const initial: Currency = locale === "vi" ? "VND" : "USD";
  const [currency, setCurrency] = useState<Currency>(initial);
  const [values, setValues] = useState<Record<Field, number>>(EXAMPLE[initial]);
  const [lift, setLift] = useState(EXAMPLE_LIFT);

  const isExample =
    lift === EXAMPLE_LIFT &&
    FIELDS.every((k) => values[k] === EXAMPLE[currency][k]);
  const ready = values.visits > 0 && values.orders > 0;
  const r = model({ ...values, lift });

  const tag = locale === "vi" ? "vi-VN" : "en-US";
  const num = (v: number, digits = 0) =>
    new Intl.NumberFormat(tag, { maximumFractionDigits: digits }).format(v);
  const money = (v: number) =>
    new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "VND" || Math.abs(v) >= 100 ? 0 : 2,
    }).format(v);
  const pct = (v: number) =>
    `${new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}%`;
  const symbol = currency === "USD" ? "$" : "₫";

  // Switching currency swaps the example for the same store in that currency; numbers the merchant
  // typed are theirs and are never converted behind their back.
  const switchTo = (c: Currency) => {
    if (c === currency) return;
    if (isExample) setValues(EXAMPLE[c]);
    setCurrency(c);
  };
  const reset = () => {
    setValues(EXAMPLE[currency]);
    setLift(EXAMPLE_LIFT);
  };

  const sub = [
    ["orders", num(r.extraOrders)],
    ["revenue", money(r.extraRevenue)],
    ["from", pct(r.conversion)],
    ["to", pct(r.liftedConversion)],
  ].reduce((s, [k, v]) => s.replace(`{${k}}`, v), t.headlineSub);

  const row = (label: string, value: string, strong = false) => (
    <li
      key={label}
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-t border-line py-2.5 first:border-t-0"
    >
      <span className="text-sm text-pretty text-muted">{label}</span>
      <span
        className={`ml-auto font-mono text-sm text-ink ${strong ? "font-semibold" : ""}`}
      >
        {ready ? value : "–"}
      </span>
    </li>
  );

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-card text-left shadow-sm lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Inputs */}
      <form className="p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">{t.inputsTitle}</h3>
          <div
            role="radiogroup"
            aria-label={t.currency}
            className="inline-flex rounded-full border border-line bg-surface-1 p-0.5"
          >
            {(["USD", "VND"] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={currency === c}
                onClick={() => switchTo(c)}
                className={`min-h-9 rounded-full px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                  currency === c
                    ? "bg-card text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          {isExample && <span className="badge">{t.exampleNote}</span>}
          {!isExample && (
            <button
              type="button"
              onClick={reset}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {t.reset}
            </button>
          )}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {FIELDS.map((k) => (
            <label
              key={k}
              className={`block ${k === "spend" ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}
            >
              <span className="text-sm font-medium text-ink">{t[k]}</span>
              <span className="relative mt-1.5 block">
                {MONEY.has(k) && (
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-mono text-sm text-muted">
                    {symbol}
                  </span>
                )}
                <input
                  className={`field font-mono ${MONEY.has(k) ? "pl-8" : ""} ${k === "margin" ? "pr-8" : ""}`}
                  inputMode="numeric"
                  autoComplete="off"
                  value={values[k] ? num(values[k]) : ""}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [k]: Number(e.target.value.replace(/\D/g, "")) || 0,
                    })
                  }
                />
                {k === "margin" && (
                  <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center font-mono text-sm text-muted">
                    %
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      </form>

      {/* Outcome */}
      <div
        className="flex flex-col border-t border-line bg-surface-1 p-6 sm:p-8 lg:border-t-0 lg:border-l"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-muted">{t.headline}</p>
        <p className="mt-1 font-display text-4xl font-semibold tracking-tight break-words text-ink sm:text-5xl xl:text-6xl">
          {ready ? `+${money(r.extraGrossProfit)}` : "–"}
        </p>
        <p className="mt-2 text-sm text-pretty text-muted">
          {ready ? sub : t.empty}
        </p>

        <label className="mt-6 block">
          <span className="flex items-baseline justify-between text-sm font-medium text-ink">
            {t.lift}
            <span className="font-mono text-base font-semibold text-primary">
              +{lift}%
            </span>
          </span>
          <input
            type="range"
            className="range-control"
            min={0}
            max={30}
            step={1}
            value={lift}
            style={{ "--range-fill": `${(lift / 30) * 100}%` } as CSSProperties}
            onChange={(e) => setLift(Number(e.target.value))}
          />
          <span className="flex justify-between font-mono text-xs text-muted">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
          </span>
          <span className="mt-2 block text-xs text-pretty text-muted">
            {t.liftNote}
          </span>
        </label>

        <div className="mt-6 rounded-2xl border border-line bg-card px-4 py-2">
          <p className="pt-2 text-xs font-semibold tracking-wide text-muted uppercase">
            {t.resultsTitle}
          </p>
          <ul className="mt-1">
            {row(t.spendPerVisit, money(r.spendPerVisit))}
            {row(t.conversion, pct(r.conversion))}
            {row(
              t.costPerOrder,
              `${money(r.costPerOrder)} → ${money(r.liftedCostPerOrder)}`,
            )}
            {row(t.revenuePerVisit, money(r.revenuePerVisit))}
            {row(t.perTenthPoint, money(r.perTenthPoint), true)}
          </ul>
        </div>
      </div>
    </div>
  );
}
