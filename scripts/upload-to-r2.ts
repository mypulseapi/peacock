/**
 * Upload static assets to Cloudflare R2
 *
 * This script uploads:
 * - .vercel/output/static/_next/* -> _next/* (Vercel build - preferred)
 * - OR .next/static/* -> _next/static/* (Next.js build - fallback)
 * - public/images/* -> website/* (site images, namespaced away from the
 *   product's demo/, originals/ and avatars/ in the same bucket)
 *
 * Usage: pnpm deploy:r2
 */

import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Next.js precedence: .env.local wins, .env is the fallback. dotenv does not
// overwrite already-set vars, so loading in this order gives .env.local priority.
// (Previously .env.local only, so a repo with just .env could never authenticate.)
config({ path: ".env.local" });
config({ path: ".env" });

// Storage configuration, provider-neutral. `STORAGE_*` is what a deployment sets;
// `AWS_*` and `R2_*` are the deprecated spellings and still resolve, because the
// production deploy and Vercel both carry them today. The canonical precedence
// lives in packages/api/core/src/config/storage.config.ts — keep these in step.
const pick = (...names: string[]): string | undefined => {
  for (const n of names) {
    const v = process.env[n];
    if (v) return v;
  }
  return undefined;
};

const R2_ENDPOINT =
  pick("STORAGE_ENDPOINT", "AWS_S3_ENDPOINT") ??
  (process.env.R2_ACCOUNT_ID
    ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
    : undefined);
const R2_ACCESS_KEY_ID = pick("STORAGE_ACCESS_KEY_ID", "AWS_ACCESS_KEY_ID", "R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = pick(
  "STORAGE_SECRET_ACCESS_KEY",
  "AWS_SECRET_ACCESS_KEY",
  "R2_SECRET_ACCESS_KEY",
);
const R2_BUCKET_NAME = pick("STORAGE_BUCKET", "AWS_S3_BUCKET", "R2_BUCKET_NAME");
const R2_REGION = pick("STORAGE_REGION", "AWS_REGION") ?? "auto";

// Every marketing-site asset is namespaced under this prefix, because the
// bucket is shared with the product (demo/, originals/, avatars/). Same var
// the app reads in src/lib/cdn.ts, so upload target and runtime URLs can't drift.
const SITE_PREFIX = (process.env.NEXT_PUBLIC_CDN_PREFIX || "website").replace(/^\/+|\/+$/g, "");

// Validate environment variables
if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ Missing R2/S3 environment variables.");
  console.error(
    "Required: AWS_S3_ENDPOINT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET",
  );
  process.exit(1);
}

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: R2_REGION,
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Cache control settings
const CACHE_CONTROL = {
  // Immutable assets (hashed filenames) - cache for 1 year
  immutable: "public, max-age=31536000, immutable",
  // Mutable assets (favicon, etc.) - cache for 1 hour, revalidate
  mutable: "public, max-age=3600, must-revalidate",
};

interface UploadStats {
  uploaded: number;
  skipped: number;
  failed: number;
  totalSize: number;
}

/**
 * Get all files recursively from a directory
 */
function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Determine if a file should use immutable caching
 */
function isImmutableAsset(filePath: string): boolean {
  // Files with content hashes in _next/static are immutable
  if (filePath.includes("_next/static")) {
    return true;
  }
  // Files with hash patterns like .abc123.js
  if (/\.[a-f0-9]{8,}\.(js|css|woff2?|ttf|eot)$/i.test(filePath)) {
    return true;
  }
  return false;
}

/**
 * Upload a single file to R2
 */
async function uploadFile(
  localPath: string,
  r2Key: string,
): Promise<{ success: boolean; size: number }> {
  try {
    const fileContent = fs.readFileSync(localPath);
    const contentType = lookup(localPath) || "application/octet-stream";
    const cacheControl = isImmutableAsset(r2Key) ? CACHE_CONTROL.immutable : CACHE_CONTROL.mutable;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: r2Key,
        Body: fileContent,
        ContentType: contentType,
        CacheControl: cacheControl,
      }),
    );

    return { success: true, size: fileContent.length };
  } catch (error) {
    console.error(`  ❌ Failed to upload ${r2Key}:`, error);
    return { success: false, size: 0 };
  }
}

/**
 * Upload directory to R2
 */
async function uploadDirectory(
  localDir: string,
  r2Prefix: string,
  description: string,
): Promise<UploadStats> {
  const stats: UploadStats = {
    uploaded: 0,
    skipped: 0,
    failed: 0,
    totalSize: 0,
  };

  console.log(`\n📁 Uploading ${description}...`);

  if (!fs.existsSync(localDir)) {
    console.log(`  ⚠️  Directory not found: ${localDir}`);
    return stats;
  }

  const files = getAllFiles(localDir);
  console.log(`  Found ${files.length} files`);

  for (const file of files) {
    const relativePath = path.relative(localDir, file);
    const r2Key = r2Prefix ? `${r2Prefix}/${relativePath}` : relativePath;

    const result = await uploadFile(file, r2Key);

    if (result.success) {
      stats.uploaded++;
      stats.totalSize += result.size;
      process.stdout.write(`\r  ✅ Uploaded ${stats.uploaded}/${files.length} files`);
    } else {
      stats.failed++;
    }
  }

  console.log(""); // New line after progress
  return stats;
}

/**
 * Clear old assets from R2 bucket (optional)
 */
