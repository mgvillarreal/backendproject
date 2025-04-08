# 🛒 Backend Ecommerce

This is a backend project built with **Node.js** and **Express**, featuring an ecommerce system that allows users to view products, see detailed product information, and add items to a cart. The data is persisted using **MongoDB** via **Mongoose**, and views are rendered using **Handlebars**.

---

## 📌 Main Features

- ✅ Paginated product list fetched from MongoDB.
- ✅ Individual product detail view.
- ✅ Add products to a cart directly from the product list or detail view.
- ✅ View a specific cart with only its associated products.
- ✅ RESTful routes for managing products and carts.
- ✅ Simple CSS styling (no frameworks).
- ✅ Clean folder structure with modular routes and models.

---

## 🚀 Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- HTML + CSS
- JavaScript (vanilla)

---

## 🖼️ Implemented Views

### `/products`
- Displays all products with pagination.
- Each product card includes:
  - Title, description, price, category
  - "View Details" button (goes to `/products/:pid`)
  - "Add to Cart" button (adds to a hardcoded cart)

### `/products/:pid`
- Detailed view of a specific product.
- Includes stock info and an "Add to Cart" button.

### `/carts/:cid`
- Shows all products added to a specific cart.
- Each item displays title, description, price, category, and quantity.

## ⚙️ Setup Instructions
1. Clone this repository to your local machine: `git clone https://github.com/mgvillarreal/backendproject.git`
2. Navigate to the project directory: `cd backendproject`
3. Install dependencies: `npm install`
4. Run the development server: `npm start`

## 🧪 Project Status
✅ Fully working
🚧 Still extendable
🎓 Developed for the Backend Development course at [CoderHouse](https://www.coderhouse.com/ar/)

## 👩‍💻 Author
María Gabriela Villarreal
🔗 [LinkedIn](https://www.linkedin.com/in/maria-gabriela-villarreal/).