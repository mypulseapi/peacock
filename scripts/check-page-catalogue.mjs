#!/usr/bin/env node
/**
 * Fail the build when the page catalogue and the filesystem disagree.
 *
 * B2 makes every page an item with attributes. A catalogue that drifts is worse than no catalogue:
 * the site keeps emitting page views, they silently lose their attributes, and the ranking quietly
 * degrades with nothing to show for it. Cheapest possible guard, so it runs on every build rather
 * than living in a test suite peacock does not have.
 *
 * ponytail: string-matches the route literals rather than importing the TS module, so this needs no
 * build step of its own. If the catalogue ever grows logic, import it through tsx instead.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(root, "src/app/[locale]");
const CATALOGUE = join(root, "src/lib/page-catalogue.ts");

/** Route groups like `(auth)` are organisational and do not appear in the URL. */
const isGroup = (segment) => segment.startsWith("(") && segment.endsWith(")");

async function routesUnder(dir, prefix = "") {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "page.tsx") found.push(prefix === "" ? "/" : prefix);
    if (!entry.isDirectory()) continue;
    const next = isGroup(entry.name) ? prefix : `${prefix}/${entry.name}`;
    found.push(...(await routesUnder(join(dir, entry.name), next)));
  }
  return found;
}

const onDisk = (await routesUnder(APP))
  // The catch-all renders the 404 and is not a destination anyone navigates to on purpose.
  .filter((r) => !r.includes("[...rest]"))
  .sort();

const source = await readFile(CATALOGUE, "utf8");
const declared = [...source.matchAll(/^\s*\{\s*route:\s*"([^"]+)"/gm)].map((m) => m[1]).sort();

const missing = onDisk.filter((r) => !declared.includes(r));
const stale = declared.filter((r) => !onDisk.includes(r));

if (missing.length || stale.length) {
  console.error("\n  Page catalogue is out of sync with src/app/[locale].\n");
  for (const r of missing) console.error(`    MISSING   ${r}  (page exists, no catalogue entry)`);
  for (const r of stale) console.error(`    STALE     ${r}  (catalogue entry, no page)`);
  console.error(
    `\n  Add or remove entries in src/lib/page-catalogue.ts.` +
      `\n  Every page needs an audience, area, depth and what it helps a visitor decide.\n`,
  );
  process.exit(1);
}

console.log(`page catalogue ok — ${onDisk.length} routes, all attributed`);
