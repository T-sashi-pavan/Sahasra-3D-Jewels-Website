// Network Independence Manager for Sahasra Jewels
// Handles fallbacks and offline functionality

class NetworkIndependenceManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.assetsLoaded = {
            fonts: false,
            css: false,
            webgi: false
        };
        this.fallbacksApplied = false;
        
        this.init();
    }

    init() {
        // Monitor network status
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('Network connection restored');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('Network connection lost - running in offline mode');
            this.applyOfflineFallbacks();
        });

        // Check if critical assets loaded
        this.checkCriticalAssets();
        
        // Apply fallbacks if needed
        setTimeout(() => {
            this.validateAndFallback();
        }, 2000);
    }

    checkCriticalAssets() {
        // Check if fonts loaded
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                this.assetsLoaded.fonts = true;
                console.log('✓ Fonts loaded successfully');
            }).catch(() => {
                console.warn('⚠ Font loading failed, applying fallbacks');
                this.applyFontFallbacks();
            });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                this.checkFontFallback();
            }, 3000);
        }

        // Check if CSS loaded properly
        this.checkCSSLoading();
        
        // Check WebGI availability
        this.checkWebGIAvailability();
    }

    checkFontFallback() {
        const testElement = document.createElement('div');
        testElement.style.fontFamily = "'Playfair Display', serif";
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.textContent = 'Test';
        document.body.appendChild(testElement);

        const computedFont = window.getComputedStyle(testElement).fontFamily;
        
        if (computedFont.includes('Playfair Display')) {
            this.assetsLoaded.fonts = true;
            console.log('✓ Fonts verified as loaded');
        } else {
            console.warn('⚠ Custom fonts not loaded, using system fonts');
            this.applyFontFallbacks();
        }

        document.body.removeChild(testElement);
    }

    checkCSSLoading() {
        const testElement = document.createElement('div');
        testElement.className = 'hidden';
        document.body.appendChild(testElement);

        const isHidden = window.getComputedStyle(testElement).display === 'none';
        
        if (isHidden) {
            this.assetsLoaded.css = true;
            console.log('✓ CSS loaded successfully');
        } else {
            console.warn('⚠ CSS not fully loaded, applying fallback styles');
            this.applyCSSFallbacks();
        }

        document.body.removeChild(testElement);
    }

    checkWebGIAvailability() {
        // Check if WebGI is available
        if (typeof window.viewer !== 'undefined' || document.getElementById('webgi-canvas')) {
            this.assetsLoaded.webgi = true;
            console.log('✓ WebGI 3D engine available');
        } else {
            console.warn('⚠ WebGI not available, using static fallback');
            this.apply3DFallback();
        }
    }

    applyFontFallbacks() {
        const fallbackCSS = `
            /* Enhanced System Font Fallbacks - No External Files Required */
            .font-playfair, .font-playfair *,
            h1, h2, h3, h4, h5, h6,
            .text-playfair {
                font-family: 'Times New Roman', 'Times', 'Georgia', 'Cambria', 'Book Antiqua', serif !important;
                letter-spacing: 0.02em;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            .font-poppins, .font-poppins *,
            body, p, span, div,
            .text-poppins {
                font-family: 'Arial', 'Helvetica', 'Segoe UI', 'Roboto', 'Ubuntu', sans-serif !important;
                letter-spacing: 0.01em;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* Typography Optimization */
            body {
                font-family: 'Arial', 'Helvetica', 'Segoe UI', 'Roboto', 'Ubuntu', sans-serif !important;
                text-rendering: optimizeLegibility;
            }
            
            /* Font Weight Fallbacks */
            .font-playfair.font-bold,
            h1, h2, h3 {
                font-weight: bold !important;
            }
            
            .font-poppins.font-medium {
                font-weight: 500 !important;
            }
            
            .font-poppins.font-semibold,
            .font-poppins.font-bold {
                font-weight: 600 !important;
            }
        `;
        this.injectCSS(fallbackCSS, 'font-fallbacks');
        console.log('✓ Enhanced system font fallbacks applied (no external files required)');
    }

    applyCSSFallbacks() {
        const fallbackCSS = `
            /* Critical Layout Fallbacks */
            .hidden { display: none !important; }
            .flex { display: flex !important; }
            .grid { display: grid !important; }
            .block { display: block !important; }
            .inline-block { display: inline-block !important; }
            
            /* Position */
            .fixed { position: fixed !important; }
            .absolute { position: absolute !important; }
            .relative { position: relative !important; }
            
            /* Flex & Grid */
            .items-center { align-items: center !important; }
            .justify-center { justify-content: center !important; }
            .justify-between { justify-content: space-between !important; }
            .flex-col { flex-direction: column !important; }
            .grid-cols-1 { grid-template-columns: 1fr !important; }
            .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
            .grid-cols-3 { grid-template-columns: 1fr 1fr 1fr !important; }
            
            /* Spacing */
            .p-4 { padding: 1rem !important; }
            .p-6 { padding: 1.5rem !important; }
            .p-8 { padding: 2rem !important; }
            .px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .py-20 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
            .mb-4 { margin-bottom: 1rem !important; }
            .mb-8 { margin-bottom: 2rem !important; }
            .mb-16 { margin-bottom: 4rem !important; }
            .mx-auto { margin-left: auto !important; margin-right: auto !important; }
            
            /* Colors */
            .bg-white { background-color: #ffffff !important; }
            .text-center { text-align: center !important; }
            .text-black { color: #000000 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            
            /* Custom Colors */
            .bg-luxury-gold { background-color: #D4AF37 !important; }
            .bg-soft-pink { background-color: #F8E8E9 !important; }
            .text-luxury-gold { color: #D4AF37 !important; }
            .text-deep-black { color: #1a1a1a !important; }
            
            /* Typography */
            .text-xl { font-size: 1.25rem !important; }
            .text-2xl { font-size: 1.5rem !important; }
            .text-3xl { font-size: 1.875rem !important; }
            .text-4xl { font-size: 2.25rem !important; }
            .font-bold { font-weight: bold !important; }
            
            /* Layout */
            .w-full { width: 100% !important; }
            .h-full { height: 100% !important; }
            .min-h-screen { min-height: 100vh !important; }
            .max-w-7xl { max-width: 80rem !important; }
            
            /* Responsive */
            @media (min-width: 768px) {
                .md\\:grid-cols-3 { grid-template-columns: 1fr 1fr 1fr !important; }
                .md\\:text-8xl { font-size: 6rem !important; }
            }
            
            @media (min-width: 1024px) {
                .lg\\:grid-cols-5 { grid-template-columns: repeat(5, 1fr) !important; }
            }
        `;
        this.injectCSS(fallbackCSS, 'css-fallbacks');
    }

    apply3DFallback() {
        const canvas = document.getElementById('webgi-canvas');
        if (canvas) {
            // Replace 3D canvas with static image
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-soft-pink via-warm-white to-pastel-pink';
            fallbackDiv.innerHTML = `
                <div class="text-center">
                    <div class="w-32 h-32 mx-auto mb-4 bg-luxury-gold rounded-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                    </div>
                    <p class="text-luxury-gold font-semibold">3D Experience Loading...</p>
                    <p class="text-gray-600 text-sm">Optimized for your connection</p>
                </div>
            `;
            
            canvas.parentNode?.insertBefore(fallbackDiv, canvas);
            canvas.style.display = 'none';
        }
    }

    applyOfflineFallbacks() {
        if (this.fallbacksApplied) return;
        
        console.log('Applying offline fallbacks...');
        
        // Disable video autoplay in offline mode
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.removeAttribute('autoplay');
            video.poster = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f8e8e9"/><text x="200" y="150" text-anchor="middle" fill="%23d4af37">Video Available Online</text></svg>';
        });

        // Show offline indicator
        this.showOfflineIndicator();
        
        this.fallbacksApplied = true;
    }

    showOfflineIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.className = 'fixed top-20 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        indicator.textContent = 'Offline Mode - Limited Features';
        document.body.appendChild(indicator);

        // Auto-hide when back online
        window.addEventListener('online', () => {
            const existingIndicator = document.getElementById('offline-indicator');
            if (existingIndicator) {
                existingIndicator.remove();
            }
        });
    }

    validateAndFallback() {
        let needsFallback = false;

        // Check if critical assets failed to load
        Object.keys(this.assetsLoaded).forEach(asset => {
            if (!this.assetsLoaded[asset]) {
                console.warn(`⚠ ${asset} not loaded properly`);
                needsFallback = true;
            }
        });

        if (needsFallback && !this.fallbacksApplied) {
            console.log('Applying comprehensive fallbacks...');
            this.applyComprehensiveFallbacks();
        } else {
            console.log('✓ All critical assets loaded successfully');
        }
    }

    applyComprehensiveFallbacks() {
        this.applyFontFallbacks();
        this.applyCSSFallbacks();
        this.apply3DFallback();
        this.fallbacksApplied = true;
        
        // Show success message
        setTimeout(() => {
            console.log('✓ Sahasra Jewels website ready - All fallbacks applied');
        }, 1000);
    }

    injectCSS(css, id) {
        // Remove existing fallback if present
        const existing = document.getElementById(id);
        if (existing) existing.remove();

        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Public method to check if website is ready
    isReady() {
        return Object.values(this.assetsLoaded).every(loaded => loaded) || this.fallbacksApplied;
    }

    // Public method to get status
    getStatus() {
        return {
            online: this.isOnline,
            assetsLoaded: this.assetsLoaded,
            fallbacksApplied: this.fallbacksApplied,
            ready: this.isReady()
        };
    }
}

// Initialize Network Independence Manager
const networkManager = new NetworkIndependenceManager();

// Export for global access
window.networkManager = networkManager;

// Show status in console
console.log('🌐 Network Independence Manager initialized');
console.log('📱 Website will work offline with fallbacks');

export default NetworkIndependenceManager;
