"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, AlertTriangle, Mail } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only log errors in development to avoid Lighthouse penalties
    // In production, errors should be sent to an error reporting service like Sentry
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-tertiary)]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-red-500/10 mb-8">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <span className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">500</span>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Something Went Wrong
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Our team has been notified and is working on it.
          Please try again in a moment.
        </p>

        {/* Error Details (in dev mode) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="glass-card p-4 mb-8 text-left">
            <p className="text-xs text-[var(--text-muted)] mb-2">Error Details:</p>
            <code className="text-sm text-red-400 break-all">{error.message}</code>
            {error.digest && (
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="glass-card px-6 py-3 inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 glass-card p-6">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            If the problem persists, please contact our support team.
          </p>
          <a
            href="mailto:support@thepulseapi.com"
            className="inline-flex items-center gap-2 text-[var(--accent-primary-light)] hover:underline"
          >
            <Mail className="w-4 h-4" />
            support@thepulseapi.com
          </a>
        </div>

        {/* Status Link */}
        <div className="mt-6">
          <Link
            href="/status"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Check system status →
          </Link>
        </div>
      </div>
    </div>
  );
}
