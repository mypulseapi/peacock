"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { useMounted, useStored, writeStored } from "@/lib/client-hooks";

type Theme = "light" | "dark";
/** Where the change started on screen, so the new theme can grow out of it. */
type Origin = { x: number; y: number };

/*
 * Light or dark, chosen with the header switch. The site opens light (owner, 26 Oct 2026, which
 * also removed the "System" option). A browser that stored "system" from the old menu keeps
 * following the OS until the switch is pressed once; the inline script and the effect below still
 * read that value, and a press writes a fixed theme over it.
 */
const DEFAULT_THEME: Theme = "light";

interface ThemeContextType {
  /** What is actually on screen, which is what the switch shows. */
  theme: Theme;
  /** Set a theme; `origin` is where it was asked for, and the change grows out from there. */
  setTheme: (theme: Theme, origin?: Origin) => void;
}

const defaultContext: ThemeContextType = {
  theme: DEFAULT_THEME,
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

/** Set by `setTheme` just before the write, read once by the effect that applies the theme. */
let pendingOrigin: Origin | null = null;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const stored = useStored("pulse-theme", null);
  const system = useSystemTheme();
  const theme: Theme =
    stored === "light" || stored === "dark"
      ? stored
      : stored === "system"
        ? system
        : DEFAULT_THEME;

  useEffect(() => {
    const root = document.documentElement;
    /*
     * Driven by what is stored, not by the default.
     *
     * `useStored` has to return its server snapshot on the hydration render to match the HTML,
     * so for one render `stored` is null. Acting on that meant React stamped `light` over the
     * `dark` the inline script had already applied, and a chosen theme did not survive a reload.
     * The inline script owns the first paint; React only acts once the choice is readable.
     */
    if (stored === null) return;
    const next = stored === "system" ? null : stored;
    const origin = pendingOrigin;
    pendingOrigin = null;
    if (root.getAttribute("data-theme") === next) return;

    const apply = () => {
      if (next) root.setAttribute("data-theme", next);
      else root.removeAttribute("data-theme");
    };
    if (!document.startViewTransition) return apply();

    /*
     * The new theme grows out of the switch as a circle when there is an origin and motion is
     * allowed; otherwise the cross-fade in globals.css runs (or, with reduced motion, an instant
     * swap). `data-theme-reveal` turns that cross-fade off while the circle plays.
     */
    const reveal =
      origin && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveal) root.setAttribute("data-theme-reveal", "");
    const vt = document.startViewTransition(apply);
    // A transition started before this one finishes skips it, and the skip rejects `ready` with
    // an AbortError. The theme is still applied, so the rejection is expected: catch it.
    vt.ready
      .then(() => {
        if (!reveal || !origin) return;
        const r = Math.hypot(
          Math.max(origin.x, innerWidth - origin.x),
          Math.max(origin.y, innerHeight - origin.y),
        );
        root.animate(
          {
            clipPath: [
              `circle(0 at ${origin.x}px ${origin.y}px)`,
              `circle(${r}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
    vt.finished
      .finally(() => root.removeAttribute("data-theme-reveal"))
      .catch(() => {});
  }, [stored]);

  const setTheme = (next: Theme, origin?: Origin) => {
    pendingOrigin = origin ?? null;
    writeStored("pulse-theme", next);
  };

  // Prevent a flash of the wrong theme before the choice is known.
  if (!mounted) {
    return (
      <ThemeContext.Provider value={defaultContext}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
