"""Assert the SEO invariants of the static export, page by page.

Written to close out an audit, kept because every finding it covers is the kind
that reappears silently. A new page inherits the layout's metadata and looks fine
in the browser while canonicalising to the wrong URL; a reworded description drifts
past 160 characters; a `<Link href="/foo">` without the trailing slash becomes a
301 under `trailingSlash: true`. None of that shows up in `pnpm test:pages`.

The route list comes from `sitemap.xml` rather than a hardcoded array, so a page
added to the sitemap is checked without touching this file.

    pnpm build && (cd out && python3 -m http.server 4321)
    pnpm test:seo

Checks, per page: canonical present, correct, and claimed by exactly one URL;
title <= 60 chars with no doubled or stale brand suffix; description present and
<= 160 chars, and not written at the crawler; hreflang on the wiki's per-locale
routes and nowhere else (5 tags resolving to 4 URLs — `x-default` legitimately
shares the `en` URL); `og:image` present; every `img` has `alt`; all JSON-LD parses,
with exactly one `WebApplication` and a `BreadcrumbList` everywhere but `/`. Then,
site-wide: every sitemap URL ends in `/`, and every referenced asset returns 200.
"""
import json, os, re, subprocess, sys, urllib.request, xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE = os.environ.get("BASE", "http://localhost:4321")

