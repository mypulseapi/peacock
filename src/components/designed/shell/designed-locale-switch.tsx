"use client";

import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";

/**
 * The language switch as a toggle, "VI [flag] EN" (owner, 27 Oct 2026, from a reference toggle):
 * a pill filled with the current language's flag, a white knob on the current language's side,
 * the current label in ink and the other faint. It replaced "VI | EN" (26 Oct 2026). Vietnamese
 * stays first, the owner's order; English is the UK flag, the owner's choice.
 *
 * Languages come from `i18n/locales.ts` rather than being written out here: a second hand-kept copy
 * of the list is how a locale ends up routing and rendering but never appearing in the switch.
 * The switch is drawn for exactly two of them; a third needs a different control, not a third side.
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
 * fade back. A full load runs that script before first paint again. So the knob slides first and
 * the page loads after it (200ms), and at once under reduced motion or a modified click.
 */
export function DesignedLocaleSwitch({ heading }: { heading: string }) {
  // `usePathname` can be null before the router is ready; the locale root is the honest
  // fallback, and it is still a working link rather than no link.
  const pathname = usePathname() ?? "/";
  const [, first = ""] = pathname.split("/");
  const current = isLocale(first) ? first : LOCALES[0].code;
  const [left, right] = [...LOCALES].reverse(); // VI, EN
  const other = current === left.code ? right : left;
  const href = isLocale(first)
    ? pathname.replace(/^\/[^/]+/, `/${other.code}`)
    : `/${other.code}`;
  // The side the knob shows; it moves on click, before the page changes.
  const [shown, setShown] = useState(current);
  const onRight = shown === right.code;

  return (
    <nav
      aria-label={heading}
      data-locale-switch
      className="flex h-9 shrink-0 items-center"
    >
      <a
        href={href}
        hrefLang={other.tag}
        lang={other.tag}
        title={other.label}
        aria-label={other.label}
        onClick={(e) => {
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            e.button !== 0
          )
            return;
          if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          e.preventDefault();
          setShown(other.code);
          window.setTimeout(() => window.location.assign(href), 200);
        }}
        className="hit-area group flex items-center gap-2 rounded-full text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span
          aria-hidden="true"
          className={onRight ? "text-muted" : "text-ink"}
        >
          {left.shortLabel}
        </span>
        <span
          aria-hidden="true"
          className="relative h-6 w-11 overflow-hidden rounded-full shadow-[inset_0_1px_3px_rgb(0_0_0/0.25)] ring-1 ring-line"
        >
          <FlagVN
            className={`absolute inset-0 transition-opacity duration-200 ${onRight ? "opacity-0" : "opacity-100"}`}
          />
          <FlagUK
            className={`absolute inset-0 transition-opacity duration-200 ${onRight ? "opacity-100" : "opacity-0"}`}
          />
          <span
            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.35)] ring-1 ring-black/10 transition-transform duration-200 ease-out-soft group-hover:scale-105 ${
              onRight ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </span>
        <span
          aria-hidden="true"
          className={onRight ? "text-ink" : "text-muted"}
        >
          {right.shortLabel}
        </span>
      </a>
    </nav>
  );
}

/** Viet Nam: the red field and the gold star, set right of centre so the knob, on the left when
 *  Vietnamese is current, does not cover it. */
function FlagVN({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${className}`}
    >
      <rect width="30" height="20" fill="#DA251D" />
      <path
        fill="#FFFF00"
        transform="translate(6 0)"
        d="M15 4.2l1.35 4.15h4.36l-3.53 2.56 1.35 4.15L15 12.5l-3.53 2.56 1.35-4.15-3.53-2.56h4.36z"
      />
    </svg>
  );
}

/** The United Kingdom: the Union Flag, its diagonals offset as the real one draws them. */
function FlagUK({ className }: { className: string }) {
  // Two switches render (the bar and the mobile sheet), so the clip-path ids must differ.
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${className}`}
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
