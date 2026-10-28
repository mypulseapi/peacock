"use client";

/**
 * The Research page's findings as editorial rows (owner's pick, version 3 of three mockups, 28 Oct
 * 2026): a search and the status chips, then one finding per row, its picture beside it, divided by
 * hairlines rather than boxed in cards. The eye runs down one column of titles.
 *
 * Each row: the owner's picture (`research-pictures.tsx`), the product and its status, the title, the
 * whole finding, and the data and the limit side by side, always shown rather than behind a click,
 * the limit in the amber "missing" style. The search ignores Vietnamese accents.
 */
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Finding, ResearchContent } from "@/content/pages/research";
import { ResearchPicture } from "./research-pictures";

type Filter = "all" | Finding["status"];

const fold = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase();

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
      <ul className="reveal mt-6 border-t border-line empty:hidden">
        {shown.map((f) => (
          <li
            key={f.title}
            className="grid items-center gap-5 border-b border-line py-7 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-8"
          >
            <ResearchPicture
              figure={f.figure}
              alt={f.alt}
              waiting={f.status === "waiting"}
            />
            <div className="grid gap-2.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-sm font-semibold text-primary">
                  {f.product}
                </span>
                <Status status={f.status} label={labels[f.status]} />
              </div>
              <h3 className="text-h3 text-balance text-ink">
                {f.title.replace(/\.\s*$/, "")}
              </h3>
              <p className="text-body text-pretty text-muted">{f.body}</p>
              <dl className="mt-1 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-ink">{labels.data}</dt>
                  <dd className="mt-0.5 text-muted">{f.data}</dd>
                </div>
                <div className="missing-cell rounded-xl p-3.5">
                  <dt className="font-semibold">{labels.limit}</dt>
                  <dd className="mt-0.5 text-ink">{f.limit}</dd>
                </div>
              </dl>
              <Link
                locale={locale}
                href={f.href}
                className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-primary hover:underline"
              >
                {f.link}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
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
