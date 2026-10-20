import { z } from "zod";

// Valid inquiry types
const INQUIRY_TYPES = ["sales", "support", "partnerships", "press", "general"] as const;

// Valid company sizes
const COMPANY_SIZES = ["", "1-10", "11-50", "51-200", "201-500", "500+"] as const;

// What the client sells. Added 2026-10 at the review's request: the audit is
// scored against a sector's buying criteria, so knowing it before the first call
// is the difference between a generic reply and a useful one.
const SECTORS = [
  "",
  "ecommerce",
  "fmcg",
  "technology",
  "furniture",
  "cosmetics",
  "distribution",
  "other",
] as const;


// Contact form schema
export const contactFormSchema = z.object({
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

  company: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be less than 200 characters"),

  companySize: z
    .enum(COMPANY_SIZES)
    .optional()
    .or(z.literal("")),

  sector: z
    .enum(SECTORS)
    .optional()
    .or(z.literal("")),

  inquiryType: z
    .enum(INQUIRY_TYPES, {
      message: "Please select a valid inquiry type",
    }),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),

  recaptchaToken: z
    .string()
    .min(1, "Verification is required"),
});

// Type inference
export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Client-side validation (without recaptcha token)
export const clientContactFormSchema = contactFormSchema.omit({
  recaptchaToken: true,
});

export type ClientContactFormInput = z.infer<typeof clientContactFormSchema>;

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

// Inquiry types for UI
export const inquiryTypeOptions = [
  { value: "sales", label: "Sales Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "partnerships", label: "Partnerships" },
  { value: "press", label: "Press & Media" },
  { value: "general", label: "General Inquiry" },
] as const;

// Company size options for UI
export const companySizeOptions = [
  { value: "", label: "Select size" },
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
] as const;

// Sector options for UI. Mirrors the Templates categories on the website, so a
// visitor picks the same name they just read.
export const sectorOptions = [
  { value: "", label: "Select sector" },
  { value: "ecommerce", label: "Ecommerce and retail" },
  { value: "fmcg", label: "FMCG and consumer goods" },
  { value: "technology", label: "Technology and electronics" },
  { value: "furniture", label: "Furniture and homewares" },
  { value: "cosmetics", label: "Cosmetics and personal care" },
  { value: "distribution", label: "B2B and industrial" },
  { value: "other", label: "Something else" },
] as const;

// A catalogue export. CSV and JSON are what the audit actually reads; the two
// spreadsheet types are here because that is what a merchandiser exports from a
// PIM without being asked twice.
const CATALOGUE_TYPES = [
  "text/csv",
  "application/csv",
  "application/json",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;
const MAX_CATALOGUE_BYTES = 15 * 1024 * 1024;

export const catalogueValidation = {
  validateType: (type: string): boolean => (CATALOGUE_TYPES as readonly string[]).includes(type),
  validateSize: (size: number): boolean => size <= MAX_CATALOGUE_BYTES,
  allowedTypes: CATALOGUE_TYPES,
  maxSize: MAX_CATALOGUE_BYTES,
  maxSizeMB: MAX_CATALOGUE_BYTES / 1024 / 1024,
};
