"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Turnstile } from "@/components/Turnstile";
import {
  domainOf,
  pollTest,
  useSearch,
  startTest,
  testConfig,
  TestError,
  type Finding,
  type LiveEvent,
  type RequirementResult,
  type Teaser,
  type TestState,
} from "@/lib/catalogue-test";

/**
 * Test My Catalogue (rainbow `ODIN/specs/nlr/requirements/store-url-audit/store-url-audit.md`).
 * The merchant enters pages from one store; spider reads them in a queue and this shows it live,
 * then the result the way Pingdom shows a speed test (owner, 2026-11-04): number tiles, what each
 * Pulse product would fix as counts, one finding open as proof, the rest masked to their counts,
 * the calculator on the merchant's own numbers, and the ask.
 *
 * Text arrives as props: `designedText` reads the static export's render store, which a client
 * cannot. `{name}` in a label is filled here.
 */
export type Labels = Record<string, string>;

const RESULTS: RequirementResult[] = [
  "supported",
  "partial",
  "buried",
  "insufficient",
];
const BAR: Record<RequirementResult, string> = {
  supported: "bg-primary",
  partial: "bg-primary/50",
  buried: "bg-muted/50",
  insufficient: "bg-muted/25",
};

function fill(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface Row {
  url: string;
  title?: string;
  state: "queued" | "inspecting" | "done" | "skipped";
  reason?: string;
  facts?: LiveEvent["facts"];
}

export function CatalogueTest({
  labels,
  locale,
  calculator,
}: {
  labels: Labels;
  locale: string;
  calculator: ReactNode;
}) {
  const t = useCallback(
    (k: string, vars: Record<string, string | number> = {}) =>
      fill(labels[k] ?? k, vars),
    [labels],
  );
  const num = useCallback(
    (n: number) =>
      new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(n),
    [locale],
  );

  const [enabled, setEnabled] = useState<boolean | null>(null);
  // A shared result opens straight on it; ?url= prefills the form (the homepage box links here).
  const search = useSearch();
  const [typed, setUrls] = useState<string[] | null>(null);
  const urls = typed ?? [search.get("url") ?? ""];
  const [category, setCategory] = useState<string>("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [chosen, setId] = useState<string | null | undefined>(undefined);
  const id = chosen === undefined ? search.get("id") : chosen;
  const [state, setState] = useState<TestState | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [reqs, setReqs] = useState<
    Record<string, Record<RequirementResult, number>>
  >({});
  const [now, setNow] = useState<string | null>(null);
  const cursor = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    testConfig()
      .then((c) => setEnabled(c.enabled))
      .catch(() => setEnabled(false));
  }, []);

  const apply = useCallback((e: LiveEvent) => {
    if (e.type === "discovered" && e.urls)
      setRows(e.urls.map((url) => ({ url, state: "queued" })));
    if (e.type === "inspecting" && e.url) {
      setNow(e.url);
      setRows((r) =>
        r.map((x) => (x.url === e.url ? { ...x, state: "inspecting" } : x)),
      );
    }
    if (e.type === "inspected" && e.url) {
      setRows((r) =>
        r.map((x) =>
          x.url === e.url
            ? { ...x, state: "done", title: e.title, facts: e.facts }
            : x,
        ),
      );
      if (e.reqs)
        setReqs((prev) => {
          const next = { ...prev };
          for (const [rid, res] of Object.entries(e.reqs!)) {
            const c = {
              ...(next[rid] ?? {
                supported: 0,
                partial: 0,
                buried: 0,
                insufficient: 0,
              }),
            };
            c[res]++;
            next[rid] = c;
          }
          return next;
        });
    }
    if (e.type === "skipped" && e.url)
      setRows((r) =>
        r.map((x) =>
          x.url === e.url ? { ...x, state: "skipped", reason: e.reason } : x,
        ),
      );
  }, []);

  // Poll while running; play each batch across the interval so the ticker moves rather than jumps.
  useEffect(() => {
    if (!id) return;
    let stop = false;
    let handle: number | undefined;
    const tick = async () => {
      try {
        const s = await pollTest(id, cursor.current);
        if (stop) return;
        cursor.current = s.cursor;
        setState(s);
        const gap =
          s.nextPollMs && !reducedMotion()
            ? s.nextPollMs / Math.max(1, s.events.length)
            : 0;
        s.events.forEach((e, i) => {
          if (gap)
            timers.current.push(window.setTimeout(() => apply(e), i * gap));
          else apply(e);
        });
        if (s.nextPollMs) handle = window.setTimeout(tick, s.nextPollMs);
      } catch (e) {
        if (!stop)
          setError(
            e instanceof TestError && e.status === 404
              ? t("notFound")
              : t("error"),
          );
      }
    };
    tick();
    return () => {
      stop = true;
      if (handle) clearTimeout(handle);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [id, apply, t]);

  const domain = domainOf(urls[0] ?? "");
  const mixed = urls.find((u) => u.trim() && domainOf(u) !== domain);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    const list = urls.map((u) => u.trim()).filter(Boolean);
    if (!list.length || mixed || !token) return;
    setBusy(true);
    try {
      const r = await startTest(list, token, category || undefined);
      cursor.current = 0;
      setRows([]);
      setReqs({});
      setState(null);
      setId(r.id);
      window.history.replaceState(null, "", `?id=${r.id}`);
    } catch (e) {
      const err = e as TestError;
      setError(
        err.details
          ? Object.values(err.details)[0]!
          : err.status === 429
            ? t("tooMany")
            : err.status === 503
              ? t("closed")
              : t("error"),
      );
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setId(null);
    setState(null);
    setRows([]);
    setReqs({});
    cursor.current = 0;
    window.history.replaceState(null, "", window.location.pathname);
  };

  const status = state?.status ?? (id ? "queued" : null);
  const teaser = state?.teaser ?? null;
  const done = rows.filter(
    (r) => r.state === "done" || r.state === "skipped",
  ).length;

  return (
    <div className="mx-auto max-w-[1100px]">
      {!id && (
        <form
          onSubmit={submit}
          className="rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
          noValidate
        >
          {enabled === false && (
            <p className="mb-4 text-sm text-pretty text-muted">{t("closed")}</p>
          )}
          <fieldset disabled={enabled !== true || busy} className="space-y-4">
            {urls.map((u, i) => (
              <label key={i} className="block">
                <span className="text-sm font-medium text-ink">
                  {i === 0 ? t("urlLabel") : t("urlMore")}
                </span>
                <input
                  className="field mt-1.5 font-mono"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={
                    i === 0
                      ? t("urlPlaceholder")
                      : domain
                        ? `${domain}/...`
                        : t("urlPlaceholder")
                  }
                  value={u}
                  onChange={(e) =>
                    setUrls(urls.map((x, j) => (j === i ? e.target.value : x)))
                  }
                />
              </label>
            ))}
            {mixed && domain && (
              <p className="text-sm text-ink" role="alert">
                {t("sameDomain", { domain })}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {urls.length < 20 && domain && (
                <button
                  type="button"
                  onClick={() => setUrls([...urls, ""])}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("addUrl")}
                </button>
              )}
              <div
                role="radiogroup"
                aria-label={t("category")}
                className="inline-flex rounded-full border border-line bg-surface-1 p-0.5"
              >
                {["", "laptop", "monitor"].map((c) => (
                  <button
                    key={c || "auto"}
                    type="button"
                    role="radio"
                    aria-checked={category === c}
                    onClick={() => setCategory(c)}
                    className={`min-h-9 rounded-full px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${category === c ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"}`}
                  >
                    {t(c ? `cat_${c}` : "catAuto")}
                  </button>
                ))}
              </div>
            </div>
            {enabled && <Turnstile onToken={setToken} />}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="btn-primary"
                disabled={!domain || !!mixed || !token}
              >
                {busy ? t("starting") : t("submit")}
              </button>
              <span className="text-sm text-muted">{t("note")}</span>
            </div>
            {error && (
              <p className="text-sm text-ink" role="alert">
                {error}
              </p>
            )}
          </fieldset>
        </form>
      )}

      {id && !teaser && (
        <section
          aria-live="polite"
          className="rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">
              {state?.domain ?? domain}
            </h2>
            <p className="text-sm text-muted">
              {status === "queued" && state?.ahead
                ? t("queuedAhead", { n: state.ahead })
                : t(`status_${status}`)}
            </p>
          </div>
          {rows.length > 0 && (
            <>
              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-1"
                role="progressbar"
                aria-valuenow={done}
                aria-valuemax={rows.length}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-700 motion-reduce:transition-none"
                  style={{ width: `${(done / rows.length) * 100}%` }}
                />
              </div>
              {now && (
                <p className="mt-3 truncate font-mono text-xs text-muted">
                  {t("reading")} {now}
                </p>
              )}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ol className="max-h-80 space-y-1 overflow-y-auto pr-2 text-sm">
                  {rows.map((r) => (
                    <li
                      key={r.url}
                      className="flex items-center gap-2 border-t border-line py-1.5 first:border-t-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`size-2 shrink-0 rounded-full ${r.state === "inspecting" ? "animate-pulse bg-primary motion-reduce:animate-none" : r.state === "done" ? "bg-primary" : r.state === "skipped" ? "bg-muted/40" : "bg-line"}`}
                      />
                      <span className="min-w-0 flex-1 truncate text-ink">
                        {r.title || new URL(r.url).pathname}
                      </span>
                      {r.facts && (
                        <span className="flex shrink-0 gap-1 font-mono text-xs">
                          <span
                            title={t("factVisible")}
                            className="rounded bg-primary/10 px-1.5 text-primary"
                          >
                            {r.facts.visible}
                          </span>
                          <span
                            title={t("factBuried")}
                            className="rounded bg-surface-1 px-1.5 text-muted"
                          >
                            {r.facts.buried}
                          </span>
                          <span
                            title={t("factMissing")}
                            className="rounded bg-surface-1 px-1.5 text-ink"
                          >
                            {r.facts.missing}
                          </span>
                          {r.facts.conflicting > 0 && (
                            <span
                              title={t("factConflicting")}
                              className="rounded bg-surface-1 px-1.5 text-ink"
                            >
                              !{r.facts.conflicting}
                            </span>
                          )}
                        </span>
                      )}
                      {r.state === "skipped" && (
                        <span className="shrink-0 text-xs text-muted">
                          {t(`skip_${r.reason}`)}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                    {t("soFar")}
                  </p>
                  <ul className="mt-2 space-y-2.5">
                    {Object.entries(reqs).map(([rid, c]) => {
                      const total = RESULTS.reduce((n, r) => n + c[r], 0) || 1;
                      return (
                        <li key={rid}>
                          <div className="flex justify-between text-sm">
                            <span className="text-ink">{t(`req_${rid}`)}</span>
                            <span className="font-mono text-xs text-muted">
                              {c.supported}/{total}
                            </span>
                          </div>
                          <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-surface-1">
                            {RESULTS.map((r) => (
                              <div
                                key={r}
                                className={`${BAR[r]} transition-[width] duration-700 motion-reduce:transition-none`}
                                style={{ width: `${(c[r] / total) * 100}%` }}
                              />
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 text-xs text-pretty text-muted">
                    {t("legend")}
                  </p>
                </div>
              </div>
            </>
          )}
          {(status === "failed" || (status === "blocked" && !teaser)) && (
            <div className="mt-4">
              <p className="text-sm text-ink">
                {state?.reason ?? t(`status_${status}`)}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {t("testAnother")}
              </button>
            </div>
          )}
          {error && (
            <p className="mt-4 text-sm text-ink" role="alert">
              {error}
            </p>
          )}
        </section>
      )}

      {teaser && state && (
        <TeaserView
          teaser={teaser}
          state={state}
          t={t}
          num={num}
          id={id!}
          locale={locale}
          calculator={calculator}
          onReset={reset}
        />
      )}
    </div>
  );
}

function TeaserView({
  teaser,
  state,
  t,
  num,
  id,
  locale,
  calculator,
  onReset,
}: {
  teaser: Teaser;
  state: TestState;
  t: (k: string, v?: Record<string, string | number>) => string;
  num: (n: number) => string;
  id: string;
  locale: string;
  calculator: ReactNode;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const tiles = [
    {
      label: t("tileProducts"),
      value: num(teaser.tiles.productsTested),
      of: t("tileFound", { n: num(teaser.discovered) }),
    },
    {
      label: t("tileRequirements"),
      value: num(teaser.tiles.requirementsTested),
    },
    {
      label: t("tileFix"),
      value: num(teaser.tiles.productsToFix),
      of: t("tileOf", { n: num(teaser.tiles.productsTested) }),
    },
    {
      label: t("tileAgent"),
      value: num(teaser.tiles.questionsAnswerable),
      of: t("tileOf", { n: num(teaser.tiles.questions) }),
    },
  ];
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const open = teaser.open;
  const title = useMemo(
    () => (open ? findingTitle(open, t, num) : ""),
    [open, t, num],
  );

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-title text-balance">
            {t("resultsTitle", { domain: state.domain })}
          </h2>
          <div className="flex gap-4 text-sm">
            <button
              type="button"
              onClick={share}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {copied ? t("copied") : t("share")}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("testAnother")}
            </button>
          </div>
        </div>
        {teaser.stoppedAfter !== undefined && (
          <p className="mt-2 text-sm text-muted">
            {t("status_blocked", { n: teaser.stoppedAfter })}
          </p>
        )}
        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-line bg-card p-5 text-center"
            >
              <dt className="text-sm text-pretty text-muted">{x.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
                {x.value}
              </dd>
              {x.of && <dd className="mt-1 text-xs text-muted">{x.of}</dd>}
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-ink">
          {t("byProductTitle")}
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teaser.byProduct.map((p) => (
            <li
              key={p.product}
              className="rounded-2xl border border-line bg-card p-5"
            >
              <p className="font-semibold text-ink">{p.product}</p>
              {p.fixes === null ? (
                <p className="mt-2 text-sm text-muted">{t("notChecked")}</p>
              ) : (
                <>
                  <p className="mt-2 font-display text-3xl font-semibold text-ink">
                    {num(p.fixes)}
                  </p>
                  <p className="text-sm text-muted">
                    {t(`unit_${slug(p.product)}`)}
                  </p>
                  {p.products !== null && (
                    <p className="mt-1 text-xs text-muted">
                      {t("acrossProducts", { n: num(p.products) })}
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {open && (
        <section className="rounded-3xl border border-line bg-card p-6 sm:p-8">
          <p className="text-sm font-medium text-muted">{t("openTitle")}</p>
          <h3 className="mt-1 text-xl font-semibold text-pretty text-ink">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("openNext", { product: open.product })}
          </p>
          <ul className="mt-5 space-y-4">
            {open.examples.map((e) => (
              <li
                key={e.url}
                className="border-t border-line pt-4 first:border-t-0 first:pt-0"
              >
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {e.title || e.url}
                </a>
                <ul className="mt-2 space-y-1 text-sm">
                  {e.facts.map((f) => (
                    <li key={f.fact} className="flex flex-wrap gap-x-2">
                      <span className="text-muted">
                        {t(`fact_${slug(f.fact)}`)}:
                      </span>
                      <span className="text-ink">{t(`state_${f.state}`)}</span>
                      {f.value && (
                        <span className="font-mono text-xs text-muted">
                          &ldquo;{f.value.slice(0, 80)}&rdquo;
                        </span>
                      )}
                      {f.found && (
                        <span className="font-mono text-xs text-muted">
                          {t("pageSays", { v: f.found })}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{t("openCheck")}</p>
        </section>
      )}

      {teaser.masked.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-ink">
            {t("maskedTitle", { n: teaser.masked.length })}
          </h3>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-card">
            {teaser.masked.map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                {/* The finding's text is withheld by spider; the bar stands where it would be. */}
                <span
                  aria-hidden="true"
                  className="h-3 flex-1 rounded bg-surface-1 blur-[1px]"
                />
                <span className="shrink-0 text-sm text-muted">{m.product}</span>
                <span className="shrink-0 font-mono text-sm text-ink">
                  {t("maskedCount", { n: num(m.affected), of: num(m.of) })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="text-lg font-semibold text-ink">{t("moneyTitle")}</h3>
        <p className="mt-1 text-sm text-pretty text-muted">
          {t("moneyLede", {
            n: num(teaser.tiles.productsToFix),
            of: num(teaser.tiles.productsTested),
          })}
        </p>
        <div className="mt-4">{calculator}</div>
      </section>

      <section className="rounded-3xl border border-line bg-surface-1 p-6 text-center sm:p-8">
        <h3 className="text-xl font-semibold text-ink">
          {t("unlockTitle", { n: teaser.masked.length })}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-pretty text-muted">
          {t("unlockLede")}
        </p>
        <a
          href={`/${locale}/contact?ref=${id}`}
          className="btn-primary mt-5 inline-flex"
        >
          {t("unlock")}
        </a>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">
            {t("requestsTitle")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {teaser.requests.map((q) => (
              <li
                key={q.id}
                className="border-t border-line pt-2 first:border-t-0"
              >
                <p className="text-ink">&ldquo;{t(`ask_${q.id}`)}&rdquo;</p>
                <p className="text-muted">
                  {t("requestRow", { n: num(q.canRecommend), of: num(q.of) })}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink">{t("cannotTitle")}</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-pretty text-muted">
            <li>{t("cannotReturns")}</li>
            <li>{t("cannotPromo")}</li>
            <li>{t("cannotUplift")}</li>
            {!teaser.cannotSee.filtersRead && <li>{t("cannotFilters")}</li>}
            {teaser.cannotSee.unreadable > 0 && (
              <li>
                {t("cannotUnreadable", { n: teaser.cannotSee.unreadable })}
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** An evidence or request finding's title in the page's language, from its fields; others as sent. */
function findingTitle(
  f: Finding,
  t: (k: string, v?: Record<string, string | number>) => string,
  num: (n: number) => string,
) {
  const req = f.requirements?.[0];
  if (f.kind === "evidence" && req)
    return t("findingEvidence", {
      req: t(`req_${req}`),
      n: num(f.affected),
      of: num(f.of),
    });
  return f.title;
}
