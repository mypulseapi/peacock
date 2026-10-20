import type { SceneSpec } from "@/components/story/Scenes";
import { byLocale } from "./locale";
/**
 * "Why Pulse". The shelf a better-funded competitor cannot fill.
 *
 * Theirs holds twelve named case studies. Ours holds the method, the comparison
 * and the limits, because that is what we actually have and because a buyer who
 * is about to defend this internally needs the method more than they need a logo.
 */
export const WHY_HERO = {
  eyebrow: "Why Pulse",
  title: "Everything here is reproducible, including the parts that did not work.",
  lede:
    "Three things a careful buyer usually has to dig for: how the measurement works, how it differs from what you already run, and where it stops being reliable. They are on one page because you should not have to ask.",
} as const;

export const METHOD = {
  id: "method",
  eyebrow: "The method",
  title: "How is a decision-information gap measured?",
  paragraphs: [
    "Start with a shelf of products and a set of questions shoppers are trying to answer. For each attribute, we compute how much recording it everywhere would improve a shopper's ability to tell those products apart, and subtract what it already contributes today. The difference is the gap, measured in bits.",
    "Bits are the right unit because the question is genuinely about information: how much uncertainty does knowing this field remove? A field recorded on every product with the same value removes none. A field recorded on nothing removes none today but could remove a great deal once populated. That is why absence alone is a poor guide and why a completeness percentage cannot answer this.",
    "The second half is demand. An attribute only matters to the extent that shoppers are trying to decide something it bears on. We score each attribute against the stated requirements for that category, so a field that nobody's decision depends on scores near zero however empty it is.",
  ],
  callout: {
    title: "Run it yourself",
    body: "The measurement is in our repository, with the fixture it was run against. One command reproduces every number on this site.",
    code: "pnpm --filter @pulse/road-runner voi:spike -- apps/api/road-runner/fixtures/voi-laptops.json",
  },
} as const;

export const COMPARE = {
  id: "compare",
  eyebrow: "How we compare",
  title: "What does this do that our current tooling does not?",
  intro:
    "Most tools that prioritise catalogue work rank by engagement. That is reasonable and it has one structural blind spot, which happens to be the expensive one.",
  rows: [
    { q: "Ranks by", them: "What shoppers engaged with: filters used, clicks, channel performance", us: "How much each attribute would change the decisions shoppers are trying to make" },
    { q: "A field recorded on zero products", them: "Generates no engagement, so it never rises", us: "Can rank first. Screen size did, on the shelf we measured" },
    { q: "Unit", them: "Counts and percentages", us: "Bits of decision information" },
    { q: "Needs traffic", them: "Yes, to learn from", us: "No. It is a property of the catalogue" },
    { q: "Tells you the cost of the fix", them: "Rarely", us: "Yes: extractable from your text, mappable from a feed, or genuinely absent" },
    { q: "Publishes its limits", them: "Seldom", us: "On this page, in the next section" },
  ],
  note:
    "This is not a claim that engagement ranking is wrong. If you already run one, keep it. They read the same catalogue fields we do, which is why the audit helps them too.",
} as const;

/**
 * The limits summary on /why.
 *
 * The uplift item was removed here on 2026-10-06. It is the first thing
 * /why/limits says and it was also on the homepage, so a reader going
 * homepage to /why to /why/limits met the same sentence three times, which the
 * team's review read as a product unsure of itself rather than an honest one.
 * Said once on the homepage and once in full on the dedicated page; this
 * section links there.
 */
export const LIMITS = {
  id: "limits",
  eyebrow: "What we cannot claim yet",
  title: "Where the measurement stops being reliable.",
  items: [
    {
      title: "Only the top of the ranking is stable",
      body: "On the shelf we measured, screen size came first in 12 of 12 runs across every seed, weighting and imputation scope tested. Positions two to four moved between runs. We publish the whole ranking but we only stand behind the top of it.",
    },
    {
      title: "An unrepresentative attribute cannot be scored well",
      body: "Our simulation of a completed catalogue can only use values the shelf already records. Where an attribute's recorded values are unrepresentative of its real range, that simulation is wrong in a way we can name but not yet correct. It needs a value distribution drawn from outside the catalogue being repaired.",
    },
    {
      title: "Generalisation beyond our test categories is unproven",
      body: "The method is category-agnostic in principle. In practice we have measured a small number of shelves. Whether the same effects hold in yours is exactly what the audit finds out, and it is a fair reason to start with one category rather than a contract.",
    },
  ],
} as const;

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const WHY_HERO_VI = {
  eyebrow: "Vì sao Pulse",
  title: "Mọi thứ ở đây đều tái lập được, kể cả những phần không chạy.",
  lede:
    "Ba điều mà một người mua cẩn thận thường phải tự đào bới: phép đo hoạt động ra sao, nó khác gì thứ bạn đang chạy, và nó ngừng đáng tin ở đâu. Cả ba nằm trên một trang vì bạn không nên phải hỏi.",
} as const;

