//async function loadComponent(id, file) {
//    const response = await fetch(file);
//    const html = await response.text();
//    document.getElementById(id).innerHTML = html;
//}

//loadComponent("navbar-placeholder", "partials/navbar.html");
//loadComponent("footer-placeholder", "partials/footer.html");



async function loadComponent(id, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            console.error("Failed to load:", file);
            return;
        }

        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    // Load navbar first
    await loadComponent("navbar-placeholder", "partials/navbar.html");

    // Load footer
    await loadComponent("footer-placeholder", "partials/footer.html");

    // NOW navbar exists in DOM, safe to initialize
    initTheme();
    initNavbar();
});