/**
 * The picture on each Research card: the owner's generated set (28 Oct 2026), in place of the drawings
 * that stood in for them while the grid was built. Transparent, 3 : 2, on the Decision Audit's picture
 * panel (`how-glow` on `surface-1`), so they follow the theme; a finding waiting on a first merchant
 * gets a dashed frame, so its status reads before its badge does. Alt text is the finding's own, in both locales (`content/pages/research.ts`).
 *
 * Their labels are in English, and they are copy: when a finding's numbers or order change, check its
 * picture says the same (07-WHAT-WE-DO-NOT-CLAIM applies to pictures too).
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import type { FigureKey } from "@/content/pages/research";

const FILES: Record<FigureKey, string> = {
  audit: "research/decision-audit.webp",
  photographs: "research/catalogue-and-photographs.webp",
  bits: "research/products-over-shopper.webp",
  parser: "research/search-parser.webp",
  "strip-grid": "research/recommendations-and-pages.webp",
  prose: "research/decision-api-agents.webp",
  promotion: "research/promotion-audit.webp",
  returns: "research/return-verification.webp",
  rerun: "research/verification-and-monitor.webp",
  studio: "research/merchandising-studio.webp",
  opensource: "research/opensource.webp",
};

export function ResearchPicture({
  figure,
  alt,
  waiting,
}: {
  figure: FigureKey;
  alt: string;
  waiting: boolean;
}) {
  return (
    <div
      className={`how-glow aspect-3/2 overflow-hidden rounded-2xl border bg-surface-1 ${waiting ? "border-dashed border-line-control" : "border-line"}`}
    >
      <Image
        src={img(FILES[figure])}
        alt={alt}
        width={1200}
        height={800}
        sizes="(min-width: 768px) 28rem, 100vw"
        className="size-full object-contain"
      />
    </div>
  );
}
