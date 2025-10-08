// Advanced Slider Implementation for Astera Landing Page

class AsteraSlider {
    constructor(container, options = {}) {
        this.container = container;
        this.slides = container.querySelectorAll('.slider-slide');
        this.prevBtn = container.querySelector('.slider-prev');
        this.nextBtn = container.querySelector('.slider-next');
        this.indicators = container.querySelector('.slider-indicators');
        
        // Options
        this.options = {
            autoplay: options.autoplay || true,
            autoplayDelay: options.autoplayDelay || 5000,
            loop: options.loop !== false,
            transition: options.transition || 'slide',
            transitionDuration: options.transitionDuration || 600,
            pauseOnHover: options.pauseOnHover !== false,
            swipe: options.swipe !== false,
            ...options
        };
        
        // State
        this.currentSlide = 0;
        this.isTransitioning = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.createIndicators();
        this.bindEvents();
        this.updateSlider();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Initialize first slide
        this.slides[0].classList.add('active');
        this.updateIndicators();
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'slider-indicator';
            indicator.setAttribute('aria-label', `Слайд ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
        
        this.indicatorButtons = this.indicators.querySelectorAll('.slider-indicator');
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
        
        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
        
        // Touch/swipe support
        if (this.options.swipe) {
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
            
            // Mouse drag support
            let isDragging = false;
            let startX = 0;
            
            this.container.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                this.container.style.cursor = 'grabbing';
                e.preventDefault();
            });
            
            this.container.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });
            
            this.container.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                this.container.style.cursor = '';
                
                const endX = e.clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            });
            
            this.container.addEventListener('mouseleave', () => {
                isDragging = false;
                this.container.style.cursor = '';
            });
        }
        
        // Intersection Observer for lazy loading
        this.initLazyLoading();
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    initLazyLoading() {
        const images = this.container.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        const prevSlide = this.currentSlide;
        this.currentSlide = index;
        
        this.updateSlider(prevSlide);
        this.updateIndicators();
        
        // Reset autoplay
        if (this.options.autoplay) {
            this.resetAutoplay();
        }
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        
        if (nextIndex >= this.slides.length) {
            nextIndex = this.options.loop ? 0 : this.slides.length - 1;
        }
        
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        
        if (prevIndex < 0) {
            prevIndex = this.options.loop ? this.slides.length - 1 : 0;
        }
        
        this.goToSlide(prevIndex);
    }
    
    updateSlider(prevSlideIndex = null) {
        this.isTransitioning = true;
        
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
        
        // Add classes based on position
        this.slides[this.currentSlide].classList.add('active');
        
        if (prevSlideIndex !== null) {
            this.slides[prevSlideIndex].classList.add('prev');
        }
        
        // Add next class for preview
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.slides[nextIndex].classList.add('next');
        
        // Apply transition effect
        this.applyTransition();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.options.transitionDuration);
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: {
                currentSlide: this.currentSlide,
                previousSlide: prevSlideIndex,
                totalSlides: this.slides.length
            }
        }));
    }
    
    applyTransition() {
        const slidesContainer = this.container.querySelector('.slider-slides');
        
        switch (this.options.transition) {
            case 'fade':
                this.applyFadeTransition();
                break;
            case 'slide':
            default:
                this.applySlideTransition(slidesContainer);
                break;
        }
    }
    
    applySlideTransition(container) {
        if (!container) return;
        
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        container.style.transition = `transform ${this.options.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }
    
    applyFadeTransition() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
            slide.style.transition = `opacity ${this.options.transitionDuration}ms ease`;
        });
    }
    
    updateIndicators() {
        if (!this.indicatorButtons) return;
        
        this.indicatorButtons.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoplay() {
        if (!this.options.autoplay) return;
        
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    resumeAutoplay() {
        if (this.options.autoplay && !this.autoplayTimer) {
            this.startAutoplay();
        }
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
    
    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', () => this.nextSlide());
        }
        
        // Reset styles
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
            slide.style.opacity = '';
            slide.style.zIndex = '';
            slide.style.transition = '';
        });
        
        const slidesContainer = this.container.querySelector('.slider-slides');
        if (slidesContainer) {
            slidesContainer.style.transform = '';
            slidesContainer.style.transition = '';
        }
    }
}

// Initialize slider when DOM is ready
function initializeSlider() {
    const sliderContainers = document.querySelectorAll('.astera-slider');
    
    sliderContainers.forEach(container => {
        // Get options from data attributes
        const options = {
            autoplay: container.dataset.autoplay !== 'false',
            autoplayDelay: parseInt(container.dataset.autoplayDelay) || 5000,
            loop: container.dataset.loop !== 'false',
            transition: container.dataset.transition || 'slide',
            transitionDuration: parseInt(container.dataset.transitionDuration) || 600,
            pauseOnHover: container.dataset.pauseOnHover !== 'false',
            swipe: container.dataset.swipe !== 'false'
        };
        
        // Initialize slider
        const slider = new AsteraSlider(container, options);
        
        // Store reference for potential later use
        container.asteraSlider = slider;
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AsteraSlider;
}

// Global access
window.AsteraSlider = AsteraSlider;
