"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/routing";
import { AuthShell, Field, FormError, SubmitButton, AuthLink } from "../AuthShell";
import { GoogleButton } from "../GoogleButton";

/**
 * Create your account.
 *
 * **Name, email and password. Nothing else.** No company, no phone, no plan choice, asking for a
 * tax number before somebody has used anything is how a sign-up gets abandoned. The organization is
 * named during onboarding, after there is an account to attach it to.
 */
export function SignUpForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; form?: string }>({});
  const [emailTaken, setEmailTaken] = useState(false);
  const [pending, setPending] = useState(false);

  // The rules, as a checklist that ticks while they type, rather than a rejection after they submit.
  const rules = [
    { key: "length", met: password.length >= 8 && password.length <= 128 },
    { key: "letter", met: /[a-zA-Z]/.test(password) },
    { key: "number", met: /[0-9]/.test(password) },
  ];
  const passwordValid = rules.every((r) => r.met);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setEmailTaken(false);

    const next: typeof errors = {};
    if (!name.trim()) next.name = t("signUp.errors.nameRequired");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = t("signUp.errors.emailInvalid");
    if (!passwordValid) next.password = t("signUp.errors.passwordWeak");
    if (Object.keys(next).length) {
      setErrors(next);
      // Whatever they typed stays, except the password, which is always cleared.
      setPassword("");
      return;
    }

    setPending(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      callbackURL: "/verify-email",
    });
    setPending(false);
    setPassword("");

    if (error) {
      // "Already registered" belongs under the email box with a way forward, not in a generic
      // banner, the merchant almost certainly has an account and wants to sign in.
      if (error.status === 422 || /exist|taken|already/i.test(error.message ?? "")) {
        setEmailTaken(true);
        return;
      }
      if (error.status === 429) {
        setErrors({ form: t("errors.tooManyAttempts") });
        return;
      }
      setErrors({ form: error.message || t("errors.generic") });
      return;
    }

    router.push(`/verify-email?email=${encodeURIComponent(email.trim().toLowerCase())}`);
  }

  return (
    <AuthShell
      title={t("signUp.title")}
      subtitle={t("signUp.subtitle")}
      footer={
        <>
          {t("signUp.haveAccount")} <AuthLink href="/signin">{t("signUp.signInLink")}</AuthLink>
        </>
      }
    >
      <GoogleButton callbackURL={process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002"} />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {errors.form && <FormError message={errors.form} />}

        <Field
          id="name"
          label={t("signUp.name")}
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder={t("signUp.namePlaceholder")}
          autoComplete="name"
          disabled={pending}
          required
        />

        <Field
          id="email"
          label={t("signUp.email")}
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setEmailTaken(false); }}
          error={
            emailTaken ? (
              <>
                {t("signUp.errors.emailTaken")}{" "}
                <AuthLink href="/signin">{t("signUp.errors.emailTakenLink")}</AuthLink>
              </>
            ) : (
              errors.email
            )
          }
          placeholder={t("signUp.emailPlaceholder")}
          autoComplete="email"
          disabled={pending}
          required
        />

        <Field
          id="password"
          label={t("signUp.password")}
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="new-password"
          disabled={pending}
          required
        >
          <ul className="mt-3 space-y-1.5">
            {rules.map((rule) => (
              <li
                key={rule.key}
                className={`flex items-center gap-2 text-sm ${
                  rule.met ? "text-[var(--accent-secondary-light)]" : "text-[var(--text-muted)]"
                }`}
              >
                {rule.met ? (
                  <Check className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{t(`signUp.rules.${rule.key}`)}</span>
              </li>
            ))}
          </ul>
        </Field>

        <SubmitButton pending={pending} pendingLabel={t("signUp.submitting")}>
          {t("signUp.submit")}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
