#!/usr/bin/env node
/**
 * Delete R2 objects nothing references any more.
 *
 * Deliberately not a "delete everything not in a list I was handed": it works
 * the reference set out from the repository itself, so a stale list cannot
 * cause a deletion. Two sources of truth:
 *
 *   demo/products/  keys named by marketplace-catalog.json
 *   website/        keys in the peacock asset manifest that appear in src/
 *
 * Dry by default. `--apply` is required to delete, because this is not
 * reversible and R2 has no undelete: the bucket is unversioned, so a deleted
 * object cannot be restored from anywhere.
 *
 * `--apply` ALSO requires `--deployed-ok`, and that is not bureaucracy. The
 * reference set is derived from the working copy, which describes what the
 * repo would serve if it were deployed right now. A deployed environment runs
 * whatever was seeded into ITS database, which can be an older catalogue
 * entirely. Pruning to match local state therefore deletes objects the live
 * site is still asking for.
 *
 * That is not hypothetical. This script deleted 2,301 `.jpg` objects after a
 * local-only re-seed, while demo.thepulseapi.com was still serving the old
 * catalogue. Every product image on the live demo broke, and with no bucket
 * versioning none of them could be brought back: the only route out was to
 * re-seed the deployed database.
 *
 * So: re-seed and verify every deployed environment FIRST, confirm it is
 * serving the same catalogue this working copy describes, and only then prune.
 *
 * Usage: node scripts/prune-r2.mjs            # dry run, always safe
 *        node scripts/prune-r2.mjs --apply --deployed-ok
 */
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const APPLY = process.argv.includes("--apply");
const DEPLOYED_OK = process.argv.includes("--deployed-ok");
if (APPLY && !DEPLOYED_OK) {
  console.error("Refusing to delete.\n");
  console.error("  --apply needs --deployed-ok alongside it. Deletion is permanent (the");
  console.error("  bucket is unversioned) and the reference set below comes from THIS");
  console.error("  working copy, not from what any deployed environment has seeded.");
  console.error("  Re-seed and verify every deployment first, then pass --deployed-ok.\n");
  console.error("  Run without --apply for the dry report.");
  process.exit(1);
}
const s3 = new S3Client({
  region: process.env.STORAGE_REGION ?? "auto",
  endpoint: process.env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
  },
});
const BUCKET = process.env.STORAGE_BUCKET;

async function listAll(prefix) {
  const out = [];
  let token;
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token, MaxKeys: 1000 }));
    for (const o of r.Contents ?? []) out.push({ key: o.Key, size: o.Size ?? 0 });
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
  return out;
}

/** Every .ts/.tsx under src, concatenated, so a key can be grepped for. */
function sourceText(dir) {
  let s = "";
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) s += sourceText(p);
    else if ([".ts", ".tsx"].includes(extname(p))) s += readFileSync(p, "utf8");
  }
  return s;
}

const catalogue = JSON.parse(
  readFileSync("../../api/cerberus/src/database/seeders/marketplace-catalog.json", "utf8"),
);
const usedDemo = new Set(catalogue.products.map((p) => p.imageKey).filter(Boolean));

const manifest = JSON.parse(readFileSync("src/lib/asset-manifest.json", "utf8"));
const code = sourceText("src");
// Full path only. A filename fallback was tried and kept two carousel
// orphans alive purely because they happened to be called hero.webp, and
// every real reference in this codebase is written as a whole path through
// img(), so the fallback bought nothing and cost precision.
const usedSite = new Set(
  Object.keys(manifest)
    .filter((k) => code.includes(k))
    .map((k) => `website/${k}`),
);

const groups = [
  { prefix: "demo/products/", used: usedDemo, label: "old catalogue images" },
  { prefix: "website/", used: usedSite, label: "orphaned site assets" },
];

let total = 0, bytes = 0;
for (const g of groups) {
  const all = await listAll(g.prefix);
  const dead = all.filter((o) => !g.used.has(o.key));
  const mb = dead.reduce((n, o) => n + o.size, 0) / 1048576;
  total += dead.length;
  bytes += mb;
  console.log(`${g.prefix.padEnd(16)} ${String(all.length).padStart(5)} objects, ${String(dead.length).padStart(5)} unreferenced  ${mb.toFixed(1)} MB  (${g.label})`);
  dead.slice(0, 4).forEach((o) => console.log(`     ${o.key}`));
  if (dead.length > 4) console.log(`     ... and ${dead.length - 4} more`);

  if (APPLY && dead.length) {
    for (let i = 0; i < dead.length; i += 1000) {
      const batch = dead.slice(i, i + 1000);
      const r = await s3.send(new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: { Objects: batch.map((o) => ({ Key: o.key })), Quiet: true },
      }));
      if (r.Errors?.length) console.error(`  ${r.Errors.length} delete errors, first: ${r.Errors[0].Key} ${r.Errors[0].Code}`);
    }
    console.log(`     deleted ${dead.length}`);
  }
}
console.log(`\n${APPLY ? "deleted" : "would delete"} ${total} objects, ${bytes.toFixed(0)} MB`);
if (!APPLY) console.log("dry run. pass --apply to actually delete.");
