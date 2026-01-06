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
 */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const toggleSpans = menuToggle?.querySelectorAll('span');

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
    handleScroll();

    menuToggle?.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('translate-y-full');
        if (isOpen) {
            mobileMenu.classList.add('translate-y-full');
            if (toggleSpans) {
                toggleSpans[0].style.transform = 'none';
                toggleSpans[1].style.transform = 'none';
                toggleSpans[1].style.opacity = '1';
            }
        } else {
            mobileMenu.classList.remove('translate-y-full');
            if (toggleSpans) {
                toggleSpans[0].style.transform = 'translateY(4px) rotate(45deg)';
                toggleSpans[1].style.transform = 'translateY(-4px) rotate(-45deg)';
            }
        }
    });

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
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}