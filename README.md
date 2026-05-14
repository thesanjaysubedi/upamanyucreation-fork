# Upamanyu Creation

Website for Upamanyu Creation — a digital marketing agency offering AI-powered video ads, poster design, ad boost, ad campaigns, social media handling, and website development.

## Tech

Vanilla HTML / CSS / JS. No framework, no build step. Open any HTML file in a browser, or serve the folder with a static file server (e.g. VS Code Live Server, or run `node .dev-server.js` from the project root and visit http://localhost:8080/).

## Brand

- Colors: Teal `#2B6B6F` + Burnt Orange `#C85A3F`
- Default theme: dark (light toggle persists in localStorage under key `upamanyu-theme`)

## Pages

```
/
├── index.html        # Home — hero, services teaser, recent work, stats, testimonials, CTA
├── work.html         # Portfolio with category filter and lightbox
├── services.html     # 6 detailed service blocks (no pricing — WhatsApp for quote)
├── about.html        # Story, values, team
├── blog.html         # Blog index with 3 sample posts
├── blog/             # Blog post pages
│   ├── digital-marketing-tips.html
│   ├── ai-in-ads.html
│   └── brand-building.html
├── contact.html      # WhatsApp-first contact channels + message form
├── css/styles.css    # All styles — sections numbered 1-12
├── js/
│   ├── main.js       # Navbar, theme toggle, mobile menu
│   ├── animations.js # Scroll reveals, animated counters, parallax
│   └── work.js       # Work page filter + lightbox (only loaded on work.html)
└── assets/
    ├── logo.png
    ├── work/{videos,posters}/   # Drop real work files here
    └── blog/                    # Blog post images
```

## Adding a portfolio item

1. Drop the video or image into `assets/work/videos/` or `assets/work/posters/`.
2. Open `work.html`. Find the `<div class="work-grid">` section.
3. Copy any existing `.item` div and update:
   - Class: `video`, `poster`, or `campaign` (drives aspect ratio + filter category)
   - `data-type` — `"video"` for video files, `"image"` for everything else
   - `data-src` — full-resolution path that opens in the lightbox
   - `data-title` and `data-cat` — shown on hover and in the lightbox
   - The inner `<img src>` — thumbnail shown in the grid

## Adding a blog post

1. Copy any file in `blog/` (for example `brand-building.html`) and rename it.
2. Update the `<title>`, post-hero meta line, h1, and article body.
3. Open `blog.html` and add a matching `.blog-card` linking to the new file.

## Contact

WhatsApp: [+977 9744631713](https://wa.me/9779744631713)

## Design references

- Spec: [docs/superpowers/specs/2026-05-06-upamanyu-creation-redesign-design.md](docs/superpowers/specs/2026-05-06-upamanyu-creation-redesign-design.md)
- Implementation plan: [docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md](docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md)
