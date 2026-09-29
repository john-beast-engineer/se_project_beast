#!/usr/bin/env python3
"""
One-time sweep: replace hardcoded colors in component CSS with design tokens.

Run from the repo root:      python3 tokenize-css.py --dry-run
Then, if the report looks right:   python3 tokenize-css.py

Does two passes:
  1. hardcoded hex/rgba  ->  design tokens
  2. OLD token names     ->  new role-based names (--color-white -> --color-text)

Pass 2 matters: renaming tokens in variables.css without it leaves var() calls
pointing at variables that no longer exist. CSS fails those SILENTLY -- the build
still passes and the page renders with default colors. Always finish with
--check, which reports any var() that has no definition.

Skips src/vendor/ for pass 1 (that's where tokens are defined) but INCLUDES it
for pass 2, since base.css consumes tokens too.

Accent colors are context-sensitive: the same value becomes a *-fill token on a
background line and a plain accent token on a color/border line.
"""

import argparse
import pathlib
import re

# Hex values that mean the same thing no matter where they appear.
FLAT = {
    "#000000": "var(--color-bg)",
    "#000": "var(--color-bg)",
    "#0a0a0a": "var(--color-bg-nav)",
    "#1a1a1a": "var(--color-surface)",
    "#1c1c1c": "var(--color-surface)",
    "#262626": "var(--color-surface-raised)",
    "#2a2a2a": "var(--color-surface-raised)",
    "#1f1f1f": "var(--color-border-subtle)",
    "#333333": "var(--color-border)",
    "#333": "var(--color-border)",
    "#444444": "var(--color-border-strong)",
    "#444": "var(--color-border-strong)",
    "#ffffff": "var(--color-text)",
    "#fff": "var(--color-text)",
    "#cccccc": "var(--color-text-muted)",
    "#ccc": "var(--color-text-muted)",
    "#aaaaaa": "var(--color-text-muted)",
    "#aaa": "var(--color-text-muted)",
    "#888888": "var(--color-text-dim)",
    "#888": "var(--color-text-dim)",
    "#808080": "var(--color-text-dim)",
    "#777777": "var(--color-text-dim)",
    "#777": "var(--color-text-dim)",
    "#9e3f35": "var(--color-accent-fill-hover)",
    "#82332b": "var(--color-accent-fill-hover)",
    "#b01030": "var(--color-accent-fill-hover)",
    "#e0b3ad": "var(--color-accent-soft)",
    "#d96a5e": "var(--color-secondary)",
    "#ff6b6b": "var(--color-danger)",
}

# Hex values whose token depends on the property they sit on.
# (background-ish token, text/border token)
CONTEXTUAL = {
    "#b34a3f": ("var(--color-accent-fill)", "var(--color-accent)"),
    "#c0564a": ("var(--color-accent-fill)", "var(--color-accent)"),
    "#dc143c": ("var(--color-accent-fill)", "var(--color-accent)"),
}

# rgba() literals, matched loosely on whitespace.
RGBA = [
    (r"rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.[67]\s*\)", "var(--color-overlay)"),
    (r"rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.55\s*\)", "var(--color-scrim)"),
    (r"rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.4\s*\)", "var(--color-scrim-soft)"),
    (r"rgba\(\s*220\s*,\s*20\s*,\s*60\s*,\s*0?\.5\s*\)", "var(--color-accent-glow)"),
    (r"rgba\(\s*179\s*,\s*74\s*,\s*63\s*,\s*0?\.15\s*\)", "var(--color-accent-wash)"),
]

# Pass 2: old token names -> new role-based names.
RENAME = {
    "--color-black": "--color-bg",
    "--color-white": "--color-text",
    "--color-gray-dark": "--color-surface",
    "--color-gray-light": "--color-text-muted",
    "--color-gray": "--color-text-dim",
    "--color-red-dark": "--color-accent-fill-hover",
    "--shadow-red-sm": "--shadow-accent-sm",
    "--shadow-red-md": "--shadow-accent-md",
    "--shadow-red-lg": "--shadow-accent-lg",
}
# --color-red depends on the property, like the hex accents above.
RENAME_CONTEXTUAL = {"--color-red": ("--color-accent-fill", "--color-accent")}

BG_PROPERTY = re.compile(r"\b(background|background-color|fill)\s*:")


