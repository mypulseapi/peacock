import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Usually the result of `t.rich("title", …)`, a two-tone display headline. */
  title: ReactNode;
  description: ReactNode;
  /** Hairline under the header. On by default; the industries card omits it. */
  divider?: boolean;
  className?: string;
}

/**
 * The heading + description pair that opens seven of the nine homepage blocks.
 * Asymmetric two-column at `lg` (heading narrow, description wider), stacked
 * below it.
 */
export function SectionHeader({
  title,
  description,
  divider = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14",
        divider && "border-b border-[var(--surface-border)] pb-9",
        className
      )}
    >
      <h2 className="display text-[28px] sm:text-[32px]">{title}</h2>
      <p className="text-[14.5px] leading-[1.7] text-brand-muted lg:pt-1.5">
        {description}
      </p>
    </div>
  );
}
