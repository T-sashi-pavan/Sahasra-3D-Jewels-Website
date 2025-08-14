// Crystal Jewels E-commerce Website JavaScript - Optimized for Fast Loading

// Performance optimization: Lazy load videos and reduce initial payload
let videosLoaded = false;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    initializePage();
});

// Page initialization function
function initializePage() {
    try {
        // Ensure home page is visible
        showPage('home');
        
        // Initialize cart
        updateCartDisplay();
        
        // Initialize navigation
        updateNavigation('home');
        
        // Populate jewelry grids
        setTimeout(() => {
            populateJewelryGrids();
            console.log('Jewelry grids populated');
        }, 500);
        
        // Force video playback after a short delay
        setTimeout(() => {
            forceVideoPlayback();
        }, 1000);
        
        console.log('Page initialized successfully');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Jewelry data with videos, names, and prices
const jewelryData = {
    rings: [
        { name: "Art Deco Ring", video: "ArtDecoRing8.mp4", price: 2499.99, description: "Vintage-inspired art deco design with intricate details" },
        { name: "Classic Plain Gold Band", video: "ClassicPlainGoldBandRING2.mp4", price: 899.99, description: "Timeless classic gold band for everyday elegance" },
        { name: "Engraved Gold Ring", video: "EngravedGoldRing3.mp4", price: 1299.99, description: "Beautiful hand-engraved gold ring with traditional patterns" },
        { name: "Eternity Band", video: "EternityBandRING6.mp4", price: 3299.99, description: "Continuous diamonds around the band for eternal love" },
        { name: "Gemstone in Gold", video: "GemstoneinGoldRING10.mp4", price: 1899.99, description: "Stunning gemstone set in premium gold setting" },
        { name: "Multi-Gemstone Gold Ring", video: "GemstonesinGoldRING11.mp4", price: 2199.99, description: "Multiple precious gemstones in elegant gold design" },
        { name: "Gold Signet Ring", video: "GoldSignetRing9.mp4", price: 1599.99, description: "Classic signet ring perfect for personalization" },
        { name: "Halo Ring", video: "HaloRing5.mp4", price: 4299.99, description: "Center stone surrounded by brilliant diamond halo" },
        { name: "Infinity Gold Ring", video: "InfinityGoldRing13.mp4", price: 1199.99, description: "Symbol of eternal love in beautiful gold" },
        { name: "Matte Finish Gold Ring", video: "MatteFinishGoldRinG12.mp4", price: 1099.99, description: "Modern matte finish for contemporary style" },
        { name: "Classic Gold Ring", video: "RING1.mp4", price: 799.99, description: "Essential gold ring for any jewelry collection" },
        { name: "Solitaire Diamond Ring", video: "SolitaireDiamondRingRING4.mp4", price: 5999.99, description: "Single brilliant diamond in classic setting" },
        { name: "Twisted Rope Gold Ring", video: "TwistedRopeGoldRing7.mp4", price: 1399.99, description: "Unique twisted rope design in premium gold" }
    ],
    
    earrings: [
        { name: "Diamond Earrings Classic", video: "DIAMONDEARRINGS1.mp4", price: 2999.99, description: "Classic diamond studs for timeless elegance" },
        { name: "Diamond Earrings Elegant", video: "DIAMONDEARRINGS2.mp4", price: 3499.99, description: "Elegant diamond drops for special occasions" },
        { name: "Diamond Earrings Luxury", video: "DIAMONDEARRINGS3.mp4", price: 4299.99, description: "Luxury diamond cluster earrings" },
        { name: "Diamond Earrings Premium", video: "DIAMONDEARRINGS4.mp4", price: 3799.99, description: "Premium diamond design with brilliant cut stones" },
        { name: "Diamond Earrings Royal", video: "DIAMONDEARRINGS5.mp4", price: 5299.99, description: "Royal collection diamond chandelier earrings" },
        { name: "Gold Earrings Deluxe", video: "GOLDEARRINGS11.mp4", price: 1299.99, description: "Deluxe gold earrings with intricate craftsmanship" },
        { name: "Gold Earrings Classic", video: "GOLDEARRINGS6.mp4", price: 899.99, description: "Classic gold hoops for everyday wear" },
        { name: "Gold Earrings Traditional", video: "GOLDEARRINGS7.mp4", price: 1099.99, description: "Traditional gold design with cultural motifs" },
        { name: "Gold Earrings Modern", video: "GOLDEARRINGS8.mp4", price: 1199.99, description: "Modern geometric gold earrings" },
        { name: "Gold Earrings Designer", video: "GOLDEARRINGS9.mp4", price: 1399.99, description: "Designer gold earrings with unique patterns" },
        { name: "Platinum Earrings", video: "PLATINUMEARRINGS10.mp4", price: 2799.99, description: "Luxurious platinum earrings for special moments" }
    ],
    
    chains: [
        { name: "Box Chain", video: "BOXCHAIN3.mp4", price: 1599.99, description: "Classic box chain design in premium gold" },
        { name: "Cable Chain", video: "CABLECHAIN4.mp4", price: 1299.99, description: "Strong cable chain perfect for pendants" },
        { name: "Curb Chain", video: "CurbChain1.mp4", price: 1799.99, description: "Heavy curb chain for bold statement" },
        { name: "Figaro Chain", video: "FIGAROCHAIN5.mp4", price: 1499.99, description: "Classic figaro pattern chain" },
        { name: "Gold Necklace Chain", video: "goldnecklaceCHAINS7.mp4", price: 2299.99, description: "Elegant gold necklace chain with pendant loop" },
        { name: "Necklace Chain Premium", video: "NECKLACECHAIN9.mp4", price: 1899.99, description: "Premium necklace chain for luxury pendants" },
        { name: "Necklace Chain Deluxe", video: "NECKLACECHAINS10.mp4", price: 2199.99, description: "Deluxe multi-strand necklace chain" },
        { name: "Necklace Chain Designer", video: "NECKLACECHAINS8.mp4", price: 1999.99, description: "Designer necklace chain with unique links" },
        { name: "Singapore Chain", video: "SINGAPORECHAIN6.mp4", price: 1699.99, description: "Twisted singapore chain for sophisticated look" },
        { name: "Solid Flat Marine Chain", video: "SolidFlatMarineChain2.mp4", price: 2499.99, description: "Solid flat marine chain for durability and style" }
    ],
    
    bangles: [
        { name: "Classic Bangle", video: "BANGLES1.mp4", price: 899.99, description: "Classic gold bangle for everyday elegance" },
        { name: "Designer Bangle Set", video: "BANGLES5.mp4", price: 1599.99, description: "Set of designer bangles with intricate patterns" },
        { name: "Premium Bangle Collection", video: "BANGLES6.mp4", price: 1899.99, description: "Premium collection of matching bangles" },
        { name: "Designer Bracelet", video: "designerbracelet4.mp4", price: 1299.99, description: "Modern designer bracelet with contemporary appeal" },
        { name: "Diamond Bangle Luxury", video: "DIAMONDBANGLES10.mp4", price: 4299.99, description: "Luxury diamond-studded bangle" },
        { name: "Diamond Bangle Classic", video: "DIAMONDBANGLES8.mp4", price: 3799.99, description: "Classic diamond bangle with brilliant stones" },
        { name: "Diamond Bangle Premium", video: "DIAMONDBANGLES9.mp4", price: 4199.99, description: "Premium diamond bangle for special occasions" },
        { name: "Diamond Bangle Elegant", video: "DIAMONDSBANGLES7.mp4", price: 3999.99, description: "Elegant diamond bangle with exquisite craftsmanship" },
        { name: "Floral Gold Bangle", video: "floralgoldbangle2.mp4", price: 1199.99, description: "Beautiful floral design in premium gold" },
        { name: "Traditional Antique Bangle", video: "traditionalantique-stylegoldbangles3.mp4", price: 1499.99, description: "Traditional antique-style gold bangles" }
    ],
    
    anklets: [
        { name: "Delicate Anklet", video: "AnkletA2.mp4", price: 699.99, description: "Delicate chain anklet for subtle elegance" },
        { name: "Classic Anklet", video: "AnkletS1.mp4", price: 599.99, description: "Classic gold anklet for everyday wear" },
        { name: "Premium Anklet", video: "AnkletS3.mp4", price: 899.99, description: "Premium anklet with intricate chain design" }
    ]
};

// Enhanced Shopping cart with localStorage
let cart = JSON.parse(localStorage.getItem('jewelryCart')) || [];
let cartTotal = 0;

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('jewelryCart', JSON.stringify(cart));
}

// Current page
let currentPage = 'home';

// Make all functions globally accessible immediately
window.showPage = showPage;
window.toggleCart = toggleCart;
window.toggleMobileMenu = toggleMobileMenu;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.updateQuantity = updateQuantity;
window.whatsappCheckout = whatsappCheckout;
window.buyNow = buyNow;
window.checkout = checkout;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing website');
    
    // Force show home page
    showPage('home');
    updateCartDisplay();
    populateJewelryGrids();
    
    // Make sure home page is active
    setTimeout(() => {
        const homePage = document.getElementById('home-page');
        if (homePage) {
            homePage.classList.add('active');
            console.log('Home page activated');
        }
        
        // Hide cart sidebar if it's showing
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('translate-x-0');
            cartSidebar.classList.add('translate-x-full');
        }
    }, 100);
    
    // Performance optimizations
    optimizePerformance();
});

