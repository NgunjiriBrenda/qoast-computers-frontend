document.addEventListener("DOMContentLoaded", () => {
    // ====== LOGIN CHECK ======
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    }

    // ====== SERVICES ======
    const servicesContainer = document.getElementById("services-list");

    fetch("http://localhost:3000/services")
        .then(res => res.json())
        .then(data => {
            let services = [];

            // Check if JSON has services array
            if (Array.isArray(data)) {
                services = data;
            } else if (data.services && Array.isArray(data.services)) {
                services = data.services;
            } else {
                console.warn("Services data not found", data);
                servicesContainer.innerHTML = "<p>No services found.</p>";
                return;
            }

            servicesContainer.innerHTML = "";

            services.forEach(service => {
                const card = document.createElement("div");
                card.className = "card";

                // Use 'title' if exists, otherwise 'name'
                const title = service.title || service.name || "Untitled Service";

                card.innerHTML = `
                    <h3>${title}</h3>
                    <p>${service.description}</p>
                `;

                servicesContainer.appendChild(card);
            });
        })
        .catch(err => {
            servicesContainer.innerHTML = "<p>Failed to load services.</p>";
            console.error(err);
        });

    // ====== PRODUCTS ======
    const productContainer = document.getElementById("product-list");

    fetch("http://localhost:3000/product")
        .then(res => res.json())
        .then(data => {
            let products = [];

            // Check if JSON has product array
            if (Array.isArray(data)) {
                products = data;
            } else if (data.product && Array.isArray(data.product)) {
                products = data.product;
            } else {
                console.warn("Products data not found", data);
                productContainer.innerHTML = "<p>No products found.</p>";
                return;
            }

            productContainer.innerHTML = "";

            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                `;

                productContainer.appendChild(card);
            });
        })
        .catch(err => {
            productContainer.innerHTML = "<p>Failed to load products.</p>";
            console.error(err);
        });
});


