// ========================================
// LIVING HOMZ - Enhanced JavaScript
// With Video Background & Real Product Images
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // HERO SLIDER
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    heroSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function showSlide(n) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Auto-advance
    slideInterval = setInterval(nextSlide, 5000);

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function updateCountdown() {
        const targetDate = new Date('2026-02-01T23:59:59').getTime();
        
        const interval = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                clearInterval(interval);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }
    
    updateCountdown();

    // ========================================
    // CATEGORY ITEMS HOVER EFFECTS
    // ========================================
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // HOTSPOT POPUP
    // ========================================
    const hotspots = document.querySelectorAll('.hotspot');
    const hotspotPopup = document.getElementById('hotspotPopup');
    const popupClose = document.querySelector('.popup-close');
    const popupTitle = document.getElementById('popupTitle');
    const popupPrice = document.getElementById('popupPrice');
    const popupImage = document.getElementById('popupImage');

    const productData = {
        'Pendant Light': {
            price: '₹8,999',
            image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400'
        },
        'Accent Chair': {
            price: '₹24,999',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
        },
        'Coffee Table': {
            price: '₹15,999',
            image: 'https://images.unsplash.com/photo-1558211583-803a8ea3c0e5?w=400'
        },
        'Sofa Set': {
            price: '₹89,999',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
        },
        'Area Rug': {
            price: '₹12,999',
            image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400'
        },
        'Decorative Vase': {
            price: '₹3,499',
            image: 'https://images.unsplash.com/photo-1578500351865-d31b2c72c244?w=400'
        }
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            const productName = this.getAttribute('data-product');
            const product = productData[productName];
            
            if (product) {
                popupTitle.textContent = productName;
                popupPrice.textContent = product.price;
                popupImage.src = product.image;
                hotspotPopup.classList.add('active');
            }
        });
    });

    if (popupClose) {
        popupClose.addEventListener('mouseenter', function() {
            hotspotPopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    window.addEventListener('mouseenter', function(e) {
        if (e.target === hotspotPopup) {
            hotspotPopup.classList.remove('active');
        }
    });

    // ========================================
    // SHOPPING CART
    // ========================================
    const cartButtons = document.querySelectorAll('.popup-cta');
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                
                // Add animation
                cartCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCountElement.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Show notification
            showNotification('Product added to cart!');
            
            // Close popup
            hotspotPopup.classList.remove('active');
        });
    });

    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(250, 247, 240, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.background = 'rgba(250, 247, 240, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // FADE IN ON SCROLL
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            
            showNotification('Thank you! We will contact you soon.');
            
            contactForm.reset();
        });
    }

    // ========================================
    // PORTFOLIO HOVER EFFECTS
    // ========================================
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
            this.querySelector('.portfolio-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('.portfolio-overlay').style.opacity = '0';
        });
    });

    // ========================================
    // DEAL CARD HOVER EFFECTS
    // ========================================
    const dealCards = document.querySelectorAll('.deal-card:not(.featured)');
    
    dealCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ========================================
    // TESTIMONIAL CARD HOVER
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.testimonial-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.testimonial-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ========================================
    // KITCHEN EXAMPLES HOVER
    // ========================================
    const kitchenExamples = document.querySelectorAll('.kitchen-example');
    
    kitchenExamples.forEach(example => {
        example.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        example.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--bronze, #B8956A);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
// ========================================
// SAFE IMAGE FADE-IN (NO SCROLL BUG)
// ========================================
const safeImages = document.querySelectorAll('img');

safeImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';

    if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            img.style.opacity = '1';
        });
    }
});

   
   
    
    images.forEach(img => imageObserver.observe(img));

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c Living Homz Interiors ', 'background: #B8956A; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Premium Interior Design & Furniture ', 'font-size: 12px; color: #666;');
    
});

// ========================================
// ADD CSS ANIMATIONS
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(250, 247, 240, 0.98);
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
    }
`;
document.head.appendChild(style);