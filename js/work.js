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
