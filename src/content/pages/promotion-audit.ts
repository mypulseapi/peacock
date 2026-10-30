import { byLocale } from "@/content/locale";
import { Undo2, Wrench, Scale, CircleSlash, FlaskConical } from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";
import type { PromotionsArtText } from "@/components/designed/product/chapter-art";

type Content = ChapterContent & { art: PromotionsArtText };

/**
 * Promotion Audit. Grounded in what rainbow ships (ODIN/strategy/INTERVENTION-INTELLIGENCE.md §11):
 * retained contribution net of returns and failed delivery (`voi/intervention.ts`), the audit of a
 * seller's own history with its noise check (`voi/promotion-audit.ts`), and the three
 * `/interventions` endpoints.
 *
 * **What this page may not say** (ODIN/hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9): any uplift, saving
 * or return figure, or that Pulse makes promotions profitable. Nothing has run on a real seller yet,
 * so the copy describes what is measured and the "will not" list says the rest. No competitor or
 * marketplace is named as failing.
 */
export const PROMOTION_AUDIT: Content = {
  meta: {
    title: "Promotion Audit: which promotions pay after returns",
    description:
      "Judge vouchers, price cuts and free shipping on the orders that stayed bought, net of returns and failed deliveries, and see where doing nothing was better.",
  },
  eyebrow: "Promotion Audit",
  title: "Find out which promotions paid for themselves, after the returns.",
  lede: "Send the history of your vouchers, price cuts and free-shipping offers with the orders, returns and failed deliveries they produced. We work out which ones left you better off than doing nothing, for which shoppers, and where fixing the listing beats a discount.",

  // The words in the chain chart (chapter-art.tsx), and the hero image, on the CDN like the other
  // product heroes (owner's image, 26 Oct 2026). Nothing in either is a measured result.
  art: {
    note: "Illustration",
    voucher: "Voucher",
    orders: "Orders",
    failed: "Failed deliveries",
    returned: "Returns",
    kept: "Stay bought",
  },
  heroImage: {
    src: "product/promotion-audit-hero-offers.webp",
    width: 1280,
    height: 548,
    alt: "Promotion Audit on one laptop. A table sets each offer against doing nothing: a voucher is marked test first, a price cut did worse than doing nothing, and free shipping and a listing repair beat doing nothing. Cards beside it show an offer's orders net of returns and failed deliveries, where to give nothing, a listing repair priced against a price cut, and a test where the history cannot tell. Three steps run beneath: export your promotion history, we measure each offer against doing nothing, test what is not yet proven.",
  },

  chainBlock: {
    eyebrow: "More orders is not the goal",
    heading:
      "A promotion is worth the orders that stay bought, not the ones it creates.",
    body: "Every order a voucher buys has to survive delivery and the return window before it earns anything.",
  },

  situation: {
    heading: "Most promotions are judged on the day they run.",
    body: [
      "A voucher goes out, orders go up, and the campaign looks like it worked. Weeks later some of those orders come back, some were refused at the door, and some shoppers would have bought at full price anyway. None of that reaches the campaign report.",
      "So the same discount keeps running for everyone, including shoppers who never needed it, while a listing that leaves out the size keeps losing orders a voucher cannot win back.",
    ],
    pull: "Sometimes the best promotion is none, and sometimes it is a better product page.",
  },

  steps: {
    heading: "How does the Promotion Audit work?",
    intro: "Three steps, on data you already have. Nothing goes on your site.",
    items: [
      {
        n: "01",
        meta: "You",
        title: "Export your promotion history",
        body: "For each group of shoppers you can see, such as new or repeat buyers, a region, cash on delivery, and each offer you ran, including no offer: visitors, orders, failed deliveries and returns with their reasons. Your margin, return cost and failed-delivery cost. No personal data.",
      },
      {
        n: "02",
        meta: "Us",
        title: "We measure each offer against doing nothing",
        body: "Each offer's expected contribution per shopper counts the orders kept, the returns a listing could have prevented, every other return, and failed deliveries. An offer is recommended only if it still beats doing nothing at the cautious end of its range.",
      },
      {
        n: "03",
        meta: "Both",
        title: "Test what is not yet proven",
        body: "Where the history is too thin, or the gain sits inside the noise, the answer is a test, with the group and the offer named. We do not recommend an offer nobody has measured.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: Undo2,
        title: "Every offer, net of returns and failed deliveries",
        body: "A voucher that brought orders which came back is shown for what it earned, not for what it sold. Returns the listing could not have prevented are counted separately.",
      },
      {
        icon: CircleSlash,
        title: "Where to give nothing",
        body: "For each group of shoppers, whether any offer beat doing nothing, and how many shoppers each choice covers.",
      },
      {
        icon: Wrench,
        title: "A listing repair priced against a discount",
        body: "Fixing the size or the compatibility on a product page is one more option, with its one-off cost spread over the shoppers it reaches, set beside the vouchers it competes with.",
      },
      {
        icon: Scale,
        title: "The price shoppers actually pay",
        body: "Your price against the same product elsewhere after vouchers, cashback, coins and shipping, beside the sticker gap a price tracker would report.",
      },
      {
        icon: FlaskConical,
        title: "Tests, where the history cannot tell",
        body: "The offer worth trying, and the group to try it on, whenever an option could win but has not been measured.",
      },
    ],
  },

  limits: {
    heading: "What the Promotion Audit will and will not do",
    will: [
      "Judge each past offer on contribution kept, net of returns and failed deliveries",
      "Say where no offer beat doing nothing, and for how many shoppers",
      "Price a listing repair against a discount on the same terms",
      "Ask for a test whenever the history is too thin to tell",
    ],
    wont: [
      "Promise more profit or fewer returns. Nothing has been measured on your history yet, and another shop's result is not evidence about yours",
      "Guess an effect. Every rate comes from your history or a test you ran",
      "Target individual shoppers. It works on groups you can already see",
      "Set your prices automatically. It recommends; you decide",
    ],
  },

  faq: [
    {
      q: "What data do you need?",
      a: "For each group of shoppers and each offer you ran, including periods with no offer: visitors, orders, failed deliveries, and returns with their reasons. Plus your margin per kept order, what a return costs you and what a failed delivery costs you. No names, phones or addresses.",
    },
    {
      q: "Why compare against doing nothing?",
      a: "Because some shoppers buy anyway. A voucher given to them is margin spent for nothing, and the only way to see that is to compare each offer with the same group when no offer ran.",
    },
    {
      q: "How is this different from Return Verification?",
      a: "Return Verification asks whether a listing repair moved the returns it was meant to move. The Promotion Audit asks which of your offers, including a repair, left you better off than doing nothing once returns and failed deliveries are counted.",
    },
    {
      q: "Can I call it from my own tools?",
      a: "Yes. The same audit, the per-group decision and the landed-price comparison are API calls. The developer docs have them.",
    },
    {
      q: "Is it a forecast?",
      a: "No. It reads what your offers did. Where the history cannot tell, it asks for a test instead of predicting.",
    },
  ],

  cta: {
    title: "Start with the promotions you already ran.",
    body: "One category, the offers you ran on it, and the orders and returns that followed.",
    label: "Talk to us",
    href: "/contact",
    note: "Nothing is priced until a pilot has run on your own history.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const PROMOTION_AUDIT_VI: Content = {
  meta: {
    title: "Promotion Audit: khuyến mãi nào thực sự có lãi",
    description:
      "Đánh giá voucher, giảm giá và miễn phí vận chuyển theo đơn được giữ lại, sau khi trừ hàng trả và giao thất bại, và thấy khi nào không ưu đãi lại tốt hơn.",
  },
  eyebrow: "Promotion Audit",
  title: "Biết khuyến mãi nào thực sự có lãi, sau khi đã tính hàng bị trả.",
  lede: "Gửi lịch sử voucher, giảm giá và miễn phí vận chuyển của bạn kèm số đơn, hàng bị trả và đơn giao thất bại mà chúng tạo ra. Chúng tôi tính xem ưu đãi nào giúp bạn tốt hơn so với không làm gì, cho nhóm người mua nào, và ở đâu sửa trang sản phẩm có lợi hơn giảm giá.",

  art: {
    note: "Minh hoạ",
    voucher: "Voucher",
    orders: "Đơn hàng",
    failed: "Giao thất bại",
    returned: "Hàng bị trả",
    kept: "Được giữ lại",
  },
  heroImage: {
    src: "product/promotion-audit-hero-offers.webp",
    width: 1280,
    height: 548,
    alt: "Promotion Audit trên một máy tính xách tay. Một bảng đặt từng ưu đãi cạnh việc không làm gì: voucher được đánh dấu thử trước, giảm giá kém hơn không làm gì, còn miễn phí vận chuyển và sửa trang sản phẩm tốt hơn không làm gì. Các thẻ bên cạnh cho thấy đơn hàng của một ưu đãi sau khi trừ hàng bị trả và giao thất bại, chỗ nào không nên ưu đãi, việc sửa trang sản phẩm đặt cạnh giảm giá, và một thử nghiệm khi lịch sử không đủ để biết. Ba bước ở bên dưới: xuất lịch sử khuyến mãi, đo mỗi ưu đãi so với không làm gì, thử nghiệm những gì chưa được chứng minh.",
  },

  chainBlock: {
    eyebrow: "Nhiều đơn hơn không phải là mục tiêu",
    heading:
      "Một khuyến mãi đáng giá bằng những đơn được giữ lại, không phải những đơn nó tạo ra.",
    body: "Mỗi đơn mà voucher mang lại phải vượt qua khâu giao hàng và thời hạn đổi trả trước khi đem lại đồng nào.",
  },

  situation: {
    heading: "Phần lớn khuyến mãi được đánh giá ngay trong ngày chạy.",
    body: [
      "Voucher được phát, đơn tăng lên, và chiến dịch có vẻ thành công. Vài tuần sau, một phần đơn bị trả lại, một phần bị từ chối nhận hàng, và một số người mua lẽ ra vẫn mua với giá gốc. Không điều nào trong số đó có mặt trong báo cáo chiến dịch.",
      "Vì vậy cùng một mức giảm giá tiếp tục chạy cho tất cả mọi người, kể cả những người chưa bao giờ cần nó, trong khi một trang sản phẩm thiếu kích thước vẫn tiếp tục làm mất những đơn mà voucher không lấy lại được.",
    ],
    pull: "Đôi khi khuyến mãi tốt nhất là không khuyến mãi, và đôi khi là một trang sản phẩm tốt hơn.",
  },

  steps: {
    heading: "Promotion Audit hoạt động thế nào?",
    intro: "Ba bước, trên dữ liệu bạn đã có. Không cài gì lên website.",
    items: [
      {
        n: "01",
        meta: "Bạn",
        title: "Xuất lịch sử khuyến mãi",
        body: "Với mỗi nhóm người mua bạn thấy được, như khách mới hay khách quay lại, một vùng, thanh toán khi nhận hàng, và mỗi ưu đãi bạn đã chạy, kể cả không có ưu đãi: lượt truy cập, đơn hàng, đơn giao thất bại và hàng bị trả kèm lý do. Biên lợi nhuận, chi phí một đơn trả và chi phí một đơn giao thất bại. Không có dữ liệu cá nhân.",
      },
      {
        n: "02",
        meta: "Chúng tôi",
        title: "Đo mỗi ưu đãi so với không làm gì",
        body: "Đóng góp kỳ vọng trên mỗi người mua của từng ưu đãi tính cả đơn được giữ lại, hàng bị trả mà trang sản phẩm có thể ngăn được, các đơn trả khác, và đơn giao thất bại. Một ưu đãi chỉ được đề xuất khi nó vẫn hơn việc không làm gì ở đầu thận trọng của khoảng ước lượng.",
      },
      {
        n: "03",
        meta: "Cả hai",
        title: "Thử nghiệm những gì chưa được chứng minh",
        body: "Khi dữ liệu quá mỏng, hoặc phần lợi nằm trong vùng nhiễu, câu trả lời là một thử nghiệm, có nêu rõ nhóm và ưu đãi. Chúng tôi không đề xuất một ưu đãi chưa ai đo.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: Undo2,
        title: "Mỗi ưu đãi, sau khi trừ hàng bị trả và giao thất bại",
        body: "Một voucher mang về những đơn bị trả lại được thể hiện đúng bằng những gì nó kiếm được, không phải những gì nó bán được. Các đơn trả mà trang sản phẩm không thể ngăn được được tính riêng.",
      },
      {
        icon: CircleSlash,
        title: "Chỗ nào không nên ưu đãi",
        body: "Với mỗi nhóm người mua, liệu có ưu đãi nào hơn việc không làm gì, và mỗi lựa chọn áp dụng cho bao nhiêu người.",
      },
      {
        icon: Wrench,
        title: "Sửa trang sản phẩm, đặt cạnh giảm giá",
        body: "Bổ sung kích thước hay khả năng tương thích trên trang sản phẩm là một lựa chọn nữa, với chi phí một lần chia cho những người mua nó tiếp cận, đặt cạnh các voucher mà nó cạnh tranh.",
      },
      {
        icon: Scale,
        title: "Mức giá người mua thực sự trả",
        body: "Giá của bạn so với cùng sản phẩm ở nơi khác sau voucher, hoàn tiền, xu và phí vận chuyển, đặt cạnh mức chênh giá niêm yết mà công cụ theo dõi giá báo cáo.",
      },
      {
        icon: FlaskConical,
        title: "Thử nghiệm, khi lịch sử không đủ để biết",
        body: "Ưu đãi đáng thử, và nhóm nên thử, mỗi khi một lựa chọn có thể thắng nhưng chưa được đo.",
      },
    ],
  },

  limits: {
    heading: "Promotion Audit sẽ làm và sẽ không làm gì",
    will: [
      "Đánh giá mỗi ưu đãi đã chạy theo phần đóng góp được giữ lại, sau khi trừ hàng bị trả và giao thất bại",
      "Chỉ ra chỗ nào không ưu đãi nào hơn việc không làm gì, và cho bao nhiêu người mua",
      "Đặt việc sửa trang sản phẩm cạnh giảm giá theo cùng một cách tính",
      "Đề nghị thử nghiệm mỗi khi lịch sử quá mỏng để kết luận",
    ],
    wont: [
      "Hứa tăng lợi nhuận hay giảm hàng bị trả. Chưa có gì được đo trên lịch sử của bạn, và kết quả của cửa hàng khác không phải bằng chứng cho cửa hàng của bạn",
      "Đoán một hiệu quả. Mọi tỷ lệ đều đến từ lịch sử của bạn hoặc một thử nghiệm bạn đã chạy",
      "Nhắm tới từng người mua. Nó làm việc trên những nhóm bạn đã thấy được",
      "Tự động đặt giá. Nó đề xuất; bạn quyết định",
    ],
  },

  faq: [
    {
      q: "Các bạn cần dữ liệu gì?",
      a: "Với mỗi nhóm người mua và mỗi ưu đãi bạn đã chạy, kể cả những giai đoạn không có ưu đãi: lượt truy cập, đơn hàng, đơn giao thất bại, và hàng bị trả kèm lý do. Cùng biên lợi nhuận trên mỗi đơn được giữ, chi phí một đơn trả và chi phí một đơn giao thất bại. Không có tên, số điện thoại hay địa chỉ.",
    },
    {
      q: "Vì sao so với việc không làm gì?",
      a: "Vì có những người vẫn mua dù không có ưu đãi. Voucher đưa cho họ là biên lợi nhuận bỏ ra vô ích, và cách duy nhất để thấy điều đó là so mỗi ưu đãi với chính nhóm đó khi không có ưu đãi nào.",
    },
    {
      q: "Khác gì với Return Verification?",
      a: "Return Verification hỏi liệu một bản sửa trang sản phẩm có làm giảm đúng phần hàng bị trả nó nhắm tới không. Promotion Audit hỏi ưu đãi nào của bạn, kể cả việc sửa trang, giúp bạn tốt hơn việc không làm gì khi đã tính hàng bị trả và giao thất bại.",
    },
    {
      q: "Tôi có thể gọi nó từ công cụ của mình không?",
      a: "Có. Cùng bản kiểm tra, quyết định theo từng nhóm và phần so sánh giá thực trả đều là lệnh gọi API. Tài liệu cho lập trình viên có đầy đủ.",
    },
    {
      q: "Đây có phải là dự báo không?",
      a: "Không. Nó đọc những gì ưu đãi của bạn đã làm được. Khi lịch sử không đủ để biết, nó đề nghị thử nghiệm thay vì dự đoán.",
    },
  ],

  cta: {
    title: "Bắt đầu từ những khuyến mãi bạn đã chạy.",
    body: "Một ngành hàng, các ưu đãi bạn đã chạy cho nó, và những đơn hàng cùng hàng bị trả theo sau.",
    label: "Liên hệ với chúng tôi",
    href: "/contact",
    note: "Chưa có gì được định giá cho đến khi một đợt thử nghiệm chạy trên chính lịch sử của bạn.",
  },
};

export const promotionAudit = (l: string) =>
  byLocale({ en: PROMOTION_AUDIT, vi: PROMOTION_AUDIT_VI }, l);

/** The alt text of the owner's pictures, in the order of `steps.items` and `gets.items`. */
export const promotionAuditPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        situation:
          "A campaign report covering only the day a voucher ran, when orders jump; weeks later, outside the report, parcels come back and one is refused at the door.",
        steps: [
          "A promotion history table, group, offer, orders, returns and failed deliveries, under the groups it covers, new, repeat and cash on delivery, and the offers, a voucher, a price cut, free shipping and no offer.",
          "Each offer’s range set against doing nothing: the voucher clears the no-offer line and is ticked, the price cut straddles it, and free shipping falls short.",
          "A test naming one group, repeat buyers, and one offer, free shipping, split in two, beside an option marked not measured yet.",
        ],
        gains: [
          "A voucher’s orders as one bar, with the returned and the failed deliveries peeling off and the part that was kept marked.",
          "Three groups of shoppers, two given an offer, a voucher and free shipping, and the third given no offer, because it would buy anyway.",
          "A balance with a voucher on one side and a product page whose size has just been filled in on the other, and the repair weighs more.",
          "The same trainer in your shop and elsewhere, with the voucher, cashback, coins and shipping taken off elsewhere, and the price each shopper actually paid compared.",
          "An offer that branches two ways: proven, or not proven and so sent to a test of a voucher on new buyers.",
        ],
      },
      vi: {
        situation:
          "Một báo cáo chiến dịch chỉ bao trọn ngày chạy voucher, khi đơn hàng tăng vọt; vài tuần sau, ngoài phạm vi báo cáo, các kiện hàng bị trả về và một kiện bị từ chối ở cửa.",
        steps: [
          "Một bảng lịch sử khuyến mãi, gồm nhóm, ưu đãi, đơn hàng, hàng bị trả và giao hàng thất bại, dưới các nhóm mà nó bao gồm, khách mới, khách quay lại và trả tiền khi nhận hàng, cùng các ưu đãi, voucher, giảm giá, miễn phí vận chuyển và không ưu đãi.",
          "Khoảng kết quả của từng ưu đãi đặt cạnh việc không làm gì: voucher vượt qua vạch không ưu đãi và được đánh dấu, giảm giá nằm vắt qua vạch, còn miễn phí vận chuyển thì chưa tới.",
          "Một phép thử nêu một nhóm, khách quay lại, và một ưu đãi, miễn phí vận chuyển, chia làm hai, cạnh một lựa chọn được ghi là chưa đo.",
        ],
        gains: [
          "Các đơn hàng của một voucher thành một thanh, phần bị trả và phần giao thất bại tách ra, phần giữ lại được đánh dấu.",
          "Ba nhóm người mua, hai nhóm được ưu đãi, voucher và miễn phí vận chuyển, còn nhóm thứ ba không có ưu đãi nào, vì họ vẫn sẽ mua.",
          "Một cái cân, một bên là voucher và bên kia là trang sản phẩm vừa được điền kích cỡ, và phía sửa trang nặng hơn.",
          "Cùng một đôi giày ở cửa hàng của bạn và nơi khác, nơi khác trừ đi voucher, hoàn tiền, xu và phí vận chuyển, và giá mỗi người mua thực trả được so sánh.",
          "Một ưu đãi rẽ hai nhánh: đã chứng minh, hoặc chưa chứng minh và vì thế được đưa đi thử, voucher cho khách mới.",
        ],
      },
    },
    l,
  );
