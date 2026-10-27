import { RedirectToSignIn, redirectMetadata } from "../RedirectToSignIn";
import { SIGNUP_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Create account, a mode of the dashboard's sign-in page (FR-15). */
export async function generateMetadata({ params }: PageProps) {
  return redirectMetadata((await params).locale, "/signup");
}

export default async function Page({ params }: PageProps) {
  return (
    <RedirectToSignIn locale={(await params).locale} target={SIGNUP_URL} />
  );
}
