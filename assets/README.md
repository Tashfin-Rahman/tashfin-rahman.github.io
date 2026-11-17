# assets

Drop files here and point `content.js` at them.

| File | Set in `content.js` | Notes |
|---|---|---|
| `tashfin-rahman.jpg` | `meta.heroBanner` — already set | The hero photo. Replace this file to change it; the name stays the same. |
| `cv.pdf` | `meta.cvFile` — already set | The CV. Printed from `cv/index.html`, so change the content there and re-print rather than editing the PDF. |
| `headshot.jpg` | `meta.headshot: "assets/headshot.jpg"` | Optional small circular photo. Square crop. Not in use; the hero is a banner. |
| `work/*.jpg` | `image:` on a work entry | Roughly 4:3 or square. |

**Only put something in `work/` that a published page points at.** This folder
is served to anyone, and `robots.txt` welcomes image crawlers. Eleven images
that nothing referenced were moved out on 2026-10-27, one of which should
never have been publishable at all.

They are not in the repository any more either. Moving them only stopped the
*site* serving them; the repository is public, so they were still downloadable
from GitHub directly until 2026-11-17, when they were taken out of version
control and put in `_private/images/`, which `.gitignore` excludes. The
reasoning is in `_private/images/WHERE-THESE-CAME-FROM.md`.

## How the hero photo is used

The shape changes with the screen, because one crop cannot serve both:

- **Phones.** Full-bleed block across the top, roughly square. A portrait photo
  crops well here.
- **Laptops and up.** A tall 300×404 panel beside the name, which keeps the
  photo's own proportions. The current photo shows about 89% of itself here.

This two-shape approach exists because the first attempt, one full-width strip
everywhere, showed only 23% of a portrait photo on desktop and cut through the
subject's forehead.

**Replacing it:** portrait or square photos work best. A wide landscape shot
letterboxes inside the desktop panel. Framing matters more than resolution: the
crop anchors near the top, 18 to 22%, so keep the head in the upper half.

**File size.** The current photo is 233 KB, which is fine. If a replacement
comes in over about 400 KB, put it through [squoosh.app](https://squoosh.app)
at quality 75 and a width of roughly 1200px first. It runs in the browser with
nothing to install.

If the file is ever missing or the path is wrong, the banner removes itself and
the hero falls back to the plain text layout. It does not leave a broken gap.
