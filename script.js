document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartLink();

    if (document.getElementById('product-list')) {
        displayProducts();
    }

    if (document.getElementById('product-detail')) {
        displayProductDetail();
    }

    if (document.getElementById('add-to-cart')) {
        document.getElementById('add-to-cart').addEventListener('click', addToCart);
    }

    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
});

function displayProducts() {
    const products = getProducts();
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div>
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        </div>
    `).join('');
}

function displayProductDetail() {
    const id = new URLSearchParams(window.location.search).get('id');
    const product = getProducts().find(p => p.id == id);

    if (product) {
        document.getElementById('product-detail').innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Description: A great product.</p>
        `;
    }
}

function addToCart() {
    const id = new URLSearchParams(window.location.search).get('id');
    const product = getProducts().find(p => p.id == id);

    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartLink();
        alert('Product added to cart');
    }
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartLink();
}

function updateCartLink() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.innerText = `Cart (${cart.length})`;
    }
}

function getProducts() {
    return [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];
}

