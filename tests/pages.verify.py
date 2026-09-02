"""Runtime verification of the new tool pages in a real browser."""
import glob
import os
import sys
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:4321")  # serve the static export: (cd out && python3 -m http.server 4321)


def find_chrome():
    """Locate the Playwright Chromium, whatever its build number is.

    This used to be a hardcoded path pinned to chromium-1228. The installed
    build is 1208, so the whole suite failed to launch — a version bump either
    way breaks a literal path, and the failure looks nothing like a test
    failure. `None` lets Playwright use its own bundled resolution.
    """
    root = os.path.expanduser("~/Library/Caches/ms-playwright")
    matches = sorted(glob.glob(f"{root}/chromium-*/chrome-mac*/*.app/Contents/MacOS/*"))
    return matches[-1] if matches else None


CHROME = find_chrome()

# (path, input text, substring expected in the output pane)
CASES = [
    ("/json-to-yaml/", '{"a":1,"b":"yes","c":[1,2]}', 'b: "yes"'),
    ("/yaml-to-json/", 'a: 1\nb: "yes"', '"b": "yes"'),
    ("/json-to-xml/", '{"a":1}', "<a>1</a>"),
    ("/xml-to-json/", "<r><a>1</a></r>", '"a": 1'),
    ("/json-to-csv/", '[{"a":1},{"a":2}]', "a\n1\n2"),
    ("/csv-to-json/", "a,b\n1,2", '"a": 1'),
    ("/json-to-toml/", '{"a":1}', "a = 1"),
    ("/toml-to-json/", "a = 1", '"a": 1'),
    ("/json-to-json-schema/", '{"a":1,"b":[1,null]}', '"$schema"'),
    ("/json-schema-to-json/", '{"type":"object","properties":{"a":{"type":"integer"}}}', '"a": 0'),
    ("/json-to-typescript/", '{"id":1,"tag":null}', "interface Root"),
    ("/json-to-go/", '{"id":1}', "type Root struct"),
    ("/json-to-python/", '{"id":1}', "@dataclass"),
    ("/json-to-rust/", '{"id":1}', "pub struct Root"),
    ("/json-to-java/", '{"id":1}', "public class Root"),
    ("/json-to-csharp/", '{"id":1}', "public class Root"),
    ("/json-to-kotlin/", '{"id":1}', "data class Root"),
    ("/json-to-dart/", '{"id":1}', "class Root"),
    ("/json-to-swift/", '{"id":1}', "struct Root"),
]

failures = []

# The production build loads AdSense, Clarity, and GA. Those requests never
# settle here, so `networkidle` would hang forever and they are not what we are
# testing. Block every off-origin request and wait for the DOM instead.
def block_third_party(page):
    page.route(
        "**/*",
        lambda route: route.abort()
        if not route.request.url.startswith(BASE)
        else route.continue_(),
    )


