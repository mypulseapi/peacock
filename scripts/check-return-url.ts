import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { safeReturnUrl } from "../src/lib/return-url";

/**
 * Website sign-in's two build-time guarantees (rainbow ODIN/design/01-auth/01-website-sign-in, F2).
 *
 * 1. FR-08: sign-in returns only to the merchant dashboard. An open redirect on a sign-in page is
 *    a phishing kit, so every shape an attacker would try is asserted to fall back.
 * 2. FR-11: every `auth` string exists in both languages. A key in one file only renders as its
 *    own name in the other locale, which no type check catches.
 *
 *   tsx scripts/check-return-url.ts
 */

const APP = "https://app.thepulseapi.com";
let checks = 0;
const same = (raw: string | null | undefined, expected: string) => {
  assert.equal(
    safeReturnUrl(raw, APP),
    expected,
    `safeReturnUrl(${JSON.stringify(raw)})`,
  );
  checks++;
};

// Accepted: the dashboard, as the dashboard sends it and as a bare path.
same(
  "https://app.thepulseapi.com/catalog?tab=brands",
  "https://app.thepulseapi.com/catalog?tab=brands",
);
same("/analytics", "https://app.thepulseapi.com/analytics");

// Fallen back: nothing, garbage, and every way out of the dashboard's origin.
for (const raw of [
  null,
  undefined,
  "",
  "//evil.com/app",
  "https://evil.com",
  "javascript:alert(1)",
  "data:text/html,hi",
  "https://app.thepulseapi.com.evil.com/",
  "https://thepulseapi.com/en",
  "https://docs.thepulseapi.com/",
  "http://app.thepulseapi.com/",
  "https://app.thepulseapi.com:8443/",
]) {
  same(raw, APP);
}

// Both languages, key for key.
const keys = (file: string): string[] => {
  const walk = (o: Record<string, unknown>, p: string): string[] =>
    Object.entries(o).flatMap(([k, v]) =>
      v && typeof v === "object"
        ? walk(v as Record<string, unknown>, `${p}${k}.`)
        : [`${p}${k}`],
    );
  return walk(JSON.parse(readFileSync(file, "utf8")).auth, "auth.").sort();
};
const en = keys("messages/en.json");
const vi = keys("messages/vi.json");
assert.deepEqual(
  en.filter((k) => !vi.includes(k)).concat(vi.filter((k) => !en.includes(k))),
  [],
  "auth keys present in one language only",
);
checks++;

console.log(
  `return url ok, ${checks} checks; auth strings match in en and vi (${en.length} keys)`,
);
