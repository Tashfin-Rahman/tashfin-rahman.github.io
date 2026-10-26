# Context

**Read this first, before doing anything in this project. Update it after
every piece of work, not just at the end of a session.**

This file is the memory for this project. It holds who the work is for, what
has been decided, how the pieces fit together, and the traps that have already
been hit. `TODO.md` holds what is still to do. `DEPLOY.md` holds the commands.

Tashfin asked on 2026-10-26 that context live here rather than being carried in
conversation, so that a session can be compacted at any point and the next one
picks up from this file with nothing lost. That means:

1. Read this file before starting.
2. Do the work.
3. Write what changed back into this file, and into `TODO.md` if the list of
   outstanding things moved.
4. Commit it with the work.

Anything learned the hard way belongs in **Traps already hit**. Anything
settled belongs in **Decisions already made**. Neither section should have to
be rediscovered.

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

- The site, dark by default, with About, Experience, Writing, Projects,
  Education, Skills, Leadership and Contact.
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

Everything else outstanding is in `TODO.md`.

## Working agreement

- Read this file first. Update it at the end of every session.
- Verify rather than assume. Check the live URL, the API, the rendered DOM —
  not the form that looks like it saved.
- Say plainly what failed or went unchecked.
- Ask before outward-facing actions, and before anything that publishes in his
  name.
