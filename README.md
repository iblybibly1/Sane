# RonyaSane Website

Modern equestrian website for RonyaSane — Inkoo, Finland.

## How to Add Photos

### Main Page Slideshow (`photos/slideshow/`)
- Files: `slide1.jpg`, `slide2.jpg`, `slide3.jpg`, etc.
- Format: **JPG, 1920×1080px**
- To add a new slide: upload file here, then add a line in `index.html`:
  ```html
  <div class="hero-slide" style="background-image: url('photos/slideshow/slide4.jpg')"></div>
  ```

### Horse Galleries
| Folder | File | Format |
|--------|------|--------|
| `photos/[horse]/` | `[horse]-hero.jpg` | JPG, 1920×800px — page banner |
| `photos/[horse]/` | `[horse]-1.jpg`, `[horse]-2.jpg`, `[horse]-3.jpg` | JPG, 1200×800px — gallery slides |
| `photos/[horse]/` | `[horse]-story.jpg` | JPG, 800×600px — story section |
| `photos/[horse]/` | `[horse]-main.jpg` | JPG, 800×600px — homepage card |

To add a gallery photo, upload the file then add in the horse's HTML file:
```html
<div class="gallery-slide"><img src="../photos/takku/takku-4.jpg" alt="Takku"></div>
```

### About Photo (`photos/about/`)
- File: `ronya.jpg` — **JPG, 800×1000px** (portrait orientation)

### Photography Shop (`photos/photography/`)
- Files: `photo-1.jpg`, `photo-2.jpg`, etc. — **JPG, 1200×800px**
- Watermark overlay is added by CSS — keep your originals as backup
- To add a new for-sale photo, copy this block into `photography.html`:
  ```html
  <div class="photo-item" data-title="Your Title Here" data-price="25">
    <img src="photos/photography/photo-7.jpg" alt="Your Title Here">
    <div class="photo-watermark"><span class="photo-watermark-text">© RonyaSane</span></div>
    <div class="photo-overlay">
      <div class="photo-title">Your Title Here</div>
      <div class="photo-price">€25.00</div>
      <button class="add-to-basket">Add to Basket</button>
    </div>
  </div>
  ```

## How to Edit Text Content

- **Achievements ticker** (scrolling bar on homepage): edit `index.html`, find `ticker-item` spans
- **Horse story / achievements**: edit the relevant `horses/[name].html` file
- **Services & pricing**: edit `services.html`
- **About text**: edit `about.html`
- **Contact details**: search for `ronya@sane.fi` or `050 350 4398` across HTML files

## File Structure

```
/
├── index.html              ← Main homepage with hero slideshow
├── services.html           ← Services & pricing (Palvelut ja hinnasto)
├── about.html              ← About Ronya (Vähän minusta)
├── photography.html        ← Photo shop with basket
├── horses/
│   ├── takku.html          ← Takku's page
│   ├── beso.html           ← Beso's page
│   ├── elvis.html          ← Elvis's page
│   └── vikke.html          ← Vikke's page
├── css/style.css           ← All styling (blue & white theme)
├── js/main.js              ← Slideshow, gallery, basket logic
└── photos/
    ├── slideshow/          ← Homepage hero slides  (1920×1080 JPG)
    ├── takku/              ← Takku's photos
    ├── beso/               ← Beso's photos
    ├── elvis/              ← Elvis's photos
    ├── vikke/              ← Vikke's photos
    ├── about/              ← Portrait of Ronya     (800×1000 JPG)
    └── photography/        ← For-sale photos       (1200×800 JPG)
```
