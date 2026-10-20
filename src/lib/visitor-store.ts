"use client";

import { useSyncExternalStore } from "react";
import {
  readOverrides,
  readVisited,
  recordVisit,
  setOverride,
  type ContentRequirement,
  type Overrides,
  type RequirementOverride,
} from "./visitor-requirements";

/**
 * One subscription to the visitor's session state, shared by B4's strip and B6's panel.
 *
 * `sessionStorage` is an external store, so this is `useSyncExternalStore` rather than `useState`
 * in an effect. Two reasons beyond the lint rule: reading storage during render would produce
 * markup the server cannot match, and two sibling components each holding their own copy would
 * drift the moment one of them wrote. The panel promises that a correction changes the suggestions
 * below it, and a shared store is what makes that true in the same frame.
 */

const CHANGED = "pulse:visitor-changed";

export interface VisitorSnapshot {
  visited: readonly string[];
  overrides: Overrides;
}

/**
 * The snapshot must be referentially stable between changes.
 *
 * `useSyncExternalStore` compares snapshots by identity, so returning a freshly parsed object on
 * every call would re-render forever. Parse once, cache, and replace only when something fires.
 */
let cached: VisitorSnapshot = { visited: [], overrides: {} };
let loaded = false;

/** Server and first client render agree on this, so hydration cannot mismatch. */
const EMPTY: VisitorSnapshot = { visited: [], overrides: {} };

function refresh(): void {
  cached = { visited: readVisited(), overrides: readOverrides() };
}

function subscribe(onChange: () => void): () => void {
  const handler = () => {
    refresh();
    onChange();
  };
  window.addEventListener(CHANGED, handler);
  return () => window.removeEventListener(CHANGED, handler);
}

function getSnapshot(): VisitorSnapshot {
  if (!loaded) {
    refresh();
    loaded = true;
  }
  return cached;
}

function getServerSnapshot(): VisitorSnapshot {
  return EMPTY;
}

export function useVisitor(): VisitorSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function announce(): void {
  window.dispatchEvent(new CustomEvent(CHANGED));
}

/** Record a page view. Safe to call with the same route twice; it moves rather than duplicates. */
export function visit(route: string): void {
  recordVisit(route);
  announce();
}

/** Apply the visitor's correction, or clear it with `null`. */
export function correct(req: ContentRequirement, verdict: RequirementOverride | null): void {
  setOverride(req, verdict);
  announce();
}
