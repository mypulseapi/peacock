"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The language switch: a globe, the current code and a chevron, opening a short list (owner,
 * 27 Oct 2026, after flags). A code rather than a flag: a flag names a country, not a language.
 * The same dropdown on every width; on a phone it sits beside the menu button. Vietnamese first,
 * the owner's order, and the site's default.
 *
 * Languages come from `i18n/locales.ts`. The current one is passed in from the header's
 * `renderLocale()`, not read from the path, which can carry `.html` or be null in prerender.
 *
 * The href swaps the first path segment here rather than using next-intl's `Link locale=`, which
 * rendered an `<a>` with no `href` in the static export. A plain `<a>`, so switching is a full page
 * load: a client navigation remounts `<html>` and React strips the `data-theme` the theme script sets.
 */
export function DesignedLocaleMenu({
  heading,
  current,
}: {
  heading: string;
  current: string;
}) {
  // `usePathname` can be null before the router is ready; the locale root is still a working link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const hrefFor = (code: string) =>
    isLocale(first) ? pathname.replace(/^\/[^/]+/, `/${code}`) : `/${code}`;
  const ordered = [...LOCALES].reverse(); // VI, EN
  const now = ordered.find((l) => l.code === current) ?? ordered[0];
  // Each language's name in the other language, so a reader of either recognises both.
  // ponytail: "the other" assumes two locales; with a third, name it in the page's language.
  const otherName = (code: string) =>
    new Intl.DisplayNames([ordered.find((l) => l.code !== code)!.tag], {
      type: "language",
    }).of(code);
  // `<details>` does not close on its own when the visitor clicks elsewhere or presses Escape.
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (e: Event) => {
      const el = ref.current;
      if (
        el?.open &&
        (e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !el.contains(e.target as Node))
      )
        el.open = false;
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <details ref={ref} className="group relative" data-locale-menu>
      <summary
        className="hit-area flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-control px-2 text-nav font-medium text-ink hover:bg-surface-1 [&::-webkit-details-marker]:hidden"
        aria-label={`${heading}: ${now.label}`}
      >
        <svg className="size-4 text-muted" aria-hidden="true">
          <use href="#i-globe" />
        </svg>
        {now.shortLabel}
        <svg className="size-3.5 text-muted" aria-hidden="true">
          <use href="#i-chevron-down" />
        </svg>
      </summary>
      {/* The nav menus' panel and rows (`designed-header.tsx`), without their entrance motion. */}
      <ul className="absolute top-full right-0 z-50 mt-2 w-64 space-y-1 overflow-hidden rounded-2xl bg-card p-3 shadow-nav">
        {ordered.map((l) => (
          <li key={l.code}>
            <a
              href={hrefFor(l.code)}
              hrefLang={l.tag}
              lang={l.tag}
              aria-current={l.code === current ? "true" : undefined}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
            >
              <span className="nav-icon-tile text-xs font-semibold">
                {l.shortLabel}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink">
                  {l.label}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {otherName(l.code)}
                </span>
              </span>
              {l.code === current && (
                <svg className="size-4 text-primary" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
