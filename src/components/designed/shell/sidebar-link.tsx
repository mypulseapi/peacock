"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";

/*
 * The sidebar's parts that need the browser. Closed, the sidebar is a rail of icons
 * (`data-sidebar="closed"` on <html>; the rules are at the end of globals.css): `data-rail-hide`
 * goes, `data-rail-only` comes, `data-side-item` centres its icon.
 */

const ROW =
  "flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-sm text-ink transition-colors duration-150 ease-out-soft hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-focus";

const strip = (p: string) => p.replace(/\/$/, "");

const setRail = (closed: boolean) => {
  document.documentElement.dataset.sidebar = closed ? "closed" : "";
};

/** One sidebar row; the page you are on gets the hover fill and a stronger weight. */
export function SidebarLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: string;
}) {
  const current = strip(usePathname() ?? "") === strip(href);
  return (
    <Link
      href={href}
      title={children}
      data-side-item
      aria-current={current ? "page" : undefined}
      className={`${ROW} ${current ? "bg-surface-1 font-semibold" : "font-medium"}`}
    >
      <svg
        className={`size-4 shrink-0 ${current ? "text-primary" : "text-muted"}`}
        aria-hidden="true"
      >
        <use href={`#${icon}`} />
      </svg>
      <span data-rail-hide className="truncate">
        {children}
      </span>
    </Link>
  );
}

/**
 * Close the sidebar to its rail, or open it again, as the prototype's panel button does.
 * ponytail: not remembered across a reload; keep it in localStorage if people ask.
 */
export function SidebarToggle({
  close,
  open,
}: {
  close: string;
  open: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        setRail(document.documentElement.dataset.sidebar !== "closed")
      }
      className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
    >
      <PanelLeft className="size-4.5" aria-hidden />
      <span data-rail-hide className="sr-only">
        {close}
      </span>
      <span data-rail-only className="sr-only">
        {open}
      </span>
    </button>
  );
}

/**
 * A folded group, like the phone menu's; it opens by itself when it holds the page you are on.
 * On the rail it is one icon: a click opens the sidebar with this group unfolded.
 */
export function SidebarGroup({
  title,
  icon,
  hrefs,
  open = false,
  children,
}: {
  title: string;
  icon: string;
  hrefs: string[];
  open?: boolean;
  children: React.ReactNode;
}) {
  const here = strip(usePathname() ?? "");
  const current = hrefs.some((h) => strip(h) === here);
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <>
      <button
        type="button"
        data-rail-only
        data-side-item
        title={title}
        aria-label={title}
        onClick={() => {
          setRail(false);
          if (details.current) details.current.open = true;
        }}
        className={`${ROW} mt-1 w-full ${current ? "bg-surface-1" : ""}`}
      >
        <svg
          className={`size-4 shrink-0 ${current ? "text-primary" : "text-muted"}`}
          aria-hidden="true"
        >
          <use href={`#${icon}`} />
        </svg>
      </button>
      <details
        ref={details}
        data-rail-hide
        open={open || current}
        className="group/side mt-3"
      >
        <summary className="flex h-8 cursor-pointer list-none items-center gap-2 rounded-lg px-2.5 text-xs font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
          <span className="flex-1 truncate">{title}</span>
          <svg
            className="size-3.5 opacity-0 transition duration-150 ease-out-soft group-hover/side:opacity-100 group-open/side:rotate-180"
            aria-hidden="true"
          >
            <use href="#i-chevron-down" />
          </svg>
        </summary>
        <ul className="grid gap-0.5 pb-2">{children}</ul>
      </details>
    </>
  );
}

/** Marks the header `data-scrolled` once the page moves, so it takes a background (globals.css). */
export function HeaderScrolled() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const header = ref.current?.closest("header");
    if (!header) return;
    const on = () =>
      header.toggleAttribute("data-scrolled", window.scrollY > 0);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <span ref={ref} hidden />;
}
