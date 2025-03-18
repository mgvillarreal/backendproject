const socket = io();

// Update product
socket.on("actualizarProductos", (productos) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h2>${producto.title}</h2>
            <p><strong>Descripción: </strong>${producto.description}</p>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Categoría: </strong>${producto.category}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        productList.appendChild(li);
    });
});

// Add product
function agregarProducto(event) {
    event.preventDefault();
    const productForm = document.getElementById('productForm');

    const nuevoProducto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        status: document.getElementById('status').checked
    };

    socket.emit('nuevoProducto', nuevoProducto);

    productForm.reset();
}

// Delete product
function eliminarProducto(id) {
    socket.emit("eliminarProducto", id);
}

document.getElementById("productForm").addEventListener("submit", agregarProducto);