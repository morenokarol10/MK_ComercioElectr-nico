/**
 * =========================================================================
 * DIAGRAMA DE FLUJO Y ARQUITECTURA - BUSCADOR MK ECOMMERCE
 * =========================================================================
 */

// =========================================================================
// ARQUITECTURA DE ARCHIVOS
// =========================================================================

/*
MK-ECOMMERCE/
│
├─ search.html (Interfaz - Frontend)
│  └─ Contiene:
│     - Barra de búsqueda
│     - Filtros (Categoría, Género)
│     - Contenedor de resultados
│
├─ search.js (Lógica - Backend)
│  └─ Contiene:
│     - Array de productos
│     - Función performSearch()
│     - Función displayResults()
│     - Función createProductElement()
│     - Event listeners
│
├─ style.css (Estilos - Diseño)
│  └─ Contiene:
│     - Estilos de .search-section
│     - Estilos de .search-bar
│     - Estilos de .filters-container
│     - Estilos responsivos
│
├─ products.json (Base de datos)
│  └─ Contiene:
│     - Datos de todos los productos
│     - Precios, imágenes, descripciones
│
├─ java.js (Scripts compartidos)
│  └─ Contiene:
│     - Header sticky
│     - Scripts globales
│
└─ Documentación:
   ├─ README_BUSCADOR.md (Guía de usuario)
   ├─ GUIA_BUSCADOR.js (Documentación técnica)
   └─ EJEMPLOS_BUSQUEDA.js (Ejemplos de uso)
*/

// =========================================================================
// FLUJO DE DATOS
// =========================================================================

/*
PASO 1: USUARIO ABRE LA PÁGINA
═══════════════════════════════════════════════════════════════════════════

    Usuario presiona icono de búsqueda
              │
              ↓
        search.html carga
              │
              ↓
        se.js se carga
              │
              ↓
    Array de productos se inicializa en memoria
              │
              ↓
    Event listeners se agregan a los inputs


PASO 2: USUARIO ESCRIBE EN EL BUSCADOR
═══════════════════════════════════════════════════════════════════════════

    Usuario escribe: "jean"
              │
              ↓
    searchInput.addEventListener('input', performSearch)
              │
              ↓
    performSearch() se ejecuta
              │
              ↓
    searchTerm = "jean" (convertido a minúsculas)
              │
              ↓
    Se filtran productos:
    - Si nombre contiene "jean" → Sí
    - Si descripción contiene "jean" → Sí
    - Si categoría seleccionada NO coincide → NO mostrar
    - Si género seleccionado NO coincide → NO mostrar
              │
              ↓
    filteredProducts = [
      { name: "short jean", ... },
      { name: "Jeans Flix Flox", ... }
    ]
              │
              ↓
    displayResults(filteredProducts)


PASO 3: MOSTRAR RESULTADOS
═══════════════════════════════════════════════════════════════════════════

    displayResults() recibe array de productos
              │
              ↓
    Actualiza contador: "Se encontraron 2 productos"
              │
              ↓
    Para cada producto en el array:
    - Llamar createProductElement(product)
    - Agregar HTML al DOM
              │
              ↓
    Usuario ve los resultados en pantalla
              │
              ↓
    Se ejecuta agregarFuncionalidadCorazones()
              │
              ↓
    Se ejecuta agregarFuncionalidadCarrito()


PASO 4: USUARIO INTERACTÚA CON PRODUCTO
═══════════════════════════════════════════════════════════════════════════

    OPCIÓN A: Agregar a favoritos
    ─────────────────────────────
    Usuario presiona el corazón ❤️
            │
            ↓
    handleHeartClick() se ejecuta
            │
            ↓
    localStorage.setItem("favorites", ...)
            │
            ↓
    Corazón se pone rojo
            │
            ↓
    Producto se guarda en navegador


    OPCIÓN B: Agregar al carrito
    ─────────────────────────────
    Usuario presiona botón "Agregar"
            │
            ↓
    handleAddToCart() se ejecuta
            │
            ↓
    localStorage.setItem("cart", ...)
            │
            ↓
    Botón muestra "✓ ¡Agregado!"
            │
            ↓
    Espera 2 segundos
            │
            ↓
    Botón vuelve al estado normal
*/

// =========================================================================
// LÓGICA DE FILTRADO DETALLADA
// =========================================================================

