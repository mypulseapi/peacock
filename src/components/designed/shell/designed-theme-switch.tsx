"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Light or dark, as one switch (owner, 26 Oct 2026). It replaces a three-option menu whose third
 * option, "System", is gone: the site opens light, and the switch is the only choice there is.
 *
 * The knob slides across and its sun turns into a moon, so the switch says which theme is on;
 * the faint marks at either end of the track say which one a press would give. The page itself
 * changes from where it was pressed: `ThemeContext` grows the new theme out of the switch in a
 * circle (a view transition), so the cause and the change share a place on screen. With reduced
 * motion, nothing slides or grows; the state still changes, and the page swaps at once.
 *
 * A `role="switch"` button named by the dark theme ("Dark" / "Tối"), so a screen reader hears
 * "Dark, switch, on" or "off", which is the whole of what it does.
 */
export function DesignedThemeSwitch({ label }: { label: string }) {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={label}
      // A stable hook: the label is translated, so nothing else here is safe to select on.
      data-theme-switch
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTheme(dark ? "light" : "dark", {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
        });
      }}
      className="group hit-area relative h-9 w-16 shrink-0 cursor-pointer rounded-full border border-line bg-surface-1 transition-colors duration-300 ease-out-soft hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none"
    >
      {/* What a press would give: the sun waits on the left, the moon on the right. */}
      <Sun
        aria-hidden="true"
        className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted"
      />
      <Moon
        aria-hidden="true"
        className="absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0.75 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-card text-primary shadow-sm transition-transform duration-300 ease-out-soft group-aria-checked:translate-x-7 motion-reduce:transition-none"
      >
        <Sun className="absolute size-4 transition-[opacity,rotate,scale] duration-300 ease-out-soft group-aria-checked:scale-50 group-aria-checked:-rotate-90 group-aria-checked:opacity-0 motion-reduce:transition-none" />
        <Moon className="absolute size-4 scale-50 rotate-90 opacity-0 transition-[opacity,rotate,scale] duration-300 ease-out-soft group-aria-checked:scale-100 group-aria-checked:rotate-0 group-aria-checked:opacity-100 motion-reduce:transition-none" />
      </span>
    </button>
  );
}
