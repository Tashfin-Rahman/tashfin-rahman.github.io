# Backlog

Things raised but not yet done. Newest concerns first.

## Next steps for Tashfin (as of 2026-10-27)

Settled: title is Partner & Chief Business Officer, the CV shows only
"Dhaka, Bangladesh", and the CV is one modern page.

1. **List what is out of date about you.** You said yes, some details have
   changed, but not which. One message, roughly written, is enough.
2. **Approve the shorter LinkedIn About**, then sign into LinkedIn and GitHub
   in the app's browser pane so the change can be saved.
3. **Connect the tools** with `/mcp`: Trackian (analytics), SEO-AEO-GEO
   Ultimate (SEO and AEO), Design (wording and accessibility).
4. **Give the Work section content**: for each project you were personally
   part of, what it was, your part, and one outcome.
5. **Pick the next writing topic** and one real example for it.

## GitHub

**One thing left, and it needs him.** The other two were done through the API
on 2026-10-27 with the stored token.

**The bio is still the old one.** It reads "Just an ordinary BBA guy trying to
learn, grow, and hopefully make a meaningful change in the corporate world."
It sits directly above a README that calls him Partner and Chief Business
Officer, and it is the line GitHub shows beside his name in search. This
cannot be done for him: changing a profile bio needs `user` scope and the
stored token has `gist, repo, workflow`. Go to
github.com/settings/profile and replace it with:

```
Partner & Chief Business Officer at Home Inn. Business finance, costing and marketing. Dhaka, Bangladesh.
```

**Done, 2026-10-27.** `For-Claude` and `Anti-Gravity` are private, so the
portfolio is now the first repo on his profile. The portfolio repo has seven
topics (`portfolio`, `cv`, `personal-website`, `business-finance`, `dhaka`,
`bangladesh`, `github-pages`), and its description lost the em-dash it had in
it. The repo itself is still public and Pages is still on; both were checked
straight afterwards, because making that repo private is what took the site
down once already.

The rest of the profile is correct: website field, company, location, and all
four social links showing their proper brand icons.

## The map

The company profile names twelve districts by project. The firm's own figure
is thirteen. **Which is the thirteenth?** One line in `content.js` adds it to
the map. Until then the note under the map explains the gap.

## Analytics

He agreed on 2026-10-27. The wiring is done and waiting on one value.

1. Make a free account at **goatcounter.com**, pick a code, e.g. `tashfin`.
2. Put that code in `content.js` under `meta.analytics`.
3. That is all. Home page and every written piece start reporting.

Until then nobody knows whether anyone visits, which means every SEO decision
is being made blind.

## Selected Work

**He is going to send other work.** That is what the section is waiting on,
as of 2026-10-27. For each piece: what the job was, what his part in it was,
and one outcome. A real number if he has one; if not, the method.

The brand identity piece is ready to drop back in whenever he wants it, from
`drafts/work-brand-identity.js`.

### Older notes

Taken off the site and the CV on 2026-10-26, to be rebuilt. The four entries
are parked in `drafts/work-entries.js` and the images are still in
`assets/work/`. Nothing is lost.

What was wrong with it: the three Home Inn pieces described the firm's work
rather than his, and carried firm-wide figures instead of anything he did. The
brand identity piece was the only one clearly his.

Still open from before: one real number from one job. A budget held, a cost
cut, an order won.

### Four questions left over from the fit-out piece

These were marked `[NEED]` in the draft and the article was published without
them, generalised instead. Any one of them would sharpen a future piece, and
none needs a client's permission:

1. Roughly what proportion of sheet material ends up as offcut on a typical
   job?
2. Is there a standard contingency percentage, or is it judged per job?
3. A real site surprise he has hit. A wall out of square, a floor that slopes,
   a beam nobody mentioned. What did it cost to solve?
4. How long does Home Inn hold a quote for before the price moves?

## LinkedIn

**The About section is too long.** Five paragraphs. It should be shorter.

**Connections.** 17, with 18 followers. The profile is in good shape and almost
nobody can see it. Nothing technical can fix this.

**Still missing:** nothing structural. Headline, About, three roles and seven
skills are all in place.

## SEO and AEO

Done so far: sitemap, robots, canonical, Person and ProfilePage schema,
BlogPosting schema on the article, disambiguation in both the schema and
llms.txt, IndexNow submissions, Search Console verified, four identity links.

Done since: `FAQPage` schema on both articles, with every question answered
in the page's own text, which is what answer engines quote from. A plain HTML
link to each piece in `index.html`, so a crawler that does not run JavaScript
still follows it. And a second piece, "Keeping the books for a shop and for a
project business", written from his own bookkeeping work with no invented
figures.

Worth doing next:
- A real inbound link. LinkedIn and GitHub both point at the site now; a third
  from somewhere with its own audience would be worth more than both. This is
  the biggest remaining lever and nothing technical substitutes for it. It
  needs him: posting a piece somewhere that has its own readers.
- More writing, once he picks a topic. Two pieces are live and both argue from
  method. A third with one real example in it would be worth more than a
  fourth without.

## Rewriting across the three places

He wants another pass over the wording on the site, GitHub and LinkedIn. The
voice is settled now: plain, first person, short sentences, no aphorisms, no
em-dashes doing a full stop's work.

The site is done. The last two em-dashes in public prose were in the contact
line and are gone, and the meta description no longer advertises a Selected
Work section that is off the page. What is left is GitHub and LinkedIn, and
both need the browser pane signed in.

## Done and not worth re-raising

- **A 404 page**, 2026-10-27. GitHub's generic one is gone; a missing URL now
  gets the site's own page with links to the home page, both pieces and the
  CV. Verified at `/typo` and at `/writing/typo/`.
- **Eleven images unpublished**, 2026-10-27. Everything in `assets/work/` that
  no published page referenced, including the back of the visiting card, which
  was fetchable at its own URL. Moved to `drafts/images/`, which the build
  excludes. See `drafts/images/README.md`.
- **`drafts/what-youre-paying-for.md` deleted**, 2026-10-27. It was the draft
  of the fit-out article, which has been live for two days. Its four open
  questions are under Selected Work above so they are not lost with it.

## Parked

- The agency. Marketing and IT. No name yet, so it stays off everything.
- A Bangla version of the site. Audience is "everyone", so English stays
  primary and this is a maybe.
- `tashfinrahman.com`, about twelve dollars a year, unregistered when checked.
- Analytics. There is currently no way to know whether anyone visits.
