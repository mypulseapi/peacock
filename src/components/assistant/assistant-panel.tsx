"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, Bot, RotateCcw, Sparkles, X } from "lucide-react";
import { useAssistant, type Message } from "./use-assistant";
import {
  clearMessages,
  getOpen,
  getOpenOnServer,
  setOpen as writeOpen,
  subscribeOpen,
} from "@/lib/assistant/session";

const SEEN_KEY = "pulse-assistant-greeted";

const COPY = {
  en: {
    open: "Ask Pulse",
    title: "Ask Pulse",
    subtitle:
      "Answers come from thepulseapi.com and the developer docs, never made up.",
    firstLoad:
      "The first question downloads a 23 MB search model. It is cached after that.",
    placeholder: "What does a Decision Audit actually measure?",
    loading: "Getting ready",
    failed:
      "The assistant could not start on this device. Everything it would have said is on the pages themselves.",
    thinking: "Reading the site",
    send: "Send",
    close: "Close",
    restart: "Start a new conversation",
    suggestions: [
      "What does a Decision Audit actually measure?",
      "Which industries is this built for?",
      "What does it cost?",
      "How do I send my first API request?",
    ],
  },
  vi: {
    open: "Hỏi Pulse",
    title: "Hỏi Pulse",
    subtitle:
      "Trả lời từ thepulseapi.com và tài liệu cho lập trình viên, không tự bịa ra.",
    firstLoad:
      "Câu hỏi đầu tiên sẽ tải mô hình tìm kiếm đa ngôn ngữ 129 MB, sau đó được lưu lại trên máy bạn.",
    placeholder: "Decision Audit thực sự đo những gì?",
    loading: "Đang chuẩn bị",
    failed:
      "Trợ lý không khởi động được trên thiết bị này. Mọi điều nó định nói đều có sẵn trên các trang.",
    thinking: "Đang đọc nội dung trang",
    send: "Gửi",
    close: "Đóng",
    restart: "Bắt đầu cuộc trò chuyện mới",
    suggestions: [
      "Decision Audit thực sự đo những gì?",
      "Sản phẩm này dành cho những ngành nào?",
      "Chi phí như thế nào?",
      "Gửi yêu cầu API đầu tiên như thế nào?",
    ],
  },
} as const;

/**
 * Hold back a markdown construct the reveal has not finished.
 *
 * A word-at-a-time reveal lands mid-syntax, and `[Audit a catalogue` with no closing bracket
 * renders as a literal bracket, which looks like a bug rather than like typing. Cutting at the
 * last unterminated marker costs a few characters of latency and keeps every frame valid.
 */
function stable(text: string): string {
  const openLink = text.lastIndexOf("[");
  if (openLink !== -1 && !/\]\([^)]*\)\s*$/.test(text.slice(openLink))) {
    const closed = text.slice(openLink).match(/^\[[^\]]*\]\([^)]*\)/);
    if (!closed) return text.slice(0, openLink);
  }
  const ticks = (text.match(/`/g) ?? []).length;
  if (ticks % 2 === 1) return text.slice(0, text.lastIndexOf("`"));
  const bolds = (text.match(/\*\*/g) ?? []).length;
  if (bolds % 2 === 1) return text.slice(0, text.lastIndexOf("**"));
  return text;
}

/**
 * Inline formatting for one line: bold, code, links, bare URLs.
 *
 * Kept separate from the block pass because the two cannot be done in one sweep. The old version
 * tried, by replacing every newline with `<br/>`, which put a stray break after every list item
 * and left the `<li>` elements with no `<ul>` around them. The result had the right words and
 * visibly wrong spacing.
 */
function inline(text: string): string {
  return (
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-surface-1 rounded px-1 py-0.5 text-[0.85em]">$1</code>',
      )
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary underline underline-offset-2">$1</a>',
      )
      /*
       * Bare URLs become links. The chunks carry their targets as `label (https://...)`, which is
       * right for an agent reading plain text and unusable in a bubble nobody can click. Runs
       * after the markdown pass so an href is not linked twice, and the label is the host and
       * path rather than the whole string, because a full URL on its own line is what was
       * pushing the parenthesis onto a line of its own.
       */
      .replace(
        /(^|[\s(])(https?:\/\/[^\s<)]+)/g,
        (_m, lead: string, url: string) => {
          const shown = url.replace(/^https?:\/\//, "");
          return `${lead}<a href="${url}" class="text-primary underline underline-offset-2 break-all">${shown}</a>`;
        },
      )
  );
}

