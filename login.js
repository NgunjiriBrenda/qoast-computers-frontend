document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) return; // safety check

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simulate login
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to homepage
        window.location.href = "index.html";
    });
});
