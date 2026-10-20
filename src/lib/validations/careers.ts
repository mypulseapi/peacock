import { z } from "zod";

// Allowed file types for resume
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Job application schema
export const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s\-'.]+$/,
      "Name can only contain letters, spaces, hyphens, apostrophes, and periods"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),

  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .regex(
      /^(\+?[\d\s\-().]+)?$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),

  linkedin: z
    .string()
    .max(200, "LinkedIn URL must be less than 200 characters")
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          const url = new URL(val);
          return url.hostname.includes("linkedin.com");
        } catch {
          return false;
        }
      },
      "Please enter a valid LinkedIn URL"
    )
    .optional()
    .or(z.literal("")),

  coverLetter: z
    .string()
    .max(5000, "Cover letter must be less than 5000 characters")
    .optional()
    .or(z.literal("")),

  jobId: z
    .string()
    .min(1, "Job ID is required")
    .max(100, "Invalid job ID"),

  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(200, "Invalid job title"),

  recaptchaToken: z
    .string()
    .min(1, "Verification is required"),
});

// File validation (separate since it's handled differently)
export const resumeValidation = {
  validateType: (type: string): boolean => {
    return ALLOWED_FILE_TYPES.includes(type);
  },
  validateSize: (size: number): boolean => {
    return size <= MAX_FILE_SIZE;
  },
  allowedTypes: ALLOWED_FILE_TYPES,
  maxSize: MAX_FILE_SIZE,
  maxSizeMB: MAX_FILE_SIZE / 1024 / 1024,
};

// Type inference
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

// Client-side validation (without recaptcha token)
export const clientJobApplicationSchema = jobApplicationSchema.omit({
  recaptchaToken: true,
});

export type ClientJobApplicationInput = z.infer<typeof clientJobApplicationSchema>;

// Validation error formatter
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });
  return errors;
}
