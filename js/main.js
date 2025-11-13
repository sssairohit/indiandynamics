/**
 * NexTech Robotics - Main JavaScript
 * Handles animations, interactions, and dynamic behaviors
 */

// ===== Utility Functions =====
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait = 20) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset
        );
    }
};

// ===== Theme Toggle Handler =====
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);

        // Toggle theme on button click
        this.themeToggle.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== Navigation Handler =====
class NavigationHandler {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        this.init();
    }

    init() {
        // Scroll event for navbar styling
        window.addEventListener('scroll', utils.debounce(() => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }));

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
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
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== Scroll Animations Handler =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animation]');
        this.init();
    }

    init() {
        // Check elements on page load
        this.checkElements();

        // Check elements on scroll
        window.addEventListener('scroll', utils.debounce(() => {
            this.checkElements();
        }));
    }

    checkElements() {
        this.animatedElements.forEach((element, index) => {
            if (utils.isInViewport(element, 100) && !element.classList.contains('animated')) {
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
    }
}

// ===== Parallax Effect Handler =====
class ParallaxEffect {
    constructor() {
        this.heroBackground = document.querySelector('.hero-background');
        this.init();
    }

    init() {
        if (!this.heroBackground) return;

        window.addEventListener('scroll', utils.debounce(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                this.heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }, 10));
    }
}

// ===== Grid Animation Handler =====
class GridAnimation {
    constructor() {
        this.gridItems = document.querySelectorAll('.grid-item');
        this.currentIndex = 4; // Start with the center item (index 4)
        this.init();
    }

    init() {
        if (this.gridItems.length === 0) return;

        // Animate grid items in sequence
        setInterval(() => {
            // Remove active class from current item
            this.gridItems.forEach(item => item.classList.remove('active'));

            // Add active class to next item
            this.currentIndex = (this.currentIndex + 1) % this.gridItems.length;
            this.gridItems[this.currentIndex].classList.add('active');
        }, 1500);
    }
}

// ===== Form Handler =====
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Form will use native mailto functionality
        // No preventDefault needed since we're using action="mailto:..."
        this.form.addEventListener('submit', () => {
            console.log('Form submitted via mailto');
        });
    }
}

// ===== Cursor Effect (Optional Enhancement) =====
class CursorEffect {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        // Only enable on desktop
        if (window.innerWidth < 1024) return;

        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s ease-out;
            mix-blend-mode: difference;
        `;

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'custom-cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease-out;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        // Track mouse movement
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            this.cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(1.5)`;
                this.cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1.5)`;
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(1)`;
                this.cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
            });
        });
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        window.addEventListener('scroll', utils.debounce(() => {
            this.checkCounters();
        }));

        // Initial check
        this.checkCounters();
    }

    checkCounters() {
        this.counters.forEach(counter => {
            if (utils.isInViewport(counter, 100) && !this.animated.has(counter)) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        // Skip if not a number
        if (isNaN(number)) return;

        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        const delay = duration / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
                current = number;
                clearInterval(timer);
            }

            // Format the number
            let displayValue = current.toFixed(text.includes('.') ? 1 : 0);
            
            // Add back non-numeric characters
            if (text.includes('%')) displayValue += '%';
            if (text.includes('mm')) displayValue += 'mm';
            if (text.includes('s')) displayValue += 's';
            if (text.includes('+')) displayValue += '+';

            element.textContent = displayValue;
        }, delay);
    }
}

// ===== News Ticker Animation =====
class NewsTicker {
    constructor() {
        this.ticker = document.querySelector('.news-ticker');
        this.init();
    }

    init() {
        if (!this.ticker) return;

        // Clone news items for infinite scroll effect
        const items = this.ticker.querySelectorAll('.news-item');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            this.ticker.appendChild(clone);
        });
    }
}

// ===== Performance Monitor (Development Only) =====
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;

                console.log('%c⚡ Performance Metrics', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Connect Time: ${connectTime}ms`);
                console.log(`Render Time: ${renderTime}ms`);
            }, 0);
        });
    }
}

// ===== Lazy Loading Images =====
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// ===== Accessibility Enhancements =====
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation for skip links
        this.addSkipLink();

        // Focus visible for keyboard users
        this.handleFocusVisible();

        // Announce dynamic content changes for screen readers
        this.setupAriaLive();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: fixed;
            top: -100px;
            left: 20px;
            background: #00d4ff;
            color: #0a0a0f;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            z-index: 10001;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '20px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-100px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    handleFocusVisible() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupAriaLive() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);

        // Make it globally accessible
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }
}

// ===== Initialize All Components =====
class App {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        console.log('%c🤖 Indian Dynamics', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
        console.log('%cWebsite initialized successfully!', 'color: #00d4ff; font-size: 14px;');

        // Initialize all components
        this.components.push(new ThemeToggle());
        this.components.push(new NavigationHandler());
        this.components.push(new ScrollAnimations());
        this.components.push(new ParallaxEffect());
        this.components.push(new GridAnimation());
        this.components.push(new ContactFormHandler());
        this.components.push(new CounterAnimation());
        this.components.push(new NewsTicker());
        this.components.push(new LazyImageLoader());
        this.components.push(new AccessibilityEnhancements());
        this.components.push(new PerformanceMonitor());

        // Add smooth reveal on page load
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// ===== Start Application =====
const app = new App();

// ===== Export for external use (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, utils };
}