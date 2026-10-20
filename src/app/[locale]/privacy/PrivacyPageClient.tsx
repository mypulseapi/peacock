"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { Eye, Lock, Server, UserX, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const sections = [
    {
      icon: Eye,
      key: "collect",
    },
    {
      icon: Lock,
      key: "use",
    },
    {
      icon: Server,
      key: "storage",
    },
    {
      icon: UserX,
      key: "dontDo",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
      />
      <Section>


        {/* Privacy Highlights */}
        <div className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 border-[var(--accent-secondary)]/30">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            <h2 className="ed-d4 text-[var(--text-primary)]">
              {t("highlights.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
              {t("highlights.noCookies")}
            </div>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
              {t("highlights.noPII")}
            </div>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
              {t("highlights.gdprCcpa")}
            </div>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
              {t("highlights.soc2")}
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const items = t.raw(`sections.${section.key}.items`) as string[];
            const note = section.key === "collect" ? t(`sections.${section.key}.note`) : null;
            return (
              <div key={idx} className="glass-card p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--accent-primary-light)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] pt-2">
                    {t(`sections.${section.key}.title`)}
                  </h2>
                </div>
                <ul className="space-y-3 ml-0 sm:ml-16">
                  {items.map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-primary-light)] mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {note && (
                  <div className="mt-4 ml-0 sm:ml-16 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
                    <p className="text-sm text-[var(--text-muted)]">
                      <strong className="text-[var(--text-secondary)]">Note:</strong> {note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Your Rights */}
        <div className="glass-card p-6 sm:p-8 mt-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t("rights.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            {t("rights.description")}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(t.raw("rights.items") as string[]).map((right, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="text-[var(--accent-secondary-light)]">✓</span>
                {right}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="glass-card p-6 sm:p-8 mt-8 text-center">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("contact.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            {t("contact.description")}
          </p>
          <a
            href={`mailto:${t("contact.email")}`}
            className="text-[var(--accent-primary-light)] hover:underline font-medium"
          >
            {t("contact.email")}
          </a>
        </div>
    </Section>
  </>
  );
}
