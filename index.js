document.addEventListener("DOMContentLoaded", () => {

    // ===== LOGIN CHECK =====
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        });
    }

    // ===== IMAGE MODAL ELEMENTS =====
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");

    // ===== SERVICES =====
    const servicesContainer = document.getElementById("services-list");

    fetch("http://localhost:3000/services")
        .then(res => res.json())
        .then(data => {
            let services = [];

            // Safe check for JSON structure
            if (Array.isArray(data)) {
                services = data;
            } else if (data.services && Array.isArray(data.services)) {
                services = data.services;
            } else {
                servicesContainer.innerHTML = "<p>No services found.</p>";
                console.warn("Unexpected services format:", data);
                return;
            }

            servicesContainer.innerHTML = "";

            services.forEach(service => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h3>${service.title || service.name}</h3>
                    <p>${service.description}</p>
                `;

                servicesContainer.appendChild(card);
            });
        })
        .catch(err => {
            servicesContainer.innerHTML = "<p>Failed to load services.</p>";
            console.error("Services error:", err);
        });

    // ===== PRODUCTS =====
    const productContainer = document.getElementById("product-list");
    const API_URL = "http://localhost:3000/product";

    function fetchProducts() {
        fetch(API_URL)
            .then(res => res.json())
            .then(products => {
                productContainer.innerHTML = "";

                products.forEach(product => {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    `;

                    // ===== IMAGE CLICK → EXPAND =====
                    const img = card.querySelector("img");
                    img.addEventListener("click", () => {
                        modalImage.src = product.image;
                        imageModal.style.display = "flex";
                    });

                    // ===== DELETE =====
                    card.querySelector(".delete-btn")
                        .addEventListener("click", () => deleteProduct(product.id));

                    // ===== UPDATE =====
                    card.querySelector(".edit-btn")
                        .addEventListener("click", () => editProduct(product));

                    productContainer.appendChild(card);
                });
            })
            .catch(err => {
                productContainer.innerHTML = "<p>Failed to load products.</p>";
                console.error(err);
            });
    }

    // ===== DELETE PRODUCT =====
    function deleteProduct(id) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(() => fetchProducts())
        .catch(err => console.error(err));
    }

    // ===== UPDATE PRODUCT =====
    function editProduct(product) {
        const newName = prompt("Edit product name:", product.name);
        const newPrice = prompt("Edit product price:", product.price);
        const newImage = prompt("Edit image URL:", product.image);

        if (!newName || !newPrice || !newImage) return;

        fetch(`${API_URL}/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                price: newPrice,
                image: newImage
            })
        })
        .then(() => fetchProducts())
        .catch(err => console.error(err));
    }

    // ===== CLOSE IMAGE MODAL =====
    closeModal.addEventListener("click", () => {
        imageModal.style.display = "none";
    });

    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = "none";
        }
    });

    // ===== INITIAL LOAD =====
    fetchProducts();
});
