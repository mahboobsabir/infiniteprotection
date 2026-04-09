(function () {
    (function () {
        const s = localStorage.getItem('theme');
        if (s === 'light') document.body.classList.add('mp-light');
        else document.body.classList.remove('mp-light');
    })();
    const lt = document.getElementById('theme-toggle');
    if (lt) lt.addEventListener('change', () => {
        if (lt.checked) document.body.classList.add('mp-light');
        else document.body.classList.remove('mp-light');
    });
    window.addEventListener('storage', e => {
        if (e.key === 'theme') {
            if (e.newValue === 'light') document.body.classList.add('mp-light');
            else document.body.classList.remove('mp-light');
        }
    });
    const els = document.querySelectorAll('.mp-reveal,.mp-rl');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('mp-in'); obs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    els.forEach(el => obs.observe(el));
    document.querySelectorAll('.mp-promote-card,.mp-loc-card').forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            c.style.transform = `translateY(-5px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });
})();