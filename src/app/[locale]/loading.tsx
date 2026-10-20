/**
 * Route transition state, the framework's own mechanism.
 *
 * Every page under this segment is server rendered on demand, so a navigation
 * has a real gap between the click and the first byte. Without a `loading.tsx`
 * the browser sits on the previous page for the whole of it and the site feels
 * broken on a slow connection.
 *
 * Shaped like the page that is arriving rather than a spinner: an eyebrow, two
 * title lines, a lede and a panel, which is the top of every page on this site.
 * The skeleton therefore occupies roughly the space the real content will, so
 * the swap is a fill rather than a jump.
 *
 * No client component and no state. Next mounts this while the segment
 * streams and unmounts it when the page commits, so the progress bar is
 * honestly indeterminate: it animates for exactly as long as the wait lasts.
 */
export default function Loading() {
  return (
    <>
      {/* Sits directly under the fixed header. */}
      <div aria-hidden className="fixed inset-x-0 top-[7rem] z-40 h-[3px] overflow-hidden">
        <span className="route-bar block h-full w-1/3 rounded-full" />
      </div>

      <section className="ed-canvas relative overflow-hidden border-b border-[color:var(--ed-line)]">
        <div className="relative mx-auto grid max-w-shell gap-14 px-5 pt-36 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pt-56 lg:pb-24">
          <div>
            <span className="skeleton block h-3 w-28 rounded-full" />
            <span className="skeleton mt-6 block h-11 w-full max-w-[22rem] rounded-xl" />
            <span className="skeleton mt-3 block h-11 w-full max-w-[17rem] rounded-xl" />
            <span className="skeleton mt-8 block h-3.5 w-full max-w-[34rem] rounded-full" />
            <span className="skeleton mt-2.5 block h-3.5 w-full max-w-[31rem] rounded-full" />
            <span className="skeleton mt-2.5 block h-3.5 w-full max-w-[20rem] rounded-full" />
          </div>
          <span className="skeleton hidden h-72 w-full rounded-3xl lg:block" />
        </div>
      </section>

      <span className="sr-only" role="status" aria-live="polite">
        Loading
      </span>
    </>
  );
}
