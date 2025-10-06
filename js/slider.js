// Slider functionality for Astera Landing Page

class Slider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) return;
        
        this.track = this.slider.querySelector('.slider__track');
        this.slides = this.slider.querySelectorAll('.slide');
        this.dots = this.slider.querySelectorAll('.slider__dot');
        this.prevBtn = this.slider.querySelector('.slider__btn--prev');
        this.nextBtn = this.slider.querySelector('.slider__btn--next');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        this.setupEventListeners();
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
        this.startAutoplay();
        this.updateSlider();
        
        // Pause autoplay when user interacts
        this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());
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
        
        // Pause autoplay on focus (accessibility)
        this.slider.addEventListener('focusin', () => this.pauseAutoplay());
        this.slider.addEventListener('focusout', () => this.startAutoplay());
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            this.pauseAutoplay();
        }, { passive: true });
        
        this.slider.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
        }, { passive: true });
        
        this.slider.addEventListener('touchend', () => {
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Only handle horizontal swipes (ignore vertical scrolling)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.startAutoplay();
        }, { passive: true });
    }
    
    setupKeyboardNavigation() {
        this.slider.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        if (!this.track) return;
        
        this.isAnimating = true;
        
        // Update track position
        const translateX = -this.currentSlide * (100 / this.totalSlides);
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('slide--active', index === this.currentSlide);
        });
        
        // Update active dot
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('slider__dot--active', index === this.currentSlide);
            dot.setAttribute('aria-pressed', index === this.currentSlide);
        });
        
        // Update button states for accessibility
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', 
                `Предыдущий слайд (${this.currentSlide === 0 ? this.totalSlides : this.currentSlide} из ${this.totalSlides})`
            );
        }
        
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', 
                `Следующий слайд (${this.currentSlide + 2 > this.totalSlides ? 1 : this.currentSlide + 2} из ${this.totalSlides})`
            );
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
        
        // Trigger custom event
        this.slider.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide }
        }));
    }
    
    startAutoplay() {
        if (this.totalSlides <= 1) return;
        
        this.pauseAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    destroy() {
        this.pauseAutoplay();
        // Remove event listeners and reset styles
        if (this.track) {
            this.track.style.transform = '';
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slider = new Slider('.slider');
    
    // Make slider instance globally available
    window.sliderInstance = slider;
});

// Global functions for backward compatibility
function nextSlide() {
    if (window.sliderInstance) {
        window.sliderInstance.nextSlide();
    }
}

function prevSlide() {
    if (window.sliderInstance) {
        window.sliderInstance.prevSlide();
    }
}

function goToSlide(index) {
    if (window.sliderInstance) {
        window.sliderInstance.goToSlide(index);
    }
}

// Export functions
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;

// Handle visibility change (pause autoplay when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (window.sliderInstance) {
        if (document.hidden) {
            window.sliderInstance.pauseAutoplay();
        } else {
            window.sliderInstance.startAutoplay();
        }
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable autoplay for users who prefer reduced motion
    document.addEventListener('DOMContentLoaded', function() {
        if (window.sliderInstance) {
            window.sliderInstance.pauseAutoplay();
        }
    });
}
