document.addEventListener("DOMContentLoaded", () => {

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

   
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");

    const servicesContainer = document.getElementById("services-list");

    fetch("http://localhost:3000/services")
        .then(res => res.json())
        .then(services => {
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
            console.error(err);
        });

  
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

                
                    card.querySelector("img").addEventListener("click", () => {
                        modalImage.src = product.image;
                        imageModal.style.display = "flex";
                    });

                 
                    card.querySelector(".delete-btn")
                        .addEventListener("click", () => deleteProduct(product.id));

                
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

   
    const showFormBtn = document.getElementById("showProductsForm");
    const productForm = document.getElementById("productForm");
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productImageInput = document.getElementById("productImage");

    showFormBtn.addEventListener("click", () => {
        productForm.style.display =
            productForm.style.display === "none" ? "block" : "none";
    });

    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newProduct = {
            name: productNameInput.value.trim(),
            price: productPriceInput.value.trim(),
            image: productImageInput.value.trim()
        };

        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            alert("Please fill in all fields");
            return;
        }

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(() => {
            productForm.reset();
            productForm.style.display = "none";
            fetchProducts();
        })
        .catch(err => console.error("Add product failed:", err));
    });

    
    function deleteProduct(id) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => fetchProducts())
            .catch(err => console.error(err));
    }

  
    function editProduct(product) {
        const newName = prompt("Edit product name:", product.name);
        const newPrice = prompt("Edit product price:", product.price);
        const newImage = prompt("Edit image URL:", product.image);

        if (!newName || !newPrice || !newImage) return;

        fetch(`${API_URL}/${product.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newName,
                price: newPrice,
                image: newImage
            })
        })
        .then(() => fetchProducts())
        .catch(err => console.error(err));
    }

    closeModal.addEventListener("click", () => {
        imageModal.style.display = "none";
    });

    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = "none";
        }
    });

  
    fetchProducts();
});
