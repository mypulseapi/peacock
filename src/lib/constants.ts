/**
 * Kept as the import path the components already use. The values now come from
 * `./site`, so there is one declaration of each origin rather than two that can
 * drift. New code should import from `./site` directly.
 */
import { SITE, APP_PATHS, appUrl } from "./site";

export const DEMO_URL = SITE.demo;
export const SIGNIN_URL = appUrl(APP_PATHS.signIn);
export const SIGNUP_URL = appUrl(APP_PATHS.signUp);
export const APP_FORGOT_PASSWORD_URL = appUrl("/forgot-password");
export const APP_RESET_PASSWORD_URL = appUrl("/reset-password");
