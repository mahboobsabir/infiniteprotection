/* ── 1. Scroll-reveal ── */
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

/* ── 2. FAQ accordion ── */
document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const isOpen = item.classList.contains('open');

        // close all
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            i.querySelector('.faq-body').style.maxHeight = '0';
        });

        // open clicked (if it was closed)
        if (!isOpen) {
            item.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});

/* ── 3. Pricing card hover glow ── */
document.querySelectorAll('.plan-card:not(.featured)').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 30px rgba(74,222,128,0.12)';
        card.style.borderColor = 'rgba(74,222,128,0.35)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.borderColor = '';
    });
});