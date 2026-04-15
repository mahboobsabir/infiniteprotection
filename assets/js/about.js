/* =============================================
   ABOUT PAGE JS
   Theme sync + scroll reveal + counter animation
   ============================================= */
(function () {
    'use strict';

    /* ── Theme ── */
    const toggle = document.getElementById('theme-toggle');

    function applyTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (toggle) toggle.checked = isLight;
    }

    // Sync immediately on load (avoids flash)
    applyTheme(localStorage.getItem('theme') === 'light');

    if (toggle) toggle.addEventListener('change', () => applyTheme(toggle.checked));

    // Public helper (for any inline buttons)
    window.toggleTheme = function () {
        applyTheme(!document.body.classList.contains('light-mode'));
    };

    /* ── Hamburger ── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }

    /* ── Scroll Reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revObs.observe(el));

    /* ── Counter Animation ── */
    function animateCounter(el) {
        const target = parseFloat(el.dataset.count);
        const isFloat = target % 1 !== 0;
        const duration = 1800;
        const step = 16;
        const steps = duration / step;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = isFloat
                ? current.toFixed(1)
                : Math.floor(current).toLocaleString();
        }, step);
    }

    const statsSection = document.querySelector('.ab-hero-stats');
    if (statsSection) {
        const cntObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('[data-count]').forEach(animateCounter);
                    cntObs.disconnect();
                }
            });
        }, { threshold: 0.4 });
        cntObs.observe(statsSection);
    }

})();