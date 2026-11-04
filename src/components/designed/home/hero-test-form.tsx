"use client";

import { useState } from "react";

/**
 * Test My Catalogue in the homepage hero (owner, 2026-11-04). Deliberately light: it opens the test
 * page with the address filled in, where Turnstile and the live run are, so the homepage loads no
 * third-party script for visitors who never use it.
 */
export function HeroTestForm({
  locale,
  label,
  placeholder,
  submit,
  note,
}: {
  locale: string;
  label: string;
  placeholder: string;
  submit: string;
  note: string;
}) {
  const [url, setUrl] = useState("");
  return (
    <form
      action={`/${locale}/test-my-catalogue`}
      method="get"
      className="mt-8"
      onSubmit={(e) => {
        if (!url.trim()) e.preventDefault();
      }}
    >
      <label htmlFor="hero-test-url" className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
        <input
          id="hero-test-url"
          name="url"
          className="field font-mono sm:flex-1"
          inputMode="url"
          autoComplete="url"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="btn-primary shrink-0">
          {submit}
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </form>
  );
}
