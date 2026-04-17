const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
});

// ===== DATOS DE PRODUCTOS (para búsqueda de opciones) =====
const productosGlobal = [
  { id: 1, name: "Conjunto", price: 99, image: "imagenes/1.webp", sizes: ["S","M","L","XL"], colors: ["Negro", "Blanco"] },
  { id: 2, name: "short jean", price: 45, image: "imagenes/2.webp", sizes: ["S","M","L","XL"], colors: ["Azul", "Negro"] },
  { id: 3, name: "Zapatillas Deportivas", price: 30, image: "imagenes/3.webp", sizes: ["36","37","38","39","40","41"], colors: ["Blanco","Negro","Azul"] },
  { id: 4, name: "Vestido Semi-elegante", price: 129, image: "imagenes/4.webp", sizes: ["S","M","L","XL"], colors: ["Blanco","Negro","Rojo"] },
  { id: 5, name: "Jeans Flix Flox", price: 99, image: "imagenes/5.webp", sizes: ["28","30","32","34","36"], colors: ["Azul","Negro"] },
  { id: 6, name: "Conjunto Salwar", price: 99, image: "imagenes/6.webp", sizes: ["S","M","L","XL"], colors: ["Rojo","Azul","Verde"] },
  { id: 7, name: "Kurta Estampada", price: 15, image: "imagenes/7.webp", sizes: ["S","M","L","XL"], colors: ["Multicolor","Naranja","Morado"] },
  { id: 8, name: "Vestido Collot", price: 99, image: "imagenes/8.webp", sizes: ["S","M","L","XL"], colors: ["Beige","Gris","Negro"] },
  { id: 9, name: "Camisa Casual Hombre", price: 35, image: "imagenes/1.webp", sizes: ["S","M","L","XL","XXL"], colors: ["Blanco","Azul","Verde"] },
  { id: 10, name: "Pantalón Formal Hombre", price: 65, image: "imagenes/2.webp", sizes: ["28","30","32","34","36"], colors: ["Negro","Gris","Azul"] },
  { id: 11, name: "Tenis Running", price: 85, image: "imagenes/3.webp", sizes: ["36","37","38","39","40","41","42","43"], colors: ["Rojo","Blanco","Negro"] },
  { id: 12, name: "Bolsa de Mano", price: 55, image: "imagenes/6.webp", sizes: ["Única"], colors: ["Negro","Marrón","Rosa"] },
  { id: 13, name: "Camisa Blanca Básica", price: 6, image: "imagenes/9_camisa.webp", sizes: ["S","M","L","XL"], colors: ["Blanco"] },
  { id: 14, name: "Zapatillas de Caña Alta", price: 35, image: "imagenes/10_zapatos.webp", sizes: ["35","36","37","38","39","40","41"], colors: ["Blanco"] },
  { id: 15, name: "Chaqueta Mezclilla Azul Oscuro", price: 30, image: "imagenes/11.webp", sizes: ["S","M","L","XL","XXL"], colors: ["Azul Oscuro"] },
  { id: 16, name: "Chaqueta de Invierno", price: 40, image: "imagenes/12.webp", sizes: ["S","M","L","XL","XXL"], colors: ["Negro","Marrón"] },
  { id: 17, name: "Bolso de Viaje", price: 50, image: "imagenes/13.webp", sizes: ["Única"], colors: ["Negro","Marrón"] },
  { id: 18, name: "Camisa de Mezclilla", price: 28, image: "imagenes/14.webp", sizes: ["S","M","L","XL","XXL"], colors: ["Azul","Negro"] },
  { id: 19, name: "Jeans Azul Claro", price: 18, image: "imagenes/17.webp", sizes: ["28","30","32","34","36","38"], colors: ["Azul Claro"] },
  { id: 20, name: "Camiseta Casual", price: 9, image: "imagenes/18.webp", sizes: ["S","M","L","XL","XXL"], colors: ["Blanco","Negro","Gris"] }
];

// ===== CREAR MODAL =====
function createProductOptionsModal() {
  const modal = document.createElement('div');
  modal.id = 'productOptionsModal';
  modal.className = 'product-options-modal';
  modal.innerHTML = `
    <div class="product-options-modal-content">
      <button class="modal-close" onclick="closeProductModal()">&times;</button>
      <div class="modal-product-info">
        <img id="modalProductImg" src="" alt="" class="modal-product-img">
        <div class="modal-product-details">
          <h3 id="modalProductName"></h3>
          <p id="modalProductPrice"></p>
        </div>
      </div>
      <div class="modal-options">
        <label for="modalSelectSize">Seleccionar Talla:</label>
        <select id="modalSelectSize"></select>
      </div>
      <div class="modal-colors">
        <label>Colores disponibles:</label>
        <div class="modal-color-options" id="modalColorOptions"></div>
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-add" onclick="addFromModalToCart()">Agregar al Carrito</button>
        <button class="modal-btn modal-btn-cancel" onclick="closeProductModal()">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ===== VARIABLES GLOBALES PARA MODAL =====
let modalProduct = null;
let modalSelectedSize = '';
let modalSelectedColor = '';

// ===== ABRIR MODAL =====
function openProductModal(productName) {
  const product = productosGlobal.find(p => p.name === productName);
  if (!product) return;

  modalProduct = product;
  modalSelectedSize = '';
  modalSelectedColor = '';

  const modal = document.getElementById('productOptionsModal') || createProductOptionsModal();
  modal.classList.add('active');

  // Llenar datos
  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = `$${product.price}`;

  // Llenar tallas
  const sizeSelect = document.getElementById('modalSelectSize');
  sizeSelect.innerHTML = '<option value="">-- Elige una talla --</option>';
  product.sizes.forEach(size => {
    const opt = document.createElement('option');
    opt.value = size;
    opt.textContent = size;
    sizeSelect.appendChild(opt);
  });

  // Llenar colores
  const colorContainer = document.getElementById('modalColorOptions');
  colorContainer.innerHTML = '';
  product.colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'modal-color-option';
    colorDiv.style.backgroundColor = getColorHex(color);
    colorDiv.title = color;
    colorDiv.onclick = () => selectModalColor(color, colorDiv);
    colorContainer.appendChild(colorDiv);
  });
}

// ===== OBTENER CÓDIGO HEX DE COLOR =====
function getColorHex(color) {
  const colorMap = {
    'blanco': 'white',
    'negro': 'black',
    'azul': '#1e90ff',
    'rojo': '#ff0000',
    'verde': '#22b14c',
    'beige': '#f5e6d3',
    'gris': '#808080',
    'naranja': '#ff8c00',
    'morado': '#800080',
    'rosa': '#ffb6c1',
    'marrón': '#8b4513',
    'multicolor': 'linear-gradient(45deg, red, orange, yellow, green, blue)'
  };
  return colorMap[color.toLowerCase()] || '#ccc';
}

// ===== SELECCIONAR COLOR EN MODAL =====
function selectModalColor(color, element) {
  document.querySelectorAll('.modal-color-option.selected').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  modalSelectedColor = color;
}

// ===== CERRAR MODAL =====
function closeProductModal() {
  const modal = document.getElementById('productOptionsModal');
  if (modal) {
    modal.classList.remove('active');
    modalProduct = null;
    modalSelectedSize = '';
    modalSelectedColor = '';
  }
}

// ===== AGREGAR AL CARRITO DESDE MODAL =====
function addFromModalToCart() {
  const sizeSelect = document.getElementById('modalSelectSize');
  const size = sizeSelect.value;

  if (!size) {
    alert('Por favor selecciona una talla');
    return;
  }

  if (!modalSelectedColor) {
    alert('Por favor selecciona un color');
    return;
  }

  // Agregar al carrito
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = {
    id: modalProduct.id,
    name: modalProduct.name,
    price: modalProduct.price,
    quantity: 1,
    size: size,
    color: modalSelectedColor,
    image: modalProduct.image
  };

  const existingItem = cart.find(item => 
    item.id === cartItem.id && item.size === size && item.color === modalSelectedColor
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Feedback visual
  const btn = document.querySelector('.modal-btn-add');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="bx bx-check"></i> ¡Agregado!';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    closeProductModal();
  }, 1500);
}

// ===== INICIALIZAR MODAL =====
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('productOptionsModal')) {
    createProductOptionsModal();
  }
});

// Funcionalidad del corazón (favoritos)
document.addEventListener('click', function(e) {
  if (e.target.closest('.heart-icon')) {
    e.preventDefault();
    const heartIcon = e.target.closest('.heart-icon');
    const icon = heartIcon.querySelector("i");
    
    if (icon.classList.contains("bx-heart")) {
      // Cambiar a corazón relleno
      icon.classList.remove("bx-heart");
      icon.classList.add("bxs-heart");
      heartIcon.style.color = "#ee1c47";
      
      // Agregar a favoritos (localStorage)
      const productName = heartIcon.closest(".row").querySelector(".price h4").textContent;
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.includes(productName)) {
        favorites.push(productName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } else {
      // Cambiar a corazón vacío
      icon.classList.remove("bxs-heart");
      icon.classList.add("bx-heart");
      heartIcon.style.color = "";
      
      // Quitar de favoritos
      const productName = heartIcon.closest(".row").querySelector(".price h4").textContent;
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter(fav => fav !== productName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
});

// Funcionalidad del carrito
document.addEventListener('click', function(e) {
  if (e.target.closest('.add-to-cart')) {
    e.preventDefault();
    const button = e.target.closest('.add-to-cart');
    const productName = button.getAttribute("data-product");
    const productPrice = button.getAttribute("data-price");

    // Buscar producto para ver si necesita opciones
    const product = productosGlobal.find(p => p.name === productName);
    
    if (product && ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0))) {
      // Abrir modal para seleccionar opciones
      openProductModal(productName);
      return;
    }

    // Si no requiere opciones, agregar directamente
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Feedback visual
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bx bx-check"></i> ¡Agregado!';
    button.style.backgroundColor = "#34656D";
    button.style.color = "white";

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.backgroundColor = "";
      button.style.color = "";
    }, 2000);
  }
});
