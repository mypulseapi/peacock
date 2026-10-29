import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { storyFaqSchema } from "@/components/StoryPage";
import { PageSchema } from "@/components/PageSchema";
import {
  NO_ART,
  UseCasePage,
} from "@/components/designed/use-cases/use-case-page";
import { UseCaseScene } from "@/components/designed/use-cases/charts";
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

/** A solution: a goal, and the products that reach it in order. Pictures follow from the owner. */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = promotionsThatPay(locale);
  return (
    <>
      <PageSchema
        locale={locale}
        path="/use-cases/promotions-that-pay"
        nodes={[storyFaqSchema(c)]}
      />
      <UseCasePage
        c={c}
        figure={<UseCaseScene spec={c.scenes?.chain} />}
        art={NO_ART}
        products={[
          { label: "Promotion Audit", href: "/product/promotion-audit" },
          { label: "Decision API", href: "/product/decision-api" },
          {
            label: "Return Verification",
            href: "/product/return-verification",
          },
        ]}
      />
    </>
  );
}
