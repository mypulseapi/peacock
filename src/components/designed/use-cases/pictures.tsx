/**
 * The use-case pages' pictures, where the owner's generated set exists (SEO and AEO, 28 Oct 2026);
 * Time to market keeps its drawings (`drawings.tsx`) until its set arrives.
 *
 * Transparent PNGs served as WebP, in the same wash frame the drawings used, so the page's surface
 * shows through and they follow the theme. Steps and cards share one 3 : 2 box, so a picture made a
 * little wider still lines up with its neighbours.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import type { UseCasePictureAlt } from "@/content/pages/seo-aeo";
import type { UseCaseArt } from "./use-case-page";

const Frame = ({
  children,
  box = "",
}: {
  children: React.ReactNode;
  box?: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl border border-line bg-primary-wash ${box}`}
  >
    {children}
  </div>
);

const pic = (
  src: string,
  alt: string,
  w: number,
  h: number,
  sizes: string,
  fill = false,
) => (
  <Image
    src={img(src)}
    alt={alt}
    width={w}
    height={h}
    sizes={sizes}
    className={fill ? "size-full object-contain" : "block h-auto w-full"}
  />
);

/** Each picture's file and size, in the page's order. */
const SEO_AEO = {
  hero: ["use-cases/seo-aeo-hero-page-read-by-two-engines.webp", 1600, 846],
  situation: [
    "use-cases/seo-aeo-situation-green-report-flat-traffic.webp",
    1200,
    800,
  ],
  steps: [
    ["use-cases/seo-aeo-step-1-measure.webp", 1000, 667],
    ["use-cases/seo-aeo-step-2-recover.webp", 1000, 667],
    ["use-cases/seo-aeo-step-3-express.webp", 1000, 667],
  ],
  gets: [
    [
      "use-cases/seo-aeo-card-1-agents-do-not-tolerate-ambiguity.webp",
      1000,
      667,
    ],
    ["use-cases/seo-aeo-card-2-traffic-has-shifted.webp", 1000, 563],
    ["use-cases/seo-aeo-card-3-which-fields-not-how-many.webp", 1000, 667],
    ["use-cases/seo-aeo-card-4-one-measurement-three-surfaces.webp", 1000, 667],
  ],
} as const;

/** The SEO and AEO page's `art`, in place of its drawings. */
export function seoAeoPictures(alt: UseCasePictureAlt): UseCaseArt {
  const [hs, hw, hh] = SEO_AEO.hero;
  const [ss, sw, sh] = SEO_AEO.situation;
  return {
    hero: (
      <Frame>
        {pic(hs, alt.hero, hw, hh, "(min-width: 1280px) 70rem, 100vw")}
      </Frame>
    ),
    situation: (
      <Frame>
        {pic(ss, alt.situation, sw, sh, "(min-width: 1024px) 36rem, 100vw")}
      </Frame>
    ),
    steps: SEO_AEO.steps.map(([src, w, h], i) => (
      <Frame key={src} box="aspect-3/2">
        {pic(src, alt.steps[i], w, h, "(min-width: 1280px) 13rem, 100vw", true)}
      </Frame>
    )),
    gets: SEO_AEO.gets.map(([src, w, h], i) => (
      <Frame key={src} box="aspect-3/2">
        {pic(src, alt.gets[i], w, h, "(min-width: 640px) 34rem, 100vw", true)}
      </Frame>
    )),
  };
}
