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

// Set active link based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPage = window.location.pathname;
    
    // Set active class for the current page
    document.querySelectorAll('nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Skip the Download CV button
        if (linkHref === '#') return;
        
        // Check if the link matches the current page
        if (currentPage.endsWith(linkHref) || 
            (currentPage.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Setup mobile menu toggle
    setupMobileNav();
    
    // Initialize animation for all sections
    initializeAnimations();
    
    // Setup contact form submission
    setupContactForm();
    
    // Setup Hire Me modal
    setupHireModal();
    
    // Setup CV download tracking
    setupCVDownload();
});

// Function to setup mobile navigation
function setupMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        // Toggle mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            document.body.classList.toggle('mobile-nav-active');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navMenu.classList.add('active');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('nav') && 
                !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('mobile-nav-active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking on a nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.classList.remove('mobile-nav-active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                document.body.classList.remove('mobile-nav-active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Function to initialize animations
function initializeAnimations() {
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
    
    // Trigger skill bar animation
    const aboutSection = document.querySelector('.about');
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
}

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

// Function to initialize project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
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
            alert('Thank you! I will contact you soon about AI/ML solutions for your business.');
            emailInput.value = '';
        });
    }
}

// Function to track CV downloads
function setupCVDownload() {
    const downloadBtn = document.querySelector('.download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Resume download started!';
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Remove notification after a delay
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
            
            // Track the download (would connect to analytics in a real app)
            console.log('CV Downloaded at:', new Date().toISOString());
        });
    }
}

// Function to setup the Hire Me modal
function setupHireModal() {
    const hireBtn = document.querySelector('.hire-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.modal-close');
    const hireForm = document.querySelector('.hire-form');
    const submitMessage = document.querySelector('.submit-message');
    
    if (hireBtn && modalBackdrop) {
        // Open modal when clicking the Hire Me button
        hireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Add entrance animation to modal elements with slight delay
            setTimeout(() => {
                modal.querySelectorAll('.form-group').forEach((group, index) => {
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(20px)';
                    group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, 100 * index);
                });
            }, 300);
        });
        
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when clicking outside the modal
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
        
        // Close modal on escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Handle form submission
        if (hireForm) {
            hireForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const projectType = document.getElementById('project-type').value;
                const message = document.getElementById('message').value.trim();
                
                // Validate form
                if (!name || !email || !projectType || !message) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Show loading state
                const submitBtn = hireForm.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate sending data to server (in a real app, you'd use fetch or XMLHttpRequest here)
                setTimeout(() => {
                    // Reset form
                    hireForm.reset();
                    
                    // Show success message
                    submitMessage.classList.add('show');
                    
                    // Reset button
                    submitBtn.innerHTML = 'Send Request';
                    submitBtn.disabled = false;
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        closeModal();
                        
                        // Reset success message after modal is closed
                        setTimeout(() => {
                            submitMessage.classList.remove('show');
                        }, 500);
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    // Helper function to close the modal
    function closeModal() {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// You could add more interactive elements here as needed 