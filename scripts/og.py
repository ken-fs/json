"""Render the social cards, the logo, and the PWA icons.

Twenty PNGs were referenced by `metadata` but had never been generated, so every
tool page pointed `og:image` at a 404 — a shared link showed a bare URL. This
renders them from HTML through Playwright, which is already installed for
`tests/pages.verify.py`. No `sharp`, no new npm dependency.

    pnpm og

Run it after changing the tool catalogue, the copy below, or the design tokens.
The output is committed, because a static export has nothing to generate them
at request time.
"""
import glob
import json
import os
import pathlib
import struct
import subprocess
import sys
import zlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

# Design tokens, from AGENTS.md. Kept in sync by hand — there is no CSS variable
# to read at this stage, and hardcoding them beats importing the whole app.
SURFACE = "#f7f7f4"
INK = "#141414"
COBALT = "#1261ff"
LIME = "#95ee1c"
BORDER = "#d9d9d5"
MUTED = "#6f7279"


def find_chrome():
    root = os.path.expanduser("~/Library/Caches/ms-playwright")
    matches = sorted(glob.glob(f"{root}/chromium-*/chrome-mac*/*.app/Contents/MacOS/*"))
    return matches[-1] if matches else None


def card_html(card):
    """A 1200x630 card laid out as a JSON document.

    The conceit: the card *is* the output of the tool. Keys sit in the mono face
    at low contrast, the headline is the value of `"title"`, and the closing brace
    hangs at the bottom-left where a formatter would put it. It reads as a social
    card at thumbnail size and as JSON at full size, which no generic gradient
    does.
    """
    title_lines = "".join(
        f'<div class="line">{line}</div>' for line in card["title"].split("\n")
    )
    # No from/to badge. The headline on a tool card already reads `JSON → YAML`,
    # so the badge repeated it one line down in a smaller face — the accessory to
    # take off before leaving the house. `from`/`to` stay in the manifest because
    # the alt text uses them.

    return f"""<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face {{
    font-family: 'GeistLocal';
    src: local('Geist'), local('Inter'), local('Helvetica Neue');
  }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: 1200px; height: 630px; background: {SURFACE}; color: {INK};
    font-family: 'Geist', 'Inter', -apple-system, 'Helvetica Neue', sans-serif;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 64px 72px; position: relative; overflow: hidden;
  }}
  /* A flat surface is against the rules, so the background carries a faint
     grid — the ruled paper a formatter prints onto. */
  body::before {{
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(20,20,20,.035) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(20,20,20,.035) 1px, transparent 1px);
    background-size: 40px 40px;
  }}
  .brace {{
    font-family: 'Geist Mono', ui-monospace, 'SF Mono', monospace;
    font-size: 34px; color: {BORDER}; font-weight: 500; position: relative;
  }}
  .close {{ align-self: flex-start; }}
  .body {{ position: relative; padding-left: 44px; }}
  /* The vertical rule an editor draws down an open block. */
  .body::before {{
    content: ''; position: absolute; left: 8px; top: 6px; bottom: 6px;
    width: 2px; background: {BORDER};
  }}
  .key {{
    font-family: 'Geist Mono', ui-monospace, 'SF Mono', monospace;
    font-size: 15px; letter-spacing: .1em; text-transform: uppercase;
    color: {MUTED};
  }}
  .key b {{ color: {COBALT}; font-weight: 600; }}
  h1 {{
    font-size: 82px; line-height: .96; letter-spacing: -.055em;
    font-weight: 900; margin: 14px 0 0;
  }}
  h1 .line + .line {{ display: block; }}
  .sub {{
    margin-top: 22px; font-size: 27px; line-height: 1.35; color: #4a4d54;
    max-width: 810px; letter-spacing: -.015em;
  }}
  .foot {{
    position: relative; display: flex; align-items: center; gap: 16px;
    font-size: 20px; color: {MUTED};
  }}
  .dot {{ width: 13px; height: 13px; background: {LIME}; border-radius: 2px; }}
  .foot strong {{ color: {INK}; font-weight: 700; letter-spacing: -.02em; }}
</style></head>
<body>
  <div class="brace">{{</div>
  <div class="body">
    <div class="key">"source": <b>"{card['eyebrow']}"</b></div>
    <h1>{title_lines}</h1>
    <div class="sub">{card['sub']}</div>
  </div>
  <div class="foot">
    <span class="brace close">}}</span>
    <span class="dot"></span>
    <strong>JSON1</strong>
    <span>runs in your browser</span>
  </div>
</body></html>"""


