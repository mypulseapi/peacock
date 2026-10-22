import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { SignInForm } from "./SignInForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth.signIn" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/signin"),
    // Auth screens have nothing to rank for, and an indexed password-reset page is a small gift to
    // anyone scraping for live endpoints.
    //
    // `follow: true` rather than nofollow, per the standard's section 2.4: the page should still
    // pass link equity onward to the footer and navigation it links to. Keeping it out of the
    // index is the goal; stranding the links it contains is collateral.
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return <SignInForm />;
}
