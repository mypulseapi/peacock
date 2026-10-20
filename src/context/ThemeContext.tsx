"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { useMounted, useStored, writeStored } from "@/lib/client-hooks";

type Theme = "light" | "dark";
/** `null` means the visitor has not chosen, so the operating system decides. */
type Preference = Theme | null;

interface ThemeContextType {
  /** What is actually on screen, which is what the toggle's icon and label describe. */
  theme: Theme;
  /** What the visitor chose, or null while the OS is deciding. */
  preference: Preference;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  preference: null,
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
  // setState during hydration. `null` is a real value here: it means "follow the system".
  const stored = useStored("pulse-theme", null);
  const preference: Preference = stored === "light" || stored === "dark" ? stored : null;
  const system = useSystemTheme();
  const theme: Theme = preference ?? system;

  /*
   * Write the attribute only when the visitor has chosen one.
   *
   * Removing it when they have not is what hands control back to `color-scheme: light dark`, and
   * so to the OS. Stamping `data-theme` unconditionally -- which is what this did before, with
   * `data-theme="light"` also hardcoded in the markup -- pinned every visitor to light and made
   * the dark half of the palette unreachable without finding the toggle.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (preference) root.setAttribute("data-theme", preference);
    else root.removeAttribute("data-theme");
  }, [preference]);

  const setTheme = (next: Theme) => {
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
