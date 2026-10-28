/**
 * The storefront product pages' pictures, the owner's generated sets (Search, Recommendations, Pages
 * and Merchandising Studio, 28 Oct 2026), in place of the drawings in `storefront-drawings.tsx`, which
 * stay for the page whose set is not made yet. The hero is the page's `heroImage`, in its content.
 *
 * Transparent PNGs served as WebP, 3 : 2 like the boxes `ChapterPage` sets them in, so the box's own
 * surface shows through and they follow the theme.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";

const FILES = {
  search: {
    steps: [
      "product/search-step-1-relevance-as-now.webp",
      "product/search-step-2-weighted-by-the-visit.webp",
      "product/search-step-3-a-share-never-sees-it.webp",
    ],
    gains: [
      "product/search-gain-1-intent-parsed-from-the-query.webp",
      "product/search-gain-2-the-factors-named.webp",
      "product/search-gain-3-a-decision-record-per-request.webp",
      "product/search-gain-4-a-control-arm-by-default.webp",
    ],
  },
  recommendations: {
    steps: [
      "product/recommendations-step-1-the-visit-emits.webp",
      "product/recommendations-step-2-the-catalogue-is-ordered.webp",
      "product/recommendations-step-3-exposure-is-logged.webp",
    ],
    gains: [
      "product/recommendations-gain-1-useful-on-visit-one.webp",
      "product/recommendations-gain-2-any-slot-on-any-surface.webp",
      "product/recommendations-gain-3-one-ranker-not-two.webp",
      "product/recommendations-gain-4-falls-back-to-your-own-strip.webp",
    ],
  },
  pages: {
    steps: [
      "product/pages-step-1-the-visit-starts-with-context.webp",
      "product/pages-step-2-it-re-ranks-as-they-move.webp",
      "product/pages-step-3-a-share-sees-your-rule.webp",
    ],
    gains: [
      "product/pages-gain-1-any-grid-any-page.webp",
      "product/pages-gain-2-campaign-context-from-the-first-request.webp",
      "product/pages-gain-3-your-layout-untouched.webp",
      "product/pages-gain-4-a-control-arm-on-every-page.webp",
    ],
  },
  "merchandising-studio": {
    steps: [
      "product/merchandising-studio-step-1-manage-what-the-engine-reads.webp",
      "product/merchandising-studio-step-2-set-the-holdback.webp",
      "product/merchandising-studio-step-3-pull-a-decision-record.webp",
    ],
    gains: [
      "product/merchandising-studio-gain-1-catalogue-and-attributes.webp",
      "product/merchandising-studio-gain-2-persona-tagging.webp",
      "product/merchandising-studio-gain-3-holdback-control.webp",
      "product/merchandising-studio-gain-4-the-decision-record.webp",
    ],
  },
};

const pic = (src: string, alt: string) => (
  <Image
    key={src}
    src={img(src)}
    alt={alt}
    width={1000}
    height={667}
    sizes="(min-width: 1024px) 36rem, 100vw"
    className="size-full object-contain"
  />
);

/** A page's step and gain pictures, for `ChapterPage`'s `art.steps` and `gainPictures`. */
export function storefrontPictures(
  slug: keyof typeof FILES,
  alt: { steps: string[]; gains: string[] },
) {
  const f = FILES[slug];
  return {
    steps: f.steps.map((src, i) => pic(src, alt.steps[i])),
    gains: f.gains.map((src, i) => pic(src, alt.gains[i])),
  };
}
