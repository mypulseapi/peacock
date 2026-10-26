import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { Link } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * /visual-evidence was the photograph study, and the Research menu item. Since 2026-10-26 research
 * covers every product at /research, and the study lives at /research/photographs.
 *
 * A page rather than `redirect()`: in a static export that builds a script-only shell marked
 * indexable, with the home page's title and no refresh. This one is noindex, points its canonical
 * at the hub, forwards at once, and still reads as a page with a link if scripts are off.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Nghiên cứu đã chuyển" : "Research has moved",
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/research` },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const target = `/${locale}/research`;
  return (
    <section className="frame py-32 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)} + location.hash)`,
        }}
      />
      <h1 className="text-title">
        {locale === "vi"
          ? "Nghiên cứu giờ bao gồm mọi sản phẩm"
          : "Research now covers every product"}
      </h1>
      <Link
        locale={locale}
        href="/research"
        className="btn-primary mt-8 inline-flex"
      >
        {locale === "vi" ? "Tới trang Nghiên cứu" : "Go to Research"}
      </Link>
    </section>
  );
}
