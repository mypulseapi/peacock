/**
 * The one inline script on the site, as a shared constant.
 *
 * It has to be inline and blocking: it reads the saved theme and stamps it on
 * <html> before first paint, and any other arrangement flashes the wrong theme.
 *
 * It lives here rather than inline in the layout so there is one copy to reason
 * about. It was going to be hashed for the Content-Security-Policy, until a
 * production build showed that App Router streaming emits around twenty inline
 * bootstrap scripts per page that no hash can cover. See the CSP note in
 * `next.config.ts`. The constant stays because one source is still better than
 * two, and because it is what a nonce would be threaded through if we ever
 * decide static rendering is worth giving up.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('pulse-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
