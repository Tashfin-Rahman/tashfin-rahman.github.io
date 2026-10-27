# How the site is built

*Open this when changing the site's code: the render pipeline, the pages, the map, the CV. Part of [TASHFIN-PORTFOLIO-CONTEXT.md](../TASHFIN-PORTFOLIO-CONTEXT.md).*

Plain HTML, CSS and JavaScript. No build step, no dependencies. He must be
able to edit it in a year without fighting tooling.

- **`content.js`** is the only file he edits. It holds `window.CV`, a plain
  JavaScript object. It is `.js` and not `.json` on purpose: `fetch` is
  blocked on `file://`, so this way the page works opened straight from disk.
  **Never convert it to JSON.**
- **`app.js`** renders `content.js` into the DOM and builds the JSON-LD.
- **`styles.css`** holds every style, including the article pages.
- **`article.js`** is the small script the written pieces load: reading time,
  the progress bar along the top, and the year in the footer. The pieces are
  plain HTML and read correctly without it.
- Empty arrays remove their section and its nav link. `TODO`-prefixed values
  render on the page but are kept out of the JSON-LD.

Sections are registered in one array in `app.js` (`var sections = [...]`), each
with an id, a nav label and a render function that returns false when there is
nothing to show. Adding a section means adding markup to `index.html`, a
render function, and one line in that array.

### Pages

- `index.html` — the single-page site.
- `cv/index.html` — a one-page A4 CV, printed to `assets/cv.pdf`. `noindex`.
- `writing/<slug>/index.html` — one page per written piece.

### The map

The Reach section draws an outline of Bangladesh with a dot on every district
in `CV.reach.districts`. Three things make it work and none should be
rediscovered:

- The outline is Natural Earth's 50m boundary, projected once and pasted into
  `app.js` as a path. `MAP` holds the exact numbers that projection used
  (`lon0`, `lat1`, `kx`, `scale`, `pad`), so `place(lat, lng)` puts a dot in
  the right spot. **Change one of those numbers and every dot moves.**
- `DISTRICTS` in `app.js` holds all 64 districts by name, so `content.js`
  needs only a list of names. Older spellings (Barisal, Chittagong, Comilla,
  Bogra, Jessore) are aliases of the same coordinates. A name that is not in
  the table is skipped without complaint.
- The path carries `pathLength="1"`, which is what lets the draw-on animation
  use a dash offset of 1 without knowing the real length.

**Twelve districts are listed, not thirteen.** The company profile names
twelve by project; the firm's own figure is 13. The missing one has not been
established, so it is not invented. The `note` under the map says so.

**The Writing list is written twice on purpose.** `index.html` carries a plain
copy of it, and `renderWriting()` clears that before rendering from
`content.js`. Everything else on the page is invisible without JavaScript;
this one list is not, because it is the only internal link to the articles.
**If you add a piece to the `writing` array, add it to the markup too**, or
the two will disagree.

Adding a written piece means touching four files, every time: the new page
under `writing/<slug>/`, the `writing` array in `content.js`, the fallback
markup in `index.html`, and both `sitemap.xml` and `llms.txt`. Then submit
the new URL to IndexNow. Miss one and the piece is live but invisible.

### The CV

He rejected a CV that was a long print of the site: "a CV is not like that."
It is now its own page, one page, modern layout, following the shape of his
original LaTeX CV: profile, experience, projects, leadership down the main
column; education, skills, languages in the sidebar.

It reads the same `content.js` as the site so titles and dates cannot drift,
but uses shorter wording held in CV-only fields: `meta.cvProfile`, `cvBullets`
on each experience entry, `cvLine` on the project and leadership entries.
Anything without one falls back to the site's text.

**Keep it one page.** If a change pushes it to two, shorten a `cvBullets`
line rather than shrinking the type.

The original LaTeX CV is recoverable from commit `e5e9ab5` if ever needed.

---