export const METHOD_VI = {
  id: "method",
  eyebrow: "Phương pháp",
  title: "Khoảng trống thông tin quyết định được đo thế nào?",
  paragraphs: [
    "Bắt đầu từ một kệ sản phẩm và một tập câu hỏi mà người mua đang cố trả lời. Với từng thuộc tính, chúng tôi tính xem việc ghi nó ở mọi sản phẩm sẽ cải thiện bao nhiêu khả năng phân biệt các sản phẩm đó của người mua, rồi trừ đi phần nó đã đóng góp hôm nay. Chênh lệch chính là khoảng trống, đo bằng bit.",
    "Bit là đơn vị đúng vì câu hỏi ở đây thực sự là về thông tin: biết trường này thì loại bỏ được bao nhiêu độ bất định? Một trường được ghi ở mọi sản phẩm với cùng một giá trị thì không loại bỏ được gì. Một trường không được ghi ở đâu cả thì hôm nay không loại bỏ được gì nhưng có thể loại bỏ rất nhiều khi đã điền xong. Đó là lý do chỉ nhìn vào sự vắng mặt là một chỉ dẫn kém, và vì sao một tỷ lệ hoàn thiện không trả lời được câu hỏi này.",
    "Nửa còn lại là nhu cầu. Một thuộc tính chỉ có ý nghĩa trong chừng mực người mua đang cố quyết định điều gì đó liên quan tới nó. Chúng tôi chấm từng thuộc tính đối chiếu với các yêu cầu đã nêu cho ngành hàng đó, nên một trường không quyết định nào của ai dựa vào sẽ có điểm gần bằng không, dù nó trống đến đâu.",
  ],
  callout: {
    title: "Tự chạy thử",
    body: "Phép đo nằm trong kho mã của chúng tôi, kèm bộ dữ liệu nó đã chạy trên đó. Một câu lệnh tái lập mọi con số trên trang web này.",
    code: "pnpm --filter @pulse/road-runner voi:spike -- apps/api/road-runner/fixtures/voi-laptops.json",
  },
} as const;

export const COMPARE_VI = {
  id: "compare",
  eyebrow: "So sánh với chúng tôi",
  title: "Thứ này làm được gì mà công cụ hiện tại của chúng tôi không làm được?",
  intro:
    "Phần lớn công cụ ưu tiên hoá công việc trên danh mục đều xếp hạng theo mức tương tác. Điều đó hợp lý và có đúng một điểm mù mang tính cấu trúc, tình cờ lại là điểm tốn kém.",
  rows: [
    { q: "Xếp hạng theo", them: "Những gì người mua đã tương tác: bộ lọc được dùng, lượt nhấp, hiệu quả theo kênh", us: "Mức mỗi thuộc tính làm thay đổi những quyết định người mua đang cố đưa ra" },
    { q: "Một trường được ghi ở không sản phẩm nào", them: "Không sinh ra tương tác, nên không bao giờ nổi lên", us: "Có thể về nhất. Kích thước màn hình đã về nhất, trên kệ hàng chúng tôi đo" },
    { q: "Đơn vị", them: "Số đếm và tỷ lệ phần trăm", us: "Bit thông tin quyết định" },
    { q: "Cần lưu lượng", them: "Có, để học từ đó", us: "Không. Đây là một thuộc tính của danh mục" },
    { q: "Cho biết chi phí của việc sửa", them: "Hiếm khi", us: "Có: trích xuất được từ văn bản của bạn, ánh xạ được từ một nguồn dữ liệu, hay thực sự chưa có" },
    { q: "Công bố giới hạn của mình", them: "Ít khi", us: "Ngay trên trang này, ở mục kế tiếp" },
  ],
  note:
    "Đây không phải khẳng định rằng xếp hạng theo tương tác là sai. Nếu bạn đang chạy một công cụ như vậy, hãy giữ nó. Chúng đọc đúng những trường danh mục mà chúng tôi đọc, và đó là lý do bản kiểm tra cũng giúp ích cho chúng.",
} as const;

