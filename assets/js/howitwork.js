/* =============================================
   HOW IT WORKS PAGE JS
   Follows site.js theme system:
   - Theme reads body.light-mode class
   - localStorage key: 'theme' (same as site.js)
   ============================================= */

(function () {
    'use strict';

    /* ===================== THEME SYNC =====================
       Applies saved theme early to avoid flash of wrong
       theme before site.js fires on _Layout.
       ===================================================== */
    (function syncThemeEarly() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    })();

    /* ===================== HERO GLOW MOUSEMOVE =====================
       NOTE: class names fixed — was querying .glow-green/.glow-orange
       but HTML uses .hiwglow-green/.hiwglow-orange
       ============================================================== */
    const glowGreen  = document.querySelector('.hiwglow-green');
    const glowOrange = document.querySelector('.hiwglow-orange');

    if (glowGreen && glowOrange) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / 50;
            const y = e.clientY / 50;
            glowGreen.style.transform  = `translate(${x}px, ${y}px)`;
            glowOrange.style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }

    /* ===================== SCAN ALERT DOT BLINK =====================
       NOTE: selector fixed — was .alert-dot but HTML uses .scan-alert-dot
       ================================================================ */
    const alertDot = document.querySelector('.scan-alert-dot');
    if (alertDot) {
        setInterval(() => {
            alertDot.style.opacity = alertDot.style.opacity === '0' ? '1' : '0';
        }, 700);
    }

    /* ===================== SCROLL REVEAL ===================== */
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

})();
