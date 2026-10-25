# Deployment

**The site is live at https://tash-fin.github.io**

Repository: https://github.com/tash-fin/tash-fin.github.io (public)
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
2. Add a property → **URL prefix** → `https://tash-fin.github.io`
3. Verify with the **HTML tag** method. It gives you a line like
   `<meta name="google-site-verification" content="...">`. Paste it into
   `index.html` just below the `<title>` line, then commit and push.
4. Click Verify in Search Console.
5. **Sitemaps** in the left menu → submit `sitemap.xml`
6. **URL Inspection** → enter the homepage → **Request indexing**

### 2. Add your work

The **Selected Work** section is hidden because `work: []` is empty in
`content.js`. The template is right above it. Campaign images go in
`assets/work/`.

### 3. A better address

`tash-fin.github.io` works, but it says nothing about you — which matters, because
the point of the SEO work is ranking for your own name. You already control
**homeinn.xyz**.

Moving to **tashfin.homeinn.xyz** would rank better and read far more
professionally on a business card. It needs:

- Your partners' agreement, since it is the company domain
- A DNS record at your domain host: `CNAME` for `tashfin` → `tash-fin.github.io`
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
