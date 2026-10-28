"use client";

/**
 * The Research page's findings as a journal grid (owner's pick, version 1 of five mockups, 28 Oct
 * 2026, after a reference of article cards): a search and the status chips, then a card per finding
 * in rows of two and three. No card is led large; the rows alternate, whatever the filter leaves.
 *
 * Each card: its drawing (`research-figures.tsx`, the owner's pictures replace them when they land),
 * the product and its status where the reference has a category and a date, the title, the finding
 * clamped to three lines, and the data and the limit behind one click, the limit in the amber
 * "missing" style. Opening it unclamps the finding. The search ignores Vietnamese accents.
 */
import { useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Finding, ResearchContent } from "@/content/pages/research";
import { ResearchFigure } from "./research-figures";

type Filter = "all" | Finding["status"];

const fold = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase();

/** Rows of two, then three, alternating; a lone last card joins the row before it. */
function spans(n: number) {
  const rows: number[] = [];
  for (let left = n, size = 2; left > 0; size = 5 - size) {
    rows.push(Math.min(size, left));
    left -= rows[rows.length - 1];
  }
  if (rows.length > 1 && rows[rows.length - 1] === 1) {
    rows.pop();
    const merged = rows.pop()! + 1;
    rows.push(...(merged === 4 ? [2, 2] : [merged]));
  }
  return rows.flatMap((size) => Array<number>(size).fill(size));
}

/** Full class names, so Tailwind sees them. */
const SPAN: Record<number, string> = {
  1: "lg:col-span-12",
  2: "lg:col-span-6",
  3: "lg:col-span-4",
};

function Status({
  status,
  label,
}: {
  status: Finding["status"];
  label: string;
}) {
  return (
    <span
      className={`whitespace-nowrap ${status === "measured" ? "badge-primary" : "badge missing-cell"}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}

export function ResearchIndex({
  findings,
  labels,
  heading,
  locale,
}: {
  findings: Finding[];
  labels: ResearchContent["labels"];
  heading: string;
  locale: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const q = fold(query.trim());
  const shown = findings.filter(
    (f) =>
      (filter === "all" || f.status === filter) &&
      (!q ||
        fold(`${f.product} ${f.title} ${f.body} ${f.data} ${f.limit}`).includes(
          q,
        )),
  );
  const size = spans(shown.length);
  const chips: { f: Filter; label: string }[] = [
    { f: "all", label: labels.all },
    { f: "measured", label: labels.measured },
    { f: "waiting", label: labels.waiting },
  ];
  return (
    <>
      <h2 className="reveal text-title text-balance">{heading}</h2>
      <div className="reveal mt-8 flex flex-wrap items-center gap-3">
        <label className="flex min-h-11 min-w-56 flex-1 items-center gap-2.5 rounded-xl border border-line-control bg-card px-3.5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus">
          <Search className="size-4.5 shrink-0 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            aria-label={labels.search}
            className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label={heading}>
          {chips.map(({ f, label }) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-surface-0"
            >
              {label}
              <span className="tabular-nums opacity-70">
                {f === "all"
                  ? findings.length
                  : findings.filter((x) => x.status === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {labels.count
          .replace("{shown}", String(shown.length))
          .replace("{total}", String(findings.length))}
      </p>
      {/* The list stays mounted when a search empties it: a remounted `.reveal` would wait for a
          scroll to be shown. */}
      <ul className="reveal mt-6 grid gap-5 empty:hidden md:grid-cols-12">
        {shown.map((f, i) => (
          <li
            key={f.title}
            className={`group flex flex-col gap-4 rounded-3xl border border-line bg-card p-4 transition-colors hover:border-primary-line md:col-span-6 ${SPAN[size[i]]}`}
          >
            <ResearchFigure
              figure={f.figure}
              waiting={f.status === "waiting"}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-1">
              <span className="text-sm font-semibold text-primary">
                {f.product}
              </span>
              <span className="h-3.5 w-px bg-line" aria-hidden />
              <Status status={f.status} label={labels[f.status]} />
            </div>
            <h3 className="px-1 text-lg leading-snug font-semibold text-balance text-ink">
              {f.title.replace(/\.\s*$/, "")}
            </h3>
            <p className="line-clamp-3 px-1 text-body text-pretty text-muted group-has-[details[open]]:line-clamp-none">
              {f.body}
            </p>
            <details className="px-1">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                {labels.dataAndLimit}
                <ChevronDown
                  className="size-4 text-primary transition-transform motion-reduce:transition-none [details[open]_&]:rotate-180"
                  aria-hidden
                />
              </summary>
              <dl className="mt-2 grid gap-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">{labels.data}</dt>
                  <dd className="mt-0.5 text-muted">{f.data}</dd>
                </div>
                <div className="missing-cell rounded-xl p-3.5">
                  <dt className="font-semibold">{labels.limit}</dt>
                  <dd className="mt-0.5 text-ink">{f.limit}</dd>
                </div>
              </dl>
            </details>
            <Link
              locale={locale}
              href={f.href}
              className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start px-1 text-sm font-semibold text-primary hover:underline"
            >
              {f.link}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && (
        <div className="mt-6 grid justify-items-center gap-4 rounded-3xl border border-dashed border-line-control px-6 py-14 text-center">
          <p className="text-body text-muted">{labels.noMatch}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-card px-4 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {labels.showAll}
          </button>
        </div>
      )}
    </>
  );
}
