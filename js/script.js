// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Handle the case when at the very top of the page
    if (scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

// Run on scroll
window.addEventListener('scroll', setActiveNav);

// Run on page load
window.addEventListener('load', setActiveNav);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .role-card, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// CTA Button click handlers
const primaryCtaButton = document.querySelector('.cta-button.primary');

if (primaryCtaButton) {
    primaryCtaButton.addEventListener('click', () => {
        // Scroll to what we do section
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Dashboard Chart Controls
const chartButtons = document.querySelectorAll('.chart-btn');
const chartBars = document.querySelectorAll('.bar');

chartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        chartButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Simulate data change based on selected period
        const period = button.textContent;
        let newHeights = [];
        
        switch(period) {
            case '6M':
                newHeights = ['60%', '75%', '45%', '85%', '70%', '90%'];
                break;
            case '1Y':
                newHeights = ['40%', '55%', '35%', '65%', '50%', '80%', '45%', '70%', '60%', '85%', '75%', '95%'];
                break;
            case 'All':
                newHeights = ['30%', '45%', '25%', '55%', '40%', '70%', '35%', '60%', '50%', '75%', '65%', '85%', '55%', '80%', '70%', '90%'];
                break;
        }
        
        // Update bar heights with animation
        chartBars.forEach((bar, index) => {
            if (newHeights[index]) {
                setTimeout(() => {
                    bar.style.height = newHeights[index];
                }, index * 100);
            }
        });
    });
});

// Animate metric cards on scroll
const metricCards = document.querySelectorAll('.metric-card');
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

metricCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    metricObserver.observe(card);
});

// Role pill expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
    const rolePills = document.querySelectorAll('.role-pill');
    const applyButtons = document.querySelectorAll('.apply-button');
    
    rolePills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Close other open pills
            rolePills.forEach(otherPill => {
                if (otherPill !== this && otherPill.classList.contains('active')) {
                    otherPill.classList.remove('active');
                }
            });
            
            // Toggle current pill
            this.classList.toggle('active');
        });
    });

    // Prevent pill collapse when clicking Apply button inside
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

// Animate confidence bar
const confidenceFill = document.querySelector('.confidence-fill');
if (confidenceFill) {
    const confidenceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    confidenceFill.style.width = '94%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    confidenceObserver.observe(confidenceFill);
}