def convert_line(line):
    """Return (new_line, [(old, new), ...]) for one CSS line."""
    changes = []
    is_bg = bool(BG_PROPERTY.search(line))

    for pattern, token in RGBA:
        if re.search(pattern, line):
            line, n = re.subn(pattern, token, line)
            if n:
                changes.append(("rgba(...)", token))

    # --- pass 2: rename old token names ---
    for old, (bg_tok, fg_tok) in RENAME_CONTEXTUAL.items():
        if re.search(re.escape(old) + r"(?![a-z-])", line):
            new = bg_tok if is_bg else fg_tok
            line = re.sub(re.escape(old) + r"(?![a-z-])", new, line)
            changes.append((old, new))
    for old, new in sorted(RENAME.items(), key=lambda kv: -len(kv[0])):
        if re.search(re.escape(old) + r"(?![a-z-])", line):
            line = re.sub(re.escape(old) + r"(?![a-z-])", new, line)
            changes.append((old, new))
    # var(--x, 8px) where --x was never defined
    line = line.replace("var(--radius, 8px)", "var(--radius-md)")
    # collapse redundant fallbacks left by pass 1: var(--x, var(--x)) -> var(--x)
    line = re.sub(r"var\((--[a-z0-9-]+),\s*var\(\1\)\)", r"var(\1)", line)

    # --- pass 1: hardcoded values ---
    # Longest-first so #333333 is matched before #333.
    for hexval in sorted(set(FLAT) | set(CONTEXTUAL), key=len, reverse=True):
        # Word-boundary-ish guard: don't match #333 inside #333333.
        pattern = re.escape(hexval) + r"(?![0-9a-fA-F])"
        if not re.search(pattern, line, flags=re.IGNORECASE):
            continue
        if hexval in CONTEXTUAL:
            token = CONTEXTUAL[hexval][0 if is_bg else 1]
        else:
            token = FLAT[hexval]
        line, n = re.subn(pattern, token, line, flags=re.IGNORECASE)
        if n:
            changes.append((hexval, token))

    return line, changes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    ap.add_argument("--root", default="src", help="directory to sweep (default: src)")
    ap.add_argument("--check", action="store_true",
                    help="only verify every var() resolves against variables.css")
    args = ap.parse_args()

    tokens_file = pathlib.Path(args.root) / "vendor" / "variables.css"
    if args.check:
        defined = set(re.findall(r"^\s*(--[a-zA-Z0-9-]+)\s*:", tokens_file.read_text(), re.M))
        missing = {}
        for p in sorted(pathlib.Path(args.root).rglob("*.css")):
            if p == tokens_file:
                continue
            for i, line in enumerate(p.read_text().splitlines(), 1):
                for name in re.findall(r"var\((--[a-zA-Z0-9-]+)", line):
                    if name not in defined:
                        missing.setdefault(name, []).append(f"{p}:{i}")
        if missing:
            print("UNDEFINED variables (CSS fails these silently):")
            for name, locs in sorted(missing.items()):
                print(f"  {name}")
                for loc in locs[:6]:
                    print(f"      {loc}")
            raise SystemExit(1)
        print(f"OK - every var() resolves against {tokens_file}")
        raise SystemExit(0)

    all_css = sorted(pathlib.Path(args.root).rglob("*.css"))
    # Pass 1 skips vendor; pass 2 (renames) must include it.
    files = [p for p in all_css if "vendor" not in p.parts or p.name == "base.css"]

    total = 0
    leftovers = []

    for path in files:
        original = path.read_text()
        out_lines = []
        file_changes = []

        for i, line in enumerate(original.splitlines(keepends=True), start=1):
            new_line, changes = convert_line(line)
            out_lines.append(new_line)
            for old, new in changes:
                file_changes.append((i, old, new))

        result = "".join(out_lines)

        # Anything still hardcoded after the sweep needs a human decision.
        for i, line in enumerate(result.splitlines(), start=1):
            for m in re.finditer(r"#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)", line):
                leftovers.append((path, i, m.group(0), line.strip()))

        if file_changes:
            total += len(file_changes)
            print(f"\n{path}  ({len(file_changes)} changed)")
            for i, old, new in file_changes:
                print(f"  line {i:>4}: {old:<12} -> {new}")

        if not args.dry_run and file_changes:
            path.write_text(result)

    print(f"\n{'=' * 60}")
    print(f"{total} replacements across {len(files)} files")
    if leftovers:
        print(f"\n{len(leftovers)} value(s) left for you to decide on:")
        for path, i, val, line in leftovers:
            print(f"  {path}:{i}  {val}")
            print(f"      {line}")
    else:
        print("No hardcoded colors left outside src/vendor/.")
    if args.dry_run:
        print("\nDRY RUN — nothing written. Re-run without --dry-run to apply.")


if __name__ == "__main__":
    main()
