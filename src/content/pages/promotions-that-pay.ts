import { Undo2, CircleSlash, Wrench, FlaskConical } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";
import { byLocale } from "@/content/locale";

/**
 * Solution: decide which promotions pay. A goal, not a product: it puts three products in the
 * order a merchant uses them, Promotion Audit (what past offers kept), the Decision API's
 * `/interventions` calls (the per-group decision before a campaign), and Return Verification
 * (whether the listing repair chosen instead of a discount moved the returns). Until 29 Oct 2026
 * the menu item linked straight to the Promotion Audit page.
 *
 * **What this page may not say** (ODIN/hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9): any uplift, saving
 * or return figure. Nothing has run on a real seller yet, so every figure on the page is a symbol,
 * not a number.
 *
 * `scenes.chain` is the "three answers" figure beside the visual heading; there is no chain block.
 */
export const PROMOTIONS_THAT_PAY: StoryContent = {
  meta: {
    title: "Decide which promotions pay, after the returns",
    description:
      "Judge vouchers, price cuts and free shipping on orders that stayed bought, decide per group before a campaign, and price a listing repair against a discount.",
  },
  eyebrow: "Solution",
  title: "Spend the promotion budget where the orders stay bought.",
  lede: "A voucher is judged on the day it runs and paid for weeks later, in returns and refused deliveries. This puts three Pulse products in order: read what your past offers actually kept, decide for each group of shoppers before the next campaign, and check the listing repair you chose instead of a discount.",

  visualHeading:
    "Three possible answers for every group, and one of them is nothing.",
  visualBody:
    "For each group of shoppers you can already see, such as new buyers, a region or cash on delivery, the answer is an offer that beat doing nothing at the cautious end of its range, no offer, or a named test.",

  scenes: {
    hero: {
      kind: "facts",
      facts: [
        {
          value: "01",
          label: "Promotion Audit",
          note: "Which past offers beat doing nothing, net of returns",
          tone: "work",
        },
        {
          value: "02",
          label: "Decision API",
          note: "Offer, no offer or test for each group, before the campaign",
          tone: "work",
        },
        {
          value: "03",
          label: "Return Verification",
          note: "Whether the repair you chose moved the returns",
          tone: "good",
        },
      ],
      note: "Each one works on its own. In this order they close the loop from campaign to returns.",
    },
    situation: {
      kind: "asks",
      eyebrow: "What a campaign-day report can answer",
      rows: [
        { label: "How many orders the voucher brought", ok: true },
        {
          label: "How many of those orders came back",
          eg: "Returns arrive weeks after the report closes",
          ok: false,
        },
        { label: "Who would have bought without it", ok: false },
        { label: "Whether fixing the listing would have done more", ok: false },
      ],
      okLabel: "Answered",
      noLabel: "Not in the report",
      note: "of the four is answered on the day the campaign runs.",
    },
    chain: {
      kind: "facts",
      facts: [
        {
          value: "✓",
          label: "An offer",
          note: "It still beats doing nothing at the cautious end of its range",
          tone: "good",
        },
        {
          value: "0",
          label: "No offer",
          note: "Nothing beat doing nothing for this group",
          tone: "hold",
        },
        {
          value: "?",
          label: "A test",
          note: "The history is too thin to tell, so the group and offer are named",
          tone: "warn",
        },
      ],
    },
  },

  situation: {
    heading: "The campaign report closes before the returns arrive.",
    body: [
      "Orders jump on the day a voucher runs, so the campaign looks like it worked. Weeks later some of those orders come back, some are refused at the door, and some came from shoppers who would have paid full price anyway. None of that reaches the report that decided to run the voucher again.",
      "So the same discount keeps going to everyone, and a product page that leaves out the size keeps losing orders that no voucher wins back.",
    ],
    pull: "Sometimes the best promotion is none, and sometimes it is a better product page.",
  },

  steps: {
    heading: "Which products, in what order",
    intro:
      "Each step is a Pulse product you can use alone. The order is what turns a report into a decision.",
    items: [
      {
        n: "01",
        meta: "Promotion Audit",
        title: "Read what your offers actually kept",
        body: "Send the history of your vouchers, price cuts and free-shipping offers, with the orders, returns and failed deliveries they produced. Each offer is measured against the same group of shoppers when no offer ran.",
      },
      {
        n: "02",
        meta: "Decision API",
        title: "Decide for each group before the next campaign",
        body: "The same rule, as an API call: for each group, the offer that still beats doing nothing at the cautious end of its range, no offer, or a test. Your tools call it before a campaign goes out.",
      },
      {
        n: "03",
        meta: "Return Verification",
        title: "Check the repair you chose instead",
        body: "Where fixing a product page beats a discount, your team fills the missing fact and Return Verification compares those products with similar ones that were not repaired, over the same weeks.",
      },
    ],
  },

  gets: {
    heading: "What changes about the next campaign",
    items: [
      {
        icon: Undo2,
        title: "One measure for every option",
        body: "A voucher, a price cut, free shipping, a listing repair and no offer, all judged on the contribution kept after returns and failed deliveries.",
      },
      {
        icon: CircleSlash,
        title: "Where to give nothing",
        body: "The groups of shoppers where no offer beat doing nothing, and how many shoppers each choice covers.",
      },
      {
        icon: Wrench,
        title: "A repair priced against a discount",
        body: "Fixing the size or the compatibility on a page, with its one-off cost spread over the shoppers it reaches, set beside the vouchers it competes with.",
      },
      {
        icon: FlaskConical,
        title: "A test instead of a guess",
        body: "Wherever an option could win but has not been measured, the offer worth trying and the group to try it on.",
      },
    ],
  },

  limits: {
    heading: "What this does and does not do",
    will: [
      "Judge every past offer on contribution kept, net of returns and failed deliveries",
      "Give each group of shoppers an offer, no offer or a test, before the campaign",
      "Price a listing repair against a discount on the same terms",
      "Verify whether the repair you chose moved the returns it was meant to move",
    ],
    wont: [
      "Promise more profit or fewer returns. Nothing has been measured on your history yet, and another shop's result is not evidence about yours",
      "Target individual shoppers. It works on groups you can already see",
      "Set prices or run campaigns for you. It recommends; you decide",
      "Guess an effect. Every rate comes from your history or a test you ran",
    ],
  },

  faq: [
    {
      q: "Do I need all three products?",
      a: "No. The Promotion Audit alone tells you which past offers paid. The Decision API adds the decision before each campaign, and Return Verification adds proof that a listing repair worked. Most merchants start with the audit on one category.",
    },
    {
      q: "How is this different from the Promotion Audit page?",
      a: "The Promotion Audit is one product: a reading of your past offers. This page is the goal, and shows where the audit sits next to the products that act on it and check the result.",
    },
    {
      q: "What data do you need?",
      a: "For each group of shoppers and each offer you ran, including periods with no offer: visitors, orders, failed deliveries, and returns with their reasons. Plus your margin per kept order and what a return and a failed delivery cost you. No names, phones or addresses.",
    },
    {
      q: "Will this raise my margin?",
      a: "We will not give you a figure, because nothing has run on your history yet. What it gives you is which offers left you better off than doing nothing, measured on your own orders.",
    },
  ],

  cta: {
    title: "Start with the last campaign you ran.",
    body: "One category, the offers you ran on it, and the orders and returns that followed.",
    label: "Talk to us",
    href: "/contact",
    note: "Nothing is priced until a pilot has run on your own history.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const PROMOTIONS_THAT_PAY_VI: StoryContent = {
  meta: {
    title: "Quyết định khuyến mãi nào có lãi, sau hàng bị trả",
    description:
      "Đánh giá voucher, giảm giá và miễn phí vận chuyển theo đơn được giữ lại, quyết định theo từng nhóm trước chiến dịch tới, và đặt việc sửa trang cạnh giảm giá.",
  },
  eyebrow: "Giải pháp",
  title: "Dùng ngân sách khuyến mãi ở nơi đơn hàng được giữ lại.",
  lede: "Một voucher được đánh giá ngay ngày chạy và phải trả giá vài tuần sau, bằng hàng bị trả và đơn bị từ chối nhận. Giải pháp này xếp ba sản phẩm Pulse theo thứ tự: đọc xem các ưu đãi đã chạy thực sự giữ lại được gì, quyết định cho từng nhóm người mua trước chiến dịch tới, và kiểm tra việc sửa trang sản phẩm bạn chọn thay cho giảm giá.",

  visualHeading:
    "Ba câu trả lời cho mỗi nhóm, và một trong số đó là không làm gì.",
  visualBody:
    "Với mỗi nhóm người mua bạn đã thấy được, như khách mới, một vùng hay thanh toán khi nhận hàng, câu trả lời là một ưu đãi vẫn hơn việc không làm gì ở đầu thận trọng của khoảng ước lượng, không ưu đãi, hoặc một thử nghiệm được nêu rõ.",

  scenes: {
    hero: {
      kind: "facts",
      facts: [
        {
          value: "01",
          label: "Promotion Audit",
          note: "Ưu đãi nào đã hơn việc không làm gì, sau khi trừ hàng bị trả",
          tone: "work",
        },
        {
          value: "02",
          label: "Decision API",
          note: "Ưu đãi, không ưu đãi hay thử nghiệm cho từng nhóm, trước chiến dịch",
          tone: "work",
        },
        {
          value: "03",
          label: "Return Verification",
          note: "Bản sửa bạn chọn có làm giảm hàng bị trả không",
          tone: "good",
        },
      ],
      note: "Mỗi sản phẩm dùng riêng được. Theo thứ tự này, chúng khép vòng từ chiến dịch tới hàng bị trả.",
    },
    situation: {
      kind: "asks",
      eyebrow: "Báo cáo ngày chạy chiến dịch trả lời được gì",
      rows: [
        { label: "Voucher mang về bao nhiêu đơn", ok: true },
        {
          label: "Bao nhiêu đơn trong số đó bị trả lại",
          eg: "Hàng bị trả về vài tuần sau khi báo cáo đã khép",
          ok: false,
        },
        { label: "Ai vẫn sẽ mua dù không có voucher", ok: false },
        { label: "Sửa trang sản phẩm có hiệu quả hơn không", ok: false },
      ],
      okLabel: "Có câu trả lời",
      noLabel: "Không có trong báo cáo",
      note: "trong bốn câu được trả lời ngay ngày chạy chiến dịch.",
    },
    chain: {
      kind: "facts",
      facts: [
        {
          value: "✓",
          label: "Một ưu đãi",
          note: "Vẫn hơn việc không làm gì ở đầu thận trọng của khoảng ước lượng",
          tone: "good",
        },
        {
          value: "0",
          label: "Không ưu đãi",
          note: "Không ưu đãi nào hơn việc không làm gì với nhóm này",
          tone: "hold",
        },
        {
          value: "?",
          label: "Một thử nghiệm",
          note: "Lịch sử quá mỏng để kết luận, nên nhóm và ưu đãi được nêu rõ",
          tone: "warn",
        },
      ],
    },
  },

  situation: {
    heading: "Báo cáo chiến dịch khép lại trước khi hàng bị trả về.",
    body: [
      "Đơn hàng tăng vọt trong ngày chạy voucher, nên chiến dịch có vẻ thành công. Vài tuần sau, một phần đơn bị trả lại, một phần bị từ chối nhận ở cửa, và một phần đến từ những người vẫn sẽ trả giá gốc. Không điều nào trong số đó đến được bản báo cáo đã quyết định chạy lại voucher.",
      "Vì vậy cùng một mức giảm giá tiếp tục đến tay mọi người, còn một trang sản phẩm thiếu kích thước vẫn tiếp tục làm mất những đơn mà không voucher nào lấy lại được.",
    ],
    pull: "Đôi khi khuyến mãi tốt nhất là không khuyến mãi, và đôi khi là một trang sản phẩm tốt hơn.",
  },

  steps: {
    heading: "Sản phẩm nào, theo thứ tự nào",
    intro:
      "Mỗi bước là một sản phẩm Pulse dùng riêng được. Thứ tự là thứ biến một bản báo cáo thành một quyết định.",
    items: [
      {
        n: "01",
        meta: "Promotion Audit",
        title: "Đọc xem các ưu đãi thực sự giữ lại được gì",
        body: "Gửi lịch sử voucher, giảm giá và miễn phí vận chuyển, kèm số đơn, hàng bị trả và đơn giao thất bại mà chúng tạo ra. Mỗi ưu đãi được đo so với chính nhóm người mua đó khi không có ưu đãi nào.",
      },
      {
        n: "02",
        meta: "Decision API",
        title: "Quyết định cho từng nhóm trước chiến dịch tới",
        body: "Cùng một quy tắc, dưới dạng lệnh gọi API: với mỗi nhóm, ưu đãi vẫn hơn việc không làm gì ở đầu thận trọng của khoảng ước lượng, không ưu đãi, hoặc một thử nghiệm. Công cụ của bạn gọi nó trước khi chiến dịch chạy.",
      },
      {
        n: "03",
        meta: "Return Verification",
        title: "Kiểm tra bản sửa bạn chọn thay cho giảm giá",
        body: "Khi sửa trang sản phẩm có lợi hơn giảm giá, đội của bạn bổ sung dữ kiện còn thiếu, và Return Verification so các sản phẩm đó với những sản phẩm tương tự chưa được sửa, trong cùng những tuần đó.",
      },
    ],
  },

  gets: {
    heading: "Chiến dịch tới thay đổi những gì",
    items: [
      {
        icon: Undo2,
        title: "Một thước đo cho mọi lựa chọn",
        body: "Voucher, giảm giá, miễn phí vận chuyển, sửa trang sản phẩm và không ưu đãi, tất cả được đánh giá theo phần đóng góp được giữ lại sau hàng bị trả và giao thất bại.",
      },
      {
        icon: CircleSlash,
        title: "Chỗ nào không nên ưu đãi",
        body: "Những nhóm người mua mà không ưu đãi nào hơn việc không làm gì, và mỗi lựa chọn áp dụng cho bao nhiêu người.",
      },
      {
        icon: Wrench,
        title: "Sửa trang sản phẩm, đặt cạnh giảm giá",
        body: "Bổ sung kích thước hay khả năng tương thích trên một trang, với chi phí một lần chia cho những người mua nó tiếp cận, đặt cạnh các voucher mà nó cạnh tranh.",
      },
      {
        icon: FlaskConical,
        title: "Một thử nghiệm thay vì phỏng đoán",
        body: "Mỗi khi một lựa chọn có thể thắng nhưng chưa được đo, ưu đãi đáng thử và nhóm nên thử.",
      },
    ],
  },

  limits: {
    heading: "Giải pháp này làm gì và không làm gì",
    will: [
      "Đánh giá mỗi ưu đãi đã chạy theo phần đóng góp được giữ lại, sau khi trừ hàng bị trả và giao thất bại",
      "Đưa mỗi nhóm người mua một ưu đãi, không ưu đãi hoặc một thử nghiệm, trước chiến dịch",
      "Đặt việc sửa trang sản phẩm cạnh giảm giá theo cùng một cách tính",
      "Kiểm chứng bản sửa bạn chọn có làm giảm đúng phần hàng bị trả nó nhắm tới không",
    ],
    wont: [
      "Hứa tăng lợi nhuận hay giảm hàng bị trả. Chưa có gì được đo trên lịch sử của bạn, và kết quả của cửa hàng khác không phải bằng chứng cho cửa hàng của bạn",
      "Nhắm tới từng người mua. Nó làm việc trên những nhóm bạn đã thấy được",
      "Đặt giá hay chạy chiến dịch thay bạn. Nó đề xuất; bạn quyết định",
      "Đoán một hiệu quả. Mọi tỷ lệ đều đến từ lịch sử của bạn hoặc một thử nghiệm bạn đã chạy",
    ],
  },

  faq: [
    {
      q: "Tôi có cần cả ba sản phẩm không?",
      a: "Không. Riêng Promotion Audit đã cho biết ưu đãi nào đã có lãi. Decision API thêm quyết định trước mỗi chiến dịch, còn Return Verification thêm bằng chứng rằng việc sửa trang sản phẩm có hiệu quả. Phần lớn nhà bán bắt đầu bằng bản kiểm tra trên một ngành hàng.",
    },
    {
      q: "Khác gì với trang Promotion Audit?",
      a: "Promotion Audit là một sản phẩm: một lần đọc các ưu đãi đã chạy. Trang này là mục tiêu, và cho thấy bản kiểm tra đứng ở đâu cạnh những sản phẩm hành động theo nó và kiểm tra kết quả.",
    },
    {
      q: "Các bạn cần dữ liệu gì?",
      a: "Với mỗi nhóm người mua và mỗi ưu đãi bạn đã chạy, kể cả những giai đoạn không có ưu đãi: lượt truy cập, đơn hàng, đơn giao thất bại, và hàng bị trả kèm lý do. Cùng biên lợi nhuận trên mỗi đơn được giữ, chi phí một đơn trả và một đơn giao thất bại. Không có tên, số điện thoại hay địa chỉ.",
    },
    {
      q: "Việc này có tăng biên lợi nhuận của tôi không?",
      a: "Chúng tôi sẽ không đưa một con số, vì chưa có gì chạy trên lịch sử của bạn. Điều nó mang lại là biết ưu đãi nào giúp bạn tốt hơn việc không làm gì, đo trên chính đơn hàng của bạn.",
    },
  ],

  cta: {
    title: "Bắt đầu từ chiến dịch gần nhất bạn đã chạy.",
    body: "Một ngành hàng, các ưu đãi bạn đã chạy cho nó, và những đơn hàng cùng hàng bị trả theo sau.",
    label: "Liên hệ với chúng tôi",
    href: "/contact",
    note: "Chưa có gì được định giá cho đến khi một đợt thử nghiệm chạy trên chính lịch sử của bạn.",
  },
};

export const promotionsThatPay = (l: string) =>
  byLocale({ en: PROMOTIONS_THAT_PAY, vi: PROMOTIONS_THAT_PAY_VI }, l);
