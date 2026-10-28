/**
 * The use-case pages' pictures, the owner's generated sets (SEO and AEO 28 Oct 2026, Time to market
 * the same day), in place of the drawings that stood in for them.
 *
 * Transparent PNGs served as WebP, in a wash frame, so the page's surface shows through and they
 * follow the theme. A page's steps and cards share one box shape, so a picture made a little wider or
 * narrower still lines up with its neighbours: 3 : 2 on SEO and AEO, 2 : 1 on Time to market, whose
 * set came out wide.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { img } from "@/lib/cdn";
import type { UseCasePictureAlt } from "@/content/pages/seo-aeo";
import type { UseCaseArt } from "./use-case-page";

type File = readonly [src: string, width: number, height: number];
interface PictureSet {
  hero: File;
  situation: File;
  steps: readonly File[];
  gets: readonly File[];
  /** The box every step and card picture sits in. */
  box: string;
}

const Frame = ({
  children,
  box = "",
}: {
  children: ReactNode;
  box?: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl border border-line bg-primary-wash ${box}`}
  >
    {children}
  </div>
);

const pic = ([src, w, h]: File, alt: string, sizes: string, fill = false) => (
  <Image
    src={img(src)}
    alt={alt}
    width={w}
    height={h}
    sizes={sizes}
    className={fill ? "size-full object-contain" : "block h-auto w-full"}
  />
);

function pictures(set: PictureSet, alt: UseCasePictureAlt): UseCaseArt {
  return {
    hero: (
      <Frame>
        {pic(set.hero, alt.hero, "(min-width: 1280px) 70rem, 100vw")}
      </Frame>
    ),
    situation: (
      <Frame>
        {pic(set.situation, alt.situation, "(min-width: 1024px) 36rem, 100vw")}
      </Frame>
    ),
    steps: set.steps.map((f, i) => (
      <Frame key={f[0]} box={set.box}>
        {pic(f, alt.steps[i], "(min-width: 1280px) 13rem, 100vw", true)}
      </Frame>
    )),
    gets: set.gets.map((f, i) => (
      <Frame key={f[0]} box={set.box}>
        {pic(f, alt.gets[i], "(min-width: 640px) 34rem, 100vw", true)}
      </Frame>
    )),
  };
}

const SEO_AEO: PictureSet = {
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
  box: "aspect-3/2",
};

const TIME_TO_MARKET: PictureSet = {
  hero: [
    "use-cases/time-to-market-hero-eleven-formats-one-date.webp",
    1600,
    842,
  ],
  situation: [
    "use-cases/time-to-market-situation-the-date-does-not-move.webp",
    1200,
    514,
  ],
  steps: [
    ["use-cases/time-to-market-step-1-measure-a-sample.webp", 1000, 667],
    ["use-cases/time-to-market-step-2-minimum-decidable-set.webp", 1000, 500],
    [
      "use-cases/time-to-market-step-3-backfill-against-a-number.webp",
      1000,
      480,
    ],
  ],
  gets: [
    ["use-cases/time-to-market-card-1-launch-checklist.webp", 1000, 477],
    ["use-cases/time-to-market-card-2-where-each-fact-lives.webp", 1000, 500],
    ["use-cases/time-to-market-card-3-a-number-before-traffic.webp", 1000, 500],
    ["use-cases/time-to-market-card-4-a-defensible-cut-line.webp", 1000, 500],
  ],
  box: "aspect-2/1",
};

/** The SEO and AEO page's `art`. */
export const seoAeoPictures = (alt: UseCasePictureAlt) =>
  pictures(SEO_AEO, alt);
/** The Time to market page's `art`. */
export const timeToMarketPictures = (alt: UseCasePictureAlt) =>
  pictures(TIME_TO_MARKET, alt);
