///* =============================================
//   ABOUT PAGE JS
//   Theme sync + scroll reveal + counter animation
//   ============================================= */



// ── Init Lucide Icons
lucide.createIcons();

// ── Theme toggle
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') { document.body.classList.add('light-mode'); themeToggle.checked = true; }
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ── Navbar shrink on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
    revealObserver.observe(el);
});

// ── Counter animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''));
    const suffix = el.dataset.suffix || (el.textContent.includes('+') ? '+' : el.textContent.includes('%') ? '%' : '');
    const duration = 1800;
    const start = performance.now();
    const startVal = 0;

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(startVal + (target - startVal) * ease);
        el.textContent = val.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const nums = e.target.querySelectorAll('.impact-number');
            nums.forEach(n => {
                if (n.dataset.target) animateCounter(n);
            });
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.impact-grid').forEach(g => counterObserver.observe(g));

// ── Spawn background particles on hero
(function spawnParticles() {
    const hero = document.getElementById('about-hero');
    if (!hero) return;
    const container = document.createElement('div');
    container.className = 'particles-bg';
    hero.appendChild(container);
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            bottom:${Math.random() * 30}%;
            animation-duration:${Math.random() * 6 + 5}s;
            animation-delay:${Math.random() * 6}s;
            opacity:${Math.random() * 0.4 + 0.1};
        `;
        container.appendChild(p);
    }
})();
//(function () {
//    'use strict';

//    /* ── Theme ── */
//    const toggle = document.getElementById('theme-toggle');

//    function applyTheme(isLight) {
//        document.body.classList.toggle('light-mode', isLight);
//        localStorage.setItem('theme', isLight ? 'light' : 'dark');
//        if (toggle) toggle.checked = isLight;
//    }

//    // Sync immediately on load (avoids flash)
//    applyTheme(localStorage.getItem('theme') === 'light');

//    if (toggle) toggle.addEventListener('change', () => applyTheme(toggle.checked));

//    // Public helper (for any inline buttons)
//    window.toggleTheme = function () {
//        applyTheme(!document.body.classList.contains('light-mode'));
//    };

//    /* ── Hamburger ── */
//    const hamburger = document.getElementById('hamburger');
//    const mobileMenu = document.getElementById('mobileMenu');
//    if (hamburger && mobileMenu) {
//        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
//    }

//    /* ── Scroll Reveal ── */
//    const revealEls = document.querySelectorAll('.reveal');
//    const revObs = new IntersectionObserver((entries) => {
//        entries.forEach(entry => {
//            if (entry.isIntersecting) {
//                entry.target.classList.add('visible');
//                revObs.unobserve(entry.target);
//            }
//        });
//    }, { threshold: 0.12 });
//    revealEls.forEach(el => revObs.observe(el));

//    /* ── Counter Animation ── */
//    function animateCounter(el) {
//        const target = parseFloat(el.dataset.count);
//        const isFloat = target % 1 !== 0;
//        const duration = 1800;
//        const step = 16;
//        const steps = duration / step;
//        const increment = target / steps;
//        let current = 0;

//        const timer = setInterval(() => {
//            current += increment;
//            if (current >= target) {
//                current = target;
//                clearInterval(timer);
//            }
//            el.textContent = isFloat
//                ? current.toFixed(1)
//                : Math.floor(current).toLocaleString();
//        }, step);
//    }

//    const statsSection = document.querySelector('.ab-hero-stats');
//    if (statsSection) {
//        const cntObs = new IntersectionObserver((entries) => {
//            entries.forEach(entry => {
//                if (entry.isIntersecting) {
//                    document.querySelectorAll('[data-count]').forEach(animateCounter);
//                    cntObs.disconnect();
//                }
//            });
//        }, { threshold: 0.4 });
//        cntObs.observe(statsSection);
//    }

//})();