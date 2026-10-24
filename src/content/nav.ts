import { byLocale } from "./locale";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  GitCompare,
  BellRing,
  Undo2,
  ShoppingCart,
  ShoppingBasket,
  Cpu,
  Sofa,
  Sparkles,
  Boxes,
  BookText,
  PenLine,
  UserRound,
} from "lucide-react";

/**
 * Navigation IA, trimmed on 2026-10-06 after the team review.
 *
 * The 2026-09 version split Product across three columns: the catalogue tools,
 * the storefront surfaces, and the method pages. The review read that panel as
 * complex rather than complete, so Product is now the three catalogue products
 * only, in the order they are sold: audit, verification, monitor. The storefront
 * surfaces and the method pages still exist and are still linked from the
 * footer; they are no longer the first thing a visitor has to parse.
 *
 * Templates is a product-category list since 2026-10-06, not a channel list.
 * The six were marketplaces, B2B, feeds, travel and agents, which answered
 * "how do you sell" when the merchant is asking "what do I sell". It also
 * promised two sectors that hires/08-QUALIFIED-MERCHANT.md qualifies out.
 *
 * Solutions became Templates for the same reason. A category list is a question
 * the visitor can answer ("which one am I?"), and the blurbs were answering it
 * for them. Hence `blurb` is optional: in Templates the label is the whole item.
 *
 * Copy lives here rather than in next-intl messages while the wording is under
 * review; extraction to en.json / vi.json is mechanical once it settles.
 */
export type NavTone = "sig" | "blue" | "amber" | "teal" | "coral";

export interface NavItem {
  label: string;
  href: string;
  /** Omitted in Templates, where the category name is the whole item. */
  blurb?: string;
  icon: LucideIcon;
  /** Rendered as a muted tag. Use sparingly and never to imply something ships. */
  tag?: string;
}

/**
 * One side of a split panel.
 *
 * Nothing sets this since the Product panel was cut to one column. Kept because
 * the renderer still reads it and a future panel may need two sides again.
 */
export interface NavColumn {
  eyebrow: string;
  tone: NavTone;
  /** Does the positioning work the competitor's panel headline does. */
  headline: string;
  items: NavItem[];
}

export interface NavGroup {
  label: string;
  /** Left rail of the panel: one sentence on what this whole group is for. */
  summary: string;
  items: NavItem[];
  /**
   * When present the panel renders as two columns instead of rail + list, and
   * `items` is the flattened form the mobile drawer and the sitemap read.
   */
  columns?: NavColumn[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Product",
    summary:
      "Measure the catalogue, repair it, then keep it measured. In that order.",
    items: [
      {
        href: "/product/decision-audit",
        icon: ClipboardCheck,
        label: "Decision Audit",
        blurb:
          "Which missing field to record first, ranked, in your own catalogue.",
      },
      {
        href: "/product/decision-verification",
        icon: GitCompare,
        label: "Decision Verification",
        blurb:
          "Recompute after the repair and see exactly what moved. No traffic needed.",
      },
      {
        href: "/product/return-verification",
        icon: Undo2,
        label: "Return Verification",
        blurb:
          "See which missing facts go with returns, and whether a repair moved them.",
      },
      {
        href: "/product/decision-monitor",
        icon: BellRing,
        label: "Decision Monitor",
        blurb: "Catalogues decay. Get told when a shelf slips and why.",
        tag: "Recurring",
      },
    ],
  },
  {
    label: "Templates",
    summary:
      "Pick your category. Each one shows the same shelf before and after the repair.",
    items: [
      {
        href: "/industries/ecommerce",
        icon: ShoppingCart,
        label: "Ecommerce and retail",
      },
      {
        href: "/industries/fmcg",
        icon: ShoppingBasket,
        label: "FMCG and consumer goods",
      },
      {
        href: "/industries/technology",
        icon: Cpu,
        label: "Technology and electronics",
      },
      {
        href: "/industries/furniture",
        icon: Sofa,
        label: "Furniture and homewares",
      },
      {
        href: "/industries/cosmetics",
        icon: Sparkles,
        label: "Cosmetics and personal care",
      },
      {
        href: "/industries/distribution",
        icon: Boxes,
        label: "B2B and industrial",
      },
    ],
  },
  {
    label: "Resources",
    summary: "Written for the person who has to justify this internally.",
    items: [
      {
        href: "/docs",
        icon: BookText,
        label: "Documentation",
        blurb:
          "Integrate in ten lines, or never integrate at all and just take the audit.",
      },
      {
        href: "/blog",
        icon: PenLine,
        label: "Notes",
        blurb: "What we measured, what surprised us, what we got wrong.",
      },
      {
        href: "/about",
        icon: UserRound,
        label: "About us",
        blurb: "Who builds Pulse, and why.",
      },
    ],
  },
];