async function clearBucket(prefix?: string): Promise<void> {
  console.log(`\n🗑️  Clearing ${prefix ? `prefix: ${prefix}` : "bucket"}...`);

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await s3Client.send(listCommand);

    if (!response.Contents || response.Contents.length === 0) {
      console.log("  No objects to delete");
      return;
    }

    const deleteCommand = new DeleteObjectsCommand({
      Bucket: R2_BUCKET_NAME,
      Delete: {
        Objects: response.Contents.map((obj) => ({ Key: obj.Key })),
      },
    });

    await s3Client.send(deleteCommand);
    console.log(`  Deleted ${response.Contents.length} objects`);
  } catch (error) {
    console.error("  ❌ Failed to clear bucket:", error);
  }
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Main upload function
 */
async function main() {
  console.log("🚀 Starting R2 upload...");
  console.log(`   Bucket: ${R2_BUCKET_NAME}`);
  console.log(`   Endpoint: ${R2_ENDPOINT}`);
  console.log(`   Site prefix: ${SITE_PREFIX}/`);

  const startTime = Date.now();
  const totalStats: UploadStats = {
    uploaded: 0,
    skipped: 0,
    failed: 0,
    totalSize: 0,
  };

  /*
   * `--dir <path> --prefix <key>` mirrors one tree and stops.
   *
   * This exists for the assistant's model weights. They are 170MB and they are not in the
   * repository, because a git history is the wrong place for them, so there is nothing for the
   * normal run to walk. Keeping it here rather than in a throwaway script means the next person
   * who has to re-mirror a model has the command instead of having to rediscover it:
   *
   *   pnpm exec tsx scripts/upload-to-r2.ts --dir /tmp/models --prefix website/models
   */
  const dirFlag = process.argv.indexOf("--dir");
  if (dirFlag !== -1) {
    const dir = process.argv[dirFlag + 1];
    const prefixFlag = process.argv.indexOf("--prefix");
    const prefix = prefixFlag === -1 ? SITE_PREFIX : process.argv[prefixFlag + 1];
    if (!dir || !fs.existsSync(dir)) {
      console.error(`❌ --dir ${dir ?? "(missing)"} does not exist`);
      process.exit(1);
    }
    const one = await uploadDirectory(dir, prefix, `${dir} -> ${prefix}/`);
    console.log(`\n✅ ${one.uploaded} uploaded, ${one.failed} failed, ${(one.totalSize / 1048576).toFixed(1)} MB`);
    process.exit(one.failed > 0 ? 1 : 0);
  }

  // --clean is scoped to this site's own prefixes and NEVER the bucket root.
  // The bucket is shared with the product: an unprefixed clear would delete
  // demo/, originals/ and avatars/ along with the site.
  //
  // DO NOT pass --clean from this repository as things stand. `public/images`
  // was deleted locally once its contents were already in R2, so a clear of
  // `<prefix>/` removes the only copy of those images and the upload that
  // follows cannot put them back. Only `public/assets` could be restored.
  if (process.argv.includes("--clean")) {
    await clearBucket("_next");
    await clearBucket(`${SITE_PREFIX}/`);
  }

  // Check for Vercel build output (preferred) or fallback to Next.js build
  const vercelStaticDir = ".vercel/output/static";
  const useVercelBuild = fs.existsSync(vercelStaticDir);

  let nextStaticStats: UploadStats;

  if (useVercelBuild) {
    console.log("📦 Using Vercel build output (.vercel/output/static)");

    // Upload .vercel/output/static/_next -> _next
    nextStaticStats = await uploadDirectory(
      `${vercelStaticDir}/_next`,
      "_next",
      "Vercel static assets (.vercel/output/static/_next)",
    );
  } else {
    console.log("📦 Using Next.js build output (.next/static)");

    // Upload .next/static -> _next/static
    nextStaticStats = await uploadDirectory(
      ".next/static",
      "_next/static",
      "Next.js static assets (.next/static)",
    );
  }

  // Upload public/images -> website/. Only images: the rest of public/ is
  // favicons and framework leftovers that are served from the origin.
  const publicStats = await uploadDirectory(
    "public/images",
    SITE_PREFIX,
    `Website images (public/images -> ${SITE_PREFIX}/)`,
  );

  // Upload public/assets -> website/assets/. The designer's tree: the hero videos, their
  // posters and the brand marks. It keeps its own segment so it cannot collide with the
  // older `public/images` layout, which sits directly under the prefix.
  const assetStats = await uploadDirectory(
    "public/assets",
    `${SITE_PREFIX}/assets`,
    `Designed assets (public/assets -> ${SITE_PREFIX}/assets/)`,
  );

  // Combine stats
  totalStats.uploaded = nextStaticStats.uploaded + publicStats.uploaded + assetStats.uploaded;
  totalStats.failed = nextStaticStats.failed + publicStats.failed + assetStats.failed;
  totalStats.totalSize =
    nextStaticStats.totalSize + publicStats.totalSize + assetStats.totalSize;

  // Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("\n" + "=".repeat(50));
  console.log("📊 Upload Summary");
  console.log("=".repeat(50));
  console.log(`  ✅ Uploaded: ${totalStats.uploaded} files`);
  console.log(`  ❌ Failed: ${totalStats.failed} files`);
  console.log(`  📦 Total size: ${formatBytes(totalStats.totalSize)}`);
  console.log(`  ⏱️  Duration: ${duration}s`);
  console.log("");

  if (totalStats.failed > 0) {
    console.log("⚠️  Some files failed to upload. Check the logs above.");
    process.exit(1);
  }

  console.log("✨ Upload complete!");
  console.log(
    `   Assets served from: ${process.env.NEXT_PUBLIC_CDN_URL ?? process.env.AWS_S3_CDN_URL}/${SITE_PREFIX}/`,
  );
}

main().catch((error) => {
  console.error("❌ Upload failed:", error);
  process.exit(1);
});
