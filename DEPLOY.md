# Deployment

**The site is live at https://tashfin-rahman.github.io**

Repository: https://github.com/Tashfin-Rahman/tashfin-rahman.github.io (public)
GitHub Pages serves it automatically from the `main` branch, root folder.
There is no build step and no settings to maintain.

---

## Updating the live site

Make your change in `content.js`, then from `E:\Claude code\portfolio`:

```
git add -A
git commit -m "Describe what changed"
git push
```

The live site updates about a minute later. That's the whole process.

---

## Still worth doing

### 1. Tell Google it exists

Google will find the site on its own, but this turns weeks into days. It needs
your GitHub login, so it has to be you.

1. Go to **https://search.google.com/search-console**
2. Add a property → **URL prefix** → `https://tashfin-rahman.github.io`
3. Verify with the **HTML tag** method. It gives you a line like
   `<meta name="google-site-verification" content="...">`. Paste it into
   `index.html` just below the `<title>` line, then commit and push.
4. Click Verify in Search Console.
5. **Sitemaps** in the left menu → submit `sitemap.xml`
6. **URL Inspection** → enter the homepage → **Request indexing**

### 2. Regenerating the CV

`assets/cv.pdf` is printed from `cv/index.html`, a one-page A4 layout that
reads the same `content.js` as the site, so the CV and the site can never
disagree about titles or dates.

It uses shorter wording than the site. Those lines live in `content.js` too:
`cvProfile` under `meta`, `cvBullets` on each job, and `cvLine` on the project
and the leadership entry. Anything without one falls back to the site's text.

After changing anything, regenerate it:

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="E:\Claude code\portfolio\assets\cv.pdf" --virtual-time-budget=15000 "file:///E:/Claude%20code/portfolio/cv/index.html"
```

Then commit and push as usual. Check it is still one page: if a change pushes
it onto a second, shorten a `cvBullets` line rather than shrinking the type.

### 3. Strengthen the work entries

**Selected Work** now holds four pieces. The Home Inn brand identity leads it,
since that is your own design work; the other three — architectural design,
custom furniture and duplex construction — come from the company profile deck.

Two things would make them much stronger, and only you can supply them:

- **Your specific contribution.** Each card's *What I made* line currently says
  what is verifiable from your CV — that you run the budgeting, cost tracking
  and project costing. Replace it with what you actually did on that work.
- **A number.** *Outcome* currently carries firm-wide figures. One real result
  on one project — a budget held, a cost cut, an order won — is worth more than
  all three cards as they stand.

To add a fourth piece, copy an existing entry in the `work` array of
`content.js`. An entry's `image` takes one path or a list, and each item may be
`{ src, alt }` — always write the alt text, it is what puts the photo in image
search. Put new images in `assets/work/`, and add them to `sitemap.xml`
alongside the others. Ask Claude to resize anything over 800px wide.

### 4. A better address

`tashfin-rahman.github.io` works, but it says nothing about you — which matters, because
the point of the SEO work is ranking for your own name. You already control
**homeinn.xyz**.

Moving to **tashfin.homeinn.xyz** would rank better and read far more
professionally on a business card. It needs:

- Your partners' agreement, since it is the company domain
- A DNS record at your domain host: `CNAME` for `tashfin` → `tashfin-rahman.github.io`
- A file named `CNAME` in this folder containing `tashfin.homeinn.xyz`
- Repo → Settings → Pages → Custom domain → `tashfin.homeinn.xyz`

Then update `meta.siteUrl` in `content.js`, and the URLs in `robots.txt`,
`sitemap.xml`, and the `canonical` and `og:` tags in `index.html`.

---

## What is already set up for search

- `sitemap.xml` listing the page and the photo
- `robots.txt` allowing search and answer engines, pointing at the sitemap
- A `ProfilePage` + `Person` schema identifying you, your role, Home Inn,
  your location and your LinkedIn
- The photo registered as an `ImageObject` with real alt text, a descriptive
  filename and `max-image-preview:large`, so it can appear in image search
- The photo resized to 1200px wide and compressed to 233 KB, so it loads fast
  on mobile data without visible quality loss
- `llms.txt` describing you factually for AI answer engines
- Open Graph and Twitter card tags for link previews
