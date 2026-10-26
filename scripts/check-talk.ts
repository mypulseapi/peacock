/**
 * The assistant's conversational layer: what it answers before retrieval, and what it leaves alone.
 * `pnpm check:talk`. The cases are the complaints: "hi" got "I could not find that".
 */
import assert from "node:assert/strict";
import { talk, type Origins } from "../src/lib/assistant/talk";

const o: Origins = {
  site: "https://thepulseapi.com",
  docs: "https://developer.thepulseapi.com",
};
const final = (q: string, lang = "en") => talk(q, lang, o)?.final === true;
const lead = (q: string, lang = "en") => talk(q, lang, o)?.final === false;

for (const q of [
  "hi",
  "Hi!",
  "hello there",
  "hey",
  "good morning",
  "thanks",
  "thank you!",
  "bye",
  "what can you do?",
  "who are you",
  "talk to sales",
])
  assert.ok(final(q), `small talk: ${q}`);
for (const q of ["xin chào", "Xin chao", "chào bạn", "cảm ơn", "bạn là ai"])
  assert.ok(final(q, "vi"), `vi small talk: ${q}`);

for (const q of [
  "what is the decision audit",
  "pricing",
  "how much does it cost",
  "what is a persona",
  "holdback",
  "what is pulse",
  "decision monitor",
])
  assert.ok(lead(q), `term: ${q}`);
assert.ok(lead("Decision Audit là gì", "vi"));
assert.ok(lead("bảng giá", "vi"));

// Left to retrieval: real questions that merely contain a word from the list.
for (const q of [
  "how do I call the audit from python",
  "hi can you show me how to send a price filter signal from react",
  "how to rerank results from algolia in nextjs",
])
  assert.equal(talk(q, "en", o), null, `retrieval: ${q}`);

// Longest name wins.
assert.match(
  talk("what is decision verification", "en", o)!.answer.body,
  /Decision Verification/,
);
assert.match(talk("api key", "en", o)!.answer.body, /x-api-key/);
console.log("talk ok");
