# Ejemplo de Archivos Generados

## 📄 Archivo HTML de Entrada

```html
<div id="boxReference" class="w|200px| h|100px|">
  Caja de referencia
</div>

<div class="w|[100vw-#boxReference:width]|">
  Caja que se ajusta
</div>
```

## 📄 CSS Generado (dist/HUHM.css)

```css
/*
 * Generado por HUHM Framework
 * https://github.com/HuGuiTo2083/HUHM
 * Fecha: 2025-11-15T15:19:47.157Z
 */

.w\|200px\| {
  width: 200px;
}

.h\|100px\| {
  height: 100px;
}

.w\|\[100vw-\#boxReference\:width\]\| {
  width: calc(100vw - var(--boxReference-width));
}
```

## 📄 JavaScript Generado (dist/HUHM.js)

```javascript
/**
 * HUHM Framework - Runtime CSS Variables
 * https://github.com/HuGuiTo2083/HUHM
 * Generated: 2025-11-15T15:19:47.157Z
 * 
 * Este script actualiza dinámicamente las variables CSS
 * basadas en las dimensiones de elementos referenciados.
 */

(function() {
  'use strict';

  /**
   * Actualiza las variables CSS basadas en elementos referenciados
   */
  function updateHUHMVariables() {
    // Referencias para elemento: #boxReference
    const el_boxReference = document.getElementById('boxReference');
    if (el_boxReference) {
      document.documentElement.style.setProperty('--boxReference-width', el_boxReference.offsetWidth + 'px');
    } else {
      console.warn('[HUHM] Elemento no encontrado: #boxReference');
    }

  }

  // Ejecuta al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateHUHMVariables);
  } else {
    updateHUHMVariables();
  }

  // Actualiza en resize con throttle para mejor rendimiento
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHUHMVariables, 100);
  });

  // Expone la función globalmente para actualizaciones manuales
  window.HUHM = window.HUHM || {};
  window.HUHM.updateVariables = updateHUHMVariables;
})();
```

## 🎯 Resultado Final

Cuando el navegador ejecuta el JavaScript:

1. **Al cargar la página:**
   ```javascript
   // El script mide el elemento #boxReference
   const width = document.getElementById('boxReference').offsetWidth; // 200px
   
   // Establece la variable CSS
   document.documentElement.style.setProperty('--boxReference-width', '200px');
   ```

2. **El CSS se calcula:**
   ```css
   /* El navegador resuelve: */
   .w\|\[100vw-\#boxReference\:width\]\| {
     width: calc(100vw - 200px); /* Valor real calculado */
   }
   ```

3. **En cada resize:**
   - El script vuelve a medir el elemento
   - Actualiza la variable CSS
   - El navegador recalcula automáticamente el `calc()`

## 🔧 Ejemplo con Múltiples Referencias

### HTML
```html
<header id="header" class="h|80px|">Header</header>
<aside id="sidebar" class="w|250px|">Sidebar</aside>

<main class="w|[100vw-#sidebar:width]| h|[100vh-#header:height]|">
  Contenido
</main>
```

### CSS Generado
```css
.h\|80px\| {
  height: 80px;
}

.w\|250px\| {
  width: 250px;
}

.w\|\[100vw-\#sidebar\:width\]\| {
  width: calc(100vw - var(--sidebar-width));
}

.h\|\[100vh-\#header\:height\]\| {
  height: calc(100vh - var(--header-height));
}
```

### JavaScript Generado
```javascript
(function() {
  'use strict';

  function updateHUHMVariables() {
    // Referencias para elemento: #header
    const el_header = document.getElementById('header');
    if (el_header) {
      document.documentElement.style.setProperty('--header-height', el_header.offsetHeight + 'px');
    } else {
      console.warn('[HUHM] Elemento no encontrado: #header');
    }

    // Referencias para elemento: #sidebar
    const el_sidebar = document.getElementById('sidebar');
    if (el_sidebar) {
      document.documentElement.style.setProperty('--sidebar-width', el_sidebar.offsetWidth + 'px');
    } else {
      console.warn('[HUHM] Elemento no encontrado: #sidebar');
    }

  }

  // ... resto del código de inicialización
})();
```

## ✅ Ventajas de Esta Implementación

1. **Automático**: No necesitas escribir JavaScript manualmente
2. **Reactivo**: Se actualiza en resize de ventana
3. **Optimizado**: Usa throttle para mejor rendimiento
4. **Debuggeable**: Muestra advertencias si faltan elementos
5. **Minificable**: Respeta la configuración de minify
6. **Modular**: Solo se genera JS si hay referencias

## 🚀 Cómo Usar

1. **Escribe tu HTML** con referencias:
   ```html
   <div id="myBox" class="w|300px|"></div>
   <div class="w|[100vw-#myBox:width]|"></div>
   ```

2. **Ejecuta el build**:
   ```bash
   npm run build
   ```

3. **Incluye ambos archivos**:
   ```html
   <link rel="stylesheet" href="./dist/HUHM.css">
   <script src="./dist/HUHM.js"></script>
   ```

4. **¡Listo!** El JavaScript se encarga del resto automáticamente.

## 📊 Comparación

### Antes (Manual)
```javascript
// Tenías que escribir esto manualmente:
const box = document.getElementById('myBox');
const width = box.offsetWidth;
document.documentElement.style.setProperty('--myBox-width', width + 'px');

window.addEventListener('resize', () => {
  const width = box.offsetWidth;
  document.documentElement.style.setProperty('--myBox-width', width + 'px');
});
```

### Ahora (Automático)
```html
<!-- Solo escribes la clase y HUHM genera todo el JS -->
<div class="w|[100vw-#myBox:width]|"></div>
```

🎉 ¡Mucho más simple y mantenible!

