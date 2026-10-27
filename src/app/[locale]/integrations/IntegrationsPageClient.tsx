"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { Link } from "@/i18n/routing";
import { DEMO_URL } from "@/lib/constants";
import { docsUrl } from "@/lib/site";
import {
  ShoppingCart,
  Code,
  Zap,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLocale } from "next-intl";

/**
 * Vietnamese for the two arrays below, keyed by the English.
 *
 * A lookup rather than a duplicated array: adding a platform is then one edit, and a string with
 * no translation yet degrades to English instead of breaking the shape. Platform names, protocol
 * names and SDK names are proper nouns and stay as they are in both languages.
 */
const VI: Record<string, string> = {
  // Platform descriptions.
  "Native app with one-click installation. Full support for Shopify Plus.":
    "Ứng dụng gốc, cài đặt chỉ với một cú nhấp. Hỗ trợ đầy đủ Shopify Plus.",
  "Full-featured extension for Magento 2.x and Adobe Commerce.":
    "Tiện ích mở rộng đầy đủ tính năng cho Magento 2.x và Adobe Commerce.",
  "WordPress plugin with deep WooCommerce integration.":
    "Plugin WordPress tích hợp sâu với WooCommerce.",
  "Native app available in the BigCommerce marketplace.":
    "Ứng dụng gốc có sẵn trên chợ ứng dụng BigCommerce.",
  "SFRA cartridge for B2C Commerce Cloud integration.":
    "Cartridge SFRA để tích hợp với B2C Commerce Cloud.",
  "REST API and SDKs for custom integrations and headless commerce.":
    "API REST và SDK cho tích hợp tùy chỉnh và thương mại headless.",
  "Custom / Headless": "Tùy chỉnh / Headless",

  // Features.
  "One-click install": "Cài đặt một cú nhấp",
  "Automatic product sync": "Tự động đồng bộ sản phẩm",
  "Theme integration": "Tích hợp giao diện",
  "Shopify Flow support": "Hỗ trợ Shopify Flow",
  "Composer installation": "Cài đặt qua Composer",
  "Multi-store support": "Hỗ trợ nhiều cửa hàng",
  "Page Builder compatible": "Tương thích Page Builder",
  "Plugin installation": "Cài đặt dạng plugin",
  "Block editor support": "Hỗ trợ trình soạn thảo khối",
  "Gutenberg blocks": "Khối Gutenberg",
  "REST API integration": "Tích hợp API REST",
  "Marketplace app": "Ứng dụng trên chợ ứng dụng",
  "Stencil theme support": "Hỗ trợ giao diện Stencil",
  "Headless compatible": "Tương thích headless",
  "Multi-channel support": "Hỗ trợ đa kênh",
  "SFRA cartridge": "Cartridge SFRA",
  "OCAPI integration": "Tích hợp OCAPI",
  "Einstein compatible": "Tương thích Einstein",
  "Multi-site support": "Hỗ trợ nhiều website",
  "GraphQL support": "Hỗ trợ GraphQL",
  "Server-side rendering": "Kết xuất phía máy chủ",

  // Setup times.
  "5 minutes": "5 phút",
  "10 minutes": "10 phút",
  "30 minutes": "30 phút",
  "1 hour": "1 giờ",
  Varies: "Tùy trường hợp",

  // Data integrations.
  "Send persona data to GA4 for enhanced analytics":
    "Gửi dữ liệu chân dung sang GA4 để phân tích sâu hơn",
  "Route Pulse events through your Segment pipeline":
    "Chuyển sự kiện Pulse qua luồng dữ liệu Segment của bạn",
  "Enrich email campaigns with persona insights":
    "Làm giàu chiến dịch email bằng thông tin chân dung",
  "Power SMS personalization with Pulse data":
    "Cá nhân hoá SMS bằng dữ liệu Pulse",
};

const platforms = [
  {
    name: "Shopify",
    description:
      "Native app with one-click installation. Full support for Shopify Plus.",
    logo: "🛍️",
    status: "available",
    features: [
      "One-click install",
      "Automatic product sync",
      "Theme integration",
      "Shopify Flow support",
    ],
    setupTime: "5 minutes",
  },
  {
    name: "Magento / Adobe Commerce",
    description: "Full-featured extension for Magento 2.x and Adobe Commerce.",
    logo: "🔶",
    status: "available",
    features: [
      "Composer installation",
      "Multi-store support",
      "GraphQL API",
      "Page Builder compatible",
    ],
    setupTime: "30 minutes",
  },
  {
    name: "WooCommerce",
    description: "WordPress plugin with deep WooCommerce integration.",
    logo: "🟣",
    status: "available",
    features: [
      "Plugin installation",
      "Block editor support",
      "Gutenberg blocks",
      "REST API integration",
    ],
    setupTime: "10 minutes",
  },
  {
    name: "BigCommerce",
    description: "Native app available in the BigCommerce marketplace.",
    logo: "🔷",
    status: "available",
    features: [
      "Marketplace app",
      "Stencil theme support",
      "Headless compatible",
      "Multi-channel support",
    ],
    setupTime: "10 minutes",
  },
  {
    name: "Salesforce Commerce Cloud",
    description: "SFRA cartridge for B2C Commerce Cloud integration.",
    logo: "☁️",
    status: "available",
    features: [
      "SFRA cartridge",
      "OCAPI integration",
      "Einstein compatible",
      "Multi-site support",
    ],
    setupTime: "1 hour",
  },
  {
    name: "Custom / Headless",
    description:
      "REST API and SDKs for custom integrations and headless commerce.",
    logo: "⚡",
    status: "available",
    features: [
      "REST API",
      "GraphQL support",
      "JavaScript SDK",
      "Server-side rendering",
    ],
    setupTime: "Varies",
  },
];

const dataIntegrations = [
  {
    name: "Google Analytics 4",
    description: "Send persona data to GA4 for enhanced analytics",
    logo: "📊",
  },
  {
    name: "Segment",
    description: "Route Pulse events through your Segment pipeline",
    logo: "📡",
  },
  {
    name: "Klaviyo",
    description: "Enrich email campaigns with persona insights",
    logo: "📧",
  },
  {
    name: "Attentive",
    description: "Power SMS personalization with Pulse data",
    logo: "💬",
  },
];

export default function IntegrationsPage() {
  const t = useTranslations("integrations");
  // English passes through untouched, so this costs the English page one map lookup per string.
  const isVi = useLocale() === "vi";
  const tr = (value: string) => (isVi ? (VI[value] ?? value) : value);

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
      />
      <Section>
        {/* Key Benefits */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="glass-card p-6 text-center">
            <Clock className="w-8 h-8 text-[var(--accent-secondary-light)] mx-auto mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              {t("quickSetup")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {t("quickSetupDesc")}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Code className="w-8 h-8 text-[var(--accent-primary-light)] mx-auto mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              {t("noCodeChanges")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {t("noCodeChangesDesc")}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Sparkles className="w-8 h-8 text-[var(--accent-tertiary-light)] mx-auto mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              {t("instantValue")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {t("instantValueDesc")}
            </p>
          </div>
        </div>

        {/* E-commerce Platforms */}
        <div className="mb-12 sm:mb-16">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-2 text-center">
            {t("platforms")}
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-8">
            {t("platformsDesc")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{platform.logo}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {tr(platform.name)}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
                      <span className="text-xs text-[var(--accent-secondary-light)]">
                        {t("available")}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {tr(platform.description)}
                </p>

                <div className="mb-4 flex-grow">
                  <ul className="space-y-1.5">
                    {platform.features.map((feature, featureIdx) => (
                      <li
                        key={featureIdx}
                        className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--accent-secondary-light)]" />
                        {tr(feature)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--surface-border)]">
                  <span className="text-xs text-[var(--text-muted)]">
                    {t("setupLabel")}: {tr(platform.setupTime)}
                  </span>
                  <Link
                    href={docsUrl(isVi ? "/vi" : "/")}
                    className="text-sm text-[var(--accent-primary-light)] hover:underline inline-flex min-h-6 items-center gap-1 py-0.5"
                  >
                    {t("viewDocs")}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Integrations */}
        <div className="mb-12 sm:mb-16">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-2 text-center">
            {t("dataIntegrations")}
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-8">
            {t("dataIntegrationsDesc")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataIntegrations.map((integration, idx) => (
              <div key={idx} className="glass-card p-5">
                <span className="text-2xl mb-3 block">{integration.logo}</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                  {tr(integration.name)}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {tr(integration.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-card p-8 sm:p-12 mb-12">
          <h2 className="ed-d4 text-[var(--text-primary)] mb-8 text-center">
            {t("howItWorks")}
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--accent-primary-light)]">
                  1
                </span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("install")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("installDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--accent-secondary-light)]">
                  2
                </span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("connect")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("connectDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-tertiary)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--accent-tertiary-light)]">
                  3
                </span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("personalize")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("personalizeDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* API Section */}
        <div className="glass-card p-8 sm:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-primary)]/10 mb-4">
                <Zap className="w-4 h-4 text-[var(--accent-primary-light)]" />
                <span className="text-sm text-[var(--accent-primary-light)]">
                  REST API
                </span>
              </div>
              <h2 className="ed-d4 text-[var(--text-primary)] mb-4">
                {t("customIntegrations")}
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                {t("customIntegrationsDesc")}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 text-[var(--accent-secondary-light)]" />
                  {t("apiDocsItem")}
                </li>
                <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 text-[var(--accent-secondary-light)]" />
                  {t("apiSdksItem")}
                </li>
                <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 text-[var(--accent-secondary-light)]" />
                  {t("apiWebhooksItem")}
                </li>
              </ul>
              <Link
                href={docsUrl(isVi ? "/vi" : "/")}
                className="btn-primary inline-flex items-center gap-2"
              >
                {t("viewApiDocs")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[var(--bg-tertiary)] rounded-xl p-6 font-mono text-sm overflow-hidden">
              <div className="text-[var(--text-muted)] mb-2">
                {t("codeGetInference")}
              </div>
              <div className="text-[var(--text-secondary)]">
                <span className="text-[var(--accent-tertiary-light)]">
                  const
                </span>{" "}
                response ={" "}
                <span className="text-[var(--accent-tertiary-light)]">
                  await
                </span>{" "}
                pulse.
                <span className="text-[var(--accent-secondary-light)]">
                  infer
                </span>
                ({`{`}
              </div>
              <div className="text-[var(--text-secondary)] ml-4">
                sessionId:{" "}
                <span className="text-[var(--accent-highlight)]">
                  &apos;sess_123&apos;
                </span>
                ,
              </div>
              <div className="text-[var(--text-secondary)] ml-4">
                context: {`{`} device, referrer {`}`},
              </div>
              <div className="text-[var(--text-secondary)] ml-4">
                behavior: {`{`} search, filters {`}`}
              </div>
              <div className="text-[var(--text-secondary)]">{`}`});</div>
              <div className="mt-4 text-[var(--text-muted)]">
                {t("codeReturns")}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-8 sm:p-12 text-center">
          <ShoppingCart className="w-10 h-10 text-[var(--accent-primary-light)] mx-auto mb-4" />
          <h2 className="ed-d4 text-[var(--text-primary)] mb-3">
            {t("readyToIntegrate")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            {t("readyToIntegrateDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t("getStarted")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href={docsUrl(isVi ? "/vi" : "/")}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {t("readDocs")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
