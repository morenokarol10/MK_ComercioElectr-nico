// JS para la pantalla de Contacto: acordeón accesible y validación básica del formulario
document.addEventListener('DOMContentLoaded', () => {
  // Acordeón: toggles con aria-expanded
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      // cerrar todos
      document.querySelectorAll('.accordion-button').forEach(b => b.setAttribute('aria-expanded','false'));
      if (!expanded) button.setAttribute('aria-expanded','true');
      else button.setAttribute('aria-expanded','false');
    });
    // Permitir toggle con Enter/Espacio cuando está en foco
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Formulario: validación mínima y simulación de envío
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      feedback.hidden = false;
      feedback.style.color = '#b02a37';
      feedback.textContent = 'Por favor completa todos los campos.';
      return;
    }

    // Validación simple de email
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      feedback.hidden = false;
      feedback.style.color = '#b02a37';
      feedback.textContent = 'Ingresa un correo válido.';
      return;
    }

    // Simular envío (guardar en localStorage como historial de mensajes)
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('messages', JSON.stringify(messages));

    feedback.hidden = false;
    feedback.style.color = '#0a6f3a';
    feedback.textContent = 'Mensaje enviado. Te responderemos pronto.';

    form.reset();
    // mantener el foco en el botón para accesibilidad
    form.querySelector('button[type="submit"]').focus();
  });
});
