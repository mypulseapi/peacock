import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { CatalogueTestPage } from "@/components/designed/catalogue-test";
import { designedText } from "@/components/designed/t";
import { buildAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * The homepage is Test My Catalogue since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test). The page that was here is `/overview`.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  prepareLocale(locale);
  const t = designedText("catalogueTest.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/"),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const jsonLd = {
    "@type": "SoftwareApplication",
    name: "Pulse Test My Catalogue",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Enter a store's address. Pulse reads a sample of its public product pages and tests real buying requirements against them, showing which questions shoppers and AI agents cannot answer.",
    isAccessibleForFree: true,
  };
  return (
    <>
      <PageSchema locale={locale} nodes={[jsonLd]} />
      <CatalogueTestPage />
    </>
  );
}
