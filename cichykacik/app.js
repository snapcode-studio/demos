document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initialize on load

  // --- 2. Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Menu Tabs Logic ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuPanels = document.querySelectorAll('.menu-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      tabBtns.forEach(t => t.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));

      // Add active class to clicked tab
      btn.classList.add('active');

      // Add active class to target panel
      const targetId = `panel-${btn.dataset.tab}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- 4. Intersection Observer for Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  // Observe all elements with classes that need revealing
  const animElements = document.querySelectorAll('.reveal, .fade-in-up');
  animElements.forEach(el => observer.observe(el));

  // --- 5. Hero Load Effect ---
  const hero = document.getElementById('hero');
  if (hero) {
    // Slight delay for smooth load appearance
    setTimeout(() => {
      hero.classList.add('loaded');
    }, 150);
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
