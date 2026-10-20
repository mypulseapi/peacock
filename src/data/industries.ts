/**
 * Kept as a thin re-export so the sitemap, footer and routes have one place to
 * read the sector list from. The sectors themselves, including their copy, now
 * live in `src/content/industries.ts` beside every other typed content module.
 *
 * The old shape carried an `accentColor` of blue/green/purple per sector, which
 * was the last reader of the retired three-hue map. Sectors are one accent now,
 * like everything else.
 */
export { sectors, sector, sectorSlugs, RETIRED_SECTOR_SLUGS } from "@/content/industries";
export type { Sector, SectorAttribute } from "@/content/industries";

/** Old name, still used by the sitemap and the footer. */
export { sectorSlugs as industrySlugs } from "@/content/industries";
