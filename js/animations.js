/**
 * LUCAS LENIAR — ANIMATIONS & SCROLL OBSERVERS
 * Animações sutis e progressivas que respeitam prefers-reduced-motion
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
});

function initScrollReveal() {
  // Se usuário preferir redução de movimento, ignora observers e exibe direto
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-counter-target'), 10);
        const duration = 1200;
        const start = 0;
        const startTime = performance.now();

        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * (target - start) + start);
          
          counter.textContent = current + (counter.getAttribute('data-counter-suffix') || '');
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target + (counter.getAttribute('data-counter-suffix') || '');
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

  counters.forEach(c => observer.observe(c));
}
