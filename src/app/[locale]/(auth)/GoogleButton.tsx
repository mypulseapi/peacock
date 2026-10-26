"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authClient, isGoogleEnabled } from "@/lib/auth-client";

/**
 * "Continue with Google".
 *
 * **Renders nothing when the provider is not configured.** Not disabled, not greyed out, absent.
 * A button that does nothing is worse than a button that is not there: it advertises a way in that
 * does not exist, and the merchant's next move is to file a bug.
 *
 * The server makes the same check against GOOGLE_CLIENT_ID, so the two cannot disagree about
 * whether the provider exists.
 */
export function GoogleButton({
  callbackURL,
  errorCallbackURL,
}: {
  callbackURL: string;
  /** Where a cancelled or failed Google sign-in lands, with `?error=` added by Better Auth. */
  errorCallbackURL?: string;
}) {
  const t = useTranslations("auth");
  const [pending, setPending] = useState(false);

  if (!isGoogleEnabled()) return null;

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={async () => {
          setPending(true);
          try {
            await authClient.signIn.social({
              provider: "google",
              callbackURL,
              errorCallbackURL,
            });
          } finally {
            // The redirect usually takes over before this runs. It matters when the merchant
            // abandons the provider flow and comes back: they land on a working button, not a
            // permanently spinning one.
            setPending(false);
          }
        }}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors disabled:opacity-60"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8h-4v3.1A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.4 14.3a7.1 7.1 0 0 1 0-4.6v-3.1h-4a12 12 0 0 0 0 10.8l4-3.1z"
          />
          <path
            fill="#EA4335"
            d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z"
          />
        </svg>
        <span>{pending ? t("google.pending") : t("google.label")}</span>
      </button>

      <div className="flex items-center gap-3 my-5">
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
          {t("google.or")}
        </span>
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
      </div>
    </>
  );
}
