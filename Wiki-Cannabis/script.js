// script.js

// Alternar menu lateral
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  }
  
  // Alternar modo claro/escuro
  function toggleDarkMode() {
    document.body.classList.toggle('light'); // Corrigido para funcionar corretamente
  
    const icon = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
      icon.textContent = '☀️';
    } else {
      icon.textContent = '🌙';
    }
  }
  
  // Animação de fade-in ao rolar a página (para origem.html e outras)
  function initFadeInAnimation() {
    const sections = document.querySelectorAll('.fade-in');
    const options = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Remove observação após visível
        }
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // Inicializar ao carregar a página
  document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation();
  });
  