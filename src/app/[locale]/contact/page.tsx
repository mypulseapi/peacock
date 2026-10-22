import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { DesignedContact } from "@/components/designed/contact";
import { buildAlternates } from "@/lib/seo";
import { SITE, url } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/contact"),
  };
}

const contactJsonLd = {
  "@type": "ContactPage",
  name: "Contact Pulse",
  description:
    "Get in touch with the Pulse team for sales, support, and partnerships.",
  url: url("/en/contact"),
  mainEntity: {
    "@type": "Organization",
    name: "Pulse",
    url: SITE.www,
    email: "getintouch@thepulseapi.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "getintouch@thepulseapi.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        email: "getintouch@thepulseapi.com",
      },
    ],
  },
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  // Static rendering. Without this next-intl resolves the locale from `headers()`, and
  // `output: "export"` has no request to read: the page fails to prerender with
  // `dynamic = "error"`. Calling it in `generateMetadata` alone is not enough -- that runs in
  // its own scope, so the page body still falls back to the dynamic path.
  setRequestLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/contact" nodes={[contactJsonLd]} />
      {/* English gets the designer's converted page; Vietnamese keeps the translated one until
          that conversion's text has been extracted and translated. See [locale]/page.tsx. */}
      <DesignedContact />
    </>
  );
}
