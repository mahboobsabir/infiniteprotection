/* =============================================
   DOWNLOAD PAGE JS
   Follows site.js theme system:
   - Theme reads/writes body.light-mode class
   - localStorage key: 'theme' (same as site.js)
   ============================================= */

(function () {
    'use strict';

    /* ===================== THEME SYNC =====================
       Applies saved theme immediately to avoid flash,
       and keeps the floating demo toggle in sync.
       ===================================================== */
    function syncTheme() {
        const isLight = document.body.classList.contains('light-mode');

        const icon  = document.getElementById('themeIcon');
        const label = document.getElementById('themeLabel');

        if (icon)  icon.textContent  = isLight ? '🌙' : '☀️';
        if (label) label.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }

    // Apply on load
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        syncTheme();
    })();

    /* ===================== FLOATING TOGGLE =====================
       The download page has its own floating theme button.
       Wire it to the same body.light-mode + localStorage system.
       =========================================================== */
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-mode');

            if (isLight) {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }

            // Keep layout toggle checkbox in sync if present
            const layoutToggle = document.getElementById('theme-toggle');
            if (layoutToggle) layoutToggle.checked = !isLight;

            syncTheme();
        });
    }

    /* ===================== SCROLL FADE-IN ===================== */
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

})();
