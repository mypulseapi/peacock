/**
 * PLACEHOLDER PROOF CONTENT. NOT TRUE. DO NOT PUBLISH.
 * ============================================================================
 * Requested as a design exercise: show the site as it would look once the
 * product is finished and running at ten companies. Every company, quotation,
 * job title and figure below is INVENTED so the layout can be judged with
 * realistic content in it.
 *
 * Pulse currently has no customers, no live deployments and no measured
 * conversion result. Publishing any of this as fact would be a false claim to
 * prospective buyers and would contradict `ODIN/demo/DEMO.md` §1.1, which is
 * unambiguous: "one fabricated number invalidates everything beside it."
 *
 * **The gate.** `PROOF.placeholder` is true, and `showProof()` returns false
 * unless NEXT_PUBLIC_SHOW_PLACEHOLDER_PROOF=1 is explicitly set. So these
 * sections render for a designer reviewing locally and are absent from every
 * build by default, including production. To go live for real: replace the
 * content with named, permissioned customers and set `placeholder: false`.
 *
 * Names are deliberately generic inventions. Using a real retailer's name
 * would be impersonation, which is a different and worse problem.
 */

export const PROOF = {
  placeholder: true,

  band: {
    eyebrow: "Placeholder: in production this is the customer band",
    line: "Running on live catalogues at ten retailers, marketplaces and distributors",
  },

  /** Wordmarks render as set type, so nothing here imitates a real brand's mark. */
  customers: [
    "Northbeam Retail", "Halden & Co", "Verity Home", "Maruya Marketplace",
    "Ossory Sports", "Ardent Electric", "Kestrel Supply", "Linden Beauty",
    "Tamarind Grocers", "Ridgeway Parts",
  ],

  stats: [
    { value: "10", label: "catalogues running the audit", sub: "across retail, marketplace and distribution" },
    { value: "2.4M", label: "products measured", sub: "since the first pilot" },
    { value: "41", label: "categories audited", sub: "electronics to grocery" },
    { value: "94%", label: "of top repairs actioned", sub: "within one quarter of the audit" },
  ],

  cases: [
    {
      company: "Northbeam Retail",
      sector: "Consumer electronics",
      headline: "Screen size was missing on 80 laptops. It was the top repair.",
      body: "The audit ranked screen size first on a 216-product shelf. Their merchandising team populated it from supplier PDFs in nine days, and the recomputed readiness number moved from 94 unresolved products to 31.",
      metric: { value: "94 → 31", label: "products still indistinguishable after every answerable question" },
    },
    {
      company: "Maruya Marketplace",
      sector: "Multi-seller marketplace",
      headline: "Eleven thousand sellers, one taxonomy, no idea which gaps mattered.",
      body: "Coverage reporting said the catalogue was 91% complete. The audit found the completeness was concentrated in fields no buyer decision depended on, and ranked three attributes nobody had been tracking.",
      metric: { value: "3 of 12", label: "top-ranked attributes were not on their roadmap at all" },
    },
    {
      company: "Kestrel Supply",
      sector: "Industrial distribution",
      headline: "The audit said their catalogue was mostly fine. That was the useful answer.",
      body: "Two categories scored well enough that discovery was not the bottleneck. They redirected the enrichment budget to the one shelf that did score badly, rather than spreading it across all nine.",
      metric: { value: "1 of 9", label: "categories actually needed the work" },
    },
  ],

  quotes: [
    {
      quote: "We had a completeness dashboard that was 93% green and a discovery problem nobody could explain. The audit explained it in an afternoon.",
      name: "Head of Merchandising",
      company: "Northbeam Retail",
    },
    {
      quote: "The part I did not expect was being told which gaps were cheap. Knowing that storage was extractable from our own titles saved a quarter of work we had already budgeted.",
      name: "Director of Product Data",
      company: "Ardent Electric",
    },
    {
      quote: "They told us one of our categories did not need them. I have never had a vendor do that.",
      name: "Ecommerce Lead",
      company: "Kestrel Supply",
    },
  ],
  /**
   * The revenue step of the hero story. Gated by the same flag for the same
   * reason: these are outcomes of a live test we have not run. Turn the flag on
   * to review the design; it cannot reach a build otherwise.
   */
  outcome: {
    headline: "What the repair was worth",
    stats: [
      { value: "+18%", label: "revenue per session", sub: "vs held-back control" },
      { value: "+2.4k", label: "shoppers reaching a shortlist", sub: "per week, same traffic" },
      { value: "+31%", label: "filter engagement", sub: "screen size, newly available" },
    ],
    caveat: "Measured against a held-back control group on the merchant's own traffic.",
  },
} as const;

/**
 * Placeholder proof is hidden everywhere unless explicitly switched on, so a
 * fabricated customer claim cannot reach a build by being forgotten about.
 */
export function showProof(): boolean {
  if (!PROOF.placeholder) return true;
  return process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_PROOF === "1";
}
