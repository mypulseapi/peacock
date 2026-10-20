"use client";

import { AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";

/**
 * The frame every auth screen sits in.
 *
 * One component rather than five copies of the same card: the sign-up, sign-in and recovery screens
 * are the same screen family, and a merchant moving between them should not see the layout shift.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  /** Optional so the shell can be a Suspense fallback: the heading without the form. */
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[var(--text-secondary)]">{subtitle}</p>
          )}
        </div>

        <div className="glass-card p-6 sm:p-8">{children}</div>

        {footer && (
          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">{footer}</p>
        )}
      </div>
    </div>
  );
}

/** A labelled input with its error directly beneath it. */
export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required,
  disabled,
  children,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: ReactNode;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
      >
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        // The message belongs to the field, so the field owns it. A screen reader that announces
        // the error without saying which box it belongs to has not communicated anything.
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors disabled:opacity-60 ${
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-[var(--border-subtle)] focus:border-[var(--accent-primary)]"
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
      {children}
    </div>
  );
}

/** A form-level error: the ones that belong to no single field. */
export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2"
    >
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

export function SubmitButton({
  children,
  pending,
  pendingLabel,
}: {
  children: ReactNode;
  pending: boolean;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[var(--accent-primary-light)] hover:underline">
      {children}
    </Link>
  );
}
