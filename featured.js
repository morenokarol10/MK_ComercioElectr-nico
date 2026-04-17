// Catálogo con filtros - Carga todos los productos de products.json
(async function(){
  try {
    // Cargar productos de products.json
    const res = await fetch('products.json');
    const data = await res.json();
    let allProducts = data.products ? data.products : data;

    // Elementos del DOM
    const catalogResults = document.getElementById('catalogResults');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const resetFiltersBtn = document.getElementById('resetFilters');

    // Filtros
    const genreCheckboxes = document.querySelectorAll('.genre-filter');
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    const sizeCheckboxes = document.querySelectorAll('.size-filter');
    const priceMinInput = document.getElementById('priceMin');
    const priceMaxInput = document.getElementById('priceMax');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');

    // Variable global para almacenar el producto seleccionado
    window.currentProduct = null;
    window.selectedSize = null;
    window.selectedColor = null;

    // Aplicar filtros desde parámetros URL
    function applyFiltersFromURL() {
      const params = new URLSearchParams(window.location.search);
      const genreParam = params.get('genre');

      if (genreParam) {
        genreCheckboxes.forEach(cb => {
          if (cb.value === genreParam) cb.checked = true;
        });
      }
    }

    // Renderizar estrellas
    function renderStars(rating = 4.5) {
      let stars = '';
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      for (let i = 0; i < fullStars; i++) stars += '<i class="bx bx-star"></i>';
      if (hasHalfStar) stars += '<i class="bx bx-star-half"></i>';
      for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) stars += '<i class="bx bx-star"></i>';
      return stars;
    }

    // Obtener filtros activos
    function getActiveFilters() {
      const genres = Array.from(genreCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const categories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const sizes = Array.from(sizeCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const priceMin = parseInt(priceMinInput.value);
      const priceMax = parseInt(priceMaxInput.value);
      return { genres, categories, sizes, priceMin, priceMax };
    }

    // Filtrar productos
    function filterProducts() {
      const { genres, categories, sizes, priceMin, priceMax } = getActiveFilters();
      
      let filtered = allProducts;
      
      if (genres.length > 0) {
        filtered = filtered.filter(p => genres.includes(p.genre));
      }
      
      if (categories.length > 0) {
        filtered = filtered.filter(p => categories.includes(p.category));
      }
      
      if (sizes.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.sizes || p.sizes.length === 0) return false;
          return sizes.some(size => p.sizes.includes(size));
        });
      }
      
      filtered = filtered.filter(p => {
        const productPrice = p.price || 0;
        return productPrice >= priceMin && productPrice <= priceMax;
      });
      
      return filtered;
    }

    // Renderizar productos
    function renderProducts(products) {
      if (products.length === 0) {
        catalogResults.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = 'No hay productos disponibles.';
        return;
      }

      noResults.style.display = 'none';
      resultsCount.textContent = `Se encontraron ${products.length} producto${products.length !== 1 ? 's' : ''}`;

      catalogResults.innerHTML = products.map(p => `
        <article class="product-card">
          <img src="${p.image}" alt="${p.name}" style="cursor: pointer;" onclick="goToDetails('${p.id}')">
          <h3>${p.name}</h3>
          <p class="price">$${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</p>
          <div class="rating">${renderStars(p.rating || 4.5)} (${p.reviews || 0})</div>
          <div class="product-actions">
            <button class="btn-detail" onclick="goToDetails('${p.id}')">
              <i class='bx bx-show'></i> Ver detalles
            </button>
            <button class="btn-add" onclick="openProductModal('${p.name}', ${p.price}, ${JSON.stringify(p.sizes || [])}, ${JSON.stringify(p.colors || [])})">>
              <i class='bx bx-cart'></i> Agregar
            </button>
          </div>
        </article>
      `).join('');
    }

    // Ir a detalles del producto
    window.goToDetails = function(id) {
      sessionStorage.setItem('selectedProductId', id);
      window.location.href = 'product-detail.html';
    };

    // Abrir modal de opciones
    window.openOptionsModal = function(productId) {
      const product = allProducts.find(p => p.id == productId);
      if (!product) return;

      window.currentProduct = product;
      window.selectedSize = null;
      window.selectedColor = null;

      // Renderizar información del producto
      const productInfo = document.getElementById('modalProductInfo');
      productInfo.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="modal-product-info-text">
          <h3>${product.name}</h3>
          <p>$${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
        </div>
      `;

      // Mostrar sección de talla si tiene sizes
      const sizeSection = document.getElementById('sizeSection');
      const sizeOptions = document.getElementById('sizeOptions');
      if (product.sizes && product.sizes.length > 0) {
        sizeSection.style.display = 'block';
        sizeOptions.innerHTML = product.sizes.map(size => `
          <button class="option-btn" onclick="selectSize('${size}')">${size}</button>
        `).join('');
      } else {
        sizeSection.style.display = 'none';
      }

      // Mostrar sección de color si tiene colors
      const colorSection = document.getElementById('colorSection');
      const colorOptions = document.getElementById('colorOptions');
      if (product.colors && product.colors.length > 0) {
        colorSection.style.display = 'block';
        colorOptions.innerHTML = product.colors.map(color => `
          <button class="option-btn" onclick="selectColor('${color}')">${color}</button>
        `).join('');
      } else {
        colorSection.style.display = 'none';
      }

      // Mostrar modal
      const modal = document.getElementById('optionsModal');
      modal.style.display = 'flex';
    };

    // Cerrar modal
    window.closeOptionsModal = function() {
      const modal = document.getElementById('optionsModal');
      modal.style.display = 'none';
      window.currentProduct = null;
      window.selectedSize = null;
      window.selectedColor = null;
    };

    // Seleccionar talla
    window.selectSize = function(size) {
      window.selectedSize = size;
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
      window.selectedColor = color;
      const buttons = document.querySelectorAll('#colorOptions .option-btn');
      buttons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent.trim() === color) {
          btn.classList.add('selected');
        }
      });
    };

    // Confirmar agregar al carrito
    window.confirmAddToCart = function() {
      const product = window.currentProduct;
      const sizeSection = document.getElementById('sizeSection');
      const colorSection = document.getElementById('colorSection');

      // Validar que se seleccionen opciones obligatorias
      if (sizeSection.style.display !== 'none' && !window.selectedSize) {
        alert('Por favor selecciona una talla');
        return;
      }

      if (colorSection.style.display !== 'none' && !window.selectedColor) {
        alert('Por favor selecciona un color');
        return;
      }

      // Agregar al carrito
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const cartItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
        image: product.image,
        size: window.selectedSize,
        color: window.selectedColor
      };

      const existing = cart.find(item => 
        item.id == product.id && 
        item.size === window.selectedSize && 
        item.color === window.selectedColor
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Producto agregado al carrito');
      window.closeOptionsModal();
    };

    // Renderizar inicial
    applyFiltersFromURL();
    renderProducts(filterProducts());

    // Agregar listeners a filtros de género y categoría
    [...genreCheckboxes, ...categoryCheckboxes, ...sizeCheckboxes].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        renderProducts(filterProducts());
      });
    });

    // Listeners para los sliders de precio
    priceMinInput.addEventListener('input', () => {
      minPriceDisplay.textContent = `$${priceMinInput.value}`;
      // Asegurarse de que el mínimo no sea mayor que el máximo
      if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value)) {
        priceMinInput.value = priceMaxInput.value;
        minPriceDisplay.textContent = `$${priceMaxInput.value}`;
      }
      renderProducts(filterProducts());
    });

    priceMaxInput.addEventListener('input', () => {
      maxPriceDisplay.textContent = `$${priceMaxInput.value}`;
      // Asegurarse de que el máximo no sea menor que el mínimo
      if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value)) {
        priceMaxInput.value = priceMinInput.value;
        maxPriceDisplay.textContent = `$${priceMinInput.value}`;
      }
      renderProducts(filterProducts());
    });

    // Botón limpiar filtros
    resetFiltersBtn.addEventListener('click', () => {
      [...genreCheckboxes, ...categoryCheckboxes, ...sizeCheckboxes].forEach(cb => cb.checked = false);
      priceMinInput.value = 0;
      priceMaxInput.value = 200;
      minPriceDisplay.textContent = '$0';
      maxPriceDisplay.textContent = '$200';
      renderProducts(filterProducts());
    });

  } catch (err) {
    console.error('Error al cargar productos:', err);
    document.getElementById('catalogResults').innerHTML = '<p>Error al cargar productos</p>';
  }
})();
