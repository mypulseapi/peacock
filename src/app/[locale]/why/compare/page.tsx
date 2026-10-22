import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { CompareVisual } from "@/components/StoryVisual";
import { compare } from "@/content/pages/compare";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = compare(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/why/compare"),
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
      <PageSchema locale={locale} path="/why/compare" nodes={[storyFaqSchema(compare(locale))]} />
      <StoryPage layout={{ steps: "cards", gets: "grid", limits: "split" }} visual={<CompareVisual />} c={compare(locale)} />
    </>
  );
}
