import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { CatalogueTestPage } from "@/components/designed/catalogue-test";
import { designedText } from "@/components/designed/t";
import { buildAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = designedText("catalogueTest.meta");
  return {
    title: t("title"),
    description: t("description"),
    // The canonical has no query string: ?id= results are the visitor's, not pages to index.
    alternates: buildAlternates(locale, "/test-my-catalogue"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      <PageSchema locale={locale} path="/test-my-catalogue" nodes={[]} />
      <CatalogueTestPage />
    </>
  );
}
