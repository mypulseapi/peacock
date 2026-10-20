import { setRequestLocale } from "next-intl/server";
import { IconSprite } from "@/components/designed/icon-sprite";
import { DesignedHome } from "@/components/designed/home";

/**
 * The converted home page, on its own route.
 *
 * It renders here rather than replacing `/` so the conversion can be compared against the
 * designer's original side by side before anything a visitor sees changes. Deliberately
 * `noindex`: it is the same content as the real home page and must not compete with it.
 *
 * Delete this route once the conversion lands on `/`.
 */
export const metadata = { robots: { index: false, follow: false } };

export default async function PreviewHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IconSprite />
      <DesignedHome />
    </>
  );
}
