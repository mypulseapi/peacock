import { getTranslations } from "next-intl/server";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { AuthShell } from "./AuthShell";

/**
 * Where the website's auth pages went: merchants sign in, create an account and reset a password in
 * the dashboard since merchant sign-in F1 (rainbow `ODIN/design/01-auth/02-merchant-sign-in/task.md`,
 * FR-15). `/signin`, `/signup`, `/forgot-password`, `/reset-password` and `/verify-email` stay, so old
 * links, bookmarks and emails still arrive somewhere that works.
 *
 * A static export cannot send a 301, so this is a meta refresh for crawlers (React hoists it into the
 * head), `location.replace` for a browser, keeping the query (a reset link's `?token=`) and leaving no
 * history entry, and a visible link for everyone else.
 */
export async function RedirectToSignIn({
  locale,
  target,
}: {
  locale: string;
  target: string;
}) {
  prepareLocale(locale);
  const t = await getTranslations("auth.entry");
  const join = target.includes("?") ? "&" : "?";

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)} + location.search.replace(/^\\?/, ${JSON.stringify(join)}).replace(/^[?&]$/, ""))`,
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

/** The same metadata for all of them: not indexed, and titled as the page they now are. */
export async function redirectMetadata(locale: string, path: string) {
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth.entry" });
  return {
    title: t("title"),
    alternates: buildAlternates(locale, path),
    robots: { index: false, follow: true },
  };
}
