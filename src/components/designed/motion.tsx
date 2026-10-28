"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

/**
 * The designer's page motion, loaded once and rescanned whenever the DOM changes under it.
 *
 * `public/designed-motion.js` is `src/main.js` from afedfc1 byte for byte, plus one appended
 * `rescan`. It drives everything the converted markup declares through data attributes: reveal on
 * scroll, the count-ups, the hero demo, the shelf grid, the
 * scroll spy.
 *
 * **Without it the pages are blank.** `.reveal` is `opacity: 0` whenever scripting is enabled and
 * this script is what sets `[data-shown]`. 363 elements across the converted pages carry that
 * class, including every headline and call to action.
 */

/** The hook the appended block in designed-motion.js installs. */
type MotionWindow = Window & { __pulseMotionRescan?: () => void };

export function DesignedMotion() {
  const pathname = usePathname();

  /*
   * Rescan on the next two frames.
   *
   * The observer needs the new DOM laid out before it can decide what is in view, and a React
   * effect runs before paint. One frame is not always enough once a Suspense boundary resolves
   * in between.
   */
  const rescan = useCallback(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => (window as MotionWindow).__pulseMotionRescan?.()),
    );
  }, []);

  useEffect(() => {
    /*
     * Rescan after navigation, and poll briefly for the script on first load.
     *
     * This is the bug that made the pages look empty even with the script in place. On the first
     * load the effect runs *before* `afterInteractive` has fetched the script, so
     * `__pulseMotionRescan` is undefined, the optional call quietly does nothing, and nothing
     * ever asks again. Meanwhile the script's own initial pass had already run against a DOM that
     * React then re-rendered, so the nodes it was observing were not the nodes on screen.
     *
     * The result was `.reveal` elements sitting at `opacity: 0` inside the viewport: real boxes,
     * correct text, invisible. Which is exactly what a textContent comparison cannot see.
     *
     * Ten tries at 100ms covers a slow script fetch and then stops; `onReady` below is the normal
     * path and usually gets there first.
     */
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if ((window as MotionWindow).__pulseMotionRescan) {
        rescan();
        clearInterval(id);
      } else if (tries >= 10) {
        clearInterval(id);
      }
    }, 100);

    rescan();
    return () => clearInterval(id);
  }, [pathname, rescan]);

  // `onReady` fires once the script has loaded, and again on every remount — which is the moment
  // the rescan actually needs to happen on a first load.
  return <Script src="/designed-motion.js" strategy="afterInteractive" onReady={rescan} />;
}
