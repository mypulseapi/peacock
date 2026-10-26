"use client";

import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The two languages side by side, "VI | EN" (owner, 26 Oct 2026). With two languages a menu was a
 * click to see one other choice; now both are on the bar, and the current one is marked.
 *
 * Languages come from `i18n/locales.ts` rather than being written out here: a second hand-kept copy
 * of the list is how a locale ends up routing and rendering but never appearing in the switch.
 * Shown Vietnamese first, the owner's order.
 *
 * A client component, for the one thing the server cannot do: read the path, so that switching
 * language keeps you on the page you were reading instead of returning you to the home page.
 *
 * The href is built here rather than handed to next-intl's `Link locale=`. That version rendered
 * an `<a>` with no `href` at all in the export, because next-intl's `usePathname` has nothing to
 * resolve during a static prerender, which made the link dead for crawlers and for anyone whose
 * JavaScript had not arrived. Swapping the first path segment needs no request, so it survives
 * prerendering.
 *
 * ponytail: a plain `<a>`, not `next/link`, so switching language is a full page load. The
 * `[locale]` layout renders `<html>`, so a client navigation to another locale remounts it, and
 * React strips every attribute from `<html>` on unmount. That took the `data-theme` and `data-js`
 * the inline theme script stamps: a light-mode visitor on a dark OS saw the page flash dark, then
 * fade back. A full load runs that script before first paint again.
 */
export function DesignedLocaleSwitch({ heading }: { heading: string }) {
  // `usePathname` can be null before the router is ready; the locale root is the honest
  // fallback, and it is still a working link rather than no link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const active = isLocale(first) ? first : LOCALES[0].code;
  /** The same page, addressed in another language. */
  const hrefFor = (code: string) =>
    isLocale(first) ? pathname.replace(/^\/[^/]+/, `/${code}`) : `/${code}`;

  return (
    <nav
      aria-label={heading}
      data-locale-switch
      className="flex h-9 shrink-0 items-center rounded-lg border border-line px-1 text-sm font-medium"
    >
      {[...LOCALES].reverse().map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-line" />
          )}
          {l.code === active ? (
            <span
              aria-current="true"
              lang={l.tag}
              title={l.label}
              className="rounded-md bg-surface-1 px-2.5 py-1 text-ink"
            >
              {l.shortLabel}
            </span>
          ) : (
            <a
              href={hrefFor(l.code)}
              hrefLang={l.tag}
              lang={l.tag}
              title={l.label}
              aria-label={l.label}
              className="hit-area rounded-md px-2.5 py-1 text-muted transition-colors duration-150 ease-out-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              {l.shortLabel}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
