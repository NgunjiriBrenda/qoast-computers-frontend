document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("Login form not found");
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simulated login
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to homepage
        window.location.href = "index.html";
    });
});
