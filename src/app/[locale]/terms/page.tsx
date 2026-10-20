import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { buildAlternates } from "@/lib/seo";
import TermsOfServicePage from "./TermsPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/terms"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  // Static rendering. Without this next-intl resolves the locale from `headers()`, and
  // `output: "export"` has no request to read: the page fails to prerender with
  // `dynamic = "error"`. Calling it in `generateMetadata` alone is not enough -- that runs in
  // its own scope, so the page body still falls back to the dynamic path.
  setRequestLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/terms" />
      <TermsOfServicePage />
    </>
  );
}
