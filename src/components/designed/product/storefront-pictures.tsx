/**
 * The storefront product pages' pictures, the owner's generated sets (Search 28 Oct 2026), in place of
 * the drawings in `storefront-drawings.tsx`, which stay for the pages whose set is not made yet. The
 * hero is the page's `heroImage`, in its content.
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
