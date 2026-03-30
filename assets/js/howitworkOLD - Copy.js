//-----------------HOW IT WORK-------------------
const green = document.querySelector(".glow-green")
const orange = document.querySelector(".glow-orange")

window.addEventListener("mousemove", (e) => {

    let x = e.clientX / 50
    let y = e.clientY / 50

    green.style.transform = `translate(${x}px,${y}px)`
    orange.style.transform = `translate(${-x}px,${-y}px)`

})

//----------------- SAN SECTION -----------------------

const alertDot = document.querySelector(".alert-dot");

setInterval(() => {
    alertDot.style.opacity = alertDot.style.opacity === "0" ? "1" : "0";
}, 700);

// ------------------ FOR ALL OTHER SECTIONS -------------------------

/* ── Scroll-reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));