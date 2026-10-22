/**
 * The product hero's evidence panel, one entry per product page.
 *
 * Structure and wording follow the reference markup supplied on 2026-10-21: a buying decision with
 * its evidence ticked off, the product with its measurements called out, and what to fix ranked by
 * impact. The reference is washing machines; these are the three categories the pages were asked
 * to carry, one each.
 *
 * On the numbers
 * --------------
 * The evidence details are illustrative of a shelf, the same standing as the coverage figures on
 * the sector pages, and the pages say so. Nothing here is a measured result.
 *
 * On the Vietnamese
 * -----------------
 * The structure is declared once and the Vietnamese is a lookup over the strings in it, rather
 * than a second copy of the whole tree. A duplicated tree means every new sector is two edits and
 * a missed one serves English with no type error; this way an untranslated string degrades to
 * English on its own and adding a sector cannot desynchronise anything. Repeated strings
 * ("Recorded" appears three times) translate once, which is also what you want.
 */
import { byLocale } from "./locale";

export type Evidence = {
  /** Known, or a question the catalogue cannot answer. */
  known: boolean;
  label: string;
  detail: string;
  /**
   * Where the callout sits, and therefore which way its arrow points.
   *
   * They are annotations on a photograph, not rows in a table: a reader should be able to see
   * which part of the product each one is about. Four positions, because a fifth starts to crowd
   * the product it is annotating.
   */
  at: "top-left" | "left" | "bottom-left" | "right";
};

export type Recommendation = {
  text: string;
  /** `high` reads as the urgent chip, `medium` as the quieter one. */
  impact: "high" | "medium";
  /** A lucide icon name, matching the reference's per-row marks. */
  icon: "image" | "scan" | "ruler" | "tag" | "flask";
};

export type HeroEvidence = {
  /** The sector whose name labels the product photograph, for the alt text. */
  slug: string;
  /** What the shopper is trying to settle, in their own words. */
  question: string;
  photo: string;
  width: number;
  height: number;
  evidence: Evidence[];
  recommendations: Recommendation[];
};

const HERO_EVIDENCE: Record<string, HeroEvidence> = {
  /* Decision Audit: a laptop, and the attribute a buyer filters on that nobody recorded. */
  audit: {
    slug: "ecommerce",
    question: "“Will this screen be big enough to work on?”",
    photo: "product/gaming-laptop-cutout.webp",
    width: 1536,
    height: 1024,
    evidence: [
      { known: true, label: "Memory", detail: "16 GB, recorded", at: "top-left" },
      { known: true, label: "Storage", detail: "512 GB, recorded", at: "left" },
      { known: true, label: "Processor", detail: "i7, recorded", at: "bottom-left" },
      { known: false, label: "Screen size", detail: "In the title, not filterable", at: "right" },
    ],
    recommendations: [
      { text: "Record screen size", impact: "high", icon: "ruler" },
      { text: "Backfill from titles", impact: "high", icon: "scan" },
      { text: "Add a size visual", impact: "medium", icon: "image" },
      { text: "Expose as a filter", impact: "medium", icon: "tag" },
    ],
  },

  /* Decision Verification: a pack shot, and the claim printed on it but never recorded. */
  verification: {
    slug: "fmcg",
    question: "“Is this one fragrance free?”",
    photo: "home/baby-laundry-powder-cutout.webp",
    width: 1536,
    height: 1024,
    evidence: [
      { known: true, label: "Pack size", detail: "2 kg, recorded", at: "top-left" },
      { known: true, label: "Brand", detail: "Recorded", at: "left" },
      { known: true, label: "Concentration", detail: "Recorded", at: "bottom-left" },
      { known: true, label: "Dietary claim", detail: "Fragrance free, now recorded", at: "right" },
    ],
    recommendations: [
      { text: "Record fragrance free", impact: "high", icon: "flask" },
      { text: "Re-measure the shelf", impact: "high", icon: "scan" },
      { text: "Expose as a filter", impact: "medium", icon: "tag" },
      { text: "Keep pack evidence", impact: "medium", icon: "image" },
    ],
  },

  /* Decision Monitor: a range that was complete last quarter and is not now. */
  monitor: {
    slug: "cosmetics",
    question: "“Is this right for my skin?”",
    photo: "sectors/cosmetics-personal-care-product-range.webp",
    width: 1536,
    height: 1024,
    evidence: [
      { known: true, label: "Volume", detail: "50 ml, recorded", at: "top-left" },
      { known: true, label: "Key ingredient", detail: "Recorded", at: "left" },
      { known: false, label: "Skin type", detail: "Dropped on 14 new lines", at: "bottom-left" },
      { known: false, label: "Concern addressed", detail: "Never recorded", at: "right" },
    ],
    recommendations: [
      { text: "Skin type dropped", impact: "high", icon: "flask" },
      { text: "Re-measure the range", impact: "high", icon: "scan" },
      { text: "Record the concern", impact: "medium", icon: "ruler" },
      { text: "Alert on the next slip", impact: "medium", icon: "tag" },
    ],
  },
};

