import { DEFAULT_LOCALE } from "@/i18n/locales";
import { RedirectDocument } from "@/components/RedirectDocument";

/**
 * `thepulseapi.com/opensource`, the address people will type and link to. Every real page lives
 * under a locale, so this resolves to the default locale's page the same way `/` does.
 */
export default function OpensourceRedirect() {
  return <RedirectDocument target={`/${DEFAULT_LOCALE}/opensource`} />;
}
