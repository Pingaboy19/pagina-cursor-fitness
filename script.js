// ============================================
// POWER GYM - Ultra Premium Landing Page
// Advanced Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initPreloader();
    initCustomCursor();
    initParticles();
    initNavbar();
    initSmoothScroll();
    initRevealAnimations();
    initCounterAnimation();
    initPricingToggle();
    initMagneticButtons();
    initParallaxEffects();
    initClassFilter();
    initVideoModal();
    initCountdownTimer();
    initBackToTop();
    initFormEffects();
    initImageTilt();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            
            // Trigger initial animations
            setTimeout(() => {
                document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, index) => {
                    const delay = parseInt(el.dataset.delay) || index * 100;
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                });
            }, 300);
        }, 2000);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .service-card, .class-card, .pricing-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hovering');
            cursor.style.transform = 'scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hovering');
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// FLOATING PARTICLES
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 20;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;
        
        container.appendChild(particle);
    }
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            // Create/toggle mobile menu
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="mobile-menu-content">
                        ${Array.from(navLinks).map(link => 
                            `<a href="${link.getAttribute('href')}" class="mobile-link">${link.textContent}</a>`
                        ).join('')}
                        <a href="#contacto" class="btn btn-primary mobile-cta">Únete Ahora</a>
                    </div>
                `;
                
                mobileMenu.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(9, 9, 11, 0.98);
                    backdrop-filter: blur(20px);
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                `;
                
                const content = mobileMenu.querySelector('.mobile-menu-content');
                content.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    text-align: center;
                `;
                
                document.body.appendChild(mobileMenu);
                
                // Style links
                mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
                    link.style.cssText = `
                        color: #E4E4E7;
                        text-decoration: none;
                        font-size: 1.5rem;
                        font-weight: 600;
                        transition: all 0.2s ease;
                    `;
                    
                    link.addEventListener('click', () => {
                        mobileMenu.style.opacity = '0';
                        mobileMenu.style.visibility = 'hidden';
                        mobileMenuBtn.classList.remove('active');
                    });
                });
            }
            
            // Toggle visibility
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenu.style.opacity = '1';
                mobileMenu.style.visibility = 'visible';
            } else {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
            }
        });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// REVEAL ANIMATIONS (Intersection Observer)
// ============================================
function initRevealAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2500;
                const start = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(target * easeOutQuart);
                    
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// PRICING TOGGLE
// ============================================
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyLabel = document.querySelector('[data-billing="monthly"]');
    const yearlyLabel = document.querySelector('[data-billing="yearly"]');
    const amounts = document.querySelectorAll('.amount');
    
    if (!toggle) return;
    
    // Set initial state
    monthlyLabel?.classList.add('active');
    
    toggle.addEventListener('change', () => {
        const isYearly = toggle.checked;
        
        // Update labels
        monthlyLabel?.classList.toggle('active', !isYearly);
        yearlyLabel?.classList.toggle('active', isYearly);
        
        // Animate price change
        amounts.forEach(amount => {
            const monthly = parseInt(amount.dataset.monthly);
            const yearly = parseInt(amount.dataset.yearly);
            const targetValue = isYearly ? yearly : monthly;
            const currentValue = parseInt(amount.textContent);
            
            // Animate the number
            animateValue(amount, currentValue, targetValue, 400);
        });
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + range * easeOut);
        
        element.textContent = current;
        element.style.transform = `scale(${1 + (1 - progress) * 0.1})`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        
        if (scrollY < maxScroll) {
            const progress = scrollY / maxScroll;
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                heroContent.style.opacity = 1 - progress * 0.5;
            }
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        }
    });
    
    // Mouse parallax for floating cards
    if (floatingCards.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            floatingCards.forEach((card, index) => {
                const factor = (index + 1) * 15;
                const x = mouseX * factor;
                const y = mouseY * factor;
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// ============================================
// CLASS FILTER
// ============================================
function initClassFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const classCards = document.querySelectorAll('.class-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            classCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// VIDEO MODAL
// ============================================
function initVideoModal() {
    const playBtn = document.getElementById('playVideo');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (!playBtn || !modal) return;
    
    const iframe = modal.querySelector('iframe');
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    
    playBtn.addEventListener('click', () => {
        modal.classList.add('active');
        iframe.src = videoUrl;
        document.body.style.overflow = 'hidden';
    });
    
    const closeModal = () => {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    // Set end date to 3 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    
    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORM EFFECTS
// ============================================
function initFormEffects() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Validate
            let isValid = true;
            contactForm.querySelectorAll('input[required], select[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                    field.style.animation = 'shake 0.5s ease';
                    
                    setTimeout(() => {
                        field.style.borderColor = '';
                        field.style.animation = '';
                    }, 2000);
                }
            });
            
            if (isValid) {
                // Show loading state
                submitBtn.innerHTML = `
                    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                    </svg>
                    <span>Enviando...</span>
                `;
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span>¡Mensaje Enviado!</span>
                    `;
                    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            if (input.value.trim() && input.value.includes('@')) {
                button.innerHTML = '✓';
                button.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                input.value = '';
                
                setTimeout(() => {
                    button.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    `;
                    button.style.background = '';
                }, 3000);
            }
        });
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Input focus effects
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim()) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
}

// ============================================
// IMAGE TILT EFFECT
// ============================================
function initImageTilt() {
    const tiltElements = document.querySelectorAll('.hero-image-main, .service-card, .class-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// ============================================
// TESTIMONIALS AUTO-SCROLL ENHANCEMENT
// ============================================
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    
    if (!track) return;
    
    // Clone cards for infinite scroll
    const cards = track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

document.addEventListener('DOMContentLoaded', initTestimonialsSlider);

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// TEXT SCRAMBLE EFFECT (for hero title)
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ============================================
// LIVE USER COUNT ANIMATION
// ============================================
function initLiveUserCount() {
    const liveCount = document.querySelector('.card-3 .card-value');
    
    if (!liveCount) return;
    
    let count = 127;
    
    setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        count = Math.max(100, Math.min(150, count + change));
        liveCount.textContent = count;
        liveCount.style.transform = 'scale(1.1)';
        setTimeout(() => {
            liveCount.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initLiveUserCount);

// ============================================
// CONSOLE BRANDING
// ============================================
console.log(`
%c⚡ POWER GYM %c
%cUltra Premium Landing Page
%cLoaded Successfully!

%cDesarrollado con pasión 🔥

`, 
'color: #FF6B35; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
'',
'color: #6366F1; font-size: 16px; font-weight: bold;',
'color: #10B981; font-size: 14px;',
'color: #71717A; font-size: 12px;'
);
