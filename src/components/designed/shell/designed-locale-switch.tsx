"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The language switch as two small segments, "[flag] VI  [flag] EN", in a pill the height and
 * border of the theme switch beside it (owner, 27 Oct 2026, replacing the flag toggle of the same
 * morning, which replaced "VI | EN"). The current language is raised like the theme knob; the other
 * is the link. Vietnamese stays first, the owner's order; English is the UK flag, the owner's choice.
 *
 * Languages come from `i18n/locales.ts` rather than being written out here: a second hand-kept copy
 * of the list is how a locale ends up routing and rendering but never appearing in the switch.
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
 * React strips every attribute from `<html>` on unmount, taking the `data-theme` the inline theme
 * script stamps: a light-mode visitor on a dark OS saw the page flash dark. A full load runs that
 * script before first paint again.
 */
export function DesignedLocaleSwitch({
  heading,
  current,
}: {
  heading: string;
  /** The page's locale, from the server's render store; the path can carry `.html` or be null. */
  current: string;
}) {
  // `usePathname` can be null before the router is ready; the locale root is the honest
  // fallback, and it is still a working link rather than no link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const ordered = [...LOCALES].reverse(); // VI, EN
  const hrefFor = (code: string) =>
    isLocale(first) ? pathname.replace(/^\/[^/]+/, `/${code}`) : `/${code}`;

  return (
    <nav
      aria-label={heading}
      data-locale-switch
      className="flex h-9 shrink-0 items-center gap-0.5 rounded-full border border-line bg-surface-1 p-0.75"
    >
      {ordered.map((l) => {
        const Flag = l.code === "vi" ? FlagVN : FlagUK;
        const inner = (
          <>
            <span
              aria-hidden="true"
              className="block size-4 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10"
            >
              <Flag />
            </span>
            <span aria-hidden="true">{l.shortLabel}</span>
          </>
        );
        const base =
          "flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold tracking-wide";
        return l.code === current ? (
          <span
            key={l.code}
            aria-current="true"
            title={l.label}
            className={`${base} bg-card text-ink shadow-sm`}
          >
            {inner}
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
            className={`${base} hit-area text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`}
          >
            {inner}
          </a>
        );
      })}
    </nav>
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
