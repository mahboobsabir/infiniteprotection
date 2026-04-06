/* ── Theme toggle ── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeBtn.addEventListener('click', () => {
    const isDark = html.dataset.theme === 'dark';
    html.dataset.theme = isDark ? 'light' : 'dark';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
}));

/* ── Navbar scroll shadow ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Scroll reveal ── */
const revealAll = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealAll.forEach(el => revealObs.observe(el));

/* ── Counter animation ── */
function animCount(el) {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.ceil(target / 60);
    const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        // format with commas for large numbers
        el.textContent = cur >= 1000 ? cur.toLocaleString() : cur;
        if (cur >= target) clearInterval(iv);
    }, 25);
}
const counters = document.querySelectorAll('[data-count]');
const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { animCount(e.target); cntObs.unobserve(e.target); }
    });
}, { threshold: 0.5 });
counters.forEach(c => cntObs.observe(c));

/* ── Progress bars ── */
const fills = document.querySelectorAll('[data-width]');
const fillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%';
            fillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
fills.forEach(f => fillObs.observe(f));

/* ── Floating particles ── */
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 16 + 10}s;
    animation-delay:${Math.random() * 12}s;
    opacity:0;
  `;
    particlesEl.appendChild(p);
}

/* ── Smooth link closing ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});