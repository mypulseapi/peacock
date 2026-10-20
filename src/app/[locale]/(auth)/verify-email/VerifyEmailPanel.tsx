"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { MailCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthShell, FormError, AuthLink } from "../AuthShell";

/**
 * Confirm your email.
 *
 * Shown after a password sign-up. Google and GitHub skip it, those providers have already verified
 * the address, and asking a second time is friction that proves nothing.
 *
 * Until the link is clicked the merchant cannot get in: an unconfirmed address is one we cannot
 * invoice and cannot prove belongs to them.
 */
export function VerifyEmailPanel() {
  const t = useTranslations("auth");
  const email = useSearchParams().get("email") ?? "";

  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function resend() {
    if (!email) return;
    setError("");
    setState("sending");
    const { error: resendError } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/signin?verified=1",
    });
    setState(resendError ? "idle" : "sent");
    if (resendError) {
      setError(resendError.status === 429 ? t("errors.tooManyAttempts") : t("errors.generic"));
    }
  }

  return (
    <AuthShell
      title={t("verify.title")}
      footer={<AuthLink href="/signin">{t("verify.backToSignIn")}</AuthLink>}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 mb-6">
          <MailCheck className="w-8 h-8 text-[var(--accent-primary-light)]" />
        </div>

        {/* Naming the address is the point of this screen: a typo in the email is the single most
            common reason the link never arrives, and the merchant can only spot it if we show it. */}
        <p className="text-[var(--text-secondary)] mb-6">
          {email ? t("verify.bodyWithEmail", { email }) : t("verify.body")}
        </p>

        {error && <div className="mb-4 text-left"><FormError message={error} /></div>}

        {state === "sent" ? (
          <p className="text-sm text-[var(--accent-secondary-light)]">{t("verify.resent")}</p>
        ) : (
          email && (
            <button
              type="button"
              onClick={resend}
              disabled={state === "sending"}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {state === "sending" ? t("verify.resending") : t("verify.resend")}
            </button>
          )
        )}
      </div>
    </AuthShell>
  );
}
