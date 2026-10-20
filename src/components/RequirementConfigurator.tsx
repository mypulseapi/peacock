"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { AlertTriangle, ArrowRight, HelpCircle } from "lucide-react";
import { PAGE_CATALOGUE, type ContentRequirement } from "@/lib/page-catalogue";
import {
  contradicts,
  nextQuestion,
  parseRequirement,
  type ParseResult,
} from "@/lib/requirement-parser";
import { REQUIREMENT_VALUE, type VisitorState } from "@/lib/visitor-requirements";
import { correct } from "@/lib/visitor-store";

/**
 * B5: the requirement configurator, rendered inside B6's panel.
 *
 * "Chat is one renderer of it", per NLR-PLAN §2.4, and this is the first renderer: a single input
 * and a derived next question. The state machine is the parser plus the visitor state; nothing here
 * holds conversation history, because a configurator that remembers what you said three turns ago
 * is a chat, and a chat on a marketing site becomes a support bot by default.
 *
 * What it can do is exactly four things: name the next question, resolve an answer to a
 * requirement, state a contradiction, or refuse with a reason. There is deliberately no path that
 * answers a question in prose, because that is the drift the plan warns about.
 */

/** The page that best resolves a requirement: fewest competing duties, so the most on-point. */
function pageFor(requirement: ContentRequirement): string | null {
  const candidates = PAGE_CATALOGUE.filter(
    (p) => p.decides.includes(requirement) && !p.route.includes("[") && p.depth !== "legal",
  );
  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => a.decides.length - b.decides.length)[0].route;
}

export function RequirementConfigurator({ state }: { state: VisitorState }) {
  const t = useTranslations("configurator");
  const tReq = useTranslations("nextBest.requirements");
  const tPage = useTranslations("nextBest.pages");
  const locale = useLocale();

  const [input, setInput] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  /** Set when the visitor asks about something they previously told us was settled. */
  const [conflict, setConflict] = useState<ContentRequirement | null>(null);

  const suggested = nextQuestion(state.open);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = parseRequirement(input);
    setResult(parsed);
    setConflict(
      parsed.kind === "matched" && contradicts(parsed.requirement, state.resolved, state.overrides)
        ? parsed.requirement
        : null,
    );
  }

  function href(route: string) {
    return `/${locale}${route === "/" ? "" : route}`;
  }

  return (
    <div className="mt-4 border-t border-[var(--chrome-line)] pt-4">
      {suggested && (
        <p className="text-xs text-[var(--on-panel-3)]">
          {t("nextQuestion")}:{" "}
          <span className="font-medium text-[var(--on-panel-2)]">{tReq(suggested)}</span>{" "}
          <span className="tabular-nums">({REQUIREMENT_VALUE[suggested].toFixed(1)} bits)</span>
        </p>
      )}

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="configurator-input">
          {t("prompt")}
        </label>
        <input
          id="configurator-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 rounded-md border border-[var(--chrome-line)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--on-panel)] placeholder:text-[var(--on-panel-3)] focus:border-[var(--sig)] focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-[var(--sig)] px-3 py-2 text-sm font-medium text-[var(--on-sig)] transition-opacity hover:opacity-90"
        >
          {t("submit")}
        </button>
      </form>

      {result && (
        <div className="mt-3 text-sm">
          {/* A contradiction is stated and handed back, never resolved on the visitor's behalf. */}
          {conflict ? (
            <div className="rounded-md border border-[var(--sig-line)] bg-[var(--sig-tint)] p-3">
              <p className="flex items-start gap-2 text-[var(--on-panel)]">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--sig)]" aria-hidden />
                {t("contradiction")}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    correct(conflict, "open");
                    setConflict(null);
                  }}
                  className="rounded-md bg-[var(--sig)] px-2.5 py-1 text-xs font-medium text-[var(--on-sig)]"
                >
                  {t("reopen")}
                </button>
                <button
                  type="button"
                  onClick={() => setConflict(null)}
                  className="rounded-md border border-[var(--chrome-line)] px-2.5 py-1 text-xs font-medium text-[var(--on-panel-2)]"
                >
                  {t("keepClosed")}
                </button>
              </div>
            </div>
          ) : result.kind === "matched" ? (
            (() => {
              const route = pageFor(result.requirement);
              if (!route) return <p className="text-[var(--on-panel-2)]">{t("refusedUnknown")}</p>;
              return (
                <Link
                  href={href(route)}
                  className="flex items-center justify-between gap-2 rounded-md border border-[var(--sig-line)] bg-[var(--sig-tint)] px-3 py-2 font-medium text-[var(--on-panel)]"
                >
                  <span>
                    {t("goTo")}: {tPage(route)}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-[var(--sig)]" aria-hidden />
                </Link>
              );
            })()
          ) : result.kind === "ambiguous" ? (
            <div>
              <p className="flex items-start gap-2 text-[var(--on-panel-2)]">
                <HelpCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t("ambiguous")}
              </p>
              <ul className="mt-2 space-y-1">
                {result.candidates.map((c) => {
                  const route = pageFor(c);
                  return route ? (
                    <li key={c}>
                      <Link
                        href={href(route)}
                        className="block rounded-md px-2 py-1 text-[var(--on-panel)] hover:bg-[var(--sig-tint)]"
                      >
                        {tReq(c)}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          ) : (
            /* Refusal, with the reason. A9 in public. */
            <p className="text-[var(--on-panel-2)]">
              {result.reason === "empty" ? t("refusedEmpty") : t("refusedUnknown")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
