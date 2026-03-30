/* =============================================
   PRICING PAGE JS
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

    /* ===================== SCROLL REVEAL ===================== */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ===================== FAQ ACCORDION ===================== */
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item   = trigger.closest('.faq-item');
            const body   = item.querySelector('.faq-body');
            const isOpen = item.classList.contains('open');

            // close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-body').style.maxHeight = '0';
            });

            // open clicked if it was closed
            if (!isOpen) {
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* ===================== PLAN CARD HOVER GLOW =====================
       Reads current theme so glow colour matches light/dark mode.
       =============================================================== */
    document.querySelectorAll('.plan-card:not(.featured)').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const isLight = document.body.classList.contains('light-mode');
            card.style.boxShadow  = isLight
                ? '0 0 30px rgba(22,163,74,0.12)'
                : '0 0 30px rgba(74,222,128,0.12)';
            card.style.borderColor = isLight
                ? 'rgba(22,163,74,0.35)'
                : 'rgba(74,222,128,0.35)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow   = '';
            card.style.borderColor = '';
        });
    });

})();
