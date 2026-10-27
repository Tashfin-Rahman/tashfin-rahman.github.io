# Traps already hit

*Open this before working with the browser pane, LinkedIn, GitHub, animation, screenshots, PDFs or the shell. Every entry cost time to learn. Part of [TASHFIN-PORTFOLIO-CONTEXT.md](../TASHFIN-PORTFOLIO-CONTEXT.md).*

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

### A 404 on the whole site usually means the repo went private

**The repository must stay public.** It is a user Pages site on a free
account, so Pages is unpublished the moment the repo becomes private, and
every URL returns GitHub's "There isn't a GitHub Pages site here" page.

This happened on 2026-10-27. Tashfin had been asked to make two scratch
repos, `For-Claude` and `Anti-Gravity`, private; `tashfin-rahman.github.io`
was made private instead. Both scratch repos were still public afterwards,
which is how it was spotted.

**How to tell the difference, before changing anything:**

- Load the site. "There isn't a GitHub Pages site here" means Pages is off or
  the repo is private. A build failure looks different: the old build keeps
  serving, or you get a plain 404 from a path that never existed.
- Load `https://github.com/Tashfin-Rahman?tab=repositories` signed out. If
  the repo is missing from the list, it is private. `git push` and
  `git ls-remote` keep working either way, so they prove nothing.

**A wrong diagnosis was reached first.** A `_config.yml` had been added a few
minutes earlier and was assumed to be the cause, so it was reverted before
the evidence was gathered. It was not the cause. Check what the 404 page
actually says before reverting anything.

Also from the same hour: unauthenticated `api.github.com` calls rate-limit
quickly, so build status cannot be checked that way, and `gh` is not
installed on this machine. Use the browser pane to read github.com instead.
A plain request to the site can also be served a stale 404 from the edge with
an `Age` header of several hundred seconds, so add a cache-busting query
string when polling.

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
