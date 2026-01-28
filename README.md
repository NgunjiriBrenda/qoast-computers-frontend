🛒 Product Management System (CRUD App)

A simple and responsive Product Management System built with HTML, CSS, and JavaScript, powered by a JSON Server as a mock backend.
This project allows an admin to add, view, and manage products dynamically using real API requests.


.

🚀 Features

🔐 Basic authentication check using localStorage

📦 Fetch and display products from a REST API

➕ Add new products dynamically

🎨 Clean and modern UI styling

⚡ Uses fetch() for API communication

🧪 Mock backend with json-server


.

🚀 Features

🔐 Basic authentication check using localStorage

📦 Fetch and display products from a REST API

➕ Add new products dynamically

🎨 Clean and modern UI styling

⚡ Uses fetch() for API communication

🧪 Mock backend with json-server
├── index.html
├── login.html
├── css/
│   └── index.css
├── js/
│   └── index.js
├── db.json
└── README.md

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/product-management-system.git
cd product-management-system

2️⃣ Install JSON Server

Make sure Node.js is installed, then run:

npm install -g json-server

3️⃣ Start the JSON Server
json-server --watch db.json --port 3000


Your API endpoints will be available at:

http://localhost:3000/products

http://localhost:3000/services (if included)

4️⃣ Run the Project

Simply open index.html in your browser.

⚠️ Ensure JSON Server is running before interacting with the app.

🔐 Authentication Logic

This project uses a simple authentication check:

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}


Only logged-in users can access the product dashboard.

➕ Adding a Product

Click the “Add Product” button

Fill in the product details

Submit the form

The product is saved via a POST request and displayed instantly

🌱 Future Improvements

✏️ Edit product functionality

🗑️ Delete products

🔍 Search & filter products

🔔 Toast notifications

🧑‍💼 Role-based authentication

📱 Improved mobile responsiveness

👩‍💻 Author

Brenda Ngunjiri
Software Engineering Student
Passionate about building clean, functional, and user-friendly web applications ✨

