# tashfin-rahman.github.io

The personal site and online CV of Tashfin Rahman — Partner and Chief Business
Officer at Home Inn, Dhaka. Live at
**[tashfin-rahman.github.io](https://tashfin-rahman.github.io)**.

A static site. No build step, no dependencies, no `npm install`, nothing that
rots in six months. Open `index.html` in a browser and it works.

> **Working on this?** Read **[notes/CONTEXT.md](notes/CONTEXT.md)** first —
> who it is for, what has been decided, and the traps already hit.
> [CLAUDE.md](CLAUDE.md) says how to work on it.
> [notes/TODO.md](notes/TODO.md) is what is still open.

## How it is put together

**`content.js` is the only file with any facts in it.** Name, jobs, education,
projects, skills, contact details — all of it is one object, `window.CV`.
`app.js` reads that object and builds the page; `index.html` ships with no
content text at all, only the semantic shell and the search tags.

It is a `.js` file rather than `.json` so that `fetch` is never involved, which
is why double-clicking `index.html` works with no server behind it.

```
index.html      semantic shell, meta and Open Graph tags, JSON-LD
styles.css      colour tokens, layout, animation, print rules
content.js      ← the data. The only file that needs editing.
app.js          renders content.js: nav, sections, animations, Person schema
article.js      shared furniture for the standalone article pages

blog/           the blog index and one folder per published piece
writing/        redirect stubs for the old /writing/<slug>/ addresses
cv/             print-only page that produces assets/cv.pdf
tools/          the fit-out quote calculator
track-your-downfall/   a small standalone PWA

assets/         headshot, cv.pdf, and work/ images the site actually uses
notes/          everything about the project. Not published.
drafts/         parked content and a guide to writing a post. Not published.
_private/       never committed. See .gitignore.
```

## Changing it

**Edit `content.js`, save, reload.** Four conveniences are built into the
renderer:

- **Empty sections disappear.** `work: []` hides the Selected Work heading
  *and* its nav link. Nothing renders half-filled.
- **`null` means "I don't have this".** `linkedin: null` and no LinkedIn link
  appears anywhere on the page.
- **Broken images collapse.** An entry pointing at a missing file falls back to
  the text layout rather than leaving a grey hole.
- **`TODO` values are quarantined.** They show on the page so you notice them,
  but they are kept out of the search-engine data.

### Colours

Two token blocks at the top of `styles.css`, one for dark and one for light. To
change the accent you need **both** `--accent` (the gold or bronze itself) and
`--accent-ink` (the text drawn on top of it). Current contrast: 8.88:1 dark,
5.47:1 light, against a 4.5:1 floor.

Dark is the default. To flip it, change the fallback at the end of
`initTheme()` in `app.js`.

### Animation

Scroll progress bar, a staggered hero entrance, sections and cards revealing on
scroll, timeline rails drawing themselves, and the reach map drawing its coast
before the district pins land.

Three things stop it breaking the page:

1. **No JavaScript, no problem.** The hidden starting state is scoped to an
   `.anim` class that `app.js` adds. If the script never runs, nothing is ever
   hidden and the page is a plain document.
2. **Printing always works.** An element that never scrolled into view sits at
   `opacity: 0`, so the print stylesheet forces everything visible. `Ctrl+P`
   gives a complete CV even if you never scrolled.
3. **Reduced motion is respected.** A system asking for less motion gets the
   page with none at all.

## The CV

Two versions, one source.

`assets/cv.pdf` is the download button in the hero. It is **printed from
`cv/index.html`**, which reads the same `content.js`, so it cannot describe a
different person from the site. Re-print it whenever `content.js` changes —
the procedure, including the one flag that makes it fail silently, is in
[notes/how-the-site-works.md](notes/how-the-site-works.md).

`Ctrl+P` on the site itself gives a second copy for free, laid out by the print
stylesheet.

## Running it locally

```bash
python -m http.server 8081 --directory portfolio
```

Then <http://localhost:8081>. Double-clicking `index.html` also works. If an
edit does not show up, the browser is serving cached CSS or JS — `Ctrl+Shift+R`.

## Publishing

GitHub Pages serves this repository from `main` automatically, because it is
named `<username>.github.io`. `git push` and it is live in about half a minute.
The commands are in [notes/deploying.md](notes/deploying.md).

Two things at the site root **must never be deleted**:

- `google520fe39cf7a30793.html` — Search Console rechecks it, and removing it
  unverifies the property.
- `43a9f4accff32a5ec66aede0b1bec2e4.txt` — the IndexNow key.

## What is public, and what is not

This repository is public, and it has to stay that way: a user Pages site on a
free account stops being served the moment the repository goes private.

So **every file committed here is published**, whether or not the site links to
it. `_config.yml` decides what the *site* serves; `.gitignore` decides what the
*world* can download. They are not the same control, and treating them as the
same is how the back of the Home Inn visiting card — factory address, hotline,
a private work email — sat in `drafts/` for three weeks, 404 on the site and
HTTP 200 on GitHub.

Anything that must not leave this machine goes in `_private/`.