def logo_html(size):
    """Square mark: a lime `{}` around the digit 1.

    Used for `Organization.logo` and both PWA icons. `background` is opaque
    because a maskable icon on Android is composited onto the launcher.
    """
    return f"""<!doctype html>
<html><head><meta charset="utf-8"><style>
  * {{ margin: 0; box-sizing: border-box; }}
  body {{
    width: {size}px; height: {size}px; background: {INK}; display: flex;
    align-items: center; justify-content: center;
    font-family: 'Geist Mono', ui-monospace, 'SF Mono', monospace;
  }}
  .mark {{
    display: flex; align-items: baseline;
    font-size: {int(size * 0.46)}px; font-weight: 700; letter-spacing: -.04em;
  }}
  .b {{ color: {LIME}; }}
  .n {{ color: #fff; padding: 0 {max(1, int(size * 0.012))}px; }}
</style></head>
<body><div class="mark"><span class="b">{{</span><span class="n">1</span><span class="b">}}</span></div></body></html>"""


def favicon_svg():
    """The favicon, as the same `{1}` mark the PNGs use.

    It replaces a blue-gradient brace-and-dots drawing left over from the
    pre-redesign palette (#3B82F6 → #1D4ED8), which was the last place those
    colours survived. At 16px the old version's three content rows and two braces
    resolved to a blue smudge; one glyph on ink survives the tab strip.

    Written to `src/app/icon.svg`, not `favicon.svg`. Next only recognises the
    `favicon` name for `.ico`, so the old `src/app/favicon.svg` emitted no link
    tag at all — it had been sitting there unreferenced.
    """
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" '
        'viewBox="0 0 32 32">\n'
        f'  <rect width="32" height="32" rx="5" fill="{INK}"/>\n'
        '  <text x="16" y="23" text-anchor="middle" font-size="19" font-weight="700"\n'
        '        font-family="ui-monospace, SFMono-Regular, Menlo, monospace">'
        f'<tspan fill="{LIME}">{{</tspan>'
        '<tspan fill="#ffffff">1</tspan>'
        f'<tspan fill="{LIME}">}}</tspan></text>\n'
        '</svg>\n'
    )


def png_to_rgba(data):
    """Re-encode an RGB PNG as RGBA, opaque throughout.

    Next's ICO decoder rejects anything else — "The PNG is not in RGBA format!" —
    and Chromium writes colour type 2 for a page with no transparency, whatever
    `omit_background` is set to. Rather than contrive a translucent pixel to
    persuade the renderer, add the alpha channel here where the result is
    certain. Returns `data` unchanged if it is already RGBA.
    """
    chunks, pos = {}, 8
    order = []
    while pos < len(data):
        length = struct.unpack(">I", data[pos:pos + 4])[0]
        kind = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + length]
        chunks.setdefault(kind, b"")
        chunks[kind] += body
        if kind not in order:
            order.append(kind)
        pos += 12 + length

    width, height, depth, ctype = struct.unpack(">IIBB", chunks[b"IHDR"][:10])
    if ctype == 6:
        return data
    if (ctype, depth) != (2, 8):
        sys.exit(f"unexpected PNG colour type {ctype}/{depth}")

    # Undo the per-scanline filters, widen each pixel to 4 bytes, and re-filter
    # with filter 0 (None) — the smallest amount of PNG one can implement and
    # still be correct.
    raw = zlib.decompress(chunks[b"IDAT"])
    stride = width * 3
    out, prev = bytearray(), bytearray(stride)
    for y in range(height):
        start = y * (stride + 1)
        filt = raw[start]
        line = bytearray(raw[start + 1:start + 1 + stride])
        for i in range(stride):
            a = line[i - 3] if i >= 3 else 0
            b = prev[i]
            c = prev[i - 3] if i >= 3 else 0
            if filt == 1:
                line[i] = (line[i] + a) & 0xFF
            elif filt == 2:
                line[i] = (line[i] + b) & 0xFF
            elif filt == 3:
                line[i] = (line[i] + (a + b) // 2) & 0xFF
            elif filt == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pred = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pred) & 0xFF
            elif filt != 0:
                sys.exit(f"unsupported PNG filter {filt}")
        out.append(0)
        for x in range(width):
            out += line[x * 3:x * 3 + 3] + b"\xff"
        prev = line

    def chunk(kind, body):
        return (
            struct.pack(">I", len(body)) + kind + body
            + struct.pack(">I", zlib.crc32(kind + body) & 0xFFFFFFFF)
        )

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return (
        data[:8]
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(out), 9))
        + chunk(b"IEND", b"")
    )


