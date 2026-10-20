"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { AuthShell, Field, FormError, SubmitButton, AuthLink } from "../AuthShell";
import { GoogleButton } from "../GoogleButton";

// The merchant dashboard is a separate app on its own origin, so this is a full navigation rather
// than a client-side route, next-intl's router would look for /dashboard inside the store and
// find the catch-all 404.
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002";

/**
 * Sign in.
 *
 * **Every failure is the same message.** Never "no account with that email" or "wrong password":
 * either one turns this form into an account-enumeration oracle, letting anyone test which of their
 * leaked addresses are worth attacking. The merchant who genuinely mistyped is barely inconvenienced;
 * the attacker learns nothing.
 */
export function SignInForm() {
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);

    const { error: signInError } = await authClient.signIn.email({
      email: email.trim().toLowerCase(),
      password,
      // Unchecked would mean a cookie that dies with the browser. Checked is the conventional
      // default for a dashboard people return to daily.
      rememberMe: true,
    });

    setPending(false);
    // Always cleared, success or failure.
    setPassword("");

    if (signInError) {
      // Rate limiting is the one case worth naming: the merchant needs to know that waiting fixes
      // it, or they will keep hammering a form that has already stopped listening.
      setError(signInError.status === 429 ? t("errors.tooManyAttempts") : t("signIn.errors.invalid"));
      return;
    }

    window.location.href = DASHBOARD_URL;
  }

  return (
    <AuthShell
      title={t("signIn.title")}
      subtitle={t("signIn.subtitle")}
      footer={
        <>
          {t("signIn.noAccount")} <AuthLink href="/signup">{t("signIn.signUpLink")}</AuthLink>
        </>
      }
    >
      <GoogleButton callbackURL={DASHBOARD_URL} />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <FormError message={error} />}

        <Field
          id="email"
          label={t("signIn.email")}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={t("signIn.emailPlaceholder")}
          autoComplete="email"
          disabled={pending}
          required
        />

        <Field
          id="password"
          label={t("signIn.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          disabled={pending}
          required
        />

        <div className="text-right -mt-2">
          <AuthLink href="/forgot-password">{t("signIn.forgot")}</AuthLink>
        </div>

        <SubmitButton pending={pending} pendingLabel={t("signIn.submitting")}>
          {t("signIn.submit")}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
