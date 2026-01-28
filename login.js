document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) return; // safety check

    form.addEventListener("submit", (e) => {
        e.preventDefault();

       
        localStorage.setItem("isLoggedIn", "true");

       
        window.location.href = "index.html";
    });
});
