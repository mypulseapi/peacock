"use client";

import { NewsletterForm } from "@/components/NewsletterForm";
import type { ReactNode } from "react";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { useTranslations } from "next-intl";
import { DEMO_URL, SIGNUP_URL } from "@/lib/constants";
import {
  Code,
  Zap,
  Key,
  Webhook,
  Database,
  ArrowRight,
  Terminal,
  FileJson,
  Clock,
  Rocket,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

// Inline <code> rendering for translated rich-text strings.
const codeTag = {
  code: (chunks: ReactNode) => (
    <code className="mx-0.5 px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--accent-primary-light)] text-[0.95em]">
      {chunks}
    </code>
  ),
};

export default function DocsPage() {
  const t = useTranslations("docs");
  // The copy affordance is not docs-specific, so its strings live in `common`.
  const tc = useTranslations("common");
  const copy = { copyLabel: tc("copy"), copiedLabel: tc("copied") };
  const quickLinks = [
    {
      icon: Rocket,
      title: t("quickStart.navTitle"),
      description: t("quickStart.navDescription"),
      href: "#quickstart",
    },
    {
      icon: Key,
      title: t("nav.authTitle"),
      description: t("nav.authDesc"),
      href: "#authentication",
    },
    {
      icon: Zap,
      title: t("nav.inferTitle"),
      description: t("nav.inferDesc"),
      href: "#inference",
    },
    {
      icon: Sparkles,
      title: t("nav.personalizeTitle"),
      description: t("nav.personalizeDesc"),
      href: "#personalize",
    },
    {
      icon: Database,
      title: t("nav.catalogTitle"),
      description: t("nav.catalogDesc"),
      href: "#tagging",
    },
    {
      icon: Webhook,
      title: t("nav.webhooksTitle"),
      description: t("nav.webhooksDesc"),
      href: "#webhooks",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
        aside={
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image
              src={img("product/docs.webp")}
              alt={t("heroAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
        }
      />
      <Section>
        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href={link.href}
                className="glass-card p-5 hover:border-[var(--accent-primary)]/30 transition-all group"
              >
                <Icon className="w-6 h-6 text-[var(--accent-primary-light)] mb-3" />
                <h2 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary-light)] transition-colors">
                  {link.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">{link.description}</p>
              </a>
            );
          })}
        </div>

        {/* Base URL */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-5 h-5 text-[var(--accent-primary-light)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">{t("baseUrl")}</h2>
          </div>
          <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 font-mono text-sm">
            <span className="text-[var(--text-muted)]">https://</span>
            <span className="text-[var(--accent-primary-light)]">api.thepulseapi.com</span>
            <span className="text-[var(--text-muted)]">/api/v1</span>
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            {t("overview.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-3xl">{t("overview.intro")}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                n: "1",
                title: t("overview.step1Title"),
                desc: t("overview.step1Desc"),
                href: "#quickstart",
              },
              {
                n: "2",
                title: t("overview.step2Title"),
                desc: t("overview.step2Desc"),
                href: "#tagging",
              },
              {
                n: "3",
                title: t("overview.step3Title"),
                desc: t("overview.step3Desc"),
                href: "#personalize",
              },
            ].map((s) => (
              <a
                key={s.n}
                href={s.href}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 transition-all"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary-light)] text-sm font-semibold mb-3">
                  {s.n}
                </span>
                <h2 className="font-semibold text-[var(--text-primary)] mb-1">{s.title}</h2>
                <p className="text-sm text-[var(--text-muted)]">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Start Section */}
        <section id="quickstart" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-secondary)]/10">
              <Rocket className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("quickStart.title")}</h2>
          </div>

          <p className="text-[var(--text-secondary)] mb-6 max-w-3xl">
            {t("quickStart.description")}
          </p>

          {/* Step 1 */}
          <div className="glass-card p-6 mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">
              {t("quickStart.step1Title")}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">{t("quickStart.step1Desc")}</p>
            <CodeBlock
              {...copy}
              filename="index.html"
              code={`<!-- Add to your site's <head> -->
<script src="https://cdn.thepulseapi.com/sdk/v0/pulse.iife.js" async></script>`}
            />
          </div>

          {/* Step 2 */}
          <div className="glass-card p-6 mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">
              {t("quickStart.step2Title")}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">{t("quickStart.step2Desc")}</p>
            <CodeBlock
              {...copy}
              filename="index.html"
              code={`<script>
  window.addEventListener('DOMContentLoaded', () => {
    Pulse.init({
      merchantId: 'your_merchant_id',
      apiKey: 'pk_live_xxx'
    });
  });
</script>`}
            />
          </div>

          {/* Step 3 */}
          <div className="glass-card p-6 mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">
              {t("quickStart.step3Title")}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">{t("quickStart.step3Desc")}</p>
            <CodeBlock
              {...copy}
              filename="product-list.html"
              code={`<select data-pulse-track="sort_preference">
  <option value="price_low_high">Price: Low to High</option>
  <option value="price_high_low">Price: High to Low</option>
</select>`}
            />
          </div>

          {/* Done */}
          <div className="glass-card p-5 border-[var(--accent-secondary)]/30">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-[var(--accent-secondary-light)]">
                {t("quickStart.doneTitle")}:
              </strong>{" "}
              {t("quickStart.doneDesc")}
            </p>
          </div>
        </section>

        {/* Authentication Section */}
        <section id="authentication" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-primary)]/10">
              <Key className="w-5 h-5 text-[var(--accent-primary-light)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("auth.title")}</h2>
          </div>

          <div className="glass-card p-6 mb-6">
            <p className="text-[var(--text-secondary)] mb-4">
              {t("auth.signupNote")}{" "}
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-primary-light)] underline underline-offset-2"
              >
                {t("auth.signupCta")}
              </a>
            </p>
            <p className="text-[var(--text-secondary)] mb-4">{t.rich("auth.intro", codeTag)}</p>

            <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-[var(--text-muted)]"># Example request with authentication</div>
              <div className="mt-2">
                <span className="text-[var(--accent-secondary-light)]">curl</span>
                <span className="text-[var(--text-secondary)]"> -X POST </span>
                <span className="text-[var(--accent-highlight)]">
                  &quot;https://api.thepulseapi.com/api/v1/session&quot;
                </span>
                <span className="text-[var(--text-secondary)]"> \</span>
              </div>
              <div className="ml-4">
                <span className="text-[var(--text-secondary)]">-H </span>
                <span className="text-[var(--accent-highlight)]">
                  &quot;x-api-key: YOUR_API_KEY&quot;
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border-amber-500/30">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-amber-400">{t("auth.securityLabel")}:</strong>{" "}
              {t("auth.securityNote")}
            </p>
          </div>
        </section>

        {/* Inference API Section */}
        <section id="inference" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-secondary)]/10">
              <Zap className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("inference.title")}</h2>
          </div>

          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary-light)] text-xs font-mono">
                POST
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/session</code>
            </div>

            <p className="text-[var(--text-secondary)] mb-4">{t("inference.desc")}</p>

            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Clock className="w-4 h-4" />
              <span>{t("inference.latency")}</span>
            </div>
          </div>

          {/* Request */}
          <div className="glass-card p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <FileJson className="w-4 h-4 text-[var(--accent-primary-light)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">
                {t("inference.requestBody")}
              </h3>
            </div>
            <CodeBlock
              filename="request.json"
              code={`{
  "session_id": "sess_abc123",
  "context": {
    "device": "mobile",
    "browser": "safari",
    "referrer": "instagram.com",
    "geo": { "country": "US", "region": "CA" },
    "time": "2025-01-14T23:30:00Z"
  },
  "behavior": {
    "search_query": "running shoes under 100",
    "filters": ["price:0-100", "rating:4+"],
    "viewed_products": ["prod_123", "prod_456"],
    "dwell_time_ms": 45000
  }
}`}
            />
          </div>

          {/* Response */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileJson className="w-4 h-4 text-[var(--accent-secondary-light)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">
                {t("inference.response")}
              </h3>
            </div>
            <CodeBlock
              filename="200 OK"
              code={`{
  "persona": {
    "primary": "value_conscious_runner",
    "confidence": 0.89,
    "attributes": {
      "price_sensitivity": "high",
      "brand_loyalty": "low",
      "social_proof_reliance": "high",
      "purchase_intent": "active"
    }
  },
  "recommendations": {
    "product_ids": ["prod_789", "prod_012", "prod_345"],
    "rerank_scores": [0.94, 0.91, 0.87]
  },
  "metadata": {
    "inference_time_ms": 32,
    "model_version": "v2.3.1"
  }
}`}
            />
          </div>
        </section>

        {/* Catalog Sync Section */}
        <section id="tagging" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-tertiary)]/10">
              <Database className="w-5 h-5 text-[var(--accent-tertiary-light)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("catalog.title")}</h2>
          </div>

          <div className="glass-card p-6 mb-6">
            <p className="text-[var(--text-secondary)] mb-3">{t("catalog.intro")}</p>
            <p className="text-sm text-[var(--text-muted)]">{t.rich("catalog.async", codeTag)}</p>
          </div>

          {/* Catalogue writes are dashboard-authenticated, not publishable-key authenticated.
              `/products/**` and `/categories/**` are `auth: 'jwt'` in the gateway's route
              registry, so the publishable key documented above cannot call them. Said here
              because the page previously implied one key opened everything. */}
          <div className="glass-card p-5 mb-4 border border-amber-500/30">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-amber-400">Different credential:</strong> catalogue writes are
              authenticated as a signed-in dashboard session, not with the publishable
              <code className="mx-1 font-mono text-[var(--text-primary)]">pk_live_</code>
              key used for the calls above.
            </p>
          </div>

          {/* Upsert products */}
          <div className="glass-card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-primary)]/20 text-[var(--accent-primary-light)] text-xs font-mono">
                POST
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/products</code>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              {t.rich("catalog.upsertDesc", codeTag)}
            </p>
            <CodeBlock
              filename="POST /v1/products"
              code={`{
  "products": [
    {
      "id": "prod_123",
      "name": "Performance Running Shoe",
      "description": "Lightweight cushioned trainer for daily runs",
      "price": 129.99,
      "category_id": "cat_running_shoes",
      "image_url": "https://...",
      "in_stock": true
    }
  ]
}`}
            />
          </div>

          {/* Categories */}
          <div className="glass-card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-primary)]/20 text-[var(--accent-primary-light)] text-xs font-mono">
                POST
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/categories</code>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              {t.rich("catalog.categoriesDesc", codeTag)}
            </p>
            <CodeBlock
              filename="POST /v1/categories"
              code={`{
  "categories": [
    { "id": "cat_footwear", "name": "Footwear", "parent_id": null },
    { "id": "cat_running_shoes", "name": "Running Shoes", "parent_id": "cat_footwear" }
  ]
}`}
            />
          </div>

          {/* Delete */}
          <div className="glass-card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-highlight)]/20 text-[var(--accent-highlight)] text-xs font-mono">
                DELETE
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/products/{`{id}`}</code>
            </div>
            <p className="text-[var(--text-secondary)]">{t("catalog.deleteDesc")}</p>
          </div>

          <div className="glass-card p-5 border-[var(--accent-secondary)]/30">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-[var(--accent-secondary-light)]">
                {t("catalog.syncLabel")}:
              </strong>{" "}
              {t("catalog.syncNote")}
            </p>
          </div>
        </section>

        {/* Personalization API Section */}
        <section id="personalize" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-secondary)]/10">
              <Sparkles className="w-5 h-5 text-[var(--accent-secondary-light)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("personalize.title")}</h2>
          </div>

          <div className="glass-card p-6 mb-6">
            <p className="text-[var(--text-secondary)]">{t("personalize.desc")}</p>
          </div>

          {/* Recommend */}
          <div className="glass-card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary-light)] text-xs font-mono">
                POST
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/catalog/ranked</code>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">{t("personalize.recommendDesc")}</p>
            <div className="grid lg:grid-cols-2 gap-4">
              <CodeBlock
                filename="POST /v1/catalog/ranked"
                code={`{
  "session_id": "sess_abc123",
  "type": "for_you",
  "limit": 12
}`}
              />
              <CodeBlock
                filename="200 OK"
                code={`{
  "recommendations": {
    "product_ids": ["prod_789", "prod_012"],
    "rerank_scores": [0.94, 0.91]
  },
  "persona": {
    "primary": "value_conscious_runner",
    "confidence": 0.89
  },
  "metadata": { "inference_time_ms": 28 }
}`}
              />
            </div>
          </div>

          {/* Search */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 rounded bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary-light)] text-xs font-mono">
                POST
              </span>
              <code className="text-[var(--text-primary)] font-mono">/v1/search</code>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">{t("personalize.searchDesc")}</p>
            <div className="grid lg:grid-cols-2 gap-4">
              <CodeBlock
                filename="POST /v1/search"
                code={`{
  "session_id": "sess_abc123",
  "query": "running shoes under 100",
  "filters": ["price:0-100", "rating:4+"],
  "limit": 24
}`}
              />
              <CodeBlock
                filename="200 OK"
                code={`{
  "results": [
    { "product_id": "prod_789", "score": 0.94 },
    { "product_id": "prod_012", "score": 0.91 }
  ],
  "pagination": {
    "cursor": "eyJpZCI6IjEyMyJ9",
    "has_more": true,
    "limit": 24
  }
}`}
              />
            </div>
          </div>
        </section>

        {/* Webhooks Section */}
        <section id="webhooks" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-highlight)]/10">
              <Webhook className="w-5 h-5 text-[var(--accent-highlight)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("webhooks.title")}</h2>
          </div>

          <div className="glass-card p-6">
            <p className="text-[var(--text-secondary)] mb-4">{t("webhooks.intro")}</p>

            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              {t("webhooks.eventsTitle")}
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-secondary-light)]">•</span>
                <code className="text-sm">session.converted</code>, {t("webhooks.converted")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-secondary-light)]">•</span>
                <code className="text-sm">products.tagged</code>, {t("webhooks.tagged")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-secondary-light)]">•</span>
                <code className="text-sm">model.updated</code>, {t("webhooks.updated")}
              </li>
            </ul>
          </div>
        </section>

        {/* Errors Section */}
        <section id="errors" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[var(--accent-highlight)]/10">
              <AlertCircle className="w-5 h-5 text-[var(--accent-highlight)]" />
            </div>
            <h2 className="ed-d4 text-[var(--text-primary)]">{t("errors.title")}</h2>
          </div>

          <div className="glass-card p-6 mb-4">
            <p className="text-[var(--text-secondary)] mb-4">{t("errors.intro")}</p>
            <CodeBlock
              filename="400 Bad Request"
              code={`{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "session_id is required"
  },
  "timestamp": "2026-10-19T08:27:01.722Z",
  "path": "/api/v1/catalog/ranked",
  "correlationId": "a4cc87c6bf160f30"
}`}
            />
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">
              {t("errors.codesTitle")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--surface-border)]">
                    <th className="text-left py-3 text-[var(--text-secondary)] font-medium">
                      {t("errors.codeCol")}
                    </th>
                    <th className="text-left py-3 text-[var(--text-secondary)] font-medium">
                      {t("errors.meaningCol")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  {[
                    ["400", t("errors.e400")],
                    ["401", t("errors.e401")],
                    ["403", t("errors.e403")],
                    ["404", t("errors.e404")],
                    ["422", t("errors.e422")],
                    ["429", t("errors.e429")],
                    ["500", t("errors.e500")],
                  ].map(([code, meaning]) => (
                    <tr
                      key={code}
                      className="border-b border-[var(--surface-border)] last:border-0"
                    >
                      <td className="py-3 font-mono text-[var(--accent-highlight)]">{code}</td>
                      <td className="py-3">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <div className="glass-card p-6 mb-8">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">{t("rateLimits.title")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--surface-border)]">
                  <th className="text-left py-3 text-[var(--text-secondary)] font-medium">
                    {t("rateLimits.planCol")}
                  </th>
                  <th className="text-left py-3 text-[var(--text-secondary)] font-medium">
                    {t("rateLimits.inferCol")}
                  </th>
                  <th className="text-left py-3 text-[var(--text-secondary)] font-medium">
                    {t("rateLimits.catalogCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-3">Starter</td>
                  <td className="py-3">100 req/sec</td>
                  <td className="py-3">10 req/sec</td>
                </tr>
                <tr className="border-b border-[var(--surface-border)]">
                  <td className="py-3">Growth</td>
                  <td className="py-3">500 req/sec</td>
                  <td className="py-3">50 req/sec</td>
                </tr>
                <tr>
                  <td className="py-3">Enterprise</td>
                  <td className="py-3">{t("rateLimits.custom")}</td>
                  <td className="py-3">{t("rateLimits.custom")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SDKs */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-5 h-5 text-[var(--accent-primary-light)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("sdks.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <p className="font-mono text-sm text-[var(--text-primary)] mb-1">
                JavaScript / Node.js
              </p>
              <code className="text-xs text-[var(--text-muted)]">npm install @pulse-ai/sdk</code>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <p className="font-mono text-sm text-[var(--text-primary)] mb-1">Python</p>
              <code className="text-xs text-[var(--text-muted)]">pip install pulse-ai</code>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--surface-border)]">
              <p className="font-mono text-sm text-[var(--text-primary)] mb-1">Ruby</p>
              <code className="text-xs text-[var(--text-muted)]">gem install pulse-ai</code>
            </div>
          </div>
        </div>

        {/* Help CTA */}
        {/* The documentation gate the 2026-10 review asked for: the full set in
          one document, in exchange for an email, so the resources page builds a
          pipeline instead of only answering questions.

          Reuses NewsletterForm rather than standing up a second capture: that
          one already carries Turnstile, the rate limit and the error states. */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[color:var(--ed-line)] bg-[color:var(--brand-card)] p-8 text-center">
          <h2 className="ed-d3 text-[color:var(--ed-ink)]">{t("gateTitle")}</h2>
          <p className="ed-body mx-auto mt-3 max-w-[60ch]">{t("gateBody")}</p>
          <div className="mt-7">
            <NewsletterForm successMessage={t("gateSuccess")} cta={t("gateCta")} />
          </div>
        </div>

        <div className="glass-card p-8 text-center">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{t("needHelp")}</h2>
          <p className="text-[var(--text-secondary)] mb-6">{t("helpDescription")}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t("getSupport")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:support@thepulseapi.com"
              className="btn-secondary inline-flex items-center gap-2"
            >
              {t("contactSupport")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
