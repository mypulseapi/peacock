#!/usr/bin/env node
/**
 * Search Unsplash, and download a photo into public/images/ as WebP.
 *
 * Two things here are obligations rather than niceties, and both are easy to
 * miss when doing this by hand with curl:
 *
 *  1. The API Guidelines require hitting the photo's `download_location`
 *     endpoint whenever a photo is actually used, not just when it is
 *     previewed. That is how a photographer's download count is credited. We
 *     do it on download, once.
 *  2. They require attribution to the photographer and to Unsplash. This writes
 *     a credits file next to the assets so the attribution cannot drift away
 *     from the image it belongs to.
 *
 * The key is read from .env and never printed.
 *
 *   node scripts/unsplash.mjs search "warehouse aisle"
 *   node scripts/unsplash.mjs get <photoId> images/industries/ecommerce.webp [width]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Outside public/, which is emptied after every upload and took this
// file with it the first time.
const CREDITS = join(ROOT, "IMAGE-CREDITS.json");

function accessKey() {
  const env = readFileSync(join(ROOT, ".env"), "utf8");
  const m = env.match(/^USPLASH_ACCESS_KEY=(.*)$/m);
  if (!m) throw new Error("USPLASH_ACCESS_KEY not found in .env");
  return m[1].trim().replace(/^["']|["']$/g, "");
}

async function api(path) {
  const res = await fetch(`https://api.unsplash.com${path}`, {
    headers: { Authorization: `Client-ID ${accessKey()}`, "Accept-Version": "v1" },
  });
  if (!res.ok) throw new Error(`unsplash ${res.status} ${await res.text()}`);
  return res.json();
}

async function search(query) {
  const d = await api(
    `/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
  );
  console.log(`${d.total} results for "${query}"\n`);
  for (const r of d.results) {
    console.log(
      `  ${r.id.padEnd(13)} ${String(r.width).padStart(5)}x${String(r.height).padEnd(5)}` +
        `  ${r.user.name.slice(0, 22).padEnd(22)}  ${(r.alt_description || "").slice(0, 60)}`,
    );
  }
}

async function get(id, outRel, width = "1800") {
  const p = await api(`/photos/${id}`);

  // Required by the API Guidelines whenever a photo is used.
  await fetch(p.links.download_location, {
    headers: { Authorization: `Client-ID ${accessKey()}`, "Accept-Version": "v1" },
  });

  const url = `${p.urls.raw}&w=${width}&q=85&fm=jpg&fit=max`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const tmp = `/tmp/unsplash-${id}.jpg`;
  writeFileSync(tmp, buf);

  const out = join(ROOT, "public", outRel);
  mkdirSync(dirname(out), { recursive: true });
  // Pillow is already a dependency of the image work in this repo.
  execFileSync("python3", [
    "-c",
    `from PIL import Image;im=Image.open("${tmp}").convert("RGB");im.save("${out}","WEBP",quality=85,method=6);print(im.size)`,
  ], { stdio: "inherit" });

  const credits = existsSync(CREDITS) ? JSON.parse(readFileSync(CREDITS, "utf8")) : {};
  credits[outRel] = {
    photographer: p.user.name,
    photographerUrl: `${p.user.links.html}?utm_source=pulse&utm_medium=referral`,
    source: "Unsplash",
    sourceUrl: `${p.links.html}?utm_source=pulse&utm_medium=referral`,
    licence: "Unsplash License",
  };
  writeFileSync(CREDITS, `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`wrote public/${outRel}  credit: ${p.user.name}`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "search") await search(rest.join(" "));
else if (cmd === "get") await get(rest[0], rest[1], rest[2]);
else {
  console.error("usage: unsplash.mjs search <query> | get <id> <images/...webp> [width]");
  process.exit(1);
}
