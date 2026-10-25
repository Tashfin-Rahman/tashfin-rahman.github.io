# assets

Drop files here and point `content.js` at them.

| File | Set in `content.js` | Notes |
|---|---|---|
| `banner.jpg` | `meta.heroBanner: "assets/banner.jpg"` | **Landscape**, 2000px wide or more. Spans the full width of the page. |
| `cv.pdf` | `meta.cvFile` — already set | Your CV. Replace this file whenever you update it; the filename stays the same so nothing else needs changing. |
| `headshot.jpg` | `meta.headshot: "assets/headshot.jpg"` | Optional small circular photo. Square crop, ~400×400px. |
| `work/*.jpg` | `image:` on a work entry | Campaign images. Roughly 4:3 or square. |

## What makes a good banner photo

The banner is cropped to a wide strip and your name sits just below it, so:

- **Landscape, not portrait.** A vertical phone photo gets cropped to its middle
  and you'll likely lose your head.
- **At least 2000px wide**, or it'll look soft on a laptop screen.
- **Keep yourself off-centre, or leave empty space on one side.** The image is
  anchored 30% from the top, so faces near the top survive the crop best.
- **Darker images work better** than bright ones — the page fades the bottom of
  the photo into the background, and that blend is cleaner on a darker image.
- **Under about 400KB.** Any larger and the page gets slow on mobile data.
  Squoosh.app will compress it in a browser without installing anything.

If a path is wrong or the file is missing, the banner removes itself and the
hero falls back to the plain text layout — it won't leave a broken gap.
