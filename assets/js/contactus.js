
/* ── THEME ── */
const root = document.documentElement;
document.getElementById('contactus-themeToggle').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
});

/* ── MOBILE MENU ── */
document.getElementById('contactus-hamburger').addEventListener('click', () => {
    document.getElementById('contactus-mobileMenu').classList.toggle('open');
});
function closeMobile() { document.getElementById('contactus-mobileMenu').classList.remove('open'); }

/* ── FAQ ACCORDION ── */
function toggleFaq(contactus-btn) {
    const item = btn.closest('.contactus-faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.contactus-faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

/* ── SEND FORM ── */
function handleSend() {
    const btn = document.getElementById('contactus-sendBtn');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Send Message →'; btn.disabled = false;
        const t = document.getElementById('toast');
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3500);
    }, 1200);
}

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── STAGGER CHILDREN on card rows ── */
document.querySelectorAll('.contactus-cards-row, .contactus-contact-info').forEach(row => {
    [...row.children].forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.12}s`;
    });
});
//function toggleTheme() {
//    const html = document.documentElement;
//    const isDark = html.getAttribute('data-theme') === 'dark';
//    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
//    document.getElementById('themeLabel').textContent = isDark ? 'Dark Mode' : 'Light Mode';
//    document.getElementById('sunIcon').style.display = isDark ? 'block' : 'none';
//    document.getElementById('moonIcon').style.display = isDark ? 'none' : 'block';
//}

///* Scroll-reveal animation */
//const observer = new IntersectionObserver((entries) => {
//    entries.forEach(e => {
//        if (e.isIntersecting) {
//            e.target.style.opacity = '1';
//            e.target.style.transform = e.target.dataset.tx || 'translateY(0)';
//            observer.unobserve(e.target);
//        }
//    });
//}, { threshold: 0.12 });

//document.querySelectorAll('.about-glass-card, .about-hero-inner > *, .why-col, .pill, .about-section-title, .about-section-subtitle, .about-hero-sub, .explore-link, .expect-item ').forEach((el, i) => {
//    el.style.opacity = '0';
//    el.style.transform = 'translateY(22px)';
//    el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
//    observer.observe(el);
//});