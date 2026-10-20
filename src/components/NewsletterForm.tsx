"use client";

import { useState, useCallback } from "react";
import { clientNewsletterSchema } from "@/lib/validations/newsletter";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import { postForm } from "@/lib/forms";

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

/**
 * `successMessage` and `cta` exist for the documentation gate, which reuses this
 * form rather than standing up a second email capture with its own rate limit,
 * Turnstile wiring and error handling. The default copy is the newsletter's.
 */
export function NewsletterForm({ successMessage, cta }: { successMessage?: string; cta?: string } = {}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [token, setToken] = useState("");
  const [tsKey, setTsKey] = useState(0);

  const validateEmail = useCallback((value: string) => {
    const result = clientNewsletterSchema.shape.email.safeParse(value);
    if (!result.success) {
      setEmailError(result.error.issues[0].message);
      return false;
    }
    setEmailError(null);
    return true;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      return;
    }

    // Require a Turnstile token
    if (!token) {
      setStatus({ type: "error", message: "Please complete the verification and try again." });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const { ok, status, data } = await postForm("newsletter", {
        email,
        recaptchaToken: token,
      });

      if (!ok) {
        // Token is single-use; reset the widget so a retry gets a fresh one.
        setToken("");
        setTsKey((k) => k + 1);
        if (status === 429) {
          setStatus({ type: "error", message: data.error || "You're already subscribed!" });
        } else if (data.details?.email) {
          setEmailError(data.details.email);
          setStatus({ type: "idle", message: "" });
        } else {
          setStatus({ type: "error", message: data.error || "Something went wrong." });
        }
        return;
      }

      setStatus({ type: "success", message: successMessage ?? "Thanks for subscribing! Check your inbox for confirmation." });
      setEmail("");
    } catch {
      setToken("");
      setTsKey((k) => k + 1);
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  };

  if (status.type === "success") {
    return (
      <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/20">
        <CheckCircle className="w-5 h-5 text-[var(--accent-secondary-light)]" />
        <p className="text-[var(--accent-secondary-light)]">{status.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => email && validateEmail(email)}
            placeholder="Enter your email"
            disabled={status.type === "loading"}
            className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
              emailError
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            } ${status.type === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
        >
          {status.type === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            cta ?? "Subscribe"
          )}
        </button>
      </div>

      {emailError && (
        <p className="mt-2 text-sm text-red-400 text-center">{emailError}</p>
      )}

      {status.type === "error" && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4" />
          <p>{status.message}</p>
        </div>
      )}

      <Turnstile key={tsKey} onToken={setToken} className="mt-3 flex justify-center" />
    </form>
  );
}
