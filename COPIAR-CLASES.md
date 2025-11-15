# 📋 Copiar Clases entre Elementos

## 🎯 Descripción

HUHM permite **copiar automáticamente** las clases de un elemento a otros usando la sintaxis `#elementId.classes`. Esto es útil para mantener consistencia de estilos sin duplicar código.

## 🚀 Sintaxis

```html
<!-- Elemento original con clases -->
<button id="botonPrimario" class="bg|#3b82f6| text|white| p|10px,20px| rounded|5px|">
  Botón Original
</button>

<!-- Elemento que copia las clases -->
<button class="#botonPrimario.classes m|10px,0,0,0|">
  Botón con Estilos Copiados + Margin Extra
</button>
```

## 🔧 Cómo Funciona

### 1. **Tiempo de Compilación** (Build)

Cuando ejecutas `npm run build`, el parser:
1. Detecta la referencia `#botonPrimario.classes`
2. Busca el elemento con `id="botonPrimario"` en tu HTML
3. Extrae todas sus clases
4. Genera el CSS para **todas** esas clases

**Resultado:**
```css
/* CSS generado para las clases del botón original */
.bg\|#3b82f6\| { background: #3b82f6; }
.text\|white\| { color: white; }
.p\|10px\,20px\| { padding: 10px,20px; }
.rounded\|5px\| { border-radius: 5px; }

/* Y también para el margin del segundo botón */
.m\|10px\,0\,0\,0\| { margin: 10px,0,0,0; }
```

### 2. **Tiempo de Ejecución** (Browser)

El JavaScript generado (`HUHM.js`):
1. Busca todos los elementos con `#elementId.classes` en el atributo class
2. Encuentra el elemento fuente por su ID
3. Copia todas sus clases al elemento destino
4. Remueve la referencia `#elementId.classes` del DOM

**JavaScript Generado:**
```javascript
function copyReferencedClasses() {
  // Copiar clases de: #botonPrimario
  const source_botonPrimario = document.getElementById('botonPrimario');
  if (source_botonPrimario) {
    const sourceClasses = Array.from(source_botonPrimario.classList);
    
    // Buscar elementos que referencian #botonPrimario.classes
    document.querySelectorAll('[class*="#botonPrimario.classes"]').forEach(function(targetEl) {
      sourceClasses.forEach(function(cls) {
        if (!targetEl.classList.contains(cls)) {
          targetEl.classList.add(cls);
        }
      });
    });
  }
}
```

## 💡 Ejemplos

### Ejemplo 1: Botones Consistentes

```html
<!-- Botón primario -->
<button id="btnPrimary" class="bg|#3b82f6| text|white| p|12px,24px| rounded|8px| fontSize|16px|">
  Primario
</button>

<!-- Otros botones con los mismos estilos -->
<button class="#btnPrimary.classes m|10px,0,0,0|">
  Secundario
</button>

<button class="#btnPrimary.classes m|10px,0,0,0| opacity|0.8|">
  Deshabilitado
</button>
```

### Ejemplo 2: Cards Consistentes

```html
<!-- Card principal -->
<div id="cardBase" class="bg|white| rounded|12px| p|20px| border|1px| borderColor|#e5e7eb|">
  <h3>Card Original</h3>
</div>

<!-- Otras cards con los mismos estilos -->
<div class="#cardBase.classes m|20px,0,0,0|">
  <h3>Card 2</h3>
</div>

<div class="#cardBase.classes m|20px,0,0,0| bg|#f9fafb|">
  <h3>Card 3 (fondo diferente)</h3>
</div>
```

### Ejemplo 3: Inputs Consistentes

```html
<!-- Input base -->
<input 
  id="inputBase" 
  type="text"
  class="w|100%| p|10px,15px| border|1px| borderColor|#d1d5db| rounded|6px| fontSize|14px|"
  placeholder="Input Original"
/>

<!-- Otros inputs -->
<input 
  type="email" 
  class="#inputBase.classes m|10px,0,0,0|"
  placeholder="Email"
/>

<input 
  type="password" 
  class="#inputBase.classes m|10px,0,0,0|"
  placeholder="Password"
/>
```

### Ejemplo 4: Combinación con Modificadores

```html
<!-- Botón base -->
<button id="btn" class="p|10px,20px| rounded|5px| fontSize|14px| border|0|">
  Base
</button>

<!-- Variaciones -->
<button class="#btn.classes bg|#3b82f6| text|white|">
  Azul
</button>

<button class="#btn.classes bg|#10b981| text|white|">
  Verde
</button>

<button class="#btn.classes bg|#ef4444| text|white|">
  Rojo
</button>
```

## 🎨 Ventajas

1. **DRY (Don't Repeat Yourself)**: No duplicas clases CSS
2. **Consistencia**: Todos los elementos comparten los mismos estilos base
3. **Fácil Mantenimiento**: Cambia el elemento base y todos los derivados se actualizan
4. **Flexible**: Puedes agregar clases adicionales específicas

## ⚙️ Integración

### 1. Build

```bash
npm run build
```

Esto genera:
- `dist/HUHM.css` - Estilos de todas las clases (incluyendo las copiadas)
- `dist/HUHM.js` - Runtime para copiar clases en el navegador

### 2. HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <!-- Elemento fuente -->
  <button id="btnBase" class="bg|blue| text|white| p|10px|">
    Original
  </button>
  
  <!-- Elementos que copian -->
  <button class="#btnBase.classes m|10px|">
    Copia 1
  </button>
  
  <!-- Cargar el JS al final -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

## 🔄 Actualización Dinámica

Si modificas las clases del elemento fuente dinámicamente:

```javascript
// Cambiar clases del elemento fuente
document.getElementById('btnBase').classList.add('newClass');

// Actualizar las copias
window.HUHM.copyClasses();
```

## ⚠️ Consideraciones

1. **ID Único**: El elemento fuente debe tener un ID único
2. **Orden de Carga**: El JS debe cargarse después del HTML
3. **Clases Dinámicas**: Si cambias clases después del load, llama manualmente a `copyClasses()`
4. **Especificidad**: Las clases adicionales pueden sobrescribir las copiadas (orden CSS estándar)

## 🎯 Casos de Uso

### Design System

```html
<!-- Definir componentes base -->
<button id="btn-primary" class="bg|#3b82f6| text|white| p|12px,24px| rounded|8px|">Primary</button>
<button id="btn-secondary" class="bg|#6b7280| text|white| p|12px,24px| rounded|8px|">Secondary</button>
<button id="btn-danger" class="bg|#ef4444| text|white| p|12px,24px| rounded|8px|">Danger</button>

<!-- Usar en toda la app -->
<button class="#btn-primary.classes">Guardar</button>
<button class="#btn-secondary.classes">Cancelar</button>
<button class="#btn-danger.classes">Eliminar</button>
```

### Themes

```html
<!-- Theme light -->
<div id="theme-light" class="bg|white| text|#1f2937| border|1px| borderColor|#e5e7eb|">
  <!-- ... -->
</div>

<!-- Aplicar theme a múltiples cards -->
<div class="#theme-light.classes p|20px| rounded|8px|">Card 1</div>
<div class="#theme-light.classes p|20px| rounded|8px|">Card 2</div>
<div class="#theme-light.classes p|20px| rounded|8px|">Card 3</div>
```

### Responsive Components

```html
<!-- Componente responsive -->
<div id="responsive-card" class="w|@mobile[100%],@tablet[50%],@desktop[33.33%]| p|20px|">
  Base Card
</div>

<!-- Copiar comportamiento responsive -->
<div class="#responsive-card.classes bg|white|">Card 1</div>
<div class="#responsive-card.classes bg|#f3f4f6|">Card 2</div>
<div class="#responsive-card.classes bg|#e5e7eb|">Card 3</div>
```

## 🐛 Debugging

### Verificar en Console

```javascript
// Ver qué elementos tienen referencias
document.querySelectorAll('[class*=".classes"]').forEach(el => {
  console.log('Elemento con referencia:', el);
});

// Forzar actualización
window.HUHM.copyClasses();
```

### Inspeccionar en DevTools

1. Abre DevTools (F12)
2. Selecciona un elemento con `#elementId.classes`
3. Verifica que las clases se hayan copiado en el atributo `class`
4. La referencia `#elementId.classes` debería estar presente pero no afectar el rendering

## 📝 Notas Técnicas

- Las clases se copian usando `classList.add()` para evitar duplicados
- El CSS se genera en compilación, el JS solo "activa" las clases en runtime
- Compatible con todos los navegadores modernos
- La referencia `#elementId.classes` permanece en el HTML pero no afecta CSS

## 🔗 Ver También

- [Referencias a Elementos](./REFERENCIAS-ELEMENTOS.md) - Para referencias de dimensiones
- [Documentación Completa](./README.md)
- [Guía de Integración](./GUIA-INTEGRACION.md)

