import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import { productPictures } from "@/components/designed/product/product-pictures";
import { PageSchema } from "@/components/PageSchema";
import {
  visualEvidence,
  visualEvidencePictureAlt,
} from "@/content/pages/visual-evidence";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = visualEvidence(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/visual-evidence"),
  };
}

/**
 * The owner's generated pictures (4 Nov 2026): the hero in the page's content, the situation, steps
 * and gains in `product-pictures.tsx`. They replaced the two panels that stood in for them; the
 * benchmark's figure stays in the questions, labelled as public data.
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = visualEvidence(locale);
  const pictures = productPictures(
    "visual-evidence",
    visualEvidencePictureAlt(locale),
  );
  return (
    <>
      <PageSchema
        locale={locale}
        path="/product/visual-evidence"
        nodes={[storyFaqSchema(c)]}
      />
      <ChapterPage
        c={c}
        art={{ situation: pictures.situation, steps: pictures.steps }}
        gainPictures={pictures.gains}
      />
    </>
  );
}
