(function () {
    /* ── THEME SYNC — same key as site.js ── */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.body.classList.add('light-mode');
        else document.body.classList.remove('light-mode');
    })();

    /* ── SCROLL REVEAL ── */
    const revEls = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
        });
    }, { threshold: 0.08 });
    revEls.forEach(el => revObs.observe(el));

    /* ── READING PROGRESS BAR ── */
    const bar = document.getElementById('readProgress');
    window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });

    /* ── ACTIVE TOC LINK ON SCROLL ── */
    const sections = document.querySelectorAll('.pp-section[id]');
    const tocLinks = document.querySelectorAll('.toc-item a');

    const tocObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tocLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }, { rootMargin: '-10% 0px -80% 0px' });

    sections.forEach(sec => tocObs.observe(sec));

    /* ── SMOOTH SCROLL for TOC links ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.pageYOffset - 85;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

})();