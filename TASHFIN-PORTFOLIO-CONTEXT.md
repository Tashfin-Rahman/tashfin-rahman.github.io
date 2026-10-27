# Tashfin Portfolio Context

**Read this first, before doing anything in this project. Write back to it
after every piece of work, not at the end of a session.**

This file is the memory for this project. It holds who the work is for, what
has been decided, how the pieces fit together, and the traps that have already
been hit. `CLAUDE.md` beside it points here and loads automatically. `TODO.md` holds
what is still to do. `DEPLOY.md` holds the commands. `LINKEDIN.md` holds the
LinkedIn text.

Tashfin asked on 2026-10-26 that context live here rather than being carried in
conversation, so that a session can be compacted at any point and the next one
picks up from this file with nothing lost. On 2026-10-27 he asked for the file
to carry its own name, and for everything from a session to go into it. That
means:

1. Read this file before starting.
2. Do the work.
3. Write what changed back into this file, and into `TODO.md` if the list of
   outstanding things moved. Do this as each piece finishes, so that losing
   the conversation loses nothing.
4. Commit it with the work.

Anything learned the hard way belongs in **Traps already hit**. Anything
settled belongs in **Decisions already made**. Neither section should have to
be rediscovered.

It was called `CONTEXT.md` until 2026-10-27. Anything still pointing at that
name is out of date.

---

## Who this is for

Tashfin Rahman, Dhaka, Bangladesh.

- Partner and Chief Business Officer at **Home Inn**, a firm that has designed
  and built architecture, interiors and custom furniture across Bangladesh
  since 2015, trading under the licence of M/S Ahasan Enterprise. 73 corporate
  and 57 residential projects in 13 districts.
- BBA student at **North South University** (Summer 2025 onward).
- Advises **Haifa Intelligence**, an AI studio, on marketing.
- Previously Senior Accountant at **Steam Store Bangladesh** (Jul 2022 to
  Jan 2025).
- Designed Home Inn's brand identity and wrote its company profile himself.
  He confirmed this; it is his own design work, not the firm's.
- Building an agency of his own: marketing and IT. **No name yet, so it stays
  off everything.**

