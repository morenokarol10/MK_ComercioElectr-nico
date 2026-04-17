/**
 * =========================================================================
 * GUÍA DE FUNCIONAMIENTO DEL BUSCADOR - MK ECOMMERCE
 * =========================================================================
 * 
 * Este documento explica cómo funciona el sistema de búsqueda del e-commerce
 * 
 * ARCHIVOS INVOLUCRADOS:
 * - search.html    → Página HTML con la interfaz de búsqueda
 * - search.js      → Lógica de búsqueda y filtrado (JavaScript)
 * - products.json  → Base de datos de productos
 * - style.css      → Estilos de la página de búsqueda
 * 
 * =========================================================================
 * CARACTERÍSTICA 1: BÚSQUEDA POR TEXTO
 * =========================================================================
 * 
 * Función: performSearch()
 * 
 * Cómo funciona:
 * 1. El usuario escribe en el input de búsqueda
 * 2. Se activa el evento 'input' que llama a performSearch()
 * 3. Se obtiene el texto (sin mayúsculas, sin espacios)
 * 4. Se busca en name y description del producto
 * 5. Se muestran los resultados en tiempo real
 * 
 * Ejemplo:
 * - Escribir "jean" → Encuentra "Jeans Flix Flox", "short jean"
 * - Escribir "deportivo" → Encuentra "Zapatillas Deportivas", "Conjunto"
 * 
 * =========================================================================
 * CARACTERÍSTICA 2: FILTRADO POR CATEGORÍA
 * =========================================================================
 * 
 * Categorías disponibles:
 * - Ropa
 * - Calzado
 * - Accesorios
 * 
 * Cómo funciona:
 * 1. Usuario selecciona una categoría del dropdown
 * 2. Se activa el evento 'change' que llama a performSearch()
 * 3. Se filtra por product.category
 * 4. Se combina con la búsqueda de texto (si existe)
 * 
 * Ejemplo:
 * - Seleccionar "Calzado" → Solo muestra Zapatillas y Tenis
 * - Seleccionar "Ropa" + escribir "mujer" → Solo ropa para mujeres
 * 
 * =========================================================================
 * CARACTERÍSTICA 3: FILTRADO POR GÉNERO
 * =========================================================================
 * 
 * Géneros disponibles:
 * - Hombre
 * - Mujer
 * - Unisex
 * 
 * Cómo funciona:
 * 1. Usuario selecciona un género del dropdown
 * 2. Se activa el evento 'change' que llama a performSearch()
 * 3. Se filtra por product.genre
 * 4. Se combina con otros filtros
 * 
 * Ejemplo:
 * - Seleccionar "Mujer" → Solo productos para mujeres
 * - Seleccionar "Hombre" + "Ropa" → Solo ropa para hombres
 * 
 * =========================================================================
 * CARACTERÍSTICA 4: BÚSQUEDA EN TIEMPO REAL
 * =========================================================================
 * 
 * El buscador actualiza los resultados mientras el usuario escribe:
 * 
 * 1. Tecla 'a'      → Busca "a"
 * 2. Tecla 'za'     → Busca "za"
 * 3. Tecla 'zap'    → Busca "zap"
 * 4. Tecla 'zapatilla' → Busca "zapatilla"
 * 
 * Resultado: Encuentra "Zapatillas Deportivas"
 * 
 * =========================================================================
 * ESTRUCTURA DEL ARRAY DE PRODUCTOS
 * =========================================================================
 * 
 * Cada producto tiene la siguiente estructura:
 * 
 * {
 *   "id": 1,                    // Número único del producto
 *   "name": "Conjunto",         // Nombre (usado en búsqueda)
 *   "price": 99,                // Precio
 *   "description": "...",       // Descripción (usado en búsqueda)
 *   "image": "imagenes/1.jpg",  // Ruta de la imagen
 *   "category": "Ropa",         // Categoría (usado en filtrado)
 *   "genre": "Mujer",           // Género (usado en filtrado)
 *   "sizes": ["S","M","L","XL"], // Tallas disponibles
 *   "colors": ["Negro"],        // Colores disponibles
 *   "stock": 50                 // Cantidad en inventario
 * }
 * 
 * =========================================================================
 * CÓMO AGREGAR UN NUEVO PRODUCTO
 * =========================================================================
 * 
 * 1. Abre el archivo search.js
 * 2. Busca el array "const productos = ["
 * 3. Agrega un nuevo objeto dentro del array:
 * 
 *    {
 *      "id": 13,
 *      "name": "Mi nuevo producto",
 *      "price": 50,
 *      "description": "Descripción del producto",
 *      "image": "imagenes/nueva-imagen.jpg",
 *      "category": "Ropa",
 *      "genre": "Mujer",
 *      "sizes": ["S","M","L"],
 *      "colors": ["Negro","Blanco"],
 *      "stock": 25
 *    }
 * 
 * 4. Guarda el archivo
 * 5. El producto aparecerá automáticamente en la búsqueda
 * 
 * =========================================================================
 * CÓMO AGREGAR UNA NUEVA CATEGORÍA
 * =========================================================================
 * 
 * 1. Abre search.html
 * 2. Busca <select id="categoryFilter">
 * 3. Agrega una nueva opción:
 *    <option value="Nueva Categoría">Nueva Categoría</option>
 * 
 * 4. En search.js, agrega productos con esa categoría
 * 5. El filtro funcionará automáticamente
 * 
 * Ejemplo para agregar "Electrónica":
 * 
 * En search.html:
 *   <option value="Electrónica">Electrónica</option>
 * 
 * En search.js:
 *   {
 *     "id": 14,
 *     "name": "Smartwatch",
 *     "category": "Electrónica",
 *     ...
 *   }
 * 
 * =========================================================================
 * FUNCIONES PRINCIPALES
 * =========================================================================
 * 
 * 1. performSearch()
 *    - Filtra productos según los criterios
 *    - Se ejecuta cuando el usuario escribe o cambia filtros
 *    - Retorna un array de productos filtrados
 * 
 * 2. displayResults(products, searchTerm)
 *    - Renderiza los productos en la página
 *    - Muestra el contador de resultados
 *    - Muestra mensaje si no hay resultados
 * 
 * 3. createProductElement(product)
 *    - Crea el HTML para mostrar un producto
 *    - Incluye imagen, nombre, precio, categoría, género
 *    - Agrega botones de favorito y carrito
 * 
 * 4. clearFilters()
 *    - Limpia todos los filtros
 *    - Muestra todos los productos
 * 
 * 5. agregarFuncionalidadCorazones()
 *    - Activa la funcionalidad de favoritos
 *    - Permite marcar/desmarcar productos como favoritos
 * 
 * 6. agregarFuncionalidadCarrito()
 *    - Activa la funcionalidad del carrito
 *    - Permite agregar productos al carrito
 * 
 * =========================================================================
 * EVENT LISTENERS
 * =========================================================================
 * 
 * 1. searchInput.addEventListener('input', performSearch)
 *    - Se ejecuta cada vez que el usuario escribe
 *    - Actualiza los resultados en tiempo real
 * 
 * 2. categoryFilter.addEventListener('change', performSearch)
 *    - Se ejecuta cuando cambia la categoría
 *    - Vuelve a filtrar los productos
 * 
 * 3. genreFilter.addEventListener('change', performSearch)
 *    - Se ejecuta cuando cambia el género
 *    - Vuelve a filtrar los productos
 * 
 * 4. resetFiltersBtn.addEventListener('click', clearFilters)
 *    - Se ejecuta cuando presiona "Limpiar filtros"
 *    - Limpia todos los campos de búsqueda
 * 
 * =========================================================================
 * ALMACENAMIENTO EN EL NAVEGADOR (localStorage)
 * =========================================================================
 * 
 * El buscador usa localStorage para guardar:
 * 
 * 1. Favoritos:
 *    - Guardado: localStorage.setItem('favorites', JSON.stringify(favorites))
 *    - Lectura: JSON.parse(localStorage.getItem('favorites'))
 * 
 * 2. Carrito:
 *    - Guardado: localStorage.setItem('cart', JSON.stringify(cart))
 *    - Lectura: JSON.parse(localStorage.getItem('cart'))
 * 
 * Esto permite que los favoritos y el carrito persistan entre sesiones
 * 
 * =========================================================================
 * EJEMPLOS DE BÚSQUEDA
 * =========================================================================
 * 
 * Búsqueda simple:
 * - "Camiseta" → Encuentra todas las camisetas
 * - "Jean" → Encuentra todos los jeans
 * - "Zapatilla" → Encuentra zapatillas
 * 
 * Búsqueda + Categoría:
 * - Buscar "Vestido" + Categoría "Ropa" → Solo vestidos de ropa
 * 
 * Búsqueda + Género:
 * - Buscar "Camisa" + Género "Hombre" → Solo camisas para hombres
 * 
 * Combinación de todos los filtros:
 * - Buscar "Deportivas" + Categoría "Calzado" + Género "Unisex"
 *   → Solo zapatillas deportivas unisex
 * 
 * =========================================================================
 * COMPATIBILIDAD
 * =========================================================================
 * 
 * - ✅ Chrome, Firefox, Safari, Edge
 * - ✅ Mobile (iOS y Android)
 * - ✅ Tabletas
 * - ✅ IE 11+ (con polyfills)
 * 
 * =========================================================================
 * REQUISITOS TÉCNICOS
 * =========================================================================
 * 
 * - HTML5
 * - CSS3
 * - JavaScript ES6 (Arrow functions, Template literals, etc.)
 * - Boxicons para los iconos
 * - Fuente Jost de Google Fonts
 * 
 * =========================================================================
 * RENDIMIENTO
 * =========================================================================
 * 
 * - Búsqueda casi instantánea con 12 productos
 * - Escalable a miles de productos
 * - Debounce automático con JavaScript puro (sin librerías externas)
 * - Sin necesidad de servidor para la búsqueda
 * 
 * =========================================================================
 * MEJORAS FUTURAS SUGERIDAS
 * =========================================================================
 * 
 * 1. Búsqueda por rango de precio
 * 2. Búsqueda por colores disponibles
 * 3. Búsqueda por tallas
 * 4. Ordenamiento (Precio menor/mayor, Relevancia, Más nuevos)
 * 5. Paginación de resultados
 * 6. Búsqueda avanzada con AND/OR
 * 7. Historial de búsquedas recientes
 * 8. Sugerencias automáticas (autocomplete)
 * 9. Búsqueda por foto
 * 10. Filtros guardados/favoritos
 * 
 * =========================================================================
 */
