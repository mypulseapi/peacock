"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { Shield, Database, UserCheck, FileText, Mail } from "lucide-react";

export default function GDPRPage() {
  const t = useTranslations("gdpr");

  return (
    <>
      <PageHero
        eyebrow="GDPR"
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
      />
      <Section>


        {/* Compliance Badge */}
        <div className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 border-[var(--accent-secondary)]/30 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--accent-secondary)]/10 mb-4">
            <Shield className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            <span className="font-semibold text-[var(--accent-secondary-light)]">
              {t("badge")}
            </span>
          </div>
          <p className="text-[var(--text-secondary)]">
            {t("badgeDescription")}
          </p>
        </div>

        {/* Our Approach */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 flex-shrink-0">
              <Database className="w-5 h-5 text-[var(--accent-primary-light)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                {t("approach.title")}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("approach.description")}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("approach.principles.minimization.title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("approach.principles.minimization.description")}
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("approach.principles.purpose.title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("approach.principles.purpose.description")}
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("approach.principles.storage.title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("approach.principles.storage.description")}
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("approach.principles.security.title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("approach.principles.security.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10">
              <UserCheck className="w-5 h-5 text-[var(--accent-primary-light)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {t("rights.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {(t.raw("rights.items") as Array<{ title: string; description: string }>).map((right, idx) => (
              <div key={idx} className="glass-card p-5">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  {right.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {right.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Basis */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10 flex-shrink-0">
              <FileText className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                {t("legal.title")}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {t("legal.description")}
              </p>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                {(t.raw("legal.items") as Array<{ label: string; description: string }>).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--accent-secondary-light)] font-semibold">{idx + 1}.</span>
                    <span><strong>{item.label}:</strong> {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Data Processing Agreement */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("dpa.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {t("dpa.description")}
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {(t.raw("dpa.items") as string[]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--accent-primary-light)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact DPO */}
        <div className="glass-card p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 mb-4">
            <Mail className="w-6 h-6 text-[var(--accent-primary-light)]" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("contact.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            {t("contact.description")}
          </p>
          <a
            href={`mailto:${t("contact.email")}`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Mail className="w-4 h-4" />
            {t("contact.email")}
          </a>
        </div>
    </Section>
  </>
  );
}
