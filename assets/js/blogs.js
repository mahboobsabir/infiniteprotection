(function () {
    /* ── THEME SYNC ── same key as site.js ── */
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

    /* ── CATEGORY PILL ACTIVE STATE ── */
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            document.querySelectorAll('.cat-pill').forEach(p => p.style.borderColor = '');
            this.style.borderColor = 'var(--green)';
        });
    });
})();