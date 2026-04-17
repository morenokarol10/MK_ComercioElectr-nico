/**
 * BÚSQUEDA Y FILTRADO AVANZADO - MK ECOMMERCE
 * Maneja búsqueda por término, género, categoría y talla
 */

// ===== DATOS DE PRODUCTOS =====
const productos = [
  { id: 1, name: "Conjunto", price: 99, rating: 4.5, reviews: 245, description: "Conjunto deportivo casual 100% algodón", image: "imagenes/1.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Negro", "Blanco"], stock: 50 },
  { id: 2, name: "short jean", price: 45, rating: 4.3, reviews: 180, description: "Short jean clásico, algodón stretch", image: "imagenes/2.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Azul", "Negro"], stock: 30 },
  { id: 3, name: "Zapatillas Deportivas", price: 30, rating: 4.7, reviews: 320, description: "Zapatillas cómodas para uso diario", image: "imagenes/3.webp", category: "Calzado", genre: "Unisex", sizes: ["36","37","38","39","40","41"], colors: ["Blanco","Negro","Azul"], stock: 20 },
  { id: 4, name: "Vestido Semi-elegante", price: 129, rating: 4.6, reviews: 210, description: "Vestido semiformal ideal para eventos", image: "imagenes/4.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Blanco","Negro","Rojo"], stock: 20 },
  { id: 5, name: "Jeans Flix Flox", price: 99, rating: 4.4, reviews: 195, description: "Jeans premium con diseño moderno", image: "imagenes/5.webp", category: "Ropa", genre: "Hombre", sizes: ["28","30","32","34","36"], colors: ["Azul","Negro"], stock: 25 },
  { id: 6, name: "Conjunto Salwar", price: 99, rating: 4.5, reviews: 160, description: "Conjunto tradicional moderno", image: "imagenes/6.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Rojo","Azul","Verde"], stock: 15 },
  { id: 7, name: "Kurta Estampada", price: 15, rating: 4.2, reviews: 280, description: "Kurta estampada con diseños tradicionales", image: "imagenes/7.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Multicolor","Naranja","Morado"], stock: 40 },
  { id: 8, name: "Vestido Collot", price: 99, rating: 4.6, reviews: 270, description: "Vestido casual para uso diario", image: "imagenes/8.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Beige","Gris","Negro"], stock: 18 },
  { id: 9, name: "Camisa Casual Hombre", price: 35, rating: 4.4, reviews: 150, description: "Camisa casual de algodón puro", image: "imagenes/1.webp", category: "Ropa", genre: "Hombre", sizes: ["S","M","L","XL","XXL"], colors: ["Blanco","Azul","Verde"], stock: 30 },
  { id: 10, name: "Pantalón Formal Hombre", price: 65, rating: 4.5, reviews: 175, description: "Pantalón formal de alta calidad", image: "imagenes/2.webp", category: "Ropa", genre: "Hombre", sizes: ["28","30","32","34","36"], colors: ["Negro","Gris","Azul"], stock: 22 },
  { id: 11, name: "Tenis Running", price: 85, rating: 4.8, reviews: 420, description: "Tenis especializados para correr", image: "imagenes/3.webp", category: "Calzado", genre: "Unisex", sizes: ["36","37","38","39","40","41","42","43"], colors: ["Rojo","Blanco","Negro"], stock: 16 },
  { id: 12, name: "Bolsa de Mano", price: 55, rating: 4.3, reviews: 135, description: "Bolsa elegante de cuero sintético", image: "imagenes/6.webp", category: "Accesorios", genre: "Mujer", sizes: ["Única"], colors: ["Negro","Marrón","Rosa"], stock: 12 },
  { id: 13, name: "Camisa Blanca Básica", price: 6, rating: 4.4, reviews: 92, description: "Camisa blanca básica cómoda y versátil", image: "imagenes/9_camisa.webp", category: "Ropa", genre: "Mujer", sizes: ["S","M","L","XL"], colors: ["Blanco"], stock: 45 },
  { id: 14, name: "Zapatillas de Caña Alta", price: 35, rating: 4.6, reviews: 118, description: "Zapatillas blancas de caña alta", image: "imagenes/10_zapatos.webp", category: "Calzado", genre: "Mujer", sizes: ["35","36","37","38","39","40","41"], colors: ["Blanco"], stock: 28 },
  { id: 15, name: "Chaqueta Mezclilla Azul Oscuro", price: 30, rating: 4.5, reviews: 145, description: "Chaqueta de mezclilla azul oscuro clásica", image: "imagenes/11.webp", category: "Ropa", genre: "Hombre", sizes: ["S","M","L","XL","XXL"], colors: ["Azul Oscuro"], stock: 32 },
  { id: 16, name: "Chaqueta de Invierno", price: 40, rating: 4.7, reviews: 162, description: "Chaqueta térmica de invierno para hombre", image: "imagenes/12.webp", category: "Ropa", genre: "Hombre", sizes: ["S","M","L","XL","XXL"], colors: ["Negro","Marrón"], stock: 24 },
  { id: 17, name: "Bolso de Viaje", price: 50, rating: 4.4, reviews: 104, description: "Bolso de viaje espacioso con compartimientos", image: "imagenes/13.webp", category: "Accesorios", genre: "Hombre", sizes: ["Única"], colors: ["Negro","Marrón"], stock: 18 },
  { id: 18, name: "Camisa de Mezclilla", price: 28, rating: 4.3, reviews: 89, description: "Camisa de mezclilla para hombre", image: "imagenes/14.webp", category: "Ropa", genre: "Hombre", sizes: ["S","M","L","XL","XXL"], colors: ["Azul","Negro"], stock: 26 },
  { id: 19, name: "Jeans Azul Claro", price: 18, rating: 4.5, reviews: 156, description: "Jeans de mezclilla azul claro cómodo", image: "imagenes/17.webp", category: "Ropa", genre: "Unisex", sizes: ["28","30","32","34","36","38"], colors: ["Azul Claro"], stock: 35 },
  { id: 20, name: "Camiseta Casual", price: 9, rating: 4.6, reviews: 203, description: "Camiseta casual de algodón para uso diario", image: "imagenes/18.webp", category: "Ropa", genre: "Unisex", sizes: ["S","M","L","XL","XXL"], colors: ["Blanco","Negro","Gris"], stock: 60 }
];

// ===== ELEMENTOS DEL DOM =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const resetFiltersBtn = document.getElementById('resetFilters');

// Elementos de checkbox
const genreCheckboxes = document.querySelectorAll('.genre-filter');
const categoryCheckboxes = document.querySelectorAll('.category-filter');
const sizeCheckboxes = document.querySelectorAll('.size-filter');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const minPriceDisplay = document.getElementById('minPriceDisplay');
const maxPriceDisplay = document.getElementById('maxPriceDisplay');

// ===== OBTENER PARÁMETRO DE URL =====
function getSearchTermFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

// Aplicar filtros desde parámetros URL: genre, category, size (valores separados por coma)
function applyFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const genreParam = params.get('genre');
  const categoryParam = params.get('category');
  const sizeParam = params.get('size');

  if (genreParam) {
    const genres = genreParam.split(',').map(s => s.trim());
    genreCheckboxes.forEach(cb => { if (genres.includes(cb.value)) cb.checked = true; });
  }

  if (categoryParam) {
    const categories = categoryParam.split(',').map(s => s.trim());
    categoryCheckboxes.forEach(cb => { if (categories.includes(cb.value)) cb.checked = true; });
  }

  if (sizeParam) {
    const sizes = sizeParam.split(',').map(s => s.trim());
    sizeCheckboxes.forEach(cb => { if (sizes.includes(cb.value)) cb.checked = true; });
  }
}

// ===== RENDER ESTRELLAS =====
function renderStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  for (let i = 0; i < fullStars; i++) stars += '<i class="bx bx-star"></i>';
  if (hasHalfStar) stars += '<i class="bx bx-star-half"></i>';
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) stars += '<i class="bx bx-star"></i>';
  return stars;
}

