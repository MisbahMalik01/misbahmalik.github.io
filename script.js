// Add smooth scrolling for navigation links
document.querySelectorAll('nav a, .footer-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Initialize animation for all sections
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to hero elements
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) heroText.classList.add('fade-in');
    if (heroImage) heroImage.classList.add('fade-in');
    
    // Add animation observer for other sections
    const aboutContent = document.querySelector('.about-content');
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    const contactContent = document.querySelector('.contact-content');
    
    // Create an intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe elements for animation
    if (aboutContent) observer.observe(aboutContent);
    serviceCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));
    if (contactContent) observer.observe(contactContent);
    
    // Initialize project filtering
    initProjectFilters();
    
    // Setup contact form submission
    setupContactForm();
    
    // Mobile menu toggle if needed for responsive design
    // This would be expanded if a mobile menu button was added
});

// Function to handle skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease';
            bar.style.width = width;
        }, 200);
    });
}

// Trigger skill bar animation when about section is in view
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}

// Function to initialize project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter projects when a filter button is clicked
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
                
                // Reset animations for visible cards
                if (card.style.display === 'block') {
                    card.classList.remove('fade-in');
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 50);
                }
            });
        });
    });
}

// Function to setup contact form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const emailInput = document.querySelector('.email-input');
    const contactBtn = document.querySelector('.contact-btn');
    
    if (contactForm && contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Basic email validation
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Normally, you would send this to a server
            alert('Thank you! We will contact you soon.');
            emailInput.value = '';
        });
    }
}

// You could add more interactive elements here as needed 