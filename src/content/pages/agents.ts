import { Scale, CircleHelp, ListChecks, Plug, ShieldCheck } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/**
 * The four "For AI agents" pages. ODIN/strategy/OPEN-SOURCE.md §0: PULSE is a domain-free decision
 * call that agents use, and these pages say what it does for each kind of agent.
 *
 * Every example is something `POST /decide` does today; the supplier and hotel cases are the ones
 * verified against the decision code in github.com/mypulseapi/open-pulse/examples. What is shared
 * (how it works, the limits, two FAQs) is written once below. No result is claimed.
 */
export const AGENT_SLUGS = [
  "shopping-assistants",
  "procurement",
  "travel",
  "coding-agents",
] as const;
export type AgentSlug = (typeof AGENT_SLUGS)[number];

type Specific = Pick<
  StoryContent,
  "meta" | "eyebrow" | "title" | "lede" | "situation" | "beforeAfter"
> & {
  example: string;
  faq: StoryContent["faq"];
};

const SHARED_EN = {
  steps: {
    heading: "How does it work?",
    intro: "One call, from MCP or HTTP. Nothing to train, nothing stored.",
    items: [
      {
        n: "01",
        meta: "Ask",
        title: "State what is needed",
        body: "As requirements such as "voltage = 24V", or in plain words; a budget in the words becomes a price requirement.",
      },
      {
        n: "02",
        meta: "Send",
        title: "Pass the options",
        body: "Up to 50 at a time, with whatever fields and text you have. A stated field always wins over text read off a page.",
      },
      {
        n: "03",
        meta: "Answer",
        title: "Answer from the verdicts",
        body: "Each option comes back fits, fails or cannot tell, with the attributes that are missing. The agent says what the evidence shows, and only that.",
      },
    ],
  },
  gets: (example: string): StoryContent["gets"] => ({
    heading: "What the agent gets",
    items: [
      {
        icon: Scale,
        title: "A verdict per option",
        body: "Fits, fails or cannot tell, for every requirement, with the value and where it came from.",
      },
      {
        icon: CircleHelp,
        title: '"The evidence does not say"',
        body: "A first-class answer instead of a guess, with the missing attributes named.",
      },
      {
        icon: ListChecks,
        title: "A to-do for the owner",
        body: "Every unknown is exactly what the option's owner should publish next.",
      },
      {
        icon: Plug,
        title: "MCP or HTTP",
        body: "The open-source MCP server for agents, or one HTTP call from your own code.",
      },
      { icon: ShieldCheck, title: "A worked example", body: example },
    ],
  }),
  limits: {
    heading: "What it will and will not do",
    will: [
      "Give each option a verdict per requirement, grounded in its own evidence",
      "Name what is missing instead of guessing it",
      "Work in any domain whose options carry structured attributes",
      "Answer the same input the same way every time",
    ],
    wont: [
      "State an attribute the evidence never stated",
      "Read facts out of free text outside laptops yet; send the fields instead",
      "Make decisions about people, such as hiring or lending",
      "Promise a business result. Nothing has been measured on your data",
    ],
  },
  faq: [
    {
      q: "Which agents can use it?",
      a: "Claude Code, Claude Desktop, Cursor and Codex through the open-source MCP server, which runs on your machine, and any agent or program that can make an HTTP call. ChatGPT's web app needs a remote MCP server, which is planned.",
    },
    {
      q: "Is it a model?",
      a: "No. It applies rules to the evidence each option states, so the same input always gives the same verdict, and every verdict shows its source.",
    },
  ],
  cta: {
    title: "Add it to your agent.",
    body: "Install the MCP server with one line, or call the API from your code. The open-source repository has runnable examples.",
    label: "Open source",
    href: "/opensource",
    note: "An API key comes from the Pulse dashboard.",
  },
};

const SHARED_VI = {
  steps: {
    heading: "Nó hoạt động thế nào?",
    intro:
      "Một lệnh gọi, qua MCP hoặc HTTP. Không cần huấn luyện, không lưu gì.",
    items: [
      {
        n: "01",
        meta: "Hỏi",
        title: "Nêu điều cần có",
        body: "Dưới dạng yêu cầu như "voltage = 24V", hoặc bằng lời thường; ngân sách trong câu sẽ thành yêu cầu về giá.",
      },
      {
        n: "02",
        meta: "Gửi",
        title: "Đưa các lựa chọn",
        body: "Tối đa 50 lựa chọn mỗi lần, kèm mọi trường và văn bản bạn có. Một trường đã ghi luôn thắng văn bản đọc từ trang.",
      },
      {
        n: "03",
        meta: "Trả lời",
        title: "Trả lời theo phán quyết",
        body: "Mỗi lựa chọn trả về đạt, không đạt hoặc không đủ thông tin, kèm các thuộc tính còn thiếu. Tác tử nói đúng điều bằng chứng cho thấy, và chỉ điều đó.",
      },
    ],
  },
  gets: (example: string): StoryContent["gets"] => ({
    heading: "Tác tử nhận được gì",
    items: [
      {
        icon: Scale,
        title: "Một phán quyết cho mỗi lựa chọn",
        body: "Đạt, không đạt hoặc không đủ thông tin, cho từng yêu cầu, kèm giá trị và nguồn của nó.",
      },
      {
        icon: CircleHelp,
        title: '"Bằng chứng không cho biết"',
        body: "Một câu trả lời chính thức thay cho phỏng đoán, kèm tên các thuộc tính còn thiếu.",
      },
      {
        icon: ListChecks,
        title: "Việc cần làm cho chủ lựa chọn",
        body: "Mỗi điều chưa biết chính là thông tin chủ lựa chọn nên công bố tiếp theo.",
      },
      {
        icon: Plug,
        title: "MCP hoặc HTTP",
        body: "Máy chủ MCP mã nguồn mở cho tác tử, hoặc một lệnh gọi HTTP từ mã của bạn.",
      },
      { icon: ShieldCheck, title: "Một ví dụ cụ thể", body: example },
    ],
  }),
  limits: {
    heading: "Nó sẽ làm và sẽ không làm gì",
    will: [
      "Đưa phán quyết cho từng lựa chọn theo từng yêu cầu, dựa trên chính bằng chứng của nó",
      "Nêu rõ điều còn thiếu thay vì đoán",
      "Dùng được trong mọi lĩnh vực mà các lựa chọn có thuộc tính có cấu trúc",
      "Trả lời cùng một đầu vào theo cùng một cách mọi lúc",
    ],
    wont: [
      "Nêu một thuộc tính mà bằng chứng chưa từng ghi",
      "Đọc dữ kiện từ văn bản tự do ngoài laptop lúc này; hãy gửi các trường thay thế",
      "Ra quyết định về con người, như tuyển dụng hay cho vay",
      "Hứa một kết quả kinh doanh. Chưa có gì được đo trên dữ liệu của bạn",
    ],
  },
  faq: [
    {
      q: "Những tác tử nào dùng được?",
      a: "Claude Code, Claude Desktop, Cursor và Codex qua máy chủ MCP mã nguồn mở chạy trên máy bạn, và mọi tác tử hay chương trình gọi được HTTP. Ứng dụng web ChatGPT cần máy chủ MCP từ xa, việc này đang được lên kế hoạch.",
    },
    {
      q: "Đây có phải là một mô hình không?",
      a: "Không. Nó áp dụng quy tắc lên bằng chứng mà từng lựa chọn ghi, nên cùng một đầu vào luôn cho cùng một phán quyết, và mỗi phán quyết đều cho thấy nguồn của nó.",
    },
  ],
  cta: {
    title: "Thêm vào tác tử của bạn.",
    body: "Cài máy chủ MCP bằng một dòng, hoặc gọi API từ mã của bạn. Kho mã nguồn mở có ví dụ chạy được.",
    label: "Mã nguồn mở",
    href: "/opensource",
    note: "Khóa API lấy từ bảng điều khiển Pulse.",
  },
};

const EN: Record<AgentSlug, Specific> = {
  "shopping-assistants": {
    meta: {
      title: "Pulse for shopping assistants",
      description:
        "Let a shopping assistant recommend only what a listing proves: fits, fails or cannot tell for each product, with the missing facts named instead of guessed.",
    },
    eyebrow: "For AI agents",
    title: "A shopping assistant that never invents a spec.",
    lede: "Your assistant knows what the shopper asked for. Pulse tells it which products the listings prove fit, which fail, and which say nothing, so it recommends from evidence and says plainly what it cannot tell.",
    situation: {
      heading: "Assistants are built to answer.",
      body: [
        'Ask a language model which laptop has 16GB of RAM and it will pick one, even when the listing never stated the memory. The shopper buys on that answer, and the return reason says "not as described".',
      ],
      pull: '"The listing does not say" is a better answer than a confident guess.',
    },
    beforeAfter: {
      heading: "Before and after",
      before: {
        label: "Without Pulse",
        items: [
          "Recommends from what it thinks it read",
          "Fills unstated specs with likely values",
          "Drops products it is unsure about, silently",
        ],
      },
      after: {
        label: "With Pulse",
        items: [
          "Recommends only what the listing proves",
          "Says which spec the listing leaves out",
          "Keeps every product, with its verdict",
        ],
      },
    },
    example:
      '"Laptop under $1,500 with 16GB RAM": one fits, one fails on price, one cannot tell because its listing never states the RAM.',
    faq: [
      {
        q: "Does it rank products for the shopper?",
        a: "Not this call: it decides eligibility, requirement by requirement. Ranking a storefront for the live session is the Pulse SDK and Decision API.",
      },
    ],
  },
  procurement: {
    meta: {
      title: "Pulse for procurement agents",
      description:
        "Check every supplier and part against the spec: fits, fails or cannot tell for each requirement, with the missing datasheet fields named for follow-up.",
    },
    eyebrow: "For AI agents",
    title: "A procurement agent that checks the spec, not the brochure.",
    lede: "Give the agent the spec and the candidate suppliers or parts. Pulse returns, for each one, which requirements its data meets, which it fails, and which it leaves blank, so the shortlist is defensible and the follow-up questions write themselves.",
    situation: {
      heading: "A missing rating is not a pass.",
      body: [
        "Supplier data is uneven: one datasheet states the IP rating, another omits it. An agent that treats a blank as a yes puts the wrong part on a purchase order.",
      ],
      pull: "A blank field is a question for the supplier, not an answer.",
    },
    beforeAfter: {
      heading: "Before and after",
      before: {
        label: "Without Pulse",
        items: [
          "Treats missing ratings as acceptable",
          "Shortlists from the most confident text",
          "No record of why a supplier was chosen",
        ],
      },
      after: {
        label: "With Pulse",
        items: [
          "Fails or flags every unmet requirement",
          "Names the fields to request from each supplier",
          "Every verdict shows its source",
        ],
      },
    },
    example:
      "Spec IP67, 24V, delivery within 14 days: Acme fits, Borealis fails on IP rating, Corvid fails on lead time and leaves its IP rating unstated.",
    faq: [
      {
        q: "Does it work with our own supplier fields?",
        a: "Yes. Send any attribute names and values; numbers compare as numbers and text compares without case.",
      },
    ],
  },
  travel: {
    meta: {
      title: "Pulse for travel and booking agents",
      description:
        "Match hotels, fares and plans to what the traveller needs: fits, fails or cannot tell for every option, with the missing details named instead of assumed.",
    },
    eyebrow: "For AI agents",
    title: "A booking agent that knows what the listing actually includes.",
    lede: '"Near the venue, breakfast included, under $180." Pulse checks every hotel, fare or plan against those needs and tells the agent which fit, which do not, and which listings never say, before anyone books.',
    situation: {
      heading: "Assumptions are expensive after check-in.",
      body: [
        "A listing that does not mention breakfast does not include it by default. An agent that assumes it will earn a complaint, a refund request, or both.",
      ],
      pull: "If the listing does not say, the traveller deserves to know before booking.",
    },
    beforeAfter: {
      heading: "Before and after",
      before: {
        label: "Without Pulse",
        items: [
          "Assumes common amenities",
          "Mixes budget and must-haves loosely",
          "Hides options it cannot judge",
        ],
      },
      after: {
        label: "With Pulse",
        items: [
          "Confirms each need against the listing",
          "Applies the budget as a hard requirement",
          "Shows the options it cannot judge, and why",
        ],
      },
    },
    example:
      '"Hotel near the venue under $180" with breakfast required: Harbour fits, Summit fails on price, Lotus cannot tell because it never states breakfast.',
    faq: [
      {
        q: "Can it read the budget from the traveller's words?",
        a: 'Yes. A budget in the request, such as "under $180", becomes a price requirement on its own.',
      },
    ],
  },
  "coding-agents": {
    meta: {
      title: "Pulse for coding agents: Claude Code, Cursor, Codex",
      description:
        "Give Claude Code, Cursor or Codex the Pulse MCP server: it reads current Pulse docs instead of recalling endpoints, and calls the decision API as it builds.",
    },
    eyebrow: "For AI agents",
    title: "Coding agents that build on Pulse without guessing the API.",
    lede: "Add the open-source MCP server to Claude Code, Cursor or Codex. The agent searches the current Pulse documentation instead of recalling an endpoint that may not exist, and wires the decision call into whatever it is building.",
    situation: {
      heading: "Coding agents remember APIs that changed.",
      body: [
        "An agent writing an integration from memory invents parameters and endpoints. With the docs one tool call away, it quotes the current reference instead.",
      ],
      pull: "The docs, not the agent's memory, are the source of truth.",
    },
    beforeAfter: {
      heading: "Before and after",
      before: {
        label: "Without the MCP server",
        items: [
          "Recalls endpoints from training data",
          "Guesses request shapes",
          "Leaves you to check every call",
        ],
      },
      after: {
        label: "With the MCP server",
        items: [
          "Searches the current docs and cites them",
          "Copies request shapes from the reference",
          "Can call the decision API with your key",
        ],
      },
    },
    example:
      "In Claude Code: claude mcp add pulse -- npx -y @thepulseapi/mcp. The agent gets four tools: search_docs, get_page, list_pages and resolve_products.",
    faq: [
      {
        q: "Does the MCP server send my code anywhere?",
        a: "The documentation tools run on your machine and send nothing about your prompts or code. resolve_products sends only its own input to the Pulse API, and only once you set a key.",
      },
    ],
  },
};

const VI: Record<AgentSlug, Specific> = {
  "shopping-assistants": {
    meta: {
      title: "Pulse cho trợ lý mua sắm",
      description:
        "Để trợ lý mua sắm chỉ đề xuất điều trang sản phẩm chứng minh: đạt, không đạt hoặc không đủ thông tin cho từng sản phẩm, kèm điều còn thiếu thay vì đoán.",
    },
    eyebrow: "Cho tác tử AI",
    title: "Một trợ lý mua sắm không bao giờ bịa thông số.",
    lede: "Trợ lý của bạn biết người mua đã hỏi gì. Pulse cho nó biết sản phẩm nào trang sản phẩm chứng minh là đạt, sản phẩm nào không, và sản phẩm nào không nói gì, để nó đề xuất dựa trên bằng chứng và nói rõ điều nó không biết.",
    situation: {
      heading: "Trợ lý được tạo ra để trả lời.",
      body: [
        'Hỏi một mô hình ngôn ngữ laptop nào có 16GB RAM và nó sẽ chọn một chiếc, kể cả khi trang sản phẩm chưa từng ghi bộ nhớ. Người mua mua theo câu trả lời đó, và lý do trả hàng là "không giống mô tả".',
      ],
      pull: '"Trang sản phẩm không ghi" là câu trả lời tốt hơn một phỏng đoán tự tin.',
    },
    beforeAfter: {
      heading: "Trước và sau",
      before: {
        label: "Không có Pulse",
        items: [
          "Đề xuất theo điều nó tưởng đã đọc",
          "Điền thông số chưa ghi bằng giá trị có vẻ hợp lý",
          "Âm thầm bỏ những sản phẩm nó không chắc",
        ],
      },
      after: {
        label: "Có Pulse",
        items: [
          "Chỉ đề xuất điều trang sản phẩm chứng minh",
          "Nói rõ thông số nào trang sản phẩm bỏ trống",
          "Giữ mọi sản phẩm, kèm phán quyết của nó",
        ],
      },
    },
    example:
      '"Laptop dưới 1.500 USD có 16GB RAM": một chiếc đạt, một chiếc không đạt vì giá, một chiếc không đủ thông tin vì trang không ghi RAM.',
    faq: [
      {
        q: "Nó có xếp hạng sản phẩm cho người mua không?",
        a: "Lệnh gọi này thì không: nó quyết định tính phù hợp theo từng yêu cầu. Xếp hạng cửa hàng theo phiên truy cập là việc của Pulse SDK và Decision API.",
      },
    ],
  },
  procurement: {
    meta: {
      title: "Pulse cho tác tử mua hàng",
      description:
        "Kiểm tra mọi nhà cung cấp và linh kiện theo thông số: đạt, không đạt hoặc không đủ thông tin cho từng yêu cầu, kèm các trường còn thiếu trong bảng thông số.",
    },
    eyebrow: "Cho tác tử AI",
    title: "Một tác tử mua hàng kiểm tra thông số, không phải tờ quảng cáo.",
    lede: "Đưa cho tác tử thông số và các nhà cung cấp hay linh kiện ứng viên. Pulse trả về, cho từng ứng viên, yêu cầu nào dữ liệu đáp ứng, yêu cầu nào không, và yêu cầu nào bỏ trống, để danh sách rút gọn có căn cứ và câu hỏi cần hỏi tự hiện ra.",
    situation: {
      heading: "Một chỉ số bị thiếu không phải là đạt.",
      body: [
        "Dữ liệu nhà cung cấp không đồng đều: bảng thông số này ghi chỉ số IP, bảng kia bỏ qua. Một tác tử coi ô trống là có sẽ đưa nhầm linh kiện vào đơn mua hàng.",
      ],
      pull: "Một ô trống là câu hỏi cho nhà cung cấp, không phải câu trả lời.",
    },
    beforeAfter: {
      heading: "Trước và sau",
      before: {
        label: "Không có Pulse",
        items: [
          "Coi chỉ số bị thiếu là chấp nhận được",
          "Rút gọn theo văn bản tự tin nhất",
          "Không có ghi chép vì sao chọn nhà cung cấp",
        ],
      },
      after: {
        label: "Có Pulse",
        items: [
          "Đánh không đạt hoặc gắn cờ mọi yêu cầu chưa đáp ứng",
          "Nêu các trường cần hỏi từng nhà cung cấp",
          "Mỗi phán quyết đều cho thấy nguồn",
        ],
      },
    },
    example:
      "Thông số IP67, 24V, giao trong 14 ngày: Acme đạt, Borealis không đạt vì chỉ số IP, Corvid không đạt vì thời gian giao và không ghi chỉ số IP.",
    faq: [
      {
        q: "Nó có dùng được với các trường nhà cung cấp của chúng tôi không?",
        a: "Có. Gửi bất kỳ tên và giá trị thuộc tính nào; số được so như số và chữ được so không phân biệt hoa thường.",
      },
    ],
  },
  travel: {
    meta: {
      title: "Pulse cho tác tử du lịch và đặt chỗ",
      description:
        "Khớp khách sạn, vé và gói dịch vụ với điều khách cần: đạt, không đạt hoặc không đủ thông tin cho từng lựa chọn, kèm chi tiết còn thiếu thay vì giả định.",
    },
    eyebrow: "Cho tác tử AI",
    title: "Một tác tử đặt chỗ biết chính xác trang mô tả có gì.",
    lede: '"Gần địa điểm sự kiện, có bữa sáng, dưới 180 USD." Pulse kiểm tra mọi khách sạn, vé hay gói dịch vụ theo các nhu cầu đó và cho tác tử biết lựa chọn nào đạt, lựa chọn nào không, và trang nào không nói, trước khi ai đó đặt.',
    situation: {
      heading: "Giả định trở nên đắt đỏ sau khi nhận phòng.",
      body: [
        "Một trang không nhắc đến bữa sáng thì mặc định không bao gồm. Một tác tử giả định là có sẽ nhận về khiếu nại, yêu cầu hoàn tiền, hoặc cả hai.",
      ],
      pull: "Nếu trang không nói, khách xứng đáng được biết trước khi đặt.",
    },
    beforeAfter: {
      heading: "Trước và sau",
      before: {
        label: "Không có Pulse",
        items: [
          "Giả định các tiện nghi phổ biến",
          "Trộn lẫn ngân sách và điều bắt buộc",
          "Giấu những lựa chọn nó không đánh giá được",
        ],
      },
      after: {
        label: "Có Pulse",
        items: [
          "Xác nhận từng nhu cầu theo trang mô tả",
          "Áp ngân sách như một yêu cầu bắt buộc",
          "Hiện những lựa chọn không đánh giá được, và lý do",
        ],
      },
    },
    example:
      '"Khách sạn gần địa điểm dưới 180 USD" và bắt buộc có bữa sáng: Harbour đạt, Summit không đạt vì giá, Lotus không đủ thông tin vì không ghi bữa sáng.',
    faq: [
      {
        q: "Nó có đọc được ngân sách từ lời của khách không?",
        a: 'Có. Một ngân sách trong yêu cầu, như "dưới 180 USD", tự trở thành yêu cầu về giá.',
      },
    ],
  },
  "coding-agents": {
    meta: {
      title: "Pulse cho tác tử lập trình như Claude Code",
      description:
        "Cho Claude Code, Cursor hay Codex máy chủ MCP của Pulse: nó đọc tài liệu Pulse mới nhất thay vì nhớ endpoint, và gọi API quyết định trong thứ nó xây.",
    },
    eyebrow: "Cho tác tử AI",
    title: "Tác tử lập trình xây trên Pulse mà không phải đoán API.",
    lede: "Thêm máy chủ MCP mã nguồn mở vào Claude Code, Cursor hay Codex. Tác tử tìm trong tài liệu Pulse mới nhất thay vì nhớ một endpoint có thể không tồn tại, và đưa lệnh gọi quyết định vào bất cứ thứ gì nó đang xây.",
    situation: {
      heading: "Tác tử lập trình nhớ những API đã thay đổi.",
      body: [
        "Một tác tử viết tích hợp từ trí nhớ sẽ bịa tham số và endpoint. Khi tài liệu chỉ cách một lệnh gọi công cụ, nó trích dẫn tài liệu tham khảo hiện tại.",
      ],
      pull: "Tài liệu, không phải trí nhớ của tác tử, mới là nguồn sự thật.",
    },
    beforeAfter: {
      heading: "Trước và sau",
      before: {
        label: "Không có máy chủ MCP",
        items: [
          "Nhớ endpoint từ dữ liệu huấn luyện",
          "Đoán cấu trúc yêu cầu",
          "Để bạn tự kiểm tra từng lệnh gọi",
        ],
      },
      after: {
        label: "Có máy chủ MCP",
        items: [
          "Tìm trong tài liệu mới nhất và trích dẫn",
          "Chép cấu trúc yêu cầu từ tài liệu tham khảo",
          "Gọi được API quyết định bằng khóa của bạn",
        ],
      },
    },
    example:
      "Trong Claude Code: claude mcp add pulse -- npx -y @thepulseapi/mcp. Tác tử có bốn công cụ: search_docs, get_page, list_pages và resolve_products.",
    faq: [
      {
        q: "Máy chủ MCP có gửi mã của tôi đi đâu không?",
        a: "Các công cụ tài liệu chạy trên máy bạn và không gửi gì về câu lệnh hay mã của bạn. resolve_products chỉ gửi chính dữ liệu đầu vào của nó tới Pulse API, và chỉ khi bạn đã đặt khóa.",
      },
    ],
  },
};

function build(s: Specific, shared: typeof SHARED_EN): StoryContent {
  return {
    meta: s.meta,
    eyebrow: s.eyebrow,
    title: s.title,
    lede: s.lede,
    situation: s.situation,
    beforeAfter: s.beforeAfter,
    steps: shared.steps,
    gets: shared.gets(s.example),
    limits: shared.limits,
    faq: [...s.faq, ...shared.faq],
    cta: shared.cta,
  };
}

export const agentPage = (locale: string, slug: AgentSlug): StoryContent =>
  locale === "vi" ? build(VI[slug], SHARED_VI) : build(EN[slug], SHARED_EN);
