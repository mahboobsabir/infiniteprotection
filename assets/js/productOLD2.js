    ///* ======= THEME TOGGLE ======= */
    //const toggle = document.getElementById('themeToggle');
    //const knob = toggle.querySelector('.knob');
    //const html = document.documentElement;

    //// Load saved theme
    //const saved = localStorage.getItem('safernet-theme') || 'dark';
    //html.setAttribute('data-theme', saved);
    //updateKnobIcon(saved);

    //toggle.addEventListener('click', () => {
    //    const current = html.getAttribute('data-theme');
    //    const next = current === 'dark' ? 'light' : 'dark';
    //    html.setAttribute('data-theme', next);
    //    localStorage.setItem('safernet-theme', next);
    //    updateKnobIcon(next);
    //});

    //function updateKnobIcon(theme) {
    //    knob.textContent = theme === 'dark' ? '🌙' : '☀️';
    //}

    ///* ======= HAMBURGER ======= */
    //const hamburger = document.getElementById('hamburger');
    //const mobileMenu = document.getElementById('mobileMenu');
    //hamburger.addEventListener('click', () => {
    //    mobileMenu.classList.toggle('open');
    //});

    /* ======= THEME TOGGLE ======= */
    //const toggle = document.getElementById('themeToggle');
    //if (toggle) {
    //    const knob = toggle.querySelector('.knob');
    //    const html = document.documentElement;

    //    const saved = localStorage.getItem('safernet-theme') || 'dark';
    //    html.setAttribute('data-theme', saved);
    //    updateKnobIcon(saved);

    //    toggle.addEventListener('click', () => {
    //        const current = html.getAttribute('data-theme');
    //        const next = current === 'dark' ? 'light' : 'dark';
    //        html.setAttribute('data-theme', next);
    //        localStorage.setItem('safernet-theme', next);
    //        updateKnobIcon(next);
    //    });

    //    function updateKnobIcon(theme) {
    //        knob.textContent = theme === 'dark' ? '🌙' : '☀️';
    //    }
    //}

    /* ======= HAMBURGER ======= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    /* ======= SCROLL REVEAL ======= */
    const allReveal = document.querySelectorAll(
        '.productreveal, .product-feature-card, .product-loop-mini-card, ' +
        '.product-loop-card, .product-loop-result, .productp-loop-card, .product-why-feature-card'
    );

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // stagger siblings
                const siblings = [...entry.target.parentElement.children];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    allReveal.forEach(el => revealObs.observe(el));

    /* ======= COUNTER ANIMATION ======= */
    function animateCounter(el) {
        const target = parseFloat(el.dataset.count);
        const isFloat = target % 1 !== 0;
        const duration = 1600;
        const step = 16;
        const steps = duration / step;
        let current = 0;
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

    const heroStats = document.querySelector('.product-hero-stats');
    if (heroStats) statsObs.observe(heroStats);