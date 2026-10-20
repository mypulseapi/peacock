/**
 * Assertions for the B4 ranking. Run by `build`, via tsx.
 *
 * Peacock has no test framework and does not need one for this: the ranking is a pure function of
 * the catalogue, so a handful of asserts covers it. The rule it enforces is that the ranking must
 * never suggest a page that answers nothing outstanding, which is the behaviour B4 exists to remove
 * and the one most likely to regress silently.
 */
import assert from "node:assert/strict";
import {
  ALL_REQUIREMENTS,
  REQUIREMENT_VALUE,
  rankNextPages,
  visitorStateFor,
} from "../src/lib/visitor-requirements";
import { PAGE_CATALOGUE } from "../src/lib/page-catalogue";

let checks = 0;
const check = (name: string, fn: () => void) => {
  fn();
  checks++;
  console.log(`  ok  ${name}`);
};

check("every requirement is resolved by at least one page", () => {
  for (const r of ALL_REQUIREMENTS) {
    const n = PAGE_CATALOGUE.filter((p) => p.decides.includes(r)).length;
    assert.ok(n > 0, `${r} is resolved by no page, so it can never be closed`);
  }
});

check("scarcer requirements are worth more, in bits", () => {
  // what-it-costs is resolved by one page; what-it-does by ten. The ordering is the whole point.
  assert.ok(
    REQUIREMENT_VALUE["what-it-costs"] > REQUIREMENT_VALUE["what-it-does"],
    "a requirement almost no page answers must outrank one that ten pages answer",
  );
  for (const v of Object.values(REQUIREMENT_VALUE)) {
    assert.ok(Number.isFinite(v) && v > 0, "every value must be a positive, finite number of bits");
  }
});

check("a fresh visitor is offered pages that close something", () => {
  const ranked = rankNextPages(visitorStateFor([]));
  assert.ok(ranked.length > 0, "an empty history must still produce suggestions");
  for (const r of ranked) assert.ok(r.closes.length > 0, `${r.page.route} closes nothing`);
});

check("a page is never suggested twice, or after being read", () => {
  const visited = ["/", "/pricing", "/docs"];
  const ranked = rankNextPages(visitorStateFor(visited), 10);
  const routes = ranked.map((r) => r.page.route);
  for (const v of visited) assert.ok(!routes.includes(v), `${v} was read and still suggested`);
  assert.equal(new Set(routes).size, routes.length, "duplicate suggestion");
});

check("nothing outstanding means nothing suggested", () => {
  // Read one page per requirement, so the open set is empty.
  const covering = ALL_REQUIREMENTS.map(
    (r) => PAGE_CATALOGUE.find((p) => p.decides.includes(r) && !p.route.includes("["))!.route,
  );
  const state = visitorStateFor(covering);
  assert.equal(state.open.length, 0, "the covering set should close every requirement");
  assert.equal(
    rankNextPages(state).length,
    0,
    "with nothing open, suggesting a page would be padding",
  );
});

check("a dynamic route or a legal page is never suggested", () => {
  const ranked = rankNextPages(visitorStateFor([]), PAGE_CATALOGUE.length);
  for (const r of ranked) {
    assert.ok(!r.page.route.includes("["), `${r.page.route} is a pattern and would 404`);
    assert.notEqual(r.page.depth, "legal", `${r.page.route} is legal and must be found, not pushed`);
  }
});

check("audience abstains while it is ambiguous, and resolves once it is not", () => {
  assert.equal(visitorStateFor(["/"]).audience, null, "an `any` page is not evidence of audience");
  assert.equal(
    visitorStateFor(["/docs", "/pricing"]).audience,
    null,
    "one developer page against one merchant page is a tie, not a winner",
  );
  assert.equal(visitorStateFor(["/docs", "/integrations"]).audience, "developer");
});

check("reading more never reopens a closed requirement", () => {
  let previous = ALL_REQUIREMENTS.length;
  const path = ["/", "/product", "/pricing", "/docs", "/why/limits", "/about"];
  for (let i = 1; i <= path.length; i++) {
    const open = visitorStateFor(path.slice(0, i)).open.length;
    assert.ok(open <= previous, "the open set must be monotonically non-increasing");
    previous = open;
  }
});

check("a stated override beats what we inferred, in both directions", () => {
  // We infer that reading /pricing closed what-it-costs. The visitor says it did not.
  const reopened = visitorStateFor(["/pricing"], { "what-it-costs": "open" });
  assert.ok(reopened.open.includes("what-it-costs"), "the visitor reopened it and was ignored");

  // And the reverse: they already know the cost without having read the page.
  const closed = visitorStateFor([], { "what-it-costs": "resolved" });
  assert.ok(!closed.open.includes("what-it-costs"), "the visitor closed it and was ignored");
});

check("an override changes what gets suggested", () => {
  const before = rankNextPages(visitorStateFor([]), 20).map((r) => r.page.route);
  assert.ok(before.includes("/pricing"), "pricing should be offered to a fresh visitor");
  const after = rankNextPages(
    visitorStateFor([], { "what-it-costs": "resolved", "how-do-i-start": "resolved" }),
    20,
  ).map((r) => r.page.route);
  assert.ok(!after.includes("/pricing"), "pricing closes only those two and should now be dropped");
});

console.log(`intent ranking ok, ${checks} checks`);
