"use client";

/**
 * The Research page's index (owner's version 3, 27 Oct 2026): every finding but the featured one,
 * a line each, with chips to show the measured ones or the ones waiting on a merchant.
 *
 * The whole row is the `<summary>`, so a click anywhere on it opens the finding, not only on its
 * title (owner, 27 Oct 2026). Open, it shows the finding, its data and its limit, the limit in the
 * amber "missing" style.
 */
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Finding, ResearchContent } from "@/content/pages/research";

type Filter = "all" | Finding["status"];

export function Status({
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
  const chips: { f: Filter; label: string }[] = [
    { f: "all", label: labels.all },
    { f: "measured", label: labels.measured },
    { f: "waiting", label: labels.waiting },
  ];
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="reveal text-title text-balance">{heading}</h2>
        <div
          className="reveal flex flex-wrap gap-2"
          role="group"
          aria-label={heading}
        >
          {chips.map(({ f, label }) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-surface-0"
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
      <ul className="reveal mt-8 border-t border-line">
        {findings.map((f) => (
          <li
            key={f.title}
            hidden={filter !== "all" && f.status !== filter}
            className="border-b border-line"
          >
            <details className="group">
              <summary className="-mx-4 grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_1.25rem] gap-x-5 gap-y-2 rounded-xl px-4 py-5 transition-colors hover:bg-primary-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:grid-cols-[10rem_minmax(0,1fr)_auto_1.25rem] md:items-center [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-semibold text-muted">
                  {f.product}
                </span>
                <h3 className="col-start-1 text-lg leading-snug font-semibold text-balance text-ink md:col-start-auto">
                  {f.title.replace(/\.\s*$/, "")}
                </h3>
                <span className="col-start-1 md:col-start-auto">
                  <Status status={f.status} label={labels[f.status]} />
                </span>
                <ChevronDown
                  className="col-start-2 row-start-1 size-5 self-center text-primary transition-transform group-open:rotate-180 md:col-start-auto md:row-start-auto"
                  aria-hidden
                />
              </summary>
              <div className="grid gap-5 pt-1 pb-7 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8 md:pl-[11.25rem]">
                <div className="grid content-start gap-3">
                  <p className="text-body text-pretty text-muted">{f.body}</p>
                  <Link
                    locale={locale}
                    href={f.href}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {f.link}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <dl className="grid content-start gap-3 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">{labels.data}</dt>
                    <dd className="mt-0.5 text-muted">{f.data}</dd>
                  </div>
                  <div className="missing-cell rounded-xl p-3.5">
                    <dt className="font-semibold">{labels.limit}</dt>
                    <dd className="mt-0.5 text-ink">{f.limit}</dd>
                  </div>
                </dl>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
