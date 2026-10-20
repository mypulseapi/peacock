#!/usr/bin/env node
/**
 * Upload the demo product catalogue to R2.
 *
 * Separate from upload-to-r2.ts, which is the marketing site's deploy step and
 * walks public/ only. This takes a source directory outside the app, uploads
 * under the prefix the demo storefront already reads, and writes a manifest.
 *
 * Three things it does that the site uploader does not, all forced by scale:
 *
 *  - Concurrency. The site uploader awaits one PUT at a time, which is fine for
 *    74 files and not for 4,140.
 *  - Resume. It lists the destination first and skips objects already there at
 *    the same size, so an interrupted run costs only what it had not finished.
 *  - A manifest. `<listing id> -> key`, so the seeder never has to guess a path.
 *
 * Key shape is `demo/products/<sub>/<id>.<ext>`, which is the convention
 * already in the bucket rather than a second one invented next to it.
 *
 * Usage: node scripts/upload-catalog-to-r2.mjs <source-dir> [--limit N] [--dry]
 */
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const SRC = process.argv[2];
const LIMIT = Number((process.argv.find((a) => a.startsWith("--limit=")) || "").split("=")[1] || 0);
const DRY = process.argv.includes("--dry");
const PREFIX = "demo/products";
const CONCURRENCY = 24;

if (!SRC || !existsSync(SRC)) {
  console.error("usage: upload-catalog-to-r2.mjs <source-dir> [--limit=N] [--dry]");
  process.exit(1);
}

const ENDPOINT = process.env.STORAGE_ENDPOINT;
const BUCKET = process.env.STORAGE_BUCKET;
if (!ENDPOINT || !BUCKET || !process.env.STORAGE_ACCESS_KEY_ID) {
  console.error("missing STORAGE_ENDPOINT / STORAGE_BUCKET / STORAGE_ACCESS_KEY_ID");
  process.exit(1);
}

const s3 = new S3Client({
  region: process.env.STORAGE_REGION ?? "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
  },
});

const MIME = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".avif": "image/avif" };

/** Every product record across the 51 category files, with its image on disk. */
function collect(root) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name === "products.json") {
        const d = JSON.parse(readFileSync(p, "utf8"));
        for (const prod of d.products ?? []) {
          if (!prod.image_file) continue;
          const local = join(dir, prod.image_file);
          if (!existsSync(local)) continue;
          out.push({
            id: String(prod.listing_id),
            sub: d.sub,
            parent: d.parent,
            local,
            key: `${PREFIX}/${d.sub}/${prod.listing_id}${extname(prod.image_file)}`,
            size: statSync(local).size,
          });
        }
      }
    }
  };
  walk(root);
  return out;
}

/** What is already there, so a rerun is cheap. */
async function existing(prefix) {
  const seen = new Map();
  let token;
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token, MaxKeys: 1000 }));
    for (const o of r.Contents ?? []) seen.set(o.Key, o.Size);
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
  return seen;
}

async function main() {
  let items = collect(SRC);
  if (LIMIT) items = items.slice(0, LIMIT);
  const bytes = items.reduce((n, i) => n + i.size, 0);
  console.log(`found ${items.length} product images, ${(bytes / 1048576).toFixed(0)} MB`);

  const already = await existing(`${PREFIX}/`);
  console.log(`already in bucket under ${PREFIX}/: ${already.size}`);

  const todo = items.filter((i) => already.get(i.key) !== i.size);
  console.log(`to upload: ${todo.length}   skipping ${items.length - todo.length} unchanged`);
  if (DRY) {
    console.log("dry run, nothing sent. first five keys:");
    todo.slice(0, 5).forEach((i) => console.log("   " + i.key));
    return;
  }

  let done = 0, failed = 0;
  const queue = [...todo];
  const worker = async () => {
    for (;;) {
      const it = queue.pop();
      if (!it) return;
      try {
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: it.key,
          Body: readFileSync(it.local),
          ContentType: MIME[extname(it.local).toLowerCase()] ?? "application/octet-stream",
          // Keyed by product id and never rewritten in place, so it is immutable.
          CacheControl: "public, max-age=31536000, immutable",
        }));
      } catch (e) {
        failed++;
        if (failed < 6) console.error(`  failed ${it.key}: ${e.name}`);
      }
      if (++done % 250 === 0) console.log(`  ${done}/${todo.length}`);
    }
  };
  const t0 = Date.now();
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`uploaded ${done - failed}, failed ${failed}, in ${((Date.now() - t0) / 1000).toFixed(0)}s`);

  const manifest = Object.fromEntries(items.map((i) => [i.id, i.key]));
  writeFileSync("catalog-image-manifest.json", JSON.stringify(manifest, null, 0) + "\n");
  console.log(`manifest: ${Object.keys(manifest).length} ids -> catalog-image-manifest.json`);
}

await main();
