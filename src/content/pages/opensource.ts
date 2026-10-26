import { byLocale } from "@/content/locale";
import { Package, Bot, Search, FileCode2, Undo2 } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/**
 * Open source. ODIN/strategy/OPEN-SOURCE.md: detection is open, decision is paid, and the page says
 * exactly what is released today and what is only planned.
 *
 * Checked 2026-10-26: `@thepulseapi/sdk` 0.2.0 is on npm (MIT) with its source in a private
 * repository, so it is readable through npm, not GitHub; `@thepulseapi/mcp` has public source and is not yet
 * on npm. Both live in the public monorepo github.com/mypulseapi/pulse since 2026-10-26. Planned items carry "planned", never a date. No competitor named.
 */
export const OPENSOURCE: StoryContent = {
  meta: {
    title: "Open source: the Pulse SDK and MCP server",
    description:
      "The Pulse SDK and MCP server are MIT licensed. See what is released, what is planned and how to contribute. Finding problems is open; deciding is the API.",
  },
  eyebrow: "Open source",
  title: "The tools that find problems are open. The decisions are the API.",
  lede: "Anyone can read, run and improve the code that connects a store to Pulse and the tools an agent uses to read it. What decides which fix is worth paying for, and proves it worked, is the Pulse API.",

  chainBlock: {
    eyebrow: "Why open",
    heading: "Code you can read is code you can trust in your checkout.",
    body: "An SDK runs on your storefront and an MCP server runs on your machine. You should not have to take either on faith.",
  },

  situation: {
    heading: "What is open, and what is not.",
    body: [
      "Open: the browser SDK, the MCP server that lets an agent search our documentation and ask the Decision API, and, as they are released, the query parser, the evidence formats and the return-reason taxonomy.",
      "Not open: deciding which gaps matter, which repair or promotion is worth its cost, and whether it worked. Those run behind the API, because that is the work our customers pay for.",
    ],
    pull: "Detection is open. Decision is the API.",
  },

  steps: {
    heading: "How do I use and contribute?",
    intro: "MIT licensed, so use it in commercial work with the notice kept.",
    items: [
      {
        n: "01",
        meta: "Install",
        title: "Install from npm",
        body: "npm install @thepulseapi/sdk. The MCP server, @thepulseapi/mcp, is being published to npm.",
      },
      {
        n: "02",
        meta: "Read",
        title: "Read the source",
        body: "Both packages live in one public repository, mypulseapi/pulse on GitHub.",
      },
      {
        n: "03",
        meta: "Contribute",
        title: "Open an issue or a pull request",
        body: "Bugs, language support and new adapters are welcome on GitHub. Contribution terms are being finalised; until then, open an issue first.",
      },
    ],
  },

  gets: {
    heading: "The packages",
    items: [
      {
        icon: Package,
        title: "@thepulseapi/sdk: released",
        body: "The browser SDK: send signals, rank, measure. MIT, version 0.2.0 on npm, about 3 KB on the CDN.",
      },
      {
        icon: Bot,
        title: "@thepulseapi/mcp: source public",
        body: "An MCP server for Claude, ChatGPT and other agents: search the docs, and with a key, ask the Decision API which products meet a shopper's requirements. MIT, source on GitHub.",
      },
      {
        icon: Search,
        title: "Query parser: planned",
        body: "Turns a shopper's words into requirements: budget, who it is for, the occasion, in Vietnamese, Thai, Bahasa and English.",
      },
      {
        icon: FileCode2,
        title: "Decision evidence formats: planned",
        body: "A shared way to describe buying requirements, product evidence and order outcomes, so tools and agents can exchange them.",
      },
      {
        icon: Undo2,
        title: "Return-reason taxonomy: planned",
        body: "Maps marketplace return reasons to what went wrong, separating what a listing could have prevented from transit and seller errors.",
      },
    ],
  },

  limits: {
    heading: "What open source here will and will not include",
    will: [
      "Code that runs on your storefront or your machine",
      "Formats and taxonomies others can build on",
      "Tools that find problems in your own data",
      "A clear licence: MIT for code",
    ],
    wont: [
      "The ranking and prioritisation that decide what is worth fixing",
      "Verification, the noise checks and the economics behind a recommendation",
      "Anything pooled from customers' data, which is never published",
      "A promise of results: open code finds problems, it does not fix them for you",
    ],
  },

  faq: [
    {
      q: "What licence is the code under?",
      a: "MIT. You can use, change and ship it in commercial work, as long as the licence notice stays with the code.",
    },
    {
      q: "Where is the code?",
      a: "In one public repository, mypulseapi/pulse on GitHub, and on npm under @thepulseapi.",
    },
    {
      q: "Can I contribute?",
      a: "Yes. Open an issue on GitHub first. Contribution terms are being finalised, and we will publish them before accepting larger changes.",
    },
    {
      q: "Why is the decision engine not open?",
      a: "Because it is what customers pay for, and it improves with their measured outcomes, which are never shared. The tools around it are open so you can see exactly what reaches it.",
    },
    {
      q: "Can AI agents use these tools?",
      a: "Yes. The MCP server is built for them: an agent can search our documentation, and with an API key, ask which products meet a shopper's requirements.",
    },
  ],

  cta: {
    title: "Start with the SDK.",
    body: "Install it, read it, and connect your store. The developer docs cover the rest.",
    label: "Read the developer docs",
    href: "https://developer.thepulseapi.com/opensource",
    note: "Questions about contributing: open an issue on GitHub.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const OPENSOURCE_VI: StoryContent = {
  meta: {
    title: "Mã nguồn mở: SDK và máy chủ MCP của Pulse",
    description:
      "SDK và máy chủ MCP của Pulse dùng giấy phép MIT. Xem những gì đã phát hành, dự kiến, và cách đóng góp trên GitHub. Tìm vấn đề là mở; quyết định là API.",
  },
  eyebrow: "Mã nguồn mở",
  title: "Công cụ tìm ra vấn đề là mã nguồn mở. Phần ra quyết định là API.",
  lede: "Ai cũng có thể đọc, chạy và cải thiện mã nguồn kết nối cửa hàng với Pulse và các công cụ mà một tác tử AI dùng để đọc nó. Phần quyết định bản sửa nào đáng trả tiền, và chứng minh nó có tác dụng, là Pulse API.",

  chainBlock: {
    eyebrow: "Vì sao mở",
    heading:
      "Mã nguồn đọc được là mã nguồn có thể tin khi đặt vào trang thanh toán.",
    body: "SDK chạy trên cửa hàng của bạn và máy chủ MCP chạy trên máy của bạn. Bạn không nên phải tin mà không được xem.",
  },

  situation: {
    heading: "Cái gì mở, và cái gì không.",
    body: [
      "Mở: SDK cho trình duyệt, máy chủ MCP giúp tác tử AI tìm trong tài liệu và hỏi Decision API, và khi phát hành, bộ phân tích câu tìm kiếm, các định dạng bằng chứng và bảng phân loại lý do trả hàng.",
      "Không mở: việc quyết định khoảng trống nào quan trọng, bản sửa hay khuyến mãi nào đáng chi phí, và nó có tác dụng không. Những phần đó chạy sau API, vì đó là công việc khách hàng trả tiền.",
    ],
    pull: "Tìm vấn đề là mở. Ra quyết định là API.",
  },

  steps: {
    heading: "Dùng và đóng góp thế nào?",
    intro:
      "Giấy phép MIT, nên dùng được trong công việc thương mại, miễn giữ lại thông báo giấy phép.",
    items: [
      {
        n: "01",
        meta: "Cài đặt",
        title: "Cài từ npm",
        body: "npm install @thepulseapi/sdk. Máy chủ MCP, @thepulseapi/mcp, đang được phát hành lên npm.",
      },
      {
        n: "02",
        meta: "Đọc",
        title: "Đọc mã nguồn",
        body: "Cả hai gói nằm trong một kho công khai, mypulseapi/pulse trên GitHub.",
      },
      {
        n: "03",
        meta: "Đóng góp",
        title: "Mở issue hoặc pull request",
        body: "Báo lỗi, hỗ trợ ngôn ngữ và adapter mới đều được hoan nghênh trên GitHub. Điều khoản đóng góp đang được hoàn thiện; trước mắt, hãy mở issue trước.",
      },
    ],
  },

  gets: {
    heading: "Các gói",
    items: [
      {
        icon: Package,
        title: "@thepulseapi/sdk: đã phát hành",
        body: "SDK cho trình duyệt: gửi tín hiệu, xếp hạng, đo lường. MIT, phiên bản 0.2.0 trên npm, khoảng 3 KB trên CDN.",
      },
      {
        icon: Bot,
        title: "@thepulseapi/mcp: mã nguồn công khai",
        body: "Máy chủ MCP cho Claude, ChatGPT và các tác tử khác: tìm trong tài liệu, và khi có khóa, hỏi Decision API sản phẩm nào đáp ứng yêu cầu của người mua. MIT, mã nguồn trên GitHub.",
      },
      {
        icon: Search,
        title: "Bộ phân tích câu tìm kiếm: dự kiến",
        body: "Biến lời người mua thành yêu cầu: ngân sách, mua cho ai, dịp gì, bằng tiếng Việt, Thái, Bahasa và tiếng Anh.",
      },
      {
        icon: FileCode2,
        title: "Định dạng bằng chứng quyết định: dự kiến",
        body: "Một cách chung để mô tả yêu cầu mua, bằng chứng sản phẩm và kết quả đơn hàng, để công cụ và tác tử trao đổi được với nhau.",
      },
      {
        icon: Undo2,
        title: "Bảng phân loại lý do trả hàng: dự kiến",
        body: "Ánh xạ lý do trả hàng của các sàn sang điều đã sai, tách phần trang sản phẩm có thể ngăn được khỏi lỗi vận chuyển và lỗi người bán.",
      },
    ],
  },

  limits: {
    heading: "Mã nguồn mở ở đây sẽ và sẽ không gồm gì",
    will: [
      "Mã chạy trên cửa hàng hoặc máy của bạn",
      "Định dạng và bảng phân loại người khác có thể xây dựng tiếp",
      "Công cụ tìm vấn đề trong dữ liệu của chính bạn",
      "Giấy phép rõ ràng: MIT cho mã nguồn",
    ],
    wont: [
      "Phần xếp hạng và ưu tiên quyết định điều gì đáng sửa",
      "Phần kiểm chứng, kiểm tra nhiễu và tính toán kinh tế đằng sau một đề xuất",
      "Bất cứ dữ liệu gộp nào từ khách hàng, thứ không bao giờ được công bố",
      "Lời hứa về kết quả: mã nguồn mở tìm ra vấn đề, không tự sửa giúp bạn",
    ],
  },

  faq: [
    {
      q: "Mã nguồn dùng giấy phép gì?",
      a: "MIT. Bạn có thể dùng, sửa và đưa vào sản phẩm thương mại, miễn là thông báo giấy phép đi kèm mã nguồn.",
    },
    {
      q: "Mã nguồn ở đâu?",
      a: "Trong một kho công khai, mypulseapi/pulse trên GitHub, và trên npm dưới @thepulseapi.",
    },
    {
      q: "Tôi có thể đóng góp không?",
      a: "Có. Hãy mở issue trên GitHub trước. Điều khoản đóng góp đang được hoàn thiện, và chúng tôi sẽ công bố trước khi nhận các thay đổi lớn.",
    },
    {
      q: "Vì sao bộ máy ra quyết định không mở?",
      a: "Vì đó là thứ khách hàng trả tiền, và nó tốt lên nhờ kết quả đo được của họ, những dữ liệu không bao giờ được chia sẻ. Các công cụ xung quanh là mở để bạn thấy chính xác cái gì đi tới nó.",
    },
    {
      q: "Tác tử AI có dùng được các công cụ này không?",
      a: "Có. Máy chủ MCP được làm cho chúng: một tác tử có thể tìm trong tài liệu, và khi có khóa API, hỏi sản phẩm nào đáp ứng yêu cầu của người mua.",
    },
  ],

  cta: {
    title: "Bắt đầu với SDK.",
    body: "Cài đặt, đọc, và kết nối cửa hàng của bạn. Tài liệu cho lập trình viên lo phần còn lại.",
    label: "Đọc tài liệu cho lập trình viên",
    href: "https://developer.thepulseapi.com/vi/opensource",
    note: "Câu hỏi về đóng góp: mở issue trên GitHub.",
  },
};

export const opensource = (l: string) =>
  byLocale({ en: OPENSOURCE, vi: OPENSOURCE_VI }, l);
