// Uploads public/images/** to the R2 bucket under the same images/ prefix.
// Usage: node scripts/upload-images-to-r2.mjs
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import "dotenv/config";

const {
  STORAGE_ACCOUNT_ID,
  STORAGE_ACCESS_KEY_ID,
  STORAGE_SECRET_ACCESS_KEY,
  STORAGE_BUCKET,
} = process.env;

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${STORAGE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: STORAGE_ACCESS_KEY_ID, secretAccessKey: STORAGE_SECRET_ACCESS_KEY },
});

const root = "public";
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [...walk("public/images")];
for (const file of files) {
  const key = relative(root, file); // e.g. images/logo.png
  const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
  await s3.send(
    new PutObjectCommand({
      Bucket: STORAGE_BUCKET,
      Key: key,
      Body: readFileSync(file),
      ContentType: MIME[ext] || "application/octet-stream",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  console.log("uploaded:", key);
}
console.log(`\nDone. ${files.length} files → ${STORAGE_BUCKET}`);
