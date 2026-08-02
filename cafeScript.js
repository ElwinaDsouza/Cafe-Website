// Function to apply saved theme immediately
function applySavedTheme() {
  const savedTheme = localStorage.getItem('cafe-theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update DOM & Local Storage
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('cafe-theme', newTheme);
      
      // Update Icon
      const themeIcon = document.getElementById('theme-icon');
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    });
  }

  const categoryButtons = document.querySelectorAll('.cat-btn');
  const menuCards = document.querySelectorAll('.menu-grid .card');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      menuCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.skeleton').forEach(el => {
      el.classList.remove('skeleton');
    });
  }, 1000);
});