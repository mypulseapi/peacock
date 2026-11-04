"use client";

import { useState } from "react";
import { model, type Inputs } from "./calc";

/**
 * The interactive part of /calculator. Text arrives as props from the server component, because
 * `designedText` reads the locale from the static export's render store, which a client cannot.
 *
 * Every field starts empty: a pre-filled "typical" figure would be a number we cannot source, and
 * the page's point is that the merchant's own numbers are the only ones that matter. The lift starts
 * at 0 and is the merchant's assumption, labelled as such.
 */
export interface CalculatorLabels {
  inputsTitle: string;
  spend: string;
  visits: string;
  orders: string;
  aov: string;
  margin: string;
  currency: string;
  lift: string;
  liftNote: string;
  resultsTitle: string;
  spendPerVisit: string;
  conversion: string;
  costPerOrder: string;
  revenuePerVisit: string;
  perTenthPoint: string;
  liftTitle: string;
  liftedConversion: string;
  extraOrders: string;
  extraRevenue: string;
  extraGrossProfit: string;
  liftedCostPerOrder: string;
  empty: string;
}

type Field = Exclude<keyof Inputs, "lift">;
const FIELDS: Field[] = ["spend", "visits", "orders", "aov", "margin"];
const MONEY = new Set<Field>(["spend", "aov"]);

export function Calculator({
  labels: t,
  locale,
}: {
  labels: CalculatorLabels;
  locale: string;
}) {
  const [values, setValues] = useState<Record<Field, string>>({
    spend: "",
    visits: "",
    orders: "",
    aov: "",
    margin: "",
  });
  const [lift, setLift] = useState(0);
  const [currency, setCurrency] = useState<"USD" | "VND">(
    locale === "vi" ? "VND" : "USD",
  );

  // Grouping as people type it: 1,000,000 in English, 1.000.000 (decimal comma) in Vietnamese.
  const n = (k: Field) => {
    const raw =
      locale === "vi"
        ? values[k].replace(/\./g, "").replace(",", ".")
        : values[k].replace(/,/g, "");
    return Number(raw.replace(/[^\d.]/g, "")) || 0;
  };
  const ready = n("visits") > 0 && n("orders") > 0;
  const r = model({
    spend: n("spend"),
    visits: n("visits"),
    orders: n("orders"),
    aov: n("aov"),
    margin: n("margin"),
    lift,
  });

  const tag = locale === "vi" ? "vi-VN" : "en-US";
  const money = (v: number) =>
    new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "VND" || Math.abs(v) >= 100 ? 0 : 2,
    }).format(v);
  const num = (v: number, digits = 0) =>
    new Intl.NumberFormat(tag, { maximumFractionDigits: digits }).format(v);

  const row = (label: string, value: string) => (
    <li
      key={label}
      className="flex justify-between gap-4 border-t border-line py-3 first:border-t-0"
    >
      <span className="text-data text-pretty text-muted">{label}</span>
      <span className="shrink-0 font-mono text-sm font-semibold text-ink">
        {ready ? value : "–"}
      </span>
    </li>
  );

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <form
        className="rounded-2xl border border-line bg-card p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink">{t.inputsTitle}</h2>
          <label className="flex items-center gap-2 text-sm text-muted">
            {t.currency}
            <select
              className="field w-auto py-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "USD" | "VND")}
            >
              <option value="USD">USD</option>
              <option value="VND">VND</option>
            </select>
          </label>
        </div>
        <div className="mt-5 space-y-4">
          {FIELDS.map((k) => (
            <label key={k} className="block">
              <span className="text-sm font-medium text-ink">
                {t[k]}
                {MONEY.has(k) ? ` (${currency})` : ""}
              </span>
              <input
                className="field mt-1.5 font-mono"
                inputMode="decimal"
                autoComplete="off"
                value={values[k]}
                onChange={(e) => setValues({ ...values, [k]: e.target.value })}
              />
            </label>
          ))}
          <label className="block">
            <span className="flex justify-between text-sm font-medium text-ink">
              {t.lift}
              <span className="font-mono">+{lift}%</span>
            </span>
            <input
              type="range"
              className="range-control mt-2 w-full"
              min={0}
              max={30}
              step={1}
              value={lift}
              onChange={(e) => setLift(Number(e.target.value))}
            />
            <span className="mt-1 block text-xs text-pretty text-muted">
              {t.liftNote}
            </span>
          </label>
        </div>
      </form>

      <div className="flex flex-col gap-5" aria-live="polite">
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-semibold text-ink">{t.resultsTitle}</h2>
          {!ready && <p className="mt-2 text-sm text-muted">{t.empty}</p>}
          <ul className="mt-3">
            {row(t.spendPerVisit, money(r.spendPerVisit))}
            {row(t.conversion, `${num(r.conversion, 2)}%`)}
            {row(t.costPerOrder, money(r.costPerOrder))}
            {row(t.revenuePerVisit, money(r.revenuePerVisit))}
            {row(t.perTenthPoint, money(r.perTenthPoint))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-semibold text-ink">
            {t.liftTitle.replace("{lift}", String(lift))}
          </h2>
          <ul className="mt-3">
            {row(t.liftedConversion, `${num(r.liftedConversion, 2)}%`)}
            {row(t.extraOrders, `+${num(r.extraOrders)}`)}
            {row(t.extraRevenue, money(r.extraRevenue))}
            {row(t.extraGrossProfit, money(r.extraGrossProfit))}
            {row(t.liftedCostPerOrder, money(r.liftedCostPerOrder))}
          </ul>
        </div>
      </div>
    </div>
  );
}
