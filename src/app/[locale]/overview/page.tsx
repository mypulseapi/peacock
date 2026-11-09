import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { designedText } from "@/components/designed/t";
import { PageSchema } from "@/components/PageSchema";
import { DesignedHome } from "@/components/designed/home";
import { buildAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // This returned only `alternates`, so title and description fell through to
  // the root layout's static English metadata and /vi was indexed under an
  // English title with an English description. Every other page localises its
  // own; the homepage was the one that did not.
  // The page that was the homepage until 2026-11-04, when Test My Catalogue took `/` (owner).
  prepareLocale(locale);
  const t = designedText("overview.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/overview"),
  };
}

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Static rendering, and the locale the graph below declares. See [locale]/terms/page.tsx.
  prepareLocale(locale);
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
  // ponytail: no `offers` in the JSON-LD; the plans and their USD prices live on /pricing
  // (rainbow ODIN/product/PRICING.md §3.7), and a second copy here would drift from it.

  return (
    <>
      <PageSchema locale={locale} path="/overview" nodes={[jsonLd]} />
      {/* The 68px spacer that used to sit here cleared the fixed legacy navbar. The designer's
          header is sticky and takes its own space, so with both locales on the designed shell
          there is no navbar to clear and the spacer would be 68px of empty gradient. */}
      <DesignedHome />
    </>
  );
}
