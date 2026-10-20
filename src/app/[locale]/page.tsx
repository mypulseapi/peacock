import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { DesignedHome } from "@/components/designed/home";
import { buildAlternates } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ExamplesBand } from "@/components/home/ExamplesBand";
import { ReasonsSection } from "@/components/home/ReasonsSection";
import { ProofSection } from "@/components/home/ProofSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { MarketSection } from "@/components/home/MarketSection";
import { MidCtaSection } from "@/components/home/MidCtaSection";
import { DisagreementSection } from "@/components/home/DisagreementSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PrivacySection } from "@/components/home/PrivacySection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // This returned only `alternates`, so title and description fell through to
  // the root layout's static English metadata and /vi was indexed under an
  // English title with an English description. Every other page localises its
  // own; the homepage was the one that did not.
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/"),
  };
}

/*
 * The Vietnamese home page, which is still the old composition.
 *
 * `DesignedHome` is the designer's markup converted from afedfc1, and that page is English only:
 * `lang="en"`, no /vi tree, no translated copy. Rendering it under /vi would put English back on
 * a Vietnamese page, which is the exact fault that was fixed two releases ago and is worse than a
 * layout that does not match yet.
 *
 * So English gets the designer's design today and Vietnamese keeps working translated content.
 * They converge when the conversion's text has been extracted and translated, which is the next
 * piece of work rather than a thing to leave implied.
 */
function VietnameseHome({ locale }: { locale: string }) {
  return (
    <>
      <HeroSection locale={locale} />
      <ExamplesBand locale={locale} />
      <ProofSection />
      <ProblemSection />
      <MarketSection />
      <DisagreementSection />
      <MidCtaSection />
      <HowItWorksSection />
      <ReasonsSection locale={locale} />
      <PrivacySection />
      <FinalCtaSection locale={locale} />
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Static rendering, and the locale the graph below declares. See [locale]/terms/page.tsx.
  setRequestLocale(locale);
  const jsonLd = {
    "@type": "SoftwareApplication",
    name: "Pulse",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Pulse measures whether a merchant's product data is ready to support the buying decisions shoppers are trying to make, then reads the live session to decide what to show, and when one more question is worth asking. No cookies, no login, nothing personal stored.",
    featureList: [
      "Decision Audit, attributes ranked by decision-information gap",
      "Attribute extraction from unstructured product text",
      "Real-time session inference with calibrated distributions",
      "Value-of-information question selection",
      "Catalogue ranking against inferred need",
      "No cookies, no login required",
    ],
  };
  // ponytail: no `offers` in the JSON-LD, pricing is negotiated per pilot, and a
  // hardcoded price here would be the one uplift-style claim we cannot support.

  return (
    <>
      <PageSchema locale={locale} nodes={[jsonLd]} />
      {/* Clears the fixed legacy navbar, and only that one. The designer's header is sticky and
          takes its own space, so on the designed pages this spacer was 68px of empty gradient
          between the header and the hero -- the one element on the home page that did not match
          the reference build. */}
      {locale === "en" ? (
        <DesignedHome />
      ) : (
        <>
          <div className="h-[68px]" aria-hidden />
          <VietnameseHome locale={locale} />
        </>
      )}
    </>
  );
}
