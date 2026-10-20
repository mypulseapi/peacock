"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MailCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthShell, Field, FormError, SubmitButton, AuthLink } from "../AuthShell";

/**
 * Request a password reset.
 *
 * **The confirmation is identical whether or not the address exists.** Saying "no account with that
 * email" here is the same enumeration leak as on sign-in, and it is worse: this form needs no
 * password, so it can be walked through an address list unattended.
 */
export function ForgotPasswordForm() {
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(t("forgot.errors.emailInvalid"));
      return;
    }

    setPending(true);
    const { error: resetError } = await authClient.requestPasswordReset({
      email: email.trim().toLowerCase(),
      redirectTo: "/reset-password",
    });
    setPending(false);

    // Rate limiting is surfaced; everything else resolves to the same confirmation, including an
    // address we have never seen.
    if (resetError?.status === 429) {
      setError(t("errors.tooManyAttempts"));
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthShell title={t("forgot.sentTitle")}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-secondary)]/10 mb-6">
            <MailCheck className="w-8 h-8 text-[var(--accent-secondary-light)]" />
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            {t("forgot.sentBody", { email: email.trim().toLowerCase() })}
          </p>
          <AuthLink href="/signin">{t("forgot.backToSignIn")}</AuthLink>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("forgot.title")}
      subtitle={t("forgot.subtitle")}
      footer={<AuthLink href="/signin">{t("forgot.backToSignIn")}</AuthLink>}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <FormError message={error} />}

        <Field
          id="email"
          label={t("forgot.email")}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={t("forgot.emailPlaceholder")}
          autoComplete="email"
          disabled={pending}
          required
        />

        <SubmitButton pending={pending} pendingLabel={t("forgot.submitting")}>
          {t("forgot.submit")}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
