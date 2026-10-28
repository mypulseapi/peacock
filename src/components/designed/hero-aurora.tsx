/**
 * The aurora behind a hero's words (`aurora` in globals.css): put it first inside a `relative isolate`
 * section. Decorative, so hidden from assistive technology; the section clips it.
 */
export function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora" />
    </div>
  );
}
