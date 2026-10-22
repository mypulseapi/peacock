import { JobApplicationForm } from "@/components/JobApplicationForm";
import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { img } from "@/lib/cdn";
import { buildAlternates, fitDescription } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ArrowLeft, Briefcase, Clock, MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { forEachLocale } from "@/i18n/locales";
import { getTranslations } from "next-intl/server";
import { JOBS_VI } from "@/content/jobs.vi";

/**
 * One listing in the active locale.
 *
 * A lookup over the English rather than a second copy of the whole record: adding a role is then
 * one edit, and a string with no translation yet renders in English instead of as `undefined`.
 * Role TITLES stay in English deliberately, which is why they are absent from the dictionary; see
 * `content/jobs.vi.ts`.
 */
function localised(job: JobListing, locale: string): JobListing {
  if (locale !== "vi") return job;
  const vi = (value: string) => JOBS_VI[value] ?? value;
  return {
    ...job,
    department: vi(job.department),
    location: vi(job.location),
    type: vi(job.type),
    salary: vi(job.salary),
    description: vi(job.description),
    responsibilities: job.responsibilities.map(vi),
    requirements: job.requirements.map(vi),
    niceToHave: job.niceToHave.map(vi),
  };
}

interface JobListing {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  salary: string;
}

const jobListings: Record<string, JobListing> = {
  "senior-ml-engineer": {
    title: "Senior Machine Learning Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    salary: "Negotiable",
    description:
      "We're looking for a Senior Machine Learning Engineer to build and optimize our real-time inference engine. You'll work on ML models that process millions of requests per day with sub-50ms latency requirements. This is a high-impact role where your work directly affects the personalization experience for millions of e-commerce shoppers.",
    responsibilities: [
      "Design and implement ML models for real-time persona inference",
      "Optimize model performance for sub-50ms latency at scale",
      "Build and maintain our feature engineering pipeline",
      "Collaborate with product to translate business needs into ML solutions",
      "Mentor junior engineers and contribute to technical culture",
      "Stay current with ML research and evaluate new techniques",
    ],
    requirements: [
      "5+ years of machine learning engineering experience",
      "Experience building and deploying real-time inference systems",
      "Strong proficiency in Python and PyTorch or TensorFlow",
      "Background in recommendation systems, NLP, or behavioral modeling",
      "Experience with MLOps: model training, versioning, and deployment",
      "Strong communication skills and ability to work cross-functionally",
    ],
    niceToHave: [
      "Experience with e-commerce or personalization domains",
      "Familiarity with vector databases and similarity search",
      "Experience with streaming data processing (Kafka, Flink)",
      "Publications or open-source contributions in ML",
    ],
  },
  "backend-engineer": {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    salary: "Negotiable",
    description:
      "Join our backend team to design and build the distributed systems that power Pulse. You'll work on high-throughput, low-latency services that handle millions of requests while maintaining strict reliability and performance requirements.",
    responsibilities: [
      "Design and build scalable backend services",
      "Optimize system performance for sub-50ms response times",
      "Implement robust data pipelines for real-time processing",
      "Maintain and improve our Kubernetes-based infrastructure",
      "Participate in on-call rotation and incident response",
      "Contribute to architecture decisions and technical roadmap",
    ],
    requirements: [
      "5+ years of backend engineering experience",
      "Experience with high-throughput, low-latency distributed systems",
      "Proficiency in Go, Rust, or Python",
      "Strong understanding of Kubernetes and cloud infrastructure (AWS/GCP)",
      "Experience with databases (PostgreSQL, Redis, ClickHouse)",
      "Familiarity with observability tools and practices",
    ],
    niceToHave: [
      "Experience with real-time streaming systems",
      "Background in API design and developer experience",
      "Experience with CDN and edge computing",
      "Contributions to open-source infrastructure projects",
    ],
  },
  "frontend-engineer": {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    salary: "Negotiable",
    description:
      "We're looking for a Frontend Engineer to build beautiful, performant interfaces for our dashboard and integration tools. You'll create experiences that help customers understand their personalization performance and optimize their results.",
    responsibilities: [
      "Build and maintain our customer-facing dashboard",
      "Create data visualizations that surface actionable insights",
      "Develop integration tools and documentation experiences",
      "Collaborate with design to implement pixel-perfect interfaces",
      "Optimize frontend performance and user experience",
      "Write tests and maintain code quality standards",
    ],
    requirements: [
      "3+ years of frontend development experience",
      "Expert-level React and TypeScript",
      "Experience with data visualization (D3, Recharts, or similar)",
      "Strong eye for design and attention to UX details",
      "Familiarity with modern CSS (Tailwind, CSS-in-JS)",
      "Experience with testing frameworks (Jest, Cypress)",
    ],
    niceToHave: [
      "Experience with Next.js or similar frameworks",
      "Background in B2B SaaS products",
      "Experience with design systems",
      "Interest in developer tools and documentation",
    ],
  },
  "solutions-engineer": {
    title: "Solutions Engineer",
    department: "Customer Success",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    salary: "Negotiable",
    description:
      "As a Solutions Engineer, you'll help our customers successfully integrate Pulse and maximize their personalization results. You'll bridge the gap between technical implementation and business outcomes, becoming a trusted advisor to our customers.",
    responsibilities: [
      "Guide customers through Pulse integration and setup",
      "Troubleshoot technical issues and provide solutions",
      "Create technical documentation and integration guides",
      "Collaborate with product on customer feedback and feature requests",
      "Conduct technical demos for prospective customers",
      "Build tools and scripts to streamline customer onboarding",
    ],
    requirements: [
      "3+ years in solutions engineering, technical consulting, or similar",
      "Strong understanding of e-commerce platforms (Shopify, Magento, etc.)",
      "Experience with APIs, JavaScript, and web technologies",
      "Excellent communication and presentation skills",
      "Ability to translate technical concepts for non-technical audiences",
      "Customer-focused mindset and problem-solving orientation",
    ],
    niceToHave: [
      "Experience with personalization or recommendation systems",
      "Background in analytics or data platforms",
      "Familiarity with SQL and data analysis",
      "Previous startup experience",
    ],
  },
  "product-designer": {
    title: "Product Designer",
    department: "Product",
    location: "Remote (India/Vietnam)",
    type: "Full-time",
    salary: "Negotiable",
    description:
      "We're looking for a Product Designer to shape the future of our product experience. You'll design intuitive interfaces that make complex personalization technology accessible to e-commerce teams of all technical levels.",
    responsibilities: [
      "Lead design for our customer dashboard and tools",
      "Conduct user research and synthesize insights",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate closely with engineering on implementation",
      "Develop and maintain our design system",
      "Define UX patterns for data-heavy interfaces",
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio demonstrating complex B2B product work",
      "Proficiency in Figma and prototyping tools",
      "Experience designing data-heavy interfaces and dashboards",
      "Ability to conduct and synthesize user research",
      "Strong collaboration skills with engineering teams",
    ],
    niceToHave: [
      "Experience with analytics or marketing technology products",
      "Background in design systems",
      "Basic understanding of frontend development",
      "Interest in data visualization",
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  return forEachLocale(Object.keys(jobListings).map((id) => ({ id })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  const raw = jobListings[id];

  if (!raw) {
    return { title: t("notFound") };
  }
  const job = localised(raw, locale);

  const lead = t("jobMetaLead")
    .replace("{title}", job.title)
    .replace("{type}", job.type)
    .replace("{location}", job.location);

  return {
    title: `${job.title} - ${job.department}`,
    // The job description runs to three hundred characters or more, which Google truncates
    // mid-word. The facts that identify the role are kept whole and the prose fills the rest.
    description: fitDescription(lead, job.description),
    alternates: buildAlternates(locale, `/careers/${id}`),
    openGraph: {
      title: t("jobOgTitle").replace("{title}", job.title),
      description: job.description,
    },
  };
}

export default async function JobPage({ params }: PageProps) {
  const { id, locale } = await params;
  // Static rendering: see the note in [locale]/terms/page.tsx.
  prepareLocale(locale);
  const t = await getTranslations({ locale, namespace: "careers" });
  const raw = jobListings[id];

  if (!raw) {
    notFound();
  }
  const job = localised(raw, locale);

  const jobPostingJsonLd = {
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: "2025-01-01",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Pulse",
      sameAs: SITE.www,
      logo: img("brand/logo.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: ["IN", "VN"],
      },
    },
    jobLocationType: "TELECOMMUTE",
    responsibilities: job.responsibilities.join(", "),
    qualifications: job.requirements.join(", "),
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-6 lg:px-8">
      <PageSchema locale={locale} path={`/careers/${id}`} leaf={job.title} nodes={[jobPostingJsonLd]} />
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/careers"
          className="inline-flex min-h-6 items-center gap-2 py-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("allPositions")}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary-light)] text-sm">
              {job.department}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              {job.salary}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Description */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t("aboutRole")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t("whatYouDo")}
            </h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--accent-primary-light)] mt-1">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t("lookingFor")}
            </h2>
            <ul className="space-y-3">
              {job.requirements.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--accent-secondary-light)]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Nice to Have */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t("niceToHave")}
            </h2>
            <ul className="space-y-3">
              {job.niceToHave.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--accent-tertiary-light)]">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <JobApplicationForm jobId={id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
}
