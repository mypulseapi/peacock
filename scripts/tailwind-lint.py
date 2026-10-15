#!/usr/bin/env python3
"""Report Tailwind CSS IntelliSense warnings for every *.html (any folder) and src/*.css file.

Runs the same language server the VS Code "Tailwind CSS IntelliSense" extension uses,
so the output matches the squiggles in the editor. Also reports [unknownClass] for any
class in the HTML that Tailwind generates no CSS for (e.g. `bg-rose-500` — the default
palette is switched off, so only theme tokens exist). Exits 1 if anything is reported.

Usage: pnpm lint:tw
"""
import glob, json, os, pathlib, re, subprocess, sys, tempfile, threading, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
LINT = {
    "cssConflict": "warning", "invalidApply": "error", "invalidScreen": "error",
    "invalidVariant": "error", "invalidConfigPath": "error", "invalidTailwindDirective": "error",
    "invalidSourceDirective": "error", "recommendedVariantOrder": "warning",
    "suggestCanonicalClasses": "warning", "usedBlocklistedClass": "warning",
}
SETTINGS = {
    "validate": True, "lint": LINT, "classAttributes": ["class"], "classFunctions": [],
    "emmetCompletions": False, "includeLanguages": {}, "rootFontSize": 16,
    "showPixelEquivalents": True, "colorDecorators": True, "codeActions": True,
    "hovers": True, "suggestions": True, "inspectPort": None,
    "experimental": {"classRegex": [], "configFile": None},
    "files": {"exclude": ["**/.git/**", "**/node_modules/**", "**/dist/**"]},
}


def server_command():
    # Prefer the server bundled with the installed VS Code extension; fall back to the npm package.
    bundled = sorted(glob.glob(os.path.expanduser(
        "~/.vscode/extensions/bradlc.vscode-tailwindcss-*/dist/tailwindServer.js")))
    if bundled:
        return ["node", bundled[-1], "--stdio"]
    return ["pnpm", "dlx", "@tailwindcss/language-server", "--stdio"]

# Marker classes that intentionally produce no CSS of their own
MARKER_CLASSES = {"group", "peer"}


def unknown_classes(html_files):
    """Classes used in class="…" that the Tailwind build generates no rule for."""
    with tempfile.TemporaryDirectory() as tmp:
        out = pathlib.Path(tmp) / "out.css"
        subprocess.run([str(ROOT / "node_modules/.bin/tailwindcss"), "-i", "src/input.css", "-o", str(out)],
                       cwd=ROOT, check=True, capture_output=True)
        css = out.read_text()
    found = []
    for f in html_files:
        for lineno, line in enumerate(f.read_text().splitlines(), 1):
            for attr in re.findall(r'class="([^"]*)"', line):
                for cls in attr.split():
                    escaped = re.sub(r"([^a-zA-Z0-9_-])", r"\\\1", cls)
                    if cls not in MARKER_CLASSES and "." + escaped not in css:
                        found.append(f"{f.relative_to(ROOT)}:{lineno}  [unknownClass] `{cls}` generates no CSS "
                                     "— use a theme token from src/input.css")
    return found


def main():
    pages = [p for p in ROOT.rglob("*.html")
             if not {"node_modules", "dist", ".git"}.intersection(p.relative_to(ROOT).parts)]
    files = sorted(pages) + sorted((ROOT / "src").glob("*.css"))
    proc = subprocess.Popen(server_command(), cwd=ROOT, stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    diagnostics = {}

    def send(msg):
        body = json.dumps(msg).encode()
        proc.stdin.write(f"Content-Length: {len(body)}\r\n\r\n".encode() + body)
        proc.stdin.flush()

    def read_loop():
        while True:
            header = b""
            while not header.endswith(b"\r\n\r\n"):
                ch = proc.stdout.read(1)
                if not ch:
                    return
                header += ch
            length = next(int(line.split(":")[1]) for line in header.decode().split("\r\n")
                          if line.lower().startswith("content-length"))
            msg = json.loads(proc.stdout.read(length))
            if msg.get("method") == "textDocument/publishDiagnostics":
                diagnostics[msg["params"]["uri"]] = msg["params"]["diagnostics"]
            elif "id" in msg and msg.get("method") == "workspace/configuration":
                result = [SETTINGS if item.get("section") == "tailwindCSS"
                          else {"tabSize": 2} if item.get("section") == "editor" else {}
                          for item in msg["params"]["items"]]
                send({"jsonrpc": "2.0", "id": msg["id"], "result": result})
            elif "id" in msg and "method" in msg:
                send({"jsonrpc": "2.0", "id": msg["id"], "result": None})

    threading.Thread(target=read_loop, daemon=True).start()
    root_uri = ROOT.as_uri()
    send({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
        "processId": os.getpid(), "rootUri": root_uri,
        "workspaceFolders": [{"uri": root_uri, "name": ROOT.name}],
        "capabilities": {"workspace": {"configuration": True, "workspaceFolders": True},
                         "textDocument": {"publishDiagnostics": {}}},
        "initializationOptions": {}}})
    time.sleep(2)
    send({"jsonrpc": "2.0", "method": "initialized", "params": {}})
    time.sleep(4)
    for f in files:
        send({"jsonrpc": "2.0", "method": "textDocument/didOpen", "params": {"textDocument": {
            "uri": f.as_uri(), "languageId": "css" if f.suffix == ".css" else "html",
            "version": 1, "text": f.read_text()}}})

    deadline = time.time() + 30
    while time.time() < deadline and len(diagnostics) < len(files):
        time.sleep(0.5)
    time.sleep(2)  # let late re-publishes arrive
    proc.kill()

    missing = [f for f in files if f.as_uri() not in diagnostics]
    if missing:
        print("Language server did not report on: " + ", ".join(str(f.relative_to(ROOT)) for f in missing))
        sys.exit(2)

    total = 0
    for f in files:
        for d in diagnostics[f.as_uri()]:
            total += 1
            line = d["range"]["start"]["line"] + 1
            print(f"{f.relative_to(ROOT)}:{line}  [{d.get('code')}] {d['message']}")
    for problem in unknown_classes([f for f in files if f.suffix == ".html"]):
        total += 1
        print(problem)
    print(f"\n{total} Tailwind warning(s) in {len(files)} file(s).")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
