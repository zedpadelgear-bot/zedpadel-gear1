// ============================================
// ZEDPADEL GEAR - MAIN JAVASCRIPT (DEBUG VERSION)
// ============================================

console.log('=== ZEDPADEL DEBUG ===');
console.log('1. Main.js loaded');

// Check if product files loaded
console.log('2. Checking for noxProducts:', typeof noxProducts !== 'undefined' ? 'FOUND' : 'NOT FOUND');
console.log('3. Checking for adidasProducts:', typeof adidasProducts !== 'undefined' ? 'FOUND' : 'NOT FOUND');
console.log('4. Checking for babolatProducts:', typeof babolatProducts !== 'undefined' ? 'FOUND' : 'NOT FOUND');

// Combine all products - make global
window.products = [
    ...(typeof noxProducts !== 'undefined' ? noxProducts : []),
    ...(typeof adidasProducts !== 'undefined' ? adidasProducts : []),
    ...(typeof babolatProducts !== 'undefined' ? babolatProducts : [])
].filter(p => p && p.id);

console.log('5. Total products loaded:', window.products.length);
console.log('6. Product IDs:', window.products.map(p => p.id));

// If no products found, show error
if (window.products.length === 0) {
    console.error('ERROR: No products found! Check that product files are loaded before main.js');
}

// Security: Sanitize HTML
function sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================
// CART FUNCTIONS
// ============================================
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('zedCart')) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('zedCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Cannot save cart:', e);
    }
}

function addToCart(productId) {
    if (!window.products || window.products.length === 0) {
        alert('Error: Products not loaded. Please refresh the page.');
        return;
    }
    
    const product = window.products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'âœ“ Added!';
    btn.style.background = '#E69628';
    btn.style.color = 'black';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#256354';
        btn.style.color = 'white';
    }, 1500);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        if (el) el.textContent = count;
    });
}

function updateCartQuantity(id, change) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart(cart);
        if (typeof renderCart === 'function') renderCart();
        updateCartCount();
    }
}

function removeCartItem(id) {
    if (confirm('Remove this item from your cart?')) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        if (typeof renderCart === 'function') renderCart();
        updateCartCount();
    }
}

