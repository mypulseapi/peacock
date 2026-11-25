"use client";

import Link from "next/link";
import { PanelLeft, SquarePen } from "lucide-react";
import { usePathname } from "next/navigation";
import { setOpen } from "@/lib/assistant/session";

const ROW =
  "flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-sm text-ink transition-colors duration-150 ease-out-soft hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-focus";

const strip = (p: string) => p.replace(/\/$/, "");

/** One sidebar row; the page you are on gets the hover fill and a stronger weight. */
export function SidebarLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  const current = strip(usePathname() ?? "") === strip(href);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`${ROW} ${current ? "bg-surface-1 font-semibold" : "font-medium"}`}
    >
      <svg
        className={`size-4 shrink-0 ${current ? "text-primary" : "text-muted"}`}
        aria-hidden="true"
      >
        <use href={`#${icon}`} />
      </svg>
      <span className="truncate">{children}</span>
    </Link>
  );
}

/** The sidebar's "new chat": opens the Ask Pulse panel every page already carries. */
export function SidebarAsk({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`${ROW} w-full font-medium`}
    >
      <SquarePen className="size-4 shrink-0 text-muted" aria-hidden />
      {label}
    </button>
  );
}

/**
 * Close or open the sidebar, as the prototype's panel button does. `data-sidebar` on <html>, read
 * by globals.css. ponytail: not remembered across a reload; keep it in localStorage if people ask.
 */
export function SidebarToggle({
  label,
  open,
}: {
  label: string;
  open: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        document.documentElement.dataset.sidebar = open ? "closed" : "";
      }}
      className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
    >
      <PanelLeft className="size-4.5" aria-hidden />
    </button>
  );
}

/** A folded group, like the phone menu's; it opens by itself when it holds the page you are on. */
export function SidebarGroup({
  title,
  hrefs,
  open = false,
  children,
}: {
  title: string;
  hrefs: string[];
  open?: boolean;
  children: React.ReactNode;
}) {
  const here = strip(usePathname() ?? "");
  return (
    <details
      open={open || hrefs.some((h) => strip(h) === here)}
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
  );
}
