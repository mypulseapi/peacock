"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Progress bar across the top of the page while a navigation is in flight.
 *
 * "In flight" is DERIVED, not stored: we record which route the bar was raised on, and compare it
 * to the route currently on screen. Once they differ the navigation has committed. The previous
 * version turned the bar off from an effect keyed on the pathname, which is a synchronous setState
 * inside an effect, an extra render on every navigation, and what React's lint rule objects to.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /** The route the bar was raised on, or null when it is down. */
  const [startedFor, setStartedFor] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const key = `${pathname}?${searchParams?.toString() ?? ""}`;
  const isNavigating = startedFor !== null && startedFor === key;

  const startNavigation = useCallback(() => {
    setStartedFor(`${window.location.pathname}?${window.location.search.replace(/^\?/, "")}`);
    setProgress(0);
    // A navigation that never commits would leave the bar up forever, which is worse than no bar.
    if (failsafe.current) clearTimeout(failsafe.current);
    failsafe.current = setTimeout(() => setStartedFor(null), 10_000);
  }, []);

  // Animate progress while navigating
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        // Slow down as we approach 90%
        const increment = Math.max(1, (90 - prev) / 10);
        return Math.min(90, prev + increment);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isNavigating]);

  // Intercept link clicks to start navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, and download links
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.hasAttribute("download") ||
        link.getAttribute("target") === "_blank"
      ) {
        return;
      }

      // Skip if it's the same page
      const currentPath = window.location.pathname + window.location.search;
      if (href === currentPath || href === pathname) {
        return;
      }

      startNavigation();
    };

    // Also handle programmatic navigation via popstate
    const handlePopState = () => {
      startNavigation();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, startNavigation]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary-light)] to-[var(--accent-primary)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px var(--accent-primary), 0 0 5px var(--accent-primary)",
        }}
      />
      {/* Glow effect at the end */}
      {progress > 0 && (
        <div
          className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-[var(--accent-primary-light)] to-transparent opacity-75 animate-pulse"
          style={{
            left: `calc(${progress}% - 48px)`,
          }}
        />
      )}
    </div>
  );
}
