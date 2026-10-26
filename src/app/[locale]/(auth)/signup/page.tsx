import { RedirectToSignIn, redirectMetadata } from "../RedirectToSignIn";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Retired with website passwords; lands on the sign-in page (AC-08). */
export async function generateMetadata({ params }: PageProps) {
  return redirectMetadata((await params).locale, "/signup");
}

export default async function Page({ params }: PageProps) {
  return <RedirectToSignIn locale={(await params).locale} />;
}
