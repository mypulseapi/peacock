// The recurring "proof" motif. The panel follows the theme now, so the syntax
// palette does too: see --code-* in section 0 of globals.css. It used to be a
// fixed dark panel with a pale palette, which went invisible the moment the
// panel went light.
// ponytail: tiny regex highlighter instead of a Prism/Shiki dependency. Covers
// strings, comments, numbers, JSON keys and a few HTTP/shell keywords, enough
// for marketing snippets. Swap in Shiki if real multi-language highlighting is needed.

import { CopyButton } from "./CopyButton";

type Token = { text: string; cls?: string };

const KEYWORDS = /\b(POST|GET|PUT|DELETE|curl|const|let|await|return|import|from|HTTP\/\d\.\d)\b/;

function highlight(line: string): Token[] {
  // Whole-line comment
  if (/^\s*(#|\/\/)/.test(line)) return [{ text: line, cls: "text-[color:var(--code-comment)]" }];

  const tokens: Token[] = [];
  // Split on strings first so we don't recolor inside them.
  const parts = line.split(/("(?:[^"\\]|\\.)*")/g);
  for (const part of parts) {
    if (part.startsWith('"') && part.endsWith('"')) {
      tokens.push({ text: part, cls: "text-[color:var(--code-string)]" });
      continue;
    }
    const rest = part;
    let m: RegExpExecArray | null;
    // JSON keys: "key": handled above as string; here color bare numbers + keywords.
    const re = new RegExp(`${KEYWORDS.source}|\\b\\d+(?:\\.\\d+)?(?:ms)?\\b`, "g");
    let last = 0;
    while ((m = re.exec(rest))) {
      if (m.index > last) tokens.push({ text: rest.slice(last, m.index) });
      const isKw = KEYWORDS.test(m[0]);
      tokens.push({ text: m[0], cls: isKw ? "text-[color:var(--code-keyword)] font-medium" : "text-[color:var(--code-number)]" });
      last = m.index + m[0].length;
    }
    if (last < rest.length) tokens.push({ text: rest.slice(last) });
  }
  return tokens;
}

export function CodeBlock({
  code,
  filename,
  className = "",
  copyLabel = "Copy",
  copiedLabel = "Copied",
}: {
  code: string;
  filename?: string;
  className?: string;
  /** Localised by the caller; defaults keep the component usable on its own. */
  copyLabel?: string;
  copiedLabel?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div
      className={`terminal-surface min-w-0 overflow-hidden rounded-2xl shadow-[var(--shadow-lg)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[rgb(var(--veil-rgb)/0.1)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[var(--sig)]" />
        {filename && (
          <span className="ml-2 text-xs font-code text-[color:var(--code-comment)]">{filename}</span>
        )}
        {/* Pushed right, so it lands in the same place whether or not the
            snippet is named. */}
        <span className="ml-auto">
          <CopyButton code={code} label={copyLabel} copiedLabel={copiedLabel} />
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed">
        <code className="font-code text-[color:var(--code-ink)]">
          {lines.map((line, i) => (
            <div key={i}>
              {highlight(line).map((tok, j) => (
                <span key={j} className={tok.cls}>
                  {tok.text}
                </span>
              ))}
              {line === "" && " "}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
