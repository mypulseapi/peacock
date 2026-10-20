"use client";

import { useEffect, useRef, useState } from "react";
import { fetchFormConfig } from "@/lib/forms";

// Minimal Cloudflare Turnstile widget. Loads the script once, renders explicitly,
// and hands the token back via onToken (empty string on expiry/error).
// Cookieless, replaces Google reCAPTCHA. Remount with a changing `key` to reset.
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * The site key comes from the backend, not from this app's environment.
 *
 * It used to be NEXT_PUBLIC_TURNSTILE_SITE_KEY here. A site key is public -- it ends up in the
 * page either way -- but holding the CONFIG in the frontend meant it had to be kept in step by
 * hand with the secret cerberus verifies against, and a mismatched pair fails as
 * "Verification failed" with every value looking correct. Being a NEXT_PUBLIC_* variable it was
 * also inlined at build time, so rotating the key meant rebuilding the storefront.
 *
 * Now it is fetched from the same file that holds the secret, so the two cannot drift apart.
 * Module-level, so the request happens once per page load however many forms mount.
 */
let cachedKey: string | null | undefined;
let inFlight: Promise<string | null> | null = null;

function loadSiteKey(): Promise<string | null> {
  if (cachedKey !== undefined) return Promise.resolve(cachedKey);
  inFlight ??= fetchFormConfig()
    .then((data: { turnstileSiteKey?: string | null }) => {
      cachedKey = data.turnstileSiteKey ?? null;
      return cachedKey;
    })
    .catch(() => {
      // Do NOT cache a transport failure as "no key" -- a flaky first load would then disable the
      // challenge for the rest of the page's life. Clearing inFlight lets the next mount retry.
      inFlight = null;
      return null;
    });
  return inFlight;
}

export function Turnstile({
  onToken,
  className = "",
}: {
  onToken: (token: string) => void;
  className?: string;
}) {
  const [siteKey, setSiteKey] = useState<string | null>(cachedKey ?? null);
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cb = useRef(onToken);

  // Keep the callback ref fresh without re-running the render effect below.
  useEffect(() => {
    cb.current = onToken;
  });

  useEffect(() => {
    if (cachedKey !== undefined) return;
    let cancelled = false;
    void loadSiteKey().then((key) => {
      if (!cancelled) setSiteKey(key);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        action: "turnstile-spin-v1",
        callback: (token: string) => cb.current(token),
        "expired-callback": () => cb.current(""),
        "error-callback": () => cb.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          // widget already gone
        }
        widgetId.current = null;
      }
    };
    // Re-runs once the key arrives, which is when the widget can first be rendered.
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={ref} className={className} />;
}
