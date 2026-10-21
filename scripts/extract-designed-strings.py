"""
Pull the inline English out of the designed components into next-intl messages.

The components are converter output: the designer's markup with the text still sitting in it.
Translating them means every user-visible string becomes a lookup, in 107 files, without
disturbing the markup around it, because that markup is verified pixel for pixel against the
designer's build.

A string here is a JSX text node: the run between `>` and `<` holding at least two letters.
That excludes `{expr}`, attribute values and the bare digits used as list markers, none of
which are translatable text.

Keys are numbers in source order. Readable keys were tried and dropped: slugging the English
means a copy edit renames the key and silently loses the translation attached to it.

Two things the first version got wrong, both caught by the build rather than by reading:
  - next-intl resolves `designed.home.why` as a path, so the catalogue has to nest. A flat
    `{"home.why": ...}` key matches nothing and every string renders as its own key.
  - JSX decodes HTML entities when it renders and a JSON message does not, so `&rsquo;` has to
    be decoded on the way out or it reaches the page as five characters.

Run with --apply to write; without it, it reports.
"""
import html as htmllib
import json, re, sys, pathlib

ROOT = pathlib.Path("src/components/designed")
APPLY = "--apply" in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith("--")]

TEXT = re.compile(r">([^<>{}]*?)<")
HAS_WORD = re.compile(r"[A-Za-z]{2}")
# Tolerates multi-line parameters, destructured props and a return type.
FUNC = re.compile(r"^export (?:default )?function \w+\([\s\S]*?\)\s*(?::[^{\n]+)?\{[ \t]*\n", re.M)


def namespace(path: pathlib.Path) -> str:
    return ".".join(path.relative_to(ROOT).with_suffix("").parts)


COMMENT = re.compile(r"/\*[\s\S]*?\*/|^[ \t]*//.*$", re.M)


def mask_comments(src: str) -> str:
    """Blank out comments, keeping length and newlines so offsets still line up.

    A doc comment that quotes markup, as these files constantly do, puts prose between a `>`
    and a `<` and the text matcher cannot tell it from a JSX text node. Masking is cheaper than
    teaching the matcher to parse, and keeping the length means every offset computed against
    the mask is valid in the real source.
    """
    return COMMENT.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), src)


def extract(src: str):
    masked = mask_comments(src)
    out, msgs, last, n = [], {}, 0, 0
    for m in TEXT.finditer(masked):
        raw = src[m.start(1) : m.end(1)]
        body = raw.strip()
        if not body or not HAS_WORD.search(body):
            continue
        # Preserve the surrounding whitespace exactly. JSX deletes a newline-bearing run at a
        # tag boundary, so re-emitting it differently changes the rendered spacing.
        lead = raw[: len(raw) - len(raw.lstrip())]
        trail = raw[len(raw.rstrip()) :]
        n += 1
        msgs[str(n)] = htmllib.unescape(re.sub(r"\s+", " ", body))
        out.append(src[last : m.start(1)])
        out.append(f"{lead}{{t('{n}')}}{trail}")
        last = m.end(1)
    out.append(src[last:])
    return "".join(out), msgs


files = sorted(ROOT.rglob("*.tsx"))
if ONLY:
    files = [f for f in files if any(o in str(f) for o in ONLY)]

catalogue, touched, total, skipped = {}, 0, 0, []
for f in files:
    src = f.read_text()
    if src.lstrip().startswith('"use client"') or src.lstrip().startswith("'use client'"):
        continue
    new, msgs = extract(src)
    if not msgs:
        continue

    # The hook belongs in the function that holds the text, which is not always the file's
    # first export: `icon-sprite.tsx` leads with a prop-taking `Icon`, and `industries/index.tsx`
    # leads with a plain lookup function. Anchor on the last function opened before the first
    # replacement instead.
    first = new.index("{t('")
    opens = [m for m in FUNC.finditer(new) if m.end() <= first]
    if not opens:
        skipped.append(str(f))
        continue
    at = opens[-1].end()

    ns = namespace(f)
    node = catalogue
    for part in ns.split("."):
        node = node.setdefault(part, {})
    node.update(msgs)
    total += len(msgs)
    touched += 1
    if not APPLY:
        continue

    new = new[:at] + f'  const t = useTranslations("designed.{ns}");\n' + new[at:]
    if "useTranslations" not in new.split("export")[0]:
        anchor = re.search(r"^(import |export )", new, re.M).start()
        new = new[:anchor] + 'import { useTranslations } from "next-intl";\n' + new[anchor:]
    f.write_text(new)

print(f"{'wrote' if APPLY else 'would write'} {total} strings across {touched} files")
for s in skipped:
    print(f"  SKIPPED, no enclosing function found: {s}")
if APPLY:
    pathlib.Path("messages/designed.en.json").write_text(
        json.dumps(catalogue, indent=2, ensure_ascii=False) + "\n"
    )
    print("catalogue -> messages/designed.en.json")
