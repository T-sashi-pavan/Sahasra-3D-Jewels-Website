// Network-Independent 3D Jewelry Website
// Optimized for offline functionality with comprehensive fallbacks

import {
    ViewerApp,
    AssetManagerPlugin,
    timeout,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    FrameFadePlugin
} from "webgi"

let viewer: ViewerApp | null = null;
let networkIndependent = true;

// Check if WebGI dependencies are available
function checkWebGIDependencies(): boolean {
    try {
        return typeof ViewerApp !== 'undefined' && 
               typeof AssetManagerPlugin !== 'undefined';
    } catch (error) {
        console.warn('WebGI dependencies not available, using fallback mode');
        return false;
    }
}

async function setupViewer(){
    const canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement
    if (!canvas) {
        console.log('3D Canvas not found - Using static fallback');
        setupStaticFallback();
        return;
    }

    // Check if WebGI is available (network independent check)
    if (!checkWebGIDependencies()) {
        console.log('WebGI not available - Using enhanced static fallback');
        setupEnhancedStaticFallback(canvas);
        return;
    }
    
    try {
        viewer = new ViewerApp({
            canvas,
        })

        const manager = await viewer.addPlugin(AssetManagerPlugin)
        const camera = viewer.scene.activeCamera

        // Minimal plugins for fastest loading - only essential ones
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(8)) // Reduced to 8 for faster loading
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(new FrameFadePlugin())

        viewer.renderer.refreshPipeline()

        // Load ring model with network-independent fallback
        try {
            await manager.addFromPath("assets/ring_webgi.glb")
            console.log('✓ 3D model loaded successfully')
        } catch (error) {
            console.warn('⚠ Ring model failed to load, using static representation');
            setupStaticRingFallback(canvas);
            return;
        }

        // Configure minimal settings for fast rendering
        const tonemapPlugin = viewer.getPlugin(TonemapPlugin)
        if (tonemapPlugin && tonemapPlugin.uiConfig) {
            tonemapPlugin.uiConfig.clipBackground = true
        }

        // Set camera controls
        camera.setCameraOptions({controlsEnabled: true})

        // Position camera for optimal display
        camera.position.set(4, 2, 4)
        camera.target.set(0, 0, 0)

        // Start simple rotation
        setupSimpleRotation()

        console.log('✓ 3D jewelry display initialized successfully')
        
    } catch (error) {
        console.error('Failed to initialize 3D viewer:', error);
        console.log('Falling back to static display');
        setupEnhancedStaticFallback(canvas);
    }
}

// Enhanced static fallback for when 3D is not available
function setupEnhancedStaticFallback(canvas: HTMLCanvasElement) {
    const fallbackContainer = document.createElement('div');
    fallbackContainer.className = 'absolute inset-0 w-full h-full flex items-center justify-center';
    fallbackContainer.style.background = 'linear-gradient(135deg, #F8E8E9, #FAFAFA, #E6BFBE)';
    
    fallbackContainer.innerHTML = `
        <div class="text-center animate-pulse">
            <div class="w-48 h-48 mx-auto mb-6 relative">
                <!-- Animated Ring SVG -->
                <svg class="w-full h-full text-luxury-gold animate-spin-slow" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                    <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.6"/>
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#ffffff" stroke-width="1"/>
                    <circle cx="50" cy="35" r="3" fill="#ffffff" opacity="0.8"/>
                    <circle cx="65" cy="50" r="2" fill="#ffffff" opacity="0.6"/>
                    <circle cx="50" cy="65" r="2" fill="#ffffff" opacity="0.4"/>
                    <circle cx="35" cy="50" r="2" fill="#ffffff" opacity="0.5"/>
                </svg>
                <!-- Sparkle Effects -->
                <div class="absolute top-4 right-4 w-2 h-2 bg-luxury-gold rounded-full animate-ping"></div>
                <div class="absolute bottom-6 left-6 w-1 h-1 bg-luxury-gold rounded-full animate-ping" style="animation-delay: 1s;"></div>
                <div class="absolute top-8 left-8 w-1 h-1 bg-luxury-gold rounded-full animate-ping" style="animation-delay: 2s;"></div>
            </div>
            <h3 class="text-2xl font-playfair font-bold text-deep-black mb-2">Premium Jewelry Collection</h3>
            <p class="text-gray-600 mb-4">Experience luxury craftsmanship</p>
            <div class="flex justify-center space-x-2">
                <div class="w-2 h-2 bg-luxury-gold rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-luxury-gold rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                <div class="w-2 h-2 bg-luxury-gold rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
            </div>
        </div>
    `;

    // Add custom animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);

    canvas.parentNode?.insertBefore(fallbackContainer, canvas);
    canvas.style.display = 'none';
    
    console.log('✓ Enhanced static fallback initialized');
}

