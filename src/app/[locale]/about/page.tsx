import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { DesignedAbout } from "@/components/designed/about";
import { buildAlternates } from "@/lib/seo";
import AboutPage from "./AboutPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/about"),
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
      <PageSchema locale={locale} path="/about" />
      {/* English gets the designer's converted page; Vietnamese keeps the translated one until
          that conversion's text has been extracted and translated. See [locale]/page.tsx. */}
      {locale === "en" ? <DesignedAbout /> : <AboutPage locale={locale} />}
    </>
  );
}
