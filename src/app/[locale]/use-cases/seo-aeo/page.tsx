import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { SeoAeoVisual } from "@/components/StoryVisual";
import { seoAeo } from "@/content/pages/seo-aeo";

interface PageProps { params: Promise<{ locale: string }> }


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
  return (
    <>
      {/* The questions on this page are the ones people type about AEO, so the
          FAQPage schema here is doing double duty: it is the thing an answer
          engine lifts, on a page about being liftable. */}
      <PageSchema locale={locale} path="/use-cases/seo-aeo" nodes={[storyFaqSchema(seoAeo(locale))]} />
      <StoryPage layout={{ steps: "timeline", gets: "showcase", limits: "split" }} visual={<SeoAeoVisual />} c={seoAeo(locale)} />
    </>
  );
}
