// Small-caps accent section label used above headings across the site.
export function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-display text-sm sm:text-base font-semibold tracking-[0.06em] text-[var(--accent-primary)]">
      {children}
    </span>
  );
}
