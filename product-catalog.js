/**
 * CATÁLOGO DINÁMICO DE OFERTAS
 * Este archivo carga dinámicamente los productos en oferta desde products.json
 */

(async function() {
  try {
    // Cargar productos desde products.json
    const res = await fetch('products.json');
    const allProducts = await res.json();

    // Filtrar solo productos con oferta (máximo 10)
    const discountedProducts = allProducts
      .filter(p => p.discount && p.originalPrice)
      .slice(0, 10);

    // Contenedor donde se mostrarán los productos
    const container = document.getElementById('catalogoProductos');

    if (discountedProducts.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 40px;">No hay ofertas disponibles en este momento.</p>';
      return;
    }

    // Generar HTML para cada producto
    const productosHTML = discountedProducts.map(product => `
      <div class="row">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-text">
          <h5 style="color: white; font-weight: bold; background: rgba(0,0,0,0.6); padding: 8px 12px; border-radius: 4px; display: inline-block;">-${product.discount}%</h5>
        </div>
        <div class="heart-icon" onclick="toggleFavorite(event, '${product.name}')" style="cursor: pointer;">
          <i class='bx bx-heart'></i>
        </div>     
        <div class="ratting">
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bx-star-half'></i>
        </div>

        <div class="price">
          <h4>${product.name}</h4>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <p style="text-decoration: line-through; color: #999; margin: 0;">$${product.originalPrice}</p>
            <p style="color: #d32f2f; font-weight: bold; font-size: 18px; margin: 0;">$${product.price}</p>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn-detail" onclick="goToProductDetail('${product.name}')">
            <i class='bx bx-show'></i> Ver detalles
          </button>
          <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">
            <i class='bx bx-cart'></i> Agregar
          </button>
        </div>
      </div>
    `).join('');

    container.innerHTML = productosHTML;

    // Agregar listeners a los botones de agregar
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.dataset.product;
        const productPrice = parseFloat(this.dataset.price);
        
        // Buscar el producto en el array
        const product = discountedProducts.find(p => p.name === productName && p.price == productPrice);
        
        if (product) {
          // Llamar a openProductModal desde index.html
          if (typeof openProductModal === 'function') {
            openProductModal(
              product.name,
              product.price,
              product.sizes || [],
              product.colors || []
            );
          } else {
            alert('Por favor selecciona una talla y color');
          }
        }
      });
    });

    // Inicializar estado de corazones
    inicializarCorazones();

  } catch (error) {
    console.error('Error cargando productos:', error);
    const container = document.getElementById('catalogoProductos');
    if (container) {
      container.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">Error al cargar los productos.</p>';
    }
  }
})();

// Función para inicializar el estado de los corazones
function inicializarCorazones() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  document.querySelectorAll('.heart-icon').forEach(heartIcon => {
    const icon = heartIcon.querySelector('i');
    const productName = heartIcon.closest('.row').querySelector('.price h4').textContent;
    
    if (favorites.includes(productName)) {
      icon.classList.remove('bx-heart');
      icon.classList.add('bxs-heart');
      heartIcon.style.color = '#ee1c47';
    }
  });
}

// Función para ir a los detalles del producto
function goToProductDetail(productName) {
  window.location.href = `product-detail.html?name=${encodeURIComponent(productName)}`;
}

// Función para alternar favoritos
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
    console.log('❌ Removido de favoritos:', productName);
  } else {
    // Agregar a favoritos
    favorites.push(productName);
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart');
    heartIcon.style.color = '#ee1c47';
    console.log('✅ Agregado a favoritos:', productName);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  console.log('📦 localStorage.favorites actualizado:', favorites);
}
