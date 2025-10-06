// Slider functionality for Astera Landing Page

class AsteraSlider {
    constructor(sliderId) {
        this.slider = document.getElementById(sliderId);
        this.slides = this.slider.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAutoPlay = true;
        this.autoPlayInterval = 5000;
        this.autoPlayTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateSlider();
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Pause autoplay on hover
        this.setupHoverEvents();
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else if (this.isAutoPlay) {
                this.startAutoPlay();
            }
        });
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            this.stopAutoPlay();
        }, { passive: true });
        
        this.slider.addEventListener('touchmove', (e) => {
            // Prevent vertical scrolling while swiping horizontally
            const deltaX = Math.abs(e.touches[0].clientX - startX);
            const deltaY = Math.abs(e.touches[0].clientY - startY);
            
            if (deltaX > deltaY) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = Math.abs(startY - endY);
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            if (this.isAutoPlay) {
                this.startAutoPlay();
            }
        }, { passive: true });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard events when slider is in viewport
            if (this.isInViewport()) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        this.toggleAutoPlay();
                        break;
                }
            }
        });
    }
    
    setupHoverEvents() {
        const sliderContainer = this.slider.closest('.slider-container');
        
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                if (this.isAutoPlay) {
                    this.startAutoPlay();
                }
            });
        }
    }
    
    isInViewport() {
        const rect = this.slider.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    updateSlider() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update slider transform
        const translateX = -this.currentSlide * 100;
        this.slider.style.transform = `translateX(${translateX}%)`;
        
        // Update ARIA attributes for accessibility
        this.updateAriaAttributes();
        
        // Trigger custom event
        this.slider.dispatchEvent(new CustomEvent('slideChange', {
            detail: {
                currentSlide: this.currentSlide,
                totalSlides: this.totalSlides
            }
        }));
    }
    
    updateAriaAttributes() {
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== this.currentSlide);
            slide.setAttribute('tabindex', index === this.currentSlide ? '0' : '-1');
        });
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', `Предыдущий слайд (${this.currentSlide + 1} из ${this.totalSlides})`);
        }
        
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', `Следующий слайд (${this.currentSlide + 1} из ${this.totalSlides})`);
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlider();
            this.resetAutoPlay();
        }
    }
    
    startAutoPlay() {
        if (this.isAutoPlay && !this.autoPlayTimer) {
            this.autoPlayTimer = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayInterval);
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        if (this.isAutoPlay) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;
        if (this.isAutoPlay) {
            this.startAutoPlay();
        } else {
            this.stopAutoPlay();
        }
    }
    
    // Public API methods
    destroy() {
        this.stopAutoPlay();
        // Remove event listeners if needed
    }
    
    setAutoPlayInterval(interval) {
        this.autoPlayInterval = interval;
        this.resetAutoPlay();
    }
    
    enableAutoPlay() {
        this.isAutoPlay = true;
        this.startAutoPlay();
    }
    
    disableAutoPlay() {
        this.isAutoPlay = false;
        this.stopAutoPlay();
    }
}

// Global slider functions for backward compatibility
let asteraSlider;

function nextSlide() {
    if (asteraSlider) {
        asteraSlider.nextSlide();
    }
}

function prevSlide() {
    if (asteraSlider) {
        asteraSlider.prevSlide();
    }
}

function currentSlide(index) {
    if (asteraSlider) {
        asteraSlider.goToSlide(index - 1); // Convert to 0-based index
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sliderElement = document.getElementById('works-slider');
    if (sliderElement) {
        asteraSlider = new AsteraSlider('works-slider');
        
        // Add custom event listeners
        sliderElement.addEventListener('slideChange', function(e) {
            console.log(`Slide changed to: ${e.detail.currentSlide + 1}/${e.detail.totalSlides}`);
        });
    }
});

// Intersection Observer for performance optimization
if ('IntersectionObserver' in window) {
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slider is visible, ensure autoplay is working
                if (asteraSlider && asteraSlider.isAutoPlay) {
                    asteraSlider.startAutoPlay();
                }
            } else {
                // Slider is not visible, pause autoplay
                if (asteraSlider) {
                    asteraSlider.stopAutoPlay();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderObserver.observe(sliderContainer);
        }
    });
}

// Preload next slide images for better performance
function preloadSlideImages() {
    if (asteraSlider) {
        const nextSlideIndex = (asteraSlider.currentSlide + 1) % asteraSlider.totalSlides;
        const nextSlide = asteraSlider.slides[nextSlideIndex];
        const images = nextSlide.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Add CSS for smooth transitions and accessibility
const sliderStyles = document.createElement('style');
sliderStyles.textContent = `
    /* Focus styles for accessibility */
    .slider-btn:focus,
    .dot:focus {
        outline: 2px solid #ffd700;
        outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .slider {
            transition: none !important;
        }
        
        .slide {
            transition: none !important;
        }
    }
    
    /* High contrast mode */
    @media (prefers-contrast: high) {
        .slider-btn {
            border-width: 3px;
        }
        
        .dot {
            border: 2px solid currentColor;
        }
    }
    
    /* Loading state */
    .slider-loading {
        opacity: 0.5;
        pointer-events: none;
    }
    
    .slider-loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        margin: -20px 0 0 -20px;
        border: 3px solid rgba(212, 175, 55, 0.3);
        border-top: 3px solid #ffd700;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(sliderStyles);
