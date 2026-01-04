
/**
 * Coastal Breakdown - Premium Interaction Controller
 * Aesthetic: Jeffreys Bay Flow
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveals();
    handleSmoothScroll();
});

/**
 * Navigation Logic
 * Handles the sticky header transition and the mobile menu overlay.
 */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const toggleSpans = menuToggle?.querySelectorAll('span');

    // Sticky Header Logic
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav?.classList.add('glass-nav');
            nav?.classList.remove('py-8');
            nav?.classList.add('py-4');
        } else {
            nav?.classList.remove('glass-nav');
            nav?.classList.add('py-8');
            nav?.classList.remove('py-4');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    menuToggle?.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('translate-y-full');
        
        if (isOpen) {
            // Close
            mobileMenu.classList.add('translate-y-full');
            if (toggleSpans) {
                toggleSpans[0].style.transform = 'none';
                toggleSpans[1].style.transform = 'none';
                toggleSpans[1].style.opacity = '1';
            }
        } else {
            // Open
            mobileMenu.classList.remove('translate-y-full');
            if (toggleSpans) {
                toggleSpans[0].style.transform = 'translateY(4px) rotate(45deg)';
                toggleSpans[1].style.transform = 'translateY(-4px) rotate(-45deg)';
                // Since there are only 2 spans in the HTML, we animate them into an X
            }
        }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-y-full');
            if (toggleSpans) {
                toggleSpans[0].style.transform = 'none';
                toggleSpans[1].style.transform = 'none';
            }
        });
    });
}

/**
 * Scroll Reveal Animations
 * Uses Intersection Observer to trigger the fade-in effect defined in CSS.
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll Enhancement
 * Adds a weighted behavior to link clicks for a more premium feel.
 */
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
