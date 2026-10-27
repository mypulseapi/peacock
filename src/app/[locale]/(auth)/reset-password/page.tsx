import { RedirectToSignIn, redirectMetadata } from "../RedirectToSignIn";
import { APP_RESET_PASSWORD_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Password reset is the dashboard's page now; a link's `?token=` rides along. */
export async function generateMetadata({ params }: PageProps) {
  return redirectMetadata((await params).locale, "/reset-password");
}

export default async function Page({ params }: PageProps) {
  return (
    <RedirectToSignIn
      locale={(await params).locale}
      target={APP_RESET_PASSWORD_URL}
    />
  );
}