/*
const filteredProducts = productos.filter(product => {
  
  // 1. BÚSQUEDA POR TEXTO
  // ─────────────────────────────────────────────────────
  // Convertir búsqueda a minúsculas
  const searchTerm = "jean"  // Usuario escribió esto
  const productName = product.name.toLowerCase()  // "jeans flix flox"
  const productDesc = product.description.toLowerCase()  // "jeans premium..."
  
  // Verificar si coincide en nombre O descripción
  const matchesSearch = 
    productName.includes(searchTerm) ||  // ¿Contiene "jean"?
    productDesc.includes(searchTerm);    // ¿Contiene "jean"?
  
  console.log(`Búsqueda "${searchTerm}": ${matchesSearch}`);
  // Resultado: true ✓
  

  // 2. FILTRO POR CATEGORÍA
  // ─────────────────────────────────────────────────────
  const selectedCategory = "Ropa"  // Usuario seleccionó esto
  const productCategory = product.category  // "Ropa", "Calzado", etc
  
  const matchesCategory = 
    selectedCategory === '' ||  // ¿Sin filtro?
    productCategory === selectedCategory;  // ¿Coincide categoría?
  
  console.log(`Categoría ${selectedCategory}: ${matchesCategory}`);
  // Resultado: true ✓
  

  // 3. FILTRO POR GÉNERO
  // ─────────────────────────────────────────────────────
  const selectedGenre = "Mujer"  // Usuario seleccionó esto
  const productGenre = product.genre  // "Hombre", "Mujer", "Unisex"
  
  const matchesGenre = 
    selectedGenre === '' ||  // ¿Sin filtro?
    productGenre === selectedGenre;  // ¿Coincide género?
  
  console.log(`Género ${selectedGenre}: ${matchesGenre}`);
  // Resultado: false ✗ (Jeans Flix Flox es para Hombre)
  

  // 4. RESULTADO FINAL
  // ─────────────────────────────────────────────────────
  // TODOS los criterios deben ser true
  return matchesSearch && matchesCategory && matchesGenre;
  
  // En este ejemplo: true && true && false = false
  // Resultado: El producto NO se muestra
});
*/

// =========================================================================
// DIAGRAMA DE ESTADOS DEL BUSCADOR
// =========================================================================

/*
                    ┌─────────────────────┐
                    │   PÁGINA CARGADA    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  BUSCADOR VACÍO     │
                    │ Mostrar todos (12)  │
                    └──────────┬──────────┘
                               │
                    Usuario escribe
                               │
                    ┌──────────▼──────────┐
                    │  BUSCANDO...        │
                    │ Filtrar en tiempo   │
                    │ real                │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  RESULTADOS         │
                    │ Mostrar coincidencias
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
         Usuario    Usuario presiona    Usuario
         sigue   "Limpiar filtros"    selecciona
         escribiendo    │              categoría/género
                │       │                  │
                │   ┌───▼────────────┐     │
                │   │ VOLVER A VACÍO │◄────┘
                │   │ (12 productos) │
                │   └────┬───────────┘
                │        │
                └────┬───┘
                     │
                ┌────▼──────────────┐
                │  ESTADO ANTERIOR  │
                └───────────────────┘
*/

// =========================================================================
// CADENA DE RESPONSABILIDADES
// =========================================================================

/*
EVENTO: Usuario escribe "jean"
║
╠═> searchInput.addEventListener('input', performSearch)
║   └─> performSearch()
║       ├─> Obtiene: searchTerm = "jean"
║       ├─> Obtiene: selectedCategory = ""
║       ├─> Obtiene: selectedGenre = ""
║       ├─> Filtra productos.filter()
║       └─> displayResults(filteredProducts)
║           ├─> Limpia HTML previo
║           ├─> Para cada producto:
║           │   └─> createProductElement(product)
║           │       └─> Retorna HTML
║           ├─> Agrega HTML al DOM
║           ├─> Actualiza contador
║           └─> agregarFuncionalidadCorazones()
║               └─> agregarFuncionalidadCarrito()
║
║
EVENTO: Usuario presiona el corazón ❤️
║
╠═> heartIcon.addEventListener('click', handleHeartClick)
║   └─> handleHeartClick()
║       ├─> Obtiene nombre del producto
║       ├─> Lee localStorage ("favorites")
║       ├─> Agrega o quita el producto
║       ├─> Guarda en localStorage
║       └─> Actualiza visual (color rojo)
║
║
EVENTO: Usuario presiona "Agregar al carrito"
║
╠═> button.addEventListener('click', handleAddToCart)
║   └─> handleAddToCart()
║       ├─> Obtiene nombre y precio
║       ├─> Lee localStorage ("cart")
║       ├─> Agrega al carrito o aumenta cantidad
║       ├─> Guarda en localStorage
║       ├─> Muestra feedback "¡Agregado!"
║       └─> Espera 2 segundos y vuelve a normal
*/

