// invoice.js — genera una factura simulada a partir de localStorage.cart
(function(){
  const SHIPPING = 5.00;
  const IVA_RATE = 0.15; // 15% para Ecuador

  function parsePrice(value){
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  function format(num){ return '$' + Number(num).toFixed(2); }

  function getCart(){ return JSON.parse(localStorage.getItem('cart')) || []; }
  function getCustomer(){ return JSON.parse(localStorage.getItem('customer')) || { name: 'Cliente Demo', email: 'demo@correo.com' }; }

  function render(){
    const itemsEl = document.getElementById('invoiceItems');
    const subtotalEl = document.getElementById('invSubtotal');
    const shippingEl = document.getElementById('invShipping');
    const ivaEl = document.getElementById('invIVA');
    const totalEl = document.getElementById('invTotal');
    const clientName = document.getElementById('clientName');
    const clientEmail = document.getElementById('clientEmail');

    const cart = getCart();
    const customer = getCustomer();

    clientName.textContent = customer.name || 'Cliente Demo';
    clientEmail.textContent = customer.email || 'demo@correo.com';

    itemsEl.innerHTML = '';
    let subtotal = 0;
    cart.forEach(item => {
      const price = parsePrice(item.price);
      const qty = Number(item.quantity) || 1;
      const line = price * qty;
      subtotal += line;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${qty}</td>
        <td>${format(price)}</td>
        <td>${format(line)}</td>
      `;
      itemsEl.appendChild(tr);
    });

    const shipping = cart.length ? SHIPPING : 0;
    const subtotalConEnvio = subtotal + shipping;
    const iva = subtotalConEnvio * IVA_RATE;
    const total = subtotalConEnvio + iva;

    subtotalEl.textContent = format(subtotal);
    shippingEl.textContent = format(shipping);
    ivaEl.textContent = format(iva);
    totalEl.textContent = format(total);

    // metadata
    document.getElementById('invDate').textContent = new Date().toLocaleString();
    document.getElementById('invNumber').textContent = 'SIM-' + String(Date.now()).slice(-8);
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('printInvoice').addEventListener('click', ()=> window.print());
  });

})();
