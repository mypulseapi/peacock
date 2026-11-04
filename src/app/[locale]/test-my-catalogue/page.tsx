import { prepareLocale } from "@/i18n/render-locale";
import { CatalogueTestPage } from "@/components/designed/catalogue-test";
import { designedText } from "@/components/designed/t";

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
    // Kept for result links already sent (?id=), noindex: the homepage is this page since
    // 2026-11-04, so the canonical is the homepage.
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      <CatalogueTestPage />
    </>
  );
}
