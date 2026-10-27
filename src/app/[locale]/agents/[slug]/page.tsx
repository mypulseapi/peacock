import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prepareLocale } from "@/i18n/render-locale";
import { forEachLocale } from "@/i18n/locales";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { ChapterPage } from "@/components/designed/product/chapters";
import { AgentDemo } from "@/components/designed/agents/demo";
import { agentPictures } from "@/components/designed/agents/pictures";
import {
  AgentGets,
  AgentPipeline,
} from "@/components/designed/agents/sections";
import { PageSchema } from "@/components/PageSchema";
import { AGENT_SLUGS, agentPage, type AgentSlug } from "@/content/pages/agents";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const isAgent = (s: string): s is AgentSlug =>
  (AGENT_SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return forEachLocale(AGENT_SLUGS.map((slug) => ({ slug })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAgent(slug)) return {};
  const c = agentPage(locale, slug);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, `/agents/${slug}`),
  };
}

/**
 * The "For AI agents" pages, on the product pages' chapters (owner's layout A, 27 Oct 2026): the worked
 * example as the hero, the situation, How it works as the call's pipeline and the worked example beside
 * the gains (`designed/agents/sections.tsx`), then before and after on a slider. The pictures are the
 * owner's generated set (`designed/agents/pictures.tsx`).
 */
export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isAgent(slug)) notFound();
  prepareLocale(locale);
  const c = agentPage(locale, slug);
  const art = agentPictures(slug, c.pictureAlt);
  return (
    <>
      <PageSchema
        locale={locale}
        path={`/agents/${slug}`}
        nodes={[storyFaqSchema(c)]}
      />
      <ChapterPage
        c={c}
        figure={<AgentDemo c={c} />}
        art={{ situation: art.situation }}
        howItWorks={<AgentPipeline c={c} />}
        whatYouGet={<AgentGets c={c} />}
        beforeAfter={{ before: art.before, after: art.after }}
      />
    </>
  );
}
