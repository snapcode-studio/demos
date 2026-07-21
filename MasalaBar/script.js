// Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GSAP ScrollTrigger setup for Lenis
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  scroller: document.body
});

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  gsap.ticker.add(() => {
    // Easing follower
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  });

  // Hover effects
  const interactables = document.querySelectorAll('a, button, input, .widget-glass-container');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.border = '1px solid var(--gold)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.borderColor = 'transparent';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'var(--gold)';
      cursor.style.border = 'none';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'var(--gold)';
    });
  });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Preloader & Initial Animations
window.addEventListener('load', () => {
  const tl = gsap.timeline();
  
  tl.to('.progress', { width: '100%', duration: 1, ease: 'power2.inOut' })
    .to('.preloader', { yPercent: -100, duration: 0.8, ease: 'power3.inOut' })
    .fromTo('.navbar', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
    .fromTo('.animate-split', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.2")
    .fromTo('.animate-fade', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.5")
    .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 0.6, duration: 1 }, "-=0.5");
});

// Parallax Hero Background
gsap.to(".hero-bg img", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Parallax About Images
gsap.to(".img-main img", {
  yPercent: 15,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-images",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".img-accent img", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-images",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Reveal Animations (Fade Up)
const fadeUpElements = document.querySelectorAll('.fade-up, .section-header, .about-text');
fadeUpElements.forEach(el => {
  gsap.fromTo(el,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    }
  );
});

// Smooth scroll for anchor links (Lenis integration)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    lenis.scrollTo(targetId, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  });
});

