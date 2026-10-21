"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The designer's language menu, with every language in it.
 *
 * The converted markup listed English alone, with a comment saying Vietnamese would be added
 * back "when the Vietnamese page exists". It exists now, and until this was fixed the menu
 * offered a visitor on `/vi` exactly one choice: the language they were already reading.
 *
 * Languages come from `i18n/locales.ts` rather than being written out here, which is the same
 * rule `LanguageSwitcher` follows: a second hand-kept copy of the list is how a locale ends up
 * routing and rendering but never appearing in the menu.
 *
 * A client component, for the one thing the server cannot do: read the path, so that switching
 * language keeps you on the page you were reading instead of returning you to the home page.
 *
 * The href is built here rather than handed to next-intl's `Link locale=`. That version
 * rendered an `<a>` with no `href` at all in the export, because next-intl's `usePathname`
 * has nothing to resolve during a static prerender, which made the link dead for crawlers and
 * for anyone whose JavaScript had not arrived. Swapping the first path segment needs no
 * request, so it survives prerendering.
 *
 * The `<details>` wrapper, the classes and the icon references are the designer's, unchanged,
 * so this looks identical to the menu it replaces.
 */
export function DesignedLocaleSwitch({ heading }: { heading: string }) {
  // `usePathname` can be null before the router is ready; the locale root is the honest
  // fallback, and it is still a working link rather than no link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const active = isLocale(first) ? first : LOCALES[0].code;
  const current = LOCALES.find((l) => l.code === active) ?? LOCALES[0];
  /** The same page, addressed in another language. */
  const hrefFor = (code: string) =>
    isLocale(first) ? pathname.replace(/^\/[^/]+/, `/${code}`) : `/${code}`;

  return (
    <div className="relative">
      <details className="group" data-dropdown>
        <summary
          className="hit-area flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-ink"
          aria-label={`${current.shortLabel}, ${heading.toLowerCase()}`}
        >
          <svg className="size-4 text-primary" aria-hidden="true">
            <use href="#i-globe" />
          </svg>
          {current.shortLabel}
          <svg
            className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
            aria-hidden="true"
          >
            <use href="#i-chevron-down" />
          </svg>
        </summary>
        <div
          data-panel
          className="absolute top-full right-0 mt-2 w-44 animate-dropdown rounded-2xl border border-line bg-card p-1.5 shadow-xl motion-reduce:animate-none"
        >
          <p className="border-b border-line px-3 py-2 text-label font-medium text-muted uppercase">
            {heading}
          </p>
          {LOCALES.map((l) =>
            l.code === active ? (
              <span
                key={l.code}
                aria-current="true"
                className="mt-1 flex min-h-11 items-center gap-3 rounded-control bg-primary-tint px-3 py-2.5 text-sm font-medium text-primary"
              >
                <span aria-hidden="true">{l.flag}</span> {l.label}
                <svg className="ml-auto size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
            ) : (
              <Link
                key={l.code}
                href={hrefFor(l.code)}
                hrefLang={l.tag}
                lang={l.tag}
                className="mt-1 flex min-h-11 items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:bg-surface-1"
              >
                <span aria-hidden="true">{l.flag}</span> {l.label}
              </Link>
            ),
          )}
        </div>
      </details>
    </div>
  );
}
