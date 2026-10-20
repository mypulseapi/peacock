"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Home, Package, Mail, Zap, ArrowRight, ArrowLeft } from "lucide-react";

export function NotFoundContent() {
  const t = useTranslations("notFound");
  const nav = useTranslations("nav");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 lg:px-8 py-12 sm:py-20 pt-28 sm:pt-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent-secondary)]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Animated 404 Illustration */}
        <div className="relative mb-8 sm:mb-12">
          {/* 404 Number with animation */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-primary-light)] to-[var(--accent-primary-dark)] select-none">
                4
              </span>

              {/* Animated Logo in the middle */}
              <div className="relative">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-primary-dark)] flex items-center justify-center shadow-2xl shadow-[var(--accent-primary)]/30 animate-bounce" style={{ animationDuration: "2s" }}>
                  <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-[color:var(--on-panel)]" />
                </div>
                {/* Orbiting dots */}
                <div className="absolute -inset-4 animate-spin pointer-events-none" style={{ animationDuration: "8s" }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-[var(--accent-primary-light)] rounded-full" />
                </div>
                <div className="absolute -inset-6 animate-spin pointer-events-none" style={{ animationDuration: "12s", animationDirection: "reverse" }}>
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-[var(--accent-secondary-light)] rounded-full" />
                </div>
                {/* Pulse ring */}
                <div className="absolute -inset-2 rounded-2xl border-2 border-[var(--accent-primary)]/30 animate-ping pointer-events-none" style={{ animationDuration: "2s" }} />
              </div>

              <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-primary-light)] to-[var(--accent-primary-dark)] select-none">
                4
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--text-primary)]">
            {t("heading")}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            {t("description")}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {t("suggestion")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 rounded-xl text-[var(--text-primary)] font-medium transition-all group"
          >
            <Home className="w-4 h-4" />
            {t("homeButton")}
          </Link>

          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-dark)] rounded-xl text-[color:var(--on-sig)] font-semibold transition-all group shadow-lg shadow-[var(--accent-primary)]/25"
          >
            <Package className="w-4 h-4" />
            {t("productButton")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 rounded-xl text-[var(--text-primary)] font-medium transition-all group"
          >
            <Mail className="w-4 h-4" />
            {t("contactButton")}
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-10 sm:mt-12 glass-card p-6">
          <p className="text-sm text-[var(--text-muted)] mb-4">{t("popularPages")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg bg-[var(--surface-bg)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary-light)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              {nav("pricing")}
            </Link>
            <Link
              href="/docs"
              className="px-4 py-2 rounded-lg bg-[var(--surface-bg)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary-light)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              {nav("docs")}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg bg-[var(--surface-bg)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary-light)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              {nav("blog")}
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg bg-[var(--surface-bg)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary-light)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              {nav("about")}
            </Link>
          </div>
        </div>

        {/* Back Link & Error Code */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={() => typeof window !== "undefined" && window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("goBack")}
          </button>

          <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[var(--surface-border)]" />
            <span className="text-xs uppercase tracking-wider">Error {t("errorCode")}</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[var(--surface-border)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
