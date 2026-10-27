"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The language switch: plain flags, no capsule, no motion (owner, 27 Oct 2026, the third version
 * that day, after a flag toggle and then flag segments in a pill). On a wide screen both flags sit in
 * the bar and the other language's flag is the link; on a phone a small dropdown sits beside the
 * menu button. Vietnamese first, the owner's order, and the site's default; English is the UK flag.
 *
 * Languages come from `i18n/locales.ts`. The current one is passed in from the header's
 * `renderLocale()`, not read from the path, which can carry `.html` or be null in prerender.
 *
 * The href swaps the first path segment here rather than using next-intl's `Link locale=`, which
 * rendered an `<a>` with no `href` in the static export. A plain `<a>`, so switching is a full page
 * load: a client navigation remounts `<html>` and React strips the `data-theme` the theme script sets.
 */
function useLocaleLinks(current: string) {
  // `usePathname` can be null before the router is ready; the locale root is still a working link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const hrefFor = (code: string) =>
    isLocale(first) ? pathname.replace(/^\/[^/]+/, `/${code}`) : `/${code}`;
  const ordered = [...LOCALES].reverse(); // VI, EN
  return { ordered, hrefFor, currentMeta: ordered.find((l) => l.code === current) ?? ordered[0] };
}

function Flag({ code, className = "size-5" }: { code: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 ${className}`}
    >
      {code === "vi" ? <FlagVN /> : <FlagUK />}
    </span>
  );
}

/** Wide screens: both flags; the current one is marked, the other changes the language. */
export function DesignedLocaleSwitch({
  heading,
  current,
}: {
  heading: string;
  current: string;
}) {
  const { ordered, hrefFor } = useLocaleLinks(current);
  return (
    <nav aria-label={heading} data-locale-switch className="flex shrink-0 items-center gap-2">
      {ordered.map((l) =>
        l.code === current ? (
          <span key={l.code} aria-current="true" title={l.label} className="p-1">
            <Flag code={l.code} />
            <span className="sr-only">{l.label}</span>
          </span>
        ) : (
          <a
            key={l.code}
            href={hrefFor(l.code)}
            hrefLang={l.tag}
            lang={l.tag}
            title={l.label}
            aria-label={l.label}
            className="hit-area rounded-full p-1 opacity-50 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <Flag code={l.code} />
          </a>
        ),
      )}
    </nav>
  );
}

/** Phones: the current flag beside the menu button, opening a short list of languages. */
export function DesignedLocaleMenu({
  heading,
  current,
}: {
  heading: string;
  current: string;
}) {
  const { ordered, hrefFor, currentMeta } = useLocaleLinks(current);
  return (
    <details className="group relative" data-locale-menu>
      <summary
        className="hit-area flex h-9 cursor-pointer list-none items-center gap-1 rounded-control px-1.5 text-ink [&::-webkit-details-marker]:hidden"
        aria-label={`${heading}: ${currentMeta.label}`}
      >
        <Flag code={currentMeta.code} />
        <svg className="size-3.5 text-muted" aria-hidden="true">
          <use href="#i-chevron-down" />
        </svg>
      </summary>
      <ul className="absolute right-0 top-full z-50 mt-1 min-w-40 rounded-control border border-line bg-card p-1 shadow-md">
        {ordered.map((l) => (
          <li key={l.code}>
            <a
              href={hrefFor(l.code)}
              hrefLang={l.tag}
              lang={l.tag}
              aria-current={l.code === current ? "true" : undefined}
              className="flex items-center gap-2 rounded-control px-2.5 py-2 text-sm text-ink hover:bg-surface-1 aria-[current=true]:font-semibold"
            >
              <Flag code={l.code} className="size-4" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/** Viet Nam: the red field and the gold star, centred. */
function FlagVN() {
  return (
    <svg
      viewBox="0 0 30 20"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <rect width="30" height="20" fill="#DA251D" />
      <path
        fill="#FFFF00"
        d="M15 4.2l1.35 4.15h4.36l-3.53 2.56 1.35 4.15L15 12.5l-3.53 2.56 1.35-4.15-3.53-2.56h4.36z"
      />
    </svg>
  );
}

/** The United Kingdom: the Union Flag, its diagonals offset as the real one draws them. */
function FlagUK() {
  // Two switches render (the bar and the mobile sheet), so the clip-path ids must differ.
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <clipPath id={`${id}s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${id}t)`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
