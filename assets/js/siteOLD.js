const megaMenus = document.querySelectorAll('.mega-menu');

megaMenus.forEach(menu => {

    menu.addEventListener('mouseenter', function () {
        if (window.innerWidth > 992) {
            this.querySelector('.dropdown-menu').classList.add('show');
        }
    });

    menu.addEventListener('mouseleave', function () {
        if (window.innerWidth > 992) {
            this.querySelector('.dropdown-menu').classList.remove('show');
        }
    });

});
//------------NAVBAR STICK TO TOP---------------------------

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down → hide navbar
        navbar.style.top = '-100px'; // adjust based on navbar height
    } else {
        // Scrolling up → show navbar
        navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
});


//------------SLIDERS---------------------------------------

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i) {

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");

}

dots.forEach((dot, i) => {

    dot.addEventListener("click", () => {

        index = i;
        showSlide(index);

    })

});


setInterval(() => {

    index++;

    if (index >= slides.length)
        index = 0;

    showSlide(index);

}, 5000);

const nodes = document.querySelectorAll(".node");

nodes.forEach(node => {
    node.style.animation = "float 4s ease-in-out infinite";
});


// FOR THEME TOGGLE LIGHT MODE
//const toggleBtn = document.getElementById("themeToggle");

//toggleBtn.addEventListener("click", function () {

//    document.body.classList.toggle("light-mode");

//    if (document.body.classList.contains("light-mode")) {
//        localStorage.setItem("theme", "light");
//    }
//    else {
//        localStorage.setItem("theme", "dark");
//    }

//});

//const toggleBtn = document.getElementById("themeToggle");

//const savedTheme = localStorage.getItem("theme");

//if (savedTheme === "light") {
//    document.body.classList.add("light-mode");
//}

//toggleBtn.addEventListener("click", function () {

//    document.body.classList.toggle("light-mode");

//    if (document.body.classList.contains("light-mode")) {
//        localStorage.setItem("theme", "light");
//    } else {
//        localStorage.setItem("theme", "dark");
//    }

//});

const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("change", function () {

    if (this.checked) {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark");
    }
    else {
        document.body.classList.add("dark");
        document.body.classList.remove("light-mode");
    }

});





document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});


const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

        items.forEach(i => {
            if (i !== item) i.classList.remove("active");
        });

        item.classList.toggle("active");

    });

});



document.querySelectorAll(".accordion-header").forEach(header => {

    header.addEventListener("click", () => {

        const item = header.parentElement

        document.querySelectorAll(".accordion-item")
            .forEach(i => {

                if (i !== item) {
                    i.classList.remove("active")
                }

            })

        item.classList.toggle("active")

    })

})


const cards = document.querySelectorAll(".feature-card2");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";

    observer.observe(card);

});


const cta = document.querySelector(".cta-box");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cta.style.opacity = "1";
            cta.style.transform = "translateY(0)";
        }
    });
});

cta.style.opacity = "0";
cta.style.transform = "translateY(40px)";
cta.style.transition = "all .8s ease";

observer.observe(cta);


// --------------why safernet --------------------------
// Simple fade-in on scroll
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
});

/*---------------CTA PROTECTION---------------------*/

document.querySelector(".btn-primary").addEventListener("click", function () {
    alert("Redirecting to How It Works page");
});

document.querySelector(".btn-secondary").addEventListener("click", function () {
    alert("Opening demo schedule form");
});