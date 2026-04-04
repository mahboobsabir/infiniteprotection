/* =============================================
   USERGUIDE PAGE JS
   Follows site.js theme system:
   - Theme reads/writes body.light-mode class
   - localStorage key: 'theme' (same as site.js)
   - The layout toggle in _Layout handles toggling;
     this file only syncs early + handles page fx.
   ============================================= */
// ── Theme Toggle ──────────────────────────────────────────────────
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});

// ── Hamburger / Mobile Menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
}));

// ── Scroll Reveal ─────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Counter Animation ─────────────────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.nextSibling ? '' : '';
    let current = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target === 99 ? '%' : target === 500 ? 'K+' : '');
        if (current >= target) clearInterval(interval);
    }, 30);
}
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ── Nav shadow on scroll ──────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.2)' : '';
});