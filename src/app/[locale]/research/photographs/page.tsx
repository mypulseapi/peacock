import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { PageSchema } from "@/components/PageSchema";
import { DesignedVisualEvidence } from "@/components/designed/visual-evidence";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * The photograph study, one entry of the research hub (`/research`). It lived at /visual-evidence
 * until 2026-10-26, when that address started redirecting to the hub, which covers every product.
 *
 * It existed on the designer's site and never had a route here, which is why it vanished when the
 * Next app replaced the HTML one. It carries the catalogue measurement -- how much of what a
 * catalogue records the photograph already shows -- and twenty-three pages link to it.
 *
 * English only for now, like the other converted pages: the source is `lang="en"` and rendering it
 * under /vi would put English on a Vietnamese page. A Vietnamese reader is redirected to the
 * English copy rather than shown a 404, because the page exists and the alternative is pretending
 * it does not.
 */
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "visualEvidence.meta",
  }).catch(() => null);

  return {
    title: t ? t("title") : "What the photograph already shows",
    description: t
      ? t("description")
      : "Across a 2,176-product catalogue, 52.6% of recorded attribute values duplicate what the product photograph already shows. What that leaves, and what it means for which field to fix.",
    alternates: buildAlternates(locale, "/research/photographs"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/research/photographs" />
      <DesignedVisualEvidence />
    </>
  );
}
