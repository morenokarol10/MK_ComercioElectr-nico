/**
 * PÁGINA DE DETALLES DEL PRODUCTO
 * Este archivo gestiona la página de detalles de cada producto
 */

// Array de productos (igual que en product-catalog.js)
const productos = [
  {
    "id": 1,
    "name": "Conjunto",
    "price": 99,
    "rating": 4.5,
    "reviews": 245,
    "description": "Conjunto deportivo casual 100% algodón - corte regular. Perfecto para uso diario con comodidad máxima. Disponible en varios colores y tallas.",
    "image": "imagenes/1.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Negro", "Blanco"],
    "stock": 50,
    "tag": "Oferta",
    "details": [
      "Material: 100% algodón",
      "Tipo: Casual deportivo",
      "Cuidado: Lavar a mano o máquina",
      "Origen: Importado",
      "Stock disponible: 50 piezas"
    ]
  },
  {
    "id": 2,
    "name": "short jean",
    "price": 45,
    "rating": 4.3,
    "reviews": 180,
    "description": "Short jean clásico, algodón stretch, perfecto para verano. Diseño moderno con ajuste cómodo y flatecedor.",
    "image": "imagenes/2.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Azul", "Negro"],
    "stock": 30,
    "tag": "Novedad",
    "details": [
      "Material: 98% algodón, 2% elastano",
      "Tipo: Short casual",
      "Cuidado: Lavar a máquina 30°C",
      "Origen: Importado",
      "Stock disponible: 30 piezas"
    ]
  },
  {
    "id": 3,
    "name": "Zapatillas Deportivas",
    "price": 30,
    "rating": 4.7,
    "reviews": 320,
    "description": "Zapatillas cómodas para uso diario. Suela antideslizante y transpirable. Excelente para actividades al aire libre.",
    "image": "imagenes/3.webp",
    "category": "Calzado",
    "genre": "Unisex",
    "sizes": ["36","37","38","39","40","41"],
    "colors": ["Blanco","Negro","Azul"],
    "stock": 20,
    "tag": "",
    "details": [
      "Material: Tela transpirable",
      "Suela: Caucho antideslizante",
      "Tipo: Deportivo casual",
      "Peso: 300g (aproximado)",
      "Stock disponible: 20 pares"
    ]
  },
  {
    "id": 4,
    "name": "Vestido Semi-elegante",
    "price": 129,
    "rating": 4.6,
    "reviews": 210,
    "description": "Vestido semiformal, ideal para eventos especiales. Confeccionado en tela de calidad con diseño elegante y versátil.",
    "image": "imagenes/4.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Blanco","Negro","Rojo"],
    "stock": 20,
    "tag": "Recomendado",
    "details": [
      "Material: Poliéster 100%",
      "Tipo: Semiformal/Elegante",
      "Cuidado: Lavar en seco",
      "Diseño: Moderno y versátil",
      "Stock disponible: 20 piezas"
    ]
  },
  {
    "id": 5,
    "name": "Jeans Flix Flox",
    "price": 99,
    "rating": 4.4,
    "reviews": 195,
    "description": "Jeans premium con diseño moderno y cómodo. Confeccionado en algodón de alta calidad con acabado impecable.",
    "image": "imagenes/5.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["28","30","32","34","36"],
    "colors": ["Azul","Negro"],
    "stock": 25,
    "tag": "",
    "details": [
      "Material: 99% algodón, 1% elastano",
      "Tipo: Jeans casual premium",
      "Cuidado: Lavar con agua fría",
      "Diseño: Clásico con toques modernos",
      "Stock disponible: 25 piezas"
    ]
  },
  {
    "id": 6,
    "name": "Conjunto Salwar",
    "price": 99,
    "rating": 4.5,
    "reviews": 160,
    "description": "Conjunto tradicional moderno, perfecto para cualquier ocasión. Combina lo tradicional con un toque contemporáneo.",
    "image": "imagenes/6.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Rojo","Azul","Verde"],
    "stock": 15,
    "tag": "Recomendado",
    "details": [
      "Material: Algodón con seda",
      "Tipo: Tradicional moderno",
      "Cuidado: Lavar a mano recomendado",
      "Origen: Importado",
      "Stock disponible: 15 piezas"
    ]
  },
  {
    "id": 7,
    "name": "Kurta Estampada",
    "price": 15,
    "rating": 4.2,
    "reviews": 280,
    "description": "Kurta estampada con diseños tradicionales, cómoda y fresca. Perfecta para los días calurosos.",
    "image": "imagenes/7.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Multicolor","Naranja","Morado"],
    "stock": 40,
    "tag": "Oferta",
    "details": [
      "Material: 100% algodón",
      "Tipo: Kurta casual",
      "Cuidado: Lavar a máquina 30°C",
      "Diseño: Estampado tradicional",
      "Stock disponible: 40 piezas"
    ]
  },
  {
    "id": 8,
    "name": "Vestido Collot",
    "price": 99,
    "rating": 4.6,
    "reviews": 270,
    "description": "Vestido casual para uso diario, cómodo y elegante. Diseño versátil que combina con cualquier accesorio.",
    "image": "imagenes/8.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Beige","Gris","Negro"],
    "stock": 18,
    "tag": "Oferta",
    "details": [
      "Material: Algodón suave",
      "Tipo: Casual/Diario",
      "Cuidado: Lavar a máquina",
      "Diseño: Versátil y cómodo",
      "Stock disponible: 18 piezas"
    ]
  },
  {
    "id": 9,
    "name": "Camisa Casual Hombre",
    "price": 35,
    "rating": 4.4,
    "reviews": 150,
    "description": "Camisa casual de algodón puro, perfecta para uso diario. Con botones de calidad y costuras reforzadas.",
    "image": "imagenes/1.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["S","M","L","XL","XXL"],
    "colors": ["Blanco","Azul","Verde"],
    "stock": 30,
    "tag": "",
    "details": [
      "Material: 100% algodón",
      "Tipo: Casual/Informal",
      "Cuidado: Lavar con agua tibia",
      "Botones: Concha natural",
      "Stock disponible: 30 piezas"
    ]
  },
  {
    "id": 10,
    "name": "Pantalón Formal Hombre",
    "price": 65,
    "rating": 4.5,
    "reviews": 175,
    "description": "Pantalón formal de alta calidad, ideal para oficina. Corte impecable y material duradero.",
    "image": "imagenes/2.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["28","30","32","34","36"],
    "colors": ["Negro","Gris","Azul"],
    "stock": 22,
    "tag": "",
    "details": [
      "Material: 97% poliéster, 3% elastano",
      "Tipo: Formal/Oficina",
      "Cuidado: Lavar en seco",
      "Corte: Recto clásico",
      "Stock disponible: 22 piezas"
    ]
  },
  {
    "id": 11,
    "name": "Tenis Running",
    "price": 85,
    "rating": 4.8,
    "reviews": 420,
    "description": "Tenis especializados para correr, con tecnología de amortiguación. Ligeros, cómodos y resistentes.",
    "image": "imagenes/3.webp",
    "category": "Calzado",
    "genre": "Unisex",
    "sizes": ["36","37","38","39","40","41","42","43"],
    "colors": ["Rojo","Blanco","Negro"],
    "stock": 16,
    "tag": "",
    "details": [
      "Material: Malla sintética",
      "Suela: Espuma amortiguadora",
      "Peso: 250g por pie (aprox)",
      "Tecnología: Amortiguación avanzada",
      "Stock disponible: 16 pares"
    ]
  },
  {
    "id": 12,
    "name": "Bolsa de Mano",
    "price": 55,
    "rating": 4.3,
    "reviews": 135,
    "description": "Bolsa elegante de cuero sintético, perfecta para diario. Espaciosa con varios compartimientos.",
    "image": "imagenes/4.webp",
    "category": "Accesorios",
    "genre": "Mujer",
    "sizes": ["Única"],
    "colors": ["Negro","Marrón","Rosa"],
    "stock": 12,
    "tag": "",
    "details": [
      "Material: Cuero sintético",
      "Tipo: Bolsa de mano",
      "Compartimientos: 3 interiores",
      "Dimensiones: 30x20x12cm",
      "Stock disponible: 12 piezas"
    ]
  },
  {
    "id": 13,
    "name": "Camisa Blanca Básica",
    "price": 6,
    "rating": 4.4,
    "reviews": 92,
    "description": "Camisa blanca básica cómoda y versátil. Perfecta para uso diario.",
    "image": "imagenes/9_camisa.webp",
    "category": "Ropa",
    "genre": "Mujer",
    "sizes": ["S","M","L","XL"],
    "colors": ["Blanco"],
    "stock": 45,
    "tag": "Novedad",
    "details": [
      "Material: 100% algodón",
      "Tipo: Casual básica",
      "Cuidado: Lavar a máquina 30°C",
      "Diseño: Clásico",
      "Stock disponible: 45 piezas"
    ]
  },
  {
    "id": 14,
    "name": "Zapatillas de Caña Alta",
    "price": 35,
    "rating": 4.6,
    "reviews": 118,
    "description": "Zapatillas blancas de caña alta con excelente soporte.",
    "image": "imagenes/10_zapatos.webp",
    "category": "Calzado",
    "genre": "Mujer",
    "sizes": ["35","36","37","38","39","40","41"],
    "colors": ["Blanco"],
    "stock": 28,
    "tag": "Novedad",
    "details": [
      "Material: Lona reforzada",
      "Tipo: Caña alta",
      "Suela: Caucho resistente",
      "Soporte: Acolchado",
      "Stock disponible: 28 pares"
    ]
  },
  {
    "id": 15,
    "name": "Chaqueta Mezclilla Azul Oscuro",
    "price": 30,
    "rating": 4.5,
    "reviews": 145,
    "description": "Chaqueta de mezclilla azul oscuro clásica para hombre.",
    "image": "imagenes/11.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["S","M","L","XL","XXL"],
    "colors": ["Azul Oscuro"],
    "stock": 32,
    "tag": "Novedad",
    "details": [
      "Material: 100% mezclilla",
      "Tipo: Chaqueta casual",
      "Cierre: Botones",
      "Bolsillos: 4",
      "Stock disponible: 32 piezas"
    ]
  },
  {
    "id": 16,
    "name": "Chaqueta de Invierno",
    "price": 40,
    "rating": 4.7,
    "reviews": 162,
    "description": "Chaqueta térmica de invierno para hombre. Cálida y resistente.",
    "image": "imagenes/12.webp",
    "alternateImage": "imagenes/14.1.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["S","M","L","XL","XXL"],
    "colors": ["Negro","Marrón"],
    "stock": 24,
    "tag": "Oferta",
    "details": [
      "Material: Poliéster con forro térmico",
      "Tipo: Abrigo de invierno",
      "Aislamiento: Fibra de calor",
      "Cierre: Cremallera + botones",
      "Stock disponible: 24 piezas"
    ]
  },
  {
    "id": 17,
    "name": "Bolso de Viaje",
    "price": 50,
    "rating": 4.4,
    "reviews": 104,
    "description": "Bolso de viaje espacioso con múltiples compartimientos.",
    "image": "imagenes/13.webp",
    "extraItem": "Incluye: Sudadera Café - $15 (Hombre)",
    "category": "Accesorios",
    "genre": "Hombre",
    "sizes": ["Única"],
    "colors": ["Negro","Marrón"],
    "stock": 18,
    "tag": "",
    "details": [
      "Material: Nylon resistente",
      "Tipo: Bolso viajero",
      "Capacidad: 40 litros",
      "Compartimientos: 5 principales + 3 secundarios",
      "Stock disponible: 18 piezas"
    ]
  },
  {
    "id": 18,
    "name": "Camisa de Mezclilla",
    "price": 28,
    "rating": 4.3,
    "reviews": 89,
    "description": "Camisa de mezclilla para hombre con acabado premium.",
    "image": "imagenes/14.webp",
    "category": "Ropa",
    "genre": "Hombre",
    "sizes": ["S","M","L","XL","XXL"],
    "colors": ["Azul","Negro"],
    "stock": 26,
    "tag": "Novedad",
    "details": [
      "Material: 100% mezclilla",
      "Tipo: Casual sport",
      "Bolsillos: 2 frontales",
      "Acabado: Premium",
      "Stock disponible: 26 piezas"
    ]
  },
  {
    "id": 19,
    "name": "Jeans Azul Claro",
    "price": 18,
    "rating": 4.5,
    "reviews": 156,
    "description": "Jeans de mezclilla azul claro cómodo y duradero.",
    "image": "imagenes/17.webp",
    "category": "Ropa",
    "genre": "Unisex",
    "sizes": ["28","30","32","34","36","38"],
    "colors": ["Azul Claro"],
    "stock": 35,
    "tag": "Oferta",
    "details": [
      "Material: 99% algodón, 1% elastano",
      "Tipo: Casual clásico",
      "Cuidado: Lavar con agua fría",
      "Diseño: Recto moderno",
      "Stock disponible: 35 piezas"
    ]
  },
  {
    "id": 20,
    "name": "Camiseta Casual",
    "price": 9,
    "rating": 4.6,
    "reviews": 203,
    "description": "Camiseta casual de algodón para uso diario.",
    "image": "imagenes/18.webp",
    "category": "Ropa",
    "genre": "Unisex",
    "sizes": ["S","M","L","XL","XXL"],
    "colors": ["Blanco","Negro","Gris"],
    "stock": 60,
    "tag": "Nueva Colección 2026",
    "details": [
      "Material: 100% algodón",
      "Tipo: Casual básica",
      "Cuidado: Lavar a máquina 30°C",
      "Diseño: Versátil",
      "Stock disponible: 60 piezas"
    ]
  }
];

let cantidadProducto = 1;
let productoActual = null;

/**
 * Renderiza las estrellas de calificación
 */
function renderStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="bx bx-star"></i>';
  }
  
  if (hasHalfStar) {
    stars += '<i class="bx bx-star-half"></i>';
  }
  
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    stars += '<i class="bx bx-star"></i>';
  }
  
  return stars;
}

/**
 * Carga los detalles del producto
 */
function cargarDetalleProducto() {
  const productId = sessionStorage.getItem("selectedProductId");
  const productName = sessionStorage.getItem("selectedProductName");

  // Permitir buscar por id o por nombre (cuando venimos de páginas que sólo envían el nombre)
  if (!productId && !productName) {
    document.getElementById("productDetailSection").innerHTML = `
      <div style="text-align: center; padding: 40px; flex: 1;">
        <h2>Producto no encontrado</h2>
        <p>Parece que el producto que buscas no existe.</p>
        <a href="ofertas.html" class="btn-add-cart-detail" style="display: inline-block; margin-top: 20px; text-decoration: none;">
          Volver al catálogo
        </a>
      </div>
    `;
    return;
  }

  productoActual = productoActual = productos.find(p => (productId ? p.id == productId : p.name === productName));
  
  if (!productoActual) {
    document.getElementById("productDetailSection").innerHTML = `
      <div style="text-align: center; padding: 40px; flex: 1;">
        <h2>Producto no encontrado</h2>
        <p>Parece que el producto que buscas no existe.</p>
        <a href="ofertas.html" class="btn-add-cart-detail" style="display: inline-block; margin-top: 20px; text-decoration: none;">
          Volver al catálogo
        </a>
      </div>
    `;
    return;
  }
  
  // Verificar si el producto está en favoritos
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const esFavorito = favorites.includes(productoActual.name);
  
  const html = `
    <div class="product-detail-image">
      <img src="${productoActual.image}" alt="${productoActual.name}" id="mainProductImage">
    </div>

    <div class="product-detail-info">
      <h1>${productoActual.name}</h1>
      
      <div class="product-rating">
        <div class="ratting">
          ${renderStars(productoActual.rating)}
        </div>
        <span>(${productoActual.rating} / 5.0)</span>
        <span>${productoActual.reviews} comentarios</span>
      </div>

      <div class="product-detail-price">$${productoActual.price}</div>

      <p class="product-description">
        ${productoActual.description}
      </p>

      <ul class="product-details-list">
        ${productoActual.details.map(detail => `
          <li>
            <i class='bx bx-check'></i>
            <span>${detail}</span>
          </li>
        `).join('')}
      </ul>

      <div class="product-options">
        <label>Seleccionar Talla:</label>
        <select id="selectSize">
          <option value="">-- Elige una talla --</option>
          ${productoActual.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
      </div>

      <div class="product-options">
        <label>Colores disponibles:</label>
        <div class="color-options" id="colorOptions">
          ${productoActual.colors.map((color, index) => `
            <div class="color-option" 
                 style="background-color: ${color.toLowerCase() === 'blanco' ? 'white' : color.toLowerCase() === 'negro' ? 'black' : color.toLowerCase() === 'azul' ? '#1e90ff' : color.toLowerCase() === 'rojo' ? '#ff0000' : color.toLowerCase() === 'verde' ? '#22b14c' : color.toLowerCase() === 'beige' ? '#f5e6d3' : color.toLowerCase() === 'gris' ? '#808080' : color.toLowerCase() === 'naranja' ? '#ff8c00' : color.toLowerCase() === 'morado' ? '#800080' : color.toLowerCase() === 'rosa' ? '#ffb6c1' : color.toLowerCase() === 'marrón' ? '#8b4513' : color.toLowerCase() === 'multicolor' ? 'linear-gradient(45deg, red, orange, yellow, green, blue)' : '#ccc'}; border: 3px solid #eee;"
                 data-color="${color}" 
                 class="color-option"
                 title="${color}">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="product-quantity">
        <button class="quantity-btn" id="decreaseQty">−</button>
        <div class="quantity-display" id="quantityDisplay">1</div>
        <button class="quantity-btn" id="increaseQty">+</button>
      </div>

      <div class="product-actions-detail">
        <button class="btn-add-cart-detail" id="addToCartBtn">
          <i class='bx bx-cart'></i> Agregar al Carrito
        </button>
        <button class="btn-wishlist-detail" id="addToWishlistBtn">
          <i class='bx ${esFavorito ? 'bxs' : 'bx'}-heart'></i> 
          <span id="wishlistBtnText">${esFavorito ? 'En Favoritos' : 'Agregar a Favoritos'}</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById("productDetailSection").innerHTML = html;
  
  // Agregar event listeners
  document.getElementById("increaseQty").addEventListener("click", () => {
    cantidadProducto++;
    document.getElementById("quantityDisplay").textContent = cantidadProducto;
  });

  document.getElementById("decreaseQty").addEventListener("click", () => {
    if (cantidadProducto > 1) {
      cantidadProducto--;
      document.getElementById("quantityDisplay").textContent = cantidadProducto;
    }
  });

  document.getElementById("addToCartBtn").addEventListener("click", agregarAlCarrito);
  document.getElementById("addToWishlistBtn").addEventListener("click", agregarAFavoritos);

  // Color selection
  document.querySelectorAll(".color-option").forEach(colorOption => {
    colorOption.addEventListener("click", function(e) {
      document.querySelectorAll(".color-option").forEach(opt => opt.classList.remove("selected"));
      this.classList.add("selected");
      // Remover indicador de falta si existía
      this.closest('.color-options')?.classList.remove('missing-option');
    });
  });

  // Añadir estilos temporales para resaltar campos faltantes
  if (!document.getElementById('pd-missing-style')) {
    const s = document.createElement('style');
    s.id = 'pd-missing-style';
    s.innerHTML = `
      .missing-option{box-shadow:0 0 0 4px rgba(238,28,71,0.12); animation:pdShake .35s}
      @keyframes pdShake{0%{transform:translateX(0)}25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-6px)}100%{transform:translateX(0)}}
    `;
    document.head.appendChild(s);
  }
}

/**
 * Agregar al carrito
 */
function agregarAlCarrito() {
  // Validar selects (talla u otras opciones) dentro de .product-options
  const selects = document.querySelectorAll('.product-options select');
  for (const sel of selects) {
    if (!sel.value) {
      // Resaltar y enfocar
      sel.classList.add('missing-option');
      sel.focus();
      setTimeout(() => sel.classList.remove('missing-option'), 1600);
      const label = sel.previousElementSibling ? sel.previousElementSibling.textContent.replace(':','').trim() : 'la opción requerida';
      alert(`Por favor selecciona ${label}`);
      return;
    }
  }

  // Validar color si existen opciones de color
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColor = document.querySelector('.color-option.selected');
  if (colorOptions.length > 0 && !selectedColor) {
    const colorContainer = document.getElementById('colorOptions');
    if (colorContainer) {
      colorContainer.classList.add('missing-option');
      colorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => colorContainer.classList.remove('missing-option'), 1600);
    }
    alert('Por favor selecciona un color');
    return;
  }

  const size = document.getElementById("selectSize").value;
  const color = selectedColor ? selectedColor.getAttribute("data-color") : (productoActual.colors[0] || '');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const cartItem = {
    id: productoActual.id,
    name: productoActual.name,
    price: productoActual.price,
    quantity: cantidadProducto,
    size: size,
    color: color,
    image: productoActual.image
  };

  // Buscar si existe un producto igual
  const existingItem = cart.find(item => 
    item.id === cartItem.id && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += cantidadProducto;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const btn = document.getElementById("addToCartBtn");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="bx bx-check"></i> ¡Agregado al carrito!';
  btn.style.backgroundColor = "#34656D";
  btn.style.color = "white";

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.backgroundColor = "";
    btn.style.color = "";
  }, 2000);
}

/**
 * Agregar a favoritos
 */
function agregarAFavoritos() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const btn = document.getElementById("addToWishlistBtn");
  const btnText = document.getElementById("wishlistBtnText");
  
  const index = favorites.indexOf(productoActual.name);
  
  if (index > -1) {
    // Remover de favoritos
    favorites.splice(index, 1);
    btn.querySelector("i").classList.remove("bxs-heart");
    btn.querySelector("i").classList.add("bx-heart");
    btnText.textContent = "Agregar a Favoritos";
  } else {
    // Agregar a favoritos
    favorites.push(productoActual.name);
    btn.querySelector("i").classList.remove("bx-heart");
    btn.querySelector("i").classList.add("bxs-heart");
    btnText.textContent = "En Favoritos";
  }
  
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/**
 * Cargar productos recomendados
 */
/**
 * Cargar sección: Comprados juntos habitualmente
 */
function cargarCompradosJuntos() {
  if (!productoActual) return;

  // Obtener productos relacionados (misma categoría o género, excluir el actual)
  const productosRelacionados = productos
    .filter(p => (p.category === productoActual.category || p.genre === productoActual.genre) && p.id !== productoActual.id)
    .slice(0, 4);

  const html = productosRelacionados.map(producto => `
    <div class="bought-product-card">
      <img src="${producto.image}" alt="${producto.name}" class="bought-product-image">
      <div class="bought-product-info">
        <p class="bought-product-name">${producto.name}</p>
        <p class="bought-product-price">$${producto.price}</p>
      </div>
    </div>
  `).join('');

  const container = document.getElementById("boughtTogetherGrid");
  if (container) {
    container.innerHTML = html;
    
    // Agregar event listener para ver detalles
    document.querySelectorAll(".bought-product-card").forEach((card, index) => {
      card.addEventListener("click", () => {
        const producto = productosRelacionados[index];
        sessionStorage.setItem("selectedProductId", producto.id);
        sessionStorage.setItem("selectedProductName", producto.name);
        cargarDetalleProducto();
        cargarCompradosJuntos();
        cargarOpinionesDestacadas();
        cargarProductosDestacados();
        cargarProductosRecomendados();
        window.scrollTo(0, 0);
      });
      card.style.cursor = "pointer";
    });
  }
}

/**
 * Cargar sección: Opiniones destacadas
 */
function cargarOpinionesDestacadas() {
  // Opiniones simuladas
  const opiniones = [
    {
      author: "María García",
      rating: 5,
      text: "Excelente producto, superó mis expectativas. Muy buena calidad y entrega rápida.",
      date: "Hace 2 semanas"
    },
    {
      author: "Juan López",
      rating: 4.5,
      text: "Muy bueno en general. El producto es cómodo y bien hecho. Recomendado.",
      date: "Hace 1 mes"
    },
    {
      author: "Ana Martínez",
      rating: 4,
      text: "Buen producto. Tal como lo describe el anuncio. Llegó en perfecto estado.",
      date: "Hace 3 semanas"
    },
    {
      author: "Carlos Rodríguez",
      rating: 5,
      text: "Increíble relación precio-calidad. Es mi segunda compra y seguiré comprando.",
      date: "Hace 1 semana"
    }
  ];

  const html = opiniones.map(opinion => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <p class="review-author">${opinion.author}</p>
          <div class="review-stars">
            ${renderStars(opinion.rating)}
            <span style="color: #666; font-size: 0.9rem; margin-left: 5px;">(${opinion.rating})</span>
          </div>
        </div>
      </div>
      <p class="review-text">"${opinion.text}"</p>
      <p class="review-date">${opinion.date}</p>
    </div>
  `).join('');

  const container = document.getElementById("reviewsGrid");
  if (container) {
    container.innerHTML = html;
  }
}

/**
 * Cargar sección: Productos destacados para tener en cuenta
 */
function cargarProductosDestacados() {
  if (!productoActual) return;

  // Obtener 8 productos destacados (excluir el actual)
  const productosDestacados = productos
    .filter(p => p.id !== productoActual.id)
    .slice(0, 8);

  const html = productosDestacados.map(producto => `
    <div class="featured-item">
      <div class="featured-product-card" data-product-id="${producto.id}" data-product-name="${producto.name}">
        <img src="${producto.image}" alt="${producto.name}" class="featured-product-image">
        <div class="featured-product-info">
          <p class="featured-product-name">${producto.name}</p>
          <div class="featured-product-rating">
            ${renderStars(producto.rating)}
            <span>(${producto.reviews})</span>
          </div>
          <p class="featured-product-price">$${producto.price}</p>
        </div>
      </div>
    </div>
  `).join('');

  const container = document.getElementById("featuredCarousel");
  if (container) {
    container.innerHTML = `<div class="featured-carousel-inner">${html}</div>`;
    
    // Agregar funcionalidad del carrusel
    inicializarCarrusel();
    
    // Agregar event listener para ver detalles
    document.querySelectorAll(".featured-product-card").forEach((card) => {
      card.addEventListener("click", () => {
        const productId = card.getAttribute("data-product-id");
        const productName = card.getAttribute("data-product-name");
        sessionStorage.setItem("selectedProductId", productId);
        sessionStorage.setItem("selectedProductName", productName);
        cargarDetalleProducto();
        cargarCompradosJuntos();
        cargarOpinionesDestacadas();
        cargarProductosDestacados();
        cargarProductosRecomendados();
        window.scrollTo(0, 0);
      });
      card.style.cursor = "pointer";
    });
  }
}

/**
 * Inicializar funcionalidad del carrusel
 */
function inicializarCarrusel() {
  const carousel = document.getElementById("featuredCarousel");
  const inner = carousel?.querySelector(".featured-carousel-inner");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  if (!carousel || !inner || !prevBtn || !nextBtn) return;

  let currentScroll = 0;
  const scrollAmount = 250; // Ancho del item + gap

  prevBtn.addEventListener("click", () => {
    currentScroll = Math.max(0, currentScroll - scrollAmount);
    inner.style.transform = `translateX(-${currentScroll}px)`;
  });

  nextBtn.addEventListener("click", () => {
    const maxScroll = inner.scrollWidth - carousel.clientWidth;
    currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
    inner.style.transform = `translateX(-${currentScroll}px)`;
  });
}

function cargarProductosRecomendados() {
  if (!productoActual) return;

  // Filtrar productos recomendados (misma categoría o género, excluir el actual)
  const recomendados = productos
    .filter(p => (p.category === productoActual.category || p.genre === productoActual.genre) && p.id !== productoActual.id)
    .slice(0, 4);

  const html = recomendados.map(producto => `
    <div class="row">
      <img src="${producto.image}" alt="${producto.name}" class="product-img">
      
      <div class="product-text">
        ${producto.tag ? `<h5>${producto.tag}</h5>` : ''}
      </div>

      <div class="heart-icon" data-product-id="${producto.id}">
        <i class='bx bx-heart'></i>
      </div>     
      
      <div class="ratting">
        ${renderStars(producto.rating)}
      </div>

      <div class="price">
        <h4>${producto.name}</h4>
        <p>$${producto.price}</p>
        <small class="reviews">${producto.reviews} comentarios</small>
      </div>

      <div class="product-actions">
        <button class="btn-detail" data-product-id="${producto.id}" data-product-name="${producto.name}">
          <i class='bx bx-show'></i> Ver detalles
        </button>
        <button class="add-to-cart" data-product="${producto.name}" data-price="${producto.price}">
          <i class='bx bx-cart'></i> Agregar
        </button>
      </div>
    </div>
  `).join('');

  const recommendedContainer = document.getElementById("recommendedProducts");
  recommendedContainer.innerHTML = html;

  // Agregar funcionalidad
  agregarFuncionalidadCorazonesRecomendados();
  agregarFuncionalidadCarritoRecomendados();
  agregarFuncionalidadDetallesRecomendados();
}

/**
 * Funcionalidad de corazones en recomendados
 */
function agregarFuncionalidadCorazonesRecomendados() {
  document.querySelectorAll("#recommendedProducts .heart-icon").forEach(heartIcon => {
    heartIcon.addEventListener("click", function(e) {
      e.preventDefault();
      const icon = this.querySelector("i");
      const productId = this.getAttribute("data-product-id");
      const productName = this.closest(".row").querySelector(".price h4").textContent;
      
      if (icon.classList.contains("bx-heart")) {
        icon.classList.remove("bx-heart");
        icon.classList.add("bxs-heart");
        this.style.color = "#ee1c47";
        
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.includes(productName)) {
          favorites.push(productName);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      } else {
        icon.classList.remove("bxs-heart");
        icon.classList.add("bx-heart");
        this.style.color = "";
        
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(fav => fav !== productName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    });
  });
}

/**
 * Funcionalidad carrito en recomendados
 */
function agregarFuncionalidadCarritoRecomendados() {
  document.querySelectorAll("#recommendedProducts .add-to-cart").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      const productName = this.getAttribute("data-product");
      const productPrice = this.getAttribute("data-price");
      
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
      
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="bx bx-check"></i> ¡Agregado!';
      this.style.backgroundColor = "#34656D";
      this.style.color = "white";
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 2000);
    });
  });
}

/**
 * Funcionalidad detalles en recomendados
 */
function agregarFuncionalidadDetallesRecomendados() {
  document.querySelectorAll("#recommendedProducts .btn-detail").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      const productId = this.getAttribute("data-product-id");
      const productName = this.getAttribute("data-product-name");
      
      sessionStorage.setItem("selectedProductId", productId);
      sessionStorage.setItem("selectedProductName", productName);
      
      cargarDetalleProducto();
      cargarCompradosJuntos();
      cargarOpinionesDestacadas();
      cargarProductosDestacados();
      cargarProductosRecomendados();
      window.scrollTo(0, 0);
    });
  });
}

// Cargar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarDetalleProducto();
  cargarCompradosJuntos();
  cargarOpinionesDestacadas();
  cargarProductosDestacados();
  cargarProductosRecomendados();
});
