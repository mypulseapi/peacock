import { PAGE_CATALOGUE, type PageItem } from "./page-catalogue"
import { fold, parseRequirement, type ParseResult } from "./requirement-parser"

/**
 * B8: a soft landing for an English message the parser does not recognise.
 *
 * `NLR-PLAN.md` §2.5 specifies the layering, and the layering is the whole design:
 *
 * ```
 * message -> extract()        deterministic, returns typed requirements
 *         -> (not understood)
 *         -> nearest page     similarity, not structure
 *         -> (nothing close)
 *         -> abstain, with a reason
 * ```
 *
 * **The parser stays the spine, and this cannot touch it.** Similarity gives you "which existing
 * page is nearest", which is a different and much weaker question than "what does this visitor
 * require". No score yields `RAM = 32GB` as a constraint a catalogue can be filtered on, so a
 * match here is a routing hint and never a requirement.
 *
 * ## Why this ships without the encoder
 *
 * §2.5 decided on `Xenova/all-MiniLM-L6-v2`, and B8 sat `gated` on the investment that model
 * represents. The part that was actually gated is the encoder. **The layering and the locale
 * guard are neither expensive nor optional**, and leaving them unwritten meant the guard existed
 * only as a paragraph, which is exactly how "English only for now" becomes "Vietnamese gets
 * noise" the first time someone wires a fallback in a hurry.
 *
 * So the encoder is an interface with a zero-dependency default, and swapping MiniLM in is the
 * one-line change §2.5 says it should be. `lexicalNearest` answers the same weak question by
 * token overlap against each page's own vocabulary. It is worse than embeddings at paraphrase
 * and identical in every other respect that matters here, including being unable to produce a
 * requirement.
 */

/** What a page is "about", for matching. Derived, never hand-written, so it cannot go stale. */
function vocabularyOf(page: PageItem): string[] {
  return [
    ...page.route.split(/[/-]/),
    ...page.decides.flatMap((d) => d.split("-")),
    page.area,
    page.audience,
    page.depth,
  ]
    .map((t) => fold(t))
    .filter((t) => t.length > 2)
}

const VOCABULARY: ReadonlyArray<{ page: PageItem; tokens: Set<string> }> = PAGE_CATALOGUE.map(
  (page) => ({ page, tokens: new Set(vocabularyOf(page)) }),
)

export interface NearestPage {
  route: string
  /** 0 to 1. Not a probability, and never presented as one. */
  score: number
}

/**
 * An encoder: message in, nearest page out, or null when nothing is close enough.
 *
 * The seam §2.5 asks for. A MiniLM implementation satisfies this signature and replaces the
 * default without any caller changing.
 */
export type Encoder = (message: string) => NearestPage | null

/**
 * Below this, "nearest" is not near. Returning the least-bad page for an unrelated message is
 * the confident-wrong-answer failure the whole design is arranged to avoid.
 */
export const MIN_SCORE = 0.2

/** The zero-dependency default. Token overlap, normalised by the message's own length. */
export const lexicalNearest: Encoder = (message) => {
  const tokens = fold(message)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)
  if (tokens.length === 0) return null

  let best: NearestPage | null = null
  for (const { page, tokens: pageTokens } of VOCABULARY) {
    let hits = 0
    for (const t of tokens) if (pageTokens.has(t)) hits++
    const score = hits / tokens.length
    if (score > (best?.score ?? 0)) best = { route: page.route, score }
  }
  return best && best.score >= MIN_SCORE ? best : null
}

export type FallbackResult =
  | { kind: "matched"; requirement: ParseResult extends { kind: "matched" } ? never : never }
  | { kind: "parsed"; result: Extract<ParseResult, { kind: "matched" | "ambiguous" }> }
  | { kind: "nearest"; page: NearestPage }
  | { kind: "abstain"; reason: "empty" | "not-english" | "nothing-close" }

/**
 * Route a message: parse first, fall back to nearest page, abstain last.
 *
 * `locale` decides the path and decides it here, in code. §2.5 is explicit that Vietnamese is
 * **not** degraded into a worse version of the English path: it gets the deterministic parser,
 * which is the stronger half anyway, and an honest refusal when that does not recognise the
 * message. A Vietnamese message put through an English encoder would not fail, it would embed to
 * noise and route confidently to the wrong page, which is the same silent-wrongness class as the
 * `đ` folding bug.
 */
export function route(
  message: string,
  locale: string,
  encoder: Encoder = lexicalNearest,
): FallbackResult {
  const parsed = parseRequirement(message)
  if (parsed.kind === "matched" || parsed.kind === "ambiguous") {
    return { kind: "parsed", result: parsed }
  }
  if (parsed.reason === "empty") return { kind: "abstain", reason: "empty" }

  // The guard. Not a convention, and asserted in the suite.
  if (!isEnglish(locale)) return { kind: "abstain", reason: "not-english" }

  const page = encoder(message)
  return page ? { kind: "nearest", page } : { kind: "abstain", reason: "nothing-close" }
}

/** English only, and `en-GB` counts. Anything else takes the deterministic path and abstains. */
export const isEnglish = (locale: string): boolean => /^en(-|$)/i.test(locale.trim())

/** What to tell the visitor. Each reason names the limit rather than apologising for it. */
export const ABSTENTION_MESSAGE: Record<
  Extract<FallbackResult, { kind: "abstain" }>["reason"],
  string
> = {
  empty: "Tell us what you are trying to decide and we will point you at the page for it.",
  "not-english":
    "We could not match that to a page. Our matching only runs in English, and guessing in " +
    "another language would send you somewhere confidently wrong.",
  "nothing-close":
    "Nothing on this site is close enough to that to be worth sending you to. Ask us directly " +
    "rather than reading the nearest thing.",
}
