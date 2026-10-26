"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { safeReturnUrl } from "@/lib/return-url";
import { SITE } from "@/lib/site";
import {
  AuthShell,
  Field,
  FormError,
  SubmitButton,
  AuthLink,
} from "../AuthShell";
import { GoogleButton } from "../GoogleButton";

/** The server's cooldown between codes (D-WSI-05). Only drives the countdown; the server enforces it. */
const RESEND_SECONDS = 60;
/** The server invalidates a code after this many wrong answers (FR-04). Only picks the message. */
const MAX_WRONG = 5;

type ApiError = { status: number; code?: string; retryAfter?: number };

/**
 * One entry page for new and returning merchants: an email, a 6-digit code, signed in
 * (rainbow ODIN/design/01-auth/01-website-sign-in, F3). Google stays beside it.
 *
 * **The same answer for every address.** "Sent" shows whether or not an account exists, and for
 * platform staff too, who are simply never emailed. The page cannot tell them apart, so nothing it
 * says can be used to test which addresses are worth attacking.
 *
 * After sign-in the merchant goes to the dashboard page they asked for, or its default; the
 * dashboard's own onboarding and approval steps take it from there.
 */
export function SignInForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const returnTo = safeReturnUrl(redirect);
  // Better Auth sends a cancelled or failed Google sign-in back here with `?error=`.
  const entryUrl = `${SITE.www}/${locale}/signin${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`;

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(
    params.has("error") ? t("entry.googleFailed") : "",
  );
  const [pending, setPending] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  const waitSeconds = Math.max(0, Math.ceil((resendAt - now) / 1000));
  useEffect(() => {
    if (waitSeconds === 0) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [waitSeconds]);

  /** Q-WSI-05: whole seconds under a minute, otherwise whole minutes rounded up. */
  const duration = (seconds: number) =>
    seconds < 60
      ? t("entry.seconds", { count: seconds })
      : t("entry.minutes", { count: Math.ceil(seconds / 60) });

  /** The server's codes, mapped to §5's messages. Anything unknown gets the generic line. */
  function describe(e: ApiError, wrongSoFar = wrong): string {
    if (e.status === 429) {
      return typeof e.retryAfter === "number"
        ? t("entry.errors.throttled", { time: duration(e.retryAfter) })
        : t("errors.tooManyAttempts");
    }
    switch (e.code) {
      case "INVALID_EMAIL":
        return t("entry.errors.invalidEmail");
      case "INVALID_OTP":
        return wrongSoFar >= MAX_WRONG
          ? t("entry.errors.locked")
          : t("entry.errors.incorrect");
      case "OTP_EXPIRED":
        return t("entry.errors.expired");
      case "TOO_MANY_ATTEMPTS":
        return t("entry.errors.locked");
      default:
        return t("errors.generic");
    }
  }

  async function sendCode() {
    const address = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError(t("entry.errors.invalidEmail"));
      return;
    }
    setError("");
    setPending(true);
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email: address,
      type: "sign-in",
      // The code email is written in this page's language (Q-WSI-08).
      fetchOptions: { headers: { "Accept-Language": locale } },
    });
    setPending(false);

    if (sendError) {
      setError(describe(sendError as ApiError));
      return;
    }
    setEmail(address);
    setCode("");
    setWrong(0);
    setStep("code");
    setNow(Date.now());
    setResendAt(Date.now() + RESEND_SECONDS * 1000);
  }

  async function verify() {
    if (code.length !== 6) {
      setError(t("entry.errors.incorrect"));
      return;
    }
    setError("");
    setPending(true);
    const { error: verifyError } = await authClient.signIn.emailOtp({
      email,
      otp: code,
    });

    if (!verifyError) {
      // A full navigation: the dashboard is another app on another origin. `pending` stays on, so
      // the button cannot be pressed twice while the browser leaves.
      window.location.href = returnTo;
      return;
    }
    setPending(false);
    const e = verifyError as ApiError;
    const wrongSoFar = e.code === "INVALID_OTP" ? wrong + 1 : wrong;
    setWrong(wrongSoFar);
    setCode("");
    setError(describe(e, wrongSoFar));
  }

  function changeEmail() {
    // FR-06: the code goes with the address it was sent to.
    setStep("email");
    setCode("");
    setWrong(0);
    setError("");
  }

  const consent = (
    <p className="text-center text-sm text-[var(--text-secondary)]">
      {t.rich("entry.consent", {
        terms: (chunks) => <AuthLink href="/terms">{chunks}</AuthLink>,
        privacy: (chunks) => <AuthLink href="/privacy">{chunks}</AuthLink>,
      })}
    </p>
  );

  if (step === "email") {
    return (
      <AuthShell title={t("entry.title")} subtitle={t("entry.subtitle")}>
        <GoogleButton callbackURL={returnTo} errorCallbackURL={entryUrl} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendCode();
          }}
          className="space-y-5"
          noValidate
        >
          {error && <FormError message={error} />}

          <Field
            id="email"
            label={t("entry.email")}
            type="email"
            inputMode="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            disabled={pending}
            required
          />

          <SubmitButton pending={pending} pendingLabel={t("entry.continuing")}>
            {t("entry.continue")}
          </SubmitButton>

          {consent}
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={t("entry.title")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void verify();
        }}
        className="space-y-5"
        noValidate
      >
        <p aria-live="polite" className="text-sm text-[var(--text-secondary)]">
          {t("entry.sent", { email })}
        </p>

        {error && <FormError message={error} />}

        <Field
          id="code"
          label={t("entry.code")}
          inputMode="numeric"
          maxLength={6}
          value={code}
          // Text, never a number, so a leading zero survives; a pasted code keeps its digits only.
          onChange={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
          autoComplete="one-time-code"
          autoFocus
          disabled={pending}
          required
        />

        <SubmitButton pending={pending} pendingLabel={t("entry.verifying")}>
          {t("entry.verify")}
        </SubmitButton>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={() => void sendCode()}
            disabled={pending || waitSeconds > 0}
            className="inline-flex min-h-6 items-center text-[var(--accent-primary-light)] hover:underline disabled:cursor-not-allowed disabled:text-[var(--text-muted)] disabled:no-underline"
          >
            {waitSeconds > 0
              ? t("entry.resendIn", { seconds: waitSeconds })
              : t("entry.resend")}
          </button>
          <button
            type="button"
            onClick={changeEmail}
            disabled={pending}
            className="inline-flex min-h-6 items-center text-[var(--accent-primary-light)] hover:underline"
          >
            {t("entry.changeEmail")}
          </button>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          {t("entry.delivery")}
        </p>
      </form>
    </AuthShell>
  );
}
