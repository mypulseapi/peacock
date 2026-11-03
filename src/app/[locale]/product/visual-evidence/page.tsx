import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import { PageSchema } from "@/components/PageSchema";
import { visualEvidence } from "@/content/pages/visual-evidence";
import { byLocale } from "@/content/locale";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * The two panels until the designer's pictures exist: the three photo outcomes (an illustration)
 * and the benchmark's abstention result (ODIN/research/VISION-MODEL.md § 6a, public data, labelled).
 */
const PANEL = {
  en: {
    note: "Illustration",
    rows: [
      ["Ports", "Shown in photo, missing from your data", "Record it"],
      ["Colour", "Photo shows green, data says navy", "Reconcile"],
      ["Port side", "No photo shows it", "Add a photo"],
      [
        "Battery life",
        "No photo can show it",
        "Record it, never read it off a photo",
      ],
    ],
    head: ["Fact", "What the photos say", "Repair"],
    benchTitle: "When no photo can show the fact",
    benchRows: [
      ["gpt-4o-mini", "98% answered cannot tell"],
      ["gpt-6.1-sol", "98% answered cannot tell"],
    ],
    benchNote:
      "Pulse benchmark on public product data (ABO, Amazon Reviews 2023), 149 questions, 2026-11-03. Not merchant data, not human-checked.",
  },
  vi: {
    note: "Minh hoạ",
    rows: [
      ["Cổng kết nối", "Ảnh cho thấy, dữ liệu thiếu", "Ghi vào dữ liệu"],
      ["Màu", "Ảnh là xanh lá, dữ liệu ghi xanh navy", "Đối chiếu"],
      ["Mặt cổng", "Không ảnh nào cho thấy", "Thêm ảnh"],
      [
        "Thời lượng pin",
        "Không ảnh nào cho thấy được",
        "Ghi vào dữ liệu, không đọc từ ảnh",
      ],
    ],
    head: ["Thông tin", "Ảnh cho thấy gì", "Việc sửa"],
    benchTitle: "Khi không ảnh nào cho thấy thông tin",
    benchRows: [
      ["gpt-4o-mini", "98% trả lời không xác định được"],
      ["gpt-6.1-sol", "98% trả lời không xác định được"],
    ],
    benchNote:
      "Bộ kiểm thử của Pulse trên dữ liệu sản phẩm công khai (ABO, Amazon Reviews 2023), 149 câu hỏi, 3/11/2026. Không phải dữ liệu người bán, chưa được người kiểm tra.",
  },
};

function OutcomesPanel({ l }: { l: (typeof PANEL)["en"] }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-surface-0 p-5 text-left shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {l.note}
      </p>
      <table className="mt-3 w-full font-sans text-sm">
        <thead>
          <tr className="text-muted">
            {l.head.map((h) => (
              <th key={h} className="pb-2 pr-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {l.rows.map(([fact, said, repair]) => (
            <tr key={fact} className="border-t border-line">
              <td className="py-2 pr-3 font-medium text-ink">{fact}</td>
              <td className="py-2 pr-3 text-muted">{said}</td>
              <td className="py-2 font-medium text-primary">{repair}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BenchmarkPanel({ l }: { l: (typeof PANEL)["en"] }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-surface-0 p-5 text-left">
      <p className="font-semibold text-ink">{l.benchTitle}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {l.benchRows.map(([model, result]) => (
          <li
            key={model}
            className="flex justify-between gap-4 border-t border-line pt-2"
          >
            <span className="font-mono text-muted">{model}</span>
            <span className="font-medium text-ink">{result}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">{l.benchNote}</p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = visualEvidence(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/visual-evidence"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = visualEvidence(locale);
  const l = byLocale(PANEL, locale);
  return (
    <>
      <PageSchema
        locale={locale}
        path="/product/visual-evidence"
        nodes={[storyFaqSchema(c)]}
      />
      <ChapterPage
        c={c}
        figure={<OutcomesPanel l={l} />}
        art={{ situation: <BenchmarkPanel l={l} />, situationIsPanel: true }}
      />
    </>
  );
}
