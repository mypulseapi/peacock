import { notFound } from "next/navigation";
import { prepareLocale } from "@/i18n/render-locale";
import { forEachLocale } from "@/i18n/locales";
import {
  CatalogueTestPage,
  HOME_VARIANTS,
  type HomeVariant,
} from "@/components/designed/catalogue-test";

/**
 * Three more layouts of the homepage, for the owner to compare (2026-11-26). Deliberately
 * `noindex`: the same content as `/`. Delete this route once one is chosen.
 */
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return forEachLocale(HOME_VARIANTS.map((v) => ({ v })));
}

export default async function HomeVariantPage({
  params,
}: {
  params: Promise<{ locale: string; v: string }>;
}) {
  const { locale, v } = await params;
  prepareLocale(locale);
  if (!(HOME_VARIANTS as readonly string[]).includes(v)) notFound();
  return <CatalogueTestPage variant={v as HomeVariant} />;
}
