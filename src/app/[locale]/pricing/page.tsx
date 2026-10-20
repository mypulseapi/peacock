import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { buildAlternates } from "@/lib/seo";
import PricingContent from "./PricingContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/pricing"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/pricing" />
      <PricingContent locale={locale} />
    </>
  );
}
