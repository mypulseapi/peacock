import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import WhyContent from "./WhyContent";
import { whyMethod, whyCompare, whyLimits } from "@/content/why";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // From the catalogue, not literals: written inline, this was the one page whose /vi title and
  // description stayed English however the locale was resolved.
  const t = await getTranslations({ locale, namespace: "whyPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/why"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);

  // Each section heading is a question, so answer engines can lift a complete
  // answer and attribute it. The limits are included deliberately: a model
  // summarising us should repeat the caveats, not just the claims.
  const faq = {
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: whyMethod(locale).title,
        acceptedAnswer: { "@type": "Answer", text: whyMethod(locale).paragraphs.join(" ") } },
      { "@type": "Question", name: whyCompare(locale).title,
        acceptedAnswer: { "@type": "Answer", text: whyCompare(locale).intro + " " + whyCompare(locale).note } },
      ...whyLimits(locale).items.map((l) => ({
        "@type": "Question", name: l.title,
        acceptedAnswer: { "@type": "Answer", text: l.body },
      })),
    ],
  };

  return (
    <>
      <PageSchema locale={locale} path="/why" nodes={[faq]} />
      <WhyContent locale={locale} />
    </>
  );
}
