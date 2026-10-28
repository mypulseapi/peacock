import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import { ReturnsChain } from "@/components/designed/product/chapter-art";
import { productPictures } from "@/components/designed/product/product-pictures";
import { PageSchema } from "@/components/PageSchema";
import {
  returnVerification,
  returnVerificationPictureAlt,
} from "@/content/pages/return-verification";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = returnVerification(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/return-verification"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = returnVerification(locale);
  const pictures = productPictures(
    "return-verification",
    returnVerificationPictureAlt(locale),
  );
  return (
    <>
      {/* Headings are the questions a merchant asks, and each answer leads with a complete
          sentence, so an answer engine can lift and attribute one on its own. */}
      <PageSchema
        locale={locale}
        path="/product/return-verification"
        nodes={[storyFaqSchema(c)]}
      />
      {/* The owner's mockup of 26 Oct 2026: hero A, sections C. See chapters.tsx. The situation, step
          and gain pictures are the owner's (28 Oct 2026, product-pictures.tsx). */}
      <ChapterPage
        c={c}
        chain={<ReturnsChain l={c.art} />}
        art={{ situation: pictures.situation, steps: pictures.steps }}
        gainPictures={pictures.gains}
      />
    </>
  );
}
