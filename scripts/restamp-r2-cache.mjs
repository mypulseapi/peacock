/**
 * Re-stamp Cache-Control on assets already in R2.
 *
 * The uploader marked only filename-hashed files immutable, and this site hashes in the query
 * string, so every image landed with `max-age=3600, must-revalidate`. The uploader is fixed, but
 * `public/images` is emptied after an upload, so the files are not on disk to re-upload. CopyObject
 * onto itself with MetadataDirective REPLACE rewrites the headers server side, without moving bytes.
 *
 * Only keys the manifest knows get the year: those carry `?v=<hash>` in every URL the site builds,
 * so the URL changes whenever the content does. Everything else is left alone.
 */
import { readFileSync } from "node:fs";
import { config } from "dotenv";
const DRY = !process.argv.includes("--apply");
config({ path: ".env.local" });
config({ path: "../rainbow/apps/api/cerberus/.env" });
const c = {
  STORAGE_REGION: process.env.STORAGE_REGION,
  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  STORAGE_ACCESS_KEY_ID: process.env.STORAGE_ACCESS_KEY_ID,
  STORAGE_SECRET_ACCESS_KEY: process.env.STORAGE_SECRET_ACCESS_KEY,
};
if (!c.STORAGE_ACCESS_KEY_ID) {
  console.error("No R2 credentials. Set STORAGE_* in .env.local, or run from beside the rainbow checkout.");
  process.exit(2);
}
const MANIFEST = JSON.parse(
  readFileSync(new URL("../src/lib/asset-manifest.json", import.meta.url), "utf8"),
);
const PREFIX = `${(process.env.NEXT_PUBLIC_CDN_PREFIX || "website").replace(/^\/+|\/+$/g, "")}/`;
const IMMUTABLE = "public, max-age=31536000, immutable";
/*
 * The assistant's weights, 151 MB across ten files. Their URLs carry no hash, so `immutable` would
 * pin a stale model forever; an hour means a visitor who opens the panel twice in a day pays for
 * revalidation on 151 MB. Thirty days is the compromise, and the model NAME is in the path, so
 * swapping models changes the URL anyway. Only replacing one model's weights in place would wait.
 */
const MODELS = "public, max-age=2592000";
const isModel = (key) => key.startsWith(`${PREFIX}models/`);

const { S3Client, ListObjectsV2Command, CopyObjectCommand } = await import("@aws-sdk/client-s3");
const { lookup } = await import("mime-types");
const s3 = new S3Client({
  region: c.STORAGE_REGION || "auto",
  endpoint: c.STORAGE_ENDPOINT,
  credentials: { accessKeyId: c.STORAGE_ACCESS_KEY_ID, secretAccessKey: c.STORAGE_SECRET_ACCESS_KEY },
});

let token, all = [];
do {
  const r = await s3.send(new ListObjectsV2Command({ Bucket: c.STORAGE_BUCKET, Prefix: PREFIX, ContinuationToken: token }));
  all.push(...(r.Contents ?? []));
  token = r.IsTruncated ? r.NextContinuationToken : undefined;
} while (token);

const targets = all.filter(
  (o) => MANIFEST[o.Key.slice(PREFIX.length)] !== undefined || isModel(o.Key),
);
console.log(`${all.length} objects under ${PREFIX}, ${targets.length} in the manifest`);
const skipped = all.length - targets.length;
console.log(`${skipped} left untouched`);

if (DRY) {
  console.log("\nDRY RUN. Re-run with --apply.");
  for (const o of targets.slice(0, 5)) console.log("  would restamp", o.Key);
  process.exit(0);
}

let done = 0, failed = 0;
for (const o of targets) {
  try {
    await s3.send(new CopyObjectCommand({
      Bucket: c.STORAGE_BUCKET,
      Key: o.Key,
      CopySource: `${c.STORAGE_BUCKET}/${encodeURIComponent(o.Key).replace(/%2F/g, "/")}`,
      MetadataDirective: "REPLACE",
      CacheControl: isModel(o.Key) ? MODELS : IMMUTABLE,
      // REPLACE drops everything not restated, so the type has to be set again or the object
      // comes back as application/octet-stream and the browser refuses to render it.
      ContentType: lookup(o.Key) || "application/octet-stream",
    }));
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${targets.length}`);
  } catch (e) {
    failed++;
    console.error(`  FAILED ${o.Key}: ${e.message}`);
  }
}
console.log(`\nrestamped ${done}, failed ${failed}`);
