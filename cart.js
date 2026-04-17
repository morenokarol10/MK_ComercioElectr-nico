// cart.js — maneja la UI del carrito, cantidades, eliminación y totales en tiempo real
(function(){
  const SHIPPING_COST = 5.00;
  const IVA_RATE = 0.15; // 15% para Ecuador

  function parsePrice(value){
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  function formatPrice(num){
    return '$' + Number(num).toFixed(2);
  }

  function getCart(){
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderCart(){
    const container = document.getElementById('cartItems');
    const summarySubtotalEl = document.getElementById('summarySubtotal');
    const summaryShippingEl = document.getElementById('summaryShipping');
    const summaryIVAEl = document.getElementById('summaryIVA');
    const summaryTotalEl = document.getElementById('summaryTotal');

    container.innerHTML = '';
    const cart = getCart();

    if (cart.length === 0){
      container.innerHTML = '<p style="color:#666;">Tu carrito está vacío.</p>';
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const price = parsePrice(item.price);
      const qty = Number(item.quantity) || 1;
      const itemSubtotal = price * qty;
      subtotal += itemSubtotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image || 'imagenes/1.webp'}" alt="${item.name}" class="cart-img">
        <div class="cart-details">
          <h4>${item.name}</h4>
          <div style="display:flex; gap:12px; align-items:center;">
            <div class="item-price">${formatPrice(price)}</div>
            <div class="quantity-box" data-index="${index}">
              <button class="qty-btn" data-action="decrease" aria-label="Disminuir cantidad">-</button>
              <input class="qty-input" type="text" value="${qty}" aria-label="Cantidad del producto">
              <button class="qty-btn" data-action="increase" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>
          <p class="subtotal">Subtotal: <strong>${formatPrice(itemSubtotal)}</strong></p>
        </div>
        <button class="delete-btn" aria-label="Eliminar producto" data-index="${index}"><i class='bx bx-trash'></i></button>
      `;

      container.appendChild(itemEl);
    });

    // actualizar resumen
    const shipping = cart.length ? SHIPPING_COST : 0;
    const subtotalConEnvio = subtotal + shipping;
    const iva = subtotalConEnvio * IVA_RATE;
    const total = subtotalConEnvio + iva;

    summarySubtotalEl.textContent = formatPrice(subtotal);
    summaryShippingEl.textContent = formatPrice(shipping);
    summaryIVAEl.textContent = formatPrice(iva);
    summaryTotalEl.textContent = formatPrice(total);

    attachListeners();
  }

  function attachListeners(){
    document.querySelectorAll('.quantity-box').forEach(box => {
      const idx = Number(box.getAttribute('data-index'));
      const input = box.querySelector('.qty-input');

      box.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          changeQuantity(idx, action === 'increase' ? 1 : -1);
        });
      });

      input.addEventListener('change', () => {
        const val = parseInt(input.value) || 1;
        setQuantity(idx, val);
      });
      input.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter') input.blur();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', ()=>{
        const idx = Number(btn.getAttribute('data-index'));
        removeItem(idx);
      });
    });
  }

  function changeQuantity(index, delta){
    const cart = getCart();
    if (!cart[index]) return;
    let qty = Number(cart[index].quantity) || 1;
    qty = Math.max(1, qty + delta);
    cart[index].quantity = qty;
    saveCart(cart);
    renderCart();
  }

  function setQuantity(index, value){
    const cart = getCart();
    if (!cart[index]) return;
    const qty = Math.max(1, Number(value) || 1);
    cart[index].quantity = qty;
    saveCart(cart);
    renderCart();
  }

  function removeItem(index){
    const cart = getCart();
    if (!cart[index]) return;
    cart.splice(index,1);
    saveCart(cart);
    renderCart();
  }

  // Inicializar
  document.addEventListener('DOMContentLoaded', () => {
    renderCart();
  });

})();
