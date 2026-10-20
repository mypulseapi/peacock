import { ALL_REQUIREMENTS, REQUIREMENT_VALUE } from "./visitor-requirements";
import type { ContentRequirement } from "./page-catalogue";

/**
 * B5: turn what a visitor typed into a requirement, deterministically.
 *
 * No model. Alias tables and a scoring rule, for the reason NLR-PLAN §2.4 gives: a parser with
 * alias tables covers the intents a B2B site actually receives, it is testable, and a model is an
 * upgrade to this function rather than its foundation. It also cannot invent a requirement that
 * does not exist, which a model can and would.
 *
 * The two behaviours that matter more than coverage:
 *
 *   - It **abstains on a tie**. Two requirements matched equally is an unresolved question, not a
 *     coin flip, and answering a question the visitor did not ask is worse than admitting it.
 *   - It **refuses with a reason**. "I have no page that answers that" is A9 in public, and
 *     NLR-PLAN calls it the most persuasive thing on the site.
 *
 * Checked by `scripts/check-requirement-parser.ts`, which runs in `build`.
 */

export type ParseResult =
  | { kind: "matched"; requirement: ContentRequirement; matched: string[] }
  | { kind: "ambiguous"; candidates: ContentRequirement[] }
  | { kind: "unmatched"; reason: "empty" | "no-alias" };

/**
 * Aliases per requirement, in both locales the site serves.
 *
 * Vietnamese is folded to unaccented lower case before matching, so `giá` also matches a visitor
 * typing `gia` without diacritics, which is extremely common on a phone keyboard. That fold is the
 * same one the catalogue seeder needed, and forgetting it there silently killed six rules.
 */
export const ALIASES: Record<ContentRequirement, readonly string[]> = {
  "what-it-does": [
    "what is this", "what does it do", "what do you do", "overview", "product",
    "explain", "what is pulse", "summary",
    "la gi", "san pham", "tong quan", "gioi thieu san pham", "lam gi",
  ],
  "does-it-fit-me": [
    "fit", "suitable", "my industry", "my store", "my catalogue", "my catalog",
    "work for", "use case", "relevant", "my business", "ecommerce", "retail",
    "phu hop", "nganh", "cua hang", "danh muc cua toi", "truong hop su dung",
  ],
  "how-it-works": [
    "how does it work", "how it works", "mechanism", "algorithm", "method",
    "under the hood", "technical", "bayesian", "inference", "model",
    "hoat dong", "co che", "thuat toan", "phuong phap", "ky thuat",
  ],
  "what-it-costs": [
    "price", "pricing", "cost", "how much", "fee", "budget", "quote",
    "subscription", "plan", "expensive", "cheap",
    "gia", "chi phi", "bao nhieu", "bang gia", "phi", "goi cuoc",
  ],
  "how-to-integrate": [
    "integrate", "integration", "install", "setup", "set up", "api", "sdk",
    "developer", "docs", "documentation", "code", "implement", "shopify",
    "tich hop", "cai dat", "tai lieu", "lap trinh", "ma nguon",
  ],
  "is-it-proven": [
    "proof", "proven", "evidence", "results", "case study", "benchmark",
    "does it work", "uplift", "roi", "reference", "customers", "track record",
    "bang chung", "ket qua", "hieu qua", "kiem chung", "nghien cuu",
  ],
  "is-it-safe": [
    "privacy", "gdpr", "security", "safe", "data", "compliance", "pii",
    "personal data", "retention", "uptime", "status", "secure",
    "bao mat", "rieng tu", "du lieu", "tuan thu", "an toan",
  ],
  "who-are-they": [
    "who are you", "about", "team", "company", "founder", "hiring", "careers",
    "funding", "investors", "where are you",
    "ve chung toi", "doi ngu", "cong ty", "tuyen dung", "nguoi sang lap",
  ],
  "how-do-i-start": [
    "start", "get started", "sign up", "signup", "trial", "demo", "contact",
    "talk to", "book", "next step", "onboard",
    "bat dau", "dang ky", "lien he", "dung thu", "buoc tiep theo",
  ],
};

/** Fold diacritics and case so `Giá`, `gia` and `GIA` are one token. Includes the `đ` rule. */
export function fold(s: string): string {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Score by the LONGEST alias matched, not by how many matched.
 *
 * Counting matches lets a requirement with a big alias list win on volume: "how much does the api
 * cost" contains both `api` and `cost`, and the intent is plainly cost. The longest matched phrase
 * is the most specific evidence present, which is the same principle as anchoring the catalogue
 * reshelver to the start of a product name rather than letting any substring vote.
 */
/**
 * Alias matchers, word-bounded and compiled once. `D-20`.
 *
 * This was `text.includes(alias)`, which matches inside a longer word. Vietnamese made that
 * expensive rather than theoretical: `hoàn toàn` (completely) folds to `hoan toan` and contains
 * the alias `an toan` (safe), and `trời` contains `rồi`. Two false positives turned up in the
 * first four sample phrases tried, and each one routes a visitor confidently to the wrong page.
 *
 * The lookarounds exclude letters and digits rather than using `\b`, because `\b` treats a
 * hyphen as a boundary and several aliases are hyphenated. Compiled once because the alias set
 * is fixed and this runs per keystroke in the configurator.
 */
const MATCHERS = new Map<string, RegExp>();

function matcherFor(alias: string): RegExp {
  let re = MATCHERS.get(alias);
  if (!re) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    re = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u");
    MATCHERS.set(alias, re);
  }
  return re;
}

function scoreOf(text: string, aliases: readonly string[]): { score: number; matched: string[] } {
  const matched = aliases.filter((a) => matcherFor(a).test(text));
  const score = matched.reduce((best, a) => Math.max(best, a.length), 0);
  return { score, matched };
}

export function parseRequirement(input: string): ParseResult {
  const text = fold(input);
  if (text.length === 0) return { kind: "unmatched", reason: "empty" };

  const scored = ALL_REQUIREMENTS.map((requirement) => ({
    requirement,
    ...scoreOf(text, ALIASES[requirement]),
  })).filter((s) => s.score > 0);

  if (scored.length === 0) return { kind: "unmatched", reason: "no-alias" };

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const tied = scored.filter((s) => s.score === top.score);

  // A tie is a real answer, not a failure to pick. Saying so beats guessing.
  if (tied.length > 1) {
    return { kind: "ambiguous", candidates: tied.map((t) => t.requirement).sort() };
  }
  return { kind: "matched", requirement: top.requirement, matched: top.matched };
}

/**
 * The question worth asking next: the most informative requirement still open.
 *
 * Ordered by the same bits B4 ranks pages with, so the configurator and the strip cannot disagree
 * about what matters. Returns `null` when nothing is open, which is the configurator's exit
 * condition rather than a prompt to invent another question.
 */
export function nextQuestion(open: readonly ContentRequirement[]): ContentRequirement | null {
  if (open.length === 0) return null;
  return [...open].sort(
    (a, b) => REQUIREMENT_VALUE[b] - REQUIREMENT_VALUE[a] || a.localeCompare(b),
  )[0];
}

/**
 * A contradiction worth stating: they are asking about something they told us was settled.
 *
 * Silently reopening it would discard a stated correction, and silently refusing would look broken.
 * Naming it lets the visitor decide, which is the only honest option when two pieces of stated
 * evidence disagree.
 */
export function contradicts(
  requirement: ContentRequirement,
  resolved: ReadonlySet<ContentRequirement>,
  overrides: Readonly<Partial<Record<ContentRequirement, "resolved" | "open">>>,
): boolean {
  return overrides[requirement] === "resolved" && resolved.has(requirement);
}
