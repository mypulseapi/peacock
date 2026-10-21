/**
 * The six sector pages, keyed by slug.
 *
 * `/industries/[slug]` is one route serving six designed pages, so the mapping lives here rather
 * than as six imports in the route file. A slug with no designed page falls through to the
 * existing content, which is what makes adding a seventh sector a content change rather than a
 * code change.
 */
import { DesignedEcommerce } from "./ecommerce";
import { DesignedFmcg } from "./fmcg";
import { DesignedTechnology } from "./technology";
import { DesignedFurniture } from "./furniture";
import { DesignedCosmetics } from "./cosmetics";
import { DesignedDistribution } from "./distribution";

/*
 * The map holds ELEMENTS, not components.
 *
 * Returning a component means the route assigns it to a local and renders `<Designed />`, which
 * `react-hooks`'s "Cannot create components during render" rule flags and cannot tell is stable.
 * Returning the element sidesteps that honestly rather than by disabling the rule, and the call
 * site reads better for it.
 */
const BY_SLUG: Record<string, React.JSX.Element> = {
  ecommerce: <DesignedEcommerce />,
  fmcg: <DesignedFmcg />,
  technology: <DesignedTechnology />,
  furniture: <DesignedFurniture />,
  cosmetics: <DesignedCosmetics />,
  distribution: <DesignedDistribution />,
};

/** The designed page for a sector, or null where there is not one yet. */
export function designedSector(slug: string): React.JSX.Element | null {
  return BY_SLUG[slug] ?? null;
}
