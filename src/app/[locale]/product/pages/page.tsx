import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { PagesVisual } from "@/components/StoryVisual";
import { pages } from "@/content/pages/pages";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = pages(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/pages"),
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
      <PageSchema locale={locale} path="/product/pages" nodes={[storyFaqSchema(pages(locale))]} />
      <StoryPage layout={{ steps: "rail", gets: "showcase", limits: "cards" }} visual={<PagesVisual />} c={pages(locale)} />
    </>
  );
}
