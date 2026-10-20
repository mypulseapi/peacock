#!/usr/bin/env node
/**
 * Fail the build if placeholder contact details or people reach production.
 *
 * The About roster and the footer phone number are deliberate placeholders so
 * the sections can be seen working. They are the kind of thing that ships by
 * accident, and the cost of that is a fabricated team on a public page and a
 * phone number that connects a customer to nobody.
 *
 * Runs on every build. Set CHECK_PLACEHOLDERS=off only if you mean it.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.CHECK_PLACEHOLDERS === "off") {
  console.log("placeholder check: skipped by CHECK_PLACEHOLDERS=off");
  process.exit(0);
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const found = [];

const about = readFileSync(resolve(ROOT, "src/content/about.ts"), "utf8");
const people = (about.match(/name: "[^"]*Placeholder[^"]*"/g) ?? []).length;
if (people) found.push(`${people} placeholder team member(s) in src/content/about.ts`);

for (const loc of ["en", "vi"]) {
  const msgs = JSON.parse(readFileSync(resolve(ROOT, `messages/${loc}.json`), "utf8"));
  const phone = msgs.footer?.phone ?? "";
  if (/^\+?[\d\s]*0{4,}[\d\s]*$/.test(phone) && phone.trim()) {
    found.push(`placeholder phone "${phone}" in messages/${loc}.json`);
  }
}

if (!found.length) {
  console.log("placeholder check ok — no placeholder people or contact details");
  process.exit(0);
}

const production = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
const label = production ? "ERROR" : "WARNING";
console.log(`placeholder check ${label}:`);
for (const f of found) console.log(`  - ${f}`);
console.log("  Replace with real values, or set CHECK_PLACEHOLDERS=off to proceed deliberately.");
process.exit(production ? 1 : 0);
