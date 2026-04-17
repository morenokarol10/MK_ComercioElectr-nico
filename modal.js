// modal.js - Modal reutilizable para seleccionar opciones de productos
(function() {
  // Variables globales del modal
  let currentProduct = null;
  let selectedSize = null;
  let selectedColor = null;
  let allProducts = [];

  // Crear el modal si no existe
  function createModalHTML() {
    if (document.getElementById('globalProductModal')) return;

    const modalHTML = `
      <div id="globalProductModal" class="modal-options" style="display: none;">
        <div class="modal-overlay" onclick="closeProductModal()"></div>
        <div class="modal-content">
          <button class="modal-close" onclick="closeProductModal()">×</button>
          <h2>Selecciona opciones del producto</h2>
          
          <div id="modalProductInfo" class="modal-product-info">
            <!-- Información del producto se cargará aquí -->
          </div>

          <!-- Talla -->
          <div id="sizeSection" class="modal-section" style="display: none;">
            <label>Talla</label>
            <div id="sizeOptions" class="options-grid">
              <!-- Opciones de talla se cargarán aquí -->
            </div>
          </div>

          <!-- Color -->
          <div id="colorSection" class="modal-section" style="display: none;">
            <label>Color</label>
            <div id="colorOptions" class="options-grid">
              <!-- Opciones de color se cargarán aquí -->
            </div>
          </div>

          <button id="confirmBtn" class="btn-confirm" onclick="confirmProductAdd()">
            Agregar al carrito
          </button>
        </div>
      </div>

      <style>
        .modal-options {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-options .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          cursor: pointer;
        }

        .modal-options .modal-content {
          position: relative;
          background: white;
          border-radius: 8px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .modal-options .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #999;
        }

        .modal-options .modal-close:hover {
          color: #333;
        }

        .modal-options .modal-content h2 {
          margin-top: 0;
          color: #222;
          font-size: 20px;
        }

        .modal-product-info {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-product-info img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
        }

        .modal-product-info-text h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #222;
        }

        .modal-product-info-text p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .modal-section {
          margin-bottom: 20px;
        }

        .modal-section label {
          display: block;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
          gap: 8px;
        }

        .option-btn {
          padding: 10px;
          border: 2px solid #ddd;
          background: white;
          color: #222;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .option-btn:hover {
          border-color: #34656D;
          color: #34656D;
        }

        .option-btn.selected {
          background: #34656D;
          color: white;
          border-color: #34656D;
        }

        .btn-confirm {
          width: 100%;
          padding: 12px;
          background: #34656D;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 20px;
        }

        .btn-confirm:hover {
          background: #2a4f57;
        }

        .btn-confirm:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Cargar productos
  async function loadProducts() {
    try {
      const res = await fetch('products.json');
      allProducts = await res.json();
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }

  // Abrir modal
  window.openProductModal = async function(productName, productPrice, sizes, colors) {
    // Si no se pasó productPrice, buscar en los productos cargados
    if (!allProducts.length) await loadProducts();

    let product;
    if (productName && (productPrice || sizes || colors)) {
      // Se pasaron parámetros directamente
      product = { name: productName, price: productPrice, sizes: sizes || [], colors: colors || [] };
    } else {
      // Buscar en los productos cargados
      product = allProducts.find(p => p.name === productName);
      if (!product) {
        alert(`Producto "${productName}" no encontrado`);
        return;
      }
    }

    currentProduct = product;
    selectedSize = null;
    selectedColor = null;

    // Construir información del producto
    const productImage = product.image || 'imagenes/1.webp';
    const productInfoHTML = `
      <img src="${productImage}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
      <div class="modal-product-info-text">
        <h3>${product.name}</h3>
        <p>$${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
      </div>
    `;

    const modalProductInfo = document.getElementById('modalProductInfo');
    const sizeSection = document.getElementById('sizeSection');
    const sizeOptions = document.getElementById('sizeOptions');
    const colorSection = document.getElementById('colorSection');
    const colorOptions = document.getElementById('colorOptions');

    modalProductInfo.innerHTML = productInfoHTML;

    // Mostrar opciones de talla
    if (product.sizes && product.sizes.length > 0) {
      sizeSection.style.display = 'block';
      sizeOptions.innerHTML = product.sizes.map(size => `
        <button class="option-btn" onclick="selectSize('${size}')">${size}</button>
      `).join('');
    } else {
      sizeSection.style.display = 'none';
    }

    // Mostrar opciones de color
    if (product.colors && product.colors.length > 0) {
      colorSection.style.display = 'block';
      colorOptions.innerHTML = product.colors.map(color => `
        <button class="option-btn" onclick="selectColor('${color}')">${color}</button>
      `).join('');
    } else {
      colorSection.style.display = 'none';
    }

    // Mostrar modal
    const modal = document.getElementById('globalProductModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  };

  // Seleccionar talla
  window.selectSize = function(size) {
    selectedSize = size;
    const buttons = document.querySelectorAll('#sizeOptions .option-btn');
    buttons.forEach(btn => {
      btn.classList.remove('selected');
      if (btn.textContent.trim() === size) {
        btn.classList.add('selected');
      }
    });
  };

  // Seleccionar color
  window.selectColor = function(color) {
    selectedColor = color;
    const buttons = document.querySelectorAll('#colorOptions .option-btn');
    buttons.forEach(btn => {
      btn.classList.remove('selected');
      if (btn.textContent.trim() === color) {
        btn.classList.add('selected');
      }
    });
  };

  // Confirmar y agregar al carrito
  window.confirmProductAdd = function() {
    const sizeSection = document.getElementById('sizeSection');
    const colorSection = document.getElementById('colorSection');

    // Validar que se hayan seleccionado opciones requeridas
    if (sizeSection.style.display !== 'none' && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    if (colorSection.style.display !== 'none' && !selectedColor) {
      alert('Por favor selecciona un color');
      return;
    }

    // Agregar al carrito usando la función de app.js
    if (typeof addToCart === 'function') {
      addToCart({
        name: currentProduct.name,
        price: currentProduct.price,
        size: selectedSize,
        color: selectedColor
      });
    } else {
      console.error('Función addToCart no disponible');
    }

    closeProductModal();
  };

  // Cerrar modal
  window.closeProductModal = function() {
    const modal = document.getElementById('globalProductModal');
    if (modal) {
      modal.style.display = 'none';
    }
    currentProduct = null;
    selectedSize = null;
    selectedColor = null;
  };

  // Cerrar modal cuando se hace clic en el overlay
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('globalProductModal');
    if (modal && e.target === modal.querySelector('.modal-overlay')) {
      closeProductModal();
    }
  });

  // Crear modal al cargar
  document.addEventListener('DOMContentLoaded', createModalHTML);
})();
