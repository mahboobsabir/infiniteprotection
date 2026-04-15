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


///* =============================================
//   ABOUT PAGE JS
//   Follows site.js theme system:
//   - Theme reads/writes body.light-mode class
//   - localStorage key: 'theme' (same as site.js)
//   - The layout toggle in _Layout handles toggling;
//     this file only syncs early + handles page fx.
//   ============================================= */

//(function () {
//    'use strict';

//    /* ===================== THEME SYNC =====================
//       Applies saved theme immediately to avoid flash of
//       wrong theme before site.js fires on _Layout.
//       Also keeps the floating demo button in sync.
//       ===================================================== */
//    function syncTheme() {
//        const saved   = localStorage.getItem('theme');
//        const isLight = saved === 'light';

//        if (isLight) {
//            document.body.classList.add('light-mode');
//        } else {
//            document.body.classList.remove('light-mode');
//        }

//        // Keep the floating demo toggle button in sync
//        const label    = document.getElementById('themeLabel');
//        const sunIcon  = document.getElementById('sunIcon');
//        const moonIcon = document.getElementById('moonIcon');

//        if (label)    label.textContent          = isLight ? 'Dark Mode'  : 'Light Mode';
//        if (sunIcon)  sunIcon.style.display      = isLight ? 'block'      : 'none';
//        if (moonIcon) moonIcon.style.display     = isLight ? 'none'       : 'block';
//    }

//    // Run immediately on page load
//    syncTheme();

//    /* ===================== FLOATING DEMO TOGGLE =====================
//       The about page has its own floating theme button (theme-toggle-demo).
//       Wire it to the same body.light-mode + localStorage system so it
//       stays in sync with the layout toggle in _Layout.
//       =============================================================== */
//    window.toggleTheme = function () {
//        const isLight = document.body.classList.contains('light-mode');

//        if (isLight) {
//            document.body.classList.remove('light-mode');
//            localStorage.setItem('theme', 'dark');
//        } else {
//            document.body.classList.add('light-mode');
//            localStorage.setItem('theme', 'light');
//        }

//        // Also update the layout toggle checkbox if present
//        const layoutToggle = document.getElementById('theme-toggle');
//        if (layoutToggle) layoutToggle.checked = !isLight;

//        syncTheme();
//    };

//    /* ===================== SCROLL REVEAL ===================== */
//    const revealSelectors = [
//        '.about-glass-card',
//        '.about-hero-inner > *',
//        '.why-col',
//        '.pill',
//        '.about-section-title',
//        '.about-section-subtitle',
//        '.about-hero-sub',
//        '.explore-link',
//        '.expect-item'
//    ].join(', ');

//    const revealEls = document.querySelectorAll(revealSelectors);

//    const observer = new IntersectionObserver((entries) => {
//        entries.forEach(entry => {
//            if (entry.isIntersecting) {
//                entry.target.style.opacity   = '1';
//                entry.target.style.transform = 'translateY(0)';
//                observer.unobserve(entry.target);
//            }
//        });
//    }, { threshold: 0.12 });

//    revealEls.forEach((el, i) => {
//        el.style.opacity    = '0';
//        el.style.transform  = 'translateY(22px)';
//        el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
//        observer.observe(el);
//    });

//})();
