/// <reference lib="webworker" />
import { compose } from './answer';
import { decodeVectors, search, type SearchIndex } from './retrieve';

/**
 * The embedder, off the main thread.
 *
 * Two reasons it is a worker and not a hook. The model is ~23 MB and decoding it blocks whatever
 * thread does it, and a forward pass is tens of milliseconds that would otherwise land in the
 * middle of a keystroke. The panel stays responsive while the first load happens, which is the
 * difference between "loading" and "broken".
 *
 * The index ships with the page and the model is fetched on first open, never before: a reader who
 * never opens the assistant pays nothing for it.
 */

type Incoming =
  | { type: 'init'; lang: string }
  | { type: 'ask'; id: number; query: string; lang: string };

type Outgoing =
  | { type: 'ready' }
  | { type: 'progress'; loaded: number; total: number }
  | { type: 'failed'; reason: string }
  | { type: 'answer'; id: number; body: string; code?: unknown; sources: unknown; kind: string };

const post = (msg: Outgoing) => (self as unknown as Worker).postMessage(msg);

let embed: ((text: string, opts: object) => Promise<{ data: ArrayLike<number> }>) | null = null;
let index: SearchIndex | null = null;
let rows: Int8Array | null = null;

async function init(lang: string) {
  try {
    /*
     * One model per language, because the English one cannot read Vietnamese.
     *
     * `all-MiniLM-L6-v2` is 23 MB and English-only. A Vietnamese question against it retrieves
     * nothing useful, which is what "not answering" looked like. `multilingual-e5-small` handles
     * both and retrieves English documentation from a Vietnamese question, measured at 0.78 to
     * 0.86 against the right passage. It costs 129 MB, paid once, on the first question, by the
     * reader who asked for it.
     */
    const [{ pipeline, env }, loaded] = await Promise.all([
      import('@huggingface/transformers'),
      lang === 'vi' ? import('./search-index.vi.json') : import('./search-index.json'),
    ]);

    // The index is the only thing we ship; the weights are fetched once and cached by the
    // browser after the first open.
    index = loaded.default as unknown as SearchIndex;
    rows = decodeVectors(index);

    env.allowLocalModels = false;

    /*
     * Serve the weights from our own CDN rather than the hub.
     *
     * Ten files, 151.7 MiB, almost all of it the multilingual encoder at 135MB. Until this was
     * turned on, every first question on the site fetched that from huggingface.co: a third
     * party on the critical path of a feature we tell people is answered from our own pages,
     * with their rate limits and their uptime.
     *
     * The mirror is at `<cdn>/<prefix>/models/<model>/...`, and `NEXT_PUBLIC_CDN_MODELS=1` is
     * now the default in both workflows.
     *
     * It was off for a fortnight because the bucket had no CORS policy, which is worth keeping
     * written down: an `<img>` needs none and a `fetch()` does, so every other asset had been
     * serving from this bucket for days while the weights failed with a bare
     * `TypeError: Failed to fetch`. The policy allows GET and HEAD, exposes `content-range` and
     * `accept-ranges` because the shards load by range, and was verified by a 206 carrying both
     * those headers and `access-control-allow-origin`.
     *
     * Unset the variable to fall back to the hub. No hostname is written down here either way:
     * the host is built from the same variable as every other asset.
     *
     * Re-mirror a model with:
     *   pnpm exec tsx scripts/upload-to-r2.ts --dir <models> --prefix <prefix>/models
     */
    const cdn = (process.env.NEXT_PUBLIC_CDN_URL || '').replace(/\/+$/, '');
    const prefix = (process.env.NEXT_PUBLIC_CDN_PREFIX || '').replace(/^\/+|\/+$/g, '');
    if (cdn && process.env.NEXT_PUBLIC_CDN_MODELS === '1') {
      env.remoteHost = prefix ? `${cdn}/${prefix}/models/` : `${cdn}/models/`;
      env.remotePathTemplate = '{model}/';
    }

    const pipe = await pipeline('feature-extraction', index.model, {
      dtype: 'q8',
      progress_callback: (p: { status?: string; loaded?: number; total?: number }) => {
        if (p.status === 'progress' && typeof p.loaded === 'number' && typeof p.total === 'number') {
          post({ type: 'progress', loaded: p.loaded, total: p.total });
        }
      },
    });

    embed = (text, opts) => pipe(text, opts) as Promise<{ data: ArrayLike<number> }>;
    post({ type: 'ready' });
  } catch (err) {
    post({ type: 'failed', reason: err instanceof Error ? err.message : 'unknown' });
  }
}

self.addEventListener('message', (event: MessageEvent<Incoming>) => {
  const msg = event.data;

  if (msg.type === 'init') {
    void init(msg.lang);
    return;
  }

  if (msg.type === 'ask') {
    void (async () => {
      if (!embed || !index || !rows) {
        post({ type: 'failed', reason: 'not ready' });
        return;
      }
      // e5 is trained with a `query: ` prefix and scores noticeably worse without it. The
      // prefix travels in the index so the two can never disagree about which model built it.
      const out = await embed(`${index.queryPrefix ?? ''}${msg.query}`, {
        pooling: 'mean',
        normalize: true,
      });
      const query = Float32Array.from(out.data);

      // A query embedded by a different model than the index is refused rather than scored. A
      // cosine between vectors of different provenance returns a plausible number, not an error.
      if (query.length !== index.dimensions) {
        post({ type: 'failed', reason: 'dimension mismatch' });
        return;
      }

      const hits = search(query, index, rows, { lang: msg.lang, limit: 4 });
      const answer = compose(hits, msg.lang);
      post({
        type: 'answer',
        id: msg.id,
        body: answer.body,
        code: answer.code,
        sources: answer.sources,
        kind: answer.kind,
      });
    })();
  }
});
