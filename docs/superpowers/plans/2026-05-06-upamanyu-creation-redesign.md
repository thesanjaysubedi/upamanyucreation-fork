# Upamanyu Creation Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Upamanyu Creation agency website as a premium, portfolio-forward, multi-page vanilla-HTML site with dark/light theme, Devanagari design accents, and WhatsApp-first lead capture.

**Architecture:** Six static HTML pages (Home, Work, Services, About, Blog, Contact) + 3 blog post pages, sharing a copy-pasted navbar/footer markup. Single `styles.css` with CSS variables driving dark/light themes. Three JS modules: `main.js` (navbar, theme toggle, mobile menu, WhatsApp), `animations.js` (IntersectionObserver reveals, counters, parallax), `work.js` (filter + lightbox, work page only). No build step, no framework.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (ES2020), Google Fonts (Plus Jakarta Sans, Inter, Noto Sans Devanagari).

**Verification approach:** This is a static site project — there is no test runner. Each task ends with **manual browser verification** steps (what to open, what to look for) and an optional commit. The user can run `git init` once at the start of Task 1 to enable commits; if skipped, treat the commit steps as no-ops.

---

## Pre-flight

- Working directory: `c:/Users/acer/OneDrive/Desktop/upmanyu/upamanyu`
- Existing files at root that will be replaced: `index.html`, `styles.css`, `script.js`. **Keep:** `logo.png`, `README.md`, `.vscode/`.
- Spec: [docs/superpowers/specs/2026-05-06-upamanyu-creation-redesign-design.md](../specs/2026-05-06-upamanyu-creation-redesign-design.md)
- WhatsApp number: `+977 9744631713` → URL: `https://wa.me/9779744631713`

---

## Task 1: Project setup, directory structure, foundation CSS

**Files:**
- Create: `css/styles.css`
- Create: `js/main.js`, `js/animations.js`, `js/work.js`
- Create: `assets/work/videos/.gitkeep`, `assets/work/posters/.gitkeep`, `assets/blog/.gitkeep`
- Move: `logo.png` → `assets/logo.png`

- [ ] **Step 1: (Optional) Initialize git for version control**

Run from project root:

```powershell
git init
git add -A
git commit -m "chore: snapshot existing site before redesign"
```

If you do not want git, skip — all later "commit" steps become no-ops.

- [ ] **Step 2: Create the new directory structure**

Run from project root:

```powershell
New-Item -ItemType Directory -Force -Path css, js, assets/work/videos, assets/work/posters, assets/blog, blog | Out-Null
Move-Item -Force logo.png assets/logo.png
```

- [ ] **Step 3: Create the foundation `css/styles.css` with reset, variables, typography**

Create `css/styles.css` with the following content:

```css
/* =========================================================
   Upamanyu Creation — Global Stylesheet
   Sections:
     1. Reset & base
     2. Theme variables (dark / light)
     3. Typography
     4. Layout primitives (.container, .section)
     5. Buttons & links
     6. Navbar
     7. Footer
     8. Floating WhatsApp
     9. Devanagari motif utilities
    10. Animations / scroll reveals
    11. Page-specific (home / work / services / about / blog / contact)
    12. Responsive breakpoints
   ========================================================= */

/* 1. Reset & base ----------------------------------------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
}
img, video { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: 0; background: transparent; color: inherit; }
ul, ol { list-style: none; }

/* 2. Theme variables -------------------------------------- */
:root,
[data-theme="dark"] {
  --bg: #0F1419;
  --bg-elevated: #181F26;
  --bg-card: #1F272F;
  --text: #F2EFEA;
  --text-muted: #8B9199;
  --teal: #2B6B6F;
  --teal-bright: #3D8E93;
  --orange: #C85A3F;
  --orange-bright: #E27355;
  --border: #2A323B;
  --shadow: 0 10px 30px rgba(0,0,0,0.4);
  --overlay: rgba(15,20,25,0.7);
}
[data-theme="light"] {
  --bg: #FAF7F2;
  --bg-elevated: #FFFFFF;
  --bg-card: #FFFFFF;
  --text: #1A1F24;
  --text-muted: #6B7280;
  --teal: #2B6B6F;
  --teal-bright: #1F4F52;
  --orange: #C85A3F;
  --orange-bright: #A8492F;
  --border: #E5E0D7;
  --shadow: 0 10px 30px rgba(0,0,0,0.08);
  --overlay: rgba(255,255,255,0.85);
}

/* 3. Typography ------------------------------------------- */
h1, h2, h3, h4 {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
h1 { font-size: clamp(2.25rem, 5vw, 4rem); }
h2 { font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.125rem; }
.devanagari { font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif; }
.text-muted { color: var(--text-muted); }
.text-teal { color: var(--teal-bright); }
.text-orange { color: var(--orange); }

/* 4. Layout primitives ------------------------------------ */
.container { width: min(1200px, 92%); margin: 0 auto; }
.section { padding: clamp(4rem, 8vw, 7rem) 0; }
.section-title {
  text-align: center;
  margin-bottom: 3rem;
}
.section-title .devanagari {
  display: block;
  color: var(--orange);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* 5. Buttons --------------------------------------------- */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn-primary { background: var(--orange); color: #fff; }
.btn-primary:hover { background: var(--orange-bright); transform: translateY(-2px); }
.btn-secondary {
  background: transparent; color: var(--text);
  border: 1px solid var(--border);
}
.btn-secondary:hover { border-color: var(--teal-bright); color: var(--teal-bright); }
.btn-whatsapp { background: #25D366; color: #fff; }
.btn-whatsapp:hover { background: #1EB855; transform: translateY(-2px); }
```

(More CSS sections will be appended in later tasks. This file will grow.)

- [ ] **Step 4: Create empty JS shells**

Create `js/main.js`:

```js
// main.js — navbar, theme toggle, mobile menu, WhatsApp logic
// Populated in later tasks
console.log('Upamanyu main.js loaded');
```

Create `js/animations.js`:

```js
// animations.js — scroll reveals, animated counters, parallax
// Populated in later tasks
```

Create `js/work.js`:

```js
// work.js — work page filter and lightbox (loaded only on work.html)
```

- [ ] **Step 5: Manual verification**

In a file explorer, confirm the folder tree:

```
upamanyu/
  assets/
    logo.png
    blog/
    work/
      videos/
      posters/
  css/styles.css
  js/main.js
  js/animations.js
  js/work.js
  blog/
  index.html  (old, will be replaced)
  styles.css  (old, will be deleted)
  script.js   (old, will be deleted)
  README.md
```

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: scaffold new directory structure and foundation CSS"
```

---

## Task 2: Theme system (toggle + persistence)

**Files:**
- Modify: `css/styles.css` (append section "Theme toggle button")
- Modify: `js/main.js` (theme toggle logic)

- [ ] **Step 1: Append theme-toggle styles to `css/styles.css`**

Append at the end of `css/styles.css`:

```css
/* Theme toggle button ------------------------------------ */
.theme-toggle {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border);
  transition: background 0.2s, transform 0.2s;
}
.theme-toggle:hover { background: var(--bg-elevated); transform: rotate(15deg); }
.theme-toggle .icon-sun { display: none; }
.theme-toggle .icon-moon { display: block; }
[data-theme="light"] .theme-toggle .icon-sun { display: block; }
[data-theme="light"] .theme-toggle .icon-moon { display: none; }
```

- [ ] **Step 2: Replace `js/main.js` content with the theme toggle + nav logic**

Replace the contents of `js/main.js` with:

```js
// main.js — navbar, theme toggle, mobile menu, WhatsApp logic

// ---------- Theme toggle ----------
const THEME_KEY = 'upamanyu-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const theme = stored || 'dark'; // default dark
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ---------- Mobile menu ----------
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

// ---------- Navbar scroll state ----------
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Bind theme toggle button ----------
function initThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

// ---------- Boot ----------
initTheme(); // run before paint to avoid flash
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initNavbarScroll();
});
```

- [ ] **Step 3: Verification (deferred)**

Theme toggle cannot be visually verified until a page using the navbar exists (Task 4). Do not test yet — proceed.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: theme toggle with localStorage persistence"
```

---

## Task 3: Shared markup blocks (navbar, footer, floating WhatsApp) — define once, reuse

These three blocks will be **copy-pasted into every HTML page**. Define them here as canonical reference. Whenever a later task says "include shared navbar / footer / WhatsApp button", paste these snippets.

