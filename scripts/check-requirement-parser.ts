/**
 * Assertions for the B5 parser. Run by `build`, via tsx.
 *
 * The coverage cases matter least. The three that matter are: it abstains on a tie, it refuses
 * when it knows nothing, and Vietnamese works without diacritics. Those are the behaviours that
 * make the configurator honest rather than merely functional.
 */
import assert from "node:assert/strict";
import { ALIASES, contradicts, fold, nextQuestion, parseRequirement } from "../src/lib/requirement-parser";
import { ALL_REQUIREMENTS } from "../src/lib/visitor-requirements";
import type { ContentRequirement } from "../src/lib/page-catalogue";

let checks = 0;
const check = (name: string, fn: () => void) => {
  fn();
  checks++;
  console.log(`  ok  ${name}`);
};

const matched = (input: string): ContentRequirement => {
  const r = parseRequirement(input);
  assert.equal(r.kind, "matched", `"${input}" did not match: ${JSON.stringify(r)}`);
  return (r as { requirement: ContentRequirement }).requirement;
};

check("plain English intents land on the right requirement", () => {
  assert.equal(matched("how much does this cost?"), "what-it-costs");
  assert.equal(matched("How do I integrate the SDK"), "how-to-integrate");
  assert.equal(matched("what is this"), "what-it-does");
  assert.equal(matched("is there any proof it works"), "is-it-proven");
  assert.equal(matched("what happens to my customers personal data"), "is-it-safe");
  assert.equal(matched("who are you"), "who-are-they");
});

check("the longest alias wins, so a mixed sentence resolves to its actual intent", () => {
  // Contains `api` (how-to-integrate) and `how much` (cost). Cost is the question being asked.
  assert.equal(matched("how much does the api cost"), "what-it-costs");
});

check("Vietnamese works, with and without diacritics", () => {
  assert.equal(matched("giá bao nhiêu"), "what-it-costs");
  assert.equal(matched("gia bao nhieu"), "what-it-costs");
  assert.equal(matched("tích hợp thế nào"), "how-to-integrate");
  assert.equal(matched("tich hop the nao"), "how-to-integrate");
  assert.equal(matched("bảo mật dữ liệu"), "is-it-safe");
});

check("the d-with-stroke fold is applied", () => {
  // Without the đ rule these fold to `dang ky` / `du lieu` incorrectly and match nothing.
  assert.equal(fold("Đăng ký"), "dang ky");
  assert.equal(fold("dữ liệu"), "du lieu");
  assert.equal(matched("đăng ký"), "how-do-i-start");
});

check("an empty or whitespace input refuses, and says which kind", () => {
  for (const input of ["", "   ", "\n\t "]) {
    const r = parseRequirement(input);
    assert.equal(r.kind, "unmatched");
    assert.equal((r as { reason: string }).reason, "empty");
  }
});

check("something we have no page for is refused, not guessed at", () => {
  const r = parseRequirement("do you sell replacement bicycle tyres");
  assert.equal(r.kind, "unmatched", `should refuse, got ${JSON.stringify(r)}`);
  assert.equal((r as { reason: string }).reason, "no-alias");
});

check("a genuine tie abstains rather than picking", () => {
  // `demo` and `docs` are both 4 characters, in how-do-i-start and how-to-integrate.
  const r = parseRequirement("demo docs");
  assert.equal(r.kind, "ambiguous", `expected abstention, got ${JSON.stringify(r)}`);
  const candidates = (r as { candidates: ContentRequirement[] }).candidates;
  assert.ok(candidates.length > 1, "an ambiguous result must name more than one candidate");
  assert.deepEqual(candidates, [...candidates].sort(), "candidates must be stably ordered");
});