// Performance optimization function
function optimizePerformance() {
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based optimizations here
        }, 100);
    });
    
    // Optimize video loading on homepage
    const homeVideos = document.querySelectorAll('#home-page video');
    homeVideos.forEach(video => {
        // Reduce video quality for mobile devices
        if (window.innerWidth < 768) {
            video.style.filter = 'brightness(0.9)';
        }
    });
    
    // Ensure hero videos are visible and playing
    const heroVideos = document.querySelectorAll('.hero-video, .video-section');
    heroVideos.forEach(video => {
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => console.log('Hero video autoplay prevented:', e));
        });
        
        // Force load if not already loaded
        if (video.readyState < 1) {
            video.load();
        }
    });
    
    // Preload critical resources
    const criticalVideos = [
        'assets/images/3D JEWELLERY VIDEOS/RINGS/ALLRINGSHOMEPAGE.mp4'
    ];
    
    criticalVideos.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Page navigation
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
        // Pause all videos in hidden pages
        const videos = page.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
        currentPage = pageId;
        console.log('Page activated:', pageId);
        
        // Start videos in active page with delay for performance
        setTimeout(() => {
            const videos = targetPage.querySelectorAll('video');
            videos.forEach(video => {
                // Force play for hero videos (larger videos in category pages)
                if (video.classList.contains('hero-video') || video.classList.contains('video-section')) {
                    video.load(); // Reload the video to ensure it's ready
                    video.play().catch(e => console.log('Video autoplay prevented:', e));
                } else if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                    video.play().catch(e => console.log('Video autoplay prevented'));
                } else {
                    video.addEventListener('loadeddata', () => {
                        video.play().catch(e => console.log('Video autoplay prevented'));
                    }, { once: true });
                }
            });
        }, 300);
        
        // Update navigation active state
        updateNavigation(pageId);
        
        // Populate jewelry grids for individual category pages
        if (['rings', 'chains', 'bangles', 'earrings', 'anklets'].includes(pageId)) {
            console.log('Populating grid for category:', pageId);
            setTimeout(() => {
                if (jewelryData[pageId]) {
                    populateGrid(pageId, jewelryData[pageId]);
                }
            }, 100);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('Page not found:', pageId + '-page');
    }
}

// Update navigation active state
function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-luxury-gold', 'font-semibold');
        link.classList.add('text-deep-black');
    });
    
    // Find and highlight active nav item
    const activeNavItem = Array.from(navLinks).find(link => 
        link.textContent.toLowerCase() === activePageId.toLowerCase()
    );
    if (activeNavItem) {
        activeNavItem.classList.remove('text-deep-black');
        activeNavItem.classList.add('text-luxury-gold', 'font-semibold');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Enhanced Cart functionality with overlay and WhatsApp integration
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    const isOpen = sidebar.classList.contains('active');
    
    if (isOpen) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function addToCart(category, index, event) {
    const item = jewelryData[category][index];
    const cartItem = {
        id: `${category}-${index}`,
        name: item.name,
        price: item.price,
        category: category,
        video: item.video,
        quantity: 1,
        description: item.description || '',
        image: item.image || 'assets/images/default.png'
    };
    
    // Create flying animation if event is provided
    if (event) {
        const flyingElement = document.createElement('div');
        flyingElement.innerHTML = '💎';
        flyingElement.className = 'flying-to-cart';
        
        const rect = event.target.getBoundingClientRect();
        flyingElement.style.position = 'fixed';
        flyingElement.style.left = rect.left + 'px';
        flyingElement.style.top = rect.top + 'px';
        flyingElement.style.fontSize = '20px';
        flyingElement.style.zIndex = '9999';
        flyingElement.style.pointerEvents = 'none';
        flyingElement.style.transition = 'all 0.5s ease-in-out';
        
        document.body.appendChild(flyingElement);

        setTimeout(() => {
            const cartIcon = document.querySelector('#cart-count').parentElement;
            if (cartIcon) {
                const cartRect = cartIcon.getBoundingClientRect();
                flyingElement.style.left = cartRect.left + 'px';
                flyingElement.style.top = cartRect.top + 'px';
                flyingElement.style.transform = 'scale(0)';
                flyingElement.style.opacity = '0';
            }
        }, 10);

        setTimeout(() => {
            if (flyingElement.parentNode) {
                document.body.removeChild(flyingElement);
            }
        }, 500);
    }
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === cartItem.id);
    if (existingItem) {
        existingItem.quantity += 1;
        showAddToCartNotification(`Updated ${item.name} quantity in cart ✨`);
    } else {
        cart.push(cartItem);
        showAddToCartNotification(`${item.name} added to cart! ✨`);
    }
    
    saveCart();
    updateCartDisplay();
    
    // Pulse cart icon
    const cartIcon = document.querySelector('#cart-count').parentElement;
    if (cartIcon) {
        cartIcon.style.animation = 'cartPulse 0.6s ease-in-out';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 600);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    showAddToCartNotification('Item removed from cart');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartCount || !cartItems || !cartTotalElement) {
        console.error('Cart elements not found');
        return;
    }
    
    // Update cart count with proper visibility
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart total using INR pricing
    cartTotal = cart.reduce((sum, item) => sum + (getNumericPricePerGram(item.category) * item.quantity), 0);
    cartTotalElement.innerHTML = `
        <span class="flex items-center gap-1">
            <span class="rupee-symbol" style="font-family: 'Segoe UI', 'Arial', sans-serif; font-size: 1.2em;">₹</span>
            ${cartTotal.toLocaleString('en-IN')}
        </span>
    `;
    
    // Enhanced cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg class="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"></path>
                </svg>
                <h3 class="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p class="text-gray-400">No items in the cart yet</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image || 'assets/images/default.png'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-semibold text-deep-black">${item.name}</h4>
                    <p class="text-sm text-gray-500">${item.description || ''}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="price-rupee text-lg font-bold text-luxury-gold flex items-center gap-1">
                            <span class="rupee-symbol" style="font-family: 'Segoe UI', 'Arial', sans-serif; font-size: 1.2em; vertical-align: middle;">₹</span>
                            1 gram = ₹${getPricePerGram(item.category)}
                        </span>
                        <div class="quantity-controls">
                            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="quantity-btn">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="quantity-btn">+</button>
                        </div>
                    </div>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }
}

function showAddToCartNotification(itemName) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-luxury-gold text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Added ${itemName} to cart!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update quantity function
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Clear cart function
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    showAddToCartNotification('Cart cleared successfully');
}

// WhatsApp checkout function
function whatsappCheckout() {
    if (cart.length === 0) {
        showAddToCartNotification('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (getNumericPricePerGram(item.category) * item.quantity), 0);
    
    let message = "🌟 *Crystal Jewels Order* 🌟\n\n";
    message += "💎 *Selected Items:*\n";
    
    cart.forEach(item => {
        const itemTotal = getNumericPricePerGram(item.category) * item.quantity;
        message += `• ${item.name} x${item.quantity} - ₹${itemTotal.toLocaleString('en-IN')}\n`;
        message += `  (1 gram = ₹${getPricePerGram(item.category)})\n`;
        message += `  ${item.description || 'Beautiful jewelry piece'}\n\n`;
    });
    
    message += `💰 *Total Amount: ₹${total.toLocaleString('en-IN')}*\n\n`;
    message += "🚚 *Delivery Information:*\n";
    message += "• Free delivery within 3-5 business days\n";
    message += "• Express delivery available (24-48 hours)\n";
    message += "• All items come with authenticity certificate\n\n";
    message += "Please confirm your order and provide delivery address. Thank you for choosing Crystal Jewels! ✨";

    const phoneNumber = "916304528287"; // +91 916304528287
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    showAddToCartNotification('Redirecting to WhatsApp... 📱');
}

// Buy now functionality
function buyNow(category, index) {
    addToCart(category, index);
    toggleCart();
}

// Checkout function (alias for WhatsApp checkout)
function checkout() {
    whatsappCheckout();
}

// Populate jewelry grids
function populateJewelryGrids() {
    console.log('populateJewelryGrids called');
    console.log('jewelryData:', jewelryData);
    
    // Populate rings
    populateGrid('rings', jewelryData.rings);
    
    // Populate earrings
    populateGrid('earrings', jewelryData.earrings);
    
    // Populate chains
    populateGrid('chains', jewelryData.chains);
    
    // Populate bangles
    populateGrid('bangles', jewelryData.bangles);
    
    // Populate anklets
    populateGrid('anklets', jewelryData.anklets);
    
    console.log('All grids populated');
}

function populateGrid(category, items) {
    console.log(`Populating grid for ${category} with ${items ? items.length : 0} items`);
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) {
        console.error(`Grid not found: ${category}-grid`);
        return;
    }
    
    grid.innerHTML = '';
    
    if (!items || items.length === 0) {
        console.warn(`No items found for category: ${category}`);
        return;
    }
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'video-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100';
        
        card.innerHTML = `
            <div class="relative">
                <video class="video-player" muted loop preload="none" loading="lazy" playsinline>
                    <source src="assets/images/3D JEWELLERY VIDEOS/${category.toUpperCase()}/${item.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="absolute top-4 right-4">
                    <span class="bg-luxury-gold text-white px-2 py-1 text-xs font-semibold rounded-full">
                        ${category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-playfair font-bold text-deep-black mb-2">${item.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                
                <div class="flex items-center justify-between mb-4">
                        <span class="price-rupee text-xl font-bold text-luxury-gold flex items-center gap-1">
                            <span class="rupee-symbol" style="font-family: 'Segoe UI', 'Arial', sans-serif; font-size: 1.3em; vertical-align: middle;">₹</span>
                            1 gram = ₹${getPricePerGram(category)}
                        </span>
                    <div class="flex items-center space-x-1 text-yellow-400">
                        ${generateStars(5)}
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="addToCart('${category}', ${index})" 
                            class="flex-1 bg-deep-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Add to Cart
                    </button>
                    <button onclick="buyNow('${category}', ${index})" 
                            class="flex-1 bg-luxury-gold text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
        console.log(`Added card for ${item.name} to ${category} grid`);
        
        // Add intersection observer for video performance
        const video = card.querySelector('video');
        if (video) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Play video when in viewport
                        video.play().catch(e => console.log('Video autoplay prevented'));
                    } else {
                        // Pause video when out of viewport
                        video.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(video);
        }
    });
}
// Helper function for price per gram
function getPricePerGram(category) {
    switch (category) {
        case 'rings': return '5,000';
        case 'chains': return '6,500';
        case 'anklets': return '4,800';
        case 'bangles': return '5,800';
        case 'earrings': return '5,200';
        default: return '5,000';
    }
}

// Helper function to get numeric price per gram for calculations
function getNumericPricePerGram(category) {
    switch (category) {
        case 'rings': return 5000;
        case 'chains': return 6500;
        case 'anklets': return 4800;
        case 'bangles': return 5800;
        case 'earrings': return 5200;
        default: return 5000;
    }
}function generateStars(count) {
    let stars = '';
    for (let i = 0; i < count; i++) {
        stars += '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    return stars;
}

// Search functionality (future enhancement)
function searchJewelry(query) {
    // Implementation for search functionality
    console.log('Searching for:', query);
}

// Filter functionality (future enhancement)
function filterByPrice(minPrice, maxPrice) {
    // Implementation for price filtering
    console.log('Filtering by price:', minPrice, maxPrice);
}

// Wishlist functionality (future enhancement)
function addToWishlist(category, index) {
    // Implementation for wishlist
    console.log('Added to wishlist:', category, index);
}

// Initialize page
window.onload = function() {
    showPage('home');
};

// Make functions globally available
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.buyNow = buyNow;

// Function to force video playback
function forceVideoPlayback() {
    const currentPageId = currentPage;
    const activePage = document.getElementById(currentPageId + '-page');
    
    if (activePage) {
        const heroVideos = activePage.querySelectorAll('.hero-video, .video-section');
        heroVideos.forEach(video => {
            if (video.paused) {
                video.currentTime = 0;
                video.play().catch(e => {
                    console.log('Forcing video play:', e);
                    // Try alternative approach
                    video.muted = true;
                    video.play();
                });
            }
        });
    }
}

// Optimized loading for faster performance
function optimizePagePerformance() {
    // Lazy load videos only when needed
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.preload = 'none'; // Don't preload videos initially
        // Use a simple, valid SVG placeholder
        video.poster = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="240"%3E%3Crect width="100%25" height="100%25" fill="%23f0f0f0"/%3E%3C/svg%3E';
    });

    // Intersection Observer for lazy video loading
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                    videoObserver.unobserve(video);
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all videos
    videos.forEach(video => {
        if (video.src) {
            video.dataset.src = video.src;
            video.src = '';
        }
        videoObserver.observe(video);
    });
}

// Call optimization after initial load
window.addEventListener('load', () => {
    setTimeout(() => {
        optimizePagePerformance();
        forceVideoPlayback();
    }, 500);
});

// Make all functions globally accessible
window.showPage = showPage;
window.toggleCart = toggleCart;
window.toggleMobileMenu = toggleMobileMenu;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.forceVideoPlayback = forceVideoPlayback;
window.populateJewelryGrids = populateJewelryGrids;
window.populateGrid = populateGrid;
window.buyNow = buyNow;

// Debug function to test grid population
window.testGrids = function() {
    console.log('Testing grid population...');
    populateJewelryGrids();
};

// Force immediate execution when script loads
setTimeout(() => {
    console.log('Auto-executing populateJewelryGrids after 1 second...');
    populateJewelryGrids();
}, 1000);