def write_ico(path, pngs):
    """Pack PNG bytes into an ICO container.

    A `generate-favicon.js` at the repo root used to hand-assemble a 16x16 BMP
    icon byte by byte, in the old blue, writing to `favicon-blue.ico` — a filename
    nothing ever referenced, so its output was never used. This does the same job
    in 12 lines by storing PNGs, which every browser since IE11 accepts, and
    writes to the file Next actually serves.
    """
    header = struct.pack("<HHH", 0, 1, len(pngs))
    offset = 6 + 16 * len(pngs)
    entries, blobs = b"", b""
    for size, data in pngs:
        entries += struct.pack(
            "<BBBBHHII", size % 256, size % 256, 0, 0, 1, 32, len(data), offset
        )
        blobs += data
        offset += len(data)
    path.write_bytes(header + entries + blobs)


def main():
    chrome = find_chrome()
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("playwright is not installed: pip3 install playwright")

    raw = subprocess.run(
        ["npx", "tsx", str(ROOT / "scripts" / "og-manifest.ts")],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout
    cards = json.loads(raw)

    (PUBLIC / "og").mkdir(parents=True, exist_ok=True)
    written = []

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=chrome)
        page = browser.new_page(viewport={"width": 1200, "height": 630})

        for card in cards:
            page.set_content(card_html(card), wait_until="load")
            target = PUBLIC / card["out"]
            page.screenshot(path=str(target))
            written.append(card["out"])

        # Logo plus the two PWA sizes the manifest declares.
        for name, size in [("logo.png", 512), ("icon-512.png", 512), ("icon-192.png", 192)]:
            icon = browser.new_page(viewport={"width": size, "height": size})
            icon.set_content(logo_html(size), wait_until="load")
            icon.screenshot(path=str(PUBLIC / name))
            icon.close()
            written.append(name)

        # The favicon, at the three sizes a browser picks between. Next serves
        # `src/app/favicon.ico` automatically, so it is written there, not to
        # public/ — two favicons would race.
        ico_sizes = []
        for size in (16, 32, 48):
            icon = browser.new_page(viewport={"width": size, "height": size})
            icon.set_content(logo_html(size), wait_until="load")
            ico_sizes.append((size, png_to_rgba(icon.screenshot())))
            icon.close()
        write_ico(APP / "favicon.ico", ico_sizes)

        browser.close()

    (APP / "icon.svg").write_text(favicon_svg(), encoding="utf-8")
    extra = ["../src/app/favicon.ico", "../src/app/icon.svg"]

    for name in written + extra:
        size_kb = (PUBLIC / name).stat().st_size / 1024
        print(f"  {name:34s} {size_kb:6.1f} kB")
    print(f"\n{len(written)} images written to public/, 2 to src/app/")


if __name__ == "__main__":
    main()
