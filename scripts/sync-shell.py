#!/usr/bin/env python3
"""Copy the shared page shell from index.html into every other page.

index.html is the source of truth for four regions, each wrapped in marker comments:

    <!-- shell:head ... -->    favicons, font preload, stylesheet, script
    <!-- shell:sprite ... -->  the icon sprite
    <!-- shell:header ... -->  the site header (nav, mega menus, mobile menu)
    <!-- shell:footer ... -->  the site footer

Every page that contains the same markers gets those regions replaced with the index.html
version, with relative URLs rewritten for the page's folder depth:

    ./src/...            -> ../src/...          (assets, CSS, JS)
    product/x.html       -> ../product/x.html   (links between pages)
    #request             -> ../index.html#request (home-page anchors)

Sprite references (#i-...), placeholders (#), absolute URLs, mailto: and tel: are left alone.
Pages without markers (e.g. components.html) are skipped.

Usage: python3 scripts/sync-shell.py        (then run pnpm format)
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "index.html"
REGIONS = ("head", "sprite", "header", "footer")
SKIP_DIRS = {"node_modules", "dist", ".git", ".github", "docs", "scripts"}


def region_pattern(name):
    return re.compile(
        r"<!-- shell:" + name + r"\b.*?-->.*?<!-- /shell:" + name + r" -->", re.S
    )


def rewrite(text, depth):
    """Rewrite index.html-relative URLs so they work from a page `depth` folders deep."""
    if depth == 0:
        return text
    prefix = "../" * depth

    def fix(match):
        attr, url = match.group(1), match.group(2)
        if url.startswith(("http:", "https:", "mailto:", "tel:", "data:", "/", "#i-")) or url == "#":
            return match.group(0)
        if url.startswith("#"):
            return f'{attr}="{prefix}index.html{url}"'
        if url.startswith("./"):
            url = url[2:]
        return f'{attr}="{prefix}{url}"'

    return re.sub(r'\b(href|src|srcset)="([^"]*)"', fix, text)


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
        new = text
        for name, block in shell.items():
            new = region_pattern(name).sub(lambda _: rewrite(block, depth), new)
        if new != text:
            page.write_text(new)
            updated += 1
            print(f"synced {page.relative_to(ROOT)}")
    print(f"{updated} page(s) updated")


if __name__ == "__main__":
    main()
