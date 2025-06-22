class Animations {
    constructor() {
        this.init();
        this.animationThreshold = 0.2; // Intersection Observer threshold
        this.observedElements = new Set();
    }

    init() {
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initTextHoverEffects();
        this.initPromiseAnimations();
        this.addInitialClasses();
    }

    initHeroAnimations() {
        // Hero title animations
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const spans = heroTitle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    span.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 200 + index * 200);
            });
        }

        // Hero subtitle animation
        const subtitleWrapper = document.querySelector('.hero-subtitle-wrapper');
        if (subtitleWrapper) {
            subtitleWrapper.style.opacity = '0';
            subtitleWrapper.style.transform = 'translateY(20px)';
            setTimeout(() => {
                subtitleWrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                subtitleWrapper.style.opacity = '1';
                subtitleWrapper.style.transform = 'translateY(0)';
            }, 800);
        }

        // CTA button animation
        const ctaWrapper = document.querySelector('.cta-wrapper');
        if (ctaWrapper) {
            ctaWrapper.style.opacity = '0';
            ctaWrapper.style.transform = 'translateY(20px)';
            setTimeout(() => {
                ctaWrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                ctaWrapper.style.opacity = '1';
                ctaWrapper.style.transform = 'translateY(0)';
            }, 1400);
        }
    }

    initScrollAnimations() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .scale-in, .slide-in').forEach(el => {
            observer.observe(el);
        });
    }

    initTextHoverEffects() {
        const textElements = document.querySelectorAll('.animate-text');
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.02)';
                element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    initPromiseAnimations() {
        const promiseCards = document.querySelectorAll('.promise-card');
        promiseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 200);
        });
    }

    addInitialClasses() {
        // Add animation classes to sections except promise section and contact section
        document.querySelectorAll('section:not(.promise-section):not(.contact-section)').forEach(section => {
            section.classList.add('section-reveal');
            this.observer.observe(section);
        });

        // Add stagger animation to cards and icons
        const staggerContainers = [
            '.studio-icons .icon-item',
            '.nav-links li'
        ];

        staggerContainers.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('stagger-item');
                this.observer.observe(element);
            });
        });

        // Add text animation classes
        const textElements = [
            '.philosophy-text p',
            '.studio-section h2'
        ];

        textElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('animate-text');
                this.observer.observe(element);
            });
        });

        // Special handling for hero CTA button
        const heroCta = document.querySelector('.hero-section .cta-button');
        if (heroCta) {
            heroCta.style.opacity = '0';
            heroCta.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroCta.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }, 1500);
        }

        // Special handling for contact section
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.style.opacity = '1';
            contactSection.style.transform = 'none';
            
            const ctaButtons = contactSection.querySelectorAll('.cta-button');
            ctaButtons.forEach((button, index) => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    button.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 300 + index * 150);
            });
        }

        // Special handling for promise section
        const promiseCards = document.querySelectorAll('.promise-card');
        promiseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 200);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
}); 