import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { SearchVisual } from "@/components/StoryVisual";
import { search } from "@/content/pages/search";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = search(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/search"),
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
      <PageSchema locale={locale} path="/product/search" nodes={[storyFaqSchema(search(locale))]} />
      <StoryPage layout={{ steps: "cards", gets: "showcase", limits: "split" }} visual={<SearchVisual />} c={search(locale)} />
    </>
  );
}
