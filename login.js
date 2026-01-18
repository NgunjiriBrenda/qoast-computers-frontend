const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";

})