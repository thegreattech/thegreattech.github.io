// Scroll reveal animations
function initScrollReveal() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    sr.reveal('.service-card', { interval: 200 });
    sr.reveal('.portfolio-item', { interval: 200 });
    sr.reveal('.team-card', { interval: 200 });
    sr.reveal('.testimonial-card', { interval: 200 });
    sr.reveal('.blog-card', { interval: 200 });
    sr.reveal('.feature-card', { interval: 200 });
    sr.reveal('.timeline-item', { interval: 200 });
}

// Animate elements when they come into view
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero sections
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
            const offset = scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initIntersectionObserver();
    initParallax();
    
    // Add hover class to team cards on touch devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.toggle('hover');
            });
        });
    }
});