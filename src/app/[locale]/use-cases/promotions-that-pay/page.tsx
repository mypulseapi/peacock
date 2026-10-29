import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { ChapterPage } from "@/components/designed/product/chapters";
import { UseCaseScene } from "@/components/designed/use-cases/charts";
import {
  SolutionHero,
  promotionsArt,
} from "@/components/designed/use-cases/solution-art";
import { promotionsThatPay } from "@/content/pages/promotions-that-pay";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = promotionsThatPay(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/use-cases/promotions-that-pay"),
  };
}

/** The products the steps use, in order; each opens its own page. */
const PRODUCTS = [
  "/product/promotion-audit",
  "/product/decision-api",
  "/product/return-verification",
];

/**
 * A solution: a goal, and the products that reach it in order. On the product pages' template (owner's
 * pick B, 29 Oct 2026), every section as before: the hero shows the products as links, the steps link
 * each product, and the pictures are drawn (`solution-art.tsx`).
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = promotionsThatPay(locale);
  const art = promotionsArt(c.art);
  const hero = c.scenes?.hero;
  return (
    <>
      <PageSchema
        locale={locale}
        path="/use-cases/promotions-that-pay"
        nodes={[storyFaqSchema(c)]}
      />
      <ChapterPage
        c={c}
        figure={
          <SolutionHero
            panel={art.panel}
            note={hero?.kind === "facts" ? hero.note : undefined}
            products={
              hero?.kind === "facts"
                ? hero.facts.map((f, i) => ({
                    label: f.label,
                    note: f.note ?? "",
                    href: PRODUCTS[i],
                  }))
                : []
            }
          />
        }
        art={{
          situation: <UseCaseScene spec={c.scenes?.situation} />,
          situationIsPanel: true,
          steps: art.steps,
        }}
        output={{ panel: <UseCaseScene spec={c.scenes?.chain} />, bare: true }}
        stepHrefs={PRODUCTS}
        gainPictures={art.gains}
      />
    </>
  );
}
