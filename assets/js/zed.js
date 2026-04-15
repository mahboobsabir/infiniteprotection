(function () {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const nav = document.getElementById('mn');
    const saved = localStorage.getItem('zed-theme') || 'dark';
    html.setAttribute('data-theme', saved);

    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('zed-theme', next);
    });

    /* scroll reveal */
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.09 });
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => obs.observe(el));

    /* card tilt */
    document.querySelectorAll('.card,.scan-card,.faq-item,.pc-card,.comp-badge').forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            c.style.transform = `translateY(-5px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });

    /* nav shrink on scroll */
    window.addEventListener('scroll', () => {
        nav.style.height = window.scrollY > 50 ? '54px' : '68px';
    }, { passive: true });

    /* animated scan bars — trigger when in view */
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.sc-bar-fill').forEach(b => {
                    b.style.animationPlayState = 'running';
                });
                barObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.surface-chart').forEach(el => {
        el.querySelectorAll('.sc-bar-fill').forEach(b => b.style.animationPlayState = 'paused');
        barObs.observe(el);
    });

    /* FAQ toggle */
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open');
            const ico = item.querySelector('.faq-icon svg path');
            if (item.classList.contains('open')) {
                ico.setAttribute('d', 'M5 12h14');
            } else {
                ico.setAttribute('d', 'M12 5v14M5 12h14');
            }
        });
    });
})();