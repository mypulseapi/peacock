"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/routing";
import { AuthShell, Field, FormError, SubmitButton, AuthLink } from "../AuthShell";

/** Set a new password, using the token from the emailed link. */
export function ResetPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string; form?: string }>({});
  const [pending, setPending] = useState(false);

  const rules = [
    { key: "length", met: password.length >= 8 && password.length <= 128 },
    { key: "letter", met: /[a-zA-Z]/.test(password) },
    { key: "number", met: /[0-9]/.test(password) },
  ];

  // A link with no token is a truncated one, usually an email client that wrapped the URL. Say so
  // and offer a fresh one rather than presenting a form that cannot possibly succeed.
  if (!token) {
    return (
      <AuthShell title={t("reset.invalidTitle")} subtitle={t("reset.invalidBody")}>
        <div className="text-center">
          <AuthLink href="/forgot-password">{t("reset.requestNew")}</AuthLink>
        </div>
      </AuthShell>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const next: typeof errors = {};
    if (!rules.every((r) => r.met)) next.password = t("signUp.errors.passwordWeak");
    if (password !== confirm) next.confirm = t("reset.errors.mismatch");
    if (Object.keys(next).length) {
      setErrors(next);
      setPassword("");
      setConfirm("");
      return;
    }

    setPending(true);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setPending(false);
    setPassword("");
    setConfirm("");

    if (error) {
      // Expired, already used, or forged all resolve to one message: which of them applied is
      // information an attacker probing tokens would like, and the merchant cannot act on.
      setErrors({ form: t("reset.errors.invalidToken") });
      return;
    }

    router.push("/signin?reset=1");
  }

  return (
    <AuthShell title={t("reset.title")} subtitle={t("reset.subtitle")}>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {errors.form && (
          <>
            <FormError message={errors.form} />
            <p className="text-sm text-center">
              <AuthLink href="/forgot-password">{t("reset.requestNew")}</AuthLink>
            </p>
          </>
        )}

        <Field
          id="password"
          label={t("reset.newPassword")}
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
                {rule.met ? <Check className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0" />}
                <span>{t(`signUp.rules.${rule.key}`)}</span>
              </li>
            ))}
          </ul>
        </Field>

        <Field
          id="confirm"
          label={t("reset.confirmPassword")}
          type="password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
          disabled={pending}
          required
        />

        <SubmitButton pending={pending} pendingLabel={t("reset.submitting")}>
          {t("reset.submit")}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
