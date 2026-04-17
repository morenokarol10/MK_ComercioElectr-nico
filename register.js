// register.js — validación de formulario de registro (email y contraseña)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const feedback = document.getElementById('regFeedback');

  function validEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function strongPassword(pw){
    // mínimo 8, al menos una mayúscula y un número
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pw = document.getElementById('reg-password').value;
    const pw2 = document.getElementById('reg-password-confirm').value;

    feedback.hidden = false;

    if (!name || !email || !pw || !pw2){
      feedback.style.color = '#b02a37'; feedback.textContent = 'Completa todos los campos.'; return;
    }

    if (!validEmail(email)){
      feedback.style.color = '#b02a37'; feedback.textContent = 'Ingresa un correo válido.'; return;
    }

    if (!strongPassword(pw)){
      feedback.style.color = '#b02a37'; feedback.textContent = 'La contraseña debe tener mínimo 8 caracteres, incluir al menos una mayúscula y un número.'; return;
    }

    if (pw !== pw2){
      feedback.style.color = '#b02a37'; feedback.textContent = 'Las contraseñas no coinciden.'; return;
    }

    // Simular registro: guardar usuario básico en localStorage (solo demo)
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    users.push({ name, email });
    localStorage.setItem('users', JSON.stringify(users));

    feedback.style.color = '#0a6f3a'; feedback.textContent = 'Registro exitoso (simulación). Puedes iniciar sesión.';
    form.reset();
  });
});
