const cart = [];

// Fetch products from the backend
function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Display products on the page
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <img src="${product.image_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Add product to cart
function addToCart(productId) {
    const quantity = 1;
    const product = { productId, quantity };

    fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cart.push(product);
        updateCartCount();
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
    });
}

// Update cart item count
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Modal functionality for Contact Us and About Us
var contactModal = document.getElementById("contactModal");
var aboutModal = document.getElementById("aboutModal");

var contactUsLink = document.getElementById("contactUsLink");
var aboutUsLink = document.getElementById("aboutUsLink");

var closeContactModal = document.getElementById("closeContactModal");
var closeAboutModal = document.getElementById("closeAboutModal");

contactUsLink.addEventListener("click", function(event) {
    event.preventDefault();
    contactModal.style.display = "block";
});

aboutUsLink.addEventListener("click", function(event) {
    event.preventDefault();
    aboutModal.style.display = "block";
});

closeContactModal.addEventListener("click", function() {
    contactModal.style.display = "none";
});

closeAboutModal.addEventListener("click", function() {
    aboutModal.style.display = "none";
});

// Registration and Login Modal
document.getElementById('registerLink').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'block';
});

document.getElementById('loginLink').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'block';
});

document.getElementById('closeRegisterModal').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'none';
});

document.getElementById('closeLoginModal').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
});

// Register Form Submit
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('registerModal').style.display = "none";
    })
    .catch(error => {
        console.error('Error registering user:', error);
    });
});

// Login Form Submit
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            document.getElementById('loginModal').style.display = 'none';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
});

// Call the fetchProducts function when the page loads
window.onload = fetchProducts;
