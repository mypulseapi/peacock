/**
 * What each sector page does differently from the shared one (`sector-page.tsx`): its figures, its
 * pictures, and Ecommerce's two figures drawn in code. Every number here was the one hard-coded
 * in that sector's converted sections, unchanged.
 */
import type { Sector } from "./sector-page";
import { EcommerceHeroFigure } from "./ecommerce/hero-figure";
import { EcommerceRepairFlow } from "./ecommerce/repair-flow";
import { SpecMap } from "./distribution/spec-map";

/** Ecommerce's coverage is counted on the 216-product test shelf, as its hero figure states. */
const SHELF = 216;
const pct = (n: number) => Math.round((100 * n) / SHELF);

export const SECTORS: Record<string, Sector> = {
  ecommerce: {
    slug: "ecommerce",
    stats: ["38%", "34%"],
    coverage: [136, 156, 161, 54].map(pct),
    hero: <EcommerceHeroFigure />,
    repair: <EcommerceRepairFlow />,
  },
  fmcg: {
    slug: "fmcg",
    stats: ["38%", "34%", "79%"],
    coverage: [22, 58, 31, 97],
    hero: {
      src: "sectors/fmcg-shelf-label-evidence-coverage-ranked.webp",
      width: 1400,
      height: 891,
      alt: "section1.figureAlt",
    },
    problem: {
      src: "sectors/fmcg-shopper-reading-pack-label.webp",
      width: 1100,
      height: 727,
      alt: "section3.figureAlt",
    },
    labelledReasons: true,
  },
  technology: {
    slug: "technology",
    stats: ["38%", "79%"],
    coverage: [63, 72, 74, 25],
    hero: {
      src: "sectors/technology-laptop-specs-attribute-coverage.webp",
      width: 1300,
      height: 1074,
      alt: "section1.figureAlt",
    },
  },
  furniture: {
    slug: "furniture",
    stats: ["38%", "34%"],
    coverage: [18, 44, 52, 95],
    hero: {
      src: "sectors/furniture-room-fit-measurements-coverage.webp",
      width: 1400,
      height: 1023,
      alt: "section1.figureAlt",
    },
    scene: {
      src: "sectors/furniture-living-room-armchair-scene.webp",
      width: 760,
      height: 1230,
      alt: "section2.sceneAlt",
    },
    problem: {
      src: "sectors/furniture-chair-measurements-callouts.webp",
      width: 1100,
      height: 755,
      alt: "section3.figureAlt",
    },
    shelf: {
      before: {
        src: "sectors/furniture-shelf-before-unanswered.webp",
        width: 760,
        height: 882,
        alt: "section4.beforeAlt",
      },
      after: {
        src: "sectors/furniture-shelf-after-filters-usable.webp",
        width: 960,
        height: 872,
        alt: "section4.afterAlt",
      },
    },
  },
  cosmetics: {
    slug: "cosmetics",
    stats: ["34%", "79%"],
    coverage: [24, 29, 41, 88],
    hero: {
      src: "sectors/cosmetics-shelf-suitability-attribute-coverage.webp",
      width: 1400,
      height: 700,
      alt: "section1.figureAlt",
    },
  },
  distribution: {
    slug: "distribution",
    stats: ["36%", "66%", "79%"],
    coverage: [19, 34, 47, 91],
    hero: {
      src: "sectors/distribution-industrial-parts-attribute-coverage.webp",
      width: 1400,
      height: 700,
      alt: "section1.figureAlt",
    },
    coverageExtra: <SpecMap />,
  },
};
