"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The language switch: the current flag and a caret in a small pill, opening a list of each
 * language's flag and name in the nav menus' type, the current one ticked (owner, 27 Oct 2026, from a reference). The same
 * dropdown on every width; on a phone it sits beside the menu button. Vietnamese first, the owner's
 * order, and the site's default; English is the UK flag. Two languages only.
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
    <details
      ref={ref}
      className="group relative flex items-center self-stretch"
      data-locale-menu
    >
      <summary
        className="hit-area flex h-9 cursor-pointer list-none items-center gap-2.5 rounded-full border border-line bg-surface-1 px-3.5 transition-colors duration-300 ease-out-soft hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden"
        aria-label={`${heading}: ${now.label}`}
      >
        <Flag code={now.code} />
        {/* The theme switch's capsule beside it; a solid caret, down when closed, up when open. */}
        <svg
          viewBox="0 0 10 6"
          className="h-1.5 w-2.5 fill-primary group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </summary>
      {/* The nav menus' panel (`nav-viewport` in globals.css): hangs from the header's bottom border,
          square top corners, so it reads as part of the bar. On a wide screen it opens to the right of
          the button like the nav menus; on a phone it stays inside the screen. Their rows; no entrance motion. */}
      <ul className="absolute top-full right-0 z-50 xl:right-auto xl:left-0 mt-px w-52 space-y-1 overflow-hidden rounded-b-2xl bg-card p-2 shadow-nav">
        {ordered.map((l) => (
          <li key={l.code}>
            <a
              href={hrefFor(l.code)}
              hrefLang={l.tag}
              lang={l.tag}
              aria-current={l.code === current ? "true" : undefined}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
            >
              <Flag code={l.code} />
              <span className="flex-1 text-sm font-semibold text-ink">
                {l.label}
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

function Flag({
  code,
  className = "h-4 w-6",
}: {
  code: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10 ${className}`}
    >
      {code === "vi" ? <FlagVN /> : <FlagUK />}
    </span>
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
  // Two menus render (the bar and the phone header), so the clip-path ids must differ.
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
