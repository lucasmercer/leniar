/**
 * LUCAS LENIAR — MAIN JAVASCRIPT CORE
 * Inicialização global, Tema Claro/Escuro, Command Palette (Ctrl+K), 
 * Currículo Executivo, Scroll Progress e Notificações
 */

document.addEventListener('DOMContentLoaded', () => {
  cleanServiceWorkers();
  initTheme();
  initScrollProgress();
  initCopyButtons();
  initSystemPing();
});

/**
 * 0. Limpeza preventiva de Service Worker e Caches no ambiente preview
 */
function cleanServiceWorkers() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    }).catch(() => {});
  }
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    }).catch(() => {});
  }
}

/**
 * 1. Gerenciamento de Tema (Dark / Light) com persistência em localStorage
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('lucasleniar-theme');

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default dark
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lucasleniar-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Tema ${newTheme === 'light' ? 'Claro' : 'Escuro'} ativado`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  
  if (theme === 'light') {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
    icon.setAttribute('aria-label', 'Alternar para tema escuro');
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    icon.setAttribute('aria-label', 'Alternar para tema claro');
  }
}

/**
 * 2. Indicador de Progresso de Rolagem da Página
 */
function initScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    const container = document.createElement('div');
    container.className = 'scroll-progress-container';
    container.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.prepend(container);
    progressBar = container.querySelector('.scroll-progress-bar');
  }
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/**
 * 3. Utilitário de Cópia com Toast de Feedback
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-script-btn, .copy-text-btn, .copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const directText = btn.getAttribute('data-copy-text') || btn.getAttribute('data-clipboard-text');
      let textToCopy = directText || '';

      if (!textToCopy && targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          textToCopy = targetElement.innerText || targetElement.textContent;
        }
      }
      
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.innerText;
          btn.innerText = 'Copiado!';
          btn.style.color = 'var(--accent-emerald)';
          btn.style.borderColor = 'var(--accent-emerald)';
          showToast('Copiado para a área de transferência!');
          
          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2200);
        } catch (err) {
          console.warn('Erro ao copiar:', err);
        }
      }
    });
  });
}

/**
 * 4. Indicador de Status do Sistema / NOC UTFPR
 */
function initSystemPing() {
  const statusPing = document.getElementById('system-ping-val');
  if (!statusPing) return;

  const updatePing = () => {
    const randomLatency = Math.floor(Math.random() * 12) + 18;
    statusPing.textContent = `${randomLatency}ms`;
  };

  updatePing();
  setInterval(updatePing, 10000);
}

/**
 * 7. Sistema de Notificação Toast
 */
export function showToast(message) {
  let toast = document.getElementById('global-toast-feedback');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast-feedback';
    toast.className = 'toast-feedback';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--accent-emerald)">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;
  
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
if (typeof window !== 'undefined') {
  window.showToast = showToast;
}


/**
 * 8. Easter Egg: Konami Code & Hacker Mode
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateHackerMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateHackerMode() {
  document.body.classList.toggle('hacker-mode');
  if (document.body.classList.contains('hacker-mode')) {
    showToast('Acesso ROOT garantido. Modo Hacker ativado.');
  } else {
    showToast('Modo Padrão restaurado.');
  }
}
