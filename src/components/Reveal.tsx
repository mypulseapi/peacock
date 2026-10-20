"use client";

import type { ReactNode } from "react";
import { useInView } from "@/components/charts/useInView";

/**
 * Scroll reveal for a grid of cards.
 *
 * StoryPage is a server component with no motion at all, so the thirteen pages
 * built on it sat completely still while the homepage animated.
 *
 * The stagger is done in CSS against the container's own children rather than
 * by wrapping each one, because wrapping would insert a div between a grid and
 * its items and quietly break every `h-full` and `items-stretch` on thirteen
 * pages. This adds one class and no DOM.
 */
export function Reveal({
  children, className = "", as: Tag = "div",
}: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" | "dl" }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={`reveal ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
