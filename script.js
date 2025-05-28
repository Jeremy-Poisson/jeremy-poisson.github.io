document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll handler
   function handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const homeSection = document.getElementById('home');
    const homeHeight = homeSection.offsetHeight;
    
    // Darken navbar when scrolled past home section
    navbar.classList.toggle('scrolled', scrollPosition > homeHeight - 100);
    
    // Existing scroll behavior
    navbar.classList.toggle('shadow', scrollPosition > 50);
}

    // Mobile menu toggle
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra spacing
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
        }
    });
});

    // Initial check
    handleScroll();
});
// Reviews Carousel
const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = reviewCards[0].offsetWidth;
    reviewsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % reviewCards.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
    updateCarousel();
});

// Initialize carousel on load
window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
        reviewCards.forEach(card => card.style.minWidth = '33.33%');
    }
    updateCarousel();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        reviewCards.forEach(card => card.style.minWidth = '33.33%');
    } else {
        reviewCards.forEach(card => card.style.minWidth = '100%');
    }
    updateCarousel();
});