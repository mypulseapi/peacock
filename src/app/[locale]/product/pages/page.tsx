import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import {
  PagesOutput,
  StorefrontScene,
} from "@/components/designed/product/storefront-art";
import { storefrontPictures } from "@/components/designed/product/storefront-pictures";
import { PageSchema } from "@/components/PageSchema";
import { pages, pagesPictureAlt } from "@/content/pages/pages";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  prepareLocale(locale);
  const c = pages(locale);
  const pictures = storefrontPictures("pages", pagesPictureAlt(locale));
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema
        locale={locale}
        path="/product/pages"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's direction of 26 Oct 2026: the blocks of Return Verification and Promotion
          Audit, each page's own panels kept and restyled (storefront-art.tsx). The hero, step and
          gain pictures are the owner's (28 Oct 2026, storefront-pictures.tsx). */}
      <ChapterPage
        c={c}
        chain={<StorefrontScene spec={c.scenes?.chain} />}
        chainFramed={false}
        art={{
          situation: <StorefrontScene spec={c.scenes?.situation} />,
          steps: pictures.steps,
          situationIsPanel: true,
        }}
        gainPictures={pictures.gains}
        output={{ panel: <PagesOutput />, layout: "band" }}
      />
    </>
  );
}
