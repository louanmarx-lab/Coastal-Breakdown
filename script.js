/**
 * Coastal Breakdown - Premium Interaction Controller
 * Aesthetic: Jeffreys Bay Flow
 */

import { getRoadsideAssistance } from './services/geminiService.ts';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveals();
    handleSmoothScroll();
    initAIConcierge();
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
 * AI Concierge Logic
 */
function initAIConcierge() {
    const toggle = document.getElementById('ai-toggle');
    const windowEl = document.getElementById('ai-window');
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send');
    const messageContainer = document.getElementById('ai-messages');

    let history = [
        { role: 'system', content: 'Greeting the user as Coastal Concierge.' }
    ];

    toggle?.addEventListener('click', () => {
        const isHidden = windowEl.classList.contains('opacity-0');
        if (isHidden) {
            windowEl.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
        } else {
            windowEl.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
        }
    });

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        appendMessage('user', text);
        input.value = '';
        history.push({ role: 'user', content: text });

        // Loading
        const loadingId = Date.now();
        appendMessage('model', '...', loadingId);

        try {
            const aiResponse = await getRoadsideAssistance(history);
            const loadingEl = document.getElementById(`msg-${loadingId}`);
            if (loadingEl) loadingEl.innerText = aiResponse;
            history.push({ role: 'model', content: aiResponse });
        } catch (err) {
            const loadingEl = document.getElementById(`msg-${loadingId}`);
            if (loadingEl) loadingEl.innerText = "I'm having trouble connecting. Please call 082 655 0702.";
        }
    };

    const appendMessage = (role, text, id = null) => {
        const msg = document.createElement('div');
        msg.className = role === 'user' 
            ? 'bg-coastal-accent text-white p-3 rounded-lg ml-8' 
            : 'bg-coastal-bg p-3 rounded-lg mr-8';
        if (id) msg.id = `msg-${id}`;
        msg.innerText = text;
        messageContainer?.appendChild(msg);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    sendBtn?.addEventListener('click', sendMessage);
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
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