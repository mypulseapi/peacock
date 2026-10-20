import { buildGraph, crumbsFor, type Crumb, type GraphNode } from "@/lib/schema";

/**
 * The page's single JSON-LD block.
 *
 * One per page, and the layout emits none: see src/lib/schema.ts for why that matters. Put it
 * anywhere in the page's returned tree; `type="application/ld+json"` is a data block rather than
 * an executed script, so the Content-Security-Policy does not affect it.
 *
 * Breadcrumbs derive from `path` by default, so a page passes its route and gets the trail. A
 * dynamic route passes `leaf` as well, because the last crumb is the item's own title and no
 * static map can hold it.
 */
export function PageSchema({
  locale,
  path = "",
  leaf,
  crumbs,
  nodes = [],
}: {
  locale: string;
  path?: string;
  /** The final crumb's label, for dynamic routes: an industry, a note, a job. */
  leaf?: string;
  /** Overrides the derived trail. Rarely needed. */
  crumbs?: Crumb[];
  /** Page-specific nodes: Article, FAQPage, SoftwareApplication, JobPosting. */
  nodes?: GraphNode[];
}) {
  const graph = buildGraph({
    locale,
    path,
    crumbs: crumbs ?? crumbsFor(locale, path, leaf),
    nodes,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
