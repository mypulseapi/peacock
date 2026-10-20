"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import { SITE } from "./site";

/**
 * The browser-side Better Auth client (ODIN/engineering/AUTH.md § 5, phase G).
 *
 * Vendored from `@pulse/web-auth` when this site moved out of the monorepo into its own repository
 * and onto GitHub Pages. A `workspace:*` dependency cannot resolve in a repo that installs on its
 * own, and the whole of what this site used was this file: `authClient` and `isGoogleEnabled`, in
 * six form components. Copying thirty lines beat publishing a package to a registry for them.
 *
 * It is a copy, so it can drift from the original. What would break is the `inferAdditionalFields`
 * shape below, which must keep matching `additionalFields` in packages/api/auth — and that was
 * already true of the shared version, because the drift that matters is between the client and the
 * server, not between two clients.
 */
export const authClient = createAuthClient({
  // The API base, not the app's own origin: the session cookie is set by the auth service.
  baseURL: SITE.auth,

  plugins: [
    // Teaches the client about the columns our `users` table carries beyond Better Auth's core, so
    // `session.user.firstName` is typed rather than `any`. The shape must match the
    // `additionalFields` in packages/api/auth/src/better-auth/auth.ts — they are two halves of one
    // contract, and drift between them is only visible at runtime.
    inferAdditionalFields({
      user: {
        firstName: { type: "string", required: false },
        lastName: { type: "string", required: false },
        mobile: { type: "string", required: false },
        isPlatformUser: { type: "boolean", required: false },
        status: { type: "string", required: false },
      },
    }),
  ],
});

// Deliberately no destructured re-exports. TypeScript cannot name the inferred type of
// `authClient.signUp` without referencing a path inside better-auth's dist, so exporting it as a
// standalone const fails the portability check (TS2742). Call `authClient.signUp.email(...)` — one
// API surface, and the method names stay discoverable through the client rather than a second list
// here that can drift from it.
//
// Note the real names, since the docs disagree with the types: `requestPasswordReset`, not
// `forgetPassword`. The client is a Proxy, so a wrong name 404s at runtime instead of failing the
// build.

/**
 * Whether to render "Continue with Google".
 *
 * The button is **absent** when the provider is not configured, never disabled: a button that does
 * nothing is worse than a button that is not there. The server makes the same check against
 * GOOGLE_CLIENT_ID, so the two cannot disagree about whether the provider exists.
 */
export const isGoogleEnabled = () => Boolean(process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true");
