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

Checked live on 2026-10-27. Three things left, all of them his to do, because
the token has no `user` scope and `gh` is not on this machine's PATH.

**1. The bio is still the old one.** It reads "Just an ordinary BBA guy trying
to learn, grow, and hopefully make a meaningful change in the corporate
world." It sits directly above a README that calls him Partner and Chief
Business Officer, and it is the line GitHub shows beside his name in search.
Replace it at github.com/settings/profile with:

```
Partner & Chief Business Officer at Home Inn. Business finance, costing and marketing. Dhaka, Bangladesh.
```

**2. Two scratch repos are the first thing on his profile.** `For-Claude` and
`Anti-Gravity` sit above the portfolio, both with no description, and
`Anti-Gravity` is empty at 0 KB. Make them private under Settings, Danger
Zone, Change visibility. Describing them is not worth it; neither is work he
would show anyone.

**3. The portfolio repo has no topics.** `portfolio`, `business-finance`,
`dhaka`. Two minutes, helps a little inside GitHub's own search. Skip it if
time is short.

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

## Parked

- The agency. Marketing and IT. No name yet, so it stays off everything.
- A Bangla version of the site. Audience is "everyone", so English stays
  primary and this is a maybe.
- `tashfinrahman.com`, about twelve dollars a year, unregistered when checked.
- Analytics. There is currently no way to know whether anyone visits.
