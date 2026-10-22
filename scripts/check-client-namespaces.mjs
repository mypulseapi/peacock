/**
 * Every namespace a client component asks for must be in CLIENT_NAMESPACES.
 *
 * The provider only ships that list, so a namespace missing from it renders as its own key in the
 * browser: `t("title")` returns "title". That failure is silent, it only appears on the page a
 * visitor happens to open, and it survives a green type-check and a green build. This is what
 * stops it reaching production.
 *
 * It scans only files marked `"use client"`, because a Server Component is already HTML by the
 * time the browser sees it and takes nothing from the provider.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "src";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(tsx?|jsx?)$/.test(full)) yield full;
  }
}

const listed = new Set(
  [...readFileSync("src/i18n/client-namespaces.ts", "utf8").matchAll(/^\s+"([\w-]+)",$/gm)].map(
    (m) => m[1],
  ),
);

const missing = new Map();
let scanned = 0;
for (const file of walk(SRC)) {
  const src = readFileSync(file, "utf8");
  if (!/^\s*["']use client["']/m.test(src)) continue;
  scanned++;
  for (const m of src.matchAll(/useTranslations\(\s*["']([^"']+)["']/g)) {
    const root = m[1].split(".")[0];
    if (!listed.has(root)) {
      if (!missing.has(root)) missing.set(root, []);
      missing.get(root).push(file);
    }
  }
}

if (missing.size > 0) {
  console.error("\nclient namespaces: these are used in a client component but not shipped to it.");
  console.error("Every one renders as its own key in the browser. Add them to CLIENT_NAMESPACES.\n");
  for (const [ns, files] of missing) console.error(`  ${ns}  <- ${files.join(", ")}`);
  console.error("");
  process.exit(1);
}

console.log(
  `client namespaces ok: ${listed.size} shipped, every namespace used across ${scanned} client components is one of them`,
);
