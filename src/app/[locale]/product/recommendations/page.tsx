import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import {
  IconPicture,
  RecommendationsOutput,
  SAME_STRIP,
  SHELF_STEPS,
  StorefrontScene,
} from "@/components/designed/product/storefront-art";
import { PageSchema } from "@/components/PageSchema";
import { recommendations } from "@/content/pages/recommendations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const c = recommendations(locale);
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema
        locale={locale}
        path="/product/recommendations"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's direction of 26 Oct 2026: the blocks of Return Verification and Promotion
          Audit, each page's own panels kept and restyled (storefront-art.tsx). The hero figure and
          the step and gain pictures stand in until the owner's images exist. */}
      <ChapterPage
        c={c}
        figure={<StorefrontScene spec={c.scenes?.hero} />}
        chain={<StorefrontScene spec={c.scenes?.chain} />}
        art={{ situation: SAME_STRIP, steps: SHELF_STEPS }}
        gainPictures={c.gets.items.map((g) => (
          <IconPicture key={g.title} icon={g.icon} />
        ))}
        output={{ panel: <RecommendationsOutput />, layout: "band" }}
      />
    </>
  );
}
