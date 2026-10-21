"use client";

import { useLocale, useTranslations } from "next-intl";
import { JOBS_VI } from "@/content/jobs.vi";
import { contactEmail } from "@/lib/contact-emails";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { Link } from "@/i18n/routing";
import { MapPin, Clock, ArrowRight, Zap, Heart, Users, Rocket, Coffee, Laptop } from "lucide-react";

const benefitKeys = [
  { icon: Laptop, key: "remote" },
  { icon: Heart, key: "health" },
  { icon: Coffee, key: "pto" },
  { icon: Users, key: "learning" },
  { icon: Zap, key: "tech" },
  { icon: Rocket, key: "growth" },
];

/**
 * The index's own, shorter summaries. Translated through the same lookup the detail pages use, so
 * the two cannot drift: see `content/jobs.vi.ts`.
 */
const openings = [
  {
    id: "senior-ml-engineer",
    title: "Senior Machine Learning Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    description: "Build and optimize our real-time inference engine. You'll work on ML models that process millions of requests per day with sub-50ms latency requirements.",
    requirements: [
      "5+ years of ML engineering experience",
      "Experience with real-time inference systems",
      "Strong Python and PyTorch/TensorFlow skills",
      "Background in recommendation systems or NLP",
    ],
  },
  {
    id: "backend-engineer",
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    description: "Design and build the distributed systems that power Pulse. Focus on scalability, reliability, and performance.",
    requirements: [
      "5+ years backend engineering experience",
      "Experience with high-throughput, low-latency systems",
      "Proficiency in Go, Rust, or Python",
      "Familiarity with Kubernetes and cloud infrastructure",
    ],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    description: "Build beautiful, performant interfaces for our dashboard and integration tools. Create experiences that help customers understand and optimize their personalization.",
    requirements: [
      "3+ years frontend development experience",
      "Expert-level React and TypeScript",
      "Experience with data visualization",
      "Strong eye for design and UX",
    ],
  },
  {
    id: "solutions-engineer",
    title: "Solutions Engineer",
    department: "Customer Success",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    description: "Help customers integrate Pulse and maximize their results. Bridge the gap between technical implementation and business outcomes.",
    requirements: [
      "3+ years in solutions engineering or technical consulting",
      "Strong understanding of e-commerce platforms",
      "Experience with APIs and JavaScript",
      "Excellent communication skills",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Product",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    description: "Shape the future of our product experience. Design intuitive interfaces that make complex personalization technology accessible.",
    requirements: [
      "4+ years product design experience",
      "Strong portfolio showing complex B2B products",
      "Proficiency in Figma",
      "Experience with data-heavy interfaces",
    ],
  },
];

export default function CareersPage() {
  const t = useTranslations("careers");
  // Department, location and contract type are translated; the role title is not, deliberately.
  // See content/jobs.vi.ts.
  const isVi = useLocale() === "vi";
  const tr = (value: string) => (isVi ? (JOBS_VI[value] ?? value) : value);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>{t("title")}{" "} <span className="text-gradient-blue">{t("titleHighlight")}</span></>}
        lede={<>{t("description")}</>}
        aside={
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image src={img("careers/hero.webp")} alt={t("heroAlt")} fill priority
                   sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
          </div>
        }
      />
      <Section>


        {/* Why Join */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-4 text-center">
            {t("benefits.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10 max-w-[62ch]">
            {t("benefits.description")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitKeys.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="glass-card p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 mb-4">
                    <Icon className="w-5 h-5 text-[var(--accent-primary-light)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                    {t(`benefits.${benefit.key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t(`benefits.${benefit.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Culture */}
        <div className="glass-card p-8 sm:p-12 mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-4">
                {t("culture.title")}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {t("culture.description")}
              </p>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-secondary-light)]">✓</span>
                  {t("culture.async")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-secondary-light)]">✓</span>
                  {t("culture.focus")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-secondary-light)]">✓</span>
                  {t("culture.results")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-secondary-light)]">✓</span>
                  {t("culture.transparent")}
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-gradient-blue mb-1">15+</p>
                <p className="text-sm text-[var(--text-muted)]">{t("culture.stats.teamMembers")}</p>
              </div>
              <div className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-gradient-green mb-1">2</p>
                <p className="text-sm text-[var(--text-muted)]">{t("culture.stats.countries")}</p>
              </div>
              <div className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-gradient-purple mb-1">Early Stage</p>
                <p className="text-sm text-[var(--text-muted)]">{t("culture.stats.stage")}</p>
              </div>
              <div className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-gradient-blue mb-1">2025</p>
                <p className="text-sm text-[var(--text-muted)]">{t("culture.stats.founded")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-4 text-center">
            {t("positions.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10">
            {t("positions.noMatch")}{" "}
            <a href="mailto:careers@thepulseapi.com" className="text-[var(--accent-primary-light)] hover:underline">
              careers@thepulseapi.com
            </a>
          </p>

          <div className="space-y-4">
            {openings.map((job) => (
              <Link key={job.id} href={`/careers/${job.id}`}>
                <div className="glass-card p-6 hover:border-[var(--accent-primary)]/30 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="ed-d4 text-[var(--text-primary)] group-hover:text-[var(--accent-primary-light)] transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary-light)] text-xs">
                          {tr(job.department)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {tr(job.location)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {tr(job.type)}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary-light)] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 glass-card p-8 sm:p-12 text-center">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          <a
            href={`mailto:${contactEmail("careers")}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {t("cta.button")}
          </a>
        </div>
    </Section>
  </>
  );
}
