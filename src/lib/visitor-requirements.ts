/**
 * B4: rank pages against what the visitor still has to decide.
 *
 * Computed locally, on purpose. The engine's inference is an upgrade to this, not its foundation,
 * for the same reason B5's configurator is deterministic first: a marketing site that reorders
 * itself only when an API is reachable is a site that stops working when the API is not. Everything
 * here is a pure function of the pages already read, so it is testable without a network.
 *
 * Checked by `scripts/check-intent-ranking.ts`, which runs in `build`.
 */

import {
  PAGE_CATALOGUE,
  lookupPage,
  type Audience,
  type ContentRequirement,
  type PageItem,
} from "./page-catalogue";

export type { ContentRequirement } from "./page-catalogue";


/** Every requirement in the vocabulary, derived rather than restated so it cannot fall behind. */
export const ALL_REQUIREMENTS: readonly ContentRequirement[] = Array.from(
  new Set(PAGE_CATALOGUE.flatMap((p) => p.decides)),
).sort();

/**
 * How much resolving a requirement is worth, in bits.
 *
 * Not a hand-tuned weight. A requirement that ten pages answer is nearly free to satisfy, and one
 * that a single page answers is the visit's bottleneck. That is exactly information content:
 * `-log2(pages resolving it / total pages)`. On the current site `what-it-costs` is resolved by one
 * page of 37 and scores 5.21 bits, against 1.89 for `what-it-does`.
 *
 * The consequence worth noting: the scarcest requirement is the one our own site is worst at
 * answering, so this ranking surfaces our own gaps rather than hiding them.
 */
export const REQUIREMENT_VALUE: Readonly<Record<string, number>> = Object.fromEntries(
  ALL_REQUIREMENTS.map((r) => {
    const resolving = PAGE_CATALOGUE.filter((p) => p.decides.includes(r)).length;
    return [r, -Math.log2(resolving / PAGE_CATALOGUE.length)];
  }),
);

/**
 * What the visitor said, when they disagreed with us.
 *
 * B6 lets them correct the inference, and a correction must outrank an inference or the panel is
 * decorative. `resolved` means "I already know this, stop offering it"; `open` means "I do want
 * this, even though you think a page I read covered it".
 */
export type RequirementOverride = "resolved" | "open";
export type Overrides = Readonly<Partial<Record<ContentRequirement, RequirementOverride>>>;

export interface VisitorState {
  /** Routes read this session, most recent last. */
  visited: readonly string[];
  /** Requirements those pages could resolve. */
  resolved: ReadonlySet<ContentRequirement>;
  /** What is still open. The thing B6 shows the visitor. */
  open: readonly ContentRequirement[];
  /** Whose pages they have been reading. `null` while it is still ambiguous. */
  audience: Audience | null;
  /** Requirements the visitor corrected us on, so B6 can show which are theirs rather than ours. */
  overrides: Overrides;
}

/**
 * Infer the audience from the pages read, and abstain while it is genuinely unclear.
 *
 * `any` pages are not evidence: almost every visitor passes through the homepage, so counting it
 * would make `any` win every time and the field would carry no information. Returning `null` rather
 * than guessing is A9's abstention applied to the smallest possible decision.
 */
function inferAudience(pages: PageItem[]): Audience | null {
  const counts = new Map<Audience, number>();
  for (const p of pages) {
    if (p.audience === "any") continue;
    counts.set(p.audience, (counts.get(p.audience) ?? 0) + 1);
  }
  if (counts.size === 0) return null;

  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  // A tie is not a winner. Two developer pages and two merchant pages is an unresolved question.
  if (ranked.length > 1 && ranked[0][1] === ranked[1][1]) return null;
  return ranked[0][0];
}

export function visitorStateFor(
  visited: readonly string[],
  overrides: Overrides = {},
): VisitorState {
  const pages = visited.map((r) => lookupPage(r)).filter((p): p is PageItem => Boolean(p));
  const resolved = new Set<ContentRequirement>(pages.flatMap((p) => p.decides));

  // Stated beats observed. The same precedence as A6's evidence hierarchy, at the smallest scale.
  for (const [req, verdict] of Object.entries(overrides) as [ContentRequirement, RequirementOverride][]) {
    if (verdict === "resolved") resolved.add(req);
    else resolved.delete(req);
  }

  return {
    visited,
    resolved,
    open: ALL_REQUIREMENTS.filter((r) => !resolved.has(r)),
    audience: inferAudience(pages),
    overrides,
  };
}

export interface RankedPage {
  page: PageItem;
  score: number;
  /** Which open requirements this page would close. Shown to the visitor by B6 */
  closes: ContentRequirement[];
}

/**
 * Rank the pages worth reading next.
 *
 * Score is the total information value of the open requirements a page would close, with a modest
 * bonus for matching the inferred audience. A page that closes nothing scores zero and is dropped
 * rather than shown with a low rank: offering a page that answers nothing outstanding is the
 * behaviour B4 exists to remove.
 */
export function rankNextPages(
  state: VisitorState,
  limit = 3,
  options: { excludeRoutes?: readonly string[] } = {},
): RankedPage[] {
  const seen = new Set([...state.visited, ...(options.excludeRoutes ?? [])]);
  const openSet = new Set(state.open);

  const ranked: RankedPage[] = [];
  for (const page of PAGE_CATALOGUE) {
    if (seen.has(page.route)) continue;
    // A dynamic route is a pattern, not a destination. Linking to `/blog/[slug]` would 404.
    if (page.route.includes("[")) continue;
    // Legal pages are found deliberately, never suggested.
    if (page.depth === "legal") continue;

    const closes = page.decides.filter((r) => openSet.has(r));
    if (closes.length === 0) continue;

    let score = closes.reduce((sum, r) => sum + REQUIREMENT_VALUE[r], 0);
    // Audience is a tie-breaker, not a filter: a developer may still want pricing.
    if (state.audience && page.audience === state.audience) score *= 1.25;

    ranked.push({ page, score, closes });
  }

  return ranked
    .sort((a, b) => b.score - a.score || a.page.route.localeCompare(b.page.route))
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Session storage. Per-visitor, per-browser, and never sent anywhere by this module.
// ---------------------------------------------------------------------------

const KEY = "pulse.visited";
const OVERRIDES_KEY = "pulse.requirement-overrides";
/** Enough to characterise a visit; beyond this the earliest pages say little about what is open. */
const MAX_VISITED = 30;

export function readVisited(): string[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    // Private mode, blocked storage, or corrupt JSON. An empty history is always a valid state.
    return [];
  }
}

export function recordVisit(route: string): string[] {
  const next = [...readVisited().filter((r) => r !== route), route].slice(-MAX_VISITED);
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage being unavailable must not stop the page rendering.
  }
  return next;
}

export function readOverrides(): Overrides {
  try {
    const raw = sessionStorage.getItem(OVERRIDES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, RequirementOverride> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      // Storage is the visitor's to edit. Validate rather than trust, or a hand-typed value
      // silently becomes a requirement that no page can ever close.
      if ((v === "resolved" || v === "open") && (ALL_REQUIREMENTS as string[]).includes(k)) {
        out[k] = v;
      }
    }
    return out;
  } catch {
    return {};
  }
}

/** Toggle one requirement between what we inferred and what the visitor says. */
export function setOverride(
  req: ContentRequirement,
  verdict: RequirementOverride | null,
): Overrides {
  const next = { ...readOverrides() };
  if (verdict === null) delete next[req];
  else next[req] = verdict;
  try {
    sessionStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
  } catch {
    // Same as recordVisit: unavailable storage must not stop the page working.
  }
  return next;
}
