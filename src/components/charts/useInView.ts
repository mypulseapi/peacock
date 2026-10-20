"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/** `prefers-reduced-motion`, read the way React wants an external store read. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server: assume motion is fine, the client corrects on hydrate
  );
}

/**
 * Fires once when the element first enters the viewport.
 *
 * A chart that animates on mount has usually finished before the reader scrolls
 * to it, which is the same as not animating. Reduced motion resolves true
 * immediately, so the chart renders at its final state and never transitions.
 *
 * The observer is wired through a callback ref rather than an effect: the
 * element is subscribed the moment React attaches it, and the only setState is
 * in the observer callback, which is an event rather than a render side effect.
 */
export function useInView<T extends HTMLElement>() {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);
  const io = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((el: T | null) => {
    io.current?.disconnect();
    if (!el) return;
    io.current = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.current?.disconnect(); } },
      // Fires the moment any part of the element enters, and 120px before it
      // does. The original waited for 15% of the element past a 15% bottom
      // inset, which delays a count-up so that a partially visible figure can
      // sit on screen reading 0 while it waits to start. That is not a smaller
      // number than the real one, it is a wrong one.
      { rootMargin: "0px 0px 120px 0px", threshold: 0 },
    );
    io.current.observe(el);
  }, []);

  useEffect(() => () => io.current?.disconnect(), []);

  return { ref, shown: shown || reduced, reduced };
}

/**
 * Counts to `to` once shown, by writing to the node rather than through state.
 *
 * The value must also be rendered as the element's children by the caller. It
 * used to be written only by this hook, which meant the server rendered an
 * empty span: the figures were absent from the HTML entirely, so a crawler or
 * an answer engine saw no number, and anyone who scrolled fast or took a
 * screenshot caught a literal "0%", which is not a smaller claim than the real
 * one, it is a false one.
 *
 * So the number ships in the markup, and this only zeroes it on the client at
 * the moment it is about to animate. No JavaScript, reduced motion, or a
 * crawler all get the real figure.
 */
export function useCountUp(to: number, shown: boolean, reduced: boolean, ms = 900, dp = 0) {
  const node = useRef<HTMLElement | null>(null);
  const raf = useRef(0);
  const armed = useRef(false);

  useEffect(() => {
    if (reduced || armed.current || shown) return;
    armed.current = true;
    if (node.current) node.current.textContent = (0).toFixed(dp);
  }, [reduced, dp, shown]);

  useEffect(() => {
    const el = node.current;
    if (!el || !shown) return;
    if (reduced) { el.textContent = to.toFixed(dp); return; }
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      // easeOutCubic, matching the CSS easing the bars use
      el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dp);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, shown, reduced, ms, dp]);

  return node;
}
