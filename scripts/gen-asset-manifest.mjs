/**
 * Build a content-hash manifest for the site images.
 *
 * Images are uploaded to R2 under a stable path, and the CDN caches them for
 * four hours. Overwriting a file therefore keeps serving the old bytes until
 * the TTL expires, which silently shipped stale artwork once. `img()` appends
 * the hash from this manifest as ?v=, so changed content always gets a new URL
 * and unchanged content stays cacheable.
 *
 * **This merges, it does not replace.** The images live in R2; `public/images`
 * is a staging area that is emptied after an upload. A replacing generator
 * would therefore wipe every hash on the next build and take the whole
 * cache-busting scheme with it. Entries for files that are no longer on disk
 * are kept, because the object they describe is still on the CDN.
 *
 * Usage: node scripts/gen-asset-manifest.mjs   (runs automatically on build)
 */
import { createHash } from "crypto";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";

const ROOT = "public/images";
const OUT = "src/lib/asset-manifest.json";

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const manifest = { ...previous };

let staged = 0;
for (const file of walk(ROOT).sort()) {
  const key = relative(ROOT, file).split("\\").join("/");
  manifest[key] = createHash("md5").update(readFileSync(file)).digest("hex").slice(0, 8);
  staged++;
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n");
console.log(
  `asset manifest: ${staged} staged on disk, ${Object.keys(sorted).length} total -> ${OUT}`,
);
