import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { UseCasePage } from "@/components/designed/use-cases/use-case-page";
import { TwoPlans } from "@/components/designed/use-cases/charts";
import { TTM_GETS, TTM_STEPS, TtmHero, TtmSituation } from "@/components/designed/use-cases/drawings";
import { ui } from "@/content/locale";
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
  const t = ui(locale);
  return (
    <>
      <PageSchema locale={locale} path="/use-cases/time-to-market" nodes={[storyFaqSchema(timeToMarket(locale))]} />
      <UseCasePage
        c={timeToMarket(locale)}
        figure={
          <TwoPlans
            title={t.twoPlans}
            badge={t.beforeLaunch}
            note={t.twoPlansNote}
            plans={[
              { label: t.fullEnrichment, fields: 86, caption: t.nFields(86) },
              { label: t.minimumSet, fields: 9, caption: t.nFields(9) },
            ]}
          />
        }
        art={{ hero: <TtmHero />, situation: <TtmSituation />, steps: TTM_STEPS, gets: TTM_GETS }}
      />
    </>
  );
}
