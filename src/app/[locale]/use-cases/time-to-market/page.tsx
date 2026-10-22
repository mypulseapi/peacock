import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { TimeToMarketVisual } from "@/components/StoryVisual";
import { timeToMarket } from "@/content/pages/time-to-market";

interface PageProps { params: Promise<{ locale: string }> }


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Was a hardcoded English title and description, so /vi shipped
  // English metadata. Reads the locale's own copy now.
  const c = timeToMarket(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/use-cases/time-to-market"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return (
    <>
      <PageSchema locale={locale} path="/use-cases/time-to-market" nodes={[storyFaqSchema(timeToMarket(locale))]} />
      <StoryPage layout={{ steps: "rail", gets: "grid", limits: "ledger" }} visual={<TimeToMarketVisual />} c={timeToMarket(locale)} />
    </>
  );
}
