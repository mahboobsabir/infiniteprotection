async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

loadComponent("navbar-placeholder", "partials/navbar.html");
loadComponent("footer-placeholder", "partials/footer.html");