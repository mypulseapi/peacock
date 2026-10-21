import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { DesignedDecisionAudit } from "@/components/designed/product/decision-audit";
import { decisionAudit } from "@/content/pages/decision-audit";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = decisionAudit(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/decision-audit"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {/* Headings on this page are the questions a merchant types, and the
          answers lead with a complete sentence, so an answer engine can lift and
          attribute one without the surrounding page. */}
      <PageSchema locale={locale} path="/product/decision-audit" nodes={[storyFaqSchema(decisionAudit(locale))]} />
      {/* English gets the designer's converted page; Vietnamese keeps the translated one until
          that conversion's text has been extracted and translated. See [locale]/page.tsx. */}
      <DesignedDecisionAudit />
    </>
  );
}
