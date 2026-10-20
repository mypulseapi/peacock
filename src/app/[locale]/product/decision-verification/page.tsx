import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { VerificationVisual } from "@/components/StoryVisual";
import { ProofScene, ProofPathScene, FilledNotProvenScene } from "@/components/home/VerifyScenes";
import { decisionVerification } from "@/content/pages/decision-verification";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = decisionVerification(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/product/decision-verification"),
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
      <PageSchema locale={locale} path="/product/decision-verification" nodes={[storyFaqSchema(decisionVerification(locale))]} />
      <StoryPage layout={{ steps: "rail", gets: "showcase", limits: "ledger" }} visual={<VerificationVisual />} heroVisual={<ProofScene />} chainVisual={<ProofPathScene />} situationVisual={<FilledNotProvenScene />} c={decisionVerification(locale)} />
    </>
  );
}
