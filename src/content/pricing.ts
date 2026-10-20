import type { SceneSpec } from "@/components/story/Scenes";
import { byLocale } from "./locale";
/**
 * Pricing copy.
 *
 * No rate card, deliberately. The runtime starts only after a pilot and pricing is
 * agreed per pilot, so publishing tiers would advertise a self-serve motion that
 * does not exist. Competitors say "book a demo to discuss pricing" and leave it
 * there; we say the same thing but explain why, which costs nothing and reads as
 * candour rather than evasion.
 *
 * **The audit is free, changed 2026-10-15 (`M2`).** It carried a fixed fee while a
 * competitor gave a catalogue audit away at $0 and charged about $29/month to apply
 * fixes, and `MERCHANT-PROPOSAL.md` §3a said so in our own words two sections above
 * the price. Charging for the one thing a merchant can already get free was arguing
 * against our own document. The paid unit is the repair plan and its verification,
 * which has no free alternative.
 */
export const PRICING_HERO = {
  eyebrow: "Pricing",
  title: "The audit is free. You pay for the work that follows, if it is worth doing.",
  lede: "Send one category export and the audit costs nothing, because a diagnosis has free alternatives and we would rather you checked ours against them. What you pay for is deciding which repair deserves your team's week, and then finding out whether it worked. Everything after that is optional and priced per pilot, because we would rather have five merchants who got real value than fifty on a discount.",
} as const;

export const TIERS = [
  {
    key: "audit",
    name: "Decision Audit",
    price: "Free",
    unit: "one category, one export, no account",
    pitch: "The ranked list of what to record first, in your own products.",
    featured: true,
    includes: [
      "Attributes ranked by decision-information gap",
      "The specific products missing each one, as a working list",
      "Where each missing fact lives: extractable, mappable, or genuinely absent",
      "What we already recovered from your existing titles and descriptions",
      "Your decision-readiness number",
      "A 30 minute walkthrough with whoever owns merchandising",
    ],
    cta: "Request an audit",
  },
  {
    key: "verify",
    name: "Repair plan and verification",
    price: "Per cycle",
    unit: "or recurring, with Monitor",
    pitch: "Which fix is worth your team's week, and whether it worked.",
    featured: true,
    includes: [
      "The ranked plan, the evidence behind each item, and the effort it will take",
      "Before and after on the repaired catalogue: coverage, gap closed, readiness",
      "Regressions reported first, including anything the repair made worse",
      "Deleting products is not an improvement: every figure uses the products in both exports",
      "We will tell you when a repair is not worth doing",
      "Monitor re-runs it as the catalogue changes, naming the shelf and the cause",
    ],
    cta: "Talk to us",
  },
  {
    key: "runtime",
    name: "Decision API",
    price: "Per decision served",
    unit: "after a pilot, never before",
    pitch: "The live engine, once you have a reason to want it.",
    featured: false,
    includes: [
      "Ranking against what the session implies",
      "A held-back control group, always",
      "Per-factor breakdown on every ranked product",
      "Fallback to your own order if anything is slow or down",
      "Priced on decisions served, agreed after the pilot",
    ],
    cta: "Talk to us",
  },
] as const;

export const PRICING_NOTE = {
  title: "Why there is no rate card on this page",
  body: "Because we would be making it up. The Decision API begins only after a pilot, and what a pilot is worth depends on your catalogue, your traffic and what you are trying to decide. A published per-seat price would be a number we invented to look established. The audit is free because a diagnosis has free alternatives and we would rather you compared ours against them than paid us to find out. One limit worth stating before any invoice: verification shows your catalogue can answer a question it could not answer before. It does not show that anyone bought anything, and measuring that needs your traffic and a held-back group.",
} as const;

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const PRICING_HERO_VI = {
  eyebrow: "Bảng giá",
  title: "Bản audit miễn phí. Bạn trả tiền cho phần việc sau đó, nếu nó đáng làm.",
  lede: "Gửi một tệp xuất danh mục và bản audit không tốn gì, bởi chẩn đoán thì đã có lựa chọn miễn phí khác và chúng tôi muốn bạn đối chiếu bản của chúng tôi với chúng. Thứ bạn trả tiền là quyết định sửa lỗi nào xứng đáng với một tuần làm việc của đội bạn, rồi biết được nó có hiệu quả hay không. Mọi thứ sau đó đều tuỳ chọn và được định giá theo từng chương trình thử nghiệm, bởi chúng tôi thà có năm nhà bán nhận được giá trị thật còn hơn năm mươi nhà bán mua vì giảm giá.",
} as const;