- [ ] **Step 1: Append navbar + footer + WhatsApp + mobile-menu styles to `css/styles.css`**

Append:

```css
/* 6. Navbar ---------------------------------------------- */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 1rem 0;
  background: transparent;
  transition: background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
}
.navbar.scrolled {
  background: var(--bg);
  padding: 0.6rem 0;
  box-shadow: var(--shadow);
}
.navbar .container {
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo img { height: 36px; }
.nav-links {
  display: flex; gap: 2rem; align-items: center;
}
.nav-links a {
  font-weight: 500; font-size: 0.95rem;
  position: relative;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--teal-bright); }
.nav-links a.active { color: var(--orange); }
.nav-actions {
  display: flex; gap: 0.75rem; align-items: center;
}
.nav-whatsapp {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: #25D366; color: #fff;
  border-radius: 999px;
  font-size: 0.85rem; font-weight: 600;
  transition: transform 0.2s;
}
.nav-whatsapp:hover { transform: translateY(-2px); }
.hamburger {
  display: none;
  width: 28px; height: 22px;
  flex-direction: column; justify-content: space-between;
}
.hamburger span {
  display: block; height: 2px; background: var(--text);
  transition: transform 0.3s, opacity 0.2s;
}
.hamburger.active span:nth-child(1) { transform: translateY(10px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }
body.no-scroll { overflow: hidden; }

/* 7. Footer ---------------------------------------------- */
.footer {
  background: var(--bg-elevated);
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--border);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}
.footer-brand img { height: 44px; margin-bottom: 1rem; }
.footer-brand p { color: var(--text-muted); max-width: 320px; }
.footer-col h4 { margin-bottom: 1rem; font-size: 1rem; color: var(--orange); }
.footer-col ul li { margin-bottom: 0.6rem; }
.footer-col a { color: var(--text-muted); transition: color 0.2s; }
.footer-col a:hover { color: var(--text); }
.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 1rem;
  color: var(--text-muted); font-size: 0.875rem;
}
.social-icons { display: flex; gap: 1rem; }
.social-icons a {
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid var(--border);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.social-icons a:hover { background: var(--orange); color: #fff; border-color: var(--orange); }

/* 8. Floating WhatsApp ----------------------------------- */
.float-whatsapp {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 90;
  width: 56px; height: 56px;
  background: #25D366; color: #fff;
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(37,211,102,0.45);
  animation: pulse 2s infinite;
}
.float-whatsapp:hover { transform: scale(1.08); }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
  70% { box-shadow: 0 0 0 18px rgba(37,211,102,0); }
  100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
}

/* 9. Devanagari motif utilities -------------------------- */
.section-divider {
  text-align: center; padding: 2rem 0;
  font-family: 'Noto Sans Devanagari', sans-serif;
  font-size: 1.5rem; color: var(--orange);
  opacity: 0.6;
}
```

- [ ] **Step 2: Define the canonical NAVBAR snippet (copy this exact block to every HTML page)**

```html
<!-- ====== NAVBAR (shared) ====== -->
<nav class="navbar">
  <div class="container">
    <a href="index.html" class="nav-logo"><img src="assets/logo.png" alt="Upamanyu Creation"></a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="work.html">Work</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun"  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      </button>
      <a class="nav-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
        WhatsApp
      </a>
      <button class="hamburger" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: Define the canonical FOOTER snippet**

```html
<!-- ====== FOOTER (shared) ====== -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo.png" alt="Upamanyu Creation">
        <p>Premium digital marketing, AI-powered video ads, and brand-first creative for ambitious teams.</p>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="work.html">Work</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">Social Media Branding</a></li>
          <li><a href="services.html">AI-Powered Video Ads</a></li>
          <li><a href="services.html">Poster Design</a></li>
          <li><a href="services.html">Ad Campaigns</a></li>
          <li><a href="services.html">Website Development</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Reach Us</h4>
        <ul>
          <li><a href="https://wa.me/9779744631713" target="_blank" rel="noopener">WhatsApp: +977 9744631713</a></li>
          <li><a href="mailto:hello@upamanyucreation.com">hello@upamanyucreation.com</a></li>
          <li><a href="contact.html">Contact form</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Upamanyu Creation. All rights reserved. <span class="devanagari">अ</span></span>
      <div class="social-icons">
        <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg></a>
        <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 2.06-2.06 2.06 2.06 0 0 1-2.06 2.06zm1.78 13.02H3.56V9h3.56z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6z"/></svg></a>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Define the canonical FLOATING WHATSAPP snippet**

```html
<!-- ====== FLOATING WHATSAPP (shared) ====== -->
<a class="float-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
</a>
```

- [ ] **Step 5: Define the canonical `<head>` snippet (used by every page)**

The only thing that changes per page is `<title>` and the `body` `data-page` attribute (used to highlight the active nav link via CSS).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PAGE TITLE}} — Upamanyu Creation</title>
  <meta name="description" content="Upamanyu Creation — AI-powered video ads, poster design, ad campaigns, and digital marketing for ambitious brands.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
```

And the body shell:

```html
<body data-page="{{PAGE NAME}}">
  <!-- NAVBAR -->
  <!-- PAGE CONTENT -->
  <!-- FOOTER -->
  <!-- FLOATING WHATSAPP -->
  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

`{{PAGE NAME}}` values: `home`, `work`, `services`, `about`, `blog`, `contact`. Used by CSS to mark the active nav link:

Append to `css/styles.css`:

```css
[data-page="home"]     .nav-links a[href="index.html"],
[data-page="work"]     .nav-links a[href="work.html"],
[data-page="services"] .nav-links a[href="services.html"],
[data-page="about"]    .nav-links a[href="about.html"],
[data-page="blog"]     .nav-links a[href="blog.html"],
[data-page="contact"]  .nav-links a[href="contact.html"] {
  color: var(--orange);
}
```

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: shared navbar, footer, floating WhatsApp markup + styles"
```

---

## Task 4: Home page (`index.html`)

**Files:**
- Modify (replace): `index.html`
- Modify: `css/styles.css` (append home page styles)

- [ ] **Step 1: Append home page styles to `css/styles.css`**

```css
/* 11a. Home page ----------------------------------------- */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center;
  overflow: hidden;
  padding-top: 5rem;
}
.hero-bg {
  position: absolute; inset: 0; z-index: -2;
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-elevated) 100%);
}
.hero-bg::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(43,107,111,0.18), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(200,90,63,0.18), transparent 40%);
}
.hero-watermark {
  position: absolute; right: -2rem; bottom: -4rem; z-index: -1;
  font-family: 'Noto Sans Devanagari', sans-serif;
  font-size: clamp(20rem, 40vw, 36rem);
  color: var(--orange);
  opacity: 0.05;
  line-height: 1;
  user-select: none;
}
.hero-content { max-width: 760px; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border); border-radius: 999px;
  font-size: 0.85rem; color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.hero-eyebrow .devanagari { color: var(--orange); }
.hero h1 { margin-bottom: 1.5rem; }
.hero h1 .accent { color: var(--orange); }
.hero p.lead {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 600px;
}
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Service teaser grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.service-card {
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.service-card:hover {
  transform: translateY(-6px);
  border-color: var(--teal-bright);
  box-shadow: var(--shadow);
}
.service-card .icon {
  width: 52px; height: 52px;
  display: inline-flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--teal), var(--orange));
  border-radius: 12px;
  font-size: 1.5rem; color: #fff;
  margin-bottom: 1.25rem;
}
.service-card h3 { margin-bottom: 0.6rem; }
.service-card p { color: var(--text-muted); margin-bottom: 1rem; }
.service-card a { color: var(--teal-bright); font-weight: 600; font-size: 0.9rem; }

