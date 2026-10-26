import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { docsUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * /docs forwards to the developer handbook (2026-10-27).
 *
 * It held an older API page that still described persona inference, which search engines were
 * surfacing as what Pulse is (PULSE-SEARCH-SEO-AEO-AUDIT-2026-10-26, P0). The handbook is the
 * current equivalent, so this is a noindex page whose canonical is the handbook, forwarding at
 * once, with a link for anyone without scripts. Same shape as /visual-evidence.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "vi"
        ? "Tài liệu cho lập trình viên"
        : "Developer documentation",
    robots: { index: false, follow: true },
    alternates: { canonical: docsUrl(locale === "vi" ? "/vi" : "/") },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const target = docsUrl(locale === "vi" ? "/vi" : "/");
  return (
    <section className="frame py-32 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)})`,
        }}
      />
      <h1 className="text-title">
        {locale === "vi"
          ? "Tài liệu đã chuyển sang trang dành cho lập trình viên"
          : "The documentation has moved to the developer handbook"}
      </h1>
      <a href={target} className="btn-primary mt-8 inline-flex">
        {locale === "vi" ? "Mở tài liệu" : "Open the docs"}
      </a>
    </section>
  );
}
