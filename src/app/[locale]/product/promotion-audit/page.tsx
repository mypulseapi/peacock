import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { promotionAudit } from "@/content/pages/promotion-audit";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = promotionAudit(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/promotion-audit"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      {/* Headings are the questions a merchant asks, and each answer leads with a complete
          sentence, so an answer engine can lift and attribute one on its own. The story template
          until the designer's page exists, as Search and Recommendations are. */}
      <PageSchema
        locale={locale}
        path="/product/promotion-audit"
        nodes={[storyFaqSchema(promotionAudit(locale))]}
      />
      <StoryPage
        layout={{ steps: "cards", gets: "showcase", limits: "split" }}
        c={promotionAudit(locale)}
      />
    </>
  );
}
