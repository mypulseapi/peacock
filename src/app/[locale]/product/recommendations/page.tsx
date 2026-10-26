import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { RecommendationsVisual } from "@/components/StoryVisual";
import { recommendations } from "@/content/pages/recommendations";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = recommendations(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/recommendations"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      {/* Headings are the questions a merchant types, and each answer leads with
          a complete sentence, so an answer engine can lift and attribute one
          without the surrounding page. */}
      <PageSchema locale={locale} path="/product/recommendations" nodes={[storyFaqSchema(recommendations(locale))]} />
      <StoryPage titleClassName="text-hero" layout={{ steps: "timeline", gets: "grid", limits: "ledger" }} visual={<RecommendationsVisual />} c={recommendations(locale)} />
    </>
  );
}
