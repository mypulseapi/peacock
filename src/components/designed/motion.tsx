"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The designer's page motion, loaded once and rescanned on navigation.
 *
 * `public/designed-motion.js` is `src/main.js` from afedfc1 byte for byte, plus one appended
 * `rescan` hook. It drives everything the converted markup declares through data attributes:
 * reveal on scroll, the count-ups, the hero demo, the shelf grid, the cursor-following hero light
 * and the scroll spy.
 *
 * **Without it the pages are blank.** `.reveal` is `opacity: 0` whenever scripting is enabled,
 * and this script is what sets `[data-shown]` to bring it back. 363 elements across the converted
 * pages carry that class, including every headline and call to action. Dropping `main.js` as "old
 * static-site scaffolding" is what made the rebuilt home page render as an empty column with one
 * stray paragraph.
 *
 * It is worth saying why that got past the checks: the text was all present in the DOM, so a
 * comparison of `textContent` reported the pages identical. Invisible text is still text. Only a
 * screenshot showed it.
 *
 * `afterInteractive` rather than `beforeInteractive`: it reads layout and attaches observers, so
 * it wants a parsed document, and nothing it does should block first paint.
 */
export function DesignedMotion() {
  const pathname = usePathname();

  useEffect(() => {
    /*
     * Re-observe after a client-side navigation.
     *
     * The script's observer is created once and observes what exists when it runs. On a set of
     * static HTML pages that is right, because every navigation is a full load. Here Next swaps
     * the DOM without re-running it, so the second page a visitor opens would keep every reveal
     * at opacity 0.
     *
     * Two frames, because the observer needs the new DOM laid out before it can decide what is in
     * view, and `useEffect` runs before paint.
     */
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        (window as { __pulseMotionRescan?: () => void }).__pulseMotionRescan?.();
      }),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <Script src="/designed-motion.js" strategy="afterInteractive" />;
}
