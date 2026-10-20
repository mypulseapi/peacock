import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js routes
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Also run middleware for the root path
    "/",
  ],
};
