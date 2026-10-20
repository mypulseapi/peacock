"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 touch-manipulation items-center justify-center rounded-md border border-[color:var(--panel-line)] text-[color:var(--on-panel-2)] transition duration-300 hover:border-[color:var(--on-panel-3)] hover:bg-[rgb(var(--veil-rgb)/0.06)] hover:text-[color:var(--on-panel)]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={`w-5 h-5 absolute transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 rotate-0 text-amber-500"
            : "opacity-0 rotate-90 text-amber-500"
        }`}
      />
      <Moon
        className={`w-5 h-5 absolute transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 rotate-0 text-[var(--accent-primary-light)]"
            : "opacity-0 -rotate-90 text-[var(--accent-primary-light)]"
        }`}
      />
    </button>
  );
}
