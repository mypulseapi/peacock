import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { DesignedHome } from "@/components/designed/home";
import { buildAlternates } from "@/lib/seo";

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
      {/* The 68px spacer that used to sit here cleared the fixed legacy navbar. The designer's
          header is sticky and takes its own space, so with both locales on the designed shell
          there is no navbar to clear and the spacer would be 68px of empty gradient. */}
      <DesignedHome />
    </>
  );
}
