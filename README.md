# Tashfin Rahman — personal portfolio

A static personal site that doubles as an online CV. No build step, no
dependencies, no `npm install`. Open `index.html` in a browser and it works.

## Updating it

**Edit `content.js`. That's the whole job.** Everything on the page — your name,
jobs, work, education, projects, skills — comes from the object in that one
file. Save it, reload the page, done.

Three conveniences built into the renderer:

- **Empty sections disappear.** `work: []` hides the Selected Work heading *and*
  its nav link. Nothing ever renders half-filled, so you can publish with what
  you have and add the rest later.
- **`null` means "I don't have this".** Leave `cvFile: null` and no download
  button appears. Leave `linkedin: null` and no LinkedIn link appears.
- **A broken image path collapses.** If a work item points at a photo that
  isn't there, the card falls back to its text-only layout instead of showing a
  grey box.

## Posting your work

The **Selected Work** section is the place for client and campaign pieces. It's
hidden right now because `work: []` is empty. Add an entry and it appears:

```js
work: [
  {
    title: "Ramadan campaign for a local restaurant",
    client: "Client name, or null to keep it private",
    date: "Mar 2026",
    type: "Campaign",                    // Campaign / Poster series / Case study / Video
    image: "assets/work/ramadan.jpg",    // optional
    brief: "What the client needed.",
    did: "What you made and how.",
    outcome: "What came of it. A number if you have one.",
    link: null,                          // optional
  },
],
```

Only `title` is required — every other field is dropped if you omit it.

**Images:** put them in `assets/work/`. Roughly 4:3 or square works best; they
get cropped to 4:3. Keep each one under about 300KB or the page gets slow on
mobile data.

**On outcomes:** the `outcome` line is what turns a picture into a case study.
"Reservations up 34% that month" wins work; "the client was happy" doesn't. If a
piece genuinely has no number, leave `outcome` out rather than padding it.

## Things still marked TODO

Search `content.js` for `TODO`:

- **LinkedIn URL** — `meta.linkedin`.
- **CV PDF and headshot** — optional; see `assets/README.md`.
- **`meta.siteUrl`** — set this once deployed so the social and search tags
  point somewhere real.

A `TODO` value shows on the page on purpose, so you notice it. It's deliberately
kept out of the search-engine data, so a stray one won't tell Google you work
somewhere called "TODO".

**The agency isn't listed.** There's a commented-out template at the top of the
`experience` array for when you want to add it — entries render in the order
they appear, so the newest venture goes first.

## Getting a PDF CV

Press `Ctrl+P` and save as PDF. The print stylesheet drops the nav, buttons,
images and dark colours, tightens the spacing and lays the content out as a
document. Work-item images are hidden in print — a printed CV is read, not
looked at.

This means **one source of truth**: update `content.js` and both the website and
the printable CV change together. No separate Word file going stale.

## Previewing locally

```bash
python -m http.server 8081 --directory portfolio
```

Then open http://localhost:8081. (You can also just double-click `index.html` —
content loads from a `.js` file rather than JSON precisely so that works without
a server.)

## Deploying to GitHub Pages — free, permanent

1. Create a GitHub repo named exactly `<your-username>.github.io`.
2. Push the contents of this folder to it:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. Repo → **Settings** → **Pages** → Source: `main`, folder `/ (root)`.
4. Live at `https://<your-username>.github.io` within a minute or two.
5. Set `meta.siteUrl` in `content.js` to that address.

**Before you deploy:** your email and phone number are on this page in plain
text, which is what you asked for — it's the right call for winning agency
clients, but bots do scrape them. If the spam gets annoying, set
`contactMode: "form"` and a free [Formspree](https://formspree.io) endpoint in
`meta.formEndpoint`; the renderer swaps in a contact form and publishes neither.

## Files

| File | What it is |
|---|---|
| `content.js` | **Your data. The only file you need to touch.** |
| `index.html` | Empty semantic shell + SEO tags |
| `styles.css` | Design tokens, light/dark, responsive, print rules |
| `app.js` | Renders `content.js`; builds the nav, the tab icon from your initials, and the `Person` schema for search engines |
| `assets/` | Headshot, CV PDF, and `work/` images |