/**
 * Vietnamese for every string above, keyed by the English.
 *
 * Quantities keep their numerals and units: "16 GB" is 16 GB in either language, and translating
 * the unit would make the panel disagree with the catalogue it is describing.
 */
const VI: Record<string, string> = {
  // The questions a shopper is actually asking.
  "“Will this screen be big enough to work on?”": "“Màn hình này có đủ lớn để làm việc không?”",
  "“Is this one fragrance free?”": "“Loại này có phải loại không hương liệu không?”",
  "“Is this right for my skin?”": "“Cái này có hợp với da của tôi không?”",

  // Attribute names.
  Memory: "RAM",
  Storage: "Dung lượng",
  Processor: "Vi xử lý",
  "Screen size": "Kích thước màn hình",
  "Pack size": "Khối lượng",
  Brand: "Thương hiệu",
  Concentration: "Nồng độ",
  "Dietary claim": "Công bố thành phần",
  Volume: "Dung tích",
  "Key ingredient": "Thành phần chính",
  "Skin type": "Loại da",
  "Concern addressed": "Vấn đề cần xử lý",

  // What the catalogue does or does not hold.
  "16 GB, recorded": "16 GB, đã ghi nhận",
  "512 GB, recorded": "512 GB, đã ghi nhận",
  "i7, recorded": "i7, đã ghi nhận",
  "In the title, not filterable": "Nằm trong tiêu đề, không lọc được",
  "2 kg, recorded": "2 kg, đã ghi nhận",
  Recorded: "Đã ghi nhận",
  "Fragrance free, now recorded": "Không hương liệu, nay đã ghi nhận",
  "50 ml, recorded": "50 ml, đã ghi nhận",
  "Dropped on 14 new lines": "Mất ở 14 dòng hàng mới",
  "Never recorded": "Chưa bao giờ được ghi nhận",

  // What to do about it.
  "Record screen size": "Ghi nhận kích thước màn hình",
  "Backfill from titles": "Lấy lại từ tiêu đề",
  "Add a size visual": "Thêm hình minh hoạ kích thước",
  "Expose as a filter": "Đưa thành bộ lọc",
  "Record fragrance free": "Ghi nhận không hương liệu",
  "Re-measure the shelf": "Đo lại kệ hàng",
  "Keep pack evidence": "Giữ bằng chứng trên bao bì",
  "Skin type dropped": "Loại da đã bị bỏ sót",
  "Re-measure the range": "Đo lại dòng hàng",
  "Record the concern": "Ghi nhận vấn đề cần xử lý",
  "Alert on the next slip": "Cảnh báo khi tụt lần tới",
};

const vi = (s: string) => VI[s] ?? s;

const HERO_EVIDENCE_VI: Record<string, HeroEvidence> = Object.fromEntries(
  Object.entries(HERO_EVIDENCE).map(([key, entry]) => [
    key,
    {
      ...entry,
      question: vi(entry.question),
      evidence: entry.evidence.map((row) => ({
        ...row,
        label: vi(row.label),
        detail: vi(row.detail),
      })),
      recommendations: entry.recommendations.map((row) => ({ ...row, text: vi(row.text) })),
    },
  ]),
);

/** The evidence for one product page, in the active locale. */
export const heroEvidence = (locale: string, variant: string): HeroEvidence =>
  byLocale({ en: HERO_EVIDENCE, vi: HERO_EVIDENCE_VI }, locale)[variant];
