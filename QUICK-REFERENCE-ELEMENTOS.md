# ⚡ Quick Reference - Referencias a Elementos

## 📖 Sintaxis

```
propiedad|[cálculo-con-#elementId:property]|
```

## 🎯 Ejemplos Rápidos

### Ancho Complementario
```html
<div id="sidebar" class="w|250px|">Sidebar</div>
<div class="w|[100vw-#sidebar:width]|">Content</div>
```

### Altura Dinámica
```html
<header id="header" class="h|80px|">Header</header>
<main class="h|[100vh-#header:height]|">Main</main>
```

### Múltiples Referencias
```html
<div id="a" class="w|100px|"></div>
<div id="b" class="w|200px|"></div>
<div class="w|[100vw-#a:width-#b:width]|">Content</div>
```

### Con Operaciones
```html
<div id="box" class="w|400px|"></div>

<!-- División -->
<div class="w|[#box:width/2]|">Mitad</div>

<!-- Multiplicación -->
<div class="w|[#box:width*0.75]|">75%</div>

<!-- Suma -->
<div class="w|[#box:width+50px]|">+50px</div>
```

## 🔧 Propiedades Disponibles

- `width` - Ancho del elemento
- `height` - Altura del elemento
- `top` - Posición top
- `left` - Posición left
- `right` - Posición right
- `bottom` - Posición bottom

## 📦 Integración

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <!-- Tu contenido con referencias -->
  
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

## 🚀 Build

```bash
# Compilar una vez
npm run build

# Modo watch (desarrollo)
npm run dev
```

**Genera:**
- `dist/HUHM.css` ← Estilos
- `dist/HUHM.js` ← Runtime para variables

## 💡 Tips

1. **IDs únicos**: Cada elemento referenciado debe tener un ID único
2. **Orden**: Carga el JS después del DOM
3. **Update manual**: `window.HUHM.updateVariables()`
4. **Debug**: Revisa la consola para warnings

## 🎯 Casos de Uso Comunes

### Layout App
```html
<nav id="topbar" class="h|60px|"></nav>
<aside id="sidebar" class="w|250px|"></aside>
<main class="w|[100vw-#sidebar:width]| h|[100vh-#topbar:height]|">
  App content
</main>
```

### Modal Centrado
```html
<div id="modal" class="w|500px| h|300px| 
  left|[50vw-250px]| 
  top|[50vh-150px]|">
  Modal
</div>
```

### Grid Responsivo
```html
<div id="container" class="w|1200px|"></div>
<div class="w|[#container:width/3]|">Column 1</div>
<div class="w|[#container:width/3]|">Column 2</div>
<div class="w|[#container:width/3]|">Column 3</div>
```

### Sticky Footer
```html
<footer id="footer" class="h|60px|"></footer>
<div class="minH|[100vh-#footer:height]|">
  Content
</div>
```

## ⚡ API JavaScript

```javascript
// Actualizar variables manualmente
window.HUHM.updateVariables();

// Ejecutar después de cambios en el DOM
document.getElementById('myElement').style.width = '300px';
window.HUHM.updateVariables();
```

## 🐛 Troubleshooting

**Problema**: CSS no se aplica
```
✅ Verifica que el elemento tenga el ID correcto
✅ Revisa la consola para warnings
✅ Asegúrate de incluir el HUHM.js
```

**Problema**: No actualiza en cambios dinámicos
```javascript
// Llama manualmente después de cambios
window.HUHM.updateVariables();
```

**Problema**: No funciona en mobile
```
✅ El JS se ejecuta automáticamente en resize
✅ Verifica que los elementos existan en mobile
```

## 📚 Más Info

- [Documentación completa](./REFERENCIAS-ELEMENTOS.md)
- [Ejemplos generados](./EJEMPLO-GENERADO.md)
- [Solución técnica](./SOLUCION-REFERENCIAS.md)

