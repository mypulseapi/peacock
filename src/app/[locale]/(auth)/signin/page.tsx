import { RedirectToSignIn, redirectMetadata } from "../RedirectToSignIn";
import { SIGNIN_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Sign-in is the dashboard's page now (merchant sign-in FR-15). */
export async function generateMetadata({ params }: PageProps) {
  return redirectMetadata((await params).locale, "/signin");
}

export default async function Page({ params }: PageProps) {
  return (
    <RedirectToSignIn locale={(await params).locale} target={SIGNIN_URL} />
  );
}
