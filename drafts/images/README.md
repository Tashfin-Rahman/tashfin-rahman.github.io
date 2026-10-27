# Images kept out of the published site

Everything in this folder was sitting in `assets/work/`, which GitHub Pages
serves. Nothing published pointed at any of it. `_config.yml` excludes
`drafts`, so none of it is served from here.

Moved on 2026-10-27. Nothing is deleted; `git mv` kept the history.

## Why this mattered

**`home-inn-brand-visiting-card-back.jpg` was live and publicly fetchable.**
It shows the factory address, the hotline and `tashfin@homeinn.xyz`, none of
which is otherwise public, and the decision had already been taken not to
publish the back of the card. No page linked to it, so it was unlikely to be
found, but `robots.txt` welcomes image crawlers and the URL was one guess
away. It is not served any more.

The other ten are project photographs and superseded brand shots. They are
fine to publish; they just had no reason to be. They belong to the four old
Selected Work entries in `work-entries.js`, which are superseded.

## Putting one back

Copy it into `assets/work/` and point a `content.js` entry at
`assets/work/<name>.jpg`. The originals are also in
`C:\Users\User\OneDrive\Desktop\Business\HomeInn`.

## What stayed in assets/work/

| File | Why it stays |
|---|---|
| `home-inn-carved-wooden-wardrobe.jpg` | The share image for `/writing/fit-out-quote/`. Removing it breaks that page's Open Graph card. |
| `home-inn-logo-variants.jpg` | Used by the parked brand identity piece. |
| `home-inn-brand-palette.jpg` | Same. |
| `home-inn-visiting-card.jpg` | Same. The **front** of the card, which is the publishable side. |
