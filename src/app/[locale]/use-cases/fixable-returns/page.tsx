import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import { ChapterPage } from "@/components/designed/product/chapters";
import { UseCaseScene } from "@/components/designed/use-cases/charts";
import { productPictures } from "@/components/designed/product/product-pictures";
import {
  SolutionHero,
  ReturnsPanel,
} from "@/components/designed/use-cases/solution-art";
import {
  fixableReturns,
  fixableReturnsPictureAlt,
} from "@/content/pages/fixable-returns";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = fixableReturns(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/use-cases/fixable-returns"),
  };
}

/** The products the steps use, in order; each opens its own page. */
const PRODUCTS = [
  "/product/decision-audit",
  "/product/return-verification",
  "/product/decision-verification",
  "/product/decision-api",
];

/**
 * A solution: a goal, and the products that reach it in order. On the product pages' template (owner's
 * pick B, 29 Oct 2026), every section as before: the hero shows the products as links, the steps link
 * each product, and the step and gain pictures are the product pages' own, three made for these pages.
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = fixableReturns(locale);
  const pictures = productPictures(
    "fixable-returns",
    fixableReturnsPictureAlt(locale),
  );
  const hero = c.scenes?.hero;
  return (
    <>
      <PageSchema
        locale={locale}
        path="/use-cases/fixable-returns"
        nodes={[storyFaqSchema(c)]}
      />
      <ChapterPage
        c={c}
        figure={
          <SolutionHero
            panel={<ReturnsPanel l={c.art} />}
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
          steps: pictures.steps,
        }}
        output={{ panel: <UseCaseScene spec={c.scenes?.chain} />, bare: true }}
        stepHrefs={PRODUCTS}
        gainPictures={pictures.gains}
      />
    </>
  );
}
