import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import {
  IconPicture,
  SHELF_STEPS,
  SearchOutput,
  StorefrontScene,
} from "@/components/designed/product/storefront-art";
import { PageSchema } from "@/components/PageSchema";
import { search } from "@/content/pages/search";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const c = search(locale);
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema
        locale={locale}
        path="/product/search"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's direction of 26 Oct 2026: the blocks of Return Verification and Promotion
          Audit, each page's own panels kept and restyled (storefront-art.tsx). The hero figure and
          the step and gain pictures stand in until the owner's images exist. */}
      <ChapterPage
        c={c}
        figure={<SearchOutput />}
        chain={<StorefrontScene spec={c.scenes?.chain} />}
        art={{
          situation: <StorefrontScene spec={c.scenes?.situation} missing />,
          steps: SHELF_STEPS,
          situationIsPanel: true,
        }}
        gainPictures={c.gets.items.map((g) => (
          <IconPicture key={g.title} icon={g.icon} />
        ))}
        output={{ panel: <SearchOutput />, layout: "centre" }}
      />
    </>
  );
}
