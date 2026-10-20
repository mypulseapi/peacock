import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { DriftScene, ThreeCausesScene, DecayCostScene } from "@/components/home/MonitorScenes";
import { decisionMonitor } from "@/content/pages/decision-monitor";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = decisionMonitor(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/decision-monitor"),
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
      <PageSchema locale={locale} path="/product/decision-monitor" nodes={[storyFaqSchema(decisionMonitor(locale))]} />
      <StoryPage layout={{ steps: "timeline", gets: "showcase", limits: "ledger" }} heroVisual={<DriftScene />} situationVisual={<ThreeCausesScene />} chainVisual={<DecayCostScene />} c={decisionMonitor(locale)} />
    </>
  );
}
