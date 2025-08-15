// Mobile-friendly touch interactions and location functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add touch feedback for mobile devices
    const buttons = document.querySelectorAll('.nav-button');
    
    buttons.forEach(button => {
        // Touch start effect
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        // Touch end effect
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Mouse interactions for desktop
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Get user's current location for directions
    if ('geolocation' in navigator) {
        // Show location info if available
        updateLocationInfo();
    }
    
    // Add smooth scrolling for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add mobile menu toggle if needed
    addMobileMenu();
    
    // Add GIF optimizations for better mobile performance
    addGifOptimizations();
    
    // Add touch gestures for GIF on mobile
    addGifTouchGestures();
    
    // Add audio management and fullscreen functionality
    addAudioAndFullscreenFeatures();
});

// Function to get directions using Google Maps
function getDirections() {
    const mapsUrl = 'https://maps.app.goo.gl/VhsDDZr3DoFcx5bN7';
    
    // Check if we're on mobile and can open native maps app
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Try to open in native maps app first
        const nativeMapsUrl = `geo:0,0?q=${encodeURIComponent(mapsUrl)}`;
        
        // Create a temporary link to test if native maps app opens
        const tempLink = document.createElement('a');
        tempLink.href = nativeMapsUrl;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        
        // Try to open native app, fallback to web
        try {
            tempLink.click();
            // Fallback to web after a short delay
            setTimeout(() => {
                window.open(mapsUrl, '_blank');
            }, 1000);
        } catch (e) {
            window.open(mapsUrl, '_blank');
        }
        
        document.body.removeChild(tempLink);
    } else {
        // Desktop - open in new tab
        window.open(mapsUrl, '_blank');
    }
}

// Function to update location information
async function updateLocationInfo() {
    const addressElement = document.getElementById('address');
    const coordinatesElement = document.getElementById('coordinates');
    
    try {
        // Try to get coordinates from the Google Maps URL
        // This is a simplified approach - in a real app you'd use Google Maps API
        const mapsUrl = 'https://maps.app.goo.gl/VhsDDZr3DoFcx5bN7';
        
        // For demo purposes, we'll show a placeholder
        // In a real implementation, you'd extract coordinates from the URL or use Google Maps API
        addressElement.textContent = 'Arranged Marriage Engagement Venue';
        coordinatesElement.textContent = 'Click "Open in Google Maps" for exact location';
        
    } catch (error) {
        addressElement.textContent = 'Location information unavailable';
        coordinatesElement.textContent = 'Please use the navigation buttons above';
    }
}

// Function to add mobile menu functionality
function addMobileMenu() {
    // This function can be expanded if you want to add a hamburger menu
    // For now, the current design works well on mobile without additional menu
    console.log('Mobile menu system initialized');
}

// Function to add GIF optimizations for better mobile performance
function addGifOptimizations() {
    const gifs = document.querySelectorAll('.celebration-gif');
    
    if ('IntersectionObserver' in window) {
        const gifObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const gif = entry.target;
                    gif.src = gif.dataset.src || gif.src;
                    gif.classList.remove('lazy');
                    gifObserver.unobserve(gif);
                }
            });
        });
        
        gifs.forEach(gif => {
            gifObserver.observe(gif);
        });
    }
}

// Function to add touch gestures for GIF on mobile
function addGifTouchGestures() {
    const gifContainer = document.querySelector('.image-container');
    let initialDistance = 0;
    let currentScale = 1;
    
    // Pinch to zoom functionality for mobile
    gifContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    });
    
    gifContainer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            if (initialDistance > 0) {
                const scale = currentDistance / initialDistance;
                currentScale = Math.min(Math.max(scale, 0.5), 3);
                
                const gif = this.querySelector('.celebration-gif');
                gif.style.transform = `scale(${currentScale})`;
            }
        }
    });
    
    gifContainer.addEventListener('touchend', function() {
        initialDistance = 0;
    });
    
    // Double tap to reset zoom
    let lastTap = 0;
    gifContainer.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double tap detected
            const gif = this.querySelector('.celebration-gif');
            gif.style.transform = 'scale(1)';
            currentScale = 1;
        }
        lastTap = currentTime;
    });
}

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add viewport meta tag programmatically if not present
function ensureViewportMeta() {
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
}

