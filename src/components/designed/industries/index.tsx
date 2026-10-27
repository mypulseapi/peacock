/**
 * The six sector pages, keyed by slug: one shared page (`sector-page.tsx`) and what each sector does
 * differently (`sectors.tsx`), since 27 Oct 2026; they were six converted copies of one design.
 *
 * `/industries/[slug]` is one route serving six designed pages, so the mapping lives here rather
 * than as six imports in the route file. A slug with no designed page falls through to the
 * existing content, which is what makes adding a seventh sector a content change rather than a
 * code change.
 */
import { SectorPage } from "./sector-page";
import { SECTORS } from "./sectors";

/*
 * The map holds ELEMENTS, not components.
 *
 * Returning a component means the route assigns it to a local and renders `<Designed />`, which
 * `react-hooks`'s "Cannot create components during render" rule flags and cannot tell is stable.
 * Returning the element sidesteps that honestly rather than by disabling the rule, and the call
 * site reads better for it.
 */
const BY_SLUG: Record<string, React.JSX.Element> = Object.fromEntries(
  Object.entries(SECTORS).map(([slug, sector]) => [
    slug,
    <SectorPage key={slug} s={sector} />,
  ]),
);

/** The designed page for a sector, or null where there is not one yet. */
export function designedSector(slug: string): React.JSX.Element | null {
  return BY_SLUG[slug] ?? null;
}
