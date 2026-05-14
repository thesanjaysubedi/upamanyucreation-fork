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

// ---------- Parallax (hero watermark — optional, no-op if absent) ----------
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
