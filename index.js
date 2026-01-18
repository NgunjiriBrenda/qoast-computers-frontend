if (localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

const servicesContainer = document.getElementById("service-list");

fetch("http://localhost:3000/services")
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


const productContainer = document.getElementById("product-list");

fetch("http://localhost:3000/product")
.then(res => res.json())
.then(products => {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className ="card";

        card.innerHTML=`
        <img src="${product.image}" alt="${product.name}
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        `;

        productContainer.append(card);
    });
})

.catch(err => {
    productContainer.innerHTML = "<p>Failed to load products.</p>";
    console.error(err);
});