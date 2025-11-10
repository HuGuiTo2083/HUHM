# 🚀 Nuevas Características de HUHM Framework

## Índice
1. [Sintaxis con Pipes](#1-sintaxis-con-pipes)
2. [Clamp - Valores Fluidos](#2-clamp---valores-fluidos)
3. [Media Queries con @](#3-media-queries-con-)
4. [Clamp + Media Queries](#4-clamp--media-queries)
5. [Calc - Cálculos Automáticos](#5-calc---cálculos-automáticos)
6. [Referencias a Elementos](#6-referencias-a-elementos)
7. [Copiar Clases](#7-copiar-clases-de-otros-elementos)
8. [Colores Mejorados](#8-colores-mejorados)

---

## 1. Sintaxis con Pipes

Ahora puedes usar pipes `|` además de corchetes `[]` para definir valores:

### Sintaxis
```html
<!-- Sintaxis tradicional con corchetes -->
<div class="w[12px]"></div>

<!-- Nueva sintaxis con pipes -->
<div class="w|12px|"></div>
```

### Ejemplos
```html
<!-- Asignación normal de width -->
<div class="w|12px|">Ancho de 12px</div>

<!-- Múltiples propiedades -->
<div class="w|200px| h|100px| bg|#3b82f6|">
  Div azul de 200x100px
</div>
```

**Genera:**
```css
.w\|12px\| {
  width: 12px;
}
```

---

## 2. Clamp - Valores Fluidos

Usa arrays de 3 valores para generar automáticamente `clamp()`:

### Sintaxis
```html
w| [valorMin, valorPreferido, valorMax] |
```

### Ejemplos
```html
<!-- Ancho fluido entre 300px y 800px, preferido 50vw -->
<div class="w| [300px, 50vw, 800px] |">
  Ancho responsive fluido
</div>

<!-- Altura fluida -->
<div class="h| [100px, 20vh, 500px] |">
  Altura fluida
</div>

<!-- Padding fluido -->
<div class="p| [1rem, 3vw, 3rem] |">
  Padding adaptativo
</div>
```

**Genera:**
```css
.w\|\[300px\,50vw\,800px\]\| {
  width: clamp(300px, 50vw, 800px);
}
```

---

## 3. Media Queries con @

Nueva sintaxis para media queries usando `@nombreBreakpoint[valor]`:

### Breakpoints Disponibles
- `@mobile` - Máximo 767px
- `@tablets` - 768px a 1023px  
- `@midLaptop` - 1024px a 1439px
- `@largeScreen` - Desde 1440px

### Sintaxis
```html
w| @mobile[valor], @tablets[valor], @midLaptop[valor], @largeScreen[valor] |
```

### Ejemplos
```html
<!-- Ancho responsive por breakpoint -->
<div class="w| @mobile[100%], @tablets[50%], @midLaptop[33%], @largeScreen[25%] |">
  Ancho adaptativo
</div>

<!-- Padding responsive -->
<div class="p| @mobile[1rem], @tablets[2rem], @largeScreen[3rem] |">
  Padding que crece con el viewport
</div>

<!-- Altura responsive -->
<div class="h| @mobile[300px], @tablets[400px], @largeScreen[500px] |">
  Altura adaptativa
</div>
```

**Genera:**
```css
@media (max-width: 767px) {
  .w\|\@mobile\[100\%\]\,\@tablets\[50\%\]\,\@midLaptop\[33\%\]\,\@largeScreen\[25\%\]\| {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .w\|\@mobile\[100\%\]\,\@tablets\[50\%\]\,\@midLaptop\[33\%\]\,\@largeScreen\[25\%\]\| {
    width: 50%;
  }
}

/* ... más media queries ... */
```

---

## 4. Clamp + Media Queries

Combina clamp con media queries para valores fluidos por breakpoint:

### Sintaxis
```html
w| @mobile[min, pref, max], @tablets[min, pref, max] |
```

### Ejemplos
```html
<!-- Ancho fluido diferente por dispositivo -->
<div class="w| @mobile[200px, 80vw, 400px], @tablets[400px, 60vw, 600px], @largeScreen[600px, 50vw, 900px] |">
  Ancho fluido responsive
</div>

<!-- Padding fluido por breakpoint -->
<div class="p| @mobile[0.5rem, 2vw, 1.5rem], @tablets[1rem, 3vw, 2.5rem] |">
  Padding fluido adaptativo
</div>
```

**Genera:**
```css
@media (max-width: 767px) {
  .w\|\@mobile\[200px\,80vw\,400px\]... {
    width: clamp(200px, 80vw, 400px);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .w\|\@mobile\[200px\,80vw\,400px\]... {
    width: clamp(400px, 60vw, 600px);
  }
}
```

---

## 5. Calc - Cálculos Automáticos

Los operadores matemáticos (+, -, *, /) se convierten automáticamente en `calc()`:

### Sintaxis
```html
w| [expresión-matemática] |
```

### Ejemplos
```html
<!-- Ancho = 100% del viewport menos 40px -->
<div class="w| [100vw - 40px] |">
  Ancho calculado
</div>

<!-- Altura = 100vh menos header y footer -->
<div class="h| [100vh - 80px - 60px] |">
  Altura del contenido
</div>

<!-- Padding dinámico -->
<div class="p| [2rem + 1vw] |">
  Padding que escala
</div>

<!-- Multiplicación -->
<div class="w| [50% * 2] |">
  Ancho doble
</div>

<!-- División -->
<div class="w| [100% / 3] |">
  Un tercio del ancho
</div>
```

**Genera:**
```css
.w\|\[100vw-40px\]\| {
  width: calc(100vw - 40px);
}
```

---

## 6. Referencias a Elementos

Referencia propiedades CSS de otros elementos usando `#elementId:property`:

### Sintaxis
```html
w|[100vw - #elementId:property]|
```

### Propiedades Disponibles
- `width`, `height`
- `padding`, `margin`
- `top`, `left`, `right`, `bottom`

### Ejemplos
```html
<!-- Elemento principal -->
<div id="myMainDiv" class="w|300px|">
  Sidebar de 300px
</div>

<!-- Elemento que usa el ancho del anterior -->
<div class="w|[100vw - #myMainDiv:width]|">
  Contenido = viewport - sidebar
</div>

<!-- Altura basada en otro elemento -->
<div id="header" class="h|80px|">Header</div>
<div class="h|[100vh - #header:height]|">
  Contenido = viewport - header
</div>

<!-- Usando padding de otro elemento -->
<div id="card" class="p|2rem|">Card</div>
<div class="m|[#card:padding * 2]|">
  Margin = padding del card x2
</div>
```

**Genera:**
```css
.w\|\[100vw-\#myMainDiv\:width\]\| {
  width: calc(100vw - var(--myMainDiv-width));
}
```

### ✅ Integrado en HUHM.js

Las referencias CSS se manejan automáticamente. Solo incluye:

```html
<script src="./dist/HUHM.js"></script>
```

HUHM.js automáticamente:
- ✅ Detecta elementos con ID
- ✅ Extrae sus propiedades CSS computadas
- ✅ Crea variables CSS `--elementId-property`
- ✅ Se actualiza en resize y cambios del DOM

#### Configuración Personalizada (Opcional)

```javascript
// Personalizar propiedades observadas
FlexCSS.initCSSReferences({
  properties: ['width', 'height', 'padding', 'margin', 'top', 'left', 'right', 'bottom'],
  autoUpdate: true,
  debounceDelay: 100
});
```

---

## 7. Copiar Clases de Otros Elementos

Copia todas las clases de un elemento usando `#elementId.classes`:

### Sintaxis
```html
<div id="original" class="w|200px| h|80px| rounded|12px|">
  Elemento original
</div>

<div class="#original.classes bg|#3b82f6|">
  Este div hereda: w|200px| h|80px| rounded|12px|
  Y agrega: bg|#3b82f6|
</div>
```

**✅ Integrado en HUHM.js:**

```html
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
  <script src="./dist/HUHM.js"></script>
</head>
```

HUHM.js automáticamente:
- ✅ Busca `#elementId.classes` en las clases
- ✅ Copia las clases del elemento con ese ID
- ✅ Observa cambios dinámicos en el DOM
- ✅ Evita referencias circulares

### Ejemplos
```html
<!-- Card template -->
<div id="cardTemplate" class="w|300px| p|1.5rem| rounded|8px| border|1px|">
  Card original
</div>

<!-- Copiar estilo del card -->
<div class="#cardTemplate.classes bg|white|">Card 1</div>
<div class="#cardTemplate.classes bg|#f3f4f6|">Card 2</div>
<div class="#cardTemplate.classes bg|#e5e7eb|">Card 3</div>

<!-- Botón base -->
<button id="btnBase" class="p|1rem| rounded|6px| border|2px|">
  Botón base
</button>

<!-- Botones con estilos del base -->
<button class="#btnBase.classes bg|#3b82f6| textColor|white|">
  Botón Azul
</button>
<button class="#btnBase.classes bg|#10b981| textColor|white|">
  Botón Verde
</button>
```

---

## 8. Colores Mejorados

### 8.1 Colores Hexadecimales

```html
<!-- Color de fondo -->
<div class="bg|#FF0000|">Fondo rojo</div>
<div class="bgColor|#3b82f6|">Fondo azul</div>

<!-- Color de texto -->
<div class="text|#000000|">Texto negro</div>
<div class="textColor|#666|">Texto gris</div>

<!-- Color de borde -->
<div class="bColor|#FF0000| border|2px|">Borde rojo</div>
```

### 8.2 Colores RGB

Escribe valores RGB sin paréntesis **y sin espacios**, el framework los convierte automáticamente:

```html
<!-- RGB sin paréntesis y SIN ESPACIOS -->
<div class="bgColor|255,0,0|">Fondo rojo RGB</div>
<div class="textColor|0,255,0|">Texto verde RGB</div>
<div class="bColor|255,255,0|">Borde amarillo RGB</div>
```

**⚠️ Importante:** Los valores RGB deben escribirse **sin espacios** porque las clases CSS no pueden contener espacios. El espacio separa clases diferentes.

**Genera:**
```css
.bgColor\|255\,0\,0\| {
  background-color: rgb(255, 0, 0);
}
```

El valor CSS incluye espacios para legibilidad: `rgb(255, 0, 0)`

---

## 🎯 Ejemplos Completos

### Card Responsive Completo

```html
<div class="
  w| @mobile[100%], @tablets[48%], @largeScreen[300px] |
  p| @mobile[1rem, 2vw, 1.5rem], @tablets[1.5rem, 2vw, 2rem] |
  bg|white|
  rounded|8px|
  border|1px|
  bColor|200, 200, 200|
">
  <h3 class="text|24px| textColor|#333|">Título</h3>
  <p class="text| @mobile[14px], @tablets[16px] | textColor|#666|">
    Contenido del card
  </p>
</div>
```

### Layout con Referencias

```html
<!-- Sidebar fijo -->
<aside id="sidebar" class="w|250px| h|100vh| bg|#1e293b|">
  Sidebar
</aside>

<!-- Contenido principal que se ajusta al sidebar -->
<main class="
  w|[100vw - #sidebar:width - 40px]|
  h|[100vh - #header:height]|
  p|2rem|
">
  Contenido principal
</main>
```

### Grid Responsive

```html
<div class="
  w|100%|
  display|grid|
  gap| @mobile[1rem], @tablets[1.5rem], @largeScreen[2rem] |
">
  <div class="#gridItem.classes">Item 1</div>
  <div class="#gridItem.classes">Item 2</div>
  <div class="#gridItem.classes">Item 3</div>
</div>
```

---

## 📝 Resumen de Sintaxis

| Característica | Sintaxis | Ejemplo |
|---------------|----------|---------|
| **Pipes** | `propiedad\|valor\|` | `w\|12px\|` |
| **Clamp** | `w\| [min, pref, max] \|` | `w\| [12px, 3vw, 20px] \|` |
| **Media Queries** | `w\| @breakpoint[valor] \|` | `w\| @mobile[100%], @tablets[50%] \|` |
| **Clamp + Media** | `w\| @breakpoint[min, pref, max] \|` | `w\| @mobile[10px, 2vw, 20px] \|` |
| **Calc** | `w\| [expresión] \|` | `w\| [100vw - 40px] \|` |
| **Referencias** | `w\|[calc con #id:prop]\|` | `w\|[100vw - #sidebar:width]\|` |
| **Copiar clases** | `class="#id.classes"` | `class="#card.classes bg\|red\|"` |
| **Color Hex** | `bColor\|#HEX\|` | `bColor\|#FF0000\|` |
| **Color RGB** | `bColor\|R, G, B\|` | `bColor\|255, 0, 0\|` |

---

## 🔧 Configuración

### Agregar Breakpoints Personalizados

En `flexcss.config.js`:

```javascript
module.exports = {
  breakpoints: {
    // Breakpoints por defecto
    'mobile': '(max-width: 767px)',
    'tablets': '(min-width: 768px) and (max-width: 1023px)',
    'midLaptop': '(min-width: 1024px) and (max-width: 1439px)',
    'largeScreen': '(min-width: 1440px)',
    
    // Tus breakpoints personalizados
    'tiny': '(max-width: 480px)',
    '4k': '(min-width: 2560px)'
  }
};
```

### Agregar Propiedades Personalizadas

```javascript
module.exports = {
  properties: {
    // Propiedades por defecto
    'w': 'width',
    'h': 'height',
    
    // Tus propiedades personalizadas
    'maxW': 'max-width',
    'minH': 'min-height',
    'gap': 'gap',
    'flex': 'flex',
    'grid': 'grid-template-columns'
  }
};
```

---

## 🚀 Comenzar a Usar

1. **Instala el framework:**
```bash
npm install huhm
```

2. **Crea tu configuración:**
```bash
npx huhm init
```

3. **Compila en modo watch:**
```bash
npx huhm watch
```

4. **Usa las nuevas sintaxis en tu HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <div class="w|[300px, 50vw, 800px]| p| @mobile[1rem], @tablets[2rem] | bg|#3b82f6|">
    ¡Hola HUHM!
  </div>
  
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

---

## 💡 Tips y Mejores Prácticas

1. **Usa clamp para tipografía responsive:**
```html
<h1 class="text| [1.5rem, 4vw, 3rem] |">Título Responsive</h1>
```

2. **Combina media queries con clamp para control total:**
```html
<div class="p| @mobile[0.5rem, 2vw, 1rem], @tablets[1rem, 3vw, 2rem] |">
```

3. **Crea sistemas de diseño con referencias:**
```html
<div id="spacing" class="p|1rem|"></div>
<div class="m|[#spacing:padding * 2]|">Margin = padding x2</div>
```

4. **Reutiliza estilos con .classes:**
```html
<div id="template" class="...estilos base..."></div>
<div class="#template.classes bg|red|">Variante 1</div>
<div class="#template.classes bg|blue|">Variante 2</div>
```

---

## ⚠️ Notas Importantes

- Las referencias a elementos (`#id:property`) requieren el script `css-references.js`
- Los corchetes `[]` y pipes `||` pueden usarse de forma intercambiable
- El clamp requiere exactamente 3 valores: `[min, preferido, max]`
- Las media queries con `@` se pueden combinar con valores simples o clamp
- Los colores RGB se detectan automáticamente por su formato `número, número, número`

---

## 🐛 Solución de Problemas

### Las referencias no funcionan
- ✅ Verifica que incluiste `css-references.js`
- ✅ Asegúrate que el elemento tenga un ID válido
- ✅ Comprueba que la propiedad existe en el elemento

### El clamp no se genera
- ✅ Usa exactamente 3 valores separados por comas
- ✅ Encierra los valores en `[]` adicionales: `w| [min, pref, max] |`

### Las media queries no funcionan
- ✅ Verifica que el breakpoint existe en tu configuración
- ✅ Usa la sintaxis `@nombreBreakpoint[valor]`

---

¡Disfruta creando con HUHM Framework! 🎨✨

