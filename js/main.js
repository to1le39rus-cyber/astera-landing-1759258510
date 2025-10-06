// Main JavaScript functionality for Astera Landing Page

// DOM Elements
const modal = document.getElementById('modal');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const contactForm = document.getElementById('contactForm');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupEventListeners();
    setupFormValidation();
    setupScrollEffects();
    setupAccessibility();
}

// Event Listeners
function setupEventListeners() {
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }
}

// Modal Functions
function openModal(type = 'default') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update modal title based on type
    const modalTitle = document.querySelector('.modal__title');
    switch(type) {
        case 'builder':
            modalTitle.textContent = 'Сотрудничество с застройщиками';
            break;
        case 'designer':
            modalTitle.textContent = 'Партнерская программа для дизайнеров';
            break;
        case 'contractor':
            modalTitle.textContent = 'Сотрудничество со строителями';
            break;
        default:
            modalTitle.textContent = 'Рассчитать стоимость двери';
    }
    
    // Focus management for accessibility
    const firstInput = modal.querySelector('input, textarea, button');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeModal(event) {
    if (event) {
        event.preventDefault();
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear form
    if (contactForm) {
        contactForm.reset();
        clearFormErrors();
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileNav.classList.add('active');
    mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    closeMobileMenu();
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Form Validation and Submission
function setupFormValidation() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
        phoneInput.addEventListener('blur', validatePhone);
    }
    
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('7')) {
        value = value.substring(1);
    }
    
    if (value.length >= 10) {
        value = value.substring(0, 10);
        const formatted = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
        e.target.value = formatted;
    }
}

function validatePhone(e) {
    const phone = e.target.value;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        showFieldError(e.target, 'Введите корректный номер телефона');
        return false;
    } else {
        clearFieldError(e.target);
        return true;
    }
}

function validateName(e) {
    const name = e.target.value.trim();
    
    if (name.length < 2) {
        showFieldError(e.target, 'Имя должно содержать минимум 2 символа');
        return false;
    } else {
        clearFieldError(e.target);
        return true;
    }
}

function validateEmail(e) {
    const email = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(e.target, 'Введите корректный email адрес');
        return false;
    } else {
        clearFieldError(e.target);
        return true;
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('.form__input, .form__textarea').forEach(field => {
        field.style.borderColor = '';
    });
}

function submitForm(e) {
    e.preventDefault();
    
    // Validate all fields
    const nameValid = validateName({ target: document.getElementById('name') });
    const phoneValid = validatePhone({ target: document.getElementById('phone') });
    const emailValid = validateEmail({ target: document.getElementById('email') });
    
    if (!nameValid || !phoneValid || !emailValid) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Reset form and close modal
        contactForm.reset();
        closeModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.advantage, .why-us__item, .cooperation__item').forEach(el => {
        observer.observe(el);
    });
}

// Accessibility Features
function setupAccessibility() {
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            handleModalKeyNavigation(e);
        }
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Перейти к основному содержанию';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-bg-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function handleModalKeyNavigation(e) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const debouncedHandleResize = debounce(() => {
    // Handle resize events
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}, 250);

window.addEventListener('resize', debouncedHandleResize);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'img/renders/hero-door.png',
        'img/works/project-1.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.scrollToSection = scrollToSection;
window.submitForm = submitForm;
