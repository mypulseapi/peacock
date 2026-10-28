import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import {
  ApiOutput,
  StorefrontScene,
} from "@/components/designed/product/storefront-art";
import { productPictures } from "@/components/designed/product/product-pictures";
import { PageSchema } from "@/components/PageSchema";
import {
  decisionApi,
  decisionApiPictureAlt,
} from "@/content/pages/decision-api";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const c = decisionApi(locale);
  const pictures = productPictures(
    "decision-api",
    decisionApiPictureAlt(locale),
  );
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema
        locale={locale}
        path="/product/decision-api"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's direction of 26 Oct 2026: the blocks of Return Verification and Promotion
          Audit, each page's own panels kept and restyled (storefront-art.tsx). The hero, step and
          gain pictures are the owner's (28 Oct 2026, product-pictures.tsx). */}
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
        output={{ panel: <ApiOutput />, layout: "band" }}
      />
    </>
  );
}
