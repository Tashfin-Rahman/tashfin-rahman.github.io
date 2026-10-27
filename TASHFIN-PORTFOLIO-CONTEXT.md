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

#
## The rest of it

Three files hold the detail. **Open one only when the work touches it**;
reading all of them every session is what this split exists to avoid.

| File | Open it when |
|---|---|
| [notes/how-the-site-works.md](notes/how-the-site-works.md) | Changing the site's code: the render pipeline, the pages, the map, the CV. |
| [notes/traps.md](notes/traps.md) | Touching the browser pane, LinkedIn, GitHub, animation, screenshots, PDFs or the shell. Every entry there cost time to learn. |
| [notes/seo.md](notes/seo.md) | Working on search, answer engines, schema, the sitemap or Search Console. |

Beside them: `TODO.md` for what is outstanding, `DEPLOY.md` for the commands,
`LINKEDIN.md` for the LinkedIn text.

**None of these are published.** `_config.yml` excludes them, so they 404 on
the live site. Anything new of this kind goes in `notes/` or gets added to
that exclude list; do not leave project notes loose in the root.

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
- A 404 page in the site's own style at `404.html`, which GitHub Pages serves
  for any missing URL at any depth. It links to the home page, both written
  pieces and the CV, and is marked `noindex`. Its paths are absolute
  (`/styles.css`), not relative, because the one file answers `/typo` and
  `/writing/typo/` alike.
- Search Console verified; the homepage was indexed the day it went live.
- GitHub profile: README, website field, company, location, four social links.
  The portfolio repo now carries seven topics and a description with no
  em-dash in it. `For-Claude` and `Anti-Gravity` are private, so the portfolio
  is the first repo on his profile. All three were done through the API with
  the stored token (`repo` scope), not by hand.
  **The bio is still the old casual one and still needs him**: changing it
  takes `user` scope, which the token does not have. The replacement text is
  in `TODO.md`.
- LinkedIn: headline, About, three roles, seven skills, portfolio in contact
  info, clean URL `/in/tashfinrahman`.

**Selected Work is off the site again**

It was live for about an hour on 2026-10-27 with the Home Inn brand identity
piece. He asked for it to come off the same day: he wants to supply other
work first. Nothing was wrong with the piece itself.

It is parked whole in `drafts/work-brand-identity.js`. **Putting it back
takes two pastes, not one:** the `<section id="work">` markup was removed
from `index.html` as well, so the page source carries no empty "Selected
Work" heading. He checked the source and reasonably concluded the section was
still there. Both pastes are written out at the top of that drafts file, and
`renderWork()` now returns false instead of throwing if the array is filled
while the markup is still missing. Its three images are
still in `assets/work/`: the contact sheet of thirteen logo variants built
from the brand kit, the five-colour palette, and the front of the visiting
card.

**The back of the visiting card was never published, on purpose.** It carries
the factory address, a hotline and a second email that are not otherwise
public. Use the front only unless he says otherwise.

That decision was about which image a *page* used. The file itself was sitting
in `assets/work/`, which GitHub Pages serves, so it was fetchable at its own
URL the whole time. Nothing linked to it, but `robots.txt` welcomes image
crawlers and the address was one guess away. On 2026-10-27 it and the ten
other images in `assets/work/` that no published page referenced were moved to
`drafts/images/`, which `_config.yml` excludes from the build. Verified 404
afterwards. Nothing was deleted and `drafts/images/README.md` says what moved.

**The lesson, which is more general than this one file: deciding not to show
something on a page does not unpublish it.** Anything under `assets/` is
served to anyone who asks for the URL. Only `_config.yml` actually removes it.

The four older entries are in `drafts/work-entries.js` and are superseded.
What was wrong with them: three of the four described the firm's work rather
than his, and carried firm-wide figures instead of anything he did. Do not
put those back as they are.

**Visitor counting is wired but switched off.** `meta.analytics` in
`content.js` is null. Put a GoatCounter code there and the loader in `app.js`
and `article.js` adds the script on every page; leave it null and no
third-party script is requested at all. It never runs from `file://` or
localhost, so local testing does not pollute the numbers. GoatCounter sets no
cookies, so no consent banner is needed. He agreed to this on 2026-10-27 but
has not made the account yet.

**Outstanding, blocked on him**

The shorter LinkedIn About, which he approved. The text itself is in
`LINKEDIN.md`; it is not repeated here, because two copies drift.

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

9. The back of the visiting card unpublished, with ten other unreferenced
   images, and a 404 page added. His GitHub repo topics, description and the
   two scratch repos done through the API.

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