export const LIMITS_VI = {
  id: "limits",
  eyebrow: "Những gì chúng tôi chưa thể khẳng định",
  title: "Phép đo ngừng đáng tin ở đâu.",
  items: [
    {
      title: "Chỉ phần đầu bảng xếp hạng là ổn định",
      body: "Trên kệ hàng chúng tôi đo, kích thước màn hình về nhất ở 12 trên 12 lần chạy, qua mọi seed, mọi cách đặt trọng số và mọi phạm vi ước lượng đã thử. Các vị trí từ hai đến bốn xê dịch giữa các lần chạy. Chúng tôi công bố toàn bộ thứ hạng nhưng chỉ bảo vệ phần đầu của nó.",
    },
    {
      title: "Một thuộc tính không đại diện thì không chấm điểm tốt được",
      body: "Phần mô phỏng một danh mục hoàn chỉnh chỉ dùng được những giá trị mà kệ hàng đã ghi. Ở nơi các giá trị đã ghi của một thuộc tính không đại diện cho dải giá trị thật của nó, phần mô phỏng ấy sai theo một cách chúng tôi gọi tên được nhưng chưa sửa được. Nó cần một phân phối giá trị lấy từ bên ngoài danh mục đang được sửa.",
    },
    {
      title: "Khả năng khái quát ra ngoài các ngành hàng đã thử là chưa được chứng minh",
      body: "Về nguyên tắc, phương pháp không phụ thuộc ngành hàng. Trên thực tế chúng tôi mới đo một số ít kệ hàng. Liệu các hiệu ứng ấy có đúng với kệ hàng của bạn hay không thì chính bản kiểm tra sẽ trả lời, và đó là lý do chính đáng để bắt đầu bằng một ngành hàng thay vì một hợp đồng.",
    },
  ],
} as const;

export const whyHero = (l: string) => byLocale({ en: WHY_HERO, vi: WHY_HERO_VI }, l);
export const whyMethod = (l: string) => byLocale({ en: METHOD, vi: METHOD_VI }, l);
export const whyCompare = (l: string) => byLocale({ en: COMPARE, vi: COMPARE_VI }, l);
export const whyLimits = (l: string) => byLocale({ en: LIMITS, vi: LIMITS_VI }, l);


/** Hero scene. Data, so it localises with everything else on the page. */
export const WHY_ART: SceneSpec = {
  kind: "facts",
  facts: [
    { value: "1", label: "Command reproduces every figure", note: "from our own repository, not a spreadsheet", tone: "good" },
    { value: "12/12", label: "Runs agree on the top repair", note: "across every seed and weighting tested", tone: "good" },
    { value: "0", label: "Conversion statistics on this site", note: "because none has been measured on merchant traffic", tone: "warn" },
  ],
  note: "The third number is the one worth reading. If a figure cannot be reproduced, it is not printed, and that rule is why there is no uplift claim anywhere here.",
};

export const WHY_ART_VI: SceneSpec = {
  kind: "facts",
  facts: [
    { value: "1", label: "Một lệnh tái tạo lại mọi con số", note: "từ chính kho mã của chúng tôi, không phải bảng tính", tone: "good" },
    { value: "12/12", label: "Lần chạy thống nhất hạng mục sửa đầu bảng", note: "trên mọi seed và cách trọng số đã thử", tone: "good" },
    { value: "0", label: "Số liệu chuyển đổi trên website này", note: "vì chưa đo được cái nào trên lưu lượng nhà bán", tone: "warn" },
  ],
  note: "Con số thứ ba mới là con số đáng đọc. Nếu một con số không tái tạo được thì nó không được in ra, và đó là lý do ở đây không có tuyên bố tăng trưởng nào.",
};

export const whyArt = (l: string) => byLocale<SceneSpec>({ en: WHY_ART, vi: WHY_ART_VI }, l);