/**
 * Markdown, only the subset the composed answers use, parsed as blocks.
 *
 * Blocks rather than a string of `<br/>`: a list is a `<ul>` with its own spacing, a paragraph
 * is a `<p>`, and the gaps come from CSS instead of from stray line breaks.
 */
function Rendered({
  text,
  streaming = false,
}: {
  text: string;
  streaming?: boolean;
}) {
  const source = streaming ? stable(text) : text;
  const out: string[] = [];
  let list: string[] = [];
  let para: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    out.push(
      `<ul class="my-2 space-y-1 pl-4">${list
        .map((i) => `<li class="list-disc leading-snug">${i}</li>`)
        .join("")}</ul>`,
    );
    list = [];
  };

  const flushPara = () => {
    if (para.length === 0) return;
    // A lone bold line is a label for whatever follows it ("Related pages"), so it keeps its
    // top margin and drops the bottom one rather than floating between two blocks.
    const only = para.length === 1 ? (para[0] ?? "") : "";
    const isLabel = /^<strong>[^<]*<\/strong>$/.test(only);
    const cls = isLabel ? "mt-3 mb-1 first:mt-0" : "my-2 first:mt-0 last:mb-0";
    out.push(`<p class="${cls}">${para.join(" ")}</p>`);
    para = [];
  };

  for (const raw of source.split("\n")) {
    const line = raw.trim();

    if (line.length === 0) {
      flushPara();
      flushList();
      continue;
    }

    const item = /^[-*]\s+(.*)$/.exec(line);
    if (item) {
      flushPara();
      list.push(inline(item[1] ?? ""));
      continue;
    }

    flushList();
    para.push(inline(line));
  }
  flushPara();
  flushList();

  return <div dangerouslySetInnerHTML={{ __html: out.join("") }} />;
}

function Bubble({ message, lang }: { message: Message; lang: "en" | "vi" }) {
  const mine = message.role === "you";

  return (
    <div
      className={`pulse-message-in flex ${mine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={
          mine
            ? "bg-primary max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-on-primary"
            : "bg-surface-1 border-line max-w-[92%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-[1.6]"
        }
      >
        <Rendered text={message.text} streaming={message.streaming} />
        {!message.streaming && message.code && (
          <pre className="bg-surface-1 mt-3 overflow-x-auto rounded-lg p-3 text-[0.8rem] leading-[1.8]">
            <code>{message.code.source}</code>
          </pre>
        )}
        {message.streaming && (
          <span className="pulse-caret bg-primary ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px]" />
        )}
        {!message.streaming && message.sources.length > 0 && (
          <div className="border-line mt-3 space-y-1 border-t pt-2.5">
            {message.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                className="text-muted hover:text-ink flex items-baseline gap-1.5 text-xs leading-snug"
              >
                <span className="shrink-0 opacity-70">
                  {lang === "vi" ? "Nguồn" : "Source"}
                </span>
                <span className="underline underline-offset-2">
                  {s.title}
                  {s.heading && s.heading !== s.title ? ` · ${s.heading}` : ""}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="pulse-message-in bg-surface-1 border-line flex w-fit items-center gap-[5px] rounded-2xl rounded-bl-md border px-4 py-3.5"
    >
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          aria-hidden="true"
          className="pulse-typing bg-primary size-[7px] rounded-full"
          style={{ ["--d" as string]: `${d * 160}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * The assistant, as a panel over the documentation.
 *
 * It starts closed and starts nothing: the worker and the model load on the first open, so a
 * reader who never asks pays nothing. If the model cannot load the panel says so plainly and
 * points at the pages, because the answer was always on a page anyway.
 */
export function AssistantPanel({ lang }: { lang: "en" | "vi" }) {
  const t = COPY[lang];
  // Read straight from the store, so a navigation reopens it without a corrective render.
  const open = useSyncExternalStore(subscribeOpen, getOpen, getOpenOnServer);
  const setOpen = writeOpen;
  const [draft, setDraft] = useState("");
  const { status, progress, messages, pending, ask, reset, note } =
    useAssistant(lang);
  const pathname = usePathname();
  const firstPath = useRef<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  /*
   * Introduce the assistant once, on a first visit, and never on a phone.
   *
   * A newcomer should see it exists without hunting for a button. It is remembered in
   * `localStorage` so it does not reintroduce itself to a returning reader, and it is skipped
   * below `sm`, where the panel is a full-height sheet: opening that unasked would cover the page
   * someone came to read.
   *
   * Storage is wrapped because a private window or blocked site data throws on access, and an
   * assistant that takes down the page it sits on is worse than one that greets you twice.
   *
   * Not on the contact page. The panel opens over the right-hand column, which on that page is
   * the form, so someone who arrived to send us a message is met by a chat window sitting on
   * top of it. The launcher is still there if they want it.
   */
  useEffect(() => {
    if (getOpen()) return;
    // `.html` because that is how the export is served when it is previewed from disk; the
    // deployed site serves the same page at the extensionless path.
    if (/\/contact(\.html)?\/?$/.test(window.location.pathname)) return;

    let seen = true;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;

    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to do: it just greets again next time */
    }

    if (!window.matchMedia("(min-width: 640px)").matches) return;

    const t = window.setTimeout(() => writeOpen(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && status !== "failed") input.current?.focus();
  }, [open, status]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  /*
   * Follow the reader.
   *
   * Only while the panel is open, so a note always appears somewhere the reader can see it
   * happen. Arriving on a page is not a navigation, so the first path is recorded and skipped;
   * otherwise opening the docs would start every conversation with a note nobody asked for.
   */
  useEffect(() => {
    if (firstPath.current === null) {
      firstPath.current = pathname;
      return;
    }
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    if (open) note(pathname);
  }, [pathname, open, note]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") writeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = () => {
    ask(draft);
    setDraft("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        className="bg-primary fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-on-primary shadow-nav transition-transform duration-150 hover:scale-[1.03] sm:right-5 sm:bottom-5"
      >
        <Sparkles className="size-4 shrink-0" />
        <span className="hidden sm:inline">{t.open}</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="pulse-panel-in bg-card border-line fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden border shadow-2xl sm:inset-auto sm:right-4 sm:bottom-4 sm:h-[min(620px,calc(100dvh-2rem))] sm:w-[min(440px,calc(100vw-2rem))] sm:rounded-2xl"
    >
      <header className="border-line flex items-start justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-start gap-2.5">
          <Bot className="text-primary mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">{t.title}</p>
            <p className="text-muted text-xs">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearMessages();
                reset();
              }}
              aria-label={t.restart}
              title={t.restart}
              className="text-muted hover:text-ink grid size-6 place-items-center rounded"
            >
              <RotateCcw className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="text-muted hover:text-ink -mr-1 grid size-6 place-items-center rounded"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div
        ref={scroller}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {status === "failed" && (
          <p className="text-muted text-sm">{t.failed}</p>
        )}

        {status === "idle" && messages.length === 0 && (
          <p className="text-muted mb-3 text-xs leading-relaxed">
            {t.firstLoad}
          </p>
        )}

        {status !== "failed" && messages.length === 0 && (
          <div className="space-y-2">
            {t.suggestions.map((q, i) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="pulse-message-in border-line hover:bg-surface-1 block w-full rounded-xl border px-3 py-2 text-left text-sm"
                style={{ ["--delay" as string]: `${i * 60}ms` }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m) => (
          <Bubble key={m.id} message={m} lang={lang} />
        ))}

        {/*
         * The download, shown under the question that started it.
         *
         * It used to be gated on there being no messages, so asking the first question made the
         * only sign of life vanish for as long as the model took, which on the Vietnamese
         * 129 MB model is long enough to look broken.
         */}
        {status === "loading" && (
          <div className="text-muted pulse-message-in space-y-2 text-xs">
            <p>
              {t.loading}
              {progress > 0 ? ` ${Math.round(progress * 100)}%` : "…"}
            </p>
            <div className="bg-surface-1 h-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-[width] duration-200"
                style={{ width: `${Math.max(4, progress * 100)}%` }}
              />
            </div>
          </div>
        )}

        {pending && status !== "loading" && <Typing label={t.thinking} />}
      </div>

      <div className="border-line border-t p-3">
        <div className="border-line focus-within:border-primary flex items-end gap-2 rounded-xl border px-3 py-2 transition-colors">
          <textarea
            ref={input}
            rows={1}
            value={draft}
            disabled={status === "failed"}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={t.placeholder}
            className="max-h-28 min-h-6 flex-1 resize-none bg-transparent text-sm outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={submit}
            disabled={status === "failed" || draft.trim().length === 0}
            aria-label={t.send}
            className="bg-primary shrink-0 rounded-lg p-1.5 text-on-primary disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
