import { notFound, redirect } from "next/navigation";
import { PageSchema } from "@/components/PageSchema";
import { designedSector } from "@/components/designed/industries";
import { buildAlternates, fitDescription } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { IndustryPageContent } from "@/components/IndustryPageContent";
import { sector, sectorSlugs, RETIRED_SECTOR_SLUGS } from "@/content/industries";
import { forEachLocale } from "@/i18n/locales";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return forEachLocale(sectorSlugs.map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const s = sector(locale, slug);
  if (!s) return {};

  // Title and description come from the sector's own copy rather than a shared
  // template, so six pages do not ship six variations of one meta description.
  //
  // `metaTitle` is the compressed form: `${name}: ${tagline}` reached 128 characters in
  // Vietnamese, and the hero lede runs past 260, both well beyond what a SERP shows. The page
  // still displays the full tagline and the full lede.
  const title = s.metaTitle ?? `${s.name}: ${s.tagline}`;
  return {
    title,
    description: fitDescription("", s.heroLede),
    alternates: buildAlternates(locale, `/industries/${slug}`),
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  // The ten-sector set was in the sitemap, so the five that were retired and the
  // one that was renamed send visitors to the index instead of a 404.
  if (RETIRED_SECTOR_SLUGS.includes(slug)) redirect(`/${locale}/industries`);

  /*
   * A sector needs an entry in `sectors`, and nothing else.
   *
   * This used to also require a `SECTOR_STORIES` entry, which only the original
   * channel-based slugs ever had. When !137 moved Templates to product
   * categories, fmcg, technology, furniture and cosmetics each got a sector but
   * no story, so every one of them called notFound() and rendered nothing but
   * the header and footer. The sections that read the story were removed in the
   * same round of review changes, so the requirement went with them.
   */
  const s = sector(locale, slug);
  if (!s) notFound();

  // An element, not a component: see the note in components/designed/industries.
  const designed = locale === "en" ? designedSector(slug) : null;

  return (
    <>
      <PageSchema
        locale={locale}
        path={`/industries/${slug}`}
        leaf={sector(locale, slug)?.name ?? slug}
      />
      {/* English gets the designer's converted sector page where one exists; Vietnamese keeps
          the translated one, as everywhere else. See [locale]/page.tsx. */}
      {designed ?? <IndustryPageContent slug={slug} />}
    </>
  );
}
