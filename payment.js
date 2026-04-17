// payment.js — simulación de proceso de pago y redirección a factura
(function(){
  // Verificar si el usuario está logeado
  function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Usuario no está logeado, redirigir a login
      alert('Debes iniciar sesión para proceder al pago.');
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  // Verificar login al cargar la página
  if (!checkLogin()) {
    return; // Salir si no está logeado
  }

  const SHIPPING = 5.00;
  const IVA_RATE = 0.15; // 15% para Ecuador

  function parsePrice(v){ return parseFloat(String(v).replace(/[^0-9.]/g,'')) || 0; }
  function format(v){ return '$' + Number(v).toFixed(2); }

  function getCart(){ return JSON.parse(localStorage.getItem('cart')) || []; }

  function calcSubtotal(){
    const cart = getCart();
    return cart.reduce((s,item)=> s + (parseFloat(item.price)||0) * (Number(item.quantity)||1), 0);
  }

  // Renderizar productos en la vista de pago
  async function renderCartProducts() {
    try {
      const cartContainer = document.getElementById('cartProducts');
      if (!cartContainer) return;

      const res = await fetch('products.json');
      const allProducts = await res.json();
      const cart = getCart();

      if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; color:#666;">Tu carrito está vacío.</p>';
        return;
      }

      let productsHTML = '';
      cart.forEach(cartItem => {
        const fullProduct = allProducts.find(p => p.name === cartItem.name);
        
        if (fullProduct) {
          const image = fullProduct.image || 'imagenes/1.webp';
          const originalPrice = fullProduct.originalPrice;
          const discount = fullProduct.discount;
          const qty = cartItem.quantity || 1;
          const itemTotal = parseFloat(cartItem.price) * qty;

          productsHTML += `
            <div class="row" style="display: flex; flex-direction: column; gap: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <img src="${image}" alt="${fullProduct.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px;">
              
              <div class="product-text" style="position: relative;">
                ${discount ? `<h5 style="color: white; font-weight: bold; background: rgba(0,0,0,0.6); padding: 8px 12px; border-radius: 4px; display: inline-block; margin:0;">-${discount}%</h5>` : ''}
              </div>

              <div class="heart-icon" onclick="toggleFavorite(event, '${fullProduct.name}')" style="cursor: pointer; font-size: 24px; color: #bbb;">
                <i class='bx bx-heart'></i>
              </div>

              <div class="ratting" style="display: flex; gap: 4px;">
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star-half'></i>
              </div>

              <div class="price">
                <h4 style="margin: 0; font-size: 14px; color: #222;">${fullProduct.name}</h4>
                ${originalPrice ? `
                  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <p style="text-decoration: line-through; color: #999; margin: 0; font-size: 13px;">$${originalPrice}</p>
                    <p style="color: #d32f2f; font-weight: bold; margin: 0; font-size: 16px;">$${fullProduct.price}</p>
                  </div>
                ` : `<p style="margin: 0; color: #d32f2f; font-weight: bold; font-size: 16px;">$${fullProduct.price}</p>`}
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Cantidad: <strong>${qty}</strong></p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Subtotal: <strong>${format(itemTotal)}</strong></p>
              </div>

              <div class="product-actions" style="display: flex; gap: 8px; flex-direction: column;">
                <button class="btn-detail" onclick="goToProductDetail('${fullProduct.name}')" style="padding: 8px 12px; font-size: 12px;">
                  <i class='bx bx-show'></i> Ver detalles
                </button>
                <button class="add-to-cart-btn" data-product="${fullProduct.name}" data-price="${fullProduct.price}" style="padding: 8px 12px; font-size: 12px; background: #34656D; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  <i class='bx bx-cart'></i> Agregar otra
                </button>
              </div>
            </div>
          `;
        }
      });

      cartContainer.innerHTML = productsHTML;

      // Agregar event listeners a los botones "add-to-cart-btn"
      document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', async function(e) {
          e.preventDefault();
          const productName = this.getAttribute('data-product');
          const productPrice = parseFloat(this.getAttribute('data-price'));

          try {
            const res = await fetch('products.json');
            const allProducts = await res.json();
            const fullProduct = allProducts.find(p => p.name === productName);

            if (fullProduct && ((fullProduct.sizes && fullProduct.sizes.length > 0) || (fullProduct.colors && fullProduct.colors.length > 0))) {
              // Abrir modal si tiene opciones
              if (typeof openProductModal === 'function') {
                openProductModal(
                  fullProduct.name,
                  fullProduct.price,
                  fullProduct.sizes || [],
                  fullProduct.colors || []
                );
                return;
              }
            }
          } catch (error) {
            console.error('Error cargando productos:', error);
          }

          // Si no tiene opciones, agregar directamente
          if (typeof addToCart === 'function') {
            addToCart({
              name: productName,
              price: productPrice,
              size: null,
              color: null
            });
          }
        });
      });
    } catch (error) {
      console.error('Error renderizando productos:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const subtotalEl = document.getElementById('paySubtotal');
    const shippingEl = document.getElementById('payShipping');
    const ivaEl = document.getElementById('payIVA');
    const totalEl = document.getElementById('payTotal');
    const feedback = document.getElementById('payFeedback') || document.getElementById('payFeedback');
    const form = document.getElementById('paymentForm');

    // Renderizar productos del carrito
    renderCartProducts();

    // Masks & UX helpers
    const cardInput = form.querySelector('[name="card"]');
    const expiryInput = form.querySelector('[name="expiry"]');
    const cvvInput = form.querySelector('[name="cvv"]');

    if (cardInput) {
      cardInput.addEventListener('input', (e)=>{
        const v = e.target.value.replace(/\D/g, '').slice(0,19);
        // group in 4s
        e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
        detectCardBrand(v);
      });
      cardInput.addEventListener('blur', (e)=>{ e.target.value = e.target.value.trim(); });
    }

    if (expiryInput) {
      expiryInput.addEventListener('input', (e)=>{
        let v = e.target.value.replace(/\D/g, '').slice(0,4);
        if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
        e.target.value = v;
      });
      expiryInput.addEventListener('blur', (e)=>{ e.target.value = e.target.value.trim(); });
    }

    if (cvvInput) {
      cvvInput.addEventListener('input', (e)=>{
        e.target.value = e.target.value.replace(/\D/g, '').slice(0,4);
      });
    }

    function detectCardBrand(digits){
      const brandEl = document.getElementById('cardBrand');
      if (!brandEl) return;
      const v = String(digits || '').replace(/\D/g,'');
      let brand = '';
      if (/^4/.test(v)) brand = 'Visa';
      else if (/^5[1-5]/.test(v) || /^2(2[2-9]|[3-6][0-9]|7[01])/.test(v)) brand = 'Mastercard';
      else if (/^3[47]/.test(v)) brand = 'AmEx';
      else brand = '';

      brandEl.textContent = brand;
      brandEl.className = 'card-brand' + (brand ? ' ' + brand.toLowerCase().replace('amex','amex') : '');
    }

    const subtotal = calcSubtotal();
    const shipping = getCart().length ? SHIPPING : 0;
    const subtotalConEnvio = subtotal + shipping;
    const iva = subtotalConEnvio * IVA_RATE;
    const total = subtotalConEnvio + iva;

    subtotalEl.textContent = format(subtotal);
    shippingEl.textContent = format(shipping);
    ivaEl.textContent = format(iva);
    totalEl.textContent = format(total);

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const card = form.card.value.replace(/\s+/g,'');
      const expiry = form.expiry.value.trim();
      const cvv = form.cvv.value.trim();

      const fb = document.getElementById('payFeedback');
      fb.hidden = false;

      if (!name || !email || !card || !expiry || !cvv){
        fb.style.color = '#b02a37'; fb.textContent = 'Completa todos los campos.'; return;
      }

      // validaciones simples
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk){ fb.style.color='#b02a37'; fb.textContent='Correo inválido.'; return; }

      // tarjeta: solo dígitos entre 12-19 y pasar Luhn
      if (!/^\d{12,19}$/.test(card)) { fb.style.color='#b02a37'; fb.textContent='Número de tarjeta inválido (solo números).'; return; }
      if (!luhnCheck(card)) { fb.style.color='#b02a37'; fb.textContent='Número de tarjeta inválido (no pasa Luhn).'; return; }

      // expiry MM/AA y no vencida
      if (!/^(0[1-9]|1[0-2])\/?\d{2}$/.test(expiry)) { fb.style.color='#b02a37'; fb.textContent='Fecha de vencimiento inválida. Usa MM/AA.'; return; }
      if (isExpired(expiry)) { fb.style.color='#b02a37'; fb.textContent='La tarjeta está vencida.'; return; }

      if (!/^\d{3,4}$/.test(cvv)) { fb.style.color='#b02a37'; fb.textContent='CVV inválido.'; return; }

      // Simular procesamiento
      fb.style.color = '#0a6f3a';
      fb.textContent = 'Procesando pago (simulación)...';

      // Guardar datos de cliente para la factura
      localStorage.setItem('customer', JSON.stringify({ name, email }));

      setTimeout(()=>{
        fb.textContent = 'Pago realizado con éxito (simulación). Redirigiendo a factura...';
        // Redirigir a invoice.html
        setTimeout(()=> window.location.href = 'invoice.html', 1200);
      }, 900);
    });
  });

  // Luhn algorithm for card validation
  function luhnCheck(numStr){
    let sum = 0;
    let shouldDouble = false;
    for (let i = numStr.length - 1; i >= 0; i--) {
      let digit = parseInt(numStr.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  }

  // expiry in MM/YY or MM/AA format check if expired
  function isExpired(expiry){
    const parts = expiry.split('/');
    const mm = parseInt(parts[0], 10);
    let yy = parseInt(parts[1], 10);
    if (yy < 100) yy += 2000;
    const expDate = new Date(yy, mm);
    const now = new Date();
    // compare end of month
    return expDate <= new Date(now.getFullYear(), now.getMonth()+1, 1);
  }

})();

// Funciones globales
function goToProductDetail(productName) {
  window.location.href = `product-detail.html?name=${encodeURIComponent(productName)}`;
}

function toggleFavorite(event, productName) {
  event.preventDefault();
  event.stopPropagation();
  
  const heartIcon = event.currentTarget;
  const icon = heartIcon.querySelector('i');
  
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.indexOf(productName);
  
  if (index > -1) {
    // Quitar de favoritos
    favorites.splice(index, 1);
    icon.classList.remove('bxs-heart');
    icon.classList.add('bx-heart');
    heartIcon.style.color = '';
  } else {
    // Agregar a favoritos
    favorites.push(productName);
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart');
    heartIcon.style.color = '#ee1c47';
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
