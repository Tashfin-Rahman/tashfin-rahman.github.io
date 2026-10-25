# assets

Drop files here and point `content.js` at them.

| File | Set in `content.js` | Notes |
|---|---|---|
| `banner.jpg` | `meta.heroBanner` — already set | Your photo. Replace this file to change it; the name stays the same. |
| `cv.pdf` | `meta.cvFile` — already set | Your CV. Replace the file; nothing else to change. |
| `headshot.jpg` | `meta.headshot: "assets/headshot.jpg"` | Optional small circular photo. Square crop. |
| `work/*.jpg` | `image:` on a work entry | Campaign images. Roughly 4:3 or square. |

## How the banner photo is used

The shape changes with the screen, because one crop can't serve both:

- **Phones** — full-bleed block across the top, roughly square. A portrait photo
  crops well here.
- **Laptops and up** — a tall 300×404 panel beside your name, which keeps the
  photo's own proportions. Your current photo shows about 89% of itself here.

This two-shape approach exists because the first attempt — one full-width strip
everywhere — showed only 23% of a portrait photo on desktop and cut through the
subject's forehead.

**Replacing it:** portrait or square photos work best. A wide landscape shot
will letterbox inside the desktop panel. Framing matters more than resolution:
the crop anchors near the top (18–22%), so keep your head in the upper half.

**File size:** the current `banner.jpg` is **741 KB**, which is heavy for a
phone on mobile data. Around 200–300 KB would be better with no visible
difference. Drop it into [squoosh.app](https://squoosh.app), set quality to
about 75 and resize the width to ~1200px — it runs in the browser, nothing to
install. Save over `assets/banner.jpg` and you're done.

If the file is ever missing or the path is wrong, the banner removes itself and
the hero falls back to the plain text layout — it won't leave a broken gap.
