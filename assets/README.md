# assets

Drop files here and point `content.js` at them.

| File | Set in `content.js` | Notes |
|---|---|---|
| `headshot.jpg` | `meta.headshot: "assets/headshot.jpg"` | Square crop, ~400×400px. Optional — the layout works without one. |
| `cv.pdf` | `meta.cvFile: "assets/cv.pdf"` | Adds a "Download CV" button. Leave `null` and no button appears. |

You can also keep project screenshots or chart exports here.

Note: you don't strictly need a separate `cv.pdf` — pressing `Ctrl+P` on the site
produces a clean one-page CV from the same content. The PDF is only worth adding
if you want a specific formatted version to attach to applications.
