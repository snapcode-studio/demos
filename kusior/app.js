document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes
        if (entry.target.classList.contains('reveal')) {
          entry.target.classList.add('in-view');
        } else if (entry.target.classList.contains('fade-up')) {
          entry.target.classList.add('animated');
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target elements
  const revealElements = document.querySelectorAll('.reveal, .fade-up');
  revealElements.forEach(el => scrollObserver.observe(el));

  // 2. Navbar shrink on scroll & Floating CTA visibility
  const navbar = document.getElementById('navbar');
  const floatingCta = document.getElementById('floatingCta');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Floating CTA
    if (floatingCta) {
      if (scrollY > 400) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }
  });

  // 3. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 4. Smooth Scrolling for Anchor Links (including offsets)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for fixed navbar
        const headerOffset = 80; // approximate navbar height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Hero Background Parallax & Hero load effect
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    // Start background scale animation
    setTimeout(() => {
      heroBg.classList.add('loaded');
    }, 100);

    // Subtle parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollPos * 0.3}px) scale(1)`;
      }
    });
  }

  // 6. Form Submission (Demo handling)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.innerText;
      
      // Simple validation check
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      
      // Simulate sending
      btnText.innerText = 'Wysyłanie...';
      submitBtn.style.opacity = '0.8';
      submitBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        btnText.innerText = 'Wysłano pomyślnie!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        submitBtn.style.color = '#fff';
        contactForm.reset();

        setTimeout(() => {
          btnText.innerText = originalText;
          submitBtn.style.background = ''; // restore to css styles
          submitBtn.style.color = '';
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }, 3000);
      }, 1500);
    });
  }
});


// Contact Copy Function
window.copyContact = function(e, text) {
  e.preventDefault();
  navigator.clipboard.writeText(text).then(() => {
    const el = e.currentTarget;
    const originalText = el.innerHTML;
    el.innerHTML = 'Skopiowano! ✓';
    setTimeout(() => { el.innerHTML = originalText; }, 2000);
  });
};