He is not a developer. Explain things plainly and do the technical work for
him. He asks for work in very short messages ("Fix everything", "Now do all
the works") and expects the obvious next step to be taken without another
round of questions. When he cannot supply something, restructure the work so
it does not depend on it rather than stalling.

### How he wants writing done

He dislikes AI-sounding prose and asked for everything, everywhere, rewritten
to read as a person wrote it. The tells he reacted to were real:

- An aphorism opening every item ("Construction is where a budget goes wrong
  quietly"). Once is a voice; four times is a formula.
- Em-dashes everywhere, usually where a full stop would do.
- Sentences that stop to explain their own significance.
- Semicolon lists, "hands-on", and anything slightly pleased with itself.

What works instead: first person, short sentences, concrete nouns and numbers,
no rhetorical scaffolding. Write this way from the start, without being asked.

**Never invent figures.** He has no project numbers to give yet. Argue from
method instead. A true piece with fewer specifics beats a sharp one built on
invented data.

---

## Where everything lives

| What | Where |
|---|---|
| Site | https://tashfin-rahman.github.io |
| Repo | https://github.com/Tashfin-Rahman/tashfin-rahman.github.io |
| Local | `E:\Claude code\portfolio` |
| LinkedIn | https://www.linkedin.com/in/tashfinrahman |
| GitHub profile | https://github.com/Tashfin-Rahman |
| Home Inn | https://homeinn.xyz |
| Haifa Intelligence | https://haifa-ai.com |
| Brand assets | `C:\Users\User\OneDrive\Desktop\Business\HomeInn` |

Contact on the site: `tashfinrahman010@gmail.com`, +880 1568 116144, Dhaka.

---

## How the site is built

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

## Decisions already made

Do not reopen these without being asked.

- **Theme** "Midnight & Gold": dark by default (`#0c0e13`, accent `#d8a857`),
  cream and bronze light mode behind the toggle. He chose it from mock-ups and
  rejected the original navy.
- `--accent-ink` exists because gold needs *dark* text on it. White on gold is
  about 1.9:1. Never set button text to white without re-checking contrast.
- **Animations are deliberately bold.** He asked for them. The reveal engine
  hides elements behind an `.anim` class added by JS, and the print stylesheet
  force-overrides it or unscrolled sections print blank. Both guards are
  verified; do not remove either.
- Hero is a **full-width banner photo**, not a circular headshot.
- **Title** is "Partner & Chief Business Officer".
- **CV address** is "Dhaka, Bangladesh" only, not the full street address.
- The **agency** is not listed anywhere until it has a name.
- **English stays primary.** Audience is "everyone". A Bangla version is
  parked, not rejected.
- He chose a hyphenated GitHub username twice over plain `tashfinrahman`.
  His call, made twice. Do not relitigate.

---

## SEO and AEO, as it stands

Done: sitemap, robots.txt, canonical, `ProfilePage` + `Person` JSON-LD,
`BlogPosting` on the article, image SEO with real alt text, `llms.txt`,
IndexNow (key `43a9f4accff32a5ec66aede0b1bec2e4`, file at site root), Google
Search Console verified, four identity links in `sameAs`.

**The real problem is a name collision.** Searching "Tashfin Rahman" returns
several different people; a CS and cybersecurity student with 2.9K LinkedIn
followers ranks first. He is competing for his own name, not starting from
empty. That is why the schema carries `disambiguatingDescription`,
`givenName`/`familyName`, and why `llms.txt` states plainly what he is *not*
(not computer science, not security, not policy research, no connection to
BRAC). Keep that sharp.

Google had already indexed the homepage the same day it went live.

**Search Console:** verified for `https://tashfin-rahman.github.io` by the
HTML-file method. `google520fe39cf7a30793.html` sits at the site root and
**must never be deleted** — Google rechecks and would unverify the property.
`index.html` also carries two `google-site-verification` meta tags. DNS
verification is impossible for a `github.io` address; he tried it and got a
misleading "wait a few hours" error.

---

## Traps already hit

Hard-won. Re-reading this will save hours.

### The browser pane

- **It breaks.** GitHub's settings page in particular locks the renderer:
  every call times out, console reports thousands of dropped messages. Closing
  every regular tab tears the pane down; reopening with `preview_start` usually
  recovers it, and sessions sometimes survive.
- **A page-opened sign-in popup freezes everything** — navigation and JS, in
  every tab. An agent may not close it. Only the user can.
- **The screenshot coordinate frame is not the page viewport** (800x663 vs
  1020x846). Scale `getBoundingClientRect` values by `800 / window.innerWidth`
  before passing them to the computer tool, or clicks land in the wrong place
  and `ctrl+a` selects the whole document instead of the field.
- **Screenshots lag.** A blank hero usually means a stale frame, not a bug.
  Verify against the DOM, then re-shoot.
- The pane is a **different browser from his own**. Signing into Opera does
  not sign in the pane. This has caught him three times: he says "I am signed
  in" meaning his own browser. Its LinkedIn and GitHub sessions also do not
  reliably survive a pane restart. Check whether the session is live before
  planning any work that depends on it, and if it is not, say so immediately
  rather than after several failed attempts.
- **Prefer email and password over "Sign in with Google"** when he does sign
  in. Google opens a popup window, and a page-opened popup freezes the pane.

### His own browser cannot be used instead

Tried on 2026-10-27, because he asked. None of the three routes work:

- **Claude in Chrome** reports no connected browser. The extension is not
  installed, and he uses Opera GX rather than Chrome.
- **Opera GX through computer use** cannot be granted. `request_access` keeps
  answering "doesn't match any installed application" while suggesting the
  same name back. Even if it were granted, browsers are given a read-only
  tier: screenshots work, clicks and typing are blocked. It could never save
  anything.
- **The LinkedIn app for Windows** is in the Start menu and grants at full
  tier, but opening it produces no window of its own on either monitor. It
  appears to hand off to the default browser.

So the app's browser pane is the only way to change LinkedIn, and it needs him
to sign in there. Do not spend calls re-testing this.

### Headless Chrome is the reliable alternative

`C:\Program Files\Google\Chrome\Application\chrome.exe` with `--headless=new`
does `--print-to-pdf` and `--screenshot` and `--dump-dom`. A `file://` URL
works because the site needs no server. This is how the CV is generated and
how rendering should be checked when the pane misbehaves.

### LinkedIn

- Saving **any** position rewrites the headline to "<role> at <company>",
  including a past role. Set the headline **last** and re-check it.
- The Save button **moves down** as a description box grows. A coordinate
  captured before typing misses it, and the save silently does nothing.
  Re-locate Save immediately before clicking, then reload the profile to
  confirm.
- Headline and description fields are contenteditable DIVs, not inputs. Click,
  `ctrl+a`, then type. `form_input` does not work on them.
- Typing `\n\n` produces **five** newlines. Use a single `\n` between
  paragraphs.
- The company field is a typeahead. Dismiss it by clicking another field or it
  may silently select the wrong company.
- After saving a position it offers "Post now" / "Skip". **Always Skip** unless
  an announcement was asked for. Turn the Notify network toggle off first.
- Skills are added one at a time; after each save it offers "Add more skills"
  which loops straight back. Click the "+" on a row, not the row's name.
- **The profile page does not fully render in the pane.** On 2026-10-27, with
  the session signed in, `/in/tashfinrahman/` showed only the top card, the
  Open to Work strip, Analytics and Activity. About, Education and Skills
  never appeared, so the About pencil could not be reached. The console held
  over 500 `ERR_BLOCKED_BY_CLIENT` errors, which is what stops the cards
  loading. Widening the viewport to 1280 and reloading did not help.
  The data is intact: `/in/<slug>/details/experience/` renders in full and
  showed all three roles with their descriptions. Use the `/details/` pages to
  **read** the profile. There is no equivalent URL for About; `/details/about/`
  and `/edit/forms/summary/` both 404, and the `profileView` Voyager endpoint
  now returns 410. So About currently cannot be edited from the pane at all.

### GitHub

- The token is bound to the account id, not the name, so it survives username
  changes. No re-authentication needed.
- It lacks the `user` scope, so profile fields and social links cannot be
  changed through the API. Only the browser or the user can.
- The profile form's save is quiet and can silently fail. Verify with
  `gh api user --jq .blog` rather than trusting the form.
- A social link showing a plain chain icon instead of its brand icon probably
  has a tracking parameter on it. LinkedIn URLs copied from your own profile
  carry `?isSelfProfile=true`, which breaks the match.
- **GitHub does not redirect old Pages URLs or old profile URLs after a
  username change.** Claude wrongly said it does. Both 404.

### Sticky hover on a phone

A phone has no hover, so a tap leaves `:hover` applied until something else
is touched. Anything that **moves** on hover therefore stays moved. The theme
toggle rotated 25 degrees on hover and stayed tilted after every tap on a
phone, which is exactly what Tashfin reported. Hover effects that change
`transform` belong behind `@media (hover: hover) and (pointer: fine)`.
`:active` is safe: it is only held while the finger is down.

### The theme toggle

It is a sun that folds into a moon, drawn as inline SVG in `index.html`. A
mask circle parked off the canvas slides across the disc to bite a crescent
out of it, the disc grows, and the rays retract and fade. Every bit of that
is CSS driven by `data-theme` on `<html>`, so the icon is already correct
before any script runs and `app.js` only updates the `aria-label`. There is
no glyph to swap any more; do not reintroduce one.

Pressing it does two things at once. The icon spins half a turn, driven by a
class the script adds and removes. And the new theme opens as a circle from
the button and spreads to the furthest corner of the window, built on the
View Transitions API: `document.startViewTransition` snapshots the old page,
the new one is laid over it, and the script animates a `clip-path` circle on
`::view-transition-new(root)`. The radius is the distance to the furthest
corner, or the sweep stops short and leaves the old theme in a corner.

Where the API is missing, or reduced motion is asked for, the theme simply
switches. The spin still runs; only the sweep is skipped.

### Animation and reduced motion

Anything that starts hidden and is revealed by a transition must also be put
back inside the `@media (prefers-reduced-motion: reduce)` block. That block
switches transitions off globally, so an element left at `opacity: 0` stays
invisible forever. The map hit this: the pins and the outline were blank for
anyone who had asked for less motion. The print block needs the same care,
which is why `#reach` and `.rail` are hidden there outright.

### Screenshots of a long page

A headless screenshot taken with a very tall window (`--window-size=390,9000`)
lays the page out wrongly and catches transitions half-finished. It showed
text apparently clipped at the right edge and a counter reading 717 on its
way to 2015. Neither was real. Measure instead: serve the folder, set the
viewport, and read `document.documentElement.scrollWidth` against
`window.innerWidth`. Add `--force-prefers-reduced-motion` when a still of the
finished state is what you want.

### Verifying PDFs

Chrome's subset fonts map the space glyph to codepoint 3, so extracted text
prints as if it were correct while string searches fail on invisible
characters. Treat codepoints 0 to 31 as whitespace before searching, or you
will wrongly conclude the content is missing.

### Shell

Backticks inside double-quoted bash strings get substituted and silently eat
the content — this has mangled the memory file three times. Write Python to a
file and run it with `python -I` instead of inlining it.

Heredocs mangle backslashes and break on apostrophes. Same fix.

### Reply buttons

The app's reply buttons send only their label text. Attachments and anything
typed after them do not arrive. When he says "here's my photo" and nothing is
attached, that is why. Ask him to use the paperclip or save files into the
folder.

### The big one

Five GitHub device-flow codes appeared to fail. The cause was Claude's: each
time he took a few minutes, the polling process was killed and a new code
issued, so his approval landed on a code nothing was listening for.
**Never kill a device-flow poller.** It succeeded 250 seconds after it was
left alone.

---

## Current state

*Last updated 2026-10-27.*

**Live and verified**

- The site, dark by default, with About, Experience, Reach, Writing,
  Projects, Education, Skills, Leadership and Contact.
- The Reach section: an outline of Bangladesh with a dot on each of the
  twelve districts named in the company profile, beside 2015, 130 and 13 as
  large figures, the last two counting up as the section arrives. See
  **The map** above for how it is built.
- A gold rail that fills downward through each timeline as you scroll, with a
  dot at the leading end, driven by `--p` on the list.
- The theme toggle: a sun that folds into a moon, and a circle of the new
  theme sweeping out of the button across the page.
- Reading time and a progress bar on the written pieces, from `article.js`.
- A one-page CV at `assets/cv.pdf`, printed from `cv/index.html`.
- Two written pieces, newest first: `/writing/bookkeeping-shop-vs-project/`
  and `/writing/fit-out-quote/`. Both are listed in the sitemap and `llms.txt`
  and carry `BlogPosting` and `FAQPage` schema in one `@graph`. The questions
  are answered in each page's own text; keep them that way if an article is
  edited, or the schema stops matching the page.
- Search Console verified; the homepage was indexed the day it went live.
- GitHub profile: README, website field, company, location, four social links.
- LinkedIn: headline, About, three roles, seven skills, portfolio in contact
  info, clean URL `/in/tashfinrahman`.

**Off the site deliberately**

Selected Work. He wants it rebuilt from scratch. The four entries are parked
in `drafts/work-entries.js`, the images are still in `assets/work/`, and the
renderer still supports them, so putting the array back restores the section.
What was wrong with it: three of the four pieces described the firm's work
rather than his, and carried firm-wide figures instead of anything he did.

**Outstanding, blocked on him**

The shorter LinkedIn About. He approved this text:

> I am Partner and Chief Business Officer at Home Inn, a Dhaka firm that
> designs and builds architecture, interiors and custom furniture. I look
> after budgeting, cost tracking and bookkeeping, set our advertising
> approach, and designed the firm's brand identity. I also advise Haifa
> Intelligence, an AI studio, on marketing, and I'm studying for a BBA at
> North South University.
>
> tashfin-rahman.github.io

It is **not saved**. His profile still shows the five-paragraph version.
Three attempts have now failed. The first two hit LinkedIn's sign-in wall,
because he was signed in to his own Opera rather than to the pane. On
2026-10-27 the pane was genuinely signed in and it failed anyway: the profile
page does not render its About card there (see Traps). The text is in
`LINKEDIN.md` so he can paste it himself, which is now the only way.

Also found on 2026-10-27: the **Open to Work** banner is on, set to
"Recruiters only", location Mirpur. It contradicts a profile that says he
co-owns the firm. His call, raised in `LINKEDIN.md`.

**Done on 2026-10-27**, in order, so a cold session knows what moved:

1. `FAQPage` schema on the fit-out article, and a plain HTML link to the
   piece in `index.html` for crawlers that do not run JavaScript.
2. A second written piece, "Keeping the books for a shop and for a project
   business", argued from his own bookkeeping work with no invented figures.
3. The wording pass over the site finished: the last two em-dashes in public
   prose, in the contact line, and a meta description that still advertised a
   Selected Work section that had come off the page.
4. His GitHub profile checked live. Three things left, all his to do, written
   out with the replacement bio text under **GitHub** in `TODO.md`: the bio is
   still the old casual one, `For-Claude` and `Anti-Gravity` sit above his
   portfolio with no descriptions and one of them empty, and the portfolio
   repo has no topics.
5. His own browser ruled out as a way in (see Traps), and the LinkedIn
   profile read through the `/details/` pages.
6. The Reach map, the counting figures, the travelling rail, reading time.
7. The theme toggle rebuilt: the stuck tilt on phones fixed, the glyph
   replaced by SVG, and the theme change itself made into a sweep.
8. This file renamed from `CONTEXT.md`.

Everything else outstanding is in `TODO.md`.

## Working agreement

- Read this file first. Write back to it after each piece of work, not at the
  end of a session. He compacts the conversation often and on purpose, so
  anything held only in the chat is lost the moment he does. `CLAUDE.md` in
  this folder says the same thing and loads on its own at the start of a
  session; this is the copy that survives if that file is ever moved.
- **Anything he says in conversation that the next session would need gets
  written down**, not just acted on. Drafted text goes in verbatim, not
  described. The GitHub bio was nearly lost this way on 2026-10-27: it had
  been written for him in chat and nowhere else.
- Verify rather than assume. Check the live URL, the API, the rendered DOM —
  not the form that looks like it saved.
- Say plainly what failed or went unchecked.
- Ask before outward-facing actions, and before anything that publishes in his
  name.
