# Tashfin Rahman — personal portfolio

> **Working on this project?** Read [CONTEXT.md](CONTEXT.md) first. It holds
> who this is for, how the pieces fit together, what has been decided, and the
> traps already hit. [TODO.md](TODO.md) holds what is still to do.

A static personal site that doubles as an online CV. No build step, no
dependencies, no `npm install`. Open `index.html` in a browser and it works.

**Theme:** Midnight & Gold — dark by default, with a cream-and-bronze light mode
behind the toggle in the top right.

## Updating it

**Edit `content.js`. That's the whole job.** Everything on the page — your name,
jobs, work, education, projects, skills — comes from the object in that one
file. Save it, reload the page, done.

Four conveniences built into the renderer:

- **Empty sections disappear.** `work: []` hides the Selected Work heading *and*
  its nav link. Nothing ever renders half-filled.
- **`null` means "I don't have this".** Leave `linkedin: null` and no LinkedIn
  link appears anywhere.
- **Broken images collapse.** A work photo or banner pointing at a missing file
  falls back to the text layout instead of leaving a grey hole.
- **`TODO` values are quarantined.** They show on the page so you notice them,
  but they're kept out of the search-engine data.

## Changing the colours

Everything lives in two token blocks at the top of `styles.css` — one for dark,
one for light. To change the accent you need **both**:

- `--accent` — the gold/bronze itself
- `--accent-ink` — the text drawn *on* the accent (buttons)

Those two must contrast with each other. Gold needs dark text on it; a navy
accent needs white. Current ratios: 8.88:1 dark, 5.47:1 light — both well past
the 4.5:1 accessibility floor.

To make **light** the default instead of dark, change the fallback at the end of
`initTheme()` in `app.js` from `"dark"` to `"light"`.

## The animations

Scroll progress bar, staggered hero entrance, sections and cards revealing as
you scroll, timeline rails drawing themselves, dots popping in, drifting glow
behind the hero, a sweep across the primary button on hover, and a slow push-in
on the banner photo.

Three things keep it from breaking the page:

1. **No JavaScript, no problem.** The hidden starting state is scoped to a
   `.anim` class that `app.js` adds. If the script fails, nothing is ever
   hidden — the page is just a plain document.
2. **Printing always works.** An element that never scrolled into view sits at
   `opacity: 0`. The print stylesheet forces everything visible, so `Ctrl+P`
   gives a complete CV even if you never scrolled down. (Verified.)
3. **Reduced motion is respected.** Anyone whose system asks for less motion
   gets the page with no animation at all.

## Posting your work

The **Selected Work** section is hidden until `work: []` has something in it.
The template is in `content.js`. Only `title` is required.

**On outcomes:** the `outcome` line is what turns a picture into a case study.
"Reservations up 34% that month" wins work; "the client was happy" doesn't. If a
piece has no number, leave `outcome` out rather than padding it.

## Your CV

`assets/cv.pdf` is live and the **Download CV** button sits in the hero next to
Email and Call. To update it, replace that file — the name stays the same, so
nothing else needs touching.

You also get a second CV for free: press `Ctrl+P` on the site and save as PDF.
The print stylesheet strips the nav, buttons, images, animations and dark
colours and lays the content out as a document. That version is generated from
`content.js`, so it can never drift out of date.

## Still TODO

- **`meta.heroBanner`** — your banner photo. See `assets/README.md` for what
  makes a good one.
- **`meta.linkedin`** — your LinkedIn URL.
- **The agency** — a commented-out template sits at the top of the `experience`
  array for when you want to list it.

## Previewing locally

```bash
python -m http.server 8081 --directory portfolio
```

Then open http://localhost:8081. You can also just double-click `index.html` —
content loads from a `.js` file rather than JSON precisely so that works without
a server.

**If your edits don't show up,** the browser is serving cached CSS/JS. Hard
reload with `Ctrl+Shift+R`.

## Deploying to GitHub Pages

The repo is committed locally with a remote already set. The remaining step is
creating the repo on GitHub — it must be named exactly `<your-username>.github.io`,
**public**, and **empty** (no README, no .gitignore, no licence). Then:

```bash
git push -u origin main
```

Pages serves a `<username>.github.io` repo automatically from the default
branch; there's no setting to switch on. Afterwards, set `meta.siteUrl` to the
live address so the social and search tags point somewhere real.

**Before you deploy:** your email and phone are on the page in plain text, which
is what you chose for client reach. Bots scrape those. If the spam gets
annoying, set `contactMode: "form"` with a free [Formspree](https://formspree.io)
endpoint in `meta.formEndpoint` — the renderer swaps in a contact form and
publishes neither.

## Files

| File | What it is |
|---|---|
| `content.js` | **Your data. The only file you need to touch.** |
| `index.html` | Empty semantic shell + SEO tags |
| `styles.css` | Colour tokens, animation rules, responsive layout, print rules |
| `app.js` | Renders `content.js`; builds the nav, the animations, the scroll bar, the tab icon, and the `Person` schema |
| `assets/` | Banner, CV PDF, headshot, and `work/` images |