// =========================================================================
// ESTADO DEL LOCALSTORAGE
// =========================================================================

/*
ANTES DE BUSCAR:
  localStorage = {
    favorites: [],
    cart: []
  }


DESPUÉS DE AGREGAR FAVORITOS:
  localStorage = {
    favorites: ["Conjunto", "Zapatillas Deportivas"],
    cart: []
  }


DESPUÉS DE AGREGAR AL CARRITO:
  localStorage = {
    favorites: ["Conjunto", "Zapatillas Deportivas"],
    cart: [
      { name: "short jean", price: 45, quantity: 1 },
      { name: "Vestido Semi-elegante", price: 129, quantity: 1 }
    ]
  }


CUANDO EL USUARIO ABRE FAVORITOS.HTML:
  lee localStorage.getItem("favorites")
  muestra los productos guardados


CUANDO EL USUARIO ABRE CARRITO.HTML:
  lee localStorage.getItem("cart")
  muestra los productos y calcula total
*/

// =========================================================================
// COMPLEJIDAD COMPUTACIONAL
// =========================================================================

/*
Tiempo de búsqueda: O(n)
donde n = número de productos

Con 12 productos: Instantáneo (< 1ms)
Con 100 productos: Muy rápido (< 5ms)
Con 1000 productos: Rápido (< 50ms)
Con 10000 productos: Empieza a notar (< 500ms)

Mejoras para más de 10000 productos:
1. Agregar debounce (esperar a que termine de escribir)
2. Usar base de datos remota
3. Implementar paginación
4. Usar índices de búsqueda
*/

// =========================================================================
// CASOS ESPECIALES
// =========================================================================

/*
CASO 1: Búsqueda vacía
  Input vacío → Se muestran todos los productos (12)
  
CASO 2: Sin resultados
  Búsqueda: "xyz" → Cero resultados
  Mostrar: "No encontramos productos..."
  
CASO 3: Filtros bloqueantes
  Búsqueda: "Jeans Flix Flox" + Género: "Mujer"
  Resultado: Cero productos (aunque existe el jeans)
  Razón: El jeans es para Hombre
  
CASO 4: Case insensitive
  "JEAN" = "jean" = "JeAn" = "jEaN"
  Todos encuentran los mismos resultados
  
CASO 5: Espacios ignorados
  "  jean  " se convierte a "jean"
  Funciona correctamente
  
CASO 6: Búsqueda parcial
  "jea" encuentra "Jeans Flix Flox"
  "zapatill" encuentra "Zapatillas Deportivas"
  No necesita ser exacto
*/

// =========================================================================
// INTEGRACIONES EXITOSAS
// =========================================================================

/*
✅ Integración con Favoritos (favoritos.html)
   - Lee localStorage("favorites")
   - Muestra los productos guardados
   - Permite eliminar de favoritos desde esta página
   
✅ Integración con Carrito (carrito.html)
   - Lee localStorage("cart")
   - Muestra los productos agregados
   - Calcula el total
   
✅ Integración con Todas las Páginas
   - El icono de búsqueda está en todas
   - Permite acceder al buscador desde cualquier lugar
   
✅ Integración con Header
   - El buscador tiene el mismo header que todas las páginas
   - Mantiene consistencia visual
   - Permite navegar desde el buscador a otras páginas
*/

// =========================================================================
// MEJORAS FUTURAS TÉCNICAS
// =========================================================================

/*
CORTO PLAZO (Fácil):
1. Agregar campo de búsqueda por rango de precio
2. Agregar ordenamiento (Precio asc/desc, Nombre)
3. Agregar contador de productos en stock
4. Agregar filtro "Solo disponibles"

MEDIANO PLAZO (Moderado):
1. Implementar debounce para búsquedas lentas
2. Agregar paginación (10 resultados por página)
3. Agregar historial de búsquedas recientes
4. Agregar sugerencias (autocomplete)
5. Guardar búsquedas frecuentes

LARGO PLAZO (Complejo):
1. Conectar a backend/API
2. Implementar búsqueda de foto (ML)
3. Agregar AI para recomendaciones
4. Sincronizar con base de datos remota
5. Agregar búsqueda por voz
6. Exportar filtros de búsqueda
7. Compartir búsquedas personalizadas
*/

console.log("=== DIAGRAMA DE ARQUITECTURA CARGADO ===");
