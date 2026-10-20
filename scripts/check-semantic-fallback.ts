import assert from "node:assert/strict"
import {
  ABSTENTION_MESSAGE,
  MIN_SCORE,
  isEnglish,
  lexicalNearest,
  route,
  type Encoder,
} from "../src/lib/semantic-fallback"

/**
 * B8's guard, asserted rather than assumed.
 *
 * `NLR-PLAN.md` §2.5: *"The guard is a locale check with a test behind it, not a convention.
 * 'English only for now' becomes 'Vietnamese gets noise' the first time someone wires the
 * fallback without thinking about it. The assertion is that a Vietnamese message never reaches
 * the encoder, and it belongs in the suite on the day B8 lands."*
 *
 * This is that assertion, and it is the reason the file exists. The rest checks that the
 * layering degrades in the right order and that the parser stays the spine.
 *
 *   tsx scripts/check-semantic-fallback.ts
 */

let checks = 0
const ok = (name: string, fn: () => void) => {
  fn()
  checks++
  void name
}

// ── The guard ──────────────────────────────────────────────────────────────

ok("a Vietnamese message never reaches the encoder", () => {
  let reached = false
  const spy: Encoder = () => {
    reached = true
    return { route: "/", score: 1 }
  }
  // A Vietnamese message the deterministic parser genuinely does not recognise. Most do get
  // recognised, which is the point of section 2.5: Vietnamese keeps the stronger half.
  const r = route("con mèo nhảy qua hàng rào gỗ", "vi", spy)
  assert.equal(reached, false, "the encoder was called for a Vietnamese message")
  assert.equal(r.kind, "abstain")
  assert.equal(r.kind === "abstain" && r.reason, "not-english")
})

ok("no locale other than English reaches the encoder", () => {
  for (const locale of ["vi", "fr", "de", "zh-CN", "", "  "]) {
    let reached = false
    route("xylophone badger quarterly logistics", locale, () => {
      reached = true
      return null
    })
    assert.equal(reached, false, `the encoder was called for locale "${locale}"`)
  }
})

ok("English variants do reach it", () => {
  for (const locale of ["en", "en-GB", "en-US", "EN"]) {
    assert.equal(isEnglish(locale), true, `${locale} should be English`)
  }
  assert.equal(isEnglish("eng"), false, "a three-letter code is not one we serve")
})

// ── The layering ───────────────────────────────────────────────────────────

ok("the parser wins before the encoder is consulted", () => {
  let reached = false
  // "pricing" is an alias the deterministic parser recognises.
  const r = route("what is the pricing", "en", () => {
    reached = true
    return { route: "/wrong", score: 1 }
  })
  assert.equal(reached, false, "the encoder ran even though the parser matched")
  assert.equal(r.kind, "parsed")
})

ok("an empty message abstains without consulting anything", () => {
  let reached = false
  const r = route("   ", "en", () => {
    reached = true
    return null
  })
  assert.equal(reached, false)
  assert.equal(r.kind === "abstain" && r.reason, "empty")
})

ok("nothing close abstains rather than returning the least-bad page", () => {
  const r = route("xylophone quarterly badger logistics", "en", () => null)
  assert.equal(r.kind === "abstain" && r.reason, "nothing-close")
})

// ── The encoder itself ─────────────────────────────────────────────────────

ok("the default encoder finds an obviously related page", () => {
  const hit = lexicalNearest("tell me about the decision audit")
  assert.ok(hit, "expected a nearest page for an on-topic message")
  assert.ok(hit.route.includes("audit"), `expected an audit page, got ${hit.route}`)
  assert.ok(hit.score >= MIN_SCORE)
})

ok("it returns nothing for an unrelated message", () => {
  assert.equal(lexicalNearest("badger xylophone quarterly logistics"), null)
})

ok("it returns nothing for a message with no usable tokens", () => {
  assert.equal(lexicalNearest("a of to"), null)
  assert.equal(lexicalNearest(""), null)
})

ok("a score is never presented as a probability above one", () => {
  const hit = lexicalNearest("integration api developer")
  if (hit) assert.ok(hit.score <= 1 && hit.score >= 0, "score out of range")
})

// ── What it must never do ──────────────────────────────────────────────────

ok("a nearest page is a route and carries no requirement", () => {
  const r = route("something about integrating with the api", "en")
  if (r.kind === "nearest") {
    assert.deepEqual(Object.keys(r.page).sort(), ["route", "score"])
  }
})

ok("every abstention names its limit", () => {
  for (const reason of ["empty", "not-english", "nothing-close"] as const) {
    const m = ABSTENTION_MESSAGE[reason]
    assert.ok(m && m.length > 20, `abstention "${reason}" has no message`)
    assert.ok(!/sorry|apolog/i.test(m), `abstention "${reason}" apologises instead of explaining`)
  }
})

console.log(`semantic fallback ok — ${checks} checks, Vietnamese never reaches the encoder`)
