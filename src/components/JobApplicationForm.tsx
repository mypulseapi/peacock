"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Turnstile } from "@/components/Turnstile";
import { postForm } from "@/lib/forms";
import {
  Send,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import {
  clientJobApplicationSchema,
  resumeValidation,
  formatZodErrors,
} from "@/lib/validations/careers";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

interface FieldErrors {
  [key: string]: string;
}

export function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState("");
  const [tsKey, setTsKey] = useState(0);

  const validateField = (name: string, value: string) => {
    // Create a partial object for validation
    const partialData = {
      ...formData,
      [name]: value,
      jobId,
      jobTitle,
    };

    const result = clientJobApplicationSchema.safeParse(partialData);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      if (errors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: errors[name] }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.resume;
      return newErrors;
    });

    if (file) {
      // Validate file type
      if (!resumeValidation.validateType(file.type)) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: "Please upload a PDF or Word document",
        }));
        return;
      }
      // Validate file size
      if (!resumeValidation.validateSize(file.size)) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: `File size must be less than ${resumeValidation.maxSizeMB}MB`,
        }));
        return;
      }
      setResume(file);
    }
  };

  const removeResume = () => {
    setResume(null);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      setFieldErrors({});

      // Validate all fields before submission
      const validationData = {
        ...formData,
        jobId,
        jobTitle,
      };

      const validationResult = clientJobApplicationSchema.safeParse(validationData);

      if (!validationResult.success) {
        const errors = formatZodErrors(validationResult.error);
        setFieldErrors(errors);
        setSubmitError("Please fix the errors above");
        return;
      }

      // Validate resume
      if (!resume) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: "Resume is required",
        }));
        setSubmitError("Please upload your resume");
        return;
      }

      if (!token) {
        setSubmitError("Please complete the verification below.");
        return;
      }

      setIsSubmitting(true);

      try {
        const submitData = new FormData();
        submitData.append("name", formData.name.trim());
        submitData.append("email", formData.email.trim().toLowerCase());
        submitData.append("phone", formData.phone.trim());
        submitData.append("linkedin", formData.linkedin.trim());
        submitData.append("coverLetter", formData.coverLetter.trim());
        submitData.append("jobId", jobId);
        submitData.append("jobTitle", jobTitle);
        submitData.append("recaptchaToken", token);
        submitData.append("resume", resume);

        const { ok, data } = await postForm("careers", submitData);

        if (!ok) {
          // Handle validation errors from server
          if (data.details) {
            setFieldErrors(data.details);
            setSubmitError("Please fix the errors above");
          } else {
            throw new Error(data.error || "Failed to submit application");
          }
          return;
        }

        setIsSubmitted(true);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Failed to submit application. Please try again."
        );
      } finally {
        setIsSubmitting(false);
        // Token is single-use; reset the widget for any retry.
        setToken("");
        setTsKey((k) => k + 1);
      }
    },
    [token, formData, resume, jobId, jobTitle]
  );

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 text-center border-[var(--accent-secondary)]/30">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-secondary)]/10 mb-6">
          <CheckCircle className="w-8 h-8 text-[var(--accent-secondary-light)]" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Application Submitted!
        </h2>
        <p className="text-[var(--text-secondary)] mb-2">
          Thank you for your interest in the <strong>{jobTitle}</strong> position.
        </p>
        <p className="text-[var(--text-muted)] text-sm">
          We&apos;ve sent a confirmation to your email. Our team will review your
          application and get back to you within 5-7 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-8 border-[var(--accent-primary)]/30">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
        Apply for This Position
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Jane Smith"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
              fieldErrors.name
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            }`}
            required
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="jane@example.com"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            }`}
            required
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="+1 (555) 123-4567"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
              fieldErrors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            }`}
          />
          {fieldErrors.phone && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            LinkedIn Profile
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="https://linkedin.com/in/janesmith"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
              fieldErrors.linkedin
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            }`}
          />
          {fieldErrors.linkedin && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.linkedin}
            </p>
          )}
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Resume <span className="text-red-400">*</span>
          </label>
          {resume ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/30">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[var(--accent-secondary-light)]" />
                <span className="text-[var(--text-primary)] text-sm truncate max-w-[200px]">
                  {resume.name}
                </span>
                <span className="text-[var(--text-muted)] text-xs">
                  ({(resume.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={removeResume}
                className="p-1 hover:bg-[var(--surface-border)] rounded transition-colors"
              >
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          ) : (
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                fieldErrors.resume
                  ? "border-red-500 hover:border-red-400"
                  : "border-[var(--surface-border)] hover:border-[var(--text-muted)]"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                PDF or Word document (max {resumeValidation.maxSizeMB}MB)
              </p>
            </div>
          )}
          {fieldErrors.resume && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.resume}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Cover Letter / Why You&apos;re Interested
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Tell us why you're excited about this role and what makes you a great fit..."
            rows={5}
            className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
              fieldErrors.coverLetter
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
            }`}
          />
          {fieldErrors.coverLetter && (
            <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.coverLetter}
            </p>
          )}
          <p className="mt-1.5 text-xs text-[var(--text-muted)]">
            {formData.coverLetter.length}/5000 characters
          </p>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {submitError}
            </p>
          </div>
        )}

        <Turnstile key={tsKey} onToken={setToken} className="flex justify-center" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Application
            </>
          )}
        </button>

        <p className="text-xs text-[var(--text-muted)] text-center">
          By submitting, you agree to our{" "}
          <Link
            href="/privacy"
            className="underline hover:text-[var(--text-secondary)]"
          >
            Privacy Policy
          </Link>
          . We&apos;ll only use your information for this application.
        </p>

      </form>
    </div>
  );
}