export const TIERS_VI = [
  {
    key: "audit",
    name: "Decision Audit",
    price: "Miễn phí",
    unit: "một ngành hàng, một tệp xuất, không cần tài khoản",
    pitch: "Danh sách xếp hạng những gì cần ghi trước, trên chính sản phẩm của bạn.",
    featured: true,
    includes: [
      "Các thuộc tính xếp theo khoảng trống thông tin quyết định",
      "Danh sách sản phẩm cụ thể còn thiếu từng thuộc tính, dạng tệp làm việc",
      "Nơi mỗi dữ kiện còn thiếu đang nằm: trích xuất được, ánh xạ được, hay thực sự chưa có",
      "Những gì chúng tôi đã lấy lại được từ chính tiêu đề và mô tả sẵn có của bạn",
      "Chỉ số sẵn sàng quyết định của bạn",
      "Một buổi rà soát 30 phút với người phụ trách trưng bày hàng hoá",
    ],
    cta: "Yêu cầu kiểm tra",
  },
  {
    key: "verify",
    name: "Kế hoạch sửa và xác minh",
    price: "Theo mỗi chu kỳ",
    unit: "hoặc định kỳ với Monitor",
    pitch: "Xác nhận việc sửa đã có kết quả, rồi được báo khi một kệ hàng tụt trở lại.",
    featured: false,
    includes: [
      "Đo lại trên danh mục đã sửa",
      "Độ phủ, phần khoảng trống đã đóng và mức sẵn sàng, trước và sau",
      "Không cần lưu lượng và không phải chờ: đây là một thuộc tính của danh mục",
      "Monitor chạy lại khi danh mục thay đổi",
      "Một cảnh báo nêu tên kệ hàng, thuộc tính và nguyên nhân",
    ],
    cta: "Trao đổi với chúng tôi",
  },
  {
    key: "runtime",
    name: "Decision API",
    price: "Theo mỗi quyết định phục vụ",
    unit: "sau một chương trình thử nghiệm, không bao giờ trước đó",
    pitch: "Bộ máy thời gian thực, khi bạn đã có lý do để muốn nó.",
    featured: false,
    includes: [
      "Xếp hạng theo những gì phiên truy cập hàm ý",
      "Luôn có một nhóm đối chứng được giữ lại",
      "Diễn giải theo từng yếu tố trên mọi sản phẩm được xếp hạng",
      "Lùi về thứ tự của bạn nếu có gì đó chậm hoặc ngừng chạy",
      "Tính giá theo số quyết định phục vụ, thống nhất sau chương trình thử nghiệm",
    ],
    cta: "Trao đổi với chúng tôi",
  },
] as const;

export const PRICING_NOTE_VI = {
  title: "Vì sao trang này không có bảng giá niêm yết",
  body: "Vì chúng tôi sẽ phải bịa ra nó. Decision API chỉ bắt đầu sau một chương trình thử nghiệm, và giá trị của chương trình đó phụ thuộc vào danh mục, lưu lượng và điều bạn đang muốn quyết định. Một mức giá theo đầu người công bố sẵn sẽ là con số chúng tôi nghĩ ra cho ra dáng công ty đã có chỗ đứng. Bản kiểm tra miễn phí vì chẩn đoán thì đã có lựa chọn miễn phí khác, và chúng tôi muốn bạn đối chiếu bản của chúng tôi với chúng thay vì trả tiền để biết. Một giới hạn cần nói trước mọi hoá đơn: phần xác minh cho thấy danh mục của bạn nay trả lời được câu hỏi mà trước đó không trả lời được. Nó không cho thấy có ai đã mua hàng, và đo điều đó cần lưu lượng của bạn cùng một nhóm đối chứng.",
} as const;

export const pricingHero = (l: string) => byLocale({ en: PRICING_HERO, vi: PRICING_HERO_VI }, l);
export const tiers = (l: string) => byLocale({ en: TIERS, vi: TIERS_VI }, l);
export const pricingNote = (l: string) => byLocale({ en: PRICING_NOTE, vi: PRICING_NOTE_VI }, l);

/** Hero scene. Data, so it localises with everything else on the page. */
export const PRICING_ART: SceneSpec = {
  kind: "facts",
  facts: [
    {
      value: "Free",
      label: "Decision Audit",
      note: "one category, one export, and you may stop here",
      tone: "good",
    },
    {
      value: "Fixed",
      label: "Verification",
      note: "the same measurement after your team repairs it",
      tone: "work",
    },
    {
      value: "Yours",
      label: "Monitor",
      note: "a cadence you set, on the export you already produce",
      tone: "work",
    },
    {
      value: "Pilot",
      label: "Runtime",
      note: "priced against what a held-back arm shows, never before",
      tone: "hold",
    },
  ],
  note: "Four lines, and only the last needs anything on your site. There is no rate card on this page, and the section below says why rather than hiding it behind a form.",
};

export const PRICING_ART_VI: SceneSpec = {
  kind: "facts",
  facts: [
    {
      value: "Miễn phí",
      label: "Decision Audit",
      note: "một ngành hàng, một tệp xuất, và bạn có thể dừng ở đây",
      tone: "good",
    },
    {
      value: "Cố định",
      label: "Xác nhận",
      note: "đúng phép đo đó, sau khi đội của bạn sửa xong",
      tone: "work",
    },
    {
      value: "Tuỳ bạn",
      label: "Giám sát",
      note: "nhịp do bạn đặt, trên tệp xuất bạn vốn đã tạo",
      tone: "work",
    },
    {
      value: "Theo pilot",
      label: "Thời gian thực",
      note: "định giá theo những gì nhánh đối chứng cho thấy, không sớm hơn",
      tone: "hold",
    },
  ],
  note: "Bốn dòng, và chỉ dòng cuối cần tới thứ gì đó trên website của bạn. Trang này không có bảng giá, và phần bên dưới nói rõ vì sao thay vì giấu sau một biểu mẫu.",
};

export const pricingArt = (l: string) =>
  byLocale<SceneSpec>({ en: PRICING_ART, vi: PRICING_ART_VI }, l);