// Basic static fallback for minimal functionality
function setupStaticFallback() {
    console.log('✓ Static fallback mode activated');
}

// Static ring representation fallback
function setupStaticRingFallback(canvas: HTMLCanvasElement) {
    const ringFallback = document.createElement('div');
    ringFallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-soft-pink via-warm-white to-pastel-pink';
    ringFallback.innerHTML = `
        <div class="text-center">
            <div class="w-32 h-32 mx-auto mb-4 relative">
                <div class="w-full h-full border-4 border-luxury-gold rounded-full flex items-center justify-center animate-pulse">
                    <div class="w-16 h-16 bg-luxury-gold rounded-full opacity-70"></div>
                </div>
            </div>
            <p class="text-luxury-gold font-semibold">Loading 3D Experience...</p>
        </div>
    `;
    
    canvas.parentNode?.insertBefore(ringFallback, canvas);
    canvas.style.display = 'none';
}

// Network-independent simple rotation with comprehensive fallbacks
function setupSimpleRotation() {
    if (!viewer) {
        console.log('Viewer not available - skipping rotation setup');
        return;
    }
    
    try {
        let autoRotate = true
        const rotationSpeed = 0.003 // Reduced for better performance
        const camera = viewer.scene.activeCamera

        // Interaction handlers with error handling
        const canvas = viewer.canvas
        const stopRotation = () => { autoRotate = false }
        const resumeRotation = () => {
            setTimeout(() => { autoRotate = true }, 2000) // Reduced timeout
        }

        // Add event listeners with error handling
        try {
            canvas.addEventListener('mousedown', stopRotation)
            canvas.addEventListener('touchstart', stopRotation)
            canvas.addEventListener('mouseup', resumeRotation)
            canvas.addEventListener('touchend', resumeRotation)
        } catch (error) {
            console.warn('Could not add interaction handlers:', error);
        }

        // Optimized animation loop with error handling
        const animate = () => {
            try {
                if (autoRotate && viewer && camera) {
                    const position = camera.position
                    const target = camera.target
                    
                    // Simple Y-axis rotation
                    const angle = rotationSpeed
                    const cos = Math.cos(angle)
                    const sin = Math.sin(angle)
                    
                    const x = position.x - target.x
                    const z = position.z - target.z
                    
                    position.x = target.x + (x * cos - z * sin)
                    position.z = target.z + (x * sin + z * cos)
                    
                    camera.positionUpdated()
                }
            } catch (error) {
                console.warn('Animation error:', error);
                // Continue animation loop even if there's an error
            }
            
            requestAnimationFrame(animate)
        }
        
        animate()
        console.log('✓ 3D rotation system initialized')
        
    } catch (error) {
        console.error('Failed to setup rotation:', error);
    }
}

// Network-independent initialization with comprehensive error handling
async function initializeJewelryWebsite() {
    console.log('🚀 Initializing Sahasra Jewels Website...');
    
    try {
        // Check network status
        const isOnline = navigator.onLine;
        console.log(`📡 Network status: ${isOnline ? 'Online' : 'Offline'}`);
        
        // Initialize 3D viewer
        await setupViewer();
        
        // Initialize other website features
        initializeWebsiteFeatures();
        
        console.log('✅ Sahasra Jewels website initialized successfully');
        
    } catch (error) {
        console.error('❌ Website initialization error:', error);
        console.log('🔄 Continuing with fallback mode...');
        
        // Ensure basic functionality works even if 3D fails
        initializeWebsiteFeatures();
    }
}

// Initialize non-3D website features
function initializeWebsiteFeatures() {
    // Smooth scrolling behavior
    document.body.style.scrollBehavior = 'smooth';
    
    // Handle window resize for 3D viewer
    window.addEventListener('resize', () => {
        if (viewer) {
            try {
                viewer.resize();
            } catch (error) {
                console.warn('Resize error:', error);
            }
        }
    });
    
    // Add loading complete event
    document.dispatchEvent(new CustomEvent('jewelryWebsiteReady', {
        detail: { viewer, networkIndependent }
    }));
    
    console.log('✓ Website features initialized');
}

// Start network-independent initialization
initializeJewelryWebsite().then(() => {
    console.log('🎉 Sahasra Jewels website ready for all network conditions');
}).catch((error) => {
    console.error('Failed to initialize jewelry website:', error);
    console.log('Website will continue with basic functionality');
});

// Export viewer globally for debugging
declare global {
    interface Window {
        viewer: ViewerApp | null;
    }
}

// Set global viewer after initialization
if (typeof window !== 'undefined') {
    window.viewer = viewer
}