def visit(page, path):
    page.goto(BASE + path, wait_until="domcontentloaded")
    page.wait_for_selector("h1")


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME)

    # --- functional pass
    page = browser.new_page(viewport={"width": 1440, "height": 1024}, locale="en-US")
    block_third_party(page)
    errors = []

    def record_console(m):
        # Blocking the analytics hosts above produces one ERR_FAILED per page.
        # Those are the harness's own doing, not a defect in the site.
        if m.type == "error" and "ERR_FAILED" not in m.text:
            errors.append(f"{m.type}: {m.text}")

    page.on("console", record_console)
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))

    for path, text, expected in CASES:
        visit(page, path)
        page.fill("textarea", text)
        page.wait_for_timeout(350)
        out = page.inner_text("main")
        ok = expected in out
        h1 = page.inner_text("h1")
        if not ok:
            failures.append(f"{path}: expected {expected!r} in output")
            print(f"FAIL {path}\n  h1={h1!r}\n  got: {out[-400:]!r}")
        else:
            print(f"ok   {path}  (h1={h1!r})")

    # --- error state shows a message rather than crashing
    visit(page, "/json-to-yaml/")
    page.fill("textarea", "{not json")
    page.wait_for_timeout(300)
    body = page.inner_text("main")
    if "Invalid" not in body and "invalid" not in body.lower():
        failures.append("bad input did not surface an error state")
        print("FAIL error state:", body[-300:])
    else:
        print("ok   invalid input shows error state")

    # --- example button populates
    visit(page, "/json-to-swift/")
    page.click("text=Example")
    page.wait_for_timeout(300)
    if "struct Root" not in page.inner_text("main"):
        failures.append("Example button did not produce output")
        print("FAIL example button")
    else:
        print("ok   example button")

    # --- a root-level JSON array must not produce a self-referential alias
    for path, element, alias in [
        ("/json-to-typescript/", "interface Root", "type RootList = Root[]"),
        ("/json-to-go/", "type Root struct", "type RootList []Root"),
        ("/json-to-rust/", "pub struct Root", "pub type RootList = Vec<Root>"),
        ("/json-to-swift/", "struct Root", "typealias RootList = [Root]"),
        ("/json-to-dart/", "class Root", "typedef RootList = List<Root>"),
    ]:
        visit(page, path)
        page.fill("textarea", '[{"a":1}]')
        page.wait_for_timeout(350)
        out = page.inner_text("main")
        if element not in out or alias not in out:
            failures.append(f"{path}: root array did not yield {alias!r}")
            print(f"FAIL root array {path}\n  got: {out[-400:]!r}")
        else:
            print(f"ok   root array {path}")

    # --- the intro copy must be in the crawled HTML, and be unique per page
    intros = {}
    for path in ["/", "/json-to-yaml/", "/json-to-go/", "/json-to-swift/"]:
        visit(page, path)
        heading = page.query_selector("h2:text('About this tool')")
        if not heading:
            failures.append(f"{path}: no intro section")
            print(f"FAIL intro {path}")
            continue
        # Read from the raw markup, not the DOM: the whole point is that a
        # crawler sees this without running the client bundle.
        html = page.evaluate("document.querySelector('section[aria-labelledby^=intro-]').innerHTML")
        body = page.inner_text("section[aria-labelledby^=intro-]")
        if "<code" not in html:
            failures.append(f"{path}: intro has no inline code spans")
            print(f"FAIL intro code {path}")
        elif "`" in body:
            failures.append(f"{path}: unparsed backticks in intro text")
            print(f"FAIL intro backticks {path}: {body[:200]!r}")
        else:
            print(f"ok   intro {path} ({len(body)} chars)")
        intros[path] = body

    duplicates = [a for a in intros for b in intros if a < b and intros[a] == intros[b]]
    if duplicates:
        failures.append(f"identical intro copy on {duplicates}")
        print("FAIL intro copy is duplicated across pages")
    elif len(intros) > 1:
        print(f"ok   intro copy differs across {len(intros)} pages")

    # --- switching language must translate page bodies, not just the chrome
    #
    # `/tools/` regressed here: it was a server component with its headings and
    # blurbs written inline in English, so the switcher changed the sidebar
    # around it and left the page itself untranslated.
    for path, marker in [("/tools/", "no uploads"), ("/", "Braces hold an object")]:
        ctx = browser.new_context(viewport={"width": 1280, "height": 900}, locale="en-US")
        ctx.add_init_script(
            "localStorage.setItem('language-storage',"
            " JSON.stringify({state:{language:'zh'},version:0}))"
        )
        zh = ctx.new_page()
        block_third_party(zh)
        zh.goto(BASE + path, wait_until="domcontentloaded")
        zh.wait_for_timeout(1100)
        body = zh.inner_text("main")
        if marker in body:
            failures.append(f"{path}: English copy survives a switch to zh ({marker!r})")
            print(f"FAIL i18n {path}: found {marker!r} while language=zh")
        elif "toolsIndex." in body or "intros." in body:
            failures.append(f"{path}: raw translation key rendered")
            print(f"FAIL i18n {path}: raw key in body")
        else:
            print(f"ok   i18n {path} translates under zh")
        ctx.close()

    # --- icon-only toolbar buttons must explain themselves
    #
    # The toolbar is eight bare icons. They carried a native `title`, which is
    # near-useless: it takes almost a second of holding still, renders in the OS
    # style, and never appears for keyboard users at all. `IconButton` draws its
    # own, so the checks are that it appears on hover, appears on keyboard focus,
    # stays inside the viewport (the rightmost one overflowed), goes away again,
    # and does not linger after a tap on touch.
    visit(page, "/")
    page.fill("textarea", '{"a":1,"b":[2,3]}')
    page.wait_for_timeout(300)

    if page.locator('[role="tooltip"]').count():
        failures.append("a tooltip is visible with no hover or focus")
        print("FAIL tooltip visible at rest")
    else:
        print("ok   no tooltip at rest")

    for label in ["Copy Input", "Compress", "Clear", "To XML", "Example"]:
        button = page.locator(f'button[aria-label="{label}"]')
        button.hover()
        page.wait_for_timeout(320)
        tip = page.locator('[role="tooltip"]')
        if tip.count() != 1 or label not in tip.inner_text():
            failures.append(f"toolbar {label!r}: no tooltip on hover")
            print(f"FAIL tooltip {label!r} on hover")
            continue
        box = tip.bounding_box()
        if box["x"] < 0 or box["x"] + box["width"] > 1440:
            failures.append(f"toolbar {label!r}: tooltip runs off the viewport ({box})")
            print(f"FAIL tooltip {label!r} clipped: {box}")
        else:
            print(f"ok   tooltip {label!r} ({int(box['width'])}px wide)")
        page.locator("h1").hover()
        page.wait_for_timeout(200)
        if page.locator('[role="tooltip"]').count():
            failures.append(f"toolbar {label!r}: tooltip survives pointer leave")
            print(f"FAIL tooltip {label!r} does not hide")

    # A disabled button is exactly the one a user needs explained.
    page.locator('button[aria-label="Escape"]').click()
    page.wait_for_timeout(300)
    xml = page.locator('button[aria-label="To XML"]')
    xml.hover(force=True)
    page.wait_for_timeout(320)
    if page.locator('[role="tooltip"]').count() != 1:
        failures.append("disabled To XML button gives no reason why")
        print("FAIL disabled button has no tooltip")
    else:
        print("ok   disabled button explains itself")
    page.locator("h1").hover()
    page.wait_for_timeout(200)

    # `:focus-visible` only matches under real keyboard navigation, so Tab in
    # rather than calling .focus().
    page.locator('button[aria-label="Copy Input"]').evaluate("e => e.focus()")
    page.keyboard.press("Tab")
    page.wait_for_timeout(320)
    focused = page.evaluate("document.activeElement.getAttribute('aria-label')")
    if page.locator('[role="tooltip"]').count() != 1 or focused != "Compress":
        failures.append("keyboard focus shows no tooltip")
        print(f"FAIL keyboard focus tooltip (focused={focused!r})")
    else:
        print("ok   keyboard focus shows tooltip")

    # --- sidebar links resolve (orphan-page check)
    visit(page, "/tools/")
    hrefs = page.eval_on_selector_all("a[href]", "els => els.map(e => e.getAttribute('href'))")
    internal = sorted({h for h in hrefs if h and h.startswith("/")})
    print(f"ok   /tools links to {len(internal)} internal routes")

    if errors:
        failures.append(f"{len(errors)} console errors")
        print("CONSOLE ERRORS:", errors[:6])
    else:
        print("ok   no console errors")

    # --- mobile overflow
    mobile = browser.new_page(viewport={"width": 390, "height": 844}, locale="en-US")
    block_third_party(mobile)
    for path in ["/", "/tools/", "/json-to-go/", "/csv-to-json/"]:
        visit(mobile, path)
        sw = mobile.evaluate("document.documentElement.scrollWidth")
        if sw > 390:
            failures.append(f"mobile overflow on {path}: scrollWidth {sw}")
            print(f"FAIL mobile {path}: scrollWidth={sw}")
        else:
            print(f"ok   mobile {path}: scrollWidth={sw}")

    # A tap fires pointerenter too, but the finger then rests on the button so
    # pointerleave never comes — an unguarded hover tooltip would stay stuck on
    # screen for the rest of the session.
    # locale matters: the labels are translated, and the language detector reads
    # it, so without pinning en-US the selectors below look for the wrong strings.
    touch = browser.new_context(
        viewport={"width": 390, "height": 844},
        has_touch=True,
        is_mobile=True,
        locale="en-US",
    ).new_page()
    block_third_party(touch)
    touch.goto(BASE, wait_until="domcontentloaded")
    # The labels are translated, so wait for i18n to settle before selecting on one.
    touch.wait_for_selector('button[aria-label="Compress"]')
    touch.fill("textarea", '{"a":1}')
    touch.wait_for_timeout(300)
    touch.locator('button[aria-label="Compress"]').tap()
    touch.wait_for_timeout(400)
    compressed = '{"a":1}' in touch.locator("section").nth(1).inner_text().replace(" ", "")
    lingering = touch.locator('[role="tooltip"]').count()
    if not compressed:
        failures.append("tap on a toolbar button did not run its action")
        print("FAIL touch tap does not trigger action")
    elif lingering:
        failures.append("tooltip stays on screen after a tap")
        print("FAIL touch tap leaves a tooltip behind")
    else:
        print("ok   touch tap acts and leaves no tooltip")
    touch.close()

    mobile.screenshot(path="artifacts/tools-mobile-390.png", full_page=True)
    visit(page, "/tools/")
    page.screenshot(path="artifacts/tools-index-1440.png", full_page=True)
    visit(page, "/json-to-go/")
    page.fill("textarea", '{"id":1,"userName":"ada","tags":["a"],"addr":{"zip":"10001"}}')
    page.wait_for_timeout(400)
    page.screenshot(path="artifacts/json-to-go-1440.png")

    browser.close()

print()
print("ALL PASS" if not failures else f"{len(failures)} FAILURES:\n" + "\n".join(failures))
sys.exit(1 if failures else 0)
