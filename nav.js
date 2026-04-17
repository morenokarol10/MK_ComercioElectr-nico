// nav.js — menú móvil accesible
(function(){
  const menuIcon = document.getElementById('menu-icon');
  const navMenu = document.querySelector('.navmenu');
  if (!menuIcon || !navMenu) return;

  function toggleMenu(){
    const isOpen = navMenu.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
    menuIcon.setAttribute('aria-expanded', isOpen);
    navMenu.setAttribute('aria-hidden', !isOpen);
  }

  menuIcon.addEventListener('click', toggleMenu);
  menuIcon.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Cerrar menú al cambiar de enlace
  navMenu.addEventListener('click', function(e){
    if (e.target.tagName === 'A' && navMenu.classList.contains('open')){
      navMenu.classList.remove('open');
      menuIcon.classList.remove('bx-x');
      menuIcon.setAttribute('aria-expanded', false);
      navMenu.setAttribute('aria-hidden', true);
    }
  });

  // Actualizar el icono de usuario si está logeado
  document.addEventListener('DOMContentLoaded', function() {
    updateUserIcon();
  });

  // Función para actualizar el icono de usuario
  window.updateUserIcon = function() {
    const userIcon = document.querySelector('.nav-icon a[href="login.html"]');
    const currentUser = localStorage.getItem('currentUser');

    if (userIcon) {
      if (currentUser) {
        // Usuario logeado - cambiar href a logout
        userIcon.href = '#';
        userIcon.onclick = function(e) {
          e.preventDefault();
          handleLogout();
        };
        userIcon.title = 'Cerrar sesión';
        userIcon.innerHTML = '<i class="bx bx-log-out"></i>';
      } else {
        // Usuario no logeado - mostrar login normal
        userIcon.href = 'login.html';
        userIcon.onclick = null;
        userIcon.title = 'Iniciar sesión';
        userIcon.innerHTML = '<i class="bx bx-user"></i>';
      }
    }
  };

  // Función para logout
  window.handleLogout = function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      updateUserIcon();
      alert('Sesión cerrada exitosamente');
      window.location.href = 'index.html';
    }
  };
})();