/**
 * Pricing is the only flat link.
 *
 * About us led this list from the 2026-10 PDF review, which circled the empty
 * space left of "Product" and drew an arrow to it from "About us". It was
 * removed on 2026-10-21: it also sits under Resources, and the header showed
 * both at once, which reads as two different destinations rather than one page
 * reached twice. Resources is the one that stayed, so the grouping survives.
 *
 * Flat links render after the group buttons, so order in this list is not enough
 * to move one in front of them. `lead` marks the ones drawn before the groups.
 */
export const NAV_FLAT = [{ label: "Pricing", href: "/pricing" }];
export const NAV_CTA = { label: "Request an audit", href: "/contact" };

/* ---------------------------------------------------------------------------
   Vietnamese. Hand-written, not machine-translated.
   -------------------------------------------------------------------------- */
export const NAV_GROUPS_VI: NavGroup[] = [
  {
    label: "Sản phẩm",
    summary:
      "Đo danh mục, sửa danh mục, rồi giữ cho nó luôn được đo. Theo đúng thứ tự đó.",
    items: [
      {
        href: "/product/decision-audit",
        icon: ClipboardCheck,
        label: "Decision Audit",
        blurb:
          "Trường dữ liệu nào nên bổ sung trước, xếp hạng trên chính danh mục của bạn.",
      },
      {
        href: "/product/decision-verification",
        icon: GitCompare,
        label: "Decision Verification",
        blurb:
          "Đo lại sau khi sửa và thấy chính xác điều gì đã thay đổi. Không cần lưu lượng truy cập.",
      },
      {
        href: "/product/return-verification",
        icon: Undo2,
        label: "Return Verification",
        blurb:
          "Xem thông tin còn thiếu nào đi cùng hàng bị trả, và bản sửa có làm chúng giảm không.",
      },
      {
        href: "/product/decision-monitor",
        icon: BellRing,
        label: "Decision Monitor",
        blurb:
          "Danh mục xuống cấp theo thời gian. Được báo khi một nhóm hàng tụt, kèm nguyên nhân.",
        tag: "Định kỳ",
      },
    ],
  },
  {
    label: "Mẫu theo ngành",
    summary:
      "Chọn ngành hàng của bạn. Mỗi ngành cho thấy cùng một kệ hàng trước và sau khi sửa.",
    items: [
      {
        href: "/industries/ecommerce",
        icon: ShoppingCart,
        label: "Thương mại điện tử và bán lẻ",
      },
      {
        href: "/industries/fmcg",
        icon: ShoppingBasket,
        label: "Hàng tiêu dùng nhanh",
      },
      {
        href: "/industries/technology",
        icon: Cpu,
        label: "Công nghệ và điện tử",
      },
      {
        href: "/industries/furniture",
        icon: Sofa,
        label: "Nội thất và gia dụng",
      },
      {
        href: "/industries/cosmetics",
        icon: Sparkles,
        label: "Mỹ phẩm và chăm sóc cá nhân",
      },
      {
        href: "/industries/distribution",
        icon: Boxes,
        label: "B2B và công nghiệp",
      },
    ],
  },
  {
    label: "Tài nguyên",
    summary: "Viết cho người phải bảo vệ quyết định này trong nội bộ.",
    items: [
      {
        href: "/docs",
        icon: BookText,
        label: "Tài liệu",
        blurb:
          "Tích hợp trong mười dòng, hoặc không tích hợp gì và chỉ nhận bản kiểm tra.",
      },
      {
        href: "/blog",
        icon: PenLine,
        label: "Ghi chép",
        blurb: "Chúng tôi đo được gì, điều gì gây bất ngờ, và chỗ nào đã sai.",
      },
      {
        href: "/about",
        icon: UserRound,
        label: "Về chúng tôi",
        blurb: "Ai xây dựng Pulse, và vì sao.",
      },
    ],
  },
];

export const NAV_FLAT_VI = [{ label: "Bảng giá", href: "/pricing" }];
export const NAV_CTA_VI = { label: "Yêu cầu kiểm tra", href: "/contact" };

/** Locale-aware accessors. English stays the fallback. */
export const navGroups = (l: string) =>
  byLocale({ en: NAV_GROUPS, vi: NAV_GROUPS_VI }, l);
export const navFlat = (l: string) =>
  byLocale({ en: NAV_FLAT, vi: NAV_FLAT_VI }, l);
export const navCta = (l: string) =>
  byLocale({ en: NAV_CTA, vi: NAV_CTA_VI }, l);
