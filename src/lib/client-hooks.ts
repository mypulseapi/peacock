"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during SSR and the first render.
 *
 * The usual `useState(false)` + `useEffect(() => setMounted(true))` does the same thing with an
 * extra render and a synchronous setState inside an effect, which React's lint rule flags.
 * `useSyncExternalStore` expresses it directly: a server snapshot of false, a client snapshot of
 * true, and nothing to subscribe to because it never changes again.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * The current local time as a formatted string, updating every second.
 *
 * The snapshot is cached at module scope because `getSnapshot` must return a stable value for the
 * same state, building a new string on every call would make React re-render in a loop.
 */
let clock = "";

function subscribeToClock(onChange: () => void): () => void {
  const tick = () => {
    const now = new Date().toLocaleString();
    if (now === clock) return;
    clock = now;
    onChange();
  };
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}

export function useClock(): string {
  return useSyncExternalStore(
    subscribeToClock,
    () => clock,
    () => "",
  );
}

/**
 * A localStorage value as React state, without an effect.
 *
 * Reading storage in `useState` breaks SSR (there is no storage on the server) and reading it in an
 * effect means a synchronous setState on mount. `useSyncExternalStore` is the fit: the server
 * snapshot is the fallback, the client snapshot is the stored string, and writes go through
 * `writeStored` so every hook on the key re-renders. Snapshots are strings, so React's identity
 * check compares them by value and there is nothing to cache.
 */
const storageListeners = new Set<() => void>();

function subscribeToStorage(onChange: () => void): () => void {
  storageListeners.add(onChange);
  // Also pick up writes from other tabs.
  window.addEventListener("storage", onChange);
  return () => {
    storageListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useStored(key: string, fallback: string | null = null): string | null {
  return useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(key) ?? fallback,
    () => fallback,
  );
}

/** Write a value read by `useStored` and tell every hook on that key. */
export function writeStored(key: string, value: string): void {
  localStorage.setItem(key, value);
  for (const listener of storageListeners) listener();
}
