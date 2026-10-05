/**
 * LUCAS LENIAR — NAVIGATION & ACCESSIBILITY
 * Controle de Menu Mobile e Navegação Semântica
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveLink();
});

function initMobileMenu() {
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggleBtn || !siteNav) return;

  const toggleNav = (forceState) => {
    const isExpanded = forceState !== undefined ? forceState : navToggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    
    navToggleBtn.setAttribute('aria-expanded', String(nextState));
    siteNav.classList.toggle('is-open', nextState);
    document.body.classList.toggle('nav-locked', nextState);
    
    // Atualiza ícone do botão
    const toggleIcon = navToggleBtn.querySelector('svg');
    if (toggleIcon) {
      if (nextState) {
        toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      } else {
        toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      }
    }
  };

  navToggleBtn.addEventListener('click', () => toggleNav());

  // Fecha menu ao clicar em qualquer link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        toggleNav(true);
      }
    });
  });

  // Fecha menu ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      toggleNav(true);
      navToggleBtn.focus();
    }
  });
}

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const rawHref = link.getAttribute('href');
    if (!rawHref) return;
    const href = rawHref.replace(/^\.\//, '');

    const isHome = href === '' || href === 'index.html';
    const pathIsHome = currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath.endsWith('/leniar/') || currentPath.endsWith('/leniar');

    if (isHome && pathIsHome) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (!isHome && (currentPath.endsWith(href) || currentPath.endsWith('/' + href))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}