check("every requirement has aliases, and every alias resolves to its own requirement", () => {
  // The invariant that catches real misconfiguration: an alias quietly stolen by a longer alias
  // listed under a different requirement, which makes that phrasing permanently unreachable.
  for (const requirement of ALL_REQUIREMENTS) {
    const aliases = ALIASES[requirement];
    assert.ok(aliases?.length > 0, `${requirement} has no aliases and can never be asked for`);

    for (const alias of aliases) {
      const r = parseRequirement(alias);
      if (r.kind === "matched") {
        assert.equal(
          r.requirement,
          requirement,
          `alias "${alias}" is listed under ${requirement} but resolves to ${r.requirement}`,
        );
      } else if (r.kind === "ambiguous") {
        assert.ok(
          r.candidates.includes(requirement),
          `alias "${alias}" is ambiguous and does not even include ${requirement}`,
        );
      } else {
        assert.fail(`alias "${alias}" under ${requirement} matches nothing at all`);
      }
    }
  }
});

check("no alias is listed under two requirements", () => {
  // A duplicate is always a bug: it makes one of the two unreachable by that phrasing, and which
  // one wins depends on list order rather than on anything meaningful.
  const owner = new Map<string, ContentRequirement>();
  for (const requirement of ALL_REQUIREMENTS) {
    for (const alias of ALIASES[requirement]) {
      const previous = owner.get(alias);
      assert.equal(previous, undefined, `"${alias}" is under both ${previous} and ${requirement}`);
      owner.set(alias, requirement);
    }
  }
});

check("the next question is the most informative one still open", () => {
  assert.equal(nextQuestion([]), null, "nothing open must end the conversation, not invent one");
  // what-it-costs is resolved by one page, so it outranks what-it-does, resolved by ten.
  assert.equal(nextQuestion(["what-it-does", "what-it-costs"]), "what-it-costs");
  assert.equal(nextQuestion(["what-it-does"]), "what-it-does");
});

check("a contradiction is only reported when the visitor is the one who closed it", () => {
  const resolved = new Set<ContentRequirement>(["what-it-costs"]);
  assert.equal(
    contradicts("what-it-costs", resolved, { "what-it-costs": "resolved" }),
    true,
    "they said they knew it, then asked about it",
  );
  assert.equal(
    contradicts("what-it-costs", resolved, {}),
    false,
    "we inferred it from a page view, which is not a contradiction worth interrupting for",
  );
});

/*
 * D-20: an alias must not match inside a longer word.
 *
 * This was `text.includes(alias)`. Vietnamese made it expensive rather than theoretical, and
 * none of the checks above caught it, which is why these are here: every one is a phrase a real
 * visitor could type that used to route them confidently to the wrong page.
 */
check("an alias does not match inside a longer Vietnamese word", () => {
  // `hoàn toàn` (completely) folds to `hoan toan` and contains the alias `an toan` (safe).
  assert.equal(parseRequirement("tôi cần một cái gì đó hoàn toàn khác").kind, "unmatched")
  // `trời` contains `rồi`.
  assert.equal(parseRequirement("hôm nay trời mưa rất to").kind, "unmatched")
})

check("the real Vietnamese alias still matches", () => {
  // The fix must not take the genuine match with it.
  const r = parseRequirement("an toàn không")
  assert.equal(r.kind, "matched")
  assert.equal(r.kind === "matched" && r.requirement, "is-it-safe")
})

check("an alias does not match inside a longer English word", () => {
  // "costume" contains "cost"; "safely" contains "safe"; "apiary" contains "api".
  for (const word of ["costume party", "landing safely", "an apiary visit"]) {
    assert.equal(parseRequirement(word).kind, "unmatched", `"${word}" should not match`)
  }
})

check("punctuation does not stop a genuine match", () => {
  // The boundary is letters and digits, so a question mark or comma still bounds a word.
  for (const phrase of ["pricing?", "what is the cost, roughly", "(pricing)"]) {
    assert.notEqual(parseRequirement(phrase).kind, "unmatched", `"${phrase}" should match`)
  }
})

console.log(`requirement parser ok, ${checks} checks`);