// Ensure viewport meta tag is present
ensureViewportMeta();

// Add mobile-specific CSS classes
function addMobileClasses() {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('mobile-device');
    }
}

addMobileClasses(); 

// Function to add audio management and fullscreen functionality
function addAudioAndFullscreenFeatures() {
    const audio = document.getElementById('background-audio');
    const gif = document.getElementById('celebration-gif');
    
    if (audio) {
        // Set audio properties for better autoplay success
        audio.loop = true;
        audio.volume = 0.7;
        audio.preload = 'auto';
        
        // Multiple autoplay strategies
        const startAudio = async () => {
            try {
                // Strategy 1: Try to play immediately
                await audio.play();
                console.log('Audio started successfully');
            } catch (error) {
                console.log('Autoplay failed, trying alternative methods:', error);
                
                // Strategy 2: Try with muted first, then unmute
                try {
                    audio.muted = true;
                    await audio.play();
                    audio.muted = false;
                    console.log('Audio started with muted strategy');
                } catch (error2) {
                    console.log('Muted strategy failed:', error2);
                    
                    // Strategy 3: Wait for user interaction
                    const playOnInteraction = async () => {
                        try {
                            audio.muted = false;
                            await audio.play();
                            console.log('Audio started on user interaction');
                            
                            // Remove all event listeners
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('touchstart', playOnInteraction);
                            document.removeEventListener('keydown', playOnInteraction);
                            document.removeEventListener('scroll', playOnInteraction);
                            document.removeEventListener('mousemove', playOnInteraction);
                        } catch (error3) {
                            console.log('Final attempt failed:', error3);
                        }
                    };
                    
                    // Add multiple event listeners to catch any interaction
                    document.addEventListener('click', playOnInteraction);
                    document.addEventListener('touchstart', playOnInteraction);
                    document.addEventListener('keydown', playOnInteraction);
                    document.addEventListener('scroll', playOnInteraction);
                    document.addEventListener('mousemove', playOnInteraction);
                }
            }
        };
        
        // Try to start audio immediately
        startAudio();
        
        // Also try on window load event
        window.addEventListener('load', startAudio);
        
        // Try on DOM content loaded
        document.addEventListener('DOMContentLoaded', startAudio);
    }
    
    if (gif) {
        // Add keyboard shortcuts for fullscreen
        document.addEventListener('keydown', function(e) {
            if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            } else if (e.key === 'Escape') {
                exitFullscreen();
            }
        });
    }
}

// Function to toggle fullscreen for GIF
function toggleFullscreen() {
    const gif = document.getElementById('celebration-gif');
    
    if (gif) {
        if (gif.classList.contains('fullscreen')) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }
}

// Function to enter fullscreen mode for GIF
function enterFullscreen() {
    const gif = document.getElementById('celebration-gif');
    
    if (gif) {
        gif.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
        
        // Update button text
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<span class="button-icon">⏹️</span> Exit Fullscreen';
        }
        
        console.log('GIF entered fullscreen mode');
    }
}

// Function to exit fullscreen mode for GIF
function exitFullscreen() {
    const gif = document.getElementById('celebration-gif');
    
    if (gif) {
        gif.classList.remove('fullscreen');
        document.body.style.overflow = 'auto';
        
        // Update button text
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<span class="button-icon">🔍</span> Fullscreen';
        }
        
        console.log('GIF exited fullscreen mode');
    }
}

// Function to toggle browser fullscreen
function toggleBrowserFullscreen() {
    if (!document.fullscreenElement) {
        // Enter browser fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Exit browser fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
} 