async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

loadComponent("navbar-placeholder", "partials/navbar.html");
loadComponent("footer-placeholder", "partials/footer.html");

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error("Error loading component:", file, error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent("navbar-placeholder", "partials/navbar.html");
    await loadComponent("footer-placeholder", "partials/footer.html");

    // Initialize JS that depends on navbar
    if (typeof initTheme === "function") {
        initTheme();
    }
});