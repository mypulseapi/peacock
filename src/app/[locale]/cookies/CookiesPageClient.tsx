"use client";

import { useMounted, useStored, writeStored } from "@/lib/client-hooks";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { useTranslations } from "next-intl";
import { Check, Shield } from "lucide-react";

export default function CookiePolicyPage() {
  const t = useTranslations("cookies");
  const mounted = useMounted();
  const accepted = useStored("pulse-cookie-accepted") === "true";

  const handleAccept = () => {
    writeStored("pulse-cookie-accepted", "true");
  };

  return (
    <>
      <PageHero
        eyebrow="Cookies"
        title={<>{t("title")}</>}
        lede={<>{t("lastUpdated")}</>}
      />
      <Section>


        {/* Main Content */}
        <div className="glass-card p-8 sm:p-12 mb-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10 flex-shrink-0">
              <Shield className="w-6 h-6 text-[var(--accent-secondary-light)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {t("approach.title")}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {t("approach.description")}
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 sm:p-8 border border-[var(--surface-border)]">
            <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-6">
              {t("notice.content")}
            </p>

            {mounted && (
              <button
                onClick={handleAccept}
                disabled={accepted}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  accepted
                    ? "bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary-light)] cursor-default"
                    : "btn-primary"
                }`}
              >
                {accepted ? (
                  <>
                    <Check className="w-5 h-5" />
                    {t("notice.acknowledged")}
                  </>
                ) : (
                  t("notice.accept")
                )}
              </button>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              {t("dontDo.title")}
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              {(t.raw("dontDo.items") as string[]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[var(--accent-secondary-light)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              {t("localStorage.title")}
            </h3>
            <p className="text-[var(--text-secondary)]">
              {t("localStorage.content")}
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              {t("contact.title")}
            </h3>
            <p className="text-[var(--text-secondary)]">
              {t("contact.content")}{" "}
              <a
                href={`mailto:${t("contact.email")}`}
                className="text-[var(--accent-primary-light)] hover:underline"
              >
                {t("contact.email")}
              </a>
            </p>
          </div>
        </div>
    </Section>
  </>
  );
}
