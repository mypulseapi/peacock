"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, RotateCcw, X } from "lucide-react";
import { visitorStateFor, type ContentRequirement } from "@/lib/visitor-requirements";
import { correct, useVisitor } from "@/lib/visitor-store";
import { RequirementConfigurator } from "./RequirementConfigurator";

/**
 * B6: show the visitor the inference, and let them disagree with it.
 *
 * The disagreement is the product. A panel that only displays what we concluded is a gimmick; one
 * where a correction visibly changes what the site offers next is the whole pitch delivered without
 * a sales call. So every row here is a control, and `visitorStateFor` gives a stated correction
 * precedence over an inference, which is A6's evidence hierarchy at the smallest possible scale.
 *
 * It also abstains out loud. When the audience is genuinely ambiguous it says so rather than
 * guessing, which is A9 made visible to someone who has never heard of A9.
 */

export function IntentPanel() {
  const t = useTranslations("intentPanel");
  const tReq = useTranslations("nextBest.requirements");
  const [expanded, setExpanded] = useState(false);
  const { visited, overrides } = useVisitor();

  const state = visitorStateFor(visited, overrides);

  function toggle(req: ContentRequirement, currentlyOpen: boolean) {
    // Clicking the same correction twice returns the row to whatever we inferred, rather than
    // stacking a second override the visitor cannot see or undo.
    const existing = overrides[req];
    const wanted = currentlyOpen ? "resolved" : "open";
    correct(req, existing === wanted ? null : wanted);
  }

  function resetAll() {
    for (const req of Object.keys(overrides) as ContentRequirement[]) correct(req, null);
  }

  // Nothing read yet means nothing honest to show.
  if (visited.length === 0) return null;

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-[var(--sig-line)] bg-[var(--panel-1)] px-4 py-2 text-sm font-medium text-[var(--on-panel)] shadow-lg transition-colors hover:bg-[var(--sig-tint)]"
      >
        {t("open")}
        {state.open.length > 0 && (
          <span className="ml-2 rounded-full bg-[var(--sig)] px-2 py-0.5 text-xs font-semibold text-[var(--on-sig)]">
            {state.open.length}
          </span>
        )}
      </button>
    );
  }

  const answered = [...state.resolved].sort();

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-4 right-4 z-40 flex max-h-[80vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-[var(--chrome-line)] bg-[var(--panel-1)] shadow-2xl"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[var(--chrome-line)] p-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--on-panel)]">{t("title")}</h2>
          <p className="mt-1 text-xs text-[var(--on-panel-3)]">{t("intro")}</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label={t("close")}
          className="rounded-md p-1 text-[var(--on-panel-3)] transition-colors hover:bg-[var(--panel-3)] hover:text-[var(--on-panel)]"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div className="overflow-y-auto p-4 text-sm">
        <p className="text-[var(--on-panel-2)]">
          {t("audienceLabel")}:{" "}
          <span className={state.audience ? "font-medium text-[var(--on-panel)]" : "italic"}>
            {state.audience ? t(`audience.${state.audience}`) : t("audienceUnknown")}
          </span>
        </p>

        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--on-panel-3)]">
          {t("stillOpen")}
        </h3>
        {state.open.length === 0 ? (
          <p className="mt-1 text-[var(--on-panel-3)]">{t("noneOpen")}</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {state.open.map((req) => (
              <li key={req}>
                <button
                  type="button"
                  onClick={() => toggle(req, true)}
                  title={t("markAnswered")}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[var(--on-panel)] transition-colors hover:bg-[var(--sig-tint)]"
                >
                  <span>{tReq(req)}</span>
                  {overrides[req] === "open" && (
                    <span className="text-xs text-[var(--on-panel-3)]">{t("yours")}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--on-panel-3)]">
          {t("answered")}
        </h3>
        {answered.length === 0 ? (
          <p className="mt-1 text-[var(--on-panel-3)]">{t("noneAnswered")}</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {answered.map((req) => (
              <li key={req}>
                <button
                  type="button"
                  onClick={() => toggle(req, false)}
                  title={t("markOpen")}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[var(--on-panel-2)] transition-colors hover:bg-[var(--sig-tint)]"
                >
                  <span className="flex items-center gap-2">
                    <Check className="size-3.5 text-[var(--sig)]" aria-hidden />
                    {tReq(req)}
                  </span>
                  {overrides[req] === "resolved" && (
                    <span className="text-xs text-[var(--on-panel-3)]">{t("yours")}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-[var(--on-panel-3)]">{t("disagree")}</p>

        {/* B5: the configurator, rendered here. The chat is one renderer of it. */}
        <RequirementConfigurator state={state} />

        {Object.keys(overrides).length > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[var(--sig)] hover:underline"
          >
            <RotateCcw className="size-3" aria-hidden />
            {t("reset")}
          </button>
        )}
      </div>
    </div>
  );
}