// ============================================
// PRODUCT CARD GENERATOR
// ============================================
function createProductCard(product) {
    if (!product) return '';
    
    const savings = (product.originalPrice || 0) - (product.price || 0);
    const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;
    const imageUrl = sanitize(product.image) || 'https://via.placeholder.com/300x400/1a1a1a/666?text=ZEDPADEL';
    
    const buttonHtml = product.available !== false 
        ? `<button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>`
        : `<button class="add-to-cart" disabled style="background: #666; cursor: not-allowed;">Out of Stock</button>`;
    
    return `
        <div class="product-card" data-brand="${sanitize(product.brand)}" data-price="${product.price}">
            <div class="preorder-label">Pre-Order</div>
            <img src="${imageUrl}" 
                 alt="${sanitize(product.name)}" 
                 class="product-image" 
                 onclick="window.location.href='product-detail.html?id=${product.id}'" 
                 onerror="this.src='https://via.placeholder.com/300x400/1a1a1a/666?text=ZEDPADEL'">
            <div class="product-info">
                <div class="product-brand">${sanitize(product.brand)}</div>
                <div class="product-name" title="${sanitize(product.name)}">${sanitize(product.name)}</div>
                <div class="product-price">
                    <span class="current-price">ZMW ${(product.price || 0).toLocaleString()}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">ZMW ${product.originalPrice.toLocaleString()}</span>
                        <span style="color: #C0382A; font-size: 0.8rem; display: block;">Save ${savingsPercent}%</span>
                    ` : ''}
                </div>
                <div class="delivery-info">
                    <span>ðŸšš</span> Delivery 14-21 days
                </div>
                ${buttonHtml}
            </div>
        </div>
    `;
}

// ============================================
// FILTER SYSTEM
// ============================================
class ProductFilter {
    constructor() {
        this.filters = {
            category: 'all',
            brand: 'all',
            price: 'all',
            sort: 'featured'
        };
        this.filteredProducts = [];
        this.searchTimeout = null;
    }

    applyFilters() {
        if (!window.products || window.products.length === 0) {
            console.error('No products available to filter');
            return;
        }
        
        let result = [...window.products];

        // Category Filter
        if (this.filters.category !== 'all') {
            result = result.filter(p => p.category === this.filters.category);
        }

        // Brand Filter
        if (this.filters.brand !== 'all') {
            result = result.filter(p => p.brand === this.filters.brand);
        }

        // Price Filter
        if (this.filters.price !== 'all') {
            result = result.filter(p => {
                const price = p.price || 0;
                if (this.filters.price === '0-5000') return price < 5000;
                if (this.filters.price === '5000-7000') return price >= 5000 && price <= 7000;
                if (this.filters.price === '7000+') return price > 7000;
                return true;
            });
        }

        // Sorting
        if (this.filters.sort === 'price-low') {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (this.filters.sort === 'price-high') {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (this.filters.sort === 'name') {
            result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        }

        this.filteredProducts = result;
        this.renderProducts();
        this.updateCount();
    }

    renderProducts() {
        const grid = document.getElementById('shopGrid') || 
                     document.getElementById('racketsGrid') || 
                     document.getElementById('ballsGrid') ||
                     document.getElementById('bagsGrid') ||
                     document.getElementById('accessoriesGrid') ||
                     document.getElementById('featuredProducts');

        if (!grid) {
            console.log('No product grid found on this page');
            return;
        }
        
        console.log('Rendering', this.filteredProducts.length, 'products to grid');
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">No products found matching your filters.</div>';
        } else {
            grid.innerHTML = this.filteredProducts.map(p => createProductCard(p)).join('');
        }
        
        this.updateCount();
    }

    updateCount() {
        const el = document.getElementById('resultCount');
        if (el) el.textContent = this.filteredProducts.length;
    }

    resetFilters() {
        this.filters = { category: 'all', brand: 'all', price: 'all', sort: 'featured' };
        
        ['categoryFilter', 'brandFilter', 'priceFilter', 'sortFilter'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = 'all';
        });
        
        const search = document.getElementById('searchInput');
        if (search) search.value = '';
        
        this.applyFilters();
    }

    setFilter(type, value) {
        this.filters[type] = value;
        this.applyFilters();
    }

    search(term) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            if (!term) {
                this.applyFilters();
                return;
            }
            
            const searchLower = term.toLowerCase();
            const filtered = this.filteredProducts.filter(p => 
                (p.name && p.name.toLowerCase().includes(searchLower)) || 
                (p.brand && p.brand.toLowerCase().includes(searchLower))
            );
            
            const grid = document.getElementById('shopGrid');
            if (grid) {
                grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
                this.updateCount();
            }
        }, 300);
    }
}

// Initialize filter system
const filterSystem = new ProductFilter();

// ============================================
// APP INITIALIZATION
// ============================================
function initApp() {
    console.log('Initializing app...');
    
    updateCartCount();
    
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Setup filters
    const setupFilter = (id, type) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                filterSystem.setFilter(type, e.target.value);
            });
        }
    };
    
    setupFilter('categoryFilter', 'category');
    setupFilter('brandFilter', 'brand');
    setupFilter('priceFilter', 'price');
    setupFilter('sortFilter', 'sort');

    // Setup search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterSystem.search(e.target.value);
        });
    }
    
    // Load featured products on homepage
    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer && window.products && window.products.length > 0) {
        console.log('Loading featured products...');
        const featured = window.products.slice(0, 6);
        featuredContainer.innerHTML = featured.map(p => createProductCard(p)).join('');
    }
    
    // Check URL params for brand filter
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    if (brandParam && document.getElementById('brandFilter')) {
        document.getElementById('brandFilter').value = brandParam;
        filterSystem.setFilter('brand', brandParam);
    }
    
    // If on shop page with grid, apply filters
    if (document.getElementById('shopGrid') && window.products.length > 0) {
        filterSystem.applyFilters();
    }
    
    // If on rackets page
    if (document.getElementById('racketsGrid') && window.products.length > 0) {
        filterSystem.filters.category = 'rackets';
        filterSystem.applyFilters();
    }
}

// Wait for DOM and ensure products are loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