// ===== CREAR ELEMENTO DE PRODUCTO =====
function createProductElement(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'row';
  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-img">
    <div class="heart-icon" data-product-id="${product.id}">
      <i class='bx bx-heart'></i>
    </div>
    <div class="ratting">
      ${renderStars(product.rating)}
    </div>
    <div class="price">
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
      <small class="reviews">${product.reviews} comentarios</small>
    </div>
    <div class="product-actions">
      <button class="btn-detail" data-product-id="${product.id}" data-product-name="${product.name}">
        <i class='bx bx-show'></i> Ver detalles
      </button>
      <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">
        <i class='bx bx-cart'></i> Agregar
      </button>
    </div>
  `;
  return productDiv;
}

// ===== PERFORM SEARCH CON FILTROS =====
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedGenres = Array.from(genreCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  const selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  const selectedSizes = Array.from(sizeCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  const priceMin = parseInt(priceMinInput.value);
  const priceMax = parseInt(priceMaxInput.value);

  const filtered = productos.filter(product => {
    const matchesSearch = searchTerm === '' || product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(product.genre);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSizes = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const matchesPrice = product.price >= priceMin && product.price <= priceMax;

    return matchesSearch && matchesGenre && matchesCategory && matchesSizes && matchesPrice;
  });

  displayResults(filtered);
}

// ===== DISPLAY RESULTS =====
function displayResults(products) {
  searchResults.innerHTML = '';
  noResults.style.display = 'none';

  if (products.length === 0) {
    resultsCount.textContent = 'Se encontraron 0 productos';
    noResults.style.display = 'flex';
  } else {
    resultsCount.textContent = `Se encontraron ${products.length} producto${products.length !== 1 ? 's' : ''}`;
    products.forEach(product => {
      const productElement = createProductElement(product);
      searchResults.appendChild(productElement);
    });
  }

  // Reactivar funcionalidades
  agregarFuncionalidadCorazones();
  agregarFuncionalidadCarrito();
  agregarFuncionalidadDetalles();
}

// ===== FUNCIONALIDAD DE CORAZONES =====
function agregarFuncionalidadCorazones() {
  document.querySelectorAll(".heart-icon").forEach(heartIcon => {
    heartIcon.removeEventListener('click', handleHeartClick);
    heartIcon.addEventListener('click', handleHeartClick);
  });
}

function handleHeartClick(e) {
  e.preventDefault();
  const icon = this.querySelector("i");
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
}

// ===== FUNCIONALIDAD DE CARRITO =====
function agregarFuncionalidadCarrito() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.removeEventListener('click', handleAddToCart);
    button.addEventListener('click', handleAddToCart);
  });
}

function handleAddToCart(e) {
  e.preventDefault();
  const productName = this.getAttribute("data-product");
  const productPrice = this.getAttribute("data-price");

  // Buscar producto para ver si necesita opciones
  const productObj = productos.find(p => p.name === productName);
  if (productObj && ((productObj.sizes && productObj.sizes.length > 0) || (productObj.colors && productObj.colors.length > 0))) {
    // Abrir modal con la función global
    if (typeof openProductModal === 'function') {
      openProductModal(
        productObj.name,
        productObj.price,
        productObj.sizes || [],
        productObj.colors || []
      );
      return;
    }
  }

  // Si no tiene opciones, agregar directamente
  if (typeof addToCart === 'function') {
    addToCart({
      name: productName,
      price: parseFloat(productPrice),
      size: null,
      color: null
    });
  } else {
    // Fallback a localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Feedback visual
  const originalText = this.innerHTML;
  this.innerHTML = '<i class="bx bx-check"></i> ¡Agregado!';
  this.style.backgroundColor = "#34656D";
  this.style.color = "white";

  setTimeout(() => {
    this.innerHTML = originalText;
    this.style.backgroundColor = "";
    this.style.color = "";
  }, 2000);
}

// ===== FUNCIONALIDAD DE DETALLES =====
function agregarFuncionalidadDetalles() {
  document.querySelectorAll(".btn-detail").forEach(btn => {
    btn.removeEventListener('click', handleDetailClick);
    btn.addEventListener('click', handleDetailClick);
  });
}

function handleDetailClick(e) {
  e.preventDefault();
  const productId = this.getAttribute('data-product-id');
  const productName = this.getAttribute('data-product-name');
  sessionStorage.setItem('selectedProductId', productId);
  sessionStorage.setItem('selectedProductName', productName);
  window.location.href = 'product-detail.html';
}

// ===== CLEAR FILTERS =====
function clearFilters() {
  searchInput.value = '';
  genreCheckboxes.forEach(cb => cb.checked = false);
  categoryCheckboxes.forEach(cb => cb.checked = false);
  sizeCheckboxes.forEach(cb => cb.checked = false);
  priceMinInput.value = 0;
  priceMaxInput.value = 200;
  minPriceDisplay.textContent = '$0';
  maxPriceDisplay.textContent = '$200';
  performSearch();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Cargar término de búsqueda desde URL
  const initialSearch = getSearchTermFromURL();
  if (initialSearch) {
    searchInput.value = initialSearch;
  }

  // Aplicar filtros desde parámetros URL si existen
  applyFiltersFromURL();

  searchInput.focus();
  
  // Event listeners
  searchInput.addEventListener('input', performSearch);
  genreCheckboxes.forEach(cb => cb.addEventListener('change', performSearch));
  categoryCheckboxes.forEach(cb => cb.addEventListener('change', performSearch));
  sizeCheckboxes.forEach(cb => cb.addEventListener('change', performSearch));
  
  // Listeners para los sliders de precio
  priceMinInput.addEventListener('input', () => {
    minPriceDisplay.textContent = `$${priceMinInput.value}`;
    if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value)) {
      priceMinInput.value = priceMaxInput.value;
      minPriceDisplay.textContent = `$${priceMaxInput.value}`;
    }
    performSearch();
  });

  priceMaxInput.addEventListener('input', () => {
    maxPriceDisplay.textContent = `$${priceMaxInput.value}`;
    if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value)) {
      priceMaxInput.value = priceMinInput.value;
      maxPriceDisplay.textContent = `$${priceMinInput.value}`;
    }
    performSearch();
  });

  resetFiltersBtn.addEventListener('click', clearFilters);

  // Búsqueda inicial
  performSearch();

  // Manejar icono de búsqueda en search.html
  const searchIconTrigger = document.getElementById('search-icon-trigger');
  if (searchIconTrigger) {
    searchIconTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const term = searchInput.value.trim();
      if (term) {
        window.location.href = `search.html?q=${encodeURIComponent(term)}`;
      }
    });
  }
});