/* Featured work */
.work-preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
.work-preview .card {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}
.work-preview .card img,
.work-preview .card video {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s;
}
.work-preview .card:hover img,
.work-preview .card:hover video { transform: scale(1.06); }
.work-preview .card .overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%);
  display: flex; align-items: flex-end;
  padding: 1.25rem;
  color: #fff;
  opacity: 0; transition: opacity 0.3s;
}
.work-preview .card:hover .overlay { opacity: 1; }
.work-preview .card .overlay span { font-size: 0.8rem; color: var(--orange-bright); }
.work-preview .card .overlay h4 { color: #fff; }

/* Stats strip */
.stats-strip {
  background: linear-gradient(135deg, var(--teal) 0%, #1F4F52 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  text-align: center;
  color: #fff;
}
.stats-strip .stat-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  color: var(--orange-bright);
  display: block;
  margin-bottom: 0.5rem;
}
.stats-strip .stat-label { font-size: 0.95rem; opacity: 0.85; }

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.testimonial {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
}
.testimonial .quote-mark { font-size: 3rem; color: var(--orange); line-height: 0.5; margin-bottom: 1rem; }
.testimonial p { color: var(--text); margin-bottom: 1.5rem; font-style: italic; }
.testimonial .author { display: flex; align-items: center; gap: 0.75rem; }
.testimonial .avatar {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, var(--teal), var(--orange));
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700;
}
.testimonial .author .name { font-weight: 600; }
.testimonial .author .role { color: var(--text-muted); font-size: 0.85rem; }

/* Final CTA band */
.cta-band {
  text-align: center;
  background: var(--bg-elevated);
  padding: 4rem 2rem;
  border-radius: 20px;
  border: 1px solid var(--border);
}
.cta-band h2 { margin-bottom: 1rem; }
.cta-band h2 .accent { color: var(--orange); }
.cta-band p { color: var(--text-muted); margin-bottom: 2rem; max-width: 540px; margin-left: auto; margin-right: auto; }
```

- [ ] **Step 2: Replace `index.html` content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upamanyu Creation — AI-Powered Digital Marketing</title>
  <meta name="description" content="Upamanyu Creation — AI-powered video ads, poster design, ad campaigns, and digital marketing for ambitious brands.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="home">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <span class="hero-watermark devanagari" aria-hidden="true">अ</span>
    <div class="container">
      <div class="hero-content reveal">
        <span class="hero-eyebrow"><span class="devanagari">अ</span> Upamanyu Creation</span>
        <h1>Brands grow when stories <span class="accent">strike right.</span></h1>
        <p class="lead">We craft AI-powered video ads, posters, and full-funnel ad campaigns that turn attention into action — for ambitious teams across Nepal and beyond.</p>
        <div class="hero-ctas">
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Chat on WhatsApp</a>
          <a class="btn btn-secondary" href="work.html">View our work →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES TEASER -->
  <section class="section">
    <div class="container">
      <div class="section-title reveal">
        <span class="devanagari">सेवा</span>
        <h2>What we do</h2>
      </div>
      <div class="services-grid">
        <div class="service-card reveal"><div class="icon">🎬</div><h3>AI Video Ads</h3><p>Cinematic ad reels generated and edited with AI — fast, on-brand, scroll-stopping.</p><a href="services.html#ai-video">Learn more →</a></div>
        <div class="service-card reveal"><div class="icon">🎨</div><h3>Poster Design</h3><p>Eye-catching social posters and print collateral that own your feed and your shelves.</p><a href="services.html#posters">Learn more →</a></div>
        <div class="service-card reveal"><div class="icon">🚀</div><h3>Ad Boost</h3><p>Promote posts that deserve to fly — sharper targeting, better creative, real results.</p><a href="services.html#boost">Learn more →</a></div>
        <div class="service-card reveal"><div class="icon">📊</div><h3>Ad Campaigns</h3><p>End-to-end paid campaigns: strategy, creative, launch, and ongoing optimization.</p><a href="services.html#campaigns">Learn more →</a></div>
        <div class="service-card reveal"><div class="icon">📱</div><h3>Social Handling</h3><p>Daily posting, engagement, growth — your brand always present, always on-tone.</p><a href="services.html#social">Learn more →</a></div>
        <div class="service-card reveal"><div class="icon">🌐</div><h3>Web Development</h3><p>Sleek, fast, mobile-first websites that match the polish of the rest of your brand.</p><a href="services.html#web">Learn more →</a></div>
      </div>
    </div>
  </section>

  <div class="section-divider devanagari">अ ❍ अ</div>

  <!-- FEATURED WORK -->
  <section class="section">
    <div class="container">
      <div class="section-title reveal">
        <span class="devanagari">कार्य</span>
        <h2>Recent work</h2>
      </div>
      <div class="work-preview">
        <div class="card reveal"><img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=70" alt=""><div class="overlay"><div><span>Video Ad</span><h4>Spring collection reel</h4></div></div></div>
        <div class="card reveal"><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=70" alt=""><div class="overlay"><div><span>Campaign</span><h4>Festival launch</h4></div></div></div>
        <div class="card reveal"><img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=70" alt=""><div class="overlay"><div><span>Poster</span><h4>Café opening</h4></div></div></div>
        <div class="card reveal"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=70" alt=""><div class="overlay"><div><span>Social</span><h4>Brand refresh</h4></div></div></div>
      </div>
      <div style="text-align:center"><a class="btn btn-secondary" href="work.html">See all work →</a></div>
    </div>
  </section>

  <!-- STATS STRIP -->
  <section class="section">
    <div class="container">
      <div class="stats-strip reveal">
        <div><span class="stat-num" data-counter="120">0</span><span class="stat-label">Campaigns delivered</span></div>
        <div><span class="stat-num" data-counter="45">0</span><span class="stat-label">Brands served</span></div>
        <div><span class="stat-num" data-counter="2500000" data-suffix="+">0</span><span class="stat-label">Total reach</span></div>
        <div><span class="stat-num" data-counter="5">0</span><span class="stat-label">Years experience</span></div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section">
    <div class="container">
      <div class="section-title reveal">
        <span class="devanagari">अनुभव</span>
        <h2>What clients say</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial reveal"><div class="quote-mark">"</div><p>The AI video ads they delivered tripled our conversion in the first month. Sharp creative, sharper turnaround.</p><div class="author"><div class="avatar">RB</div><div><div class="name">Rajan B.</div><div class="role">Founder, Himal Outfitters</div></div></div></div>
        <div class="testimonial reveal"><div class="quote-mark">"</div><p>From posters to full campaigns — Upamanyu actually understands the local market. Other agencies just translate.</p><div class="author"><div class="avatar">SK</div><div><div class="name">Sneha K.</div><div class="role">Marketing Lead, Café Annapurna</div></div></div></div>
        <div class="testimonial reveal"><div class="quote-mark">"</div><p>Easiest agency I have ever worked with. They get it, they ship it, the WhatsApp updates are gold.</p><div class="author"><div class="avatar">PT</div><div><div class="name">Prabin T.</div><div class="role">CEO, Yetra Travels</div></div></div></div>
      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <span class="devanagari" style="color:var(--orange); font-size:1.5rem;">अ</span>
        <h2>Ready to grow your <span class="accent">brand?</span></h2>
        <p>Tell us where you are and where you want to go. We will reply on WhatsApp within a few hours.</p>
        <a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Start a conversation</a>
      </div>
    </div>
  </section>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

**IMPORTANT:** In the three placeholder comments above, paste the exact navbar / footer / floating-whatsapp blocks from Task 3.

- [ ] **Step 3: Manual verification — open `index.html` in a browser**

Open with VS Code Live Server, or run from PowerShell:

```powershell
Start-Process index.html
```

Check:
- Page loads in **dark mode** by default
- Navbar appears at top, becomes solid background on scroll
- Theme toggle button switches dark ↔ light cleanly
- Theme persists after page reload
- WhatsApp button (top-right + floating bottom-right) opens `wa.me/9779744631713`
- Mobile-resized window: hamburger appears, menu opens (basic — full mobile styling in Task 11)
- All sections render: hero, services, work preview, stats (numbers static for now), testimonials, CTA band, footer

Counters and scroll reveal animations will not animate yet — that's Task 9. Static numbers and visible cards are fine.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: home page with hero, services teaser, work preview, stats, testimonials, CTA"
```

---

## Task 5: Work page (`work.html`) with filter and lightbox

**Files:**
- Create: `work.html`
- Modify: `css/styles.css` (append work page styles)
- Modify: `js/work.js` (filter + lightbox logic)

- [ ] **Step 1: Append work page styles to `css/styles.css`**

