import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LOCALE_CODES, DEFAULT_LOCALE } from "./locales";

export const routing = defineRouting({
  // Derived from the registry in ./locales, which is the only place a
  // language is declared.
  locales: LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  // Zero-cookie policy: locale lives in the URL, so don't set the NEXT_LOCALE
  // cookie and don't sniff Accept-Language (which triggers cookie persistence).
  localeCookie: false,
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
