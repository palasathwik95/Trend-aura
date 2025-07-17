// Product data
const PRODUCTS = [
    {
        id: 1,
        name: 'Luxury Leather Handbag',
        price: 2999.99,
        category: 'bags',
        image: 'https://images.unsplash.com/photo-1588186939549-c087e0796efd',
        description: 'Crafted with the finest leather, this luxury handbag exemplifies elegance and sophistication.'
    },
    {
        id: 2,
        name: 'Designer Stiletto Heels',
        price: 1299.99,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        description: 'Elevate your style with these meticulously crafted designer stilettos.'
    },
    {
        id: 3,
        name: 'Diamond Pendant Necklace',
        price: 4999.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
        description: 'A stunning diamond pendant that adds sparkle to any outfit.'
    },
    // Adding more products
    {
        id: 4,
        name: 'Classic Leather Wallet',
        price: 599.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
        description: 'A sophisticated leather wallet that combines style and functionality.'
    },
    {
        id: 5,
        name: 'Designer Sunglasses',
        price: 799.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666',
        description: 'Luxurious sunglasses that offer both style and protection.'
    },
    {
        id: 6,
        name: 'Silk Evening Scarf',
        price: 399.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
        description: 'A delicate silk scarf perfect for elegant evening occasions.'
    },
    // Add more products for each category...
    // This is just a sample, you can expand this to include 300+ products
];

// Function to load featured products on the homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = PRODUCTS.slice(0, 8); // Show first 8 products
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredContainer.appendChild(productCard);
        });
    }
}

// Function to create a product card element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-luxury-gold">$${product.price.toFixed(2)}</p>
                <a href="product_detail.html?id=${product.id}" class="btn btn-luxury mt-auto">View Details</a>
            </div>
        </div>
    `;
    return col;
}

// Function to load products by category
function loadProductsByCategory() {
    const productsContainer = document.getElementById('products-grid');
    if (productsContainer) {
        const category = getUrlParameter('category');
        let filteredProducts = PRODUCTS;

        if (category) {
            filteredProducts = PRODUCTS.filter(p => p.category === category);
        }

        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
}

// Function to get URL parameters
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}


// Initialize products based on the current page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html')) {
        loadFeaturedProducts();
    } else if (window.location.pathname.includes('products.html')) {
        loadProductsByCategory();
    }
});