# Publishing a blog post

Tashfin writes the posts himself. He said so on 2026-10-27 when asked, and the
option he turned down was having them drafted for him. **Do not draft a post
unless he asks.** Suggesting a topic is fine; writing the piece is not.

What he hands over is finished text. Everything below is the part he cannot do,
because it means hand-editing HTML, schema and three separate lists.

---

## Where things live

| | |
|---|---|
| Posts | `blog/<slug>/index.html`, one folder each |
| Index | `blog/index.html`, grouped by year |
| Behaviour | `article.js` gives reading time and the progress bar |
| The list | `content.js` → `writing:` array, newest first |

The array is still called `writing` inside `content.js` even though the section
is now called Blog. Renaming it would touch `app.js`, `blog/index.html` and the
array itself for no visible gain. Leave it.

## Adding a post: the checklist

Six places. Missing one of the last three does not break anything visibly,
which is exactly why they are written down.

1. **The page.** Copy an existing `blog/<slug>/index.html` and replace the
   content. Keep `../../styles.css`, `../../content.js` and `../../article.js`
   as they are; the depth is the same.
2. **The head.** `<title>`, description, `og:title`, `og:description`,
   `og:url`, `canonical`. All of the absolute URLs become
   `https://tashfin-rahman.github.io/blog/<slug>/`.
3. **The schema.** `BlogPosting` with a real `datePublished`, plus `FAQPage`
   if the piece answers questions. **Every question in the FAQ block must be
   answered in the page's own text.** Answer engines quote from the page, not
   from the schema, and the two disagreeing is worse than having no schema.
4. **`content.js`** → add to the top of the `writing` array:
   `{ title, date: "Mon YYYY", summary, url: "blog/<slug>/" }`.
5. **The two fallback lists**, which exist for crawlers that do not run
   JavaScript. Both are hand-written copies of the same data and both get
   cleared by script before rendering, so they must match `content.js`:
   - `index.html`, inside `<div id="blog-body">`
   - `blog/index.html`, inside `<div id="blog-index">`
6. **`sitemap.xml`**, **`llms.txt`** and **`feed.xml`**. The feed needs a new
   `<entry>` and its top-level `<updated>` moved forward. Atom wants real
   timestamps, so use `YYYY-MM-DDT00:00:00Z`.

Then commit, push, and check the live URL rather than the local file.

## The home page only shows three

`renderWriting()` in `app.js` caps the home page at the newest three and links
to `/blog/` for the rest. At one post a month the full list would otherwise
push Projects, Education and Contact a long way down within a year. The
constant is `HOME_MAX`.

## Old URLs

The posts lived at `/writing/<slug>/` for two days before the section was
renamed. Those paths still exist as stubs carrying a canonical tag and a meta
refresh to the new address. **Do not delete them.** GitHub Pages cannot send a
301, so a stub is the only redirect available, and the old URLs were live and
indexable.

Any post written from now on starts at `/blog/<slug>/` and needs no stub.

## Tags

Not built. He chose the plain index over tags, and tags across two or three
posts look like scaffolding with nothing on it. Worth revisiting at around ten
posts. The index groups by year, so adding a tag line per entry later is an
additive change to `blog/index.html` and one extra field in `content.js`.
