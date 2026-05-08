/* ==================== TYPING EFFECT ==================== */
const typingTexts = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Innovator',
    'Web Developer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeWriter() {
    const typingTextElement = document.getElementById('typingText');
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingTextElement.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

// Start typing effect on page load
window.addEventListener('load', () => {
    typeWriter();
});

/* ==================== NAVIGATION ==================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==================== SMOOTH SCROLL NAVIGATION ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== SCROLL TO TOP BUTTON ==================== */
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll(
    '.project-card, .skill-group, .contact-info, .contact-form'
).forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

/* ==================== FORM VALIDATION & SUBMISSION ==================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:gaddamreddi18@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0DEmail: ${encodeURIComponent(email)}%0DMessage: ${encodeURIComponent(message)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            alert('Thank you for reaching out! Please send the email when your default email client opens.');
        }, 100);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ==================== RIPPLE EFFECT ON SOCIAL ICONS ==================== */
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ==================== PARALLAX EFFECT ==================== */
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.1;
        shape.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

/* ==================== BUTTON HOVER EFFECT ==================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
});

/* ==================== GRADIENT ANIMATION UTILITY ==================== */
function animateGradient(element) {
    if (!element.style.backgroundPositionX) {
        element.style.backgroundPosition = '0% center';
    }
}

/* ==================== SKILL PROGRESS ANIMATION ==================== */
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target.querySelector('circle');
            if (circle) {
                circle.style.animation = 'none';
                setTimeout(() => {
                    circle.style.animation = '';
                }, 10);
            }
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-ring').forEach(ring => {
    skillBarsObserver.observe(ring);
});

/* ==================== PAGE LOAD ANIMATIONS ==================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');

    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }

    if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 1s ease-out 0.2s forwards';
    }
});

/* ==================== KEYBOARD NAVIGATION ==================== */
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to hero
    if (e.key.toLowerCase() === 'h') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

/* ==================== CONSOLE MESSAGE ==================== */
console.log(
    '%c Welcome to Sathwik Reddy\'s Portfolio! ',
    'background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;'
);
console.log('🚀 Feel free to explore and get in touch!');

/* ==================== LAZY LOAD IMAGES ==================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

/* ==================== DETECT TOUCH DEVICE ==================== */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

/* ==================== PREVENT LAYOUT SHIFT ==================== */
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
    // Check if scrollbar is needed
    if (document.body.scrollHeight > window.innerHeight) {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    }
});

/* ==================== UTILITY FUNCTIONS ==================== */
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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ==================== PERFORMANCE MONITORING ==================== */
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            console.log('Performance metrics:', entries[entries.length - 1]);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Performance monitoring not supported
    }
}

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Portfolio initialized successfully');
});