```css
/* 11b. Work page ----------------------------------------- */
.page-hero {
  padding: 8rem 0 3rem;
  text-align: center;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}
.page-hero h1 { margin-bottom: 1rem; }
.page-hero p { color: var(--text-muted); max-width: 580px; margin: 0 auto; }

.work-filters {
  display: flex; gap: 0.6rem; justify-content: center;
  flex-wrap: wrap; margin: 2rem 0 3rem;
}
.work-filters button {
  padding: 0.6rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.9rem; font-weight: 500;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.work-filters button:hover { border-color: var(--teal-bright); color: var(--teal-bright); }
.work-filters button.active { background: var(--orange); color: #fff; border-color: var(--orange); }

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.work-grid .item {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-card);
  cursor: pointer;
}
.work-grid .item.video { aspect-ratio: 9 / 16; }
.work-grid .item.poster { aspect-ratio: 3 / 4; }
.work-grid .item.campaign { aspect-ratio: 16 / 11; }
.work-grid .item img,
.work-grid .item video { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.work-grid .item:hover img,
.work-grid .item:hover video { transform: scale(1.05); }
.work-grid .item .meta {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: #fff;
  transform: translateY(100%); transition: transform 0.3s;
}
.work-grid .item:hover .meta { transform: translateY(0); }
.work-grid .item .meta span { color: var(--orange-bright); font-size: 0.78rem; }
.work-grid .item.hidden { display: none; }

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.92);
  display: none;
  align-items: center; justify-content: center;
  padding: 2rem;
}
.lightbox.open { display: flex; }
.lightbox-content {
  max-width: 90vw; max-height: 90vh;
  position: relative;
}
.lightbox img,
.lightbox video { max-width: 90vw; max-height: 90vh; border-radius: 8px; }
.lightbox .close, .lightbox .nav-btn {
  position: absolute;
  background: rgba(255,255,255,0.1); color: #fff;
  width: 44px; height: 44px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  transition: background 0.2s;
}
.lightbox .close:hover, .lightbox .nav-btn:hover { background: rgba(255,255,255,0.2); }
.lightbox .close { top: -3rem; right: 0; }
.lightbox .prev { top: 50%; left: -3.5rem; transform: translateY(-50%); }
.lightbox .next { top: 50%; right: -3.5rem; transform: translateY(-50%); }
@media (max-width: 768px) {
  .lightbox .close { top: -2.5rem; right: 0; }
  .lightbox .prev { left: 0.5rem; }
  .lightbox .next { right: 0.5rem; }
}
```

- [ ] **Step 2: Create `work.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Work — Upamanyu Creation</title>
  <meta name="description" content="Recent video ads, posters, and ad campaigns by Upamanyu Creation.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="work">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <section class="page-hero">
    <div class="container">
      <span class="devanagari" style="color:var(--orange);">कार्य</span>
      <h1>Work</h1>
      <p>A selection of recent video ads, posters, and full campaigns we have shipped for brands across Nepal.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="work-filters">
        <button class="active" data-filter="all">All</button>
        <button data-filter="video">Videos</button>
        <button data-filter="poster">Posters</button>
        <button data-filter="campaign">Campaigns</button>
      </div>

      <div class="work-grid">
        <div class="item video"     data-type="video"     data-src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=70" data-title="Spring reel"      data-cat="Video Ad"><img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=70" alt=""><div class="meta"><span>Video Ad</span><h4>Spring reel</h4></div></div>
        <div class="item poster"    data-type="image"     data-src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=70" data-title="Café opening"    data-cat="Poster"><img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=70" alt=""><div class="meta"><span>Poster</span><h4>Café opening</h4></div></div>
        <div class="item campaign"  data-type="image"     data-src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=70" data-title="Festival launch" data-cat="Campaign"><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=70" alt=""><div class="meta"><span>Campaign</span><h4>Festival launch</h4></div></div>
        <div class="item video"     data-type="video"     data-src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=70" data-title="Brand sizzle"    data-cat="Video Ad"><img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=70" alt=""><div class="meta"><span>Video Ad</span><h4>Brand sizzle</h4></div></div>
        <div class="item poster"    data-type="image"     data-src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=70" data-title="Festival poster"  data-cat="Poster"><img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=70" alt=""><div class="meta"><span>Poster</span><h4>Festival poster</h4></div></div>
        <div class="item campaign"  data-type="image"     data-src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=70" data-title="Brand refresh"   data-cat="Campaign"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70" alt=""><div class="meta"><span>Campaign</span><h4>Brand refresh</h4></div></div>
        <div class="item poster"    data-type="image"     data-src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=900&q=70" data-title="Product drop"    data-cat="Poster"><img src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=600&q=70" alt=""><div class="meta"><span>Poster</span><h4>Product drop</h4></div></div>
        <div class="item video"     data-type="video"     data-src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=70" data-title="Promo cut"       data-cat="Video Ad"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=70" alt=""><div class="meta"><span>Video Ad</span><h4>Promo cut</h4></div></div>
        <div class="item campaign"  data-type="image"     data-src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=70" data-title="Holiday push"    data-cat="Campaign"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=70" alt=""><div class="meta"><span>Campaign</span><h4>Holiday push</h4></div></div>
      </div>
    </div>
  </section>

  <!-- LIGHTBOX -->
  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="close" aria-label="Close">×</button>
    <button class="nav-btn prev" aria-label="Previous">‹</button>
    <button class="nav-btn next" aria-label="Next">›</button>
    <div class="lightbox-content"></div>
  </div>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/work.js"></script>
</body>
</html>
```

> Note: until the agency provides real videos, all `data-type` values are `"image"` even on `.video` cards (since stock is shown). When real video files land in `assets/work/videos/`, set `data-type="video"` and `data-src="assets/work/videos/<file>.mp4"`.

- [ ] **Step 3: Replace `js/work.js` content**

```js
// work.js — filter + lightbox

(() => {
  // ---------- Filters ----------
  const filterBtns = document.querySelectorAll('.work-filters button');
  const items = Array.from(document.querySelectorAll('.work-grid .item'));

  function applyFilter(filter) {
    items.forEach(item => {
      const matches = filter === 'all' || item.classList.contains(filter);
      item.classList.toggle('hidden', !matches);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const content = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn  = lightbox.querySelector('.prev');
  const nextBtn  = lightbox.querySelector('.next');
  let activeIndex = 0;

  function visibleItems() {
    return items.filter(i => !i.classList.contains('hidden'));
  }

  function render(item) {
    const type = item.dataset.type;
    const src  = item.dataset.src;
    const title = item.dataset.title || '';
    if (type === 'video') {
      content.innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
    } else {
      content.innerHTML = `<img src="${src}" alt="${title}">`;
    }
  }

  function open(item) {
    activeIndex = visibleItems().indexOf(item);
    render(item);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    content.innerHTML = '';
  }

  function step(delta) {
    const list = visibleItems();
    if (!list.length) return;
    activeIndex = (activeIndex + delta + list.length) % list.length;
    render(list[activeIndex]);
  }

  items.forEach(item => item.addEventListener('click', () => open(item)));
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click',  () => step(-1));
  nextBtn.addEventListener('click',  () => step(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
```

- [ ] **Step 4: Manual verification — open `work.html`**

Check:
- Grid renders all 9 items
- Click "Videos" filter → only 3 video items remain. Click "Posters" → only 3 posters. "Campaigns" → 3 campaigns. "All" → 9.
- Active filter button has orange background.
- Click any item → lightbox opens with image/video, dim background.
- Lightbox prev/next arrows work (keyboard arrows too). Close button + Escape + click-outside all close it.
- Body scroll is locked while lightbox is open.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: work page with category filter and lightbox"
```

---

## Task 6: Services page (`services.html`)

**Files:**
- Create: `services.html`
- Modify: `css/styles.css` (append services page styles)

- [ ] **Step 1: Append services page styles to `css/styles.css`**

```css
/* 11c. Services page ------------------------------------- */
.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
}
.service-block:last-child { border-bottom: 0; }
.service-block:nth-child(even) .visual { order: -1; }
.service-block .visual {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--teal), var(--orange));
  display: flex; align-items: center; justify-content: center;
  font-size: 6rem;
  position: relative;
  overflow: hidden;
}
.service-block .visual::after {
  content: 'अ';
  font-family: 'Noto Sans Devanagari', sans-serif;
  position: absolute; bottom: -2rem; right: -1rem;
  font-size: 12rem; color: rgba(255,255,255,0.1);
  line-height: 1;
}
.service-block h2 .devanagari { color: var(--orange); display: block; font-size: 1.25rem; }
.service-block ul { margin: 1.5rem 0; }
.service-block ul li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}
.service-block ul li::before {
  content: 'अ';
  font-family: 'Noto Sans Devanagari', sans-serif;
  position: absolute; left: 0;
  color: var(--orange);
  font-weight: 700;
}
@media (max-width: 768px) {
  .service-block { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 0; }
  .service-block:nth-child(even) .visual { order: 0; }
}
```

- [ ] **Step 2: Create `services.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services — Upamanyu Creation</title>
  <meta name="description" content="AI video ads, poster design, ad boost, ad campaigns, social media handling, and website development.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="services">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <section class="page-hero">
    <div class="container">
      <span class="devanagari" style="color:var(--orange);">सेवा</span>
      <h1>Services</h1>
      <p>Six tightly-scoped offerings that cover the full digital growth stack — from a single ad reel to a quarter-long campaign.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">

      <div class="service-block reveal" id="ai-video">
        <div class="visual">🎬</div>
        <div>
          <h2><span class="devanagari">वीडियो</span>AI-Powered Video Ads</h2>
          <p>Cinematic video ads generated and edited with AI tools — production speed of a freelancer with the polish of a studio.</p>
          <ul>
            <li>Concept + script aligned to your funnel</li>
            <li>AI generation, real-footage edits, hybrid</li>
            <li>Format variants for Instagram, YouTube, TikTok</li>
            <li>Two rounds of revisions included</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I'm%20interested%20in%20AI%20video%20ads" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

      <div class="service-block reveal" id="posters">
        <div class="visual">🎨</div>
        <div>
          <h2><span class="devanagari">पोस्टर</span>Poster Design</h2>
          <p>Social posters and print collateral that capture attention and carry your brand through every touchpoint.</p>
          <ul>
            <li>On-brand typography and color systems</li>
            <li>Festival, product, and event variants</li>
            <li>Print-ready and social-cropped exports</li>
            <li>Bilingual (English + Devanagari) where it fits</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I'd%20like%20a%20poster%20quote" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

      <div class="service-block reveal" id="boost">
        <div class="visual">🚀</div>
        <div>
          <h2><span class="devanagari">बूस्ट</span>Ad Boost</h2>
          <p>Promote posts that deserve to fly. We tighten targeting, refresh creative, and push the right content to the right audience.</p>
          <ul>
            <li>Audience and interest research</li>
            <li>Creative cropping for ad placements</li>
            <li>Spend pacing and budget guardrails</li>
            <li>Weekly performance recap on WhatsApp</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I%20want%20to%20boost%20my%20ads" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

      <div class="service-block reveal" id="campaigns">
        <div class="visual">📊</div>
        <div>
          <h2><span class="devanagari">अभियान</span>Ad Campaigns</h2>
          <p>End-to-end paid campaigns: strategy, creative, launch, and ongoing optimization across Meta, Google, and YouTube.</p>
          <ul>
            <li>Funnel mapping and KPI alignment</li>
            <li>Multi-asset creative production</li>
            <li>Pixel + conversion event setup</li>
            <li>Bi-weekly optimization cycles</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I%20want%20to%20discuss%20a%20campaign" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

      <div class="service-block reveal" id="social">
        <div class="visual">📱</div>
        <div>
          <h2><span class="devanagari">सोशल</span>Social Media Handling</h2>
          <p>Daily posting, engagement, growth — your brand always present, always on-tone, never copy-pasted.</p>
          <ul>
            <li>Monthly content calendar</li>
            <li>Posts, reels, stories, captions</li>
            <li>Comment + DM management</li>
            <li>Monthly growth report</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I%20want%20social%20media%20handling" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

      <div class="service-block reveal" id="web">
        <div class="visual">🌐</div>
        <div>
          <h2><span class="devanagari">वेब</span>Website Development</h2>
          <p>Sleek, fast, mobile-first websites that match the polish of the rest of your brand. Built to load fast and convert.</p>
          <ul>
            <li>Custom design — no template clones</li>
            <li>Responsive across phones, tablets, desktops</li>
            <li>SEO-friendly markup and meta</li>
            <li>WhatsApp + email lead capture built in</li>
          </ul>
          <a class="btn btn-whatsapp" href="https://wa.me/9779744631713?text=Hi,%20I%20need%20a%20website" target="_blank" rel="noopener">Get a quote</a>
        </div>
      </div>

    </div>
  </section>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 3: Manual verification — open `services.html`**

Check:
- Six service blocks render with alternating left/right layout
- Each block has icon, Devanagari label, English heading, description, bulleted list (with अ bullets), WhatsApp CTA
- WhatsApp links contain pre-filled message
- Mobile width: blocks stack vertically, visuals always above text
- No pricing visible anywhere

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: services page with 6 detailed service blocks"
```

---

## Task 7: About page (`about.html`)

**Files:**
- Create: `about.html`
- Modify: `css/styles.css` (append about page styles)

- [ ] **Step 1: Append about page styles**

```css
/* 11d. About page ---------------------------------------- */
.about-intro {
  max-width: 760px; margin: 0 auto;
  text-align: center; font-size: 1.15rem;
  color: var(--text-muted);
}
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}
.value-card {
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-align: center;
}
.value-card .num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.5rem; font-weight: 800;
  background: linear-gradient(135deg, var(--teal-bright), var(--orange));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block; margin-bottom: 0.5rem;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.team-card {
  text-align: center;
  padding: 2rem 1rem;
}
.team-photo {
  width: 130px; height: 130px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--teal), var(--orange));
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-size: 2.5rem; font-weight: 700;
  margin-bottom: 1rem;
}
.team-card .role { color: var(--text-muted); font-size: 0.9rem; }
```

- [ ] **Step 2: Create `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Upamanyu Creation</title>
  <meta name="description" content="Upamanyu Creation is a Nepal-based digital agency blending AI tooling with sharp creative judgment.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="about">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <section class="page-hero">
    <div class="container">
      <span class="devanagari" style="color:var(--orange);">हाम्रो बारेमा</span>
      <h1>About Upamanyu</h1>
      <p>A small, sharp digital agency from Nepal — built to ship work that performs.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <p class="about-intro reveal">We started Upamanyu Creation because the gap between what local brands could afford and what they actually needed to grow online had become too wide. Our answer: combine modern AI tooling with strong creative judgment, charge fairly, and ship faster than anyone expects.</p>
      <p class="about-intro reveal" style="margin-top:1.5rem;">The name <strong class="devanagari">उपमन्यु</strong> comes from a story about a young seeker who refused to stop chasing the truth — even in the dark. We carry that spirit into every brief: keep going until the work earns its place.</p>
    </div>
  </section>

  <div class="section-divider devanagari">अ ❍ अ</div>

  <section class="section">
    <div class="container">
      <div class="section-title reveal"><span class="devanagari">मूल्य</span><h2>What we stand for</h2></div>
      <div class="values-grid">
        <div class="value-card reveal"><span class="num">01</span><h3>Speed without slop</h3><p>AI lets us move fast. Taste keeps us from shipping garbage.</p></div>
        <div class="value-card reveal"><span class="num">02</span><h3>Local first</h3><p>We build for Nepali audiences with Nepali insight — translation is not a strategy.</p></div>
        <div class="value-card reveal"><span class="num">03</span><h3>Honest pricing</h3><p>No mystery quotes. WhatsApp us, get a clear number, decide.</p></div>
        <div class="value-card reveal"><span class="num">04</span><h3>Full funnel</h3><p>Creative, paid, organic — handled together, never siloed.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-title reveal"><span class="devanagari">टीम</span><h2>The team</h2></div>
      <div class="team-grid">
        <div class="team-card reveal"><div class="team-photo">U</div><h3>Upamanyu Lead</h3><div class="role">Founder & Creative Director</div></div>
        <div class="team-card reveal"><div class="team-photo">S</div><h3>Sushma R.</h3><div class="role">Head of Campaigns</div></div>
        <div class="team-card reveal"><div class="team-photo">A</div><h3>Anish G.</h3><div class="role">AI Video Producer</div></div>
        <div class="team-card reveal"><div class="team-photo">P</div><h3>Pratima M.</h3><div class="role">Brand Designer</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <span class="devanagari" style="color:var(--orange); font-size:1.5rem;">अ</span>
        <h2>Want to <span class="accent">work together?</span></h2>
        <p>Send us a message on WhatsApp — we usually reply within a few hours.</p>
        <a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Say hello</a>
      </div>
    </div>
  </section>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 3: Manual verification — open `about.html`**

Check brand story, values grid (4 cards with gradient numbers), team grid (4 placeholder avatars), CTA band. Active nav highlights "About".

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: about page with story, values, team, CTA"
```

---

## Task 8: Blog index + 3 blog post pages

**Files:**
- Create: `blog.html`
- Create: `blog/digital-marketing-tips.html`
- Create: `blog/ai-in-ads.html`
- Create: `blog/brand-building.html`
- Modify: `css/styles.css` (append blog page styles)

- [ ] **Step 1: Append blog page styles**

```css
/* 11e. Blog ---------------------------------------------- */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.blog-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex; flex-direction: column;
}
.blog-card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.blog-card .thumb {
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, var(--teal), var(--orange));
  position: relative;
}
.blog-card .thumb::after {
  content: 'अ';
  font-family: 'Noto Sans Devanagari', sans-serif;
  position: absolute; right: 1rem; bottom: 0.5rem;
  font-size: 4rem; color: rgba(255,255,255,0.15);
  line-height: 1;
}
.blog-card .body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
.blog-card .meta { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.5rem; }
.blog-card h3 { margin-bottom: 0.6rem; }
.blog-card p { color: var(--text-muted); margin-bottom: 1rem; flex: 1; }
.blog-card a.read-more { color: var(--orange); font-weight: 600; font-size: 0.9rem; }

/* Single post */
.post-hero {
  padding: 8rem 0 3rem;
  text-align: center;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}
.post-hero .meta { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem; }
.post-hero h1 { max-width: 800px; margin: 0 auto 1rem; }
.post-content {
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.8;
}
.post-content h2 { margin: 2.5rem 0 1rem; }
.post-content h3 { margin: 2rem 0 0.75rem; }
.post-content p, .post-content ul, .post-content ol { margin-bottom: 1.25rem; }
.post-content ul li, .post-content ol li { margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative; }
.post-content ul li::before {
  content: 'अ'; font-family: 'Noto Sans Devanagari', sans-serif;
  color: var(--orange); position: absolute; left: 0;
}
.post-content blockquote {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid var(--orange);
  background: var(--bg-elevated);
  font-style: italic;
  color: var(--text-muted);
}
```

- [ ] **Step 2: Create `blog.html` (index)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Upamanyu Creation</title>
  <meta name="description" content="Notes on digital marketing, AI in advertising, and brand building from Upamanyu Creation.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="blog">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <section class="page-hero">
    <div class="container">
      <span class="devanagari" style="color:var(--orange);">ब्लग</span>
      <h1>Blog</h1>
      <p>Short notes on digital marketing, AI tooling, and brand-building — written by the team.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="blog-grid">
        <a class="blog-card reveal" href="blog/digital-marketing-tips.html">
          <div class="thumb"></div>
          <div class="body">
            <div class="meta">Marketing • 5 min read • 2026-04-22</div>
            <h3>Five digital marketing tactics that actually work in 2026</h3>
            <p>The funnel has not changed — the tools have. Here is what we run for clients today, and why it works.</p>
            <span class="read-more">Read article →</span>
          </div>
        </a>
        <a class="blog-card reveal" href="blog/ai-in-ads.html">
          <div class="thumb"></div>
          <div class="body">
            <div class="meta">AI • 6 min read • 2026-04-30</div>
            <h3>AI in advertising — hype, reality, and what to actually use</h3>
            <p>Generated video, script automation, audience modeling. We separate what is shipping value from what is still demo-ware.</p>
            <span class="read-more">Read article →</span>
          </div>
        </a>
        <a class="blog-card reveal" href="blog/brand-building.html">
          <div class="thumb"></div>
          <div class="body">
            <div class="meta">Branding • 4 min read • 2026-05-04</div>
            <h3>How small brands build trust without big budgets</h3>
            <p>Trust is not bought; it is compounded. Three habits we recommend to every client we onboard.</p>
            <span class="read-more">Read article →</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `blog/digital-marketing-tips.html`**

Note: blog posts live in a sub-folder, so all asset paths need `../` prefix.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Five digital marketing tactics that work in 2026 — Upamanyu Creation</title>
  <link rel="icon" href="../assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body data-page="blog">

  <!-- NAVBAR — paste shared navbar but with PARENT-RELATIVE PATHS:
       href="../index.html", "../work.html", "../services.html", "../about.html", "../blog.html", "../contact.html"
       logo src="../assets/logo.png"
  -->

  <section class="post-hero">
    <div class="container">
      <div class="meta">Marketing • 5 min read • 2026-04-22</div>
      <h1>Five digital marketing tactics that actually work in 2026</h1>
      <p class="text-muted">By the Upamanyu team</p>
    </div>
  </section>

  <article class="section">
    <div class="container post-content">
      <p>Marketing tools change every quarter; the funnel does not. Awareness, interest, decision, action — every campaign you have ever seen lives somewhere on that line. The question we ask before any work is: which step is broken, and what is the cheapest, fastest creative that fixes it?</p>

      <h2>1. Short-form video is the new homepage</h2>
      <p>For most local brands, the first impression is no longer your website. It is a 9-second reel on Instagram. Treat that surface like a homepage — clear identity, clear offer, clear next step.</p>

      <h2>2. WhatsApp is the new contact form</h2>
      <p>Forms convert at 1-3%. WhatsApp buttons in Nepal can do 8-15%. The lower the friction, the higher the close. We default every campaign to a WhatsApp CTA unless there is a specific reason not to.</p>

      <h2>3. Local-language hooks beat translations</h2>
      <p>A line written in Devanagari that lands locally outperforms an English translation eight times out of ten. AI helps us draft fast — local taste tells us which one to ship.</p>

      <h2>4. Test creative, not channels</h2>
      <p>Most "channel doesn't work" diagnoses are actually "creative doesn't work" diagnoses. Before pulling out of Facebook, run three more creatives.</p>

      <blockquote>"The best campaigns we run share one thing: the creative was rewritten three times before launch."</blockquote>

      <h2>5. Boost what is already working</h2>
      <p>Look at what is performing organically. Boost the top 10%. This is the highest ROI hour in any month.</p>

      <h2>What to do this week</h2>
      <ul>
        <li>Add a WhatsApp CTA to your top three landing pages</li>
        <li>Cut your best testimonial as a 9-second vertical video</li>
        <li>Boost the post that already has the best organic reach this month</li>
      </ul>

      <p>If you want help shipping any of this, message us on WhatsApp — we will respond with a clear next step.</p>
      <p style="text-align:center; margin-top:3rem;"><a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
    </div>
  </article>

  <!-- FOOTER — paste shared footer with parent-relative paths -->
  <!-- FLOATING WHATSAPP (works as-is, absolute URL) -->

  <script src="../js/main.js"></script>
  <script src="../js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create `blog/ai-in-ads.html`**

Same structure as Step 3, with `data-page="blog"`, parent-relative paths, and this content:

```html
  <section class="post-hero">
    <div class="container">
      <div class="meta">AI • 6 min read • 2026-04-30</div>
      <h1>AI in advertising — hype, reality, and what to actually use</h1>
      <p class="text-muted">By the Upamanyu team</p>
    </div>
  </section>

  <article class="section">
    <div class="container post-content">
      <p>Every week a new AI tool promises to eliminate 90% of the marketing pipeline. Most of those tools, six months later, are quiet acquisitions or polite shutdowns. So which AI is actually shipping value in 2026 — and which is still a slick demo?</p>

      <h2>What AI is good at right now</h2>
      <ul>
        <li>Concept variants — twenty hooks for a brief in five minutes</li>
        <li>Background generation — replacing flat product backgrounds in seconds</li>
        <li>Voice-overs — natural-sounding narration in multiple languages</li>
        <li>Cut-down editing — turning a long interview into ten short clips</li>
      </ul>

      <h2>What AI is still bad at</h2>
      <ul>
        <li>Original brand voice — you still write the prompt, the AI mimics</li>
        <li>Local cultural nuance — humor, timing, references all need a human</li>
        <li>Strategy — AI optimizes a single ad, not a quarterly plan</li>
      </ul>

      <blockquote>"AI compresses the boring 80% of production. The 20% that decides whether a campaign works is still human."</blockquote>

      <h2>How we actually use it on client work</h2>
      <p>For most ad campaigns, our AI use-case stack is small and focused: script drafting (we rewrite), background fill, voice-over, and quick cut-down edits. Strategy, hook selection, and final QA stay with the human team.</p>

      <h2>What to ignore</h2>
      <p>Anything promising "fully autonomous campaigns" or "10x your ad spend ROI on day one" is selling a screenshot, not a result. Treat these tools the way you would treat a contractor: ask to see the last five jobs they shipped, not the marketing video.</p>

      <p style="text-align:center; margin-top:3rem;"><a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Talk to us about AI ads</a></p>
    </div>
  </article>
```

Wrap that content with the same `<!DOCTYPE>`, head, navbar, footer, floating WhatsApp shell as the previous post.

- [ ] **Step 5: Create `blog/brand-building.html`**

Same shell, content:

```html
  <section class="post-hero">
    <div class="container">
      <div class="meta">Branding • 4 min read • 2026-05-04</div>
      <h1>How small brands build trust without big budgets</h1>
      <p class="text-muted">By the Upamanyu team</p>
    </div>
  </section>

  <article class="section">
    <div class="container post-content">
      <p>Trust is not bought; it is compounded. Every action your brand takes — every post, every reply, every receipt — either pays into the trust account or withdraws from it. Small brands cannot outspend the big ones, but they can absolutely out-compound them.</p>

      <h2>Habit one: show up consistently</h2>
      <p>Three posts a week, every week, beats fifteen posts in a month then silence. Audiences read consistency as competence. The brain trusts predictability before it trusts polish.</p>

      <h2>Habit two: reply to every message</h2>
      <p>Your first 1,000 customers will tell their friends about your reply time, not your design. Set up WhatsApp Business, set expectations, and answer.</p>

      <blockquote>"The cheapest brand-building you can do is being on time."</blockquote>

      <h2>Habit three: celebrate one client a week</h2>
      <p>Pick one customer. Tag them. Tell their story. They will share, their network will see it, and your brand becomes someone who notices people. That is rare.</p>

      <h2>What this looks like in practice</h2>
      <ul>
        <li>One short post Monday, one reel Wednesday, one customer story Friday</li>
        <li>Reply within four working hours on WhatsApp + DMs</li>
        <li>Save every kind word a customer says — those become next quarter's testimonials</li>
      </ul>

      <p>None of this scales the way ad spend does. All of it compounds the way ad spend never can.</p>
      <p style="text-align:center; margin-top:3rem;"><a class="btn btn-whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">Build with us</a></p>
    </div>
  </article>
```

- [ ] **Step 6: Manual verification — open `blog.html` and each post**

Check:
- Blog index renders 3 cards in grid, each with gradient thumb + अ watermark, title, excerpt, "Read article →"
- Click each card → opens corresponding post page
- Post pages render: hero with date/category, content with proper headings, blockquotes, अ-bulleted lists, WhatsApp CTA at end
- Navbar links work (`../index.html` etc. resolve correctly)
- Theme toggle still works on post pages
- Floating WhatsApp visible

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: blog index + 3 dummy posts (marketing, AI, branding)"
```

---

## Task 9: Contact page (`contact.html`)

**Files:**
- Create: `contact.html`
- Modify: `css/styles.css` (append contact page styles)

- [ ] **Step 1: Append contact page styles**

```css
/* 11f. Contact ------------------------------------------- */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
.contact-channels { display: grid; gap: 1rem; }
.channel {
  display: flex; gap: 1rem; align-items: center;
  padding: 1.25rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.channel:hover { border-color: var(--orange); transform: translateX(4px); }
.channel .icon {
  width: 44px; height: 44px;
  background: var(--bg-elevated);
  border-radius: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 1.25rem;
}
.channel.whatsapp .icon { background: #25D366; color: #fff; }
.channel .label { font-size: 0.78rem; color: var(--text-muted); }
.channel .value { font-weight: 600; }

.contact-form-card {
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
}
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  font: inherit;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { outline: none; border-color: var(--teal-bright); }
.form-group textarea { resize: vertical; min-height: 120px; }
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
}
```

- [ ] **Step 2: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — Upamanyu Creation</title>
  <meta name="description" content="WhatsApp +977 9744631713 — fastest way to talk to Upamanyu Creation.">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-page="contact">

  <!-- NAVBAR (paste from Task 3 Step 2) -->

  <section class="page-hero">
    <div class="container">
      <span class="devanagari" style="color:var(--orange);">सम्पर्क</span>
      <h1>Get in touch</h1>
      <p>WhatsApp is the fastest way — we usually reply within a few hours during working hours.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="contact-grid">

        <div class="reveal">
          <h2 style="margin-bottom:1.5rem;">Pick your channel</h2>
          <div class="contact-channels">
            <a class="channel whatsapp" href="https://wa.me/9779744631713" target="_blank" rel="noopener">
              <div class="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg></div>
              <div><div class="label">WhatsApp (recommended)</div><div class="value">+977 9744631713</div></div>
            </a>
            <a class="channel" href="mailto:hello@upamanyucreation.com">
              <div class="icon">✉️</div>
              <div><div class="label">Email</div><div class="value">hello@upamanyucreation.com</div></div>
            </a>
            <a class="channel" href="tel:+9779744631713">
              <div class="icon">📞</div>
              <div><div class="label">Call</div><div class="value">+977 9744631713</div></div>
            </a>
          </div>

          <div style="margin-top: 2.5rem;">
            <h3 style="margin-bottom: 0.75rem;">Working hours</h3>
            <p class="text-muted">Sunday — Friday: 10:00 — 18:00 (NPT)<br>Saturday: closed</p>
          </div>
        </div>

        <div class="contact-form-card reveal">
          <h2 style="margin-bottom:1.5rem;">Or send a message</h2>
          <form id="contact-form" action="mailto:hello@upamanyucreation.com" method="post" enctype="text/plain">
            <div class="form-group">
              <label for="cf-name">Your name</label>
              <input id="cf-name" type="text" name="name" required>
            </div>
            <div class="form-group">
              <label for="cf-email">Email</label>
              <input id="cf-email" type="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="cf-service">Interested in</label>
              <select id="cf-service" name="service" required>
                <option value="">Select a service</option>
                <option>AI Video Ads</option>
                <option>Poster Design</option>
                <option>Ad Boost</option>
                <option>Ad Campaigns</option>
                <option>Social Media Handling</option>
                <option>Website Development</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send message</button>
            <p class="text-muted" style="font-size:0.8rem; margin-top:0.75rem;">Form is a placeholder — for fastest reply, use WhatsApp.</p>
          </form>
        </div>

      </div>
    </div>
  </section>

  <!-- FOOTER (paste from Task 3 Step 3) -->
  <!-- FLOATING WHATSAPP (paste from Task 3 Step 4) -->

  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 3: Manual verification — open `contact.html`**

Check:
- WhatsApp channel card on left, prominent green; opens WhatsApp on click
- Email + call channels visible below
- Working hours block
- Form on right with name/email/service/message
- Form submits via `mailto:` (acceptable as placeholder per spec)
- Mobile width: stacks vertically

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: contact page with WhatsApp-first channels and placeholder form"
```

---

## Task 10: Animations module (scroll reveals + counters + parallax)

**Files:**
- Modify: `js/animations.js`
- Modify: `css/styles.css` (append reveal styles)

- [ ] **Step 1: Append reveal animation styles**

```css
/* 10. Animations / scroll reveals ------------------------ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Replace `js/animations.js` content**

```js
// animations.js — scroll reveals, animated counters, parallax

// ---------- Scroll reveal ----------
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
}

// ---------- Animated counters ----------
function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
}

// ---------- Parallax (hero watermark) ----------
function initParallax() {
  const wm = document.querySelector('.hero-watermark');
  if (!wm) return;
  const onScroll = () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      wm.style.transform = `translateY(${y * 0.18}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initParallax();
});
```

- [ ] **Step 3: Manual verification**

Reload `index.html`:
- Scroll down — sections fade-and-slide into view (each `.reveal` element)
- Stats strip: numbers animate from 0 to target when it scrolls into view (120, 45, 2,500,000+, 5)
- Hero watermark **अ** scrolls slower than the rest of the hero
- In OS settings, enable "reduce motion" → reload → reveals are instant, no transitions

Reload `work.html`, `services.html`, `about.html`, `blog.html`, `contact.html` and any blog post → scroll reveals work everywhere `.reveal` is present.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: scroll reveal, animated counters, hero parallax"
```

---

## Task 11: Mobile responsive polish

**Files:**
- Modify: `css/styles.css` (append responsive breakpoints section)

- [ ] **Step 1: Append responsive styles**

```css
/* 12. Responsive breakpoints ----------------------------- */
@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  /* Mobile menu */
  .nav-links {
    position: fixed; top: 0; right: -100%;
    width: 80%; max-width: 360px; height: 100vh;
    background: var(--bg-elevated);
    border-left: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    padding: 6rem 2rem 2rem;
    gap: 1.25rem;
    transition: right 0.3s ease;
    box-shadow: var(--shadow);
  }
  .nav-links.active { right: 0; }
  .nav-links a { font-size: 1.15rem; }
  .hamburger { display: flex; }
  .nav-whatsapp { display: none; }

  /* Footer */
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }

  /* Hero */
  .hero { min-height: 90vh; padding-top: 6rem; }
  .hero-ctas { flex-direction: column; align-items: stretch; }
  .hero-ctas .btn { justify-content: center; }

  /* Stats */
  .stats-strip { padding: 2rem 1rem; gap: 1.5rem; }

  /* Floating WhatsApp — smaller on mobile */
  .float-whatsapp { width: 50px; height: 50px; bottom: 1rem; right: 1rem; }
}

@media (max-width: 480px) {
  .container { width: 92%; }
  .section { padding: 3rem 0; }
  .page-hero { padding: 6rem 0 2.5rem; }
  .hero-eyebrow { font-size: 0.78rem; }
  .nav-logo img { height: 32px; }
  .work-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
}
```

- [ ] **Step 2: Manual verification — resize browser or use device emulator**

In Chrome DevTools, toggle device toolbar (Ctrl+Shift+M) and test these widths:

| Width | Expectation |
|-------|-------------|
| 1280px | Desktop layout, all grids in widest configuration |
| 1024px | Footer collapses to 2 columns, layouts otherwise unchanged |
| 768px | Hamburger appears; menu slides in from right when tapped; service blocks stack; footer single column |
| 480px (iPhone SE) | All padding reduced; hero CTAs stacked vertically; work grid = 2 columns |

Test on each page (Home, Work, Services, About, Blog, Contact, a blog post). On every page:
- Hamburger toggles menu correctly, closes when a link is tapped
- Floating WhatsApp does not overlap content
- No horizontal scroll on any page at any width

- [ ] **Step 3: Commit**

```powershell
git add -A
git commit -m "feat: mobile responsive breakpoints and slide-in nav menu"
```

---

## Task 12: Cleanup, README update, final polish & verification

**Files:**
- Delete: old `styles.css` (root), old `script.js` (root)
- Modify: `README.md`

- [ ] **Step 1: Delete the obsolete root files**

```powershell
Remove-Item -Force styles.css
Remove-Item -Force script.js
```

(The new active stylesheet is `css/styles.css`; the new JS lives under `js/`.)

- [ ] **Step 2: Verify nothing references the old files**

Confirm no remaining HTML page references `styles.css` (root) or `script.js`. The replacement references in every page should be:

- `<link rel="stylesheet" href="css/styles.css">` (root pages)
- `<link rel="stylesheet" href="../css/styles.css">` (blog post pages)
- `<script src="js/main.js">`, `<script src="js/animations.js">`, optional `<script src="js/work.js">` on work page
- Same scripts with `../js/` prefix on blog post pages

Open each HTML file (or use Find in Files in VS Code with search term `script.js"`) to confirm no leftover references.

- [ ] **Step 3: Replace `README.md`**

```markdown
# Upamanyu Creation

Premium website for Upamanyu Creation — a Nepal-based digital marketing agency offering AI-powered video ads, poster design, ad boost, ad campaigns, social media handling, and website development.

## Tech

Vanilla HTML / CSS / JS. No framework, no build step. Open any HTML file in a browser, or serve the folder with VS Code Live Server.

## Brand

- Colors: Teal `#2B6B6F` + Burnt Orange `#C85A3F`
- Logo motif: Latin "up" + Devanagari **अ** + Latin "manyu"
- Default theme: dark (light toggle persists in localStorage)

## File map

```
/
├── index.html             # Home
├── work.html              # Portfolio
├── services.html          # Services (no pricing)
├── about.html             # Story, values, team
├── blog.html              # Blog index
├── contact.html           # WhatsApp-first contact
├── blog/                  # Blog posts
├── css/styles.css         # All styles
├── js/
│   ├── main.js            # nav, theme, mobile menu
│   ├── animations.js      # reveals, counters, parallax
│   └── work.js            # work page filter + lightbox
└── assets/
    ├── logo.png
    ├── work/{videos,posters}/
    └── blog/
```

## Adding work

1. Drop video/image into `assets/work/videos/` or `assets/work/posters/`.
2. Open `work.html`, copy any existing `.work-grid .item` block, update `data-type`, `data-src`, `data-title`, `data-cat`, and the inner `<img>` thumbnail.

## Adding a blog post

1. Copy any file in `blog/` (e.g. `brand-building.html`) and rename.
2. Edit the post hero (date, title, excerpt) and the article content.
3. Open `blog.html` and add a matching `.blog-card` linking to the new file.

## Contact

WhatsApp: [+977 9744631713](https://wa.me/9779744631713)

## Documentation

- Design spec: [docs/superpowers/specs/2026-05-06-upamanyu-creation-redesign-design.md](docs/superpowers/specs/2026-05-06-upamanyu-creation-redesign-design.md)
- Implementation plan: [docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md](docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md)
```

- [ ] **Step 4: Cross-page final verification**

Walk through each page in order, in the browser:

| # | Check | Pass? |
|---|-------|-------|
| 1 | Open `index.html` in dark mode (default) — all sections render |
| 2 | Toggle theme to light — colors swap, contrast preserved |
| 3 | Reload — light mode persists |
| 4 | Toggle back to dark, navigate Home → Work → Services → About → Blog → Contact via navbar |
| 5 | Active nav link is orange on the correct page |
| 6 | Click into one blog post, then click navbar links → all paths resolve, theme persists |
| 7 | Floating WhatsApp visible on every page, opens `wa.me/9779744631713` |
| 8 | Resize to ≤768px on every page — hamburger works, no horizontal scroll |
| 9 | DevTools console — no errors on any page |
| 10 | Lighthouse on `index.html`: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 90 |

If any item fails, fix in place before moving on.

- [ ] **Step 5: Final commit**

```powershell
git add -A
git commit -m "chore: remove obsolete root css/js, update README, final polish"
```

---

## Self-Review

Run after writing the plan, before handoff. (Already done by the plan author below — the plan addresses each spec section.)

| Spec section | Implementation tasks |
|--------------|----------------------|
| §3 Brand system (colors, fonts, motif) | Task 1 (CSS variables), Task 3 (Devanagari motif utilities) |
| §4.1 Home | Task 4 |
| §4.2 Work | Task 5 |
| §4.3 Services | Task 6 |
| §4.4 About | Task 7 |
| §4.5 Blog (index + 3 posts) | Task 8 |
| §4.6 Contact | Task 9 |
| §5 Shared components (navbar, footer, floating WA) | Task 3 (canonical snippets) — pasted into Tasks 4-9 |
| §6 Animations | Task 10 (reveals, counters, parallax), Task 4 hover, Task 5 lightbox transitions |
| §7 File structure | Task 1 (scaffold) — confirmed in Task 12 |
| §8 Tech stack & accessibility (prefers-reduced-motion) | Task 1 (variables, no framework), Task 10 (reduced-motion query) |
| §9 Out of scope | EmailJS, pricing, multi-language toggle, blog CMS — none implemented (correct) |
| §10 Success criteria | Task 12 final verification checklist |

No "TBD"/"TODO"/placeholder steps. Every code step shows actual code. Type/identifier consistency: `data-counter` matches in HTML and JS; `.reveal` / `.visible` classes consistent across CSS and JS; `data-type`/`data-src`/`data-title`/`data-cat` consistent between work.html markup and work.js handlers; theme storage key (`upamanyu-theme`) used only in main.js.

---

## Execution Handoff

**Plan complete and saved to [docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md](docs/superpowers/plans/2026-05-06-upamanyu-creation-redesign.md).**

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — I execute tasks directly in this session using executing-plans, with batch checkpoints for review.

Which approach?
