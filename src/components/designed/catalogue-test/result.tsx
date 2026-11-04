"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import type {
  Finding,
  RequirementResult,
  Teaser,
  TestState,
} from "@/lib/catalogue-test";

/**
 * The result, laid out like Pingdom's (owner, 2026-11-04): "Your results" with share, the number
 * tiles, the requirements graded in a table, one finding open as proof and the rest masked, then
 * every Pulse product as a card with what this test found for it and a button to subscribe, the
 * calculator on the merchant's own numbers, and the ask. Colourful by the owner's call: each
 * product has its own token, and the result badges use the success / warning / gap / critical set.
 */

type T = (k: string, v?: Record<string, string | number>) => string;

const BADGE: Record<RequirementResult, string> = {
  supported: "border-success-line bg-success-bg text-success",
  partial: "border-warning-line bg-warning-bg text-warning",
  buried: "border-gap bg-gap-fill text-gap-strong",
  insufficient: "border-critical-line bg-critical-bg text-critical",
};

/**
 * Every Pulse product, with the plan that includes it (rainbow `ODIN/product/PRICING.md` §3.2) and
 * its colour. `fixes` names the teaser's per-product count, where this test measures one.
 */
const PRODUCTS: {
  key: string;
  name: string;
  plan: "free" | "starter" | "growth" | "scale";
  accent: string;
  fixes?: string;
  href: string;
}[] = [
  {
    key: "audit",
    name: "Decision Audit",
    plan: "free",
    accent: "border-t-primary text-primary",
    fixes: "Decision Audit",
    href: "/en/product/decision-audit",
  },
  {
    key: "verification",
    name: "Decision Verification",
    plan: "starter",
    accent: "border-t-success text-success",
    href: "/en/product/decision-verification",
  },
  {
    key: "monitor",
    name: "Decision Monitor",
    plan: "starter",
    accent: "border-t-sky text-sky",
    href: "/en/product/decision-monitor",
  },
  {
    key: "returns",
    name: "Return Verification",
    plan: "starter",
    accent: "border-t-chart-second text-chart-second",
    href: "/en/product/return-verification",
  },
  {
    key: "visual",
    name: "Visual Evidence",
    plan: "starter",
    accent: "border-t-gap text-gap-strong",
    fixes: "Visual Evidence",
    href: "/en/product/visual-evidence",
  },
  {
    key: "api",
    name: "Decision API",
    plan: "growth",
    accent: "border-t-brand-indigo text-brand-indigo",
    fixes: "Decision API / MCP",
    href: "/en/product/decision-api",
  },
  {
    key: "promotions",
    name: "Promotion Audit",
    plan: "growth",
    accent: "border-t-signal text-signal-text",
    href: "/en/product/promotion-audit",
  },
  {
    key: "pages",
    name: "Pages",
    plan: "scale",
    accent: "border-t-chart-second text-chart-second",
    fixes: "Pages and merchandising",
    href: "/en/product/pages",
  },
  {
    key: "search",
    name: "Search",
    plan: "scale",
    accent: "border-t-primary text-primary",
    href: "/en/product/search",
  },
  {
    key: "recommendations",
    name: "Recommendations",
    plan: "scale",
    accent: "border-t-success text-success",
    href: "/en/product/recommendations",
  },
];

/** Masked findings shown as rows; the rest are counted in one line, so the list stays short. */
const MASKED_SHOWN = 5;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** An evidence finding's title in the page's language, from its fields; others as sent. */
function findingTitle(f: Finding, t: T, num: (n: number) => string) {
  const req = f.requirements?.[0];
  if (f.kind === "evidence" && req)
    return t("findingEvidence", {
      req: t(`req_${req}`),
      n: num(f.affected),
      of: num(f.of),
    });
  return f.title;
}

