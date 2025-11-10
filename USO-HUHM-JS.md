# 📦 Uso de HUHM.js

## ¿Qué es HUHM.js?

`HUHM.js` es el archivo JavaScript del framework que incluye **todas las funcionalidades avanzadas** integradas:

- ✅ **CSS References** - Manejo de referencias a propiedades de elementos (`#elementId:property`)
- ✅ **Copy Classes** - Copia de clases entre elementos (`#elementId.classes`)
- ✅ Auto-inicialización de todas las funcionalidades
- ✅ Observación de cambios en el DOM
- ✅ Actualización automática en resize

---

## 📥 Instalación Simple

Solo necesitas incluir dos archivos en tu HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- El CSS compilado con tus clases -->
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  
  <!-- Tu contenido aquí -->
  <div class="w|200px| h|100px| bg|#3b82f6|">
    ¡Hola HUHM!
  </div>
  
  <!-- HUHM.js - incluye todas las funcionalidades -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

---

## 🚀 Funcionalidades Incluidas

### 1. CSS References (Automático)

Referencias a propiedades de otros elementos en `calc()`:

```html
<div id="myMainDiv" class="w|300px| h|200px| p|20px|">
  Elemento principal
</div>

<div class="w|[100vw-#myMainDiv:width]| h|[100vh-#myMainDiv:height]|">
  Este div se ajusta automáticamente
</div>
```

**¿Cómo funciona?**
- HUHM.js detecta todos los elementos con `id`
- Extrae sus propiedades CSS (`width`, `height`, `padding`, etc.)
- Define variables CSS automáticamente: `--myMainDiv-width`, `--myMainDiv-height`
- Actualiza las variables cuando la ventana cambia de tamaño

### 2. Copy Classes (Automático)

Copia todas las clases de un elemento:

```html
<div id="cardTemplate" class="w|300px| p|1.5rem| rounded|8px| border|1px|">
  Card original
</div>

<div class="#cardTemplate.classes bg|#3b82f6|">
  Hereda: w|300px| p|1.5rem| rounded|8px| border|1px|
  Y agrega: bg|#3b82f6|
</div>

<div class="#cardTemplate.classes bg|#ef4444|">
  Otro card con el mismo estilo pero diferente color
</div>
```

**¿Cómo funciona?**
- HUHM.js busca clases con el patrón `#elementId.classes`
- Encuentra el elemento con ese `id`
- Copia todas sus clases (excepto las que contengan `.classes`)
- Observa cambios en el DOM para actualizar dinámicamente

---

## ⚙️ Configuración Personalizada (Opcional)

Si necesitas personalizar el comportamiento, puedes usar las APIs públicas:

### Personalizar CSS References

```html
<script src="./dist/HUHM.js"></script>
<script>
  // Reinicializar con opciones personalizadas
  FlexCSS.initCSSReferences({
    properties: ['width', 'height', 'padding', 'margin', 'top', 'left', 'right', 'bottom'],
    autoUpdate: true,        // Actualizar en resize
    debounceDelay: 100       // Delay en ms para el debounce
  });
</script>
```

### Reinicializar Copy Classes

```html
<script>
  // Forzar re-copia de clases (útil si cambias IDs dinámicamente)
  FlexCSS.initCopyClasses();
</script>
```

---

## 🔍 Consola del Navegador

Cuando cargues la página, verás en la consola:

```
✅ HUHM CSS References inicializado
✅ HUHM Copy Classes inicializado
```

Esto confirma que ambas funcionalidades están activas.

---

## 📊 Propiedades Observadas por Defecto

CSS References observa estas propiedades por defecto:

- `width`
- `height`
- `padding`
- `margin`
- `top`
- `left`
- `right`
- `bottom`

Puedes agregar más propiedades con la configuración personalizada.

---

## 🎯 Ejemplo Completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HUHM Framework Demo</title>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  
  <!-- Sidebar principal -->
  <div id="sidebar" class="w|250px| h|100vh| bg|#1f2937| p|20px|">
    <h2>Sidebar</h2>
  </div>
  
  <!-- Contenido que se ajusta al sidebar -->
  <div class="w|[100vw-#sidebar:width]| h|100vh| p|40px|">
    <h1 class="fontSize|[1.5rem,4vw,3rem]|">Contenido Principal</h1>
    <p>Este div automáticamente se ajusta al ancho del sidebar</p>
  </div>
  
  <!-- Card template -->
  <div id="cardTemplate" class="w|300px| p|1.5rem| rounded|12px| border|2px| bColor|#e5e7eb|">
    Card Original
  </div>
  
  <!-- Cards que heredan el estilo -->
  <div class="#cardTemplate.classes bg|#3b82f6| textColor|#fff|">
    Card Azul
  </div>
  
  <div class="#cardTemplate.classes bg|#ef4444| textColor|#fff|">
    Card Rojo
  </div>
  
  <!-- HUHM.js con todas las funcionalidades -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

---

## 🐛 Troubleshooting

### Las referencias no funcionan
- ✅ Verifica que el elemento tenga un `id` válido
- ✅ Verifica que HUHM.js esté cargado (revisa la consola)
- ✅ Usa la sintaxis correcta: `#elementId:property`

### Copy Classes no funciona
- ✅ Verifica que el elemento de origen tenga `id`
- ✅ Usa la sintaxis exacta: `#elementId.classes`
- ✅ Revisa la consola por errores

### Las variables CSS no se actualizan
- ✅ Verifica que `autoUpdate: true` (es el default)
- ✅ El debounce tiene 100ms de delay por defecto

---

## 📚 Más Información

- [NUEVAS-CARACTERISTICAS.md](./NUEVAS-CARACTERISTICAS.md) - Documentación completa de todas las características
- [QUICK-START.md](./QUICK-START.md) - Guía rápida de inicio
- [README.md](./README.md) - Documentación principal del framework

---

## 💡 Nota Importante

**Ya NO necesitas** incluir archivos separados como:
- ❌ `src/helpers/css-references.js`
- ❌ `src/helpers/copy-classes.js`

Todo está integrado en `HUHM.js`. Solo incluye ese archivo y tendrás todas las funcionalidades.

