/**
 * The one inline script on the site, as a shared constant.
 *
 * It has to be inline and blocking: it stamps the theme on <html> before first paint, and any
 * other arrangement flashes the wrong one.
 *
 * **It only writes the attribute when the visitor has chosen.** With no stored preference the
 * attribute stays off, and `:root { color-scheme: light dark }` lets `light-dark()` follow the
 * operating system, which is what the brand guidelines ask for. The previous version hardcoded
 * `data-theme="light"` in the markup, so a visitor whose machine is in dark mode got a light site
 * and the dark half of the palette was unreachable without finding the toggle.
 *
 * It lives here rather than inline in the layout so there is one copy to reason about. It was going
 * to be hashed for the Content-Security-Policy, until a production build showed App Router
 * streaming emits around twenty inline bootstrap scripts per page that no hash can cover. See the
 * CSP note in `next.config.ts`.
 */
// `system` is the one value that leaves the attribute off, which hands the page back to
// `color-scheme: light dark`. Anything else, including nothing stored, is a fixed theme:
// the site opens light unless the visitor has said otherwise.
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('pulse-theme');if(t!=='system'){document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}}catch(e){}})();`;
