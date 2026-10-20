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
