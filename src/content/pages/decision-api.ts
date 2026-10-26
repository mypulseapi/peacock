import { byLocale } from "@/content/locale";
import { Code2, ShieldCheck, SplitSquareHorizontal, Eye } from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/** The runtime. Last on purpose, and the page says why. */
export const DECISION_API: ChapterContent = {
  meta: {
    title: "Decision API: rank your catalogue live",
    description:
      "Reads the current visit and orders your catalogue against it. Runs beside your existing store, holds a control arm back, falls back to your own order.",
  },
  eyebrow: "Decision API",
  title: "Rank your catalogue live, once you have a reason to.",
  lede:
    "The runtime reads the current visit and orders your catalogue against what it can infer. It runs alongside your existing store and search, holds back a share of traffic as a control, and falls back to your own order if anything is slow.",

  visualHeading: "Every ranked product explains itself.",
  visualBody:
    "Base, persona, price and brand, per product, so your merchandiser can see why anything moved.",

  chainBlock: {
    eyebrow: "Why this one comes last",
    heading: "A ranker is only as good as the questions the catalogue can answer.",
    body: "Same engine, same session, two catalogues. The difference is not the model.",
  },

  scenes: {
    situation: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "One shelf, before anything is ranked",
      litLabel: "Indistinguishable whatever the order",
      restLabel: "Separable, so an order can help",
      tone: "warn",
    },

    hero: {
      kind: "flow",
      steps: [
        { k: "The visit starts", v: "a page view, a referrer, nothing else", tone: "work" },
        { k: "We infer", v: "what this session appears to be deciding", tone: "work" },
        { k: "We rank", v: "your catalogue against that, with a reason per product", tone: "good" },
        { k: "Or we stand aside", v: "your own order, if anything is slow", tone: "hold" },
        { k: "A share never sees it", v: "held back, so the result stays checkable", tone: "hold" },
      ],
      note: "No cookie, no login, no identity. The session is the input and it ends when the session does.",
    },
    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Ranking an unready catalogue",
          title: "Reorders the same confusion, faster.",
          body: "If two products differ on a field nobody recorded, no ranker can separate them. It can only change which of the indistinguishable pair appears first, which is not a decision anyone was waiting for.",
          verdict: "A better order over the same missing facts.",
          tone: "hold",
        },
        {
          eyebrow: "Ranking a measured catalogue",
          title: "Has something to rank on.",
          body: "Once the deciding attributes are recorded, the session's implied requirement maps onto fields that exist, and the order changes for a reason you can read on every product.",
          verdict: "This is why the audit is sold first, and this last.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading: "This is the last thing we would sell you, and that is deliberate.",
    body: [
      "So the audit comes first, the repair comes second, and this comes when you have a shelf worth ranking and a reason to believe ordering it live would change something.",
    ],
    pull:
      "A personalisation engine pointed at a catalogue that cannot answer questions is an expensive way to reorder the same confusion.",
  },

  steps: {
    heading: "How does the runtime work?",
    items: [
      { n: "01", meta: "One tag", title: "It sits alongside your store", body: "A single script. It does not replace your search, your storefront or your platform, and it does not need a login, a cookie or an identity to work." },
      { n: "02", meta: "Per request", title: "It ranks against the session", body: "What someone browses, searches and filters in this visit. Every ranked product carries a per-factor breakdown, so nothing it does is a black box to your merchandiser." },
      { n: "03", meta: "Always", title: "A share never sees it", body: "A held-back control group, stable per session. That is the only way any number anyone reports about it means anything, including ours." },
    ],
  },

  gets: {
    heading: "What the runtime gives you",
    items: [
      { icon: Code2, title: "One script, no replatform", body: "It runs beside what you already have. If you turn it off, your store is exactly as it was, because your own order is the fallback." },
      { icon: Eye, title: "A breakdown on every product", body: "Base, persona, affinity and price, per product. Your merchandiser can see why anything moved, and override it." },
      { icon: SplitSquareHorizontal, title: "A control group by default", body: "Not an option you enable when you want to measure. A share of traffic always sees your original order, so the comparison is always available." },
      { icon: ShieldCheck, title: "A fallback, not an error page", body: "If the engine is slow or unreachable, the storefront renders your own order." },
    ],
  },

  limits: {
    heading: "What the runtime does, and what we will not claim about it",
    will: [
      "Rank your catalogue against what the current visit implies, and explain every score",
      "Hold back a share of traffic so the effect is measurable rather than asserted",
      "Fall back to your own ordering whenever it cannot answer in time",
      "Run without a cookie, a login or any personal identifier",
    ],
    wont: [
      "Come with an uplift figure. We have run no live experiment, so any percentage would be someone else's store or an invention",
      "Be sold before a pilot. Pricing is agreed per pilot, because what it is worth depends on your catalogue and your traffic",
      "Replace your search or your storefront",
      "Help much on a catalogue that has not been repaired first",
    ],
  },

  faq: [
    { q: "What uplift should we expect?", a: "None, until a pilot on your traffic produces one. What you get before that is the design: the metric, the split and the stopping rule, all agreed in writing before anything runs. Our full position on what we cannot yet claim is on the limits page." },
    { q: "How fast is it?", a: "The ranking path does no language model call and no database read, and the console reports live p50 and p95 under load. We report it as a distribution rather than a single median, because a median hides the requests that actually annoy people." },
    { q: "What happens if it goes down?", a: "Your storefront renders your own order. The fallback is the default path rather than an error state, which is the only acceptable behaviour for something sitting in front of a live store." },
    { q: "Do you need customer data?", a: "No. It infers from what happens in the current visit. No cookie, no login, no cross-site tracking and no personal identifier, which is also why it works on a first visit." },
    { q: "Why is this last in your product list?", a: "Because ranking a catalogue that cannot answer questions does not help. The audit and the repair make the shelf decidable; this orders a shelf that already is. Selling it first would be selling the expensive part before the part that makes it work." },
  ],

  cta: {
    title: "Start with the catalogue, not the engine.",
    body: "The runtime comes after a pilot, and the pilot comes after a shelf worth ranking. That begins with one category export.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "Runtime pricing is agreed per pilot, never before one.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const DECISION_API_VI: ChapterContent = {
  meta: {
    title: "Decision API: xếp hạng danh mục theo thời gian thực",
    description:
      "Bộ máy đọc phiên truy cập hiện tại và sắp xếp danh mục theo đó. Chạy song song gian hàng sẵn có, giữ lại lưu lượng đối chứng, lùi về thứ tự gốc khi lỗi.",
  },
  eyebrow: "Decision API",
  title: "Xếp hạng danh mục theo thời gian thực, khi bạn đã có lý do.",
  lede:
    "Bộ máy thời gian thực đọc phiên truy cập hiện tại và sắp xếp danh mục theo những gì nó suy luận được. Nó chạy song song với gian hàng và công cụ tìm kiếm sẵn có, giữ lại một phần lưu lượng làm nhóm đối chứng, và lùi về thứ tự gốc của bạn nếu có gì đó chậm.",

  visualHeading: "Mỗi sản phẩm được xếp hạng đều tự giải thích.",
  visualBody:
    "Điểm nền, chân dung, giá và thương hiệu, theo từng sản phẩm, để người phụ trách trưng bày hàng hoá thấy được vì sao một sản phẩm dịch chuyển.",

  chainBlock: {
    eyebrow: "Vì sao cái này đứng cuối",
    heading: "Một bộ xếp hạng chỉ tốt bằng những câu hỏi mà danh mục trả lời được.",
    body: "Cùng một bộ máy, cùng một phiên, hai danh mục khác nhau. Khác biệt không nằm ở mô hình.",
  },

  scenes: {
    situation: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "Một kệ hàng, trước khi xếp hạng bất cứ thứ gì",
      litLabel: "Không phân biệt được dù sắp kiểu nào",
      restLabel: "Tách được, nên thứ tự mới giúp được",
      tone: "warn",
    },

    hero: {
      kind: "flow",
      steps: [
        { k: "Phiên bắt đầu", v: "một lượt xem trang, một nguồn dẫn, không gì khác", tone: "work" },
        { k: "Chúng tôi suy luận", v: "phiên này có vẻ đang quyết định điều gì", tone: "work" },
        { k: "Chúng tôi xếp hạng", v: "danh mục của bạn, kèm lý do cho từng sản phẩm", tone: "good" },
        { k: "Hoặc đứng sang một bên", v: "dùng thứ tự của bạn, nếu có gì đó chậm", tone: "hold" },
        { k: "Một phần không bao giờ thấy", v: "được giữ lại, để kết quả còn kiểm chứng được", tone: "hold" },
      ],
      note: "Không cookie, không đăng nhập, không danh tính. Đầu vào là phiên truy cập, và nó kết thúc khi phiên kết thúc.",
    },
    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Xếp hạng trên danh mục chưa sẵn sàng",
          title: "Sắp xếp lại đúng mớ bòng bong đó, nhanh hơn.",
          body: "Nếu hai sản phẩm chỉ khác nhau ở một trường không ai ghi lại, không bộ xếp hạng nào tách được chúng. Nó chỉ đổi xem cái nào trong hai thứ không phân biệt được sẽ hiện trước, và không ai chờ đợi quyết định đó.",
          verdict: "Một thứ tự đẹp hơn trên cùng những dữ kiện còn thiếu.",
          tone: "hold",
        },
        {
          eyebrow: "Xếp hạng trên danh mục đã đo",
          title: "Có cái gì đó để mà xếp.",
          body: "Khi các thuộc tính quyết định đã được ghi, nhu cầu mà phiên truy cập hàm ý sẽ khớp vào những trường có thật, và thứ tự thay đổi vì một lý do bạn đọc được trên từng sản phẩm.",
          verdict: "Đây là lý do bản kiểm tra được bán trước, còn cái này sau cùng.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading: "Đây là thứ cuối cùng chúng tôi muốn bán cho bạn, và điều đó là có chủ đích.",
    body: [
      "Nên bản kiểm tra đi trước, việc sửa đi thứ hai, và thứ này đến khi bạn đã có một kệ hàng đáng xếp hạng cùng một lý do để tin rằng sắp xếp nó theo thời gian thực sẽ thay đổi được điều gì đó.",
    ],
    pull:
      "Một bộ máy cá nhân hoá chĩa vào danh mục không trả lời nổi câu hỏi nào chỉ là một cách tốn kém để sắp xếp lại cùng một mớ rối rắm.",
  },

  steps: {
    heading: "Bộ máy thời gian thực hoạt động ra sao?",
    items: [
      { n: "01", meta: "Một thẻ", title: "Nó nằm cạnh gian hàng của bạn", body: "Một thẻ script duy nhất. Nó không thay thế công cụ tìm kiếm, gian hàng hay nền tảng của bạn, và không cần đăng nhập, cookie hay danh tính nào để chạy." },
      { n: "02", meta: "Mỗi yêu cầu", title: "Nó xếp hạng theo phiên truy cập", body: "Những gì một người duyệt, tìm và lọc trong lần ghé này. Mỗi sản phẩm được xếp hạng đều kèm phần diễn giải theo từng yếu tố, nên không có gì nó làm là hộp đen với người phụ trách trưng bày hàng hoá của bạn." },
      { n: "03", meta: "Luôn luôn", title: "Một phần lưu lượng không bao giờ thấy nó", body: "Một nhóm đối chứng được giữ lại, ổn định theo từng phiên. Đó là cách duy nhất để bất kỳ con số nào ai đó báo cáo về nó có ý nghĩa, kể cả con số của chúng tôi." },
    ],
  },

  gets: {
    heading: "Bộ máy thời gian thực mang lại gì cho bạn",
    items: [
      { icon: Code2, title: "Một thẻ script, không đổi nền tảng", body: "Nó chạy cạnh những gì bạn đang có. Nếu bạn tắt đi, cửa hàng của bạn y hệt như cũ, bởi thứ tự gốc của bạn chính là phương án dự phòng." },
      { icon: Eye, title: "Diễn giải trên từng sản phẩm", body: "Điểm nền, chân dung, độ tương hợp và giá, theo từng sản phẩm. Người phụ trách trưng bày hàng hoá thấy được vì sao một sản phẩm dịch chuyển, và có thể ghi đè." },
      { icon: SplitSquareHorizontal, title: "Nhóm đối chứng mặc định", body: "Không phải một tuỳ chọn bạn bật lên khi muốn đo. Luôn có một phần lưu lượng thấy thứ tự gốc của bạn, nên phép so sánh luôn sẵn sàng." },
      { icon: ShieldCheck, title: "Một phương án dự phòng, không phải trang lỗi", body: "Nếu bộ máy chậm hoặc không tới được, gian hàng hiển thị theo thứ tự của bạn." },
    ],
  },

  limits: {
    heading: "Bộ máy làm gì, và chúng tôi sẽ không tuyên bố gì về nó",
    will: [
      "Xếp hạng danh mục theo những gì phiên truy cập hiện tại hàm ý, và giải thích mọi điểm số",
      "Giữ lại một phần lưu lượng để hiệu quả là thứ đo được thay vì thứ được khẳng định suông",
      "Lùi về thứ tự gốc của bạn bất cứ khi nào nó không kịp trả lời",
      "Chạy mà không cần cookie, đăng nhập hay bất kỳ định danh cá nhân nào",
    ],
    wont: [
      "Đi kèm một con số tăng trưởng. Chúng tôi chưa chạy thử nghiệm trực tiếp nào, nên bất kỳ tỷ lệ nào cũng sẽ là cửa hàng của người khác hoặc là bịa",
      "Được bán trước khi có một chương trình thử nghiệm. Giá được thống nhất theo từng chương trình, vì giá trị của nó phụ thuộc vào danh mục và lưu lượng của bạn",
      "Thay thế công cụ tìm kiếm hay gian hàng của bạn",
      "Giúp được nhiều trên một danh mục chưa được sửa trước",
    ],
  },

  faq: [
    { q: "Chúng tôi nên kỳ vọng mức tăng bao nhiêu?", a: "Chúng tôi sẽ không đưa ra con số, vì chưa đo được nó trên lưu lượng của bạn. Điều chúng tôi sẽ làm là cho bạn xem thiết kế thử nghiệm, với nhóm đối chứng được giữ lại, một chỉ số chính đã thống nhất và quy tắc dừng cố định từ trước, rồi báo cáo kết quả kể cả khi nó tiêu cực hay không kết luận được." },
    { q: "Nó nhanh tới đâu?", a: "Đường xếp hạng không gọi mô hình ngôn ngữ nào và không đọc cơ sở dữ liệu nào, và bảng điều khiển báo p50 cùng p95 theo thời gian thực dưới tải. Chúng tôi báo dưới dạng phân phối chứ không phải một số trung vị duy nhất, vì số trung vị che mất đúng những yêu cầu thực sự làm người dùng khó chịu." },
    { q: "Nếu nó sập thì sao?", a: "Gian hàng của bạn hiển thị theo thứ tự của chính bạn. Phương án dự phòng là đường đi mặc định chứ không phải một trạng thái lỗi, và đó là hành vi duy nhất chấp nhận được với một thứ đứng trước một cửa hàng đang chạy thật." },
    { q: "Các bạn có cần dữ liệu khách hàng không?", a: "Không. Nó suy luận từ những gì diễn ra trong lần ghé hiện tại. Không cookie, không đăng nhập, không theo dõi xuyên trang và không định danh cá nhân, đó cũng là lý do nó hoạt động ngay từ lần ghé đầu tiên." },
    { q: "Vì sao thứ này xếp cuối trong danh sách sản phẩm của các bạn?", a: "Vì xếp hạng một danh mục không trả lời nổi câu hỏi nào thì chẳng giúp được gì. Bản kiểm tra và việc sửa làm cho kệ hàng có khả năng hỗ trợ quyết định; thứ này sắp xếp một kệ hàng vốn đã có khả năng đó. Bán nó trước sẽ là bán phần đắt tiền trước phần khiến nó chạy được." },
  ],

  cta: {
    title: "Bắt đầu từ danh mục, không phải từ bộ máy.",
    body: "Bộ máy thời gian thực đến sau một chương trình thử nghiệm, và chương trình đó đến sau một kệ hàng đáng xếp hạng. Việc ấy bắt đầu bằng một tệp xuất ngành hàng.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Giá bộ máy thời gian thực được thống nhất theo từng chương trình thử nghiệm, không bao giờ trước đó.",
  },
};

export const decisionApi = (l: string) => byLocale({ en: DECISION_API, vi: DECISION_API_VI }, l);
