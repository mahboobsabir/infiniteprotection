(function () {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const nav = document.getElementById('mn');
    const saved = localStorage.getItem('sn-theme') || 'dark';
    html.setAttribute('data-theme', saved);

    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('sn-theme', next);
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
    }, { threshold: 0.09 });
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => obs.observe(el));

    document.querySelectorAll('.card').forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            c.style.transform = `translateY(-5px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });

    window.addEventListener('scroll', () => {
        nav.style.height = window.scrollY > 50 ? '54px' : '66px';
    }, { passive: true });
})();