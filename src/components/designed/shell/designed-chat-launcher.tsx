/**
 * Converted from `chat.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function DesignedChatLauncher() {
  return (
    <div data-chat>
          <button
            type="button"
            className="group fixed right-4 bottom-4 z-60 hidden size-14 items-center justify-center rounded-full bg-ink text-card shadow-nav transition-colors duration-200 ease-out-soft hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus js:inline-flex sm:right-6 sm:bottom-6"
            aria-label="Ask Pulse"
            aria-expanded="false"
            aria-controls="chat-panel"
            data-chat-toggle
          >
            <svg className="size-6 group-aria-expanded:hidden" aria-hidden="true">
              <use href="#i-message-circle" />
            </svg>
            <svg className="hidden size-6 group-aria-expanded:block" aria-hidden="true">
              <use href="#i-chevron-down" />
            </svg>
          </button>
          <section
            id="chat-panel"
            className="chat-panel"
            role="dialog"
            aria-labelledby="chat-title"
            data-chat-panel
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <img
                src="/assets/brand/apple-touch-icon.png"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <h2 id="chat-title" className="text-sm font-semibold text-ink">
                  Ask Pulse
                </h2>
                <p className="text-xs text-muted">Not connected yet</p>
              </div>
              <button
                type="button"
                className="hit-area hidden size-8 items-center justify-center rounded-full text-muted transition-colors duration-200 ease-out-soft hover:bg-surface-1 hover:text-ink sm:inline-flex"
                aria-label="Expand chat"
                aria-pressed="false"
                data-chat-expand
              >
                <svg className="size-4" aria-hidden="true" data-chat-expand-icon>
                  <use href="#i-maximize" />
                </svg>
              </button>
              <button
                type="button"
                className="hit-area inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors duration-200 ease-out-soft hover:bg-surface-1 hover:text-ink"
                aria-label="Close chat"
                data-chat-close
              >
                <svg className="size-4" aria-hidden="true"><use href="#i-x" /></svg>
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <div
                className="h-full space-y-3 overflow-y-auto overscroll-contain px-4 py-5"
                role="log"
                aria-label="Conversation"
                data-chat-log
              >
                <p className="pb-2 text-center text-xs text-muted">
                  Ask about Pulse and its products.
                </p>
                <div
                  className="mr-10 w-fit rounded-2xl bg-surface-1 px-4 py-3 text-data text-pretty text-ink"
                >
                  Hi. This is where you will be able to ask about Pulse and its
                  products. The assistant is not connected yet, so for now it cannot
                  answer.
                </div>
              </div>
              <button
                type="button"
                className="absolute bottom-3 left-1/2 hidden size-8 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-card text-ink shadow-sm transition-colors duration-200 ease-out-soft hover:bg-surface-1 data-show:inline-flex"
                aria-label="Jump to the latest message"
                data-chat-latest
              >
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-chevron-down" />
                </svg>
              </button>
            </div>
            <form className="p-3" data-chat-form>
              <div
                className="rounded-2xl border border-line-control bg-card focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus"
              >
                <label htmlFor="chat-input" className="sr-only">Message</label>
                <textarea
                  id="chat-input"
                  rows={1}
                  maxLength={2000}
                  placeholder="Message…"
                  className="block max-h-32 w-full resize-none bg-transparent px-4 pt-3 text-data text-ink placeholder:text-muted focus-visible:outline-none"
                  data-chat-input
                ></textarea>
                <div className="flex justify-end px-2 pb-2">
                  <button
                    type="submit"
                    className="inline-flex size-8 items-center justify-center rounded-full bg-ink text-card transition-colors duration-200 ease-out-soft hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:bg-surface-1 disabled:text-muted"
                    aria-label="Send message"
                    disabled
                    data-chat-send
                  >
                    <svg className="size-4" aria-hidden="true">
                      <use href="#i-arrow-up" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <template data-chat-reply>
              <div
                className="mr-10 w-fit rounded-2xl bg-surface-1 px-4 py-3 text-data text-pretty text-ink"
              >
                Thanks. The assistant is not connected yet, so it cannot answer
                this. For now, write to
                <a
                  href="mailto:getintouch@thepulseapi.com"
                  className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                  >getintouch@thepulseapi.com</a
                >
                or use the
                <Link               href="/en/contact"
                  className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                  >contact page</Link>.
              </div>
            </template>
          </section>
        </div>
  );
}
