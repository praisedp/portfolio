/* ========= Card reveal on scroll ========= */
(() => {
  const cards = document.querySelectorAll('.card');

  // Re-use one global observer for efficiency
  if (!window._cardObserver) {
    window._cardObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);          // fire once per card
          }
        });
      },
      { threshold: 0.15 }                         // 15 % visible
    );
  }

  cards.forEach(card => window._cardObserver.observe(card));
})();

/* ========= Custom circular cursor ========= */
(() => {
  const dot = document.getElementById('cursor');
  if (!dot) return;

  /* Follow the pointer */
  window.addEventListener('mousemove', e => {
    dot.style.top  = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
  });

  /* Show cursor when mouse enters the page / hide when it leaves */
  document.body.addEventListener('mouseenter', () => (dot.style.opacity = '1'));
  document.body.addEventListener('mouseleave', () => (dot.style.opacity = '0'));

  /* Grow / shrink the cursor on mouse press */
  window.addEventListener('mousedown', () => dot.classList.add('cursor--clicked'));
  window.addEventListener('mouseup',   () => dot.classList.remove('cursor--clicked'));
})();

/* ========= Hide fake cursor while over .btn (optional) ========= */
/*
(() => {
  const dot = document.getElementById('cursor');
  if (!dot) return;

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => (dot.style.opacity = '0'));
    btn.addEventListener('mouseleave', () => (dot.style.opacity = '1'));
  });
})();
*/

/* ========= Button 3-D pop-out & tilt with dynamic shadow ========= */
(() => {
  const buttons = document.querySelectorAll('.btn');

  // ——— Tweakable constants ———
  const MAX_ANGLE   = 15;   // degrees of tilt
  const SCALE       = 1.08; // pop-out scale
  const BASE_BLUR   = 12;   // px
  const BLUR_K      = 0.3;  // blur per deg total tilt
  const BASE_OPAC   = 0.15; // min alpha
  const OPAC_K      = 0.015;// alpha per deg total tilt
  const OFFSET_K    = 0.4;  // px shadow offset per deg tilt
  const BASE_OFFSET_Y = 0;  // constant drop

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;

      // Calculate tilt
      const rotateX = (-y / (rect.height / 2)) * MAX_ANGLE;
      const rotateY = ( x / (rect.width  / 2)) * MAX_ANGLE;

      // Dynamic shadow
      const shadowX    = -rotateY * OFFSET_K;
      const shadowY    =  rotateX * OFFSET_K + BASE_OFFSET_Y;
      const shadowBlur = BASE_BLUR + (Math.abs(rotateX) + Math.abs(rotateY)) * BLUR_K;
      const shadowOp   = BASE_OPAC +
                         (Math.abs(rotateX) + Math.abs(rotateY)) * OPAC_K;

      // Shadow colour (falls back to black)
      const rgb = getComputedStyle(btn)
                    .getPropertyValue('--shadow-color')
                    .trim() || '0,0,0';

      // Apply styles
      btn.classList.add('btn--active');
      btn.style.transform =
        `scale(${SCALE}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      btn.style.boxShadow =
        `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(${rgb}, ${shadowOp})`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('btn--active');
      btn.style.transform = 'none';
      btn.style.boxShadow = '';
    });
  });
})();

/* ========= Mobile hamburger menu ========= */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  // Toggle mobile nav visibility
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  mobileNav.querySelectorAll('.nav-btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });
});