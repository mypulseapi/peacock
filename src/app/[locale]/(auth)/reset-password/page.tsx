import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { Suspense } from "react";
import { AuthShell } from "../AuthShell";
import { ResetPasswordForm } from "./ResetPasswordForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth.reset" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/reset-password"),
    // Auth screens have nothing to rank for, and an indexed password-reset page is a small gift to
    // anyone scraping for live endpoints.
    //
    // `follow: true` rather than nofollow, per the standard's section 2.4: the page should still
    // pass link equity onward to the footer and navigation it links to. Keeping it out of the
    // index is the goal; stranding the links it contains is collateral.
    robots: { index: false, follow: true },
  };
}


/*
 * The Suspense fallback is the page's heading, not nothing.
 *
 * This form reads the token from the query string with `useSearchParams`, which makes Next bail
 * out of prerendering the subtree and emit the fallback into the static HTML instead. With no
 * fallback that is an empty document: no <h1>, and a visitor arriving from their email sees a
 * blank panel until hydration finishes.
 *
 * Rendering the shell with the real title fixes both. The form itself still waits for the client,
 * because only the client knows the token.
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = await getTranslations("auth.reset");

  return (
    <Suspense fallback={<AuthShell title={t("title")} subtitle={t("subtitle")} />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
