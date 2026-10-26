import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prepareLocale } from "@/i18n/render-locale";
import { forEachLocale } from "@/i18n/locales";
import { buildAlternates } from "@/lib/seo";
import { StoryPage, storyFaqSchema } from "@/components/StoryPage";
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

/** The "For AI agents" pages: the story template, with a before-and-after for the agent. */
export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isAgent(slug)) notFound();
  prepareLocale(locale);
  const c = agentPage(locale, slug);
  return (
    <>
      <PageSchema
        locale={locale}
        path={`/agents/${slug}`}
        nodes={[storyFaqSchema(c)]}
      />
      <StoryPage
        layout={{ steps: "cards", gets: "showcase", limits: "split" }}
        c={c}
      />
    </>
  );
}
