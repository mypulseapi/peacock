#!/usr/bin/env python3
"""Copy the shared page shell from index.html into every other page.

index.html is the source of truth for four regions, each wrapped in marker comments:

    <!-- shell:head ... -->    favicons, font preload, stylesheet, script
    <!-- shell:sprite ... -->  the icon sprite
    <!-- shell:header ... -->  the site header (nav, mega menus, mobile menu)
    <!-- shell:cta ... -->     the call to action above the footer (optional: only pages that carry
                               these markers get it, e.g. the product pages)
    <!-- shell:footer ... -->  the site footer

Every page that contains the same markers gets those regions replaced with the index.html
version, with relative URLs rewritten for the page's folder depth:

    ./src/...            -> ../src/...          (assets, CSS, JS)
    product/x.html       -> ../product/x.html   (links between pages)
    #method              -> ../index.html#method  (home-page anchors)

Anchors to ids inside a shell region the page also has (#request, when the page has the call to action)
stay on the same page; otherwise they point at the home page.

Sprite references (#i-...), placeholders (#), absolute URLs, mailto: and tel: are left alone.

In the header, every link that points at the page itself gets aria-current="page" (the nav-link style shows it as
the current page; screen readers announce it).
Pages without markers (e.g. components.html) are skipped.

Usage: python3 scripts/sync-shell.py        (then run pnpm format)
"""

import os
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "index.html"
REGIONS = ("head", "sprite", "header", "cta", "footer")
SKIP_DIRS = {"node_modules", "dist", ".git", ".github", "docs", "scripts"}


def region_pattern(name):
    return re.compile(
        r"<!-- shell:" + name + r"\b.*?-->.*?<!-- /shell:" + name + r" -->", re.S
    )


def rewrite(text, depth, local_ids=frozenset()):
    """Rewrite index.html-relative URLs so they work from a page `depth` folders deep.
    Anchors to ids inside the shell (e.g. #request, the shared call to action) stay on the same page."""
    prefix = "../" * depth

    def fix(match):
        attr, url = match.group(1), match.group(2)
        if url.startswith(("http:", "https:", "mailto:", "tel:", "data:", "/", "#i-")) or url == "#":
            return match.group(0)
        if url.startswith("#"):
            if url[1:] in local_ids:
                return match.group(0)
            return f'{attr}="{prefix}index.html{url}"'
        if depth == 0:
            return match.group(0)
        if url.startswith("./"):
            url = url[2:]
        return f'{attr}="{prefix}{url}"'

    return re.sub(r'\b(href|src|srcset)="([^"]*)"', fix, text)


def mark_current(text, page_rel):
    """Add aria-current="page" to links in `text` (already rewritten for the page) that point at the page."""
    here = os.path.dirname(page_rel)

    def fix(match):
        tag, url = match.group(0), match.group(1)
        if "aria-current=" in tag or url.startswith(("http:", "https:", "mailto:", "tel:", "#")):
            return tag
        if os.path.normpath(os.path.join(here, url)) != page_rel:
            return tag
        return tag[:-1] + ' aria-current="page">'

    return re.sub(r'<a\b[^>]*?\bhref="([^"#]+)"[^>]*>', fix, text)


def main():
    source = SOURCE.read_text()
    shell = {}
    for name in REGIONS:
        found = region_pattern(name).search(source)
        if not found:
            sys.exit(f"index.html has no <!-- shell:{name} --> region")
        shell[name] = found.group(0)

    pages = [
        p
        for p in ROOT.rglob("*.html")
        if p != SOURCE and not SKIP_DIRS.intersection(p.relative_to(ROOT).parts)
    ]
    updated = 0
    for page in sorted(pages):
        text = page.read_text()
        if "<!-- shell:" not in text:
            continue
        depth = len(page.relative_to(ROOT).parts) - 1
        present = [name for name in shell if region_pattern(name).search(text)]
        local_ids = frozenset(re.findall(r'\bid="([^"]+)"', "".join(shell[n] for n in present)))
        new = text
        for name, block in shell.items():
            rel = page.relative_to(ROOT).as_posix()
            new = region_pattern(name).sub(
                lambda _, b=block, n=name: (
                    mark_current(rewrite(b, depth, local_ids), rel) if n == "header" else rewrite(b, depth, local_ids)
                ),
                new,
            )
        if new != text:
            page.write_text(new)
            updated += 1
            print(f"synced {page.relative_to(ROOT)}")
    print(f"{updated} page(s) updated")


if __name__ == "__main__":
    main()
