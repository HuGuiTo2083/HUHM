# Referencias a Elementos en HUHM

## 📌 Descripción

HUHM ahora soporta **referencias dinámicas a elementos** dentro de tus clases CSS. Esto te permite crear estilos que se adaptan automáticamente basándose en las dimensiones reales de otros elementos en la página.

## 🚀 Cómo Funciona

### Sintaxis Básica

```html
<div id="elementoReferencia" class="w|200px|">
  Elemento de referencia
</div>

<div class="w|[100vw-#elementoReferencia:width]|">
  Este elemento se ajusta basándose en el ancho del elemento anterior
</div>
```

### Formato

```
propiedad|[cálculo-con-#elementId:property]|
```

**Componentes:**
- `#elementId` - El ID del elemento al que quieres referenciar
- `:property` - La propiedad CSS que quieres usar (width, height, etc.)

## 📊 Propiedades Soportadas

Las siguientes propiedades se pueden referenciar:

| Propiedad | Descripción | Ejemplo |
|-----------|-------------|---------|
| `width` | Ancho del elemento | `#box:width` |
| `height` | Altura del elemento | `#box:height` |
| `top` | Posición top | `#box:top` |
| `left` | Posición left | `#box:left` |
| `right` | Posición right | `#box:right` |
| `bottom` | Posición bottom | `#box:bottom` |

## 💡 Ejemplos Prácticos

### Ejemplo 1: Ancho Complementario

```html
<!-- Sidebar de 250px -->
<div id="sidebar" class="w|250px| h|100vh| bg|#333|">
  Sidebar
</div>

<!-- Contenido que ocupa el resto del espacio -->
<div class="w|[100vw-#sidebar:width]| h|100vh|">
  Contenido principal
</div>
```

**CSS Generado:**
```css
.w\|\[100vw-\#sidebar\:width\]\| {
  width: calc(100vw - var(--sidebar-width));
}
```

**JavaScript Generado:**
```javascript
const el_sidebar = document.getElementById('sidebar');
if (el_sidebar) {
  document.documentElement.style.setProperty('--sidebar-width', el_sidebar.offsetWidth + 'px');
}
```

### Ejemplo 2: Altura Dinámica

```html
<!-- Header de altura variable -->
<div id="header" class="w|100%| h|80px| bg|primary|">
  Header
</div>

<!-- Contenido que ocupa el resto de la altura -->
<div class="h|[100vh-#header:height]| overflow|auto|">
  Contenido scrollable
</div>
```

### Ejemplo 3: Múltiples Referencias

```html
<div id="header" class="h|80px|">Header</div>
<div id="footer" class="h|60px|">Footer</div>

<!-- Contenido que resta header y footer -->
<div class="h|[100vh-#header:height-#footer:height]|">
  Contenido
</div>
```

## 🔧 Integración

### 1. Genera el CSS y JS

```bash
npm run build
```

Esto generará:
- `dist/HUHM.css` - Estilos con variables CSS
- `dist/HUHM.js` - Script para actualizar variables dinámicamente

### 2. Incluye ambos archivos en tu HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <!-- Tu contenido -->
  
  <!-- Importante: Incluir el JS al final del body -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

## ⚡ Características del JavaScript

El JavaScript generado:

1. **Auto-inicializa** cuando el DOM está listo
2. **Actualiza en resize** con throttle para mejor rendimiento (100ms)
3. **Expone API global** para actualizaciones manuales:

```javascript
// Actualizar variables manualmente
window.HUHM.updateVariables();
```

4. **Muestra advertencias** si un elemento referenciado no existe:

```
[HUHM] Elemento no encontrado: #miElemento
```

## 🎯 Casos de Uso

### Layout Responsive Complejo

```html
<div id="topBar" class="h|60px|">Top Bar</div>
<div id="leftPanel" class="w|300px|">Panel Izquierdo</div>

<div class="w|[100vw-#leftPanel:width]| h|[100vh-#topBar:height]|">
  Área de trabajo principal que se ajusta automáticamente
</div>
```

### Modales Centrados

```html
<div id="modal" class="w|500px| h|300px|">
  Modal
</div>

<div class="left|[50vw-#modal:width/2]| top|[50vh-#modal:height/2]|">
  Centrado perfecto
</div>
```

### Tooltips Inteligentes

```html
<button id="myButton" class="w|120px|">Hover me</button>

<div class="left|[#myButton:left]| top|[#myButton:top-30px]|">
  Tooltip posicionado sobre el botón
</div>
```

## 🔄 Actualización Automática

El JavaScript se ejecuta:

- **Al cargar la página** (DOMContentLoaded)
- **En cada resize** de ventana (con throttle)
- **Manualmente** si llamas a `window.HUHM.updateVariables()`

## ⚠️ Consideraciones

1. **IDs únicos**: Asegúrate de que los elementos referenciados tengan IDs únicos
2. **Orden de carga**: El JavaScript debe cargarse después del DOM
3. **Rendimiento**: Las referencias se actualizan con throttle en resize para optimizar rendimiento
4. **Elementos dinámicos**: Si añades elementos dinámicamente, llama manualmente a `updateVariables()`

## 🛠️ Debugging

Si las referencias no funcionan:

1. **Verifica la consola** para advertencias:
   ```
   [HUHM] Elemento no encontrado: #miElemento
   ```

2. **Inspecciona las variables CSS** en DevTools:
   ```css
   :root {
     --sidebar-width: 250px;
     --header-height: 80px;
   }
   ```

3. **Actualiza manualmente** las variables:
   ```javascript
   window.HUHM.updateVariables();
   ```

## 📝 Notas Técnicas

- El JavaScript es **minificable** (se respeta la opción `minify` del config)
- Las variables CSS se establecen en `:root` (document.documentElement)
- Se usa `offsetWidth`, `offsetHeight`, etc. para obtener dimensiones reales
- Compatible con todos los navegadores modernos que soportan CSS Custom Properties

## 🎉 Ejemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
  <title>Referencias a Elementos</title>
</head>
<body class="m|0|">
  
  <!-- Sidebar -->
  <aside id="sidebar" class="w|250px| h|100vh| bg|#2c3e50| position|fixed| left|0| top|0|">
    <h2 class="text|white| p|20px|">Menu</h2>
  </aside>

  <!-- Contenido principal -->
  <main class="ml|[#sidebar:width]| p|20px|">
    <h1>Contenido Principal</h1>
    <p>Este contenido se ajusta automáticamente al ancho del sidebar</p>
  </main>

  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

## 🔗 Más Información

- [Documentación completa](./README.md)
- [Guía de integración](./GUIA-INTEGRACION.md)
- [Nuevas características](./NUEVAS-CARACTERISTICAS.md)