export function Result({
  teaser,
  state,
  t,
  num,
  id,
  locale,
  calculator,
  onReset,
}: {
  teaser: Teaser;
  state: TestState;
  t: T;
  num: (n: number) => string;
  id: string;
  locale: string;
  calculator: ReactNode;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const open = teaser.open;
  const title = useMemo(
    () => (open ? findingTitle(open, t, num) : ""),
    [open, t, num],
  );
  const href = (path: string) => path.replace(/^\/en(?=\/|$)/, `/${locale}`);
  const fixesOf = (name?: string) =>
    teaser.byProduct.find((p) => p.product === name);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const tiles = [
    {
      label: t("tileProducts"),
      value: num(teaser.tiles.productsTested),
      of: t("tileFound", { n: num(teaser.discovered) }),
    },
    {
      label: t("tileRequirements"),
      value: num(teaser.tiles.requirementsTested),
    },
    {
      label: t("tileFix"),
      value: num(teaser.tiles.productsToFix),
      of: t("tileOf", { n: num(teaser.tiles.productsTested) }),
    },
    {
      label: t("tileAgent"),
      value: num(teaser.tiles.questionsAnswerable),
      of: t("tileOf", { n: num(teaser.tiles.questions) }),
    },
  ];

  return (
    <div className="space-y-14">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-title">
            {t("resultsTitle", { domain: state.domain })}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={share}
              className="btn-secondary btn-sm"
            >
              {copied ? t("copied") : t("share")}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="btn-ghost btn-sm"
            >
              {t("testAnother")}
            </button>
          </div>
        </div>
        {teaser.stoppedAfter !== undefined && (
          <p className="mt-2 text-sm text-muted">
            {t("status_blocked", { n: teaser.stoppedAfter })}
          </p>
        )}
        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((x) => (
            <div
              key={x.label}
              className="rounded-xl border border-line bg-card p-5 text-center"
            >
              <dt className="text-sm text-pretty text-muted">{x.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
                {x.value}
              </dd>
              {x.of && <dd className="mt-1 text-xs text-muted">{x.of}</dd>}
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-ink">
          {t("requirementsTitle")}
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full text-left font-sans text-sm">
            <thead className="border-b border-line text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">{t("colResult")}</th>
                <th className="px-4 py-3 font-medium">{t("colRequirement")}</th>
                <th className="px-4 py-3 text-right font-medium">
                  {t("colSupported")}
                </th>
              </tr>
            </thead>
            <tbody>
              {teaser.requirements.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-line first:border-t-0"
                >
                  <td className="px-4 py-3">
                    <span className={`badge ${BADGE[r.result]}`}>
                      {t(`result_${r.result}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink">{t(`req_${r.id}`)}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink">
                    {num(r.counts.supported)} / {num(teaser.products)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {open && (
        <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-sm font-medium text-muted">{t("openTitle")}</p>
          <h3 className="mt-1 text-xl font-semibold text-pretty text-ink">
            {title}
          </h3>
          <ul className="mt-5 space-y-4">
            {open.examples.map((e) => (
              <li
                key={e.url}
                className="border-t border-line pt-4 first:border-t-0 first:pt-0"
              >
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {e.title || e.url}
                </a>
                <ul className="mt-2 space-y-1 text-sm">
                  {e.facts.map((f) => (
                    <li key={f.fact} className="flex flex-wrap gap-x-2">
                      <span className="text-muted">
                        {t(`fact_${slug(f.fact)}`)}:
                      </span>
                      <span className="text-ink">{t(`state_${f.state}`)}</span>
                      {f.value && (
                        <span className="font-mono text-xs text-muted">
                          &ldquo;{f.value.slice(0, 80)}&rdquo;
                        </span>
                      )}
                      {f.found && (
                        <span className="font-mono text-xs text-muted">
                          {t("pageSays", { v: f.found })}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{t("openCheck")}</p>
        </section>
      )}

      {teaser.masked.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-ink">
            {t("maskedTitle", { n: teaser.masked.length })}
          </h3>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-card">
            {teaser.masked.slice(0, MASKED_SHOWN).map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                {/* The finding's text is withheld by spider; the bar stands where it would be. */}
                <span
                  aria-hidden="true"
                  className="h-3 flex-1 rounded bg-surface-1 blur-[1px]"
                />
                <span className="shrink-0 text-sm text-muted">{m.product}</span>
                <span className="shrink-0 text-sm font-medium text-ink tabular-nums">
                  {t("maskedCount", { n: num(m.affected), of: num(m.of) })}
                </span>
              </li>
            ))}
            {teaser.masked.length > MASKED_SHOWN && (
              <li className="px-5 py-3 text-sm text-muted">
                {t("maskedMore", { n: teaser.masked.length - MASKED_SHOWN })}
              </li>
            )}
          </ul>
        </section>
      )}

      <section>
        <h3 className="text-title">{t("productsTitle")}</h3>
        <p className="mt-2 max-w-2xl text-pretty text-muted">
          {t("productsLede")}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRODUCTS.map((p) => {
            const f = fixesOf(p.fixes);
            return (
              <li
                key={p.key}
                className={`flex flex-col rounded-xl border border-t-4 border-line bg-card p-5 ${p.accent}`}
              >
                <a
                  href={href(p.href)}
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {p.name}
                </a>
                <p className="mt-1 text-sm text-pretty text-muted">
                  {t(`prod_${p.key}`)}
                </p>
                <div className="mt-4 min-h-14">
                  {f && f.fixes !== null ? (
                    <>
                      <p className="font-display text-3xl font-semibold">
                        {num(f.fixes)}
                      </p>
                      <p className="text-xs text-muted">
                        {t(`unit_${slug(p.fixes!)}`)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted">
                      {t(f ? "notChecked" : "inFullAudit")}
                    </p>
                  )}
                </div>
                <p className="mt-auto pt-4 text-xs font-medium text-ink">
                  {t(`plan_${p.plan}`)}
                </p>
                <a
                  href={`${SIGNUP_URL}${SIGNUP_URL.includes("?") ? "&" : "?"}plan=${p.plan}`}
                  className="btn-secondary btn-sm mt-2 justify-center"
                >
                  {t(p.plan === "free" ? "startFree" : "subscribe")}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-ink">{t("moneyTitle")}</h3>
        <p className="mt-1 text-sm text-pretty text-muted">
          {t("moneyLede", {
            n: num(teaser.tiles.productsToFix),
            of: num(teaser.tiles.productsTested),
          })}
        </p>
        <div className="mt-4">{calculator}</div>
      </section>

      <section className="rounded-xl border border-line bg-surface-1 p-6 text-center sm:p-8">
        <h3 className="text-xl font-semibold text-ink">
          {t("unlockTitle", { n: teaser.masked.length })}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-pretty text-muted">
          {t("unlockLede")}
        </p>
        <a
          href={`/${locale}/contact?ref=${id}`}
          className="btn-primary mt-5 inline-flex"
        >
          {t("unlock")}
        </a>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">
            {t("requestsTitle")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {teaser.requests.map((q) => (
              <li
                key={q.id}
                className="border-t border-line pt-2 first:border-t-0"
              >
                <p className="text-ink">&ldquo;{t(`ask_${q.id}`)}&rdquo;</p>
                <p className="text-muted">
                  {t("requestRow", { n: num(q.canRecommend), of: num(q.of) })}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink">{t("cannotTitle")}</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-pretty text-muted">
            <li>{t("cannotReturns")}</li>
            <li>{t("cannotPromo")}</li>
            <li>{t("cannotUplift")}</li>
            {!teaser.cannotSee.filtersRead && <li>{t("cannotFilters")}</li>}
            {teaser.cannotSee.unreadable > 0 && (
              <li>
                {t("cannotUnreadable", { n: teaser.cannotSee.unreadable })}
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
