(function () {
    /* ── THEME SYNC ── same key as site.js ── */
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
    }, { threshold: 0.09 });
    revEls.forEach(el => revObs.observe(el));

    /* ── ACCORDION ── */
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item');
            const body = item.querySelector('.faq-body');
            const isOpen = item.classList.contains('open');

            // close all in same accordion
            const siblings = item.closest('.faq-accordion').querySelectorAll('.faq-item');
            siblings.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-body').style.maxHeight = '0';
            });

            if (!isOpen) {
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* ── QUICK NAV PILLS ── */
    document.querySelectorAll('.faq-nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.faq-nav-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const target = document.getElementById(pill.dataset.target);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ── SEARCH ── */
    const searchInput = document.getElementById('faqSearch');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();

        if (!q) {
            document.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = '';
            });
            document.querySelectorAll('.faq-section').forEach(sec => {
                sec.style.display = '';
            });
            noResults.classList.remove('visible');
            return;
        }

        let totalVisible = 0;
        document.querySelectorAll('.faq-section').forEach(sec => {
            let secVisible = 0;
            sec.querySelectorAll('.faq-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(q)) {
                    item.style.display = '';
                    secVisible++;
                    totalVisible++;
                    // auto-open matching items
                    const body = item.querySelector('.faq-body');
                    item.classList.add('open');
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    item.style.display = 'none';
                    item.classList.remove('open');
                    item.querySelector('.faq-body').style.maxHeight = '0';
                }
            });
            sec.style.display = secVisible > 0 ? '' : 'none';
        });

        noResults.classList.toggle('visible', totalVisible === 0);
    });

    window.clearSearch = function () {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    };

    /* ── ACTIVE NAV PILL ON SCROLL ── */
    const sections = ['general', 'product', 'setup', 'security', 'billing'];
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 120) current = id;
        });
        if (current) {
            document.querySelectorAll('.faq-nav-pill').forEach(p => {
                p.classList.toggle('active', p.dataset.target === current);
            });
        }
    }, { passive: true });

})();