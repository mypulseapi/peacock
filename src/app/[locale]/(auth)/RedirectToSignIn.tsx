import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { AuthShell } from "./AuthShell";

/**
 * Where the retired password pages went (website sign-in AC-08): `/signup`, `/forgot-password`,
 * `/reset-password` and `/verify-email` now land on the one sign-in page, so old links, bookmarks
 * and emails still arrive somewhere that works.
 *
 * A static export cannot send a 301, so this is `src/app/page.tsx`'s redirect inside the locale
 * layout: a meta refresh for crawlers (React hoists it into the head), `location.replace` for a
 * browser, keeping `?redirect=` and leaving no history entry, and a visible link for everyone else.
 */
export async function RedirectToSignIn({ locale }: { locale: string }) {
  prepareLocale(locale);
  const t = await getTranslations("auth.entry");
  const target = `/${locale}/signin`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)} + location.search + location.hash)`,
        }}
      />
      <AuthShell title={t("title")}>
        <a href={target} className="btn-primary w-full justify-center">
          {t("title")}
        </a>
      </AuthShell>
    </>
  );
}

/** The same metadata for all four: not indexed, and titled as the page they now are. */
export async function redirectMetadata(locale: string, path: string) {
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth.entry" });
  return {
    title: t("title"),
    alternates: buildAlternates(locale, path),
    robots: { index: false, follow: true },
  };
}
