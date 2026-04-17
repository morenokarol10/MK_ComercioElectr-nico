// ===============================
// app.js - Interactividad del sitio MK
// ===============================

// --- VARIABLES GLOBALES ---
const cartPanel = document.getElementById("cart-panel");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");
const btnCart = document.getElementById("btn-cart");
const btnMenu = document.getElementById("btn-menu");
const mainNav = document.getElementById("main-nav");
const searchBox = document.getElementById("search-box");
const btnSearch = document.getElementById("btn-search");
const announcer = document.getElementById("aria-announcer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// FUNCIONES DE CARRITO
// ===============================

// Mostrar carrito
function openCart() {
  cartPanel.classList.remove("hidden");
  cartPanel.setAttribute("aria-hidden", "false");
  btnCart.setAttribute("aria-expanded", "true");

  // 🟩 (A) ACCESIBILIDAD: al abrir el carrito, se pone el foco y se anuncia
  cartPanel.focus();
  announce("Carrito abierto");
}

// Cerrar carrito
function closeCart() {
  cartPanel.classList.add("hidden");
  cartPanel.setAttribute("aria-hidden", "true");
  btnCart.setAttribute("aria-expanded", "false");
  announce("Carrito cerrado");
}

// Agregar producto al carrito
function addToCart(product) {
  // Buscar producto existente con la misma talla y color
  const found = cart.find(p => 
    p.name === product.name && 
    p.size === product.size && 
    p.color === product.color
  );
  
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  announce(`${product.name} agregado al carrito`);
}

// Eliminar producto
function removeFromCart(name, size, color) {
  cart = cart.filter(p => !(p.name === name && p.size === size && p.color === color));
  updateCart();
  announce("Producto eliminado");
}

// Actualizar interfaz del carrito
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("div");
    li.className = "cart-item";
    let optionsText = '';
    if (item.size || item.color) {
      const options = [];
      if (item.size) options.push(`Talla: ${item.size}`);
      if (item.color) options.push(`Color: ${item.color}`);
      optionsText = ` (${options.join(', ')})`;
    }
    li.innerHTML = `
      <span>${item.name}${optionsText}</span>
      <span>${item.quantity} × $${item.price.toFixed(2)}</span>
      <button class="remove-btn" aria-label="Eliminar ${item.name}">✕</button>
    `;
    li.querySelector("button").addEventListener("click", () => removeFromCart(item.name, item.size, item.color));
    cartItems.appendChild(li);

    total += item.quantity * item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

// ===============================
// FUNCIONES DE UTILIDAD
// ===============================

//Anunciador ARIA: mejora accesibilidad
function announce(message) {
  if (announcer) {
    announcer.textContent = "";
    setTimeout(() => announcer.textContent = message, 100);
  }
}

//Scroll suave al hacer clic en “Ver más”
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth"
        });
      }
    }
  });
});

// ===============================
// EVENTOS PRINCIPALES
// ===============================

// Abrir/cerrar carrito
btnCart.addEventListener("click", () => {
  const isOpen = !cartPanel.classList.contains("hidden");
  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
});

// Cerrar carrito con botón “Cerrar”
document.getElementById("close-cart")?.addEventListener("click", closeCart);

// }Al cargar la página, actualizar contador del carrito (forzado)
window.addEventListener("load", () => {
  updateCart();
  announce("Página cargada, carrito actualizado");
});

// Buscar
btnSearch.addEventListener("click", () => {
  searchBox.classList.toggle("hidden");
  const expanded = !searchBox.classList.contains("hidden");
  btnSearch.setAttribute("aria-expanded", expanded);
  searchBox.setAttribute("aria-hidden", !expanded);
  if (expanded) {
    searchBox.querySelector("input").focus();
  }
});

// Menú 
btnMenu?.addEventListener("click", () => {
  const expanded = mainNav.style.display === "flex";
  mainNav.style.display = expanded ? "none" : "flex";
  btnMenu.setAttribute("aria-expanded", !expanded);
});

// ===============================
// CARGAR PRODUCTOS (si existe products-grid)
// ===============================
const productsGrid = document.getElementById("products-grid");

if (productsGrid) {
  fetch("/api/products")
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>$${product.price.toFixed(2)}</p>
          <button class="btn" aria-label="Agregar ${product.name} al carrito">Agregar</button>
        `;
        card.querySelector("button").addEventListener("click", () => addToCart(product));
        productsGrid.appendChild(card);
      });
    })
    .catch(err => console.error("Error al cargar productos:", err));
}