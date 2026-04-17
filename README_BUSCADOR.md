# 🔍 BUSCADOR DE PRODUCTOS - MK ECOMMERCE

## 📋 Descripción

Funcionalidad completa de búsqueda y filtrado para el e-commerce de ropa casual MK. Permite a los usuarios buscar productos por **nombre**, **categoría** o **género** con actualización en **tiempo real** mientras escriben.

## ✨ Características

✅ **Búsqueda en tiempo real** - Los resultados se actualizan conforme escribes  
✅ **Filtrado por categoría** - Ropa, Calzado, Accesorios  
✅ **Filtrado por género** - Hombre, Mujer, Unisex  
✅ **Búsqueda inteligente** - Busca en nombre y descripción del producto  
✅ **Sin librerías externas** - Usa JavaScript puro  
✅ **Responsivo** - Funciona en desktop, tablet y mobile  
✅ **Integración con favoritos** - Marcar productos como favoritos  
✅ **Carrito de compras** - Agregar productos directamente desde búsqueda  

## 🎯 Cómo acceder

1. Desde cualquier página, haz clic en el **icono de búsqueda** (lupa) en la esquina superior derecha
2. O ve directamente a `search.html`

## 🚀 Cómo usar

### Búsqueda por texto
```
1. Escribe en el campo "Buscar productos por nombre..."
2. Los resultados aparecen automáticamente
3. Ejemplo: escribe "jean" para encontrar todos los jeans
```

### Filtrado por categoría
```
1. Abre el dropdown "Categoría"
2. Selecciona una opción:
   - Todas las categorías (predeterminado)
   - Ropa
   - Calzado
   - Accesorios
3. Los resultados se actualizan al instante
```

### Filtrado por género
```
1. Abre el dropdown "Género"
2. Selecciona una opción:
   - Todos los géneros (predeterminado)
   - Hombre
   - Mujer
   - Unisex
3. Los resultados se filtran inmediatamente
```

### Combinar filtros
```
Ejemplo: Buscar + Categoría + Género
- Escribe: "Deportivas"
- Selecciona Categoría: "Calzado"
- Selecciona Género: "Unisex"
- Resultado: Solo zapatillas deportivas unisex
```

### Limpiar filtros
```
Presiona el botón "✕ Limpiar filtros" para:
- Vaciar el campo de búsqueda
- Restablecer categoría a "Todas"
- Restablecer género a "Todos"
- Ver todos los productos
```

## 📁 Archivos principales

| Archivo | Descripción |
|---------|-------------|
| `search.html` | Página de búsqueda (interfaz) |
| `search.js` | Lógica de búsqueda y filtrado |
| `products.json` | Base de datos de productos |
| `style.css` | Estilos de la página de búsqueda |
| `GUIA_BUSCADOR.js` | Documentación técnica detallada |

## 💾 Estructura de un producto

Cada producto tiene la siguiente estructura en `search.js`:

```javascript
{
  "id": 1,                          // ID único
  "name": "Conjunto",               // Nombre (búsqueda)
  "price": 99,                      // Precio
  "description": "Conjunto casual", // Descripción (búsqueda)
  "image": "imagenes/1.jpg",        // Imagen del producto
  "category": "Ropa",               // Categoría (filtrado)
  "genre": "Mujer",                 // Género (filtrado)
  "sizes": ["S","M","L","XL"],      // Tallas disponibles
  "colors": ["Negro","Blanco"],     // Colores disponibles
  "stock": 50                       // Stock disponible
}
```

## ➕ Agregar un nuevo producto

1. Abre el archivo **`search.js`**
2. Busca el array `const productos = [`
3. Agrega un nuevo objeto al final (antes del cierre de corchete):

```javascript
{
  "id": 13,
  "name": "Tu nuevo producto",
  "price": 50,
  "description": "Descripción del producto",
  "image": "imagenes/nueva-imagen.jpg",
  "category": "Ropa",
  "genre": "Mujer",
  "sizes": ["S","M","L"],
  "colors": ["Negro"],
  "stock": 25
}
```

4. Guarda el archivo
5. ¡El producto aparecerá automáticamente en el buscador!

## ➕ Agregar una nueva categoría

1. Abre **`search.html`**
2. Busca: `<select id="categoryFilter">`
3. Agrega una nueva opción:
```html
<option value="Tu Categoría">Tu Categoría</option>
```

4. En **`search.js`**, crea productos con esa categoría
5. ¡Listo! El filtro funcionará automáticamente

**Ejemplo:** Agregar categoría "Electrónica"
```html
<option value="Electrónica">Electrónica</option>
```

## 🔧 Cómo funciona internamente

### Flujo de búsqueda
```
Usuario escribe → evento 'input' → performSearch()
         ↓
Obtiene valores de filtros
         ↓
Filtra el array de productos
         ↓
displayResults() muestra los resultados
         ↓
Se agregan event listeners a favoritos y carrito
```

### Lógica de filtrado
```javascript
- Coincidencia en nombre o descripción (case-insensitive)
- Y categoría (si está seleccionada)
- Y género (si está seleccionado)
```

## 📱 Responsividad

- ✅ Desktop (1024px y más)
- ✅ Tablet (768px a 1023px)
- ✅ Mobile (320px a 767px)

Los filtros se apilan en dispositivos móviles para mejor usabilidad.

## 💾 Almacenamiento local

El buscador usa `localStorage` del navegador para guardar:

- **Favoritos**: Los productos marcados como favoritos
- **Carrito**: Los productos agregados al carrito

Esto permite que los datos persistan entre sesiones.

## 🎨 Personalización de estilos

Los estilos están en `style.css`:

- Color principal: `#34656D` (verde azulado)
- Color secundario: `#e48f1f` (naranja)
- Fuente: `'Jost'` (Google Fonts)

Para cambiar colores:
```css
.search-input {
  border-color: #TU_COLOR; /* Cambia el color del borde */
}

.btn-reset:hover {
  background-color: #TU_COLOR; /* Cambia color hover */
}
```

## 🚨 Solución de problemas

**Q: No aparecen los resultados**
A: Verifica que:
- El archivo `search.js` está cargado correctamente
- El array de productos no está vacío
- No hay errores en la consola (F12)

**Q: La búsqueda es lenta**
A: Con más de 1000 productos, considera:
- Agregar debounce
- Implementar paginación
- Usar una base de datos remota

**Q: Los favoritos no se guardan**
A: Verifica que:
- JavaScript esté habilitado
- localStorage esté disponible en el navegador
- No estés usando modo privado/incógnito

## 🔐 Consideraciones de seguridad

- ✅ No hay datos sensibles en el cliente
- ✅ Las búsquedas son locales (no se envían a servidor)
- ✅ Los favoritos y carrito se guardan localmente

## 🚀 Mejoras futuras

Características que se podrían agregar:

- [ ] Búsqueda por rango de precio
- [ ] Ordenamiento (Precio, Nombre, Nuevo)
- [ ] Paginación de resultados
- [ ] Historial de búsquedas
- [ ] Sugerencias automáticas (autocomplete)
- [ ] Filtrado por color y talla
- [ ] Búsqueda por foto
- [ ] Sincronización con backend

## 📞 Soporte

Para reportar bugs o sugerir mejoras, revisa el archivo `GUIA_BUSCADOR.js` para más detalles técnicos.

---

**Versión:** 1.0  
**Última actualización:** Diciembre 2025  
**Compatible con:** Chrome, Firefox, Safari, Edge, IE 11+

Happy searching! 🎉
