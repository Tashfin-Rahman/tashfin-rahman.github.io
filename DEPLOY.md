# How to put this site online

Everything is built and committed. This file is the complete set of steps for
getting it live — written so you can follow it later, on your own, without
needing the conversation it came from.

**You must be sitting at the Windows PC** where this folder lives
(`E:\Claude code\portfolio`). None of this works from a phone or another
computer.

---

## Step 1 — Create the repository (2 minutes, in a browser)

1. Sign in to GitHub as **Ig-ga**.
2. Go to **https://github.com/new**
3. Fill it in exactly:
   - **Repository name:** `Ig-ga.github.io`
     (it must match your username — this is what makes GitHub Pages serve it
     automatically at `ig-ga.github.io`)
   - **Public** — Pages will not serve a private repo on a free account
   - **Do not tick** "Add a README", ".gitignore", or "Choose a license".
     The repo must be completely empty or the push will be rejected.
4. Click **Create repository**.

**Check it worked:** open `https://github.com/Ig-ga/Ig-ga.github.io`. You should
see a page of setup instructions, not a 404. If you get a 404, the repo was not
created — try again rather than continuing.

---

## Step 2 — Push the site (1 command)

Open PowerShell and run:

```
cd "E:\Claude code\portfolio"
git push -u origin main
```

A **Git Credential Manager** window will pop up asking you to sign in to
GitHub. That is expected and it is a normal GitHub sign-in window. Approve it.

This uploads all the commits. It takes a few seconds.

---

## Step 3 — Wait, then check

GitHub Pages takes one to three minutes to build the first time.

Then open: **https://ig-ga.github.io**

You should see your site — dark background, your photo, your name in gold.

If you get a 404 after five minutes, go to the repo → **Settings** → **Pages**
and confirm the source is set to branch `main`, folder `/ (root)`.

---

## Step 4 — Tell Google it exists (optional but worth it)

Google will find the site eventually. This makes it days rather than weeks.

1. Go to **https://search.google.com/search-console**
2. Add a property → **URL prefix** → `https://ig-ga.github.io`
3. Verify ownership using the **HTML tag** method: it gives you a line like
   `<meta name="google-site-verification" content="...">`. Paste that line into
   `index.html`, just below the `<title>` line, then push again:
   ```
   git add -A
   git commit -m "Add Search Console verification"
   git push
   ```
4. Back in Search Console, click Verify.
5. Go to **Sitemaps** in the left menu and submit: `sitemap.xml`
6. Go to **URL Inspection**, enter your homepage URL, and click
   **Request indexing**.

---

## A better address, when you are ready

`ig-ga.github.io` works, but it is a weak address for ranking on your own name
— it says nothing about you. You already control **homeinn.xyz**.

Putting this site at **`tashfin.homeinn.xyz`** would rank considerably better
and read far more professionally on a business card. It needs:

- Your partners' agreement, since it is the company domain
- One DNS record at your domain host: a `CNAME` for `tashfin` pointing to
  `ig-ga.github.io`
- A file named `CNAME` in this folder containing `tashfin.homeinn.xyz`
- In the repo: Settings → Pages → Custom domain → `tashfin.homeinn.xyz`

Then update `meta.siteUrl` in `content.js` to the new address, and change the
URLs in `robots.txt`, `sitemap.xml` and the `<link rel="canonical">` and
`og:` tags in `index.html` to match.

---

## If the push is rejected

**"Repository not found"** — the repo was not actually created, or it is under
a different account. Redo Step 1.

**"Updates were rejected"** — the repo was created with a README. Either delete
the repo and redo Step 1 with nothing ticked, or run:
```
git pull --rebase origin main
git push -u origin main
```