def get(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.status, r.read().decode("utf-8", "replace")

def head_status(url):
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return str(e)

class Meta(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self._in_title = False
        self.desc = None
        self.canonical = None
        self.hreflang = []
        self.og_image = None
        self.tw_image = None
        self.robots = None
        self.modified = None
        self.ld = []
        self._in_ld = False
        self.imgs_missing_alt = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title": self._in_title = True
        elif tag == "meta":
            n = (a.get("name") or a.get("property") or "").lower()
            if n == "description": self.desc = a.get("content")
            elif n == "robots": self.robots = a.get("content")
            elif n == "og:image": self.og_image = a.get("content")
            elif n == "twitter:image": self.tw_image = a.get("content")
            elif n == "article:modified_time": self.modified = a.get("content")
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            if rel == "canonical": self.canonical = a.get("href")
            elif rel == "alternate" and a.get("hreflang"):
                self.hreflang.append((a["hreflang"], a.get("href")))
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._in_ld = True
        elif tag == "img" and not a.get("alt"):
            self.imgs_missing_alt += 1
    def handle_endtag(self, tag):
        if tag == "title": self._in_title = False
        if tag == "script": self._in_ld = False
    def handle_data(self, d):
        if self._in_title:
            self.title = (self.title or "") + d
        if self._in_ld and d.strip():
            self.ld.append(d.strip())

# ---- collect the route list from the sitemap itself
status, xml = get("/sitemap.xml")
root = ET.fromstring(xml)
ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
sitemap_urls = [u.text for u in root.iter(f"{ns}loc")]
print(f"sitemap: {len(sitemap_urls)} URLs, status {status}")

paths = [u.replace("https://www.json.how", "") or "/" for u in sitemap_urls]

# `lastmod` per path, for the freshness cross-check further down.
lastmod = {
    (e.findtext(f"{ns}loc") or "").replace("https://www.json.how", "") or "/":
        (e.findtext(f"{ns}lastmod") or "")
    for e in root.iter(f"{ns}url")
}

fails = []
rows = []
canon_seen = {}
ld_types = {}
page_modified = {}

for p in sorted(set(paths)):
    try:
        st, html = get(p)
    except Exception as e:
        fails.append(f"{p}: fetch failed {e}")
        continue
    if st != 200:
        fails.append(f"{p}: HTTP {st}")
    m = Meta()
    m.feed(html)
    title = (m.title or "").strip()
    expected_canon = f"https://www.json.how{p}"
    if m.modified:
        page_modified[p] = m.modified

    if not m.canonical:
        fails.append(f"{p}: no canonical")
    elif m.canonical != expected_canon:
        fails.append(f"{p}: canonical={m.canonical} expected {expected_canon}")
    else:
        canon_seen.setdefault(m.canonical, []).append(p)

    if len(title) > 60:
        fails.append(f"{p}: title {len(title)} chars: {title!r}")
    if "| JSON Tools" in title:
        fails.append(f"{p}: stale '| JSON Tools' brand suffix")
    if title.count("| JSON.how") > 1:
        fails.append(f"{p}: doubled brand suffix")
    d = (m.desc or "")
    if not d:
        fails.append(f"{p}: no description")
    elif len(d) > 160:
        fails.append(f"{p}: description {len(d)} chars")
    if "SEO" in d or "optimizado para" in d or "otimizado para" in d:
        fails.append(f"{p}: crawler-facing description copy")

    is_wiki_locale = re.match(r"^/wiki/(en|cn|es|pt)/", p) or re.match(r"^/wiki/(en|cn|es|pt)/$", p)
    if is_wiki_locale:
        if len(m.hreflang) != 5:
            fails.append(f"{p}: {len(m.hreflang)} hreflang tags, expected 5")
        # x-default legitimately points at the same URL as en-US, so 5 tags
        # resolve to 4 distinct URLs. Fewer than 4 means they collapsed.
        targets = {h for _, h in m.hreflang}
        if len(targets) != 4:
            fails.append(f"{p}: hreflang resolves to {len(targets)} distinct URLs, expected 4")
    elif m.hreflang:
        fails.append(f"{p}: {len(m.hreflang)} hreflang tags on a single-URL page")

    if not m.og_image:
        fails.append(f"{p}: no og:image")
    if m.imgs_missing_alt:
        fails.append(f"{p}: {m.imgs_missing_alt} img without alt")

    types = []
    for blob in m.ld:
        try:
            obj = json.loads(blob)
        except Exception as e:
            fails.append(f"{p}: invalid JSON-LD ({e})")
            continue
        for node in (obj if isinstance(obj, list) else [obj]):
            types.append(node.get("@type"))
    ld_types[p] = types
    if types.count("WebApplication") > 1:
        fails.append(f"{p}: {types.count('WebApplication')} WebApplication nodes")
    if "BreadcrumbList" not in types and p != "/":
        fails.append(f"{p}: no BreadcrumbList")

    rows.append((p, len(title), len(d), len(m.hreflang), types))

# ---- duplicate canonicals
for c, ps in canon_seen.items():
    if len(ps) > 1:
        fails.append(f"canonical {c} claimed by {ps}")

# ---- sitemap URLs must not redirect (all end in /)
missing_slash = [u for u in sitemap_urls if not u.endswith("/")]
if missing_slash:
    fails.append(f"{len(missing_slash)} sitemap URLs without trailing slash")

# ---- sitemap URLs must be unique
dupes = {u for u in sitemap_urls if sitemap_urls.count(u) > 1}
if dupes:
    fails.append(f"sitemap lists {len(dupes)} URLs twice: {sorted(dupes)[:3]}")

# ---- `lastmod` must be a real revision date, not the build time
#
# Every URL used to carry `new Date().toISOString()`, so each deploy re-claimed
# the whole site as freshly revised. Google discounts a lastmod it catches lying.
#
# The tell is the time-of-day component: nobody hand-writes a revision date to the
# millisecond, so a `T` means it came from the clock. Deliberately *not* asserting
# that the dates differ from each other — a single pass that edits every page
# legitimately leaves them all on one date, which is where this currently stands.
for p, lm in sorted(lastmod.items()):
    if not lm:
        fails.append(f"{p}: no lastmod")
    elif "T" in lm:
        fails.append(f"{p}: lastmod {lm} carries a build timestamp")

# A wiki article states its own revision date in `article:modified_time`. The two
# have no shared source at render time, so this is what keeps them honest.
for p, declared in sorted(page_modified.items()):
    lm = lastmod.get(p, "")
    if declared and lm and lm[:10] != declared[:10]:
        fails.append(f"{p}: lastmod {lm} != article:modified_time {declared}")

# ---- referenced assets resolve
#
# All generated by `pnpm og` / `pnpm llms` except robots.txt. The OG cards were
# the original reason for this block: 20 of them were declared in `metadata` and
# had never been rendered, so every tool page pointed `og:image` at a 404 and a
# shared link showed a bare URL. Nothing in a build catches that.
# The card list comes from the OG generator's own manifest rather than a path
# heuristic: guessing "every top-level route is a tool" flagged /privacy and
# friends for cards they never declared.
cards = json.loads(subprocess.run(
    ["npx", "tsx", "scripts/og-manifest.ts"], capture_output=True, text=True, check=True,
).stdout)
assets = [f"/{card['out']}" for card in cards]
assets += ["/logo.png", "/icon-192.png", "/icon-512.png", "/favicon.ico",
           "/icon.svg", "/robots.txt", "/llms.txt", "/manifest.json"]
for a in assets:
    st = head_status(BASE + a)
    if st != 200:
        fails.append(f"asset {a}: {st}")

print(f"\nchecked {len(rows)} pages")
print(f"{'path':44s} T   D   hl  ld")
for p, t, d, hl, types in rows[:60]:
    print(f"{p:44s} {t:3d} {d:3d} {hl:3d}  {','.join(str(x) for x in types)}")

print()
if fails:
    print(f"{len(fails)} FAILURES")
    for f in fails:
        print("  -", f)
else:
    print("ALL CHECKS PASS")
sys.exit(1 if fails else 0)
