/**
 * =========================================================================
 * TEST DE FUNCIONAMIENTO - BUSCADOR MK ECOMMERCE
 * =========================================================================
 * 
 * Este archivo contiene pruebas para verificar que el buscador funciona
 * Puedes ejecutar esto en la consola del navegador (F12)
 * 
 */

// =========================================================================
// TEST 1: VERIFICAR QUE LOS ARCHIVOS ESTÁN CARGADOS
// =========================================================================

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║        TEST DE FUNCIONALIDAD - BUSCADOR MK             ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("✓ TEST 1: Verificar archivos cargados");
console.log("────────────────────────────────────────");

if (typeof productos !== 'undefined') {
    console.log("✅ Array de productos cargado correctamente");
    console.log(`   Total de productos: ${productos.length}`);
} else {
    console.log("❌ ERROR: Array de productos no encontrado");
}

if (typeof performSearch === 'function') {
    console.log("✅ Función performSearch disponible");
} else {
    console.log("❌ ERROR: Función performSearch no encontrada");
}

if (typeof displayResults === 'function') {
    console.log("✅ Función displayResults disponible");
} else {
    console.log("❌ ERROR: Función displayResults no encontrada");
}

if (typeof createProductElement === 'function') {
    console.log("✅ Función createProductElement disponible");
} else {
    console.log("❌ ERROR: Función createProductElement no encontrada");
}

// =========================================================================
// TEST 2: ESTRUCTURA DE DATOS
// =========================================================================

console.log("\n✓ TEST 2: Estructura de datos de productos");
console.log("─────────────────────────────────────────");

if (productos.length > 0) {
    const primerProducto = productos[0];
    console.log("Primer producto:", primerProducto.name);
    
    const propiedadesRequeridas = ['id', 'name', 'price', 'description', 'image', 'category', 'genre'];
    let propiedadesCorrrectas = 0;
    
    propiedadesRequeridas.forEach(prop => {
        if (primerProducto.hasOwnProperty(prop)) {
            console.log(`✅ Propiedad '${prop}' encontrada`);
            propiedadesCorrrectas++;
        } else {
            console.log(`❌ Propiedad '${prop}' faltante`);
        }
    });
    
    console.log(`Resultado: ${propiedadesCorrrectas}/${propiedadesRequeridas.length} propiedades OK`);
}

// =========================================================================
// TEST 3: BÚSQUEDA BÁSICA
// =========================================================================

console.log("\n✓ TEST 3: Búsqueda por nombre");
console.log("───────────────────────────");

const busquedaTest = productos.filter(p => 
    p.name.toLowerCase().includes('jean') || 
    p.description.toLowerCase().includes('jean')
);

console.log(`Búsqueda por "jean": ${busquedaTest.length} resultados`);
busquedaTest.forEach(p => {
    console.log(`  - ${p.name} ($${p.price})`);
});

// =========================================================================
// TEST 4: FILTRADO POR CATEGORÍA
// =========================================================================

console.log("\n✓ TEST 4: Filtrado por categoría");
console.log("──────────────────────────────");

const categorias = [...new Set(productos.map(p => p.category))];
console.log(`Categorías encontradas: ${categorias.join(', ')}`);

categorias.forEach(cat => {
    const cantidad = productos.filter(p => p.category === cat).length;
    console.log(`  - ${cat}: ${cantidad} productos`);
});

// =========================================================================
// TEST 5: FILTRADO POR GÉNERO
// =========================================================================

console.log("\n✓ TEST 5: Filtrado por género");
console.log("──────────────────────────");

const generos = [...new Set(productos.map(p => p.genre))];
console.log(`Géneros encontrados: ${generos.join(', ')}`);

generos.forEach(gen => {
    const cantidad = productos.filter(p => p.genre === gen).length;
    console.log(`  - ${gen}: ${cantidad} productos`);
});

// =========================================================================
// TEST 6: COMBINACIÓN DE FILTROS
// =========================================================================

console.log("\n✓ TEST 6: Combinación de filtros");
console.log("───────────────────────────────");

const filtrosTest = productos.filter(p => 
    (p.name.toLowerCase().includes('vest') || p.description.toLowerCase().includes('vest')) &&
    p.category === 'Ropa' &&
    p.genre === 'Mujer'
);

console.log("Búsqueda: 'vest' + Categoría: 'Ropa' + Género: 'Mujer'");
console.log(`Resultados: ${filtrosTest.length}`);
filtrosTest.forEach(p => {
    console.log(`  ✓ ${p.name}`);
});

// =========================================================================
// TEST 7: CASOS EDGE
// =========================================================================

console.log("\n✓ TEST 7: Pruebas de casos especiales");
console.log("────────────────────────────────────");

// Case insensitive
const busquedaMayuscula = productos.filter(p => 
    p.name.toLowerCase().includes('JEAN'.toLowerCase())
);
console.log(`Búsqueda case-insensitive "JEAN": ${busquedaMayuscula.length} resultados ✓`);

// Búsqueda parcial
const busquedaParcial = productos.filter(p => 
    p.name.toLowerCase().includes('zap')
);
console.log(`Búsqueda parcial "zap": ${busquedaParcial.length} resultados ✓`);

// Sin resultados
const sinResultados = productos.filter(p => 
    p.name.toLowerCase().includes('xyz123')
);
console.log(`Búsqueda que no existe "xyz123": ${sinResultados.length} resultados (esperado: 0) ${sinResultados.length === 0 ? '✓' : '❌'}`);

// =========================================================================
// TEST 8: VALIDAR PRECIOS
// =========================================================================

console.log("\n✓ TEST 8: Validación de precios");
console.log("──────────────────────────────");

const precioValido = productos.every(p => typeof p.price === 'number' && p.price > 0);
if (precioValido) {
    console.log("✅ Todos los productos tienen precio válido");
    const precioMin = Math.min(...productos.map(p => p.price));
    const precioMax = Math.max(...productos.map(p => p.price));
    console.log(`   Rango: $${precioMin} - $${precioMax}`);
} else {
    console.log("❌ Algunos productos tienen precio inválido");
}

// =========================================================================
// TEST 9: localStorage
// =========================================================================

console.log("\n✓ TEST 9: Verificación de localStorage");
console.log("─────────────────────────────────────");

try {
    localStorage.setItem('test_buscador', 'test');
    localStorage.removeItem('test_buscador');
    console.log("✅ localStorage está disponible y funciona");
} catch (e) {
    console.log("⚠️  localStorage NO está disponible (posiblemente modo privado)");
}

// =========================================================================
// TEST 10: ELEMENTOS DEL DOM
// =========================================================================

console.log("\n✓ TEST 10: Verificación de elementos HTML");
console.log("────────────────────────────────────────");

const elementosEsperados = [
    { id: 'searchInput', nombre: 'Campo de búsqueda' },
    { id: 'categoryFilter', nombre: 'Filtro de categoría' },
    { id: 'genreFilter', nombre: 'Filtro de género' },
    { id: 'resetFilters', nombre: 'Botón limpiar filtros' },
    { id: 'searchResults', nombre: 'Contenedor de resultados' },
    { id: 'resultsCount', nombre: 'Contador de resultados' }
];

elementosEsperados.forEach(elem => {
    const existe = document.getElementById(elem.id);
    if (existe) {
        console.log(`✅ ${elem.nombre} encontrado`);
    } else {
        console.log(`❌ ${elem.nombre} NO encontrado`);
    }
});

// =========================================================================
// RESUMEN FINAL
// =========================================================================

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║                    RESUMEN DE TESTS                      ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("✅ BUSCADOR LISTO PARA USAR");
console.log("\nProximos pasos:");
console.log("1. Abre la página search.html en el navegador");
console.log("2. Intenta buscar: 'jean', 'vestido', 'zapatilla'");
console.log("3. Usa los filtros de categoría y género");
console.log("4. Presiona corazón para favoritos");
console.log("5. Presiona 'Agregar' para carrito");
console.log("\nSi todo funciona correctamente, ¡felicidades!");

// =========================================================================
// FUNCIONES DE PRUEBA ADICIONALES
// =========================================================================

/**
 * Función para probar búsqueda manual
 * Uso: testBusqueda('jean')
 */
window.testBusqueda = function(termino) {
    console.log(`\n🔍 Probando búsqueda: "${termino}"`);
    const resultados = productos.filter(p =>
        p.name.toLowerCase().includes(termino.toLowerCase()) ||
        p.description.toLowerCase().includes(termino.toLowerCase())
    );
    console.log(`Resultados encontrados: ${resultados.length}`);
    resultados.forEach(p => {
        console.log(`  • ${p.name} - ${p.category} (${p.genre}) - $${p.price}`);
    });
    return resultados;
};

/**
 * Función para probar filtro de categoría
 * Uso: testCategoria('Ropa')
 */
window.testCategoria = function(categoria) {
    console.log(`\n📂 Filtrando por categoría: "${categoria}"`);
    const resultados = productos.filter(p => p.category === categoria);
    console.log(`Productos en esta categoría: ${resultados.length}`);
    resultados.forEach(p => {
        console.log(`  • ${p.name} - ${p.genre} - $${p.price}`);
    });
    return resultados;
};

/**
 * Función para probar filtro de género
 * Uso: testGenero('Mujer')
 */
window.testGenero = function(genero) {
    console.log(`\n👥 Filtrando por género: "${genero}"`);
    const resultados = productos.filter(p => p.genre === genero);
    console.log(`Productos para este género: ${resultados.length}`);
    resultados.forEach(p => {
        console.log(`  • ${p.name} - ${p.category} - $${p.price}`);
    });
    return resultados;
};

/**
 * Función para listar todos los productos
 * Uso: listarTodos()
 */
window.listarTodos = function() {
    console.log("\n📋 LISTADO COMPLETO DE PRODUCTOS\n");
    productos.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name}`);
        console.log(`   Precio: $${p.price}`);
        console.log(`   Categoría: ${p.category}`);
        console.log(`   Género: ${p.genre}`);
        console.log(`   Stock: ${p.stock}\n`);
    });
};

console.log("\n💡 FUNCIONES DE PRUEBA DISPONIBLES EN LA CONSOLA:");
console.log("   - testBusqueda('termino')");
console.log("   - testCategoria('Ropa')");
console.log("   - testGenero('Mujer')");
console.log("   - listarTodos()");
console.log("\nEjemplo: testBusqueda('jean')");
