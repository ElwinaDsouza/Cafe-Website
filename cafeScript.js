// 1. Theme state initialization
function applySavedTheme() {
  const savedTheme = localStorage.getItem('cafe-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();

  // 2. Robust Mobile Hamburger Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuToggle && navMenu) {
    // Open/close menu on hamburger button click
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('is-active');
      if (menuIcon) {
        menuIcon.textContent = isActive ? 'close' : 'menu';
      }
    });

    // Close mobile menu when clicking outside header
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('is-active');
        if (menuIcon) menuIcon.textContent = 'menu';
      }
    });

    // Close mobile menu when selecting any page link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        if (menuIcon) menuIcon.textContent = 'menu';
      });
    });
  }

  // 3. Dark/Light Theme Switching
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cafe-theme', newTheme);
      
      const themeIcon = document.getElementById('theme-icon');
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    });
  }

  // 4. Side-Dock Navigation Toggle (Desktop Only)
  const orientToggle = document.getElementById('nav-orient-toggle');
  const mainNav = document.getElementById('main-nav');

  const savedOrient = localStorage.getItem('cafe-nav-orient') || 'horizontal';
  if (mainNav && savedOrient === 'vertical' && window.innerWidth > 768) {
    mainNav.classList.remove('nav-horizontal');
    mainNav.classList.add('nav-vertical');
    document.body.classList.add('has-vertical-nav');
  }

  if (orientToggle && mainNav) {
    orientToggle.addEventListener('click', () => {
      if (mainNav.classList.contains('nav-horizontal')) {
        mainNav.classList.remove('nav-horizontal');
        mainNav.classList.add('nav-vertical');
        document.body.classList.add('has-vertical-nav');
        localStorage.setItem('cafe-nav-orient', 'vertical');
      } else {
        mainNav.classList.remove('nav-vertical');
        mainNav.classList.add('nav-horizontal');
        document.body.classList.remove('has-vertical-nav');
        localStorage.setItem('cafe-nav-orient', 'horizontal');
      }
    });
  }

  // 5. Category Filtering (Menu & Gallery)
  const categoryButtons = document.querySelectorAll('.cat-btn');
  const filterableItems = document.querySelectorAll('.menu-grid .card, .space-gallery .gallery-item');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      filterableItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = ''; 
        } else {
          item.style.display = 'none'; 
        }
      });
    });
  });

  // 6. Remove Skeleton Loader state after 1 second
  setTimeout(() => {
    document.querySelectorAll('.skeleton').forEach(el => {
      el.classList.remove('skeleton');
    });
  }, 1000);
});