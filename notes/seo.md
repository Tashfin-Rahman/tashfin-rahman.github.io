# SEO and AEO

*Open this when working on search, answer engines, schema, the sitemap or Search Console. Part of [TASHFIN-PORTFOLIO-CONTEXT.md](../TASHFIN-PORTFOLIO-CONTEXT.md).*

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
