import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { StudioVisual } from "@/components/StoryVisual";
import { merchandisingStudio } from "@/content/pages/merchandising-studio";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = merchandisingStudio(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/merchandising-studio"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {/* Headings are the questions a merchant types, and each answer leads with
          a complete sentence, so an answer engine can lift and attribute one
          without the surrounding page. */}
      <PageSchema locale={locale} path="/product/merchandising-studio" nodes={[storyFaqSchema(merchandisingStudio(locale))]} />
      <StoryPage layout={{ steps: "cards", gets: "manifest", limits: "ledger" }} visual={<StudioVisual />} c={merchandisingStudio(locale)} />
    </>
  );
}
