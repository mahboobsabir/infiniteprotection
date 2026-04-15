(function () {
    /* ── THEME SYNC — same key as site.js ── */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.body.classList.add('sn-light');
        else document.body.classList.remove('sn-light');
    })();

    /* ── Also listen for external toggle changes (from layout) ── */
    const layoutToggle = document.getElementById('theme-toggle');
    if (layoutToggle) {
        layoutToggle.addEventListener('change', () => {
            if (layoutToggle.checked) document.body.classList.add('sn-light');
            else document.body.classList.remove('sn-light');
        });
    }

    /* ── Watch localStorage for cross-page theme changes ── */
    window.addEventListener('storage', e => {
        if (e.key === 'theme') {
            if (e.newValue === 'light') document.body.classList.add('sn-light');
            else document.body.classList.remove('sn-light');
        }
    });

    /* ── SCROLL REVEAL ── */
    const revEls = document.querySelectorAll(
        '.sn-reveal,.sn-reveal-left,.sn-reveal-right'
    );
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('sn-visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.10 });
    revEls.forEach(el => obs.observe(el));

    /* ── PILLAR / THREAT CARD HOVER TILT ── */
    document.querySelectorAll('.sn-pillar-card,.sn-layer-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-5px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

})();