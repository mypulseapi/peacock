"use client";

import { useClock } from "@/lib/client-hooks";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { useLocale, useTranslations } from "next-intl";

/**
 * Vietnamese for the service, region and incident copy below, keyed by the English.
 *
 * A lookup rather than a second copy of the three arrays: adding a region is then one edit, and an
 * untranslated string degrades to English rather than breaking the shape. Service names that are
 * product names, and the figures beside them, are the same in both languages.
 */
const VI: Record<string, string> = {
  // Services.
  Dashboard: "Bảng điều khiển",
  "Data Pipeline": "Luồng dữ liệu",
  Authentication: "Xác thực",
  "Real-time persona inference endpoint": "Điểm cuối suy luận chân dung theo thời gian thực",
  "Customer dashboard and analytics": "Bảng điều khiển khách hàng và phân tích",
  "Event ingestion and processing": "Thu nhận và xử lý sự kiện",
  "API key and OAuth services": "Dịch vụ khoá API và OAuth",

  // Regions.
  "US East (Virginia)": "Miền Đông Hoa Kỳ (Virginia)",
  "US West (Oregon)": "Miền Tây Hoa Kỳ (Oregon)",
  "EU (Frankfurt)": "Liên minh châu Âu (Frankfurt)",
  "Asia Pacific (Singapore)": "Châu Á Thái Bình Dương (Singapore)",

  // Incidents.
  "January 2, 2025": "Ngày 2 tháng 1 năm 2025",
  "December 15, 2024": "Ngày 15 tháng 12 năm 2024",
  "Scheduled Maintenance Completed": "Đã hoàn tất bảo trì theo lịch",
  "Database optimization and security updates applied successfully.":
    "Đã áp dụng thành công việc tối ưu hoá cơ sở dữ liệu và các bản cập nhật bảo mật.",
  "Elevated API Latency": "Độ trễ API tăng cao",
  "Brief period of increased latency in US East region due to traffic spike.":
    "Độ trễ tăng trong thời gian ngắn tại khu vực miền Đông Hoa Kỳ do lưu lượng tăng đột biến.",
  "15 minutes": "15 phút",
  "8 minutes": "8 phút",
};
import { Activity, CheckCircle, Clock, Server, Globe, Zap, Database, Shield } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function StatusPage() {
  const t = useTranslations("status");
  // English passes through untouched, so this costs the English page one map lookup per string.
  const isVi = useLocale() === "vi";
  const tr = (value: string) => (isVi ? (VI[value] ?? value) : value);
  const currentTime = useClock();

  const services = [
    {
      name: "Inference API",
      description: "Real-time persona inference endpoint",
      status: "operational",
      uptime: "99.99%",
      latency: "32ms",
      icon: Zap,
    },
    {
      name: "Dashboard",
      description: "Customer dashboard and analytics",
      status: "operational",
      uptime: "99.95%",
      latency: "120ms",
      icon: Activity,
    },
    {
      name: "Data Pipeline",
      description: "Event ingestion and processing",
      status: "operational",
      uptime: "99.99%",
      latency: "45ms",
      icon: Database,
    },
    {
      name: "Authentication",
      description: "API key and OAuth services",
      status: "operational",
      uptime: "99.99%",
      latency: "28ms",
      icon: Shield,
    },
  ];

  const regions = [
    { name: "US East (Virginia)", status: "operational", flag: "🇺🇸" },
    { name: "US West (Oregon)", status: "operational", flag: "🇺🇸" },
    { name: "EU (Frankfurt)", status: "operational", flag: "🇪🇺" },
    { name: "Asia Pacific (Singapore)", status: "operational", flag: "🇸🇬" },
  ];

  const recentIncidents = [
    {
      date: "January 2, 2025",
      title: "Scheduled Maintenance Completed",
      description: "Database optimization and security updates applied successfully.",
      status: "resolved",
      duration: "15 minutes",
    },
    {
      date: "December 15, 2024",
      title: "Elevated API Latency",
      description: "Brief period of increased latency in US East region due to traffic spike.",
      status: "resolved",
      duration: "8 minutes",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-[var(--accent-secondary)]";
      case "degraded":
        return "bg-amber-500";
      case "outage":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return t("status.operational");
      case "degraded":
        return t("status.degraded");
      case "outage":
        return t("status.outage");
      default:
        return t("unknown");
    }
  };

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={<>{t("title")}</>}
        lede={<>{t("description")}</>}
      >
        <p className="ed-num text-[0.875rem] text-[color:var(--ed-ink-3)]">
          {t("lastChecked")} {currentTime}
        </p>
      </PageHero>
      <Section>


        {/* Overall Status */}
        <div className="glass-card p-6 sm:p-8 mb-8 border-[var(--accent-secondary)]/30">
          <div className="flex items-center justify-center gap-4">
            <div className="w-4 h-4 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
            <span className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
              {t("allOperational")}
            </span>
          </div>
          <p className="text-center text-[var(--text-secondary)] mt-3">
            {t("allOperationalDesc")}
          </p>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t("services")}
          </h2>
          <div className="space-y-3">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="glass-card p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-[var(--accent-primary)]/10">
                        <Icon className="w-5 h-5 text-[var(--accent-primary-light)]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--text-primary)]">
                          {tr(service.name)}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          {tr(service.description)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:block text-right">
                        <p className="text-sm text-[var(--text-secondary)]">{service.uptime} uptime</p>
                        <p className="text-xs text-[var(--text-muted)]">{service.latency} avg</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(service.status)}`} />
                        <span className="text-sm text-[var(--accent-secondary-light)] hidden sm:inline">
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t("regions")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {regions.map((region, idx) => (
              <div key={idx} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{region.flag}</span>
                  <span className="text-[var(--text-primary)]">{tr(region.name)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(region.status)}`} />
                  <span className="text-sm text-[var(--accent-secondary-light)]">
                    {getStatusText(region.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Stats */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 text-center">
            {t("uptime")}
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gradient-green mb-1">99.99%</p>
              <p className="text-sm text-[var(--text-muted)]">{t("last30")}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gradient-blue mb-1">99.98%</p>
              <p className="text-sm text-[var(--text-muted)]">{t("last90")}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gradient-purple mb-1">99.97%</p>
              <p className="text-sm text-[var(--text-muted)]">{t("last12m")}</p>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t("incidents")}
          </h2>
          <div className="space-y-4">
            {recentIncidents.map((incident, idx) => (
              <div key={idx} className="glass-card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">
                      {tr(incident.title)}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{tr(incident.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--accent-secondary-light)]" />
                    <span className="text-sm text-[var(--accent-secondary-light)] capitalize">
                      {incident.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {tr(incident.description)}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  {t("durationLabel")}: {tr(incident.duration)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-12 glass-card p-8 text-center">
          <Server className="w-8 h-8 text-[var(--accent-primary-light)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("subscribe.title")}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            {t("subscribe.description")}
          </p>
          <NewsletterForm />
        </div>
    </Section>
  </>
  );
}
