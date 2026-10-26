import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import {
  PromotionsChain,
  PROMOTIONS_ART,
} from "@/components/designed/product/chapter-art";
import { PromotionsHero } from "@/components/designed/product/chapter-hero";
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
  const c = promotionAudit(locale);
  return (
    <>
      {/* Headings are the questions a merchant asks, and each answer leads with a complete
          sentence, so an answer engine can lift and attribute one on its own. */}
      <PageSchema
        locale={locale}
        path="/product/promotion-audit"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's mockup of 26 Oct 2026: hero A, sections C. See chapters.tsx. */}
      <ChapterPage
        c={c}
        figure={<PromotionsHero c={c} />}
        chain={<PromotionsChain l={c.art} />}
        art={PROMOTIONS_ART}
      />
    </>
  );
}
