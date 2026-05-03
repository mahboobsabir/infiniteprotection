/* =============================================
   Infinite Protection  — Enhanced JavaScript
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
//--------------------logo image change for dark and light mode --------------------------

function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Swap logo
    const logo = document.getElementById('logoImg');
    if (logo) {
        logo.src = isLight
            ? '/assets/images/logolight.png'
            : '/assets/images/logodark.png';
    }
}


    (function () {
        'use strict';

    /* ── Build bar chart ── */
    const barData = [26,40,30,55,34,50,62,44,58,46,36,64,70,52,78,56,44,68,83,60,48,72,78,86,66,54,80];
    const barsEl = document.getElementById('pstBars');
    if (barsEl) {
        barData.forEach(function (h, i) {
            var b = document.createElement('div');
            b.className = 'pst-bar';
            b.style.height = (h * 0.52) + 'px';
            var isG = (i % 5 === 4);
            b.style.background = isG
                ? 'linear-gradient(to top, var(--accent-green, #4ADE80), rgba(74,222,128,.3))'
                : 'linear-gradient(to top, #4aaeff, rgba(74,174,255,.3))';
            b.style.opacity = (0.38 + (h / 86) * 0.62).toFixed(2);
            barsEl.appendChild(b);
        });
        }

    /* ── Build world map dots ── */
    var wmEl = document.getElementById('pstWorldMap');
    if (wmEl) {
            var dots = [
    // N. America
    [12,30],[18,24],[22,38],[16,46],[26,42],[30,36],[14,52],[28,28],
    // S. America
    [26,64],[30,72],[24,78],[34,68],
    // Europe
    [48,18],[52,14],[56,22],[54,28],[60,16],[62,24],
    // Africa
    [50,38],[54,46],[58,56],[50,62],[56,50],[52,34],
    // Asia
    [66,18],[70,24],[74,16],[78,28],[82,20],[86,32],[90,22],[94,34],[88,14],[76,36],
    // SE Asia
    [88,44],[92,48],[96,40],
    // Australia
    [88,60],[92,66],[88,70],[96,64]
    ];
    dots.forEach(function (d) {
                var cx = (d[0] / 100) * 160;
    var cy = (d[1] / 100) * 46;
    var r  = Math.random() * 1.3 + 0.8;
    var delay = (Math.random() * 2.5).toFixed(2);
    var dur   = (1.5 + Math.random() * 2).toFixed(2);
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r',  r);
    c.setAttribute('fill', 'rgba(74,222,128,.65)');
    c.style.animation = 'pstDotPulse ' + dur + 's ' + delay + 's ease-in-out infinite';
    wmEl.appendChild(c);
            });
    // inject dot keyframe once
    if (!document.getElementById('pstDotKf')) {
                var s = document.createElement('style');
    s.id = 'pstDotKf';
    s.textContent = '@keyframes pstDotPulse{0 %, 100 % { opacity: .28; transform: scale(1) }50%{opacity:.9;transform:scale(1.6)}}';
    document.head.appendChild(s);
            }
        }

    /* ── Counter ── */
    function pstCounter(el) {
            var disp = el.dataset.display;
    if (disp) {el.textContent = disp; return; }
    var target  = parseFloat(el.dataset.target);
    var suffix  = el.dataset.suffix  || '';
    var dec     = parseInt(el.dataset.dec) || 0;
    var comma   = el.dataset.comma === '1';
    var dur     = 1700;
    var start   = performance.now();
    (function step(now) {
                var p = Math.min((now - start) / dur, 1);
    var e = 1 - Math.pow(1 - p, 3);
    var v = target * e;
    el.textContent = (comma ? Math.floor(v).toLocaleString() : v.toFixed(dec)) + suffix;
    if (p < 1) requestAnimationFrame(step);
            })(start);
        }

    /* ── Wave draw ── */
    function pstDrawWave(card) {
        card.querySelectorAll('.pst-wpath').forEach(function (p) {
            p.style.animation = 'pstWaveDraw 1.5s .2s ease forwards';
        });
    if (!document.getElementById('pstWaveKf')) {
                var s = document.createElement('style');
    s.id = 'pstWaveKf';
    s.textContent = '@keyframes pstWaveDraw{to{stroke - dashoffset:0}}';
    document.head.appendChild(s);
            }
        }

    /* ── Bars pop ── */
    function pstAnimBars(card) {
        card.querySelectorAll('.pst-bar').forEach(function (b, i) {
            setTimeout(function () { b.style.transform = 'scaleY(1)'; }, i * 16 + 80);
        });
        }

    /* ── Section header reveal ── */
    function pstRevealHeaders() {
        document.querySelectorAll('#protection-stats .pst-reveal').forEach(function (el) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) { e.target.classList.add('pst-up'); io.unobserve(e.target); }
                });
            }, { threshold: .15 });
            io.observe(el);
        });
        }

    /* ── Card reveal + animate ── */
    function pstRevealCards() {
        document.querySelectorAll('#protection-stats .pst-card').forEach(function (card) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var delay = parseInt(card.dataset.pstDelay) || 0;
                    setTimeout(function () {
                        card.classList.add('pst-visible');
                        var num = card.querySelector('.pst-num');
                        if (num) pstCounter(num);
                        pstDrawWave(card);
                        pstAnimBars(card);
                    }, delay);
                    io.unobserve(card);
                });
            }, { threshold: .12 });
            io.observe(card);
        });
        }

    /* ── Init ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            pstRevealHeaders();
            pstRevealCards();
        });
        } else {
        pstRevealHeaders();
    pstRevealCards();
        }

    }());


//--------------------------OUR TEAM ---------------
(function () {
    'use strict';

    /* ── Generate floating particles in bg ── */
    var bgEl = document.getElementById('etBg');
    if (bgEl) {
        for (var i = 0; i < 28; i++) {
            var d = document.createElement('div');
            d.className = 'et-dot' + (i % 3 === 2 ? ' et-dot--g' : '');
            var size = (Math.random() * 3 + 1.5).toFixed(1) + 'px';
            d.style.cssText = [
                '--op:' + (Math.random() * .35 + .1).toFixed(2),
                '--dur:' + (4 + Math.random() * 4).toFixed(1) + 's',
                '--del:' + (Math.random() * 4).toFixed(2) + 's',
                'width:' + size, 'height:' + size,
                'left:' + (Math.random() * 100).toFixed(1) + '%',
                'top:' + (Math.random() * 100).toFixed(1) + '%'
            ].join(';');
            bgEl.appendChild(d);
        }
    }

    /* ── Header/footer reveal ── */
    function etRevealStatics() {
        document.querySelectorAll('#expert-team .et-reveal').forEach(function (el) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) { e.target.classList.add('et-up'); io.unobserve(e.target); }
                });
            }, { threshold: .15 });
            io.observe(el);
        });
    }

    /* ── Card reveal ── */
    function etRevealCards() {
        document.querySelectorAll('#expert-team .et-card').forEach(function (card) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var delay = parseInt(card.dataset.etDelay) || 0;
                    setTimeout(function () { card.classList.add('et-visible'); }, delay);
                    io.unobserve(card);
                });
            }, { threshold: .1 });
            io.observe(card);
        });
    }

    /* ── Card click → toggle active ── */
    function etCardToggle() {
        document.querySelectorAll('#expert-team .et-card').forEach(function (card) {
            card.addEventListener('click', function () {
                document.querySelectorAll('#expert-team .et-card').forEach(function (c) {
                    c.classList.remove('et-active');
                });
                card.classList.add('et-active');
            });
        });
    }

    /* ── Init ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            etRevealStatics();
            etRevealCards();
            etCardToggle();
        });
    } else {
        etRevealStatics();
        etRevealCards();
        etCardToggle();
    }

}());


//                < !-- ════════════════════════════════════════════
//JAVASCRIPT  —  paste before </body >
//    or merge into your existing JS file
//     ════════════════════════════════════════════ -->
  
        (function () {
            'use strict';

        /* ── 1. Canvas particles ── */
        function watInitCanvas() {
        var canvas = document.getElementById('wat-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        function resize() {
            var sec = canvas.parentElement;
        canvas.width  = sec.offsetWidth;
        canvas.height = sec.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        var isLight  = document.body.classList.contains('light-mode');
        var colorB   = isLight ? '0,100,200'   : '74,174,255';
        var colorG   = isLight ? '0,160,70'    : '74,222,128';

        // Re-check theme on toggle
        var observer = new MutationObserver(function () {
            isLight = document.body.classList.contains('light-mode');
        colorB  = isLight ? '0,100,200' : '74,174,255';
        colorG  = isLight ? '0,160,70'  : '74,222,128';
        });
        observer.observe(document.body, {attributes: true, attributeFilter: ['class'] });

        var pts = Array.from({length: 55 }, function () {
            return {
            x:  Math.random(),
        y:  Math.random(),
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r:  Math.random() * 1.4 + .4,
        a:  Math.random() * .45 + .08,
                g:  Math.random() > .5
            };
        });

        var raf;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        var W = canvas.width, H = canvas.height;

        pts.forEach(function (p) {
            p.x += p.vx / W * 60;
        p.y += p.vy / H * 60;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        var col = p.g ? colorG : colorB;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + col + ',' + p.a + ')';
        ctx.fill();
            });

        // draw connections
        for (var i = 0; i < pts.length; i++) {
                for (var j = i + 1; j < pts.length; j++) {
                    var dx = (pts[i].x - pts[j].x) * canvas.width;
        var dy = (pts[i].y - pts[j].y) * canvas.height;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
                        var col = pts[i].g ? colorG : colorB;
        ctx.beginPath();
        ctx.moveTo(pts[i].x * W, pts[i].y * H);
        ctx.lineTo(pts[j].x * W, pts[j].y * H);
        ctx.strokeStyle = 'rgba(' + col + ',' + (.06 * (1 - d / 110)) + ')';
        ctx.lineWidth = .5;
        ctx.stroke();
                    }
                }
            }
        raf = requestAnimationFrame(draw);
        }
        draw();
    }

        /* ── 2. Intersection Observer — step reveal ── */
        function watReveal() {
        // Header + footer
        var headerEl = document.getElementById('watHeader');
        var footerEl = document.getElementById('watFooter');

        var genObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('wat-up');
                    genObs.unobserve(e.target);
                }
            });
        }, {threshold: .15 });

        if (headerEl) genObs.observe(headerEl);

        // Steps
        var steps = document.querySelectorAll('.wat-step');
        var stepObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    var delay = parseInt(e.target.getAttribute('data-delay') || '0', 10);
                    setTimeout(function () {
                        e.target.classList.add('wat-visible');
                    }, delay);
                    stepObs.unobserve(e.target);
                }
            });
        }, {threshold: .12 });

        steps.forEach(function (s) {stepObs.observe(s); });

        // Footer bar
        if (footerEl) {
            var ftObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('wat-visible');
                    ftObs.unobserve(e.target);
                }
            });
            }, {threshold: .2 });
        ftObs.observe(footerEl);
        }
    }

        /* ── INIT ── */
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                watInitCanvas();
                watReveal();
            });
    } else {
            watInitCanvas();
        watReveal();
    }

        })();



// Scroll reveal
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Dots
document.querySelectorAll('.t-dot').forEach((dot, i, dots) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
    });
});


