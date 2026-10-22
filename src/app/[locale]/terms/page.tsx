import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { DesignedTerms } from "@/components/designed/terms";
import { buildAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms.meta" });

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
  prepareLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/terms" />
      {/* English gets the designer's converted page; Vietnamese keeps the translated one until
          that conversion's text has been extracted and translated. See [locale]/page.tsx. */}
      <DesignedTerms />
    </>
  );
}
