import { z } from "zod";

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),

  recaptchaToken: z
    .string()
    .min(1, "Verification is required"),
});

// Type inference
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Client-side validation (without recaptcha token)
export const clientNewsletterSchema = newsletterSchema.omit({
  recaptchaToken: true,
});

export type ClientNewsletterInput = z.infer<typeof clientNewsletterSchema>;
