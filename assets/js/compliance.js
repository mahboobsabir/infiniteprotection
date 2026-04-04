/* =============================================
   COMPLIANCE PAGE JS
   Follows site.js theme system:
   - Theme reads/writes body.light-mode class
   - localStorage key: 'theme' (same as site.js)
   - The layout toggle in _Layout handles toggling;
     this file only syncs early + handles page fx.
   ============================================= */

(function () {
    /* ── THEME SYNC — same key as site.js ── */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.body.classList.add('light-mode');
        else document.body.classList.remove('light-mode');
    })();

    /* ── SCROLL REVEAL ── */
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.10 });
    els.forEach(el => obs.observe(el));

    /* ── COMPLIANCE BADGE HOVER GLOW (non-featured cards) ── */
    document.querySelectorAll('.comp-badge').forEach(b => {
        b.style.cursor = 'pointer';
    });

})();
