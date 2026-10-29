"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy a snippet to the clipboard.
 *
 * The only client component in the code panel, so the snippet itself still
 * renders on the server and the highlighter never ships to the browser.
 *
 * `navigator.clipboard` is unavailable on an insecure origin and can be refused
 * by permissions policy, so the failure is shown rather than swallowed: a button
 * that silently does nothing is worse than one that says it could not.
 */
export function CopyButton({
  code,
  label,
  copiedLabel,
  className,
}: {
  code: string;
  label: string;
  copiedLabel: string;
  /** Replaces the code-panel styling, for a button outside a code panel (the Opensource hero). */
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  // Cleared on unmount, so a copy right before a route change cannot set state
  // on a component that is gone.
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [code]);

  const copied = state === "copied";
  return (
    <button
      type="button"
      onClick={copy}
      // The label carries the state for a screen reader; the icon is decorative.
      aria-label={copied ? copiedLabel : label}
      className={
        className ??
        "inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border border-[color:var(--panel-line)] px-2.5 py-1 text-xs font-medium text-[color:var(--code-comment)] transition hover:bg-[color:var(--panel-2)] hover:text-[color:var(--code-ink)] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:outline-none"
      }
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      <span aria-hidden>{state === "failed" ? "!" : copied ? copiedLabel : label}</span>
    </button>
  );
}
