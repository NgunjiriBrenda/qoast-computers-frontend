if (localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

const servicesContainer = document.getElementById("service-list");

fetch("http://localhost:3000/services"
    .then(res => res.json())
    .then(services =>{
        servicesContainer.innerHTML = ""

        services.forEach(service => {
            const card = document.createElement("div");
            card.className="card";

            card.innerHTML=`
            <h3>${services.title}</h3>
            <p>${services.description}</p>
            `;

            servicesContainer.appendChild(card);
        });
    })
    .catch(err => {
        servicesContainer.innerHTML = "<p>Failed to load services.</p>";
        console.error(err);
    })
)