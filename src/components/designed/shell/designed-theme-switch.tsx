"use client";

import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import type { Preference } from "@/context/ThemeContext";

/**
 * Let the visitor choose the theme, rather than inferring it and hoping.
 *
 * The designer's build has no theme control at all: it carries `theme-dark:` variants and
 * leaves the choice to `prefers-color-scheme`, so a visitor whose laptop was in dark mode got
 * the dark site with no way back, and a visitor who simply preferred the other one had no say.
 * This is the control, and it is deliberately three options rather than a two-way flip, because
 * "follow my system" is a real preference and dropping it to add a toggle would take something
 * away from the people who had it before.
 *
 * Built to match `DesignedLocaleSwitch` exactly, down to the `<details>` wrapper and the panel
 * classes, so the two sit together in the header as one control rather than two borrowed ones.
 */
const ICONS: Record<Preference, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };
const ORDER: Preference[] = ["light", "dark", "system"];

export function DesignedThemeSwitch({
  heading,
  labels,
}: {
  heading: string;
  /** Translated, because "Light" and "Dark" are words a Vietnamese reader should get too. */
  labels: Record<Preference, string>;
}) {
  const { theme, preference, setTheme } = useTheme();
  // The summary shows what is on screen, not what was chosen: under "System" those differ, and
  // the icon should describe the page the visitor is looking at.
  const Current = theme === "dark" ? Moon : Sun;

  return (
    <div className="relative">
      <details className="group" data-dropdown>
        <summary
          className="hit-area flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-ink"
          aria-label={`${heading}: ${preference}`}
          // A stable hook: the label is translated, so nothing else here is safe to select on.
          data-theme-switch
        >
          <Current className="size-4 text-primary" aria-hidden="true" />
          <svg
            className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
            aria-hidden="true"
          >
            <use href="#i-chevron-down" />
          </svg>
        </summary>
        <div
          data-panel
          className="absolute top-full right-0 mt-2 w-44 animate-dropdown rounded-2xl border border-line bg-card p-1.5 shadow-xl motion-reduce:animate-none"
        >
          <p className="border-b border-line px-3 py-2 text-label font-medium text-muted uppercase">
            {heading}
          </p>
          {ORDER.map((value) => {
            const Icon = ICONS[value];
            const chosen = preference === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                aria-current={chosen ? "true" : undefined}
                className={
                  "mt-1 flex min-h-11 w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-out-soft " +
                  (chosen ? "bg-primary-tint text-primary" : "text-ink hover:bg-surface-1")
                }
              >
                <Icon className="size-4" aria-hidden="true" />
                {labels[value]}
                {chosen && <Check className="ml-auto size-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
