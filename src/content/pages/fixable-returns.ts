import { Split, ListOrdered, GitCompare, Repeat } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";
import { byLocale } from "@/content/locale";

/**
 * Solution: cut fixable returns. A goal, not a product: it puts four products in the order a
 * merchant uses them, Decision Audit (the facts the catalogue cannot answer), Return Verification
 * (which of those go with returns, and whether a repair moved them), Decision Verification (the
 * catalogue re-measured after the repair) and the Decision API's retention factor. Until 29 Oct 2026
 * the menu item linked straight to the Return Verification page.
 *
 * **What this page may not say** (ODIN/hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9): that Pulse reduces
 * returns, or any figure. Everything has run on simulated orders only, so every figure on the page
 * is a symbol, not a number.
 *
 * `scenes.chain` is the "yours, not yours, unclear" figure beside the visual heading; there is no
 * chain block.
 */
export const FIXABLE_RETURNS: StoryContent = {
  meta: {
    title: "Cut fixable returns: the missing facts behind them",
    description:
      "Find the product facts your catalogue leaves out, see which go with returns, repair those first, and check the returns moved, on your own orders.",
  },
  eyebrow: "Solution",
  title: "Fix the returns your product pages cause, first.",
  lede: "Some returns are about the courier or a change of mind, and no product page touches them. Others are about a fact the shopper needed and could not find. This puts four Pulse products in order: find the facts your catalogue leaves out, see which of them go with returns, repair those first, and check the returns actually moved.",

  visualHeading: "Not every return is yours to fix.",
  visualBody:
    "Each return reason is read for the product fact it names. The ones a listing could have prevented are compared; the rest are counted and set aside, and vague codes are measured rather than guessed.",

  scenes: {
    hero: {
      kind: "facts",
      facts: [
        {
          value: "01",
          label: "Decision Audit",
          note: "The facts your catalogue cannot answer",
          tone: "work",
        },
        {
          value: "02",
          label: "Return Verification",
          note: "Which of those go with returns, from the reasons given",
          tone: "work",
        },
        {
          value: "03",
          label: "Decision Verification",
          note: "The catalogue re-measured after the repair",
          tone: "work",
        },
        {
          value: "04",
          label: "Decision API",
          note: "Ranking for purchases that stay bought",
          tone: "good",
        },
      ],
      note: "Each one works on its own. In this order a return reason becomes a repair, and the repair gets checked.",
    },
    situation: {
      kind: "asks",
      eyebrow: "What a return-rate dashboard can answer",
      rows: [
        { label: "How many orders came back", ok: true },
        {
          label: "Which returns a product page could have prevented",
          ok: false,
        },
        {
          label: "Which missing fact each one points to",
          eg: "The dimensions, the compatibility, the material",
          ok: false,
        },
        { label: "Whether last month's repair moved them", ok: false },
      ],
      okLabel: "Answered",
      noLabel: "Not on the dashboard",
      note: "of the four is answered by a return rate.",
    },
    chain: {
      kind: "facts",
      facts: [
        {
          value: "✓",
          label: "Yours to fix",
          note: "The reason names a fact the listing left out",
          tone: "good",
        },
        {
          value: "✕",
          label: "Set aside",
          note: "Transit damage, a wrong item, a failed delivery, a change of mind",
          tone: "hold",
        },
        {
          value: "?",
          label: "Unclear",
          note: "Vague reason codes, measured and reported, never guessed",
          tone: "warn",
        },
      ],
    },
  },

  situation: {
    heading: "Your returns already say what the listing left out.",
    body: [
      "Every return comes with a reason: too large, not as described, does not work with my device. Most teams read those as one rate to drive down, and the reasons sit in a report nobody joins back to the product page.",
      "Meanwhile the catalogue team works through missing fields in whatever order the spreadsheet gives them, so the fact behind next month's returns may be the last one filled.",
    ],
    pull: "A return rate says something went wrong. The reason says what to fix.",
  },

  steps: {
    heading: "Which products, in what order",
    intro:
      "Each step is a Pulse product you can use alone. The order is what turns a return reason into a repair that gets checked.",
    items: [
      {
        n: "01",
        meta: "Decision Audit",
        title: "Find the facts the catalogue cannot answer",
        body: "One category of your catalogue, measured against the questions shoppers ask in it. The missing facts come back ranked, with the products each one affects.",
      },
      {
        n: "02",
        meta: "Return Verification",
        title: "See which of them go with returns",
        body: "Send six to twelve months of orders with the return reason. Return rates are compared between products that record each fact and products that do not, within the same brand and price band.",
      },
      {
        n: "03",
        meta: "Decision Verification",
        title: "Repair those first, then re-measure",
        body: "Your team fills the facts that go with returns before the rest. The catalogue is measured again, and Return Verification compares the repaired products with similar ones that were not, over the same weeks.",
      },
      {
        n: "04",
        meta: "Decision API",
        title: "Rank for purchases that stay bought",
        body: "The same history can rank products by how often they come back for a fixable reason. It is off until you send history, and a share of shoppers never sees it, so the effect can be measured.",
      },
    ],
  },

  gets: {
    heading: "What changes about the repair list",
    items: [
      {
        icon: Split,
        title: "Returns split into yours and not yours",
        body: "Transit damage, counterfeits, a wrong item sent and failed deliveries are counted and set aside. Only returns a product fact could have prevented are compared.",
      },
      {
        icon: ListOrdered,
        title: "A repair list ordered by returns",
        body: "The missing facts the audit found, with the ones that go with returns at the top, each with an interval and the one sentence the result supports.",
      },
      {
        icon: GitCompare,
        title: "Proof a repair moved the right returns",
        body: "A matched comparison against unrepaired products over the same period, so a season or a promotion does not take the credit.",
      },
      {
        icon: Repeat,
        title: "Ranking that learns from returns",
        body: "With the Decision API, products that keep coming back for a fixable reason rank lower until the listing is repaired.",
      },
    ],
  },

  limits: {
    heading: "What this does and does not do",
    will: [
      "Find the facts your catalogue leaves out, and which of them go with returns in your own orders",
      "Order the repair list by the returns each missing fact goes with",
      "Verify whether a repair moved the returns it was meant to move",
      "Say when there are not enough orders to tell, instead of guessing",
    ],
    wont: [
      "Promise fewer returns. Nothing has been measured on your orders yet, and a result from another shop is not evidence about yours",
      "Treat every return as fixable. Transit damage, fraud and failed deliveries are not product information",
      "Write the missing facts for you. We say which are worth having and where they already live",
      "Predict which shopper will return something. It reads products and reasons, not people",
    ],
  },

  faq: [
    {
      q: "Do I need all four products?",
      a: "No. Return Verification alone shows which missing facts go with your returns. The Decision Audit finds the facts to look at, Decision Verification re-measures after a repair, and the Decision API ranks with what was learned. Most merchants start with one category.",
    },
    {
      q: "How is this different from the Return Verification page?",
      a: "Return Verification is one product: returns joined to your catalogue. This page is the goal, and shows where it sits next to the products that find the gaps before it and act on the result after it.",
    },
    {
      q: "What data do you need?",
      a: "One category of your catalogue and six to twelve months of orders: the product, the order date, the return date, the return reason, and the payment method if you have it. No personal data of any kind.",
    },
    {
      q: "How much will our returns fall?",
      a: "We will not give you a figure, because nothing has run on your orders yet. What it gives you is which returns your product pages could have prevented, and whether a repair moved them.",
    },
  ],

  cta: {
    title: "Send one category's orders and return reasons.",
    body: "Six to twelve months, no personal data, and a repair list ordered by the returns behind it.",
    label: "Talk to us",
    href: "/contact",
    note: "It runs on exports. Nothing goes on your site.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const FIXABLE_RETURNS_VI: StoryContent = {
  meta: {
    title: "Giảm hàng bị trả có thể sửa: dữ kiện còn thiếu",
    description:
      "Tìm dữ kiện sản phẩm danh mục còn thiếu, xem dữ kiện nào đi kèm hàng bị trả, sửa chúng trước, và kiểm tra hàng bị trả có giảm không, trên đơn hàng của bạn.",
  },
  eyebrow: "Giải pháp",
  title: "Sửa trước những đơn trả do trang sản phẩm gây ra.",
  lede: "Có những đơn trả do đơn vị vận chuyển hoặc do người mua đổi ý, và không trang sản phẩm nào chạm tới được. Có những đơn khác do một dữ kiện người mua cần mà không tìm thấy. Giải pháp này xếp bốn sản phẩm Pulse theo thứ tự: tìm dữ kiện danh mục còn thiếu, xem dữ kiện nào đi kèm hàng bị trả, sửa chúng trước, và kiểm tra hàng bị trả có thực sự giảm không.",

  visualHeading: "Không phải đơn trả nào cũng do bạn sửa được.",
  visualBody:
    "Mỗi lý do trả hàng được đọc để tìm dữ kiện sản phẩm mà nó nhắc tới. Những đơn mà trang sản phẩm có thể ngăn được thì được so sánh; phần còn lại được đếm và để riêng, còn các mã lý do mơ hồ thì được đo chứ không đoán.",

  scenes: {
    hero: {
      kind: "facts",
      facts: [
        {
          value: "01",
          label: "Decision Audit",
          note: "Những dữ kiện danh mục không trả lời được",
          tone: "work",
        },
        {
          value: "02",
          label: "Return Verification",
          note: "Dữ kiện nào đi kèm hàng bị trả, theo lý do người mua đưa ra",
          tone: "work",
        },
        {
          value: "03",
          label: "Decision Verification",
          note: "Danh mục được đo lại sau khi sửa",
          tone: "work",
        },
        {
          value: "04",
          label: "Decision API",
          note: "Xếp hạng cho những đơn được giữ lại",
          tone: "good",
        },
      ],
      note: "Mỗi sản phẩm dùng riêng được. Theo thứ tự này, một lý do trả hàng thành một bản sửa, và bản sửa được kiểm tra.",
    },
    situation: {
      kind: "asks",
      eyebrow: "Bảng tỷ lệ trả hàng trả lời được gì",
      rows: [
        { label: "Bao nhiêu đơn bị trả lại", ok: true },
        { label: "Đơn trả nào trang sản phẩm có thể ngăn được", ok: false },
        {
          label: "Mỗi đơn chỉ tới dữ kiện còn thiếu nào",
          eg: "Kích thước, khả năng tương thích, chất liệu",
          ok: false,
        },
        { label: "Bản sửa tháng trước có làm chúng giảm không", ok: false },
      ],
      okLabel: "Có câu trả lời",
      noLabel: "Không có trên bảng",
      note: "trong bốn câu được một tỷ lệ trả hàng trả lời.",
    },
    chain: {
      kind: "facts",
      facts: [
        {
          value: "✓",
          label: "Bạn sửa được",
          note: "Lý do nhắc tới một dữ kiện trang sản phẩm bỏ sót",
          tone: "good",
        },
        {
          value: "✕",
          label: "Để riêng",
          note: "Hư hỏng khi vận chuyển, giao nhầm hàng, giao thất bại, đổi ý",
          tone: "hold",
        },
        {
          value: "?",
          label: "Chưa rõ",
          note: "Mã lý do mơ hồ, được đo và báo cáo, không bao giờ đoán",
          tone: "warn",
        },
      ],
    },
  },

  situation: {
    heading: "Hàng bị trả đã nói sẵn trang sản phẩm bỏ sót điều gì.",
    body: [
      "Mỗi đơn trả đều kèm một lý do: quá lớn, không đúng mô tả, không dùng được với thiết bị của tôi. Phần lớn các đội đọc chúng như một tỷ lệ cần kéo xuống, và các lý do nằm trong một báo cáo không ai nối ngược về trang sản phẩm.",
      "Trong khi đó, đội danh mục xử lý các trường còn thiếu theo thứ tự bảng tính đưa ra, nên dữ kiện đứng sau những đơn trả tháng tới có thể là thứ được điền sau cùng.",
    ],
    pull: "Tỷ lệ trả hàng cho biết có gì đó sai. Lý do cho biết cần sửa gì.",
  },

  steps: {
    heading: "Sản phẩm nào, theo thứ tự nào",
    intro:
      "Mỗi bước là một sản phẩm Pulse dùng riêng được. Thứ tự là thứ biến một lý do trả hàng thành một bản sửa được kiểm tra.",
    items: [
      {
        n: "01",
        meta: "Decision Audit",
        title: "Tìm những dữ kiện danh mục không trả lời được",
        body: "Một ngành hàng trong danh mục của bạn, được đo theo những câu người mua hỏi trong ngành hàng đó. Các dữ kiện còn thiếu được trả về đã xếp hạng, kèm những sản phẩm mà mỗi dữ kiện ảnh hưởng.",
      },
      {
        n: "02",
        meta: "Return Verification",
        title: "Xem dữ kiện nào đi kèm hàng bị trả",
        body: "Gửi sáu tới mười hai tháng đơn hàng kèm lý do trả. Tỷ lệ trả hàng được so giữa những sản phẩm có ghi dữ kiện đó và những sản phẩm không có, trong cùng thương hiệu và cùng khoảng giá.",
      },
      {
        n: "03",
        meta: "Decision Verification",
        title: "Sửa những dữ kiện đó trước, rồi đo lại",
        body: "Đội của bạn điền những dữ kiện đi kèm hàng bị trả trước phần còn lại. Danh mục được đo lại, và Return Verification so các sản phẩm đã sửa với những sản phẩm tương tự chưa sửa, trong cùng những tuần đó.",
      },
      {
        n: "04",
        meta: "Decision API",
        title: "Xếp hạng cho những đơn được giữ lại",
        body: "Cùng lịch sử đó có thể xếp hạng sản phẩm theo mức độ chúng bị trả vì một lý do sửa được. Tính năng tắt cho tới khi bạn gửi lịch sử, và một phần người mua không bao giờ thấy nó, để hiệu quả đo được.",
      },
    ],
  },

  gets: {
    heading: "Danh sách sửa thay đổi những gì",
    items: [
      {
        icon: Split,
        title: "Hàng bị trả chia thành phần của bạn và không phải của bạn",
        body: "Hư hỏng khi vận chuyển, hàng giả, giao nhầm hàng và giao thất bại được đếm và để riêng. Chỉ những đơn trả mà một dữ kiện sản phẩm có thể ngăn được mới được so sánh.",
      },
      {
        icon: ListOrdered,
        title: "Danh sách sửa xếp theo hàng bị trả",
        body: "Những dữ kiện còn thiếu bản kiểm tra tìm ra, với những dữ kiện đi kèm hàng bị trả ở trên cùng, mỗi dữ kiện kèm một khoảng ước lượng và đúng một câu mà kết quả cho phép nói.",
      },
      {
        icon: GitCompare,
        title: "Bằng chứng bản sửa làm giảm đúng phần hàng bị trả",
        body: "Một phép so sánh có đối chứng với các sản phẩm chưa sửa trong cùng giai đoạn, để mùa vụ hay khuyến mãi không nhận công.",
      },
      {
        icon: Repeat,
        title: "Xếp hạng học từ hàng bị trả",
        body: "Với Decision API, những sản phẩm cứ bị trả vì một lý do sửa được sẽ xếp thấp hơn cho tới khi trang sản phẩm được sửa.",
      },
    ],
  },

  limits: {
    heading: "Giải pháp này làm gì và không làm gì",
    will: [
      "Tìm dữ kiện danh mục còn thiếu, và dữ kiện nào đi kèm hàng bị trả trong chính đơn hàng của bạn",
      "Xếp danh sách sửa theo lượng hàng bị trả mà mỗi dữ kiện còn thiếu đi kèm",
      "Kiểm chứng một bản sửa có làm giảm đúng phần hàng bị trả nó nhắm tới không",
      "Nói rõ khi không đủ đơn để kết luận, thay vì phỏng đoán",
    ],
    wont: [
      "Hứa giảm hàng bị trả. Chưa có gì được đo trên đơn hàng của bạn, và kết quả của cửa hàng khác không phải bằng chứng cho cửa hàng của bạn",
      "Coi mọi đơn trả là sửa được. Hư hỏng khi vận chuyển, gian lận và giao thất bại không phải thông tin sản phẩm",
      "Viết hộ các dữ kiện còn thiếu. Chúng tôi cho biết dữ kiện nào đáng có và chúng đang nằm ở đâu",
      "Dự đoán người mua nào sẽ trả hàng. Nó đọc sản phẩm và lý do, không đọc con người",
    ],
  },

  faq: [
    {
      q: "Tôi có cần cả bốn sản phẩm không?",
      a: "Không. Riêng Return Verification đã cho thấy dữ kiện còn thiếu nào đi kèm hàng bị trả của bạn. Decision Audit tìm ra những dữ kiện cần xem, Decision Verification đo lại sau khi sửa, và Decision API xếp hạng theo những gì đã học được. Phần lớn nhà bán bắt đầu với một ngành hàng.",
    },
    {
      q: "Khác gì với trang Return Verification?",
      a: "Return Verification là một sản phẩm: nối hàng bị trả với danh mục của bạn. Trang này là mục tiêu, và cho thấy nó đứng ở đâu cạnh những sản phẩm tìm ra lỗ hổng trước nó và hành động theo kết quả sau nó.",
    },
    {
      q: "Các bạn cần dữ liệu gì?",
      a: "Một ngành hàng trong danh mục và sáu tới mười hai tháng đơn hàng: sản phẩm, ngày đặt, ngày trả, lý do trả, và phương thức thanh toán nếu có. Không có bất kỳ dữ liệu cá nhân nào.",
    },
    {
      q: "Hàng bị trả của chúng tôi sẽ giảm bao nhiêu?",
      a: "Chúng tôi sẽ không đưa một con số, vì chưa có gì chạy trên đơn hàng của bạn. Điều nó mang lại là biết những đơn trả nào trang sản phẩm có thể ngăn được, và một bản sửa có làm chúng giảm không.",
    },
  ],

  cta: {
    title: "Gửi đơn hàng và lý do trả của một ngành hàng.",
    body: "Sáu tới mười hai tháng, không dữ liệu cá nhân, và một danh sách sửa xếp theo hàng bị trả đứng sau nó.",
    label: "Liên hệ với chúng tôi",
    href: "/contact",
    note: "Nó chạy trên tệp xuất. Không cài gì lên website.",
  },
};

export const fixableReturns = (l: string) =>
  byLocale({ en: FIXABLE_RETURNS, vi: FIXABLE_RETURNS_VI }, l);
