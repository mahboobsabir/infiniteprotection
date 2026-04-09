(function () {
    /* ── THEME SYNC — same key as site.js ── */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.body.classList.add('sbp-light');
        else document.body.classList.remove('sbp-light');
    })();

    /* ── Listen for external toggle changes (from layout) ── */
    const layoutToggle = document.getElementById('theme-toggle');
    if (layoutToggle) {
        layoutToggle.addEventListener('change', () => {
            if (layoutToggle.checked) document.body.classList.add('sbp-light');
            else document.body.classList.remove('sbp-light');
        });
    }

    /* ── Watch localStorage for cross-page theme changes ── */
    window.addEventListener('storage', e => {
        if (e.key === 'theme') {
            if (e.newValue === 'light') document.body.classList.add('sbp-light');
            else document.body.classList.remove('sbp-light');
        }
    });

    /* ── SCROLL REVEAL ── */
    const revEls = document.querySelectorAll(
        '.sbp-reveal,.sbp-reveal-left,.sbp-reveal-right'
    );
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('sbp-visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.10 });
    revEls.forEach(el => obs.observe(el));

    /* ── CARD HOVER TILT ── */
    document.querySelectorAll('.sbp-peace-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-5px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ── GROWTH BAR ANIMATE ON SCROLL ── */
    const bars = document.querySelectorAll('.sbp-growth-bar-fill');
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.animationPlayState = 'running';
                barObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    bars.forEach(b => {
        b.style.animationPlayState = 'paused';
        barObs.observe(b);
    });

})();