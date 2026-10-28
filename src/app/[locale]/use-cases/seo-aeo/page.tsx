import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { UseCasePage } from "@/components/designed/use-cases/use-case-page";
import { SchemaBands } from "@/components/designed/use-cases/charts";
import { seoAeoPictures } from "@/components/designed/use-cases/pictures";
import { ui } from "@/content/locale";
import { seoAeo, seoAeoPictureAlt } from "@/content/pages/seo-aeo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = seoAeo(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/use-cases/seo-aeo"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = ui(locale);
  return (
    <>
      {/* The questions on this page are the ones people type about AEO, so the
          FAQPage schema here is doing double duty: it is the thing an answer
          engine lifts, on a page about being liftable. */}
      <PageSchema
        locale={locale}
        path="/use-cases/seo-aeo"
        nodes={[storyFaqSchema(seoAeo(locale))]}
      />
      <UseCasePage
        c={seoAeo(locale)}
        figure={
          <SchemaBands
            title={t.schemaCeiling}
            badge={t.products216}
            note={t.schemaNote}
            bands={[
              { label: t.markedUp, pct: 21 },
              { label: t.heldNotExpressed, pct: 42 },
              { label: t.neverRecorded, pct: 37 },
            ]}
          />
        }
        art={seoAeoPictures(seoAeoPictureAlt(locale))}
      />
    </>
  );
}
