"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { DEMO_URL } from "@/lib/constants";
import { Turnstile } from "@/components/Turnstile";
import { Mail, MessageSquare, Send, Building2, Handshake, Newspaper, HelpCircle, CheckCircle, AlertCircle } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { postForm } from "@/lib/forms";
import {
  clientContactFormSchema,
  formatZodErrors,
  inquiryTypeOptions,
  companySizeOptions,
  sectorOptions,
  catalogueValidation,
} from "@/lib/validations/contact";

interface FieldErrors {
  [key: string]: string;
}

const inquiryIcons: { [key: string]: React.ElementType } = {
  sales: Building2,
  support: HelpCircle,
  partnerships: Handshake,
  press: Newspaper,
  general: MessageSquare,
};

const inquiryEmails: { [key: string]: string } = {
  sales: "sales@thepulseapi.com",
  support: "support@thepulseapi.com",
  partnerships: "partners@thepulseapi.com",
  press: "press@thepulseapi.com",
  general: "getintouch@thepulseapi.com",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    sector: "",
    inquiryType: "audit",
    message: "",
  });
  const [catalogue, setCatalogue] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [token, setToken] = useState("");
  const [tsKey, setTsKey] = useState(0);

  const validateField = (name: string, value: string) => {
    const partialData = {
      ...formData,
      [name]: value,
    };

    const result = clientContactFormSchema.safeParse(partialData);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      if (errors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: errors[name] }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    // Validate all fields before submission
    const validationResult = clientContactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors = formatZodErrors(validationResult.error);
      setFieldErrors(errors);
      setSubmitError("Please fix the errors above");
      return;
    }

    if (!token) {
      setSubmitError("Please complete the verification below.");
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * JSON normally, multipart only when a catalogue is attached. Building a
       * multipart body for every message with no file buys nothing, and the
       * route accepts both.
       */
      let result;
      if (catalogue) {
        const payload = new FormData();
        Object.entries({ ...formData, recaptchaToken: token }).forEach(([k, v]) =>
          payload.append(k, String(v)),
        );
        payload.append("catalogue", catalogue);
        result = await postForm("contact", payload);
      } else {
        result = await postForm("contact", { ...formData, recaptchaToken: token });
      }

      const { ok, data } = result;

      if (!ok) {
        // Handle validation errors from server
        if (data.details) {
          setFieldErrors(data.details);
          setSubmitError("Please fix the errors above");
        } else {
          throw new Error(data.error || "Failed to send message");
        }
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Token is single-use; reset the widget for any retry.
      setToken("");
      setTsKey((k) => k + 1);
    }
  }, [token, formData, catalogue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-secondary)]/10 mb-6">
              <CheckCircle className="w-8 h-8 text-[var(--accent-secondary-light)]" />
            </div>
            <h1 className="ed-d1 text-[var(--text-primary)] mb-4">
              {t("success.title")}
            </h1>
            <p className="text-[var(--text-secondary)] mb-6">
              {t("success.description")}
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              {t("success.backHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;

  return (
    <div className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6">
      <div className="max-w-shell mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 mb-6">
            <Mail className="w-8 h-8 text-[var(--accent-primary-light)]" />
          </div>
          <h1 className="ed-d1 mb-5 text-[var(--text-primary)]">
            {t("title")} <span className="text-gradient-blue">{t("titleHighlight")}</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-[62ch]">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                {t("form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      {t("form.name")} <span className="text-red-400">{t("form.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
                      }`}
                      placeholder={t("form.namePlaceholder")}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      {t("form.email")} <span className="text-red-400">{t("form.required")}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
                      }`}
                      placeholder={t("form.emailPlaceholder")}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      {t("form.company")} <span className="text-red-400">{t("form.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                        fieldErrors.company
                          ? "border-red-500 focus:border-red-500"
                          : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
                      }`}
                      placeholder={t("form.companyPlaceholder")}
                    />
                    {fieldErrors.company && (
                      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <label id="companySize-label" htmlFor="companySize" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      {t("form.companySize")}
                    </label>
                    <CustomSelect
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      options={companySizeOptions}
                      placeholder={companySizeOptions[0]?.label}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, companySize: value }))
                      }
                    />
                  </div>
                </div>

                {/* What the client sells. The audit is scored against a sector's
                    buying criteria, so this is the field that makes the first
                    reply useful rather than generic. */}
                <div>
                  <label id="sector-label" htmlFor="sector" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    {t("form.sector")}
                  </label>
                  <CustomSelect
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    options={sectorOptions.map((o) => ({ value: o.value, label: o.label }))}
                    placeholder={sectorOptions[0]?.label}
                    onChange={(value) => setFormData((prev) => ({ ...prev, sector: value }))}
                  />
                </div>

                {/* Optional catalogue. The review asked for a way to send the
                    export instead of being pointed at a link. */}
                <div>
                  <label htmlFor="catalogue" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    {t("form.catalogue")}
                  </label>
                  <input
                    type="file"
                    id="catalogue"
                    name="catalogue"
                    accept=".csv,.json,.xls,.xlsx,text/csv,application/json,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.catalogue;
                        return next;
                      });
                      if (file && !catalogueValidation.validateType(file.type)) {
                        setFieldErrors((prev) => ({ ...prev, catalogue: t("form.catalogueType") }));
                        setCatalogue(null);
                        return;
                      }
                      if (file && !catalogueValidation.validateSize(file.size)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          catalogue: t("form.catalogueSize", { mb: catalogueValidation.maxSizeMB }),
                        }));
                        setCatalogue(null);
                        return;
                      }
                      setCatalogue(file);
                    }}
                    className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent-primary)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                  />
                  <p className="mt-2 text-xs text-[var(--text-muted)]">{t("form.catalogueHint")}</p>
                  {fieldErrors.catalogue && (
                    <p className="mt-2 text-sm text-red-400">{fieldErrors.catalogue}</p>
                  )}
                </div>

                <div>
                  <label id="inquiryType-label" htmlFor="inquiryType" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    {t("form.inquiryType")} <span className="text-red-400">{t("form.required")}</span>
                  </label>
                  <CustomSelect
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    hasError={!!fieldErrors.inquiryType}
                    options={inquiryTypeOptions.map((type) => ({
                      value: type.value,
                      label: t(`inquiryTypes.${type.value}`),
                    }))}
                    onChange={(value) => {
                      setFormData((prev) => ({ ...prev, inquiryType: value }));
                      if (fieldErrors.inquiryType) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.inquiryType;
                          return next;
                        });
                      }
                    }}
                  />
                  {fieldErrors.inquiryType && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.inquiryType}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    {t("form.message")} <span className="text-red-400">{t("form.required")}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
                      fieldErrors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder={t("form.messagePlaceholder")}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.message}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                    {formData.message.length}/5000 {t("form.characters")}
                  </p>
                </div>

                {submitError && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {submitError}
                    </p>
                  </div>
                )}

                <Turnstile key={tsKey} onToken={setToken} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("form.submit")}
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                {t("sidebar.contactDirectly")}
              </h3>
              <div className="space-y-4">
                {inquiryTypeOptions.map((type) => {
                  const Icon = inquiryIcons[type.value] || MessageSquare;
                  const email = inquiryEmails[type.value] ?? inquiryEmails.general;
                  return (
                    <a
                      key={type.value}
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10">
                        <Icon className="w-4 h-4 text-[var(--accent-primary-light)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary-light)] transition-colors">
                          {t(`inquiryTypes.${type.value}`)}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{email}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-8 text-center">
            {t("faq.title")}
          </h2>
          <div className="max-w-[68ch] space-y-3">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-[var(--text-primary)]">{faq.question}</span>
                  <span className={`text-[var(--accent-primary-light)] transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-[var(--text-secondary)]">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 glass-card p-8 sm:p-12 text-center">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t("cta.button")}
          </a>
        </div>
      </div>
    </div>
  );
}
