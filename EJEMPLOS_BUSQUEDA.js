/**
 * =========================================================================
 * EJEMPLOS PRÁCTICOS DE BÚSQUEDA - MK ECOMMERCE
 * =========================================================================
 * 
 * Este archivo contiene ejemplos reales de cómo usar el buscador
 * 
 */

// =========================================================================
// EJEMPLO 1: BÚSQUEDA SIMPLE POR NOMBRE
// =========================================================================

/*
ESCENARIO: Un cliente quiere encontrar jeans

PASOS:
1. Haz clic en el icono de búsqueda (lupa) en la esquina superior derecha
2. Se abre search.html
3. En el campo "Buscar productos por nombre..." escribe: jean
4. A medida que escribes, aparecen los resultados:
   - Carácter 'j' → Se empiezan a buscar productos
   - Carácter 'je' → Se filtran más
   - Carácter 'jea' → Se sigue filtrando
   - Carácter 'jean' → Aparecen: "short jean", "Jeans Flix Flox"

RESULTADO: Se muestran 2 productos relacionados con "jean"
*/

// =========================================================================
// EJEMPLO 2: BÚSQUEDA PARCIAL (COINCIDENCIA FLEXIBLE)
// =========================================================================

/*
ESCENARIO: El cliente no recuerda el nombre exacto del producto

PASOS:
1. Abre el buscador
2. Escribe solamente: "zapatilas" (incluso con error de ortografía)
3. El buscador busca en la descripción también
4. Puede encontrar productos relacionados

RESULTADO: 
- "Zapatillas Deportivas"
- "Tenis Running"

NOTA: El buscador es "fuzzy" - busca coincidencias aproximadas
*/

// =========================================================================
// EJEMPLO 3: FILTRADO POR CATEGORÍA
// =========================================================================

/*
ESCENARIO: Un cliente quiere ver solo calzado

PASOS:
1. Abre el buscador
2. En el dropdown "Categoría" selecciona: Calzado
3. Automáticamente se muestran solo los productos de la categoría Calzado

RESULTADO:
- Zapatillas Deportivas
- Tenis Running

NOTA: Los otros productos desaparecen, solo quedan los de Calzado
*/

// =========================================================================
// EJEMPLO 4: FILTRADO POR GÉNERO
// =========================================================================

/*
ESCENARIO: Una cliente quiere comprar ropa para mujeres

PASOS:
1. Abre el buscador
2. En el dropdown "Género" selecciona: Mujer
3. Se muestran solo los productos para mujeres

RESULTADO:
- Conjunto
- short jean
- Vestido Semi-elegante
- Conjunto Salwar
- Kurta Estampada
- Vestido Collot
- Bolsa de Mano

NOTA: Los productos para hombres y unisex desaparecen
*/

// =========================================================================
// EJEMPLO 5: COMBINACIÓN DE BÚSQUEDA + FILTRO CATEGORÍA
// =========================================================================

/*
ESCENARIO: Un cliente busca un conjunto de ropa

PASOS:
1. Abre el buscador
2. Escribe en búsqueda: conjunto
3. Selecciona Categoría: Ropa
4. Deja Género: Todos los géneros

RESULTADO:
Se muestran estos productos:
- Conjunto (Mujer)
- Conjunto Salwar (Mujer)

NOTA: Busca "conjunto" Y que sea de Categoría "Ropa"
*/

// =========================================================================
// EJEMPLO 6: LOS TRES FILTROS COMBINADOS
// =========================================================================

/*
ESCENARIO: Comprador busca específicamente ropa casual para mujeres

PASOS:
1. Escribe en búsqueda: casual
2. Selecciona Categoría: Ropa
3. Selecciona Género: Mujer
4. Se muestran solo los productos que cumplan los 3 criterios

RESULTADO:
- Conjunto (tiene "casual" en descripción + Ropa + Mujer)
- Vestido Collot (tiene "casual" + Ropa + Mujer)

NOTA: Debe cumplir los 3 criterios para aparecer
*/

// =========================================================================
// EJEMPLO 7: BÚSQUEDA POR DESCRIPCIÓN
// =========================================================================

/*
ESCENARIO: Cliente busca algo "cómodo"

PASOS:
1. Escribe en búsqueda: cómodo
2. El buscador busca en nombre Y descripción

RESULTADO:
- Zapatillas Deportivas (descripción: "cómodas")
- Tenis Running (descripción: "cómodos")
- Conjunto Salwar (descripción: "cómoda")

NOTA: La búsqueda NO es solo por nombre, también busca en descripción
*/

// =========================================================================
// EJEMPLO 8: LIMPIAR FILTROS
// =========================================================================

/*
ESCENARIO: El cliente aplicó varios filtros y quiere empezar de nuevo

PASOS:
1. Haz varios filtros (búsqueda + categoría + género)
2. Presiona el botón "✕ Limpiar filtros"
3. Automáticamente:
   - Se vacía el campo de búsqueda
   - Categoría vuelve a "Todas las categorías"
   - Género vuelve a "Todos los géneros"
   - Se muestran todos los productos (12)

RESULTADO: Vuelta al estado inicial del buscador
*/

// =========================================================================
// EJEMPLO 9: MARCAR COMO FAVORITO DESDE EL BUSCADOR
// =========================================================================

/*
ESCENARIO: El cliente encontró un producto que le gusta y quiere guardarlo

PASOS:
1. Busca y encuentra un producto (ej: "Vestido Semi-elegante")
2. En la tarjeta del producto, presiona el icono del corazón ❤️
3. El corazón se rellena y se pone rojo
4. El producto se guarda en favoritos automáticamente

RESULTADO:
- El corazón del producto se vuelve rojo
- Al ir a Favoritos (navegación), verá el producto guardado
- Los datos se guardan en localStorage del navegador

CÓDIGO INTERNO:
localStorage.setItem("favorites", JSON.stringify(favorites))
*/

// =========================================================================
// EJEMPLO 10: AGREGAR AL CARRITO DESDE EL BUSCADOR
// =========================================================================

/*
ESCENARIO: El cliente encontró lo que buscaba y quiere comprarlo

PASOS:
1. Busca y encuentra un producto (ej: "Zapatillas Deportivas")
2. Presiona el botón "🛒 Agregar"
3. El botón muestra "✓ ¡Agregado!" por 2 segundos
4. El producto se agrega al carrito automáticamente

RESULTADO:
- El botón cambia temporalmente de color
- El producto se guarda en el carrito
- Puede continuar buscando más productos
- Al ir al Carrito, verá todos los productos agregados

CÓDIGO INTERNO:
localStorage.setItem("cart", JSON.stringify(cart))
*/

// =========================================================================
// EJEMPLO 11: BÚSQUEDA CASE-INSENSITIVE (SIN MAYÚSCULAS)
// =========================================================================

/*
ESCENARIO: El usuario escribe en mayúsculas o minúsculas

PASOS:
1. Intenta estos términos (todos encuentran lo mismo):
   - "JEAN" (mayúsculas)
   - "jean" (minúsculas)
   - "JeAn" (mixto)

RESULTADO:
Todos encuentran los mismos productos:
- short jean
- Jeans Flix Flox

NOTA: La búsqueda NO es sensible a mayúsculas/minúsculas
*/

// =========================================================================
// EJEMPLO 12: BÚSQUEDA VACÍA MUESTRA TODOS
// =========================================================================

/*
ESCENARIO: El usuario limpia el campo de búsqueda

PASOS:
1. Escribe algo: "vestido"
2. Se muestran resultados del vestido
3. Borra completamente el campo de búsqueda
4. Automáticamente se muestran TODOS los productos (12)

RESULTADO:
Se ven todos los productos disponibles, sin ningún filtro de texto
*/

// =========================================================================
// EJEMPLO 13: BÚSQUEDA CON ESPACIOS
// =========================================================================

/*
ESCENARIO: El usuario escribe con espacios antes o después

PASOS:
1. Escribe: "  jean  " (con espacios alrededor)
2. El buscador automáticamente elimina los espacios
3. Busca normalmente por "jean"

RESULTADO:
Los espacios se ignoran, el resultado es igual que escribir "jean"

NOTA: Esto se hace con .trim() en JavaScript
*/

// =========================================================================
// EJEMPLO 14: ACTUALIZACIÓN EN TIEMPO REAL
// =========================================================================

/*
ESCENARIO: El usuario quiere ver cómo cambian los resultados

PASOS:
1. Abre el buscador
2. Empieza a escribir lentamente: "z"
   - Se muestran productos con "z"
3. Continúa: "za"
   - Se filtran más resultados
4. Continúa: "zap"
   - Se sigue filtrando
5. Completa: "zapatilla"
   - Se muestran solo productos con "zapatilla"

RESULTADO:
Los resultados se actualizan con cada carácter que escribes
(búsqueda en tiempo real)

CÓDIGO INTERNO:
searchInput.addEventListener('input', performSearch);
*/

// =========================================================================
// EJEMPLO 15: PRODUCTOS CON STOCK
// =========================================================================

/*
ESCENARIO: Verificar disponibilidad de productos

NOTA: Los productos tienen información de stock en el JSON:
- Conjunto: 50 unidades
- short jean: 30 unidades
- Zapatillas: 20 unidades
- etc.

BÚSQUEDA: En la versión actual, NO filtra por stock
FUTURA MEJORA: Podría agregarse filtro "Solo mostrar disponibles"

CÓDIGO QUE SE PODRÍA AGREGAR:
const inStock = product.stock > 0;
*/

// =========================================================================
// EJEMPLO 16: COLORES Y TALLAS DISPONIBLES
// =========================================================================

/*
ESCENARIO: El cliente quiere verificar opciones de un producto

NOTA: Los productos tienen:
- product.colors: ["Negro", "Blanco", "Azul"]
- product.sizes: ["S", "M", "L", "XL"]

BÚSQUEDA ACTUAL: No se filtra por color o talla
FUTURA MEJORA: Agregar filtros por:
- Color del producto
- Talla disponible

CÓDIGO QUE SE PODRÍA AGREGAR:
const coloresDisponibles = product.colors;
const tallasDisponibles = product.sizes;
*/

// =========================================================================
// EJEMPLO 17: CONTAR RESULTADOS
// =========================================================================

/*
ESCENARIO: El cliente quiere saber cuántos productos encontró

PASOS:
1. Busca: "jean"
2. En la parte superior verá: "Se encontraron 2 productos"

CAMBIOS:
- Si busca "vestido": "Se encontraron 3 productos"
- Si busca "zapatilla": "Se encontraron 2 productos"
- Si no hay resultados: "Se encontraron 0 productos"

CÓDIGO INTERNO:
resultsCount.textContent = `Se encontraron ${products.length} producto${products.length !== 1 ? 's' : ''}`;
*/

// =========================================================================
// EJEMPLO 18: BÚSQUEDA CON CARACTERES ESPECIALES
// =========================================================================

/*
ESCENARIO: El usuario intenta buscar términos especiales

EJEMPLOS:
- "50%" → No encontrará nada (no es un producto)
- "-verde" → Buscará "verde" (ignorará el guión)
- "talla 36" → Buscará "talla" o "36" (depende del producto)

NOTA: El buscador es simple, no filtra caracteres especiales
MEJORA FUTURA: Agregar sanitización de caracteres especiales
*/

// =========================================================================
// EJEMPLO 19: REDIRECCIONAMIENTO A CARRITO
// =========================================================================

/*
ESCENARIO: El cliente agregó varios productos y quiere ver el carrito

PASOS:
1. Busca y agrega varios productos al carrito
2. En la navegación superior, presiona el icono del carrito 🛒
3. Se abre carrito.html
4. Ve todos los productos que agregó

NOTA: El carrito persiste aunque cambies de página
RAZÓN: Se guarda en localStorage del navegador
*/

// =========================================================================
// EJEMPLO 20: BÚSQUEDA EN DIFERENTES PÁGINAS
// =========================================================================

/*
ESCENARIO: El usuario quiere acceder al buscador desde cualquier página

PASOS (desde Inicio):
1. Haz clic en icono de búsqueda → Abre search.html
2. Busca algo → Encuentra productos

PASOS (desde Catálogo):
1. Haz clic en icono de búsqueda → Abre search.html
2. Busca algo → Encuentra productos

PASOS (desde Favoritos):
1. Haz clic en icono de búsqueda → Abre search.html
2. Busca algo → Encuentra productos

RESULTADO: 
El buscador está disponible desde cualquier página
(El icono de búsqueda está en el header de todas las páginas)
*/

// =========================================================================
// FLUJO COMPLETO DE UN CLIENTE
// =========================================================================

/*
1. Cliente entra a index.html (página de inicio)
   ↓
2. Presiona icono de búsqueda → Abre search.html
   ↓
3. Busca: "ropa mujer" + Categoría: "Ropa" + Género: "Mujer"
   ↓
4. Ve 6 productos disponibles
   ↓
5. Marca 2 como favoritos (presiona corazón)
   ↓
6. Agrega 3 al carrito (presiona botón Agregar)
   ↓
7. Presiona icono de carrito → Abre carrito.html
   ↓
8. Ve los 3 productos agregados
   ↓
9. Presiona icono de inicio → Vuelve a index.html
   ↓
10. Presiona icono de favoritos → Abre favoritos.html
   ↓
11. Ve los 2 productos marcados como favoritos
   ↓
12. LISTO! Experiencia de compra completa
*/

console.log("=== EJEMPLOS DE BÚSQUEDA CARGADOS ===");
console.log("Ver GUIA_BUSCADOR.js para documentación técnica");
console.log("Ver README_BUSCADOR.md para instrucciones de uso");
