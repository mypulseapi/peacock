// Flat "paper" card: white surface, hairline border, soft shadow on hover.
// ponytail: thin wrapper over a div so spacing/variants stay in one place.
import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] ${className}`}
    >
      {children}
    </Tag>
  );
}
