"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { signalsForPage } from "@/lib/page-catalogue";

/**
 * B1: peacock emits signals.
 *
 * Loaded from the CDN rather than imported from `@thepulseapi/sdk`, deliberately. This is the exact
 * integration our own docs hand a merchant (`/docs`, the `<script src=...>` snippet), so using the
 * workspace package here would mean the bundle customers actually load is the one path nobody
 * exercises. Dogfooding the published artefact is the point of instrumenting our own site.
 *
 * It also means no new dependency and no install step.
 *
 * B2 gives each page its attributes, so a view emits audience, area, depth and what the page helps
 * a visitor decide, rather than a bare route the signal graph cannot match. The catalogue is kept
 * honest against the filesystem by `scripts/check-page-catalogue.mjs`, which runs in `build`.
 */

import { SDK_SRC } from "@/lib/site";

type PulseGlobal = {
  init(config: { apiKey: string; organizationId: string; endpoint?: string }): Promise<unknown>;
  track(signals: Array<{ type: string; value: string }>): Promise<unknown>;
};

declare global {
  interface Window {
    Pulse?: PulseGlobal;
  }
}

/**
 * Locale is stripped so `/en/pricing` and `/vi/pricing` are one page.
 *
 * The pattern library cells are keyed on what the visitor was looking at, not which translation
 * they read it in. Locale is already a separate context dimension, and folding it into the page
 * identity would split every cell in two for no gain.
 */
function routeOf(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|vi)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export function PulseAnalytics() {
  const apiKey = process.env.NEXT_PUBLIC_PULSE_API_KEY;
  const organizationId = process.env.NEXT_PUBLIC_PULSE_ORG_ID;
  const endpoint = process.env.NEXT_PUBLIC_ROADRUNNER_URL;

  const pathname = usePathname();
  /** Set once `init()` has resolved. Tracking before it lands would be dropped. */
  const ready = useRef(false);
  /** The route that arrived while we were still initialising, if any. */
  const pending = useRef<string | null>(null);

  const send = useCallback((route: string) => {
    // Analytics must never break the page, so every failure is swallowed here and nowhere else.
    window.Pulse?.track(signalsForPage(route)).catch(() => {});
  }, []);

  const onLoad = useCallback(async () => {
    if (!apiKey || !organizationId) return;
    try {
      // autoTrack defaults on, so this also captures device, referrer and time of day once.
      await window.Pulse?.init({ apiKey, organizationId, endpoint });
      ready.current = true;
      send(pending.current ?? routeOf(window.location.pathname));
      pending.current = null;
    } catch {
      // A failed init leaves `ready` false, so no later page view is sent against a dead session.
    }
  }, [apiKey, organizationId, endpoint, send]);

  useEffect(() => {
    const route = routeOf(pathname);
    if (ready.current) send(route);
    else pending.current = route;
  }, [pathname, send]);

  // Unconfigured is the normal state locally. Render nothing rather than 404 the CDN on every page.
  if (!apiKey || !organizationId) return null;

  return <Script src={SDK_SRC} strategy="afterInteractive" onLoad={onLoad} />;
}
