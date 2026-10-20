"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { AlertCircle, Scale, CreditCard, Shield, XCircle } from "lucide-react";

export default function TermsOfServicePage() {
  const t = useTranslations("terms");

  return (
    <>
      <PageHero
        eyebrow="Terms"
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
      />
      <Section>


        {/* Content */}
        <div className="space-y-8">
          {/* Agreement */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 flex-shrink-0">
                <Scale className="w-5 h-5 text-[var(--accent-primary-light)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {t("sections.agreement.title")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {t("sections.agreement.content")}
                </p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10 flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-[var(--accent-secondary-light)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {t("sections.service.title")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {t("sections.service.content")}
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {(t.raw("sections.service.items") as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-secondary-light)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 flex-shrink-0">
                <Shield className="w-5 h-5 text-[var(--accent-primary-light)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {t("sections.responsibilities.title")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {t("sections.responsibilities.content")}
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {(t.raw("sections.responsibilities.items") as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary-light)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 flex-shrink-0">
                <CreditCard className="w-5 h-5 text-[var(--accent-primary-light)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {t("sections.payment.title")}
                </h2>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  {(t.raw("sections.payment.items") as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary-light)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-red-500/10 flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {t("sections.termination.title")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {t("sections.termination.content")}
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {(t.raw("sections.termination.items") as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              {t("sections.liability.title")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t("sections.liability.content")}
            </p>
          </div>

          {/* Governing Law */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              {t("sections.law.title")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t("sections.law.content")}
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              {t("sections.changes.title")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t("sections.changes.content")}
            </p>
          </div>

          {/* Contact */}
          <div className="glass-card p-6 sm:p-8 text-center">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              {t("contact.title")}
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              {t("contact.description")}
            </p>
            <a
              href={`mailto:${t("contact.email")}`}
              className="inline-flex min-h-6 items-center text-[var(--accent-primary-light)] hover:underline font-medium"
            >
              {t("contact.email")}
            </a>
          </div>
        </div>
    </Section>
  </>
  );
}
