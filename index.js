document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Dynamic Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile nav when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // 3. Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // 4. Testimonials Carousel Functionality
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0;

    if (testimonials.length > 0) {
        // Create Dots
        testimonials.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(idx));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {
            testimonials.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentIndex = (index + testimonials.length) % testimonials.length;

            testimonials[currentIndex].classList.add('active');
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => showTestimonial(currentIndex - 1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => showTestimonial(currentIndex + 1));
        }
    }
});