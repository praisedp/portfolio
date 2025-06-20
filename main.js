(() => {
  const cards = document.querySelectorAll('.card');

  if (!window._cardObserver) {
    window._cardObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold:0.15 }
    );
  }

  cards.forEach(card => window._cardObserver.observe(card));
})();

/* ---------- Custom Cursor follow ---------- */
(() => {
  const dot = document.getElementById('cursor');
  if (!dot) return;

  window.addEventListener('mousemove', e => {
    dot.style.top  = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
  });
})();
/* ---------- Hide fake cursor while over .btn ---------- */
// (() => {
//   const dot = document.getElementById('cursor');
//   if (!dot) return;

//   document.querySelectorAll('.btn').forEach(btn => {
//     btn.addEventListener('mouseenter', () => dot.style.opacity = '0');
//     btn.addEventListener('mouseleave', () => dot.style.opacity = '1');
//   });
// })();

/* ---------- Button 3‑D pop‑out & tilt with dynamic shadow ---------- */
(() => {
  const buttons = document.querySelectorAll('.btn');

  // === Tweakable constants ===
  const MAX_ANGLE        = 15;    // degrees
  const SCALE_FACTOR      = 1.08; // pop‑out scale
  const BASE_BLUR         = 12;   // px
  const BLUR_FACTOR       = 0.3;  // px blur per degree total tilt
  const BASE_OPACITY      = 0.15; // min alpha
  const OPACITY_STEP      = 0.015;// alpha added per degree total tilt
  const OFFSET_FACTOR     = 0.4;  // px shadow offset per degree tilt
  const BASE_OFFSET_Y     = 0;    // px constant drop

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;

      // Calculate tilt
      const rotateX = (-y / (rect.height / 2)) * MAX_ANGLE;
      const rotateY = ( x / (rect.width  / 2)) * MAX_ANGLE;

      // Dynamic shadow bits
      const shadowX   = -rotateY * OFFSET_FACTOR;            // opposite X tilt
      const shadowY   =  rotateX * OFFSET_FACTOR + BASE_OFFSET_Y;
      const shadowBlur= BASE_BLUR + (Math.abs(rotateX)+Math.abs(rotateY))*BLUR_FACTOR;
      const shadowOp  = BASE_OPACITY +
                        (Math.abs(rotateX)+Math.abs(rotateY))*OPACITY_STEP;

      // Read per‑button shadow colour from CSS custom property
      const rgb = getComputedStyle(btn).getPropertyValue('--shadow-color').trim() || '0,0,0';

      // Apply styles
      btn.classList.add('btn--active');
      btn.style.transform = `scale(${SCALE_FACTOR}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      btn.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(${rgb}, ${shadowOp})`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('btn--active');
      btn.style.transform = 'none';
      btn.style.boxShadow = '';
    });
  });
})();