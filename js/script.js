// Modern JavaScript with enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
      // Handle navbar scroll effect and guide page detection
    function handleScroll() {
        // Check if this is a guide page (no hero section)
        const isGuidePage = !document.querySelector('.hero');
        
        // Apply scrolled class for guide pages immediately
        if (isGuidePage) {
            navbar.classList.add('scrolled');
        } else if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 50 && backToTop) {
            backToTop.classList.add('show');
        } else if (backToTop) {
            backToTop.classList.remove('show');
        }
        
        // Active menu handling on scroll
        const sections = document.querySelectorAll('section, header');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Mobile menu toggle with performance optimization
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
                const isActive = menuToggle.classList.toggle('active');
                navbarMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (isActive) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    
    // Close mobile menu when clicking on a link with performance optimization
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            requestAnimationFrame(() => {
                menuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            if (!navbarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                requestAnimationFrame(() => {
                    menuToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            }
        }
    });

    // Handle touch events for better mobile responsiveness
    if (navbarMenu) {
        navbarMenu.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
    
    // Back to top button functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger scroll once on page load
    handleScroll();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler with validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Le nom est requis.\n';
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            if (!email) {
                isValid = false;
                errorMessage += 'L\'email est requis.\n';
                document.getElementById('email').classList.add('error');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Veuillez entrer un email valide.\n';
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            if (!message) {
                isValid = false;
                errorMessage += 'Le message est requis.\n';
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Merci pour votre message! Nous vous répondrons dès que possible.');
            
            // Clear the form
            contactForm.reset();
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add card animation on scroll
    const animateCards = () => {
        const cards = document.querySelectorAll('.guide-card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Animation for section headers
    const animateSectionHeaders = () => {
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(header => {
            const headerPosition = header.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (headerPosition < screenPosition) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize section headers with opacity 0
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.5s ease';
    });
    
    // Call animations on scroll
    window.addEventListener('scroll', () => {
        animateCards();
        animateSectionHeaders();
    });
    
    // Call animations once on page load
    animateCards();
    animateSectionHeaders();
});