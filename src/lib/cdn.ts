import manifest from "./asset-manifest.json";

// Build a URL for a website image on the CDN.
//
// The R2 bucket is shared with the product (demo/, originals/, avatars/), so
// every marketing-site asset lives under NEXT_PUBLIC_CDN_PREFIX. The local
// public/images tree mirrors that structure 1:1, so the only difference
// between environments is the prefix.
//
// The ?v= hash comes from scripts/gen-asset-manifest.mjs (run on build). The
// CDN caches these paths for four hours, so overwriting a file in place would
// otherwise keep serving the old bytes until the TTL expired, that shipped
// stale artwork once already. A content hash means changed files get a new URL
// and unchanged files stay cached.
//
//   img("brand/logo.webp")  ->  https://cdn.thepulseapi.com/website/brand/logo.webp?v=2c1d3be9
//                           ->  /images/brand/logo.webp?v=2c1d3be9      (CDN unset)
const trim = (v: string | undefined) => (v || "").replace(/^\/+|\/+$/g, "");

const CDN = (process.env.NEXT_PUBLIC_CDN_URL || "").replace(/\/+$/, "");
const PREFIX = trim(process.env.NEXT_PUBLIC_CDN_PREFIX);
const HASHES = manifest as Record<string, string>;

export function img(path: string): string {
  const clean = trim(path);
  const base = CDN
    ? PREFIX
      ? `${CDN}/${PREFIX}/${clean}`
      : `${CDN}/${clean}`
    : `/images/${clean}`;
  const v = HASHES[clean];
  return v ? `${base}?v=${v}` : base;
}

/**
 * The designer's assets: the hero videos, their posters, the brand marks.
 *
 * A sibling of `img()` rather than a call into it, because the two trees sit at different
 * depths on the CDN. `img()` maps `about/hero.webp` to `<prefix>/about/hero.webp`, with no
 * `images/` segment, and that layout is already in the bucket. The designed tree keeps its own
 * `assets/` segment so the two cannot collide.
 *
 * Both read `NEXT_PUBLIC_CDN_URL`. Nothing here knows the hostname: with the variable unset,
 * this returns the local path and Next serves `public/assets` exactly as it does today, which
 * is what makes `pnpm dev` work without any CDN at all.
 *
 *   asset("product/decision-audit-light.webp")
 *     -> https://cdn.example.com/website/assets/product/decision-audit-light.webp?v=2c1d3be9
 *     -> /assets/product/decision-audit-light.webp?v=2c1d3be9      (CDN unset)
 */
export function asset(path: string): string {
  const clean = `assets/${trim(path)}`;
  const base = CDN ? (PREFIX ? `${CDN}/${PREFIX}/${clean}` : `${CDN}/${clean}`) : `/${clean}`;
  const v = HASHES[clean];
  return v ? `${base}?v=${v}` : base;
}

/**
 * The base of a family of files, for `data-bg-video`.
 *
 * `designed-motion.js` takes that attribute as a stem and appends `-light.av1.mp4`,
 * `-dark.h264.mp4`, `-light.webp` and so on. A stem has no single file behind it and therefore
 * no content hash, and appending `?v=` here would put the query in the middle of the URL the
 * script then builds. These four videos are cache-busted by changing their names instead.
 */
export function assetStem(path: string): string {
  const clean = `assets/${trim(path)}`;
  return CDN ? (PREFIX ? `${CDN}/${PREFIX}/${clean}` : `${CDN}/${clean}`) : `/${clean}`;
}
