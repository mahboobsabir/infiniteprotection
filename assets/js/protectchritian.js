(function () {
    (function () {
        const s = localStorage.getItem('theme');
        if (s === 'light') document.body.classList.add('cm-light');
        else document.body.classList.remove('cm-light');
    })();
    const lt = document.getElementById('theme-toggle');
    if (lt) lt.addEventListener('change', () => {
        if (lt.checked) document.body.classList.add('cm-light');
        else document.body.classList.remove('cm-light');
    });
    window.addEventListener('storage', e => {
        if (e.key === 'theme') {
            if (e.newValue === 'light') document.body.classList.add('cm-light');
            else document.body.classList.remove('cm-light');
        }
    });
    const els = document.querySelectorAll('.cm-reveal,.cm-rl');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('cm-in'); obs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    els.forEach(el => obs.observe(el));
    document.querySelectorAll('.cm-partner-card,.cm-three-card').forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            c.style.transform = `translateY(-6px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });
})();