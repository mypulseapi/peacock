"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { useMounted, useStored, writeStored } from "@/lib/client-hooks";

type Theme = "light" | "dark";
/**
 * What the visitor picked. `"system"` is a choice like any other, not the absence of one.
 *
 * It used to be that no stored value meant "follow the system", because there was no control
 * anywhere to choose with, and pinning everyone to light would have made the dark half of the
 * palette unreachable. There is a control now, in the header, so the default can be a decision
 * again: the site is a light design and opens light, and anyone who wants dark or wants to
 * follow their OS says so and is remembered.
 */
export type Preference = Theme | "system";
const DEFAULT_PREFERENCE: Preference = "light";

interface ThemeContextType {
  /** What is actually on screen, which is what the toggle's icon and label describe. */
  theme: Theme;
  /** What the visitor chose: a fixed theme, or `"system"` to follow the OS. */
  preference: Preference;
  toggleTheme: () => void;
  setTheme: (preference: Preference) => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  preference: DEFAULT_PREFERENCE,
  toggleTheme: () => {},
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

/**
 * The operating system's preference, as a subscription rather than a one-off read.
 *
 * A read on mount goes stale the moment someone changes their system theme with the page open,
 * and on a Mac that happens automatically at dusk. `useSyncExternalStore` keeps the toggle's icon
 * honest about what is actually on screen.
 */
const QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystem(onChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useSystemTheme(): Theme {
  return useSyncExternalStore(
    subscribeToSystem,
    () => (window.matchMedia?.(QUERY).matches ? "dark" : "light"),
    // The server has no OS to ask. Light is the safer guess, and it is only ever used for the
    // toggle's icon: the real theme is applied by CSS through `color-scheme` before this matters.
    () => "light" as Theme,
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  // The stored preference IS the state, so there is nothing to copy into React on mount and no
  // setState during hydration.
  const stored = useStored("pulse-theme", null);
  const preference: Preference =
    stored === "light" || stored === "dark" || stored === "system" ? stored : DEFAULT_PREFERENCE;
  const system = useSystemTheme();
  const theme: Theme = preference === "system" ? system : preference;

  /*
   * Write the attribute unless the visitor asked to follow the OS.
   *
   * Removing it is what hands control back to `color-scheme: light dark`, and so to the system,
   * which is exactly and only what `"system"` should mean. Every other value is a decision the
   * visitor made and the attribute states it.
   */
  useEffect(() => {
    const root = document.documentElement;
    /*
     * Driven by what is stored, not by the defaulted preference.
     *
     * `useStored` has to return its server snapshot on the hydration render to match the HTML,
     * so for one render `stored` is null and `preference` is the default. Acting on that meant
     * React stamped `light` over the `dark` the inline script had already applied, and a chosen
     * theme did not survive a reload. The inline script owns the first paint; React only acts
     * once the visitor's actual choice is readable.
     */
    if (stored === null) return;
    const next = stored === "system" ? null : stored;
    // On first mount the inline theme script has already stamped the attribute, so there is
    // nothing to change and nothing to animate. Without this guard every page load would open
    // with a cross-fade of one frame against an identical frame.
    if (root.getAttribute("data-theme") === next) return;

    const apply = () => {
      if (next) root.setAttribute("data-theme", next);
      else root.removeAttribute("data-theme");
    };

    // The cross-fade itself is styled in globals.css. Browsers without the API just swap.
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  }, [stored]);

  const setTheme = (next: Preference) => {
    writeStored("pulse-theme", next);
  };

  // Toggling while following the system flips away from whatever is currently on screen, which is
  // the only behaviour that matches what the visitor can actually see.
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Prevent a flash of the wrong theme before the preference is known.
  if (!mounted) {
    return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={{ theme, preference, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
