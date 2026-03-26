function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeLabel').textContent = isDark ? 'Dark Mode' : 'Light Mode';
    document.getElementById('sunIcon').style.display = isDark ? 'block' : 'none';
    document.getElementById('moonIcon').style.display = isDark ? 'none' : 'block';
}

/* Scroll-reveal animation */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = e.target.dataset.tx || 'translateY(0)';
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.about-glass-card, .about-hero-inner > *, .why-col, .pill, .about-section-title, .about-section-subtitle, .about-hero-sub, .explore-link, .expect-item ').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
    observer.observe(el);
});