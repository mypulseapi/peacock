import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { ApiVisual } from "@/components/StoryVisual";
import { decisionApi } from "@/content/pages/decision-api";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = decisionApi(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/decision-api"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema locale={locale} path="/product/decision-api" nodes={[storyFaqSchema(decisionApi(locale))]} />
      <StoryPage titleClassName="text-hero" layout={{ steps: "rail", gets: "showcase", limits: "split" }} visual={<ApiVisual />} c={decisionApi(locale)} />
    </>
  );
}
