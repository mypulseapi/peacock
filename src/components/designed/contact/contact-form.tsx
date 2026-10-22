"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import { postForm } from "@/lib/forms";
import { contactForm, FREE_MAIL_DOMAINS } from "@/content/contact-form";
import { contactEmail } from "@/lib/contact-emails";

/**
 * Two fields, one per row, and a button that is the width of its own words.
 *
 * What it replaces had eight fields, a file upload, and a `<form>` with no `onSubmit`, no `action`
 * and no `method` behind a permanently disabled button: it collected a page of information and
 * then did nothing with it. That is BUG-28.
 *
 * No message box. Everyone who reaches this page arrived from a product page that already says
 * what we do, so the message would restate it; asking for one costs a lead and tells us nothing we
 * cannot ask on the call.
 *
 * Success is a flag beside the button rather than a card that replaces the form. Swapping the
 * whole panel for a confirmation throws away what someone just typed, which is the one thing they
 * would want to see if they are unsure whether it went.
 *
 * Posting goes through `postForm`, which already knows the gateway path, flattens the API's error
 * envelope to per-field messages and reports a 429's `retryAfter`. Verification is the existing
 * `Turnstile` widget, whose site key comes from cerberus at runtime, so this file holds neither a
 * URL nor a key.
 */
type Field = "company" | "email";
type State = "idle" | "sending" | "sent" | "failed" | "limited";

const FALLBACK = contactEmail("general");

/**
 * Good enough to catch a typo, and no more.
 *
 * Deliberately not RFC 5322: a regex that accepts every legal address is famously unreadable and
 * still cannot tell you whether anyone reads the mailbox. This rejects the shapes a person
 * actually mistypes; the server re-checks it and additionally checks that the domain can receive
 * mail at all, which is the part that protects our sending reputation.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function ContactForm({
  labels,
}: {
  /** Heading, company name, work email, submit: all four already translated in the catalogue. */
  labels: { heading: string; company: string; email: string; submit: string };
}) {
  const C = contactForm(useLocale());
  const [values, setValues] = useState<Record<Field, string>>({ company: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<State>("idle");
  const [failure, setFailure] = useState("");
  const [token, setToken] = useState("");
  // Changing this remounts the widget, which is how Turnstile is reset for a second attempt.
  const [challenge, setChallenge] = useState(0);

  const validate = (v: Record<Field, string>): Partial<Record<Field, string>> => {
    const e: Partial<Record<Field, string>> = {};
    if (!v.company.trim()) e.company = C.required;
    if (!v.email.trim()) e.email = C.required;
    else if (!EMAIL.test(v.email.trim())) e.email = C.emailInvalid;
    else if (FREE_MAIL_DOMAINS.includes(v.email.trim().split("@")[1].toLowerCase()))
      e.email = C.emailFree;
    return e;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    // Move focus to the first problem rather than leaving a screen reader to hunt for it.
    if (Object.keys(found).length) {
      const first = (["company", "email"] as Field[]).find((f) => found[f]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setState("sending");
    const result = await postForm("contact", {
      company: values.company.trim(),
      email: values.email.trim(),
      recaptchaToken: token,
    });

    if (result.ok) {
      setState("sent");
      setValues({ company: "", email: "" });
      return;
    }

    // A spent token cannot be reused, so every failure gets a fresh challenge.
    setToken("");
    setChallenge((n) => n + 1);
    // 429 is not a failure to report as one: the message landed, this is the second attempt.
    setState(result.status === 429 ? "limited" : "failed");
    setErrors(result.data.details ?? {});
    setFailure(result.status === 429 ? C.rateLimited : result.data.error || C.failed);
  }

  const field = (name: Field, label: string, type: "text" | "email", hint: string) => (
    <div>
      <label htmlFor={`f-${name}`} className="mb-1.5 block text-sm font-medium text-ink">
        {label} <span className="text-critical">*</span>
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        required
        placeholder={hint}
        value={values[name]}
        autoComplete={name === "email" ? "email" : "organization"}
        onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        className="field"
      />
      {errors[name] && (
        <p id={`e-${name}`} className="mt-1.5 flex items-start gap-1.5 text-sm text-critical">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-note"
      className="reveal self-start rounded-3xl border border-line bg-card p-6 shadow-sm delay-200 lg:col-span-6 lg:col-start-7 lg:p-8"
    >
      <h2 className="text-h2 text-ink">{labels.heading}</h2>
      <p id="form-note" className="mt-2 text-sm text-pretty text-muted">
        {C.note}
      </p>

      {/* Three rows: who you are, where to reply, and the one button. */}
      <div className="mt-7 grid gap-5">
        {field("company", labels.company, "text", C.companyHint)}
        {field("email", labels.email, "email", C.emailHint)}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <button
            type="submit"
            className="btn-primary px-7"
            disabled={state === "sending" || state === "sent"}
          >
            {state === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {C.sending}
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                {labels.submit}
              </>
            )}
          </button>

          {/*
            The success flag, beside the button rather than in place of the form. `role="status"`
            so it is announced; the tick draws itself, so the motion says "done" before the word
            is read.
          */}
          {state === "sent" && (
            <>
              <p className="sent-flag" role="status">
                <svg className="sent-tick" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m8 12.5 2.7 2.7L16 9.8" />
                </svg>
                {C.sentShort}
              </p>
              <p className="sent-detail basis-full text-sm text-pretty text-muted">{C.sent}</p>
            </>
          )}
        </div>
      </div>

      {/* Invisible in managed mode; renders nothing at all when no site key is configured. */}
      <Turnstile key={challenge} onToken={setToken} className="mt-4 empty:mt-0" />

      {(state === "failed" || state === "limited") && (
        <p className="mt-4 flex items-start gap-1.5 text-sm text-critical" role="alert">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            {failure}
            {state === "failed" && FALLBACK && (
              <>
                {" "}
                <a className="underline" href={`mailto:${FALLBACK}`}>
                  {FALLBACK}
                </a>
              </>
            )}
          </span>
        </p>
      )}
    </form>
  );
}
