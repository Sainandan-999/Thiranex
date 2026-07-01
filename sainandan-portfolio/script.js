document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. DYNAMIC THEME SWITCHER
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check stored theme preference, fallback to system preferences
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  const initialTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
  htmlElement.setAttribute('data-theme', initialTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // ==========================================================================
  // 2. MOBILE MENU DRAWER LOGIC
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // Disable background scrolling
  };
  
  const closeMobileMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };
  
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on click outside navbar area
  document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // 3. PROJECT FILTER ENGINE
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active styling states
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
          // Simple animation pop
          card.style.transform = 'scale(0.8)';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
            card.style.transition = 'transform 0.4s ease, opacity 0.4s ease, border-color var(--transition-normal), box-shadow var(--transition-normal)';
          }, 50);
        } else {
          card.classList.add('fade-out');
        }
      });
    });
  });

  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || 0;
        
        element.style.transitionDelay = `${delay}ms`;
        element.classList.add('active');
        observer.unobserve(element); // Animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // 5. NAVBAR HIGH-LIGHTING & ACTIVE TRACKING
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSectionId = entry.target.getAttribute('id');
        
        navItems.forEach(item => {
          const href = item.getAttribute('href').substring(1);
          if (href === activeSectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35, // Adjust scroll boundaries
    rootMargin: '-80px 0px -40% 0px'
  });
  
  sections.forEach(sec => sectionObserver.observe(sec));

  // ==========================================================================
  // 6. BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  
  const handleScroll = () => {
    if (window.scrollY > 550) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
      backToTopBtn.style.transform = 'translateY(15px)';
    }
  };
  
  // Set initial state
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.pointerEvents = 'none';
  backToTopBtn.style.transform = 'translateY(15px)';
  backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease, background-color var(--transition-fast), color var(--transition-fast)';
  
  window.addEventListener('scroll', handleScroll);
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================================================
  // 7. INTERACTIVE CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit');
  const submitText = submitBtn.querySelector('span');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Switch state to sending status
    submitBtn.disabled = true;
    submitText.textContent = 'Sending Message...';
    formStatus.className = 'form-status-message';
    formStatus.textContent = '';
    
    // Simulate a secure API post endpoint
    setTimeout(() => {
      try {
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        
        if (!nameInput || !emailInput) {
          throw new Error('Please fill in both name and email validation tags.');
        }
        
        // Success execution
        formStatus.classList.add('success');
        formStatus.textContent = `Thank you, ${nameInput}! Your message was successfully sent.`;
        
        // Reset form
        contactForm.reset();
        
      } catch (err) {
        // Error execution
        formStatus.classList.add('error');
        formStatus.textContent = err.message || 'Something went wrong. Please try again.';
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
      }
    }, 1800);
  });
});
