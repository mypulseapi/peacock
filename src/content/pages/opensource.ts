import { byLocale } from "@/content/locale";

/**
 * Open Pulse, the open-source page. Copy from the dev's brief (OPEN-PULSE-WEBSITE-CONTENT.md,
 * 2026-10-26), cut to what is true today.
 *
 * Checked against the repositories the same day: github.com/mypulseapi/open-pulse ships the browser
 * SDK and the MCP server (both 0.2.0 on npm, MIT), examples, AGENTS.md, CONTRIBUTING.md and CLA.md.
 * `/decide` in rainbow returns meets, fails, unknown or conflicting per requirement and fits, fails or
 * cannot_tell overall (road-runner inference/decide.ts). Everything else in the brief, the evidence
 * states, the repair vocabulary, category packs, schemas, validators and connectors, is not built,
 * so it carries "Planned" and is never described as released. No competitor named, no stars, counts,
 * customers or lift (hires/07-WHAT-WE-DO-NOT-CLAIM.md).
 */
export type Status = "available" | "planned" | "illustrative";

export interface OpensourceContent {
  meta: { title: string; description: string };
  status: Record<Status, string>;
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    supporting: string;
  };
  why: {
    heading: string;
    knowsLabel: string;
    knows: string[];
    asksLabel: string;
    asks: string[];
    close: string;
  };
  model: {
    heading: string;
    steps: { name: string; body: string }[];
    note: string;
    research: string;
    researchLink: string;
  };
  agent: {
    heading: string;
    intro: string;
    user: string;
    userLabel: string;
    agentLabel: string;
    reply: string;
    output: string;
    caption: string;
  };
  honesty: {
    abstainHeading: string;
    abstainBody: string[];
    factsHeading: string;
    canLabel: string;
    can: string[];
    neverLabel: string;
    never: string[];
    rule: string;
  };
  states: {
    heading: string;
    intro: string;
    items: { name: string; body: string }[];
  };
  repairs: {
    heading: string;
    intro: string;
    items: { name: string; body: string }[];
    close: string;
  };
  boundary: {
    heading: string;
    openLabel: string;
    open: { name: string; status: Status }[];
    paidLabel: string;
    paid: string[];
    pull: string;
  };
  packs: {
    heading: string;
    intro: string;
    example: string;
    questionsLabel: string;
    questions: string[];
  };
  contribute: {
    heading: string;
    intro: string;
    ways: { name: string; body: string }[];
    expertsHeading: string;
    expertsBody: string;
    agentsHeading: string;
    agentsBody: string;
    loop: string[];
    terms: string;
  };
  audiences: { heading: string; items: { name: string; body: string }[] };
  not: { heading: string; items: string[]; close: string };
  principles: { heading: string; items: { name: string; body: string }[] };
  faq: { q: string; a: string }[];
  faqHeading: string;
  cta: {
    title: string;
    body: string;
    github: string;
    contribute: string;
    audit: string;
    supporting: string;
  };
}

export const GITHUB = "https://github.com/mypulseapi/open-pulse";
export const GITHUB_ISSUE =
  "https://github.com/mypulseapi/open-pulse/issues/new";
export const DOCS = "https://developer.thepulseapi.com/opensource";

const PACK = `category: furniture.sofa
requirements:
  - id: delivery_clearance
    question: "Can it reach the room?"
    evidence: [package_width, package_height, removable_legs]
  - id: room_fit
    question: "Will it fit in the room?"
    evidence: [width, depth, height]`;

const EN: OpensourceContent = {
  meta: {
    title: "Open Pulse: open decision evidence for AI agents",
    description:
      "Open Pulse is the MIT-licensed foundation for decision evidence AI agents can inspect instead of guess. See what is released, what is planned and how to help.",
  },
  status: {
    available: "Available now",
    planned: "Planned",
    illustrative: "Illustrative",
  },
  hero: {
    eyebrow: "Opensource",
    title: "Teach software and AI agents what evidence a decision needs.",
    lede: "Product data serves databases, feeds and storefronts. AI agents need more: buyer intent, required evidence, product facts and unresolved gaps. Open Pulse provides the open foundation; the Pulse API powers the decisions.",
    primary: "Explore Open Pulse on GitHub",
    secondary: "Read the developer docs",
    supporting:
      "MIT licensed. For developers, merchants, researchers and AI agents, in any industry where options have attributes.",
  },
  why: {
    heading:
      "Commerce has plenty of product data. It has very little decision data.",
    knowsLabel: "What a catalogue knows",
    knows: [
      "Title",
      "Brand",
      "Price",
      "Colour",
      "Category",
      "Description",
      "Images",
    ],
    asksLabel: "What a buyer is trying to answer",
    asks: [
      "Will this sofa fit through my doorway?",
      "Is this charger compatible with my laptop?",
      "Will this laptop handle video editing?",
      "What is actually in the box?",
      "Is the warranty valid where I live?",
    ],
    close:
      "Those are decision requirements, not search queries. When the evidence for one is missing, buried or contradictory, neither a shopper nor an agent can resolve the decision.",
  },
  model: {
    heading:
      "A product record says what is stored. Decision evidence says what can be decided.",
    steps: [
      { name: "Requirement", body: "What needs to be known." },
      {
        name: "Product evidence",
        body: "The facts recorded, and where each came from.",
      },
      {
        name: "Visible evidence",
        body: "What a shopper or an agent can actually see.",
      },
      { name: "Decision", body: "Whether the evidence is enough." },
      { name: "Outcome", body: "What happened afterwards." },
    ],
    note: "A product can have data and still have an evidence problem: a fact in the supplier feed that never reaches the page, a specification stated twice with two values, a photograph that hides the feature that matters.",
    research:
      "On our own 2,176-product demonstration catalogue, 52.6% of recorded values repeat what the photograph already shows.",
    researchLink: "See the research",
  },
  agent: {
    heading: "An agent should be able to say “the evidence does not say”.",
    intro:
      "Language models are built to answer. Pulse gives them a third answer besides yes and no, grounded in what each option actually states.",
    userLabel: "Shopper",
    user: "Will this sofa fit through my 78 cm doorway?",
    agentLabel: "Agent",
    reply:
      "The listing gives the assembled width, but not the package width, so I can't confirm it fits through the door. The seller would need to publish the package size.",
    output: `requirement  width <= 300 cm          meets
requirement  package_width <= 78 cm   unknown
verdict      cannot_tell
missing      package_width`,
    caption:
      "POST /decide and the MCP tool resolve_products return meets, fails, unknown or conflicting for each requirement, and fits, fails or cannot_tell overall.",
  },
  honesty: {
    abstainHeading: "Abstention is a feature.",
    abstainBody: [
      "Most product systems are built to return something. A decision system sometimes has to return: not enough evidence.",
      "If the package size is not recorded, an agent should not infer from the assembled width that a sofa fits through a door. If two sources disagree about capacity, the conflict stays visible until someone resolves it.",
    ],
    factsHeading:
      "AI may improve the presentation. It must not invent the product.",
    canLabel: "AI can help",
    can: [
      "Restructure verified specifications",
      "Summarise verified evidence",
      "Draw diagrams from verified dimensions",
      "Explain why the evidence supports a decision",
    ],
    neverLabel: "It must never invent",
    never: [
      "Dimensions or capacity",
      "Materials or certifications",
      "Compatibility",
      "What is in the box, or warranty terms",
    ],
    rule: "Generate presentation. Never generate an unverified product fact.",
  },
  states: {
    heading: "Name the evidence problem precisely.",
    intro:
      "Planned, as part of the shared evidence formats. Six states say more than calling every problem missing data.",
    items: [
      { name: "Missing", body: "The evidence is not recorded." },
      {
        name: "Buried",
        body: "It exists, but is hard for a shopper or agent to find.",
      },
      {
        name: "Invisible",
        body: "It is known internally, but not shown where the decision is made.",
      },
      {
        name: "Unresolved",
        body: "Some information exists, but not enough to answer.",
      },
      { name: "Conflicting", body: "The sources disagree." },
      {
        name: "Not observable",
        body: "The available evidence cannot answer it.",
      },
    ],
  },
  repairs: {
    heading: "Describe the repair the same way.",
    intro:
      "Planned, alongside the evidence states. Eight verbs cover what can be done about a gap.",
    items: [
      { name: "Record", body: "Capture a missing fact." },
      { name: "Show", body: "Expose evidence that already exists." },
      { name: "Reconcile", body: "Resolve sources that disagree." },
      { name: "Generate", body: "Present verified evidence better." },
      { name: "Ask", body: "Request it from the merchant, supplier or buyer." },
      { name: "Compute", body: "Derive it safely from verified inputs." },
      { name: "Abstain", body: "Do not answer without evidence." },
      {
        name: "Don't fix",
        body: "Accept that some gaps are not worth fixing.",
      },
    ],
    close:
      'The last two matter most. A trustworthy system has to be able to say "I don\'t know", and a sensible one has to be able to say "this is not worth fixing".',
  },
  boundary: {
    heading: "Open where sharing helps. Paid where outcomes create the value.",
    openLabel: "Open Pulse",
    open: [
      { name: "Browser SDK, @thepulseapi/sdk 0.2.0", status: "available" },
      {
        name: "MCP server for AI agents, @thepulseapi/mcp 0.2.0",
        status: "available",
      },
      { name: "Runnable examples and the agent guide", status: "available" },
      { name: "Requirement and evidence formats", status: "planned" },
      { name: "Evidence states and repair vocabulary", status: "planned" },
      { name: "Category packs", status: "planned" },
      {
        name: "Validators and connectors for platforms and PIMs",
        status: "planned",
      },
      { name: "Query parser and return-reason taxonomy", status: "planned" },
    ],
    paidLabel: "Pulse",
    paid: [
      "Decision Audit: which gap matters most",
      "Repair prioritisation and its economics",
      "Decision Verification: did the repair change anything",
      "Decision Monitor: did the evidence stay healthy",
      "Return Verification and Promotion Audit",
      "The Decision API in production",
      "Learning from measured outcomes",
    ],
    pull: "Open Pulse describes the evidence. Pulse decides what is worth doing about it.",
  },
  packs: {
    heading: "Teach the ecosystem how people decide in your category.",
    intro:
      "Planned. A category pack lists the requirements that matter for a kind of product and the evidence each one needs. A laptop, a sofa and a power adapter should not share one model.",
    example: PACK,
    questionsLabel: "A good pack answers",
    questions: [
      "What do buyers commonly decide?",
      "What evidence does each decision need, and which is mandatory?",
      "Where could that evidence come from, and can it be shown or computed?",
      "What should happen when it is not available?",
    ],
  },
  contribute: {
    heading: "You do not need to work on machine learning to contribute.",
    intro: "Useful contributions include:",
    ways: [
      {
        name: "Add a requirement",
        body: "A real buying question a category is missing.",
      },
      {
        name: "Improve the agent tooling",
        body: "Help agents query and read evidence safely.",
      },
      {
        name: "Add a connector",
        body: "Map a platform, PIM or feed into Open Pulse.",
      },
      { name: "Add examples", body: "Synthetic or safely shareable cases." },
      {
        name: "Improve the docs",
        body: "For developers, merchants and specialists.",
      },
      {
        name: "Report a wrong model",
        body: '"This is not how buyers choose this product" is a useful issue.',
      },
    ],
    expertsHeading: "Domain experts are contributors too.",
    expertsBody:
      "Someone who knows furniture, electronics, beauty or industrial parts may know more about the evidence a decision needs than the people writing the software. If you know the questions buyers keep asking, you can teach the ecosystem how that category is decided.",
    agentsHeading: "AI agents can propose, with review.",
    agentsBody:
      "An agent meets unanswered questions at scale. When one finds a requirement no model covers, it can propose it. People review it before it changes anything.",
    loop: [
      "A buyer asks",
      "The agent tries to decide",
      "A missing requirement turns up",
      "The agent proposes it",
      "People review it",
      "The open knowledge improves",
    ],
    terms:
      "Open an issue on GitHub first. Contribution terms are being finalised, and we will publish them before accepting larger changes.",
  },
  audiences: {
    heading: "Who Open Pulse is for",
    items: [
      {
        name: "Commerce developers",
        body: "Storefronts, PIM workflows and catalogue tools that understand decision evidence.",
      },
      {
        name: "AI agent developers",
        body: "Structured evidence, and a safe way to say what is unknown.",
      },
      {
        name: "Merchants and marketplaces",
        body: "Product data quality judged by decisions, not by full fields.",
      },
      {
        name: "PIM and catalogue teams",
        body: 'From "is the field filled?" to "can this evidence resolve the decision?"',
      },
      {
        name: "Researchers",
        body: "Buying requirements and evidence coverage, in reproducible structures.",
      },
      {
        name: "Domain experts",
        body: "The knowledge of what evidence matters in a category.",
      },
    ],
  },
  not: {
    heading: "What Open Pulse is not",
    items: [
      "A recommendation engine",
      "A product description or product fact generator",
      "A replacement for a PIM",
      "A cart, a payment protocol or a marketplace",
      "A promise that every missing field matters",
      "A system that answers when the evidence is not enough",
    ],
    close:
      "More product data is not automatically better product data. The goal is evidence that resolves real decisions.",
  },
  principles: {
    heading: "Our open-source principles",
    items: [
      {
        name: "Evidence before answers",
        body: "Know what supports a claim before presenting it as fact.",
      },
      {
        name: "Provenance matters",
        body: "Where evidence came from stays inspectable.",
      },
      {
        name: "Abstention is valid",
        body: "Not enough evidence beats a confident invention.",
      },
      {
        name: "Requirements before completeness",
        body: "A field matters because a decision needs it.",
      },
      {
        name: "Negative results belong in the record",
        body: "Failed experiments are information.",
      },
      {
        name: "People stay in the loop",
        body: "Agents can propose; people review.",
      },
      {
        name: "Open formats for interoperability",
        body: "Evidence understandable across systems, not locked into Pulse.",
      },
    ],
  },
  faqHeading: "Questions about Open Pulse",
  faq: [
    {
      q: "What is decision evidence?",
      a: "The facts a buyer needs to make a specific decision, together with where each fact came from and whether the buyer can actually see it. Product data says what is stored; decision evidence says what can be decided.",
    },
    {
      q: "Is Open Pulse the same as Pulse?",
      a: "No. Open Pulse is the open foundation: the SDK, the MCP server, examples, and as they are released, shared formats and category knowledge. Pulse is the paid platform that measures, prioritises, verifies and monitors, and runs the Decision API.",
    },
    {
      q: "Can AI agents use Open Pulse?",
      a: "Yes. The MCP server is available now: with an API key, an agent can ask which options meet a buyer's requirements and get fits, fails or cannot tell, with what is missing. Without a key, it can search our documentation.",
    },
    {
      q: "Can I use Open Pulse without the Pulse API?",
      a: "The SDK and the MCP server are MIT licensed and you can read, change and ship them. The decisions themselves come from the Pulse API, which needs a key. Planned formats and category packs will be usable on their own.",
    },
    {
      q: "Does Open Pulse generate missing product information?",
      a: "No. It never invents unverified facts. Missing dimensions, materials, compatibility, certifications or warranty terms stay unresolved until a trustworthy source provides them.",
    },
    {
      q: "Is Open Pulse a PIM?",
      a: "No. A PIM stores product information. Open Pulse is about the link between buying requirements and the evidence that resolves them, so it complements a PIM.",
    },
    {
      q: "What is a category pack?",
      a: "A planned format that lists the requirements that matter for one kind of product and the evidence each needs. Domain experts will be able to improve them through GitHub.",
    },
    {
      q: 'Why include "don\'t fix"?',
      a: "Because not every gap deserves engineering time or content spend. Open Pulse can describe a gap; Pulse helps decide whether fixing it is worth the cost.",
    },
  ],
  cta: {
    title: "Help build the evidence layer for AI commerce.",
    body: "Agents can search faster and compare more products than any person. They still need reliable evidence to know whether a product really meets the decision in front of them. That foundation should be open.",
    github: "Explore Open Pulse on GitHub",
    contribute: "Propose a category requirement",
    audit: "Run a free Decision Audit",
    supporting: "Open the language. Share the knowledge. Measure what matters.",
  },
};

const VI_PACK = PACK;

const VI: OpensourceContent = {
  meta: {
    title: "Open Pulse: bằng chứng quyết định mở cho tác tử AI",
    description:
      "Open Pulse là nền tảng mã nguồn mở MIT cho bằng chứng quyết định mà tác tử AI kiểm tra được thay vì đoán. Xem phần đã phát hành, phần dự kiến và cách đóng góp.",
  },
  status: { available: "Đã có", planned: "Dự kiến", illustrative: "Minh hoạ" },
  hero: {
    eyebrow: "Mã nguồn mở",
    title: "Dạy phần mềm và tác tử AI biết một quyết định cần bằng chứng gì.",
    lede: "Dữ liệu sản phẩm phục vụ cơ sở dữ liệu, nguồn cấp và cửa hàng. Tác tử AI cần nhiều hơn: ý định của người mua, bằng chứng cần có, thông tin sản phẩm và những khoảng trống chưa rõ. Open Pulse cung cấp nền tảng mở; Pulse API vận hành các quyết định.",
    primary: "Xem Open Pulse trên GitHub",
    secondary: "Đọc tài liệu cho lập trình viên",
    supporting:
      "Giấy phép MIT. Dành cho lập trình viên, người bán, nhà nghiên cứu và tác tử AI, trong mọi ngành mà các lựa chọn có thuộc tính.",
  },
  why: {
    heading:
      "Thương mại có rất nhiều dữ liệu sản phẩm, nhưng rất ít dữ liệu quyết định.",
    knowsLabel: "Danh mục biết gì",
    knows: [
      "Tiêu đề",
      "Thương hiệu",
      "Giá",
      "Màu sắc",
      "Ngành hàng",
      "Mô tả",
      "Hình ảnh",
    ],
    asksLabel: "Người mua đang muốn trả lời điều gì",
    asks: [
      "Chiếc sofa này có lọt qua cửa nhà tôi không?",
      "Bộ sạc này có tương thích với laptop của tôi không?",
      "Laptop này có dựng video được không?",
      "Trong hộp thực sự có những gì?",
      "Bảo hành có hiệu lực ở nơi tôi sống không?",
    ],
    close:
      "Đó là yêu cầu quyết định, không phải câu tìm kiếm. Khi bằng chứng cho một yêu cầu bị thiếu, bị khuất hoặc mâu thuẫn, cả người mua lẫn tác tử AI đều không thể ra quyết định chắc chắn.",
  },
  model: {
    heading:
      "Bản ghi sản phẩm cho biết những gì được lưu. Bằng chứng quyết định cho biết điều gì có thể quyết định.",
    steps: [
      { name: "Yêu cầu", body: "Điều cần biết." },
      {
        name: "Bằng chứng sản phẩm",
        body: "Các thông tin được ghi, và nguồn của từng thông tin.",
      },
      {
        name: "Bằng chứng nhìn thấy được",
        body: "Điều người mua hoặc tác tử thực sự thấy.",
      },
      { name: "Quyết định", body: "Bằng chứng có đủ hay không." },
      { name: "Kết quả", body: "Điều gì xảy ra sau đó." },
    ],
    note: "Một sản phẩm có thể có dữ liệu mà vẫn có vấn đề về bằng chứng: một thông tin nằm trong nguồn cấp của nhà cung cấp nhưng không bao giờ lên trang, một thông số ghi hai lần với hai giá trị, một bức ảnh che mất đúng đặc điểm quan trọng.",
    research:
      "Trên danh mục trình diễn 2.176 sản phẩm của chúng tôi, 52,6% giá trị được ghi lặp lại điều ảnh sản phẩm đã cho thấy.",
    researchLink: "Xem nghiên cứu",
  },
  agent: {
    heading: "Tác tử AI cần nói được “bằng chứng không cho biết”.",
    intro:
      "Mô hình ngôn ngữ được tạo ra để trả lời. Pulse cho chúng câu trả lời thứ ba ngoài có và không, dựa trên những gì từng lựa chọn thực sự ghi.",
    userLabel: "Người mua",
    user: "Chiếc sofa này có lọt qua cửa rộng 78 cm của tôi không?",
    agentLabel: "Tác tử",
    reply:
      "Trang sản phẩm ghi chiều rộng khi lắp ráp, nhưng không ghi chiều rộng kiện hàng, nên tôi không thể xác nhận nó lọt qua cửa. Người bán cần công bố kích thước kiện hàng.",
    output: `requirement  width <= 300 cm          meets
requirement  package_width <= 78 cm   unknown
verdict      cannot_tell
missing      package_width`,
    caption:
      "POST /decide và công cụ MCP resolve_products trả về meets, fails, unknown hoặc conflicting cho từng yêu cầu, và fits, fails hoặc cannot_tell cho tổng thể.",
  },
  honesty: {
    abstainHeading: "Không trả lời cũng là một tính năng.",
    abstainBody: [
      "Hầu hết hệ thống sản phẩm được tạo ra để luôn trả về một thứ gì đó. Một hệ thống ra quyết định đôi khi phải trả về: không đủ bằng chứng.",
      "Nếu kích thước kiện hàng không được ghi, tác tử không nên suy từ chiều rộng lắp ráp rằng sofa lọt qua cửa. Nếu hai nguồn ghi dung tích khác nhau, sự mâu thuẫn phải được giữ nguyên cho tới khi có người giải quyết.",
    ],
    factsHeading: "AI có thể trình bày tốt hơn. Nó không được bịa ra sản phẩm.",
    canLabel: "AI có thể giúp",
    can: [
      "Sắp xếp lại thông số đã xác minh",
      "Tóm tắt bằng chứng đã xác minh",
      "Vẽ sơ đồ từ kích thước đã xác minh",
      "Giải thích vì sao bằng chứng ủng hộ một quyết định",
    ],
    neverLabel: "Không bao giờ được bịa ra",
    never: [
      "Kích thước hoặc dung tích",
      "Chất liệu hoặc chứng nhận",
      "Khả năng tương thích",
      "Những gì có trong hộp, hoặc điều khoản bảo hành",
    ],
    rule: "Tạo ra cách trình bày. Không bao giờ tạo ra một thông tin sản phẩm chưa được xác minh.",
  },
  states: {
    heading: "Gọi đúng tên vấn đề về bằng chứng.",
    intro:
      "Dự kiến, thuộc các định dạng bằng chứng chung. Sáu trạng thái nói được nhiều hơn việc gọi mọi vấn đề là thiếu dữ liệu.",
    items: [
      { name: "Thiếu", body: "Bằng chứng không được ghi." },
      {
        name: "Bị khuất",
        body: "Có, nhưng người mua hoặc tác tử khó tìm thấy.",
      },
      {
        name: "Không hiển thị",
        body: "Nội bộ biết, nhưng không hiện ở nơi ra quyết định.",
      },
      {
        name: "Chưa rõ",
        body: "Có một ít thông tin, nhưng không đủ để trả lời.",
      },
      { name: "Mâu thuẫn", body: "Các nguồn ghi khác nhau." },
      {
        name: "Không quan sát được",
        body: "Bằng chứng hiện có không thể trả lời.",
      },
    ],
  },
  repairs: {
    heading: "Mô tả cách sửa theo cùng một cách.",
    intro:
      "Dự kiến, cùng với các trạng thái bằng chứng. Tám động từ bao quát những gì có thể làm với một khoảng trống.",
    items: [
      { name: "Ghi lại", body: "Bổ sung thông tin còn thiếu." },
      { name: "Hiển thị", body: "Đưa ra bằng chứng đã có sẵn." },
      { name: "Đối chiếu", body: "Giải quyết các nguồn mâu thuẫn." },
      { name: "Tạo", body: "Trình bày bằng chứng đã xác minh tốt hơn." },
      { name: "Hỏi", body: "Yêu cầu người bán, nhà cung cấp hoặc người mua." },
      { name: "Tính", body: "Suy ra an toàn từ dữ liệu đã xác minh." },
      { name: "Không trả lời", body: "Không trả lời khi thiếu bằng chứng." },
      {
        name: "Không sửa",
        body: "Chấp nhận có những khoảng trống không đáng sửa.",
      },
    ],
    close:
      'Hai động từ cuối là quan trọng nhất. Một hệ thống đáng tin phải nói được "tôi không biết", và một hệ thống hợp lý phải nói được "cái này không đáng sửa".',
  },
  boundary: {
    heading: "Mở ở nơi chia sẻ có ích. Trả phí ở nơi kết quả tạo ra giá trị.",
    openLabel: "Open Pulse",
    open: [
      {
        name: "SDK cho trình duyệt, @thepulseapi/sdk 0.2.0",
        status: "available",
      },
      {
        name: "Máy chủ MCP cho tác tử AI, @thepulseapi/mcp 0.2.0",
        status: "available",
      },
      { name: "Ví dụ chạy được và hướng dẫn cho tác tử", status: "available" },
      { name: "Định dạng yêu cầu và bằng chứng", status: "planned" },
      {
        name: "Trạng thái bằng chứng và bộ từ vựng sửa lỗi",
        status: "planned",
      },
      { name: "Gói ngành hàng", status: "planned" },
      { name: "Bộ kiểm tra và kết nối cho nền tảng và PIM", status: "planned" },
      {
        name: "Bộ phân tích truy vấn và phân loại lý do trả hàng",
        status: "planned",
      },
    ],
    paidLabel: "Pulse",
    paid: [
      "Decision Audit: khoảng trống nào quan trọng nhất",
      "Ưu tiên bản sửa và bài toán chi phí",
      "Decision Verification: bản sửa có thay đổi gì không",
      "Decision Monitor: bằng chứng có còn tốt không",
      "Return Verification và Promotion Audit",
      "Decision API khi vận hành thật",
      "Học từ kết quả đo được",
    ],
    pull: "Open Pulse mô tả bằng chứng. Pulse quyết định điều gì đáng làm với nó.",
  },
  packs: {
    heading:
      "Dạy hệ sinh thái cách mọi người quyết định trong ngành hàng của bạn.",
    intro:
      "Dự kiến. Một gói ngành hàng liệt kê các yêu cầu quan trọng với một loại sản phẩm và bằng chứng mỗi yêu cầu cần. Laptop, sofa và bộ sạc không nên dùng chung một mô hình.",
    example: VI_PACK,
    questionsLabel: "Một gói tốt trả lời được",
    questions: [
      "Người mua thường quyết định điều gì?",
      "Mỗi quyết định cần bằng chứng gì, và cái nào bắt buộc?",
      "Bằng chứng đó có thể đến từ đâu, có hiển thị hoặc tính được không?",
      "Nên làm gì khi không có bằng chứng?",
    ],
  },
  contribute: {
    heading: "Bạn không cần làm về học máy mới đóng góp được.",
    intro: "Những đóng góp hữu ích gồm:",
    ways: [
      {
        name: "Thêm một yêu cầu",
        body: "Một câu hỏi mua hàng có thật mà ngành hàng còn thiếu.",
      },
      {
        name: "Cải thiện công cụ cho tác tử",
        body: "Giúp tác tử truy vấn và đọc bằng chứng an toàn.",
      },
      {
        name: "Thêm một kết nối",
        body: "Ánh xạ một nền tảng, PIM hoặc nguồn cấp vào Open Pulse.",
      },
      {
        name: "Thêm ví dụ",
        body: "Dữ liệu tổng hợp hoặc chia sẻ an toàn được.",
      },
      {
        name: "Cải thiện tài liệu",
        body: "Cho lập trình viên, người bán và chuyên gia.",
      },
      {
        name: "Báo một mô hình sai",
        body: '"Người mua không chọn sản phẩm này như vậy" là một issue hữu ích.',
      },
    ],
    expertsHeading: "Chuyên gia ngành cũng là người đóng góp.",
    expertsBody:
      "Người hiểu nội thất, điện tử, làm đẹp hay linh kiện công nghiệp có thể biết rõ hơn người viết phần mềm về bằng chứng một quyết định cần. Nếu bạn biết những câu người mua hay hỏi, bạn có thể dạy hệ sinh thái cách ngành hàng đó được quyết định.",
    agentsHeading: "Tác tử AI có thể đề xuất, kèm duyệt.",
    agentsBody:
      "Tác tử gặp rất nhiều câu hỏi chưa có lời đáp. Khi một tác tử phát hiện yêu cầu chưa mô hình nào có, nó có thể đề xuất. Con người duyệt trước khi bất cứ điều gì thay đổi.",
    loop: [
      "Người mua hỏi",
      "Tác tử thử quyết định",
      "Phát hiện một yêu cầu còn thiếu",
      "Tác tử đề xuất",
      "Con người duyệt",
      "Tri thức mở được cải thiện",
    ],
    terms:
      "Hãy mở issue trên GitHub trước. Điều khoản đóng góp đang được hoàn thiện, và chúng tôi sẽ công bố trước khi nhận các thay đổi lớn.",
  },
  audiences: {
    heading: "Open Pulse dành cho ai",
    items: [
      {
        name: "Lập trình viên thương mại điện tử",
        body: "Cửa hàng, quy trình PIM và công cụ danh mục hiểu bằng chứng quyết định.",
      },
      {
        name: "Lập trình viên tác tử AI",
        body: "Bằng chứng có cấu trúc, và cách an toàn để nói điều chưa biết.",
      },
      {
        name: "Người bán và sàn",
        body: "Chất lượng dữ liệu đo bằng quyết định, không bằng số trường đã điền.",
      },
      {
        name: "Đội PIM và danh mục",
        body: 'Từ "trường đã điền chưa?" tới "bằng chứng này có giải quyết được quyết định không?"',
      },
      {
        name: "Nhà nghiên cứu",
        body: "Yêu cầu mua hàng và độ phủ bằng chứng, trong cấu trúc tái lập được.",
      },
      {
        name: "Chuyên gia ngành",
        body: "Tri thức về bằng chứng nào quan trọng trong một ngành hàng.",
      },
    ],
  },
  not: {
    heading: "Open Pulse không phải là",
    items: [
      "Một bộ máy gợi ý sản phẩm",
      "Công cụ tạo mô tả hay tạo thông tin sản phẩm",
      "Thứ thay thế PIM",
      "Giỏ hàng, giao thức thanh toán hay sàn thương mại",
      "Lời hứa rằng mọi trường còn thiếu đều quan trọng",
      "Hệ thống trả lời khi bằng chứng không đủ",
    ],
    close:
      "Nhiều dữ liệu sản phẩm hơn không tự động là dữ liệu tốt hơn. Mục tiêu là bằng chứng giải quyết được quyết định thật.",
  },
  principles: {
    heading: "Nguyên tắc mã nguồn mở của chúng tôi",
    items: [
      {
        name: "Bằng chứng trước câu trả lời",
        body: "Biết điều gì ủng hộ một nhận định trước khi nói nó là sự thật.",
      },
      {
        name: "Nguồn gốc quan trọng",
        body: "Nguồn của bằng chứng luôn kiểm tra được.",
      },
      {
        name: "Không trả lời là hợp lệ",
        body: "Không đủ bằng chứng tốt hơn một điều bịa đặt đầy tự tin.",
      },
      {
        name: "Yêu cầu trước độ đầy đủ",
        body: "Một trường quan trọng vì quyết định cần nó.",
      },
      {
        name: "Kết quả âm tính cũng được ghi lại",
        body: "Thí nghiệm thất bại cũng là thông tin.",
      },
      {
        name: "Con người luôn tham gia",
        body: "Tác tử đề xuất; con người duyệt.",
      },
      {
        name: "Định dạng mở để liên thông",
        body: "Bằng chứng hiểu được giữa các hệ thống, không bị khoá trong Pulse.",
      },
    ],
  },
  faqHeading: "Câu hỏi về Open Pulse",
  faq: [
    {
      q: "Bằng chứng quyết định là gì?",
      a: "Các thông tin người mua cần để đưa ra một quyết định cụ thể, kèm nguồn của từng thông tin và việc người mua có thực sự thấy nó hay không. Dữ liệu sản phẩm cho biết điều được lưu; bằng chứng quyết định cho biết điều có thể quyết định.",
    },
    {
      q: "Open Pulse có giống Pulse không?",
      a: "Không. Open Pulse là nền tảng mở: SDK, máy chủ MCP, các ví dụ, và khi phát hành, các định dạng chung và tri thức ngành hàng. Pulse là nền tảng trả phí đo, ưu tiên, xác minh, theo dõi và vận hành Decision API.",
    },
    {
      q: "Tác tử AI có dùng được Open Pulse không?",
      a: "Có. Máy chủ MCP đã có: với API key, tác tử có thể hỏi lựa chọn nào đáp ứng yêu cầu của người mua và nhận fits, fails hoặc cannot tell, kèm điều còn thiếu. Không có key, nó vẫn tìm được trong tài liệu của chúng tôi.",
    },
    {
      q: "Có dùng Open Pulse mà không cần Pulse API được không?",
      a: "SDK và máy chủ MCP dùng giấy phép MIT, bạn có thể đọc, sửa và phát hành. Bản thân các quyết định đến từ Pulse API và cần key. Các định dạng và gói ngành hàng dự kiến sẽ dùng độc lập được.",
    },
    {
      q: "Open Pulse có tạo ra thông tin sản phẩm còn thiếu không?",
      a: "Không. Nó không bao giờ bịa ra thông tin chưa xác minh. Kích thước, chất liệu, khả năng tương thích, chứng nhận hay điều khoản bảo hành còn thiếu sẽ vẫn để trống cho tới khi có nguồn đáng tin.",
    },
    {
      q: "Open Pulse có phải là PIM không?",
      a: "Không. PIM lưu thông tin sản phẩm. Open Pulse tập trung vào mối liên hệ giữa yêu cầu mua hàng và bằng chứng giải quyết chúng, nên nó bổ trợ cho PIM.",
    },
    {
      q: "Gói ngành hàng là gì?",
      a: "Một định dạng dự kiến liệt kê các yêu cầu quan trọng với một loại sản phẩm và bằng chứng mỗi yêu cầu cần. Chuyên gia ngành sẽ cải thiện chúng qua GitHub.",
    },
    {
      q: 'Vì sao có "không sửa"?',
      a: "Vì không phải khoảng trống nào cũng đáng thời gian kỹ thuật hay chi phí nội dung. Open Pulse mô tả được khoảng trống; Pulse giúp quyết định việc sửa có đáng chi phí không.",
    },
  ],
  cta: {
    title: "Cùng xây lớp bằng chứng cho thương mại AI.",
    body: "Tác tử AI tìm nhanh hơn và so sánh nhiều sản phẩm hơn bất kỳ ai. Chúng vẫn cần bằng chứng đáng tin để biết một sản phẩm có thực sự đáp ứng quyết định trước mắt hay không. Nền tảng đó nên là mã nguồn mở.",
    github: "Xem Open Pulse trên GitHub",
    contribute: "Đề xuất một yêu cầu ngành hàng",
    audit: "Chạy Decision Audit miễn phí",
    supporting: "Mở ngôn ngữ. Chia sẻ tri thức. Đo điều quan trọng.",
  },
};

export const opensource = (l: string) => byLocale({ en: EN, vi: VI }, l);

/** The alt text of the owner's generated pictures (28 Oct 2026), one per section that has one. */
export const opensourcePictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        hero: "The Pulse robot reads a sofa's listing through a magnifier beside an open box marked Open Pulse. Two of the buyer's requirements, fits the doorway and what is in the box, are checked; the warranty is still a question.",
        why: "A neat product record, title, brand, price, colour, category and images, beside four shoppers asking whether it fits their doorway, whether it is compatible, what is in the box and whether the warranty is valid; none of their questions reaches the record.",
        model:
          "Five steps in a row, requirement, product evidence, visible evidence, decision and outcome, with one fact dropping out between product evidence and visible evidence into a tray marked never reaches the page.",
        agent:
          "A doorway with its width marked, beside a sofa listing that gives the assembled width but leaves the package width blank. The robot between them says the evidence does not say, marked cannot tell.",
        honesty:
          "Two copies of a sofa listing. Under AI can help, verified specifications are laid out and a dimension drawing is made from them. Under it must never invent, an extra specification that was made up is crossed out.",
        states:
          "A power adapter's product page with six callouts: missing, a blank field; buried, a fact deep in long text; invisible, a fact on an internal sheet; unresolved, a half-filled field; conflicting, two different values; and not observable, a photograph that cannot show it.",
        boundary:
          "An open box marked Open Pulse with the SDK, the MCP server and examples rising out of it, two more cards marked planned, and evidence cards flowing from it into a blue engine marked Pulse that returns a ranked list.",
        contribute:
          "A loop of six steps: a buyer asks, the agent tries to decide, a requirement is missing, the agent proposes it, people review it, and the knowledge improves.",
      },
      vi: {
        hero: "Robot Pulse đọc trang sản phẩm của một chiếc sofa qua kính lúp, cạnh một chiếc hộp mở ghi Open Pulse. Hai yêu cầu của người mua, vừa khung cửa và trong hộp có gì, đã được đánh dấu; bảo hành vẫn là một dấu hỏi.",
        why: "Một hồ sơ sản phẩm gọn gàng, tiêu đề, thương hiệu, giá, màu, ngành hàng và hình ảnh, cạnh bốn người mua hỏi có vừa khung cửa không, có tương thích không, trong hộp có gì và bảo hành có hiệu lực không; không câu hỏi nào chạm tới hồ sơ.",
        model:
          "Năm bước nối nhau, yêu cầu, bằng chứng sản phẩm, bằng chứng nhìn thấy được, quyết định và kết quả, với một thông tin rơi ra giữa bằng chứng sản phẩm và bằng chứng nhìn thấy được vào một khay ghi không bao giờ tới được trang.",
        agent:
          "Một khung cửa có đánh dấu chiều rộng, cạnh trang sản phẩm sofa ghi chiều rộng khi lắp ráp nhưng để trống chiều rộng kiện hàng. Robot ở giữa nói bằng chứng không cho biết, được đánh dấu không thể kết luận.",
        honesty:
          "Hai bản của cùng một trang sofa. Dưới mục AI có thể giúp, các thông số đã kiểm chứng được sắp xếp và một bản vẽ kích thước được dựng từ đó. Dưới mục không bao giờ được bịa, một thông số bị bịa thêm bị gạch bỏ.",
        states:
          "Trang sản phẩm của một bộ sạc với sáu chú thích: thiếu, một trường để trống; bị chôn vùi, thông tin nằm sâu trong đoạn văn dài; vô hình, thông tin nằm trên một bảng nội bộ; chưa giải quyết, một trường mới điền một nửa; mâu thuẫn, hai giá trị khác nhau; và không quan sát được, một bức ảnh không thể cho thấy điều đó.",
        boundary:
          "Một chiếc hộp mở ghi Open Pulse với SDK, máy chủ MCP và các ví dụ nhô lên, hai thẻ khác ghi dự kiến, và các thẻ bằng chứng chảy từ đó vào một bộ máy màu xanh ghi Pulse, trả về một danh sách đã xếp hạng.",
        contribute:
          "Một vòng sáu bước: người mua hỏi, tác tử cố gắng quyết định, thiếu một yêu cầu, tác tử đề xuất nó, con người xem xét, và tri thức được cải thiện.",
      },
    },
    l,
  );
