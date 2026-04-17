// login.js — validación básica de login
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('login-form');
  const feedback = document.getElementById('loginFeedback');

  function validEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value;
    feedback.hidden = false;

    if (!email || !pw){ feedback.style.color='#b02a37'; feedback.textContent='Completa ambos campos.'; return; }
    if (!validEmail(email)){ feedback.style.color='#b02a37'; feedback.textContent='Correo inválido.'; return; }

    // Simulación: verificar si usuario existe en localStorage
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const found = users.find(u => u.email === email);
    if (!found){ feedback.style.color='#b02a37'; feedback.textContent='Usuario no encontrado (simulación).'; return; }

    feedback.style.color='#0a6f3a'; feedback.textContent = 'Inicio de sesión exitoso (simulación).';
    
    // Guardar que el usuario está logeado
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      loginTime: new Date().getTime()
    }));
    
    form.reset();
    
    // Redirigir después de 1.5 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
});
