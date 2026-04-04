/* ── Theme Toggle ── */
const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');
const html = document.documentElement;

const saved = localStorage.getItem('sn-theme') || 'dark';
applyTheme(saved);

toggle.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('sn-theme', next);
});

function applyTheme(t) {
    html.dataset.theme = t;
    icon.textContent = t === 'dark' ? '☀️' : '🌙';
    label.textContent = t === 'dark' ? 'Light Mode' : 'Dark Mode';
}

/* ── Scroll Fade-in ── */
const fadeEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
fadeEls.forEach(el => io.observe(el));