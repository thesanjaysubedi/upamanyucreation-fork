# Upamanyu Creation — Website Redesign Design Spec

**Date:** 2026-05-06
**Project:** Full website redesign for Upamanyu Creation (digital marketing agency)
**Status:** Approved — ready for implementation plan

---

## 1. Project Context

Upamanyu Creation is a digital marketing agency offering:

- AI-powered video ads
- Poster design
- Ad boost / paid promotion
- Ad campaign management
- Social media branding & handling
- Website development

The current site (single-page `index.html` + `styles.css` + `script.js`) is a basic generic-template implementation. The redesign aims to position the agency as a premium, portfolio-forward digital studio that earns client trust by *demonstrating* the quality of work the website itself displays.

**Brand assets already locked:**

- Logo: distinctive typographic blend of Latin "up" + Devanagari **अ** + Latin "manyu"
- Brand colors: Teal `#2B6B6F` + Burnt Orange `#C85A3F`
- Contact: WhatsApp `+977 9744631713`

---

## 2. Design Direction

**Premium Minimal + Portfolio-Forward.**

The logo's Devanagari/Latin fusion signals a thoughtful, crafted brand — not a loud neon agency. Backgrounds stay restrained so the agency's actual videos and posters become the visual heroes. The earthy teal + burnt orange palette pops cleanly against deep neutral backgrounds.

**Animation level:** Moderate — engaging without slowing pages down. Scroll-triggered reveals, animated counters, subtle hover tilts, parallax hero. No heavy GSAP cinematic sequences.

**Language:** English primary, with selective Devanagari accents (the **अ** glyph used decoratively as a section divider, hover marker, and bullet element — extending the logo's design language across the site).

**Theme:** Dark/Light toggle, **default dark** (cinematic gallery feel that flatters video and poster work). Persisted in `localStorage`.

---

## 3. Brand System

### Colors

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--bg` | `#0F1419` | `#FAF7F2` | Page background |
| `--bg-elevated` | `#181F26` | `#FFFFFF` | Cards, modals |
| `--text` | `#F2EFEA` | `#1A1F24` | Body text |
| `--text-muted` | `#8B9199` | `#6B7280` | Secondary text |
| `--teal` | `#2B6B6F` | `#2B6B6F` | Brand primary |
| `--teal-bright` | `#3D8E93` | `#1F4F52` | Accents, links |
| `--orange` | `#C85A3F` | `#C85A3F` | Brand secondary, CTAs |
| `--orange-bright` | `#E27355` | `#A8492F` | Hover states |
| `--border` | `#2A323B` | `#E5E0D7` | Dividers |

CSS variables drive theming; theme toggle swaps a single `[data-theme]` attribute on `<html>`.

### Typography

- **Headings:** Plus Jakarta Sans (600 / 700 / 800)
- **Body:** Inter (400 / 500)
- **Devanagari accents:** Noto Sans Devanagari (matches logo's **अ** weight)

Loaded via Google Fonts with `preconnect` + `display=swap`.

### Devanagari **अ** as design motif

- Section dividers (small **अ** between sections)
- Custom bullet marker on lists
- Decorative watermark on hero (large, low-opacity)
- Hover indicator on portfolio cards

---

## 4. Pages

Six pages total, each its own HTML file with a shared navbar/footer copy-pasted (no build step, vanilla approach).

### 4.1 Home (`index.html`)

1. **Navbar** (sticky, transparent → solid on scroll)
2. **Hero** — full-bleed video background (one of the agency's actual ad reels), overlay, headline with Devanagari accent, dual CTA (WhatsApp primary, "View Work" secondary)
3. **Service teaser** — 6 service cards, brief copy, icon, "Learn more" link to Services page
4. **Featured work** — 4-6 highlighted pieces (mix of videos + posters), "View All" CTA to Work page
5. **Stats strip** — animated counters: campaigns run, brands served, total reach, years experience
6. **Testimonials** — 2-3 client quotes (placeholder content acceptable initially)
7. **CTA band** — "Ready to grow your brand?" + WhatsApp button
8. **Footer**

### 4.2 Work (`work.html`)

- Page hero with title + filter buttons: **All / Videos / Posters / Campaigns**
- Masonry/grid layout with mix of real + AI-generated/stock items
- Each card: thumbnail, hover overlay with title + category, click opens lightbox
- Lightbox: video plays inline, posters open at full size, basic prev/next navigation
- Footer

### 4.3 Services (`services.html`)

Six service blocks, each with:

- Icon
- Service name (English) + small Devanagari accent
- Description (2-3 sentences)
- "What's included" bulleted list (3-5 items)
- "Get Quote on WhatsApp" CTA button
- **No pricing displayed.**

Layout alternates left/right between blocks for visual rhythm.

### 4.4 About (`about.html`)

- Brand story (2-3 paragraphs)
- Mission / values (3 pillars)
- Team section (placeholder photos + names + roles — replaceable)
- "Why Upamanyu" — differentiators (AI capability, local insight, full-funnel service)
- CTA to Contact

### 4.5 Blog (`blog.html` + 3 post files)

- Index page: 3 post cards (image, title, excerpt, read-time, date)
- Individual post pages under `/blog/`:
  - `digital-marketing-tips.html`
  - `ai-in-ads.html`
  - `brand-building.html`
- Posts contain dummy lorem-style content with proper structure (h1, h2, paragraphs, blockquote, image) — easy template for the agency to replace with real content later.

### 4.6 Contact (`contact.html`)

- **WhatsApp first:** large prominent "Chat on WhatsApp" button → `https://wa.me/9779744631713`
- Secondary: email + phone displayed
- Tertiary: simple message form (name, email, message) — form action left as `mailto:` placeholder for now (EmailJS integration deferred per user)
- Map embed (optional, placeholder)
- Office hours

---

## 5. Shared Components

### Navbar

- Logo (left)
- Nav links: Home / Work / Services / About / Blog / Contact
- Theme toggle (sun/moon icon)
- WhatsApp icon button (right)
- Mobile: hamburger → fullscreen overlay menu

### Footer

- Logo + tagline
- Quick links column
- Services column
- Contact column (WhatsApp, email, phone)
- Social icons row (Instagram, Facebook, LinkedIn, YouTube — placeholder URLs)
- Copyright + small Devanagari accent

### Floating WhatsApp button

- Fixed bottom-right on every page
- Pulse animation on idle
- Tooltip on hover: "Chat with us"
- Links to `wa.me/9779744631713`

---

## 6. Animations & Interactions

| Animation | Implementation | Where |
|-----------|----------------|-------|
| Scroll fade/slide-in | Intersection Observer + CSS classes | All pages, every section |
| Animated counters | Number tween on scroll-into-view | Home stats strip |
| Parallax hero | CSS `transform` on scroll | Home, page heroes |
| Card hover tilt | CSS `transform: rotateX/Y` | Work cards, service cards |
| Theme toggle | CSS variable swap on `[data-theme]` | All pages |
| Mobile menu | Slide-in overlay, hamburger morph | All pages |
| WhatsApp pulse | CSS keyframe animation | Floating button |
| Lightbox | Vanilla JS modal, fade transition | Work page |
| Smooth scroll | `scroll-behavior: smooth` + JS for offset | All pages |

No GSAP. Pure CSS + Intersection Observer keeps the bundle light and dependency-free.

---

## 7. File Structure

```
upamanyu/
├── index.html
├── work.html
├── services.html
├── about.html
├── blog.html
├── contact.html
├── blog/
│   ├── digital-marketing-tips.html
│   ├── ai-in-ads.html
│   └── brand-building.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js          # navbar, theme toggle, mobile menu, WhatsApp
│   ├── animations.js    # scroll reveals, counters, parallax
│   └── work.js          # filter + lightbox (work page only)
├── assets/
│   ├── logo.png
│   ├── work/
│   │   ├── videos/
│   │   └── posters/
│   └── blog/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-05-06-upamanyu-creation-redesign-design.md
└── README.md
```

The existing `index.html`, `styles.css`, `script.js` at the root will be replaced/restructured. `logo.png` is preserved.

---

## 8. Tech Stack & Constraints

- **Vanilla HTML / CSS / JS only.** No framework, no build step.
- **CSS variables** drive theming.
- **Google Fonts** via CDN (Plus Jakarta Sans, Inter, Noto Sans Devanagari).
- **No backend.** All forms are placeholders or `mailto:`.
- **No external animation library.** Pure CSS + Intersection Observer.
- **Browser support:** modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). No IE11.
- **Mobile-first responsive** with breakpoints at 640px, 768px, 1024px, 1280px.
- **Accessibility:** semantic HTML, alt text on images, focus rings on interactive elements, sufficient color contrast in both themes, prefers-reduced-motion support.

---

## 9. Out of Scope

The following are explicitly **excluded** from this redesign:

- EmailJS / form backend integration (deferred — placeholder `mailto:` for now)
- Pricing display anywhere on the site
- Multi-language toggle (English is primary; Devanagari is decorative)
- Full blog CMS / markdown pipeline (skeleton with 3 hardcoded posts only)
- E-commerce / payment
- User accounts / auth
- Analytics / tracking pixels (can be added later)
- SEO meta-optimization beyond basic `<meta>` tags

---

## 10. Success Criteria

The redesign is successful when:

1. All 6 pages + 3 blog posts render correctly in dark and light mode on Chrome, Firefox, Safari, Edge (desktop + mobile).
2. WhatsApp CTA on every page links to `+977 9744631713` and opens WhatsApp on mobile / web on desktop.
3. Theme toggle persists across navigation (localStorage).
4. Page weight stays under 1 MB initial load (excluding showcase videos).
5. Lighthouse scores: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 90 on the home page.
6. Site visually matches the brand: teal + orange + Devanagari accents are present and tasteful, never gaudy.
7. No console errors on any page.
