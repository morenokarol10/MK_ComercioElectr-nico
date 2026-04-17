/**
 * NUEVA COLECCIÓN 2026 - MK ECOMMERCE
 * Este archivo gestiona los productos de la nueva colección 2026
 */

// Array de productos de la nueva colección 2026
const nuevaColeccion = [
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
 * Carga la nueva colección en el DOM
 */
function cargarNuevaColeccion() {
  const container = document.getElementById('catalogoProductos');
  
  if (!container) return;
  
  let html = '<div class="products" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">';
  
  nuevaColeccion.forEach(producto => {
    html += `
      <div class="product-card" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; transition: transform 0.3s;">
        <div class="product-image" style="position: relative; overflow: hidden; height: 280px;">
          <img src="${producto.image}" alt="${producto.name}" style="width: 100%; height: 100%; object-fit: cover;">
          <div class="product-tag" style="position: absolute; top: 10px; left: 10px; background: #ff6b6b; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px;">
            ${producto.tag}
          </div>
          <div class="product-heart" style="position: absolute; top: 10px; right: 10px; cursor: pointer;">
            <i class='bx bx-heart' onclick="toggleFavorite('${producto.name}')" style="font-size: 24px; color: white; text-shadow: 0 0 4px rgba(0,0,0,0.5);"></i>
          </div>
        </div>
        
        <div class="product-info" style="padding: 15px;">
          <h5 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${producto.name}</h5>
          
          <div class="product-rating" style="margin-bottom: 10px;">
            <div class="rating-stars" style="color: #ffc107; font-size: 14px;">
              ${renderStars(producto.rating)}
            </div>
            <span style="font-size: 12px; color: #666;">(${producto.reviews} reviews)</span>
          </div>
          
          <p style="font-size: 14px; color: #666; margin: 0 0 10px 0; min-height: 40px;">${producto.description}</p>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4 style="margin: 0; font-size: 18px; color: #ff6b6b; font-weight: 700;">$${producto.price}</h4>
            <span style="font-size: 12px; background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px;">Stock: ${producto.stock}</span>
          </div>
          
          <button class="btn-add-cart" onclick="openProductModal('${producto.name}')" style="width: 100%; padding: 10px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.3s;">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

/**
 * Abre el modal de producto
 */
function openProductModal(productName) {
  const producto = nuevaColeccion.find(p => p.name === productName);
  
  if (!producto) return;
  
  // Guardar producto en sessionStorage para la página de detalles
  sessionStorage.setItem("selectedProductId", producto.id);
  sessionStorage.setItem("selectedProductName", producto.name);
  
  // Crear o actualizar el modal
  let modal = document.getElementById('productModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'product-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    document.body.appendChild(modal);
  }
  
  const colorOptions = producto.colors.map(color => 
    `<div style="display: inline-block; margin: 5px 10px 5px 0; cursor: pointer;">
      <label style="cursor: pointer;">
        <input type="radio" name="color" value="${color}" ${producto.colors.indexOf(color) === 0 ? 'checked' : ''} style="margin-right: 5px;">
        ${color}
      </label>
    </div>`
  ).join('');
  
  const sizeOptions = producto.sizes.map(size =>
    `<option value="${size}">${size}</option>`
  ).join('');
  
  modal.innerHTML = `
    <div style="background: white; border-radius: 8px; max-width: 600px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
      <button onclick="closeProductModal()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 28px; cursor: pointer; color: #666;">&times;</button>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <img src="${producto.image}" alt="${producto.name}" style="width: 100%; border-radius: 8px; object-fit: cover; height: 400px;">
        </div>
        
        <div>
          <h2 style="margin: 0 0 10px 0;">${producto.name}</h2>
          
          <div style="color: #ffc107; margin-bottom: 10px;">
            ${renderStars(producto.rating)}
            <span style="color: #666; font-size: 14px;">(${producto.reviews} reviews)</span>
          </div>
          
          <h3 style="color: #ff6b6b; margin: 15px 0;">$${producto.price}</h3>
          
          <p style="color: #666; margin-bottom: 15px;">${producto.description}</p>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px;">Talla:</label>
            <select id="modalSize" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              ${sizeOptions}
            </select>
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px;">Color:</label>
            <div id="colorOptions">${colorOptions}</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px;">Cantidad:</label>
            <input type="number" id="modalQuantity" min="1" max="${producto.stock}" value="1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          
          <div style="display: flex; gap: 10px;">
            <button onclick="agregarAlCarrito('${producto.name}')" style="flex: 1; padding: 12px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 16px;">
              Agregar al Carrito
            </button>
            <button onclick="closeProductModal()" style="flex: 1; padding: 12px; background: #f0f0f0; color: #333; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
}

/**
 * Cierra el modal de producto
 */
function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Agrega el producto al carrito
 */
function agregarAlCarrito(productName) {
  const producto = nuevaColeccion.find(p => p.name === productName);
  if (!producto) return;
  
  const talla = document.getElementById('modalSize')?.value || producto.sizes[0];
  const cantidad = parseInt(document.getElementById('modalQuantity')?.value || 1);
  const color = document.querySelector('input[name="color"]:checked')?.value || producto.colors[0];
  
  // Obtener carrito actual
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Buscar si el producto ya existe en el carrito
  const itemExistente = carrito.find(item => 
    item.id === producto.id && item.talla === talla && item.color === color
  );
  
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.name,
      precio: producto.price,
      imagen: producto.image,
      talla: talla,
      color: color,
      cantidad: cantidad
    });
  }
  
  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Mostrar confirmación
  alert(`${producto.name} agregado al carrito!`);
  closeProductModal();
}

/**
 * Alterna favorito
 */
function toggleFavorite(productName) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  if (favorites.includes(productName)) {
    favorites = favorites.filter(fav => fav !== productName);
  } else {
    favorites.push(productName);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Cargar la colección cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarNuevaColeccion);
