import { byLocale } from "@/content/locale";
import { Package, Bot, Search, FileCode2, Undo2 } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/**
 * Open source. ODIN/strategy/OPEN-SOURCE.md: detection is open, decision is paid, and the page says
 * exactly what is released today and what is only planned.
 *
 * Checked 2026-10-26: `@thepulseapi/sdk` and `@thepulseapi/mcp` are both on npm at 0.2.0 (MIT), and
 * both live in the public monorepo github.com/mypulseapi/open-pulse. `npx -y @thepulseapi/mcp` was
 * run against the registry and listed its four tools. Planned items carry "planned", never a date. No competitor named.
 */
export const OPENSOURCE: StoryContent = {
  meta: {
    title: "Open Pulse: decisions any AI agent can use",
    description:
      "The Pulse SDK and MCP server are MIT licensed. See what is released, what is planned and how to contribute. Finding problems is open; deciding is the API.",
  },
  eyebrow: "Opensource",
  title: "Open Pulse: grounded decisions for any AI agent, in any industry.",
  lede: "Send requirements and the options you are choosing between: products, suppliers, hotels, plans. For each one Pulse answers fits, fails, or cannot tell, with what is missing. Claude, ChatGPT, Claude Code and your own code can call it. The client code is open source; the decision engine is the Pulse API.",

  chainBlock: {
    eyebrow: "Why open",
    heading:
      'An agent that can say "the evidence does not say" stops guessing.',
    body: "Language models are built to answer. Pulse gives them a third answer besides yes and no, grounded in what each option actually states.",
  },

  situation: {
    heading: "What is open, and what is not.",
    body: [
      "Open: the MCP server that gives agents Pulse's verdicts and searches our documentation, the browser SDK, runnable examples, and, as they are released, a query parser and shared formats for requirements and evidence.",
      "Not open: the decision engine itself, and in commerce the economics of which repair or promotion is worth its cost. Those run behind the API, because that is the work our customers pay for.",
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
        body: "npm install @thepulseapi/sdk for a site, or npx -y @thepulseapi/mcp for an agent.",
      },
      {
        n: "02",
        meta: "Read",
        title: "Read the source",
        body: "Both packages live in one public repository, mypulseapi/open-pulse on GitHub.",
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
        title: "@thepulseapi/mcp: released",
        body: "An MCP server for Claude, Cursor, Codex and other agents: verdicts on any options with a key, and the docs without one. MIT, version 0.2.0 on npm.",
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
      a: "In one public repository, mypulseapi/open-pulse on GitHub, and on npm under @thepulseapi.",
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
    title: "Give your agent a decision it can stand behind.",
    body: "Add the MCP server to your agent, or call the API from your code. The repository has runnable examples for both.",
    label: "Read the developer docs",
    href: "https://developer.thepulseapi.com/opensource",
    note: "Questions about contributing: open an issue on GitHub.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const OPENSOURCE_VI: StoryContent = {
  meta: {
    title: "Open Pulse: quyết định mọi tác tử AI đều dùng được",
    description:
      "SDK và máy chủ MCP của Pulse dùng giấy phép MIT. Xem những gì đã phát hành, dự kiến, và cách đóng góp trên GitHub. Tìm vấn đề là mở; quyết định là API.",
  },
  eyebrow: "Mã nguồn mở",
  title: "Open Pulse: quyết định có căn cứ cho mọi tác tử AI, trong mọi ngành.",
  lede: "Gửi các yêu cầu và những lựa chọn bạn đang cân nhắc: sản phẩm, nhà cung cấp, khách sạn, gói dịch vụ. Với từng lựa chọn, Pulse trả lời đạt, không đạt hoặc không đủ thông tin, kèm điều còn thiếu. Claude, ChatGPT, Claude Code và mã của bạn đều gọi được. Mã phía client là mã nguồn mở; bộ máy ra quyết định là Pulse API.",

  chainBlock: {
    eyebrow: "Vì sao mở",
    heading: 'Một tác tử biết nói "bằng chứng không cho biết" sẽ thôi đoán.',
    body: "Mô hình ngôn ngữ được tạo ra để trả lời. Pulse cho chúng một câu trả lời thứ ba ngoài có và không, dựa trên những gì từng lựa chọn thực sự ghi.",
  },

  situation: {
    heading: "Cái gì mở, và cái gì không.",
    body: [
      "Mở: máy chủ MCP đưa phán quyết của Pulse tới các tác tử AI và tìm trong tài liệu, SDK cho trình duyệt, các ví dụ chạy được, và khi phát hành, bộ phân tích câu yêu cầu cùng các định dạng chung cho yêu cầu và bằng chứng.",
      "Không mở: chính bộ máy ra quyết định, và trong thương mại, phần tính toán bản sửa hay khuyến mãi nào đáng chi phí. Những phần đó chạy sau API, vì đó là công việc khách hàng trả tiền.",
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
        body: "npm install @thepulseapi/sdk cho website, hoặc npx -y @thepulseapi/mcp cho tác tử AI.",
      },
      {
        n: "02",
        meta: "Đọc",
        title: "Đọc mã nguồn",
        body: "Cả hai gói nằm trong một kho công khai, mypulseapi/open-pulse trên GitHub.",
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
        title: "@thepulseapi/mcp: đã phát hành",
        body: "Máy chủ MCP cho Claude, Cursor, Codex và các tác tử khác: phán quyết cho mọi lựa chọn khi có khóa, và tài liệu khi không có. MIT, phiên bản 0.2.0 trên npm.",
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
      a: "Trong một kho công khai, mypulseapi/open-pulse trên GitHub, và trên npm dưới @thepulseapi.",
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
    title: "Cho tác tử của bạn một quyết định có căn cứ.",
    body: "Thêm máy chủ MCP vào tác tử, hoặc gọi API từ mã của bạn. Kho mã có ví dụ chạy được cho cả hai.",
    label: "Đọc tài liệu cho lập trình viên",
    href: "https://developer.thepulseapi.com/vi/opensource",
    note: "Câu hỏi về đóng góp: mở issue trên GitHub.",
  },
};

export const opensource = (l: string) =>
  byLocale({ en: OPENSOURCE, vi: OPENSOURCE_VI }, l);
