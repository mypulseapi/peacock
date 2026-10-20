"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useMounted, useStored, writeStored } from "@/lib/client-hooks";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  // The stored preference IS the state, there is nothing to copy into React on mount, so no
  // effect and no setState during hydration.
  const theme = (useStored("pulse-theme", "light") as Theme | null) ?? "light";

  // The attribute the stylesheet reads. An effect is right here: it is a DOM write, not state.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    writeStored("pulse-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={defaultContext}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
