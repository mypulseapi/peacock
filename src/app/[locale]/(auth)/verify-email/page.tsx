import { RedirectToSignIn, redirectMetadata } from "../RedirectToSignIn";
import { SIGNIN_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Retired; lands on the dashboard's sign-in page. */
export async function generateMetadata({ params }: PageProps) {
  return redirectMetadata((await params).locale, "/verify-email");
}

export default async function Page({ params }: PageProps) {
  return (
    <RedirectToSignIn locale={(await params).locale} target={SIGNIN_URL} />
  );
}
