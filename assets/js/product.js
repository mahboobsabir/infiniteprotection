/* =============================================
   PRODUCT PAGE JS
   Follows site.js theme system:
   - Theme toggle reads/writes body.light-mode class
   - Theme stored in localStorage key: 'theme'
   - Same key and same class as site.js
   ============================================= */

(function () {
    'use strict';

    /* ===================== THEME SYNC =====================
       The toggle lives in _Layout and is already handled
       by site.js. All we do here is make sure the product
       page reads the same localStorage key on load so the
       page starts in the correct mode even before site.js
       fires — avoids a flash of wrong theme.
       ===================================================== */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    })();

    /* ===================== HAMBURGER ===================== */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    /* ===================== SCROLL REVEAL ===================== */
    const revealSelectors =
        '.productreveal, ' +
        '.product-feature-card, ' +
        '.product-loop-mini-card, ' +
        '.product-loop-card, ' +
        '.product-loop-result, ' +
        '.productp-loop-card, ' +
        '.productp-why-feature-card';

    const allReveal = document.querySelectorAll(revealSelectors);

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const siblings = [...entry.target.parentElement.children];
                const idx      = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    allReveal.forEach(el => revealObs.observe(el));

    /* ===================== COUNTER ANIMATION ===================== */
    function animateCounter(el) {
        const target   = parseFloat(el.dataset.count);
        const isFloat  = target % 1 !== 0;
        const duration = 1600;
        const step     = 16;
        const steps    = duration / step;
        let current    = 0;
        const increment = target / steps;

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

    const statsObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('[data-count]').forEach(animateCounter);
                statsObs.disconnect();
            }
        });
    }, { threshold: 0.4 });

    const heroStats = document.querySelector('.productp-hero-stats');
    if (heroStats) statsObs.observe(heroStats);

})();
