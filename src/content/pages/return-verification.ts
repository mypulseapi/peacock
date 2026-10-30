import { byLocale } from "@/content/locale";
import { Split, ListOrdered, GitCompare, Coins, Repeat } from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";
import type { ReturnsArtText } from "@/components/designed/product/chapter-art";

type Content = ChapterContent & { art: ReturnsArtText };

/**
 * Return Verification. Grounded in what rainbow actually ships (ODIN/strategy/RETURN-AWARE-DECISIONS.md
 * §13): the returns join (`voi/returns.ts`), verification against unrepaired products
 * (`voi/return-verification.ts`), valuation at the merchant's costs (`voi/return-value.ts`), order
 * outcomes (`POST /outcomes`) and the retention ranking factor (`search/retention.ts`).
 *
 * **What this page may not say** (ODIN/hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9): that Pulse reduces
 * returns, or any figure. Everything has run on simulated orders only, so the copy describes what is
 * measured and how, and the "will not" list says the rest.
 */
export const RETURN_VERIFICATION: Content = {
  meta: {
    title: "Return Verification: product data behind returns",
    description:
      "Join returns to your catalogue: see which missing product facts go with them, whether a repair moved them, and what that was worth at your own costs.",
  },
  eyebrow: "Return Verification",
  title: "Find the missing facts your returns are telling you about.",
  lede: "Send your order history with the reasons people gave. We join it to your catalogue, show which missing product information sits behind returns, and after a repair, whether that slice of returns actually moved.",

  // The words in the chain chart (chapter-art.tsx), and the hero image, on the CDN like the other
  // product heroes (owner's image, 26 Oct 2026). Nothing in either is a measured result.
  art: {
    note: "Illustration",
    rate: "Return rate",
    facts: ["Dimensions", "Compatibility", "Material"],
    others: ["Transit damage", "Failed delivery"],
  },
  heroImage: {
    src: "product/return-verification-hero-returns-joined.webp",
    width: 1280,
    height: 531,
    alt: "Return Verification on one laptop. A table reads five return reasons: too large, does not work with my device and not as described each point to a missing fact, the dimensions, the compatibility and the material, while transit damage and failed delivery are set aside. Cards beside it split returns into yours and not yours, rank the facts that go with returns, show a repaired product's returns falling away from unrepaired ones, and value the change at your own costs. Three steps run beneath: export orders and returns, we join returns to the evidence, repair then verify.",
  },

  chainBlock: {
    eyebrow: "Returns are not one number",
    heading:
      "A return rate says something went wrong. The reason says what to fix.",
    body: "Read against the products missing the fact it names, a return reason becomes a repair list.",
  },

  situation: {
    heading: "Your returns already say what the listing left out.",
    body: [
      "Every return comes with a reason: too large, not as described, does not work with my device. Most teams read those as one rate to drive down, and the reasons sit in a report nobody joins back to the product page.",
      "Some returns are about the parcel, the courier or a buyer who changed their mind, and no listing change touches them. Others are about a fact the shopper needed and could not find: the dimensions, the compatibility, the material. Those are the ones a better product page could have prevented, and they are the only ones we count.",
    ],
    pull: "Not every return is yours to fix. The ones that are, the listing could have prevented.",
  },

  steps: {
    heading: "How does Return Verification work?",
    intro: "Three steps, on data you already have. Nothing goes on your site.",
    items: [
      {
        n: "01",
        meta: "You",
        title: "Export orders and returns",
        body: "One category of your catalogue, and six to twelve months of orders with the return reason. No names, phone numbers or addresses: a file that carries them is refused.",
      },
      {
        n: "02",
        meta: "Us",
        title: "We join returns to the evidence",
        body: "Each reason is read for the product fact it names. We compare return rates between products that record that fact and products that do not, within the same brand and price band, and say plainly when there are too few orders to tell.",
      },
      {
        n: "03",
        meta: "Both",
        title: "Repair, then verify",
        body: "After your team fills the gap, the repaired products are compared with similar ones that were not repaired, over the same weeks, so a season or a promotion does not take the credit. Share your costs and the verified change is valued with your numbers.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: Split,
        title: "Returns split into yours and not yours",
        body: "Transit damage, counterfeits, a wrong item sent and failed deliveries are counted and set aside. Only returns a product fact could have prevented are compared.",
      },
      {
        icon: ListOrdered,
        title: "The facts that go with returns, ranked",
        body: "For each attribute, the return rate where it is missing against where it is recorded, with an interval and the one sentence the result supports. An association, never a claimed cause.",
      },
      {
        icon: GitCompare,
        title: "Proof a repair moved the right returns",
        body: "A matched comparison against unrepaired products over the same period, with a check that the two were moving together before the repair.",
      },
      {
        icon: Coins,
        title: "Value at your own costs",
        body: "Only a verified reduction is valued, only with the costs you give us, and net of any orders the repair may have cost. We never estimate your logistics.",
      },
      {
        icon: Repeat,
        title: "Ranking for purchases that stay bought",
        body: "With the Decision API, the same history can rank products by how often they come back for a fixable reason. It is off until you send history, and a share of shoppers never sees it.",
      },
    ],
  },

  limits: {
    heading: "What Return Verification will and will not do",
    will: [
      "Show which missing product facts go with returns in your own order history",
      "Verify whether a repair moved the returns it was meant to move",
      "Value a verified change with the costs you give us",
      "Say when there are not enough orders to tell, instead of guessing",
    ],
    wont: [
      "Promise fewer returns. Nothing has been measured on your orders yet, and a result from another shop is not evidence about yours",
      "Treat every return as fixable. Transit damage, fraud and failed deliveries are not product information",
      "Predict which shopper will return something. It reads products and reasons, not people",
      "Cut returns at any cost. A clearer listing can lose an order that would have been kept, and the valuation shows that rather than hiding it",
    ],
  },

  faq: [
    {
      q: "What data do you need?",
      a: "One category of your catalogue and six to twelve months of orders: the product, the order date, the return date, the return reason, and the payment method if you have it. No personal data of any kind.",
    },
    {
      q: "Our marketplace's return reasons are vague. Does that matter?",
      a: "Yes, and we measure how much. A code like 'return in original or sealed condition' mixes a change of mind with a size problem. Where a buyer's comment or the marketplace's own reassessed reason exists, we use it, and the report shows how much of your return volume the codes leave unclear.",
    },
    {
      q: "How is this different from Decision Verification?",
      a: "Decision Verification re-measures your catalogue: can it now answer what shoppers ask. Return Verification checks the outcome that costs you money: did the returns that missing fact went with actually fall.",
    },
    {
      q: "Do you need access to our store?",
      a: "No. It runs on exports. If you later report order outcomes through the API, the same analysis keeps itself current.",
    },
    {
      q: "Is it a forecast?",
      a: "No. It looks back at returns that happened and tells you which listings to fix. We do not sell return prediction.",
    },
  ],

  cta: {
    title: "Start with the returns you already have.",
    body: "One category, its orders and the reasons people gave. The first answer comes from a file.",
    label: "Talk to us",
    href: "/contact",
    note: "Nothing is priced until a pilot has run on your own orders.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const RETURN_VERIFICATION_VI: Content = {
  meta: {
    title: "Return Verification: thông tin thiếu sau hàng bị trả",
    description:
      "Nối dữ liệu trả hàng với danh mục: thông tin còn thiếu nào đi cùng hàng bị trả, bản sửa có tác dụng không, và đáng giá bao nhiêu theo chi phí của bạn.",
  },
  eyebrow: "Return Verification",
  title: "Tìm ra những thông tin còn thiếu mà hàng bị trả đang chỉ cho bạn.",
  lede: "Gửi lịch sử đơn hàng kèm lý do người mua đưa ra. Chúng tôi nối nó với danh mục của bạn, chỉ ra thông tin sản phẩm còn thiếu nào đi cùng hàng bị trả, và sau khi sửa, phần hàng bị trả đó có thực sự giảm hay không.",

  art: {
    note: "Minh hoạ",
    rate: "Tỷ lệ trả hàng",
    facts: ["Kích thước", "Khả năng tương thích", "Chất liệu"],
    others: ["Hư hỏng khi vận chuyển", "Giao hàng thất bại"],
  },
  heroImage: {
    src: "product/return-verification-hero-returns-joined.webp",
    width: 1280,
    height: 531,
    alt: "Return Verification trên một máy tính xách tay. Một bảng đọc năm lý do trả hàng: quá to, không dùng được với thiết bị của tôi và không giống mô tả, mỗi lý do chỉ tới một thông tin còn thiếu là kích thước, khả năng tương thích và chất liệu, còn hư hỏng khi vận chuyển và giao hàng thất bại được để riêng. Các thẻ bên cạnh tách hàng bị trả thành phần của bạn và phần không phải, xếp thứ tự các thông tin đi cùng hàng bị trả, cho thấy hàng bị trả của sản phẩm đã sửa giảm xuống so với sản phẩm chưa sửa, và định giá thay đổi theo chi phí của bạn. Ba bước ở bên dưới: xuất đơn hàng và hàng bị trả, nối hàng bị trả với bằng chứng, sửa rồi kiểm chứng.",
  },

  chainBlock: {
    eyebrow: "Hàng bị trả không chỉ là một con số",
    heading:
      "Tỷ lệ trả hàng cho biết có gì đó sai. Lý do trả hàng cho biết cần sửa gì.",
    body: "Đặt cạnh những sản phẩm thiếu đúng thông tin mà lý do đó nhắc tới, mỗi lý do trả hàng trở thành một việc cần sửa.",
  },

  situation: {
    heading: "Hàng bị trả của bạn đã nói lên điều trang sản phẩm còn thiếu.",
    body: [
      "Mỗi đơn trả hàng đều kèm một lý do: quá to, không giống mô tả, không dùng được với thiết bị của tôi. Phần lớn các đội xem đó là một tỷ lệ cần kéo xuống, còn các lý do nằm trong một báo cáo không ai nối ngược về trang sản phẩm.",
      "Có những đơn trả liên quan đến gói hàng, đơn vị vận chuyển hoặc người mua đổi ý, và không thay đổi nào trên trang sản phẩm chạm tới được. Còn có những đơn trả vì một thông tin người mua cần mà không tìm thấy: kích thước, khả năng tương thích, chất liệu. Đó là những đơn mà một trang sản phẩm tốt hơn có thể ngăn được, và chỉ những đơn đó mới được tính.",
    ],
    pull: "Không phải đơn trả nào cũng là việc của bạn. Những đơn là việc của bạn thì trang sản phẩm đã có thể ngăn được.",
  },

  steps: {
    heading: "Return Verification hoạt động thế nào?",
    intro: "Ba bước, trên dữ liệu bạn đã có. Không cài gì lên website.",
    items: [
      {
        n: "01",
        meta: "Bạn",
        title: "Xuất đơn hàng và hàng bị trả",
        body: "Một ngành hàng trong danh mục, cùng sáu đến mười hai tháng đơn hàng kèm lý do trả. Không có tên, số điện thoại hay địa chỉ: tệp nào chứa những thông tin đó sẽ bị từ chối.",
      },
      {
        n: "02",
        meta: "Chúng tôi",
        title: "Nối hàng bị trả với bằng chứng",
        body: "Mỗi lý do được đọc để tìm thông tin sản phẩm mà nó nhắc tới. Chúng tôi so sánh tỷ lệ trả hàng giữa sản phẩm có ghi thông tin đó và sản phẩm không ghi, trong cùng thương hiệu và khoảng giá, và nói rõ khi số đơn quá ít để kết luận.",
      },
      {
        n: "03",
        meta: "Cả hai",
        title: "Sửa, rồi kiểm chứng",
        body: "Sau khi đội của bạn điền phần còn thiếu, các sản phẩm đã sửa được so với những sản phẩm tương tự chưa sửa, trong cùng các tuần, để mùa vụ hay khuyến mãi không nhận công thay. Chia sẻ chi phí của bạn và thay đổi đã kiểm chứng sẽ được định giá bằng chính con số của bạn.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: Split,
        title: "Hàng bị trả được tách thành phần của bạn và phần không phải",
        body: "Hư hỏng khi vận chuyển, hàng giả, gửi nhầm hàng và giao hàng thất bại được đếm và để riêng. Chỉ những đơn trả mà một thông tin sản phẩm có thể ngăn được mới được đem so sánh.",
      },
      {
        icon: ListOrdered,
        title: "Các thông tin đi cùng hàng bị trả, theo thứ tự",
        body: "Với mỗi thuộc tính, tỷ lệ trả hàng ở nơi thiếu so với nơi có ghi, kèm khoảng tin cậy và một câu duy nhất mà kết quả cho phép nói. Là mối liên hệ, không bao giờ là nguyên nhân được khẳng định.",
      },
      {
        icon: GitCompare,
        title: "Bằng chứng bản sửa đã làm giảm đúng phần hàng bị trả",
        body: "So sánh có đối chứng với các sản phẩm chưa sửa trong cùng giai đoạn, kèm kiểm tra rằng hai nhóm vẫn biến động cùng nhau trước khi sửa.",
      },
      {
        icon: Coins,
        title: "Định giá theo chi phí của chính bạn",
        body: "Chỉ một mức giảm đã kiểm chứng mới được định giá, chỉ bằng chi phí bạn cung cấp, và đã trừ đi những đơn hàng mà bản sửa có thể làm mất. Chúng tôi không bao giờ ước tính chi phí vận hành của bạn.",
      },
      {
        icon: Repeat,
        title: "Xếp hạng cho những đơn mua được giữ lại",
        body: "Khi dùng Decision API, cùng dữ liệu đó có thể xếp hạng sản phẩm theo mức độ chúng bị trả lại vì lý do sửa được. Tính năng này tắt cho tới khi bạn gửi dữ liệu, và luôn có một phần người mua không bị áp dụng.",
      },
    ],
  },

  limits: {
    heading: "Return Verification sẽ làm và sẽ không làm gì",
    will: [
      "Chỉ ra những thông tin sản phẩm còn thiếu nào đi cùng hàng bị trả trong chính lịch sử đơn hàng của bạn",
      "Kiểm chứng xem một bản sửa có làm giảm đúng phần hàng bị trả mà nó nhắm tới hay không",
      "Định giá một thay đổi đã kiểm chứng bằng chi phí bạn cung cấp",
      "Nói rõ khi không đủ đơn hàng để kết luận, thay vì đoán",
    ],
    wont: [
      "Hứa giảm hàng bị trả. Chưa có gì được đo trên đơn hàng của bạn, và kết quả của một cửa hàng khác không phải bằng chứng cho cửa hàng của bạn",
      "Xem mọi đơn trả là sửa được. Hư hỏng khi vận chuyển, gian lận và giao hàng thất bại không phải là thông tin sản phẩm",
      "Dự đoán người mua nào sẽ trả hàng. Nó đọc sản phẩm và lý do, không đọc con người",
      "Giảm hàng bị trả bằng mọi giá. Một trang sản phẩm rõ ràng hơn có thể làm mất một đơn lẽ ra được giữ lại, và phần định giá sẽ cho thấy điều đó thay vì giấu đi",
    ],
  },

  faq: [
    {
      q: "Các bạn cần dữ liệu gì?",
      a: "Một ngành hàng trong danh mục và sáu đến mười hai tháng đơn hàng: sản phẩm, ngày đặt, ngày trả, lý do trả, và phương thức thanh toán nếu có. Không cần bất kỳ dữ liệu cá nhân nào.",
    },
    {
      q: "Lý do trả hàng trên sàn của chúng tôi khá mơ hồ. Điều đó có ảnh hưởng không?",
      a: "Có, và chúng tôi đo được mức độ ảnh hưởng. Một mã như 'trả hàng còn nguyên vẹn hoặc nguyên niêm phong' lẫn cả đổi ý với vấn đề kích cỡ. Khi có bình luận của người mua hoặc lý do do chính sàn đánh giá lại, chúng tôi dùng chúng, và báo cáo cho thấy bao nhiêu phần hàng bị trả mà các mã để lại không rõ ràng.",
    },
    {
      q: "Khác gì với Decision Verification?",
      a: "Decision Verification đo lại danh mục của bạn: giờ nó đã trả lời được điều người mua hỏi chưa. Return Verification kiểm tra kết quả làm bạn tốn tiền: những đơn trả đi cùng thông tin còn thiếu đó có thực sự giảm không.",
    },
    {
      q: "Các bạn có cần truy cập cửa hàng của chúng tôi không?",
      a: "Không. Nó chạy trên tệp xuất. Nếu sau này bạn gửi kết quả đơn hàng qua API, cùng phân tích đó sẽ tự cập nhật.",
    },
    {
      q: "Đây có phải là dự báo không?",
      a: "Không. Nó nhìn lại những đơn trả đã xảy ra và cho bạn biết nên sửa trang sản phẩm nào. Chúng tôi không bán dự đoán trả hàng.",
    },
  ],

  cta: {
    title: "Bắt đầu từ những đơn trả bạn đã có.",
    body: "Một ngành hàng, các đơn hàng của nó và lý do người mua đưa ra. Câu trả lời đầu tiên đến từ một tệp.",
    label: "Liên hệ với chúng tôi",
    href: "/contact",
    note: "Chưa có gì được định giá cho đến khi một đợt thử nghiệm chạy trên chính đơn hàng của bạn.",
  },
};

export const returnVerification = (l: string) =>
  byLocale({ en: RETURN_VERIFICATION, vi: RETURN_VERIFICATION_VI }, l);

/** The alt text of the owner's pictures, in the order of `steps.items` and `gets.items`. */
export const returnVerificationPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        situation:
          "A returns report listing four reasons, too large, not as described, doesn’t work with my device and damaged in transit, beside a travel backpack’s product page whose dimensions, compatibility and material are blank; a dotted line from the report stops short of the page.",
        steps: [
          "A spreadsheet of orders and returns, product, ordered and return reason, going into an upload tray, beside a card that reads no personal data: no name, no phone, no address.",
          "Three return reasons, too large, doesn’t fit my device and not as described, joined to the product facts they name: dimensions, which is blank, compatibility and material. Beside them, recorded against missing for the same brand and price band.",
          "The backpack’s product page with its dimensions now filled in, joined to a chart where repaired and unrepaired products move together until the repair, after which the repaired line falls.",
        ],
        gains: [
          "Returned parcels sorted into two trays: yours to fix, for too large and not as described, and set aside, for transit damage, a wrong item sent and a failed delivery.",
          "A ranked card, facts that go with returns: dimensions, compatibility and material, each with a bar where the fact is missing and one where it is recorded, each bar with its interval.",
          "A chart of repaired against unrepaired products, moving together before the repair and parting after it, with a returned trainer and a wrench beside it.",
          "A card of your costs, return shipping, handling and resale loss, feeding a stack of coins marked verified change only.",
          "A storefront where the products that stay bought are marked and ranked first, a kettle that keeps coming back moves down, and a held-back share is shown in the corner.",
        ],
      },
      vi: {
        situation:
          "Một báo cáo trả hàng liệt kê bốn lý do, quá to, không giống mô tả, không dùng được với thiết bị của tôi và hư hỏng khi vận chuyển, cạnh trang sản phẩm của một ba lô du lịch có kích thước, khả năng tương thích và chất liệu để trống; một đường chấm từ báo cáo dừng lại trước khi tới trang.",
        steps: [
          "Một bảng tính đơn hàng và hàng bị trả, gồm sản phẩm, đơn đặt và lý do trả hàng, đi vào khay tải lên, cạnh một thẻ ghi không có dữ liệu cá nhân: không tên, không số điện thoại, không địa chỉ.",
          "Ba lý do trả hàng, quá to, không vừa thiết bị của tôi và không giống mô tả, nối với thông tin sản phẩm mà chúng nhắc tới: kích thước, đang để trống, khả năng tương thích và chất liệu. Bên cạnh là có ghi so với còn thiếu, cùng thương hiệu và cùng khoảng giá.",
          "Trang sản phẩm của chiếc ba lô nay đã có kích thước, nối với một biểu đồ nơi sản phẩm đã sửa và chưa sửa đi cùng nhau cho tới lúc sửa, sau đó đường đã sửa giảm xuống.",
        ],
        gains: [
          "Các kiện hàng bị trả được chia vào hai khay: phần của bạn cần sửa, cho quá to và không giống mô tả, và phần để riêng, cho hư hỏng khi vận chuyển, gửi nhầm hàng và giao hàng thất bại.",
          "Một thẻ xếp hạng các thông tin đi cùng hàng bị trả: kích thước, khả năng tương thích và chất liệu, mỗi thông tin có một thanh khi còn thiếu và một thanh khi có ghi, mỗi thanh kèm khoảng tin cậy.",
          "Một biểu đồ sản phẩm đã sửa so với chưa sửa, đi cùng nhau trước khi sửa và tách ra sau đó, cạnh một chiếc giày bị trả và một cờ lê.",
          "Một thẻ chi phí của bạn, phí gửi trả, phí xử lý và lỗ khi bán lại, dẫn vào một chồng xu ghi chỉ thay đổi đã kiểm chứng.",
          "Một cửa hàng nơi các sản phẩm ít bị trả được đánh dấu và xếp trước, một chiếc ấm đun hay bị trả lại bị chuyển xuống, và phần được giữ lại hiện ở góc.",
        ],
      },
    },
    l,
  );
