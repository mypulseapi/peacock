# legacy/

Code that the move to GitHub Pages took out of the build. Nothing here is compiled, imported or
deployed. It is kept because each file answers a question that will be asked again.

## server/

GitHub Pages serves files. It runs no Node, so a route handler and a proxy have nowhere to execute.

- **`api/`** — four route handlers (`contact`, `newsletter`, `careers`, `forms/config`). Each only
  forwarded to the gateway. They existed so the browser posted same-origin: no CORS preflight, and
  the gateway's address never appeared in the page. `src/lib/forms.ts` now posts to the gateway
  directly, which means **the gateway must allow this site's origin in CORS** or every form fails
  in the browser with nothing in any server log.
- **`gateway.ts`** — the server-side forwarder those handlers shared. Its error-envelope
  translation moved into `src/lib/forms.ts` unchanged, because the form components read the flat
  `{ error, details }` shape and changing that would change messages visitors see.
- **`proxy.ts`** — the next-intl middleware. It redirected `/` to `/vi` and matched locale
  prefixes. With no middleware, `src/app/page.tsx` renders a static redirect document instead.

If this site ever moves back to a host that runs Node, these three come back and
`src/lib/forms.ts` goes back to posting at `/api/*`.
