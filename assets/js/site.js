/* =============================================
   SAFERNET — Enhanced JavaScript
   Scroll Reveal | Navbar | Counter | Dark Mode
   ============================================= */

(function () {
    'use strict';

    /* ──────────────────────────────────────────
       1. LIGHT / DARK MODE TOGGLE
       ────────────────────────────────────────── */
    const toggle = document.getElementById('theme-toggle');

    function applyTheme(isLight) {
        if (isLight) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark');
        }
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Restore saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        applyTheme(true);
        if (toggle) toggle.checked = true;
    }

    if (toggle) {
        toggle.addEventListener('change', function () {
            applyTheme(this.checked);
        });
    }


    /* ──────────────────────────────────────────
       2. NAVBAR — HIDE ON SCROLL DOWN, SHOW ON UP
          + shrink on scroll
       ────────────────────────────────────────── */
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function handleNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Shrink effect
        if (scrollTop > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide / show
        //if (scrollTop > lastScrollTop && scrollTop > 150) {
        //    navbar.style.top = '-100px';
        //} else {
        //    navbar.style.top = '0';
        //}
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(handleNavbar);
            ticking = true;
        }
    }, { passive: true });


    /* ──────────────────────────────────────────
       3. MEGA MENU (hover on desktop)
       ────────────────────────────────────────── */
    document.querySelectorAll('.mega-menu').forEach(function (menu) {
        menu.addEventListener('mouseenter', function () {
            if (window.innerWidth > 992) {
                const dm = this.querySelector('.dropdown-menu');
                if (dm) dm.classList.add('show');
            }
        });
        menu.addEventListener('mouseleave', function () {
            if (window.innerWidth > 992) {
                const dm = this.querySelector('.dropdown-menu');
                if (dm) dm.classList.remove('show');
            }
        });
    });


    /* ──────────────────────────────────────────
       4. SCROLL REVEAL
       ────────────────────────────────────────── */
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.stagger-children'];

    function revealOnScroll() {
        revealClasses.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top <= windowHeight * 0.88) {
                    el.classList.add('visible');
                }
            });
        });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    // Run once on load
    setTimeout(revealOnScroll, 100);


    /* ──────────────────────────────────────────
       5. COUNTER ANIMATION
       ────────────────────────────────────────── */
    function animateCounter(el, target, suffix, duration) {
        let start = 0;
        const increment = target / (duration / 16);

        function step() {
            start += increment;
            if (start >= target) {
                el.textContent = target + suffix;
            } else {
                el.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const el     = entry.target;
                const target = parseFloat(el.dataset.target || 0);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix, 1600);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter-num').forEach(function (el) {
        counterObserver.observe(el);
    });


    /* ──────────────────────────────────────────
       6. FEATURE CARDS — micro-interaction
       ────────────────────────────────────────── */
    document.querySelectorAll('.feature-card').forEach(function (card) {
        // CSS handles the hover; this adds a subtle tilt effect
        card.addEventListener('mousemove', function (e) {
            const rect   = card.getBoundingClientRect();
            const x      = (e.clientX - rect.left) / rect.width  - 0.5;
            const y      = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = 'translateY(-6px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });


    /* ──────────────────────────────────────────
       7. AI MONITOR ACCORDION
       ────────────────────────────────────────── */
    document.querySelectorAll('.sn-acc-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item   = btn.closest('.sn-acc-item');
            const isOpen = item.classList.contains('sn-open');
            document.querySelectorAll('.sn-acc-item').forEach(function (i) {
                i.classList.remove('sn-open');
                i.querySelector('.sn-acc-btn').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('sn-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* ──────────────────────────────────────────
       8. RADAR — DEVICE NODES
       ────────────────────────────────────────── */
    var DEVICES = [
        { name: 'Laptops', pct: [94, 50],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>' },
        { name: 'Mobile',  pct: [72, 88],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>' },
        { name: 'Desktop', pct: [28, 88],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>' },
        { name: 'Servers', pct: [6,  50],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>' },
        { name: 'Network', pct: [28, 12],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>' },
        { name: 'Cloud',   pct: [72, 12],   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>' },
    ];

    var container = document.getElementById('snDevices');
    var svg       = document.getElementById('snConnectorSvg');

    if (container && svg) {
        var ns = 'http://www.w3.org/2000/svg';

        DEVICES.forEach(function (d, i) {
            // Node element
            var el = document.createElement('div');
            el.className = 'sn-device';
            el.style.left = d.pct[0] + '%';
            el.style.top  = d.pct[1] + '%';
            el.style.animationDelay = (i * 0.12) + 's';
            el.innerHTML =
                '<div class="sn-device-card">' +
                    '<div class="sn-device-icon">' + d.icon + '</div>' +
                    '<span class="sn-device-name">' + d.name + '</span>' +
                    '<div class="sn-device-dot"></div>' +
                '</div>';
            container.appendChild(el);

            // SVG gradient connector
            var defs = document.createElementNS(ns, 'defs');
            var grad = document.createElementNS(ns, 'linearGradient');
            var gid  = 'snG' + i;
            grad.setAttribute('id', gid);
            grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');

            [
                ['0%',   'rgba(74,222,128,0)'],
                ['50%',  'rgba(74,222,128,0.22)'],
                ['100%', 'rgba(74,222,128,0)']
            ].forEach(function (s) {
                var stop = document.createElementNS(ns, 'stop');
                stop.setAttribute('offset', s[0]);
                stop.setAttribute('stop-color', s[1]);
                grad.appendChild(stop);
            });
            defs.appendChild(grad);
            svg.appendChild(defs);

            var line = document.createElementNS(ns, 'line');
            line.setAttribute('x1', '50%'); line.setAttribute('y1', '50%');
            line.setAttribute('x2', d.pct[0] + '%');
            line.setAttribute('y2', d.pct[1] + '%');
            line.setAttribute('stroke', 'url(#' + gid + ')');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '4 4');
            svg.appendChild(line);
        });
    }


    /* ──────────────────────────────────────────
       9. VIDEO MODAL
       ────────────────────────────────────────── */
    var videoModal  = document.getElementById('videoModal');
    var videoPlayer = document.getElementById('videoPlayer');
    var closeBtns   = document.querySelectorAll('#closeVideoBtn, .close');
    var videoBox    = document.querySelector('.video-box');

    function openVideo() {
        if (!videoModal) return;
        videoModal.style.display = 'flex';
        videoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (videoPlayer) { try { videoPlayer.play(); } catch(e) {} }
    }

    function closeVideo() {
        if (!videoModal) return;
        videoModal.style.display = 'none';
        videoModal.classList.remove('open');
        document.body.style.overflow = '';
        if (videoPlayer) { videoPlayer.pause(); videoPlayer.currentTime = 0; }
    }

    if (videoBox)   videoBox.addEventListener('click', openVideo);
    closeBtns.forEach(function (btn) { btn.addEventListener('click', closeVideo); });
    if (videoModal) {
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) closeVideo();
        });
    }
    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeVideo();
    });


    /* ──────────────────────────────────────────
       10. CTA BUTTONS — placeholder actions
       ────────────────────────────────────────── */
    var btnPrimary = document.querySelector('.cta-card .btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function () {
            window.location.href = '#video';
        });
    }

    var btnSecondary = document.querySelector('.cta-card .btn-secondary');
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function () {
            alert('Opening demo schedule form…');
        });
    }


    /* ──────────────────────────────────────────
       11. SMOOTH SCROLL for anchor links
       ────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 90;
                var top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
