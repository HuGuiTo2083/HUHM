# 🚀 Quick Start - Nuevas Características de HUHM

## ⚡ Prueba Rápida (3 pasos)

### 1. Compila el proyecto
```bash
npm run build
```

Deberías ver algo como:
```
✅ Configuración encontrada: flexcss.config.js
🚀 Iniciando compilación...
🔍 Escaneando archivos...
📁 Encontrados X archivos
✨ Encontradas Y clases únicas
💾 CSS generado en: dist/HUHM.css
✅ Compilación exitosa!
```

### 2. Abre el archivo de prueba
```bash
# Abre en tu navegador:
test-example.html
```

Verás 10 ejemplos visuales de todas las nuevas características funcionando.

### 3. (Opcional) Ejecuta los tests del parser
```bash
node test-parser.js
```

---

## 📚 Sintaxis Rápida - Cheat Sheet

### Sintaxis con Pipes
```html
<div class="w|200px| h|100px|">
```

### Clamp (valores fluidos)
```html
<div class="w| [300px, 50vw, 800px] |">
```

### Media Queries con @
```html
<div class="w| @mobile[100%], @tablets[50%], @largeScreen[25%] |">
```

### Clamp + Media Queries
```html
<div class="w| @mobile[200px, 80vw, 400px], @tablets[400px, 60vw, 600px] |">
```

### Calc Automático
```html
<div class="w| [100vw - 40px] |">
<div class="h| [100vh - 80px] |">
```

### Referencias a Elementos
```html
<div id="sidebar" class="w|250px|">Sidebar</div>
<div class="w|[100vw - #sidebar:width]|">Contenido</div>
```

### Copiar Clases
```html
<div id="template" class="w|200px| h|80px| rounded|12px|">Original</div>
<div class="#template.classes bg|blue|">Copia con modificación</div>
```

**✅ Ambas funcionalidades están integradas en `HUHM.js`** - solo inclúyelo una vez.

### Colores RGB
```html
<!-- Sin espacios (las clases no pueden tener espacios) -->
<div class="bgColor|255,0,0| bColor|0,255,0|">
```

---

## 🎯 Ejemplo Completo - Card Responsive

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HUHM Example</title>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  
  <!-- Card con todas las nuevas características -->
  <div class="
    w|@mobile[100%],@tablets[48%],@largeScreen[300px]|
    p|[1rem,2vw,2rem]|
    bgColor|255,255,255|
    rounded|8px|
    bColor|200,200,200|
    border|1px|
  ">
    <h2 class="text|[1.2rem,3vw,1.8rem]| textColor|#333|">
      Título Responsive
    </h2>
    <p class="text|@mobile[14px],@tablets[16px]| textColor|#666|">
      Este card usa clamp, media queries, y colores RGB
    </p>
  </div>

  <!-- HUHM Framework - incluye todas las funcionalidades -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

---

## 🔧 Configuración

Tu archivo `flexcss.config.js` ya está configurado con:

- ✅ Rutas a archivos de prueba
- ✅ Nuevos breakpoints (@mobile, @tablets, @midLaptop, @largeScreen)
- ✅ Propiedades de color extendidas (bgColor, bColor, textColor)
- ✅ Comentarios habilitados en CSS generado

---

## 📖 Documentación Completa

- **NUEVAS-CARACTERISTICAS.md** - Guía detallada con todos los ejemplos
- **RESUMEN-IMPLEMENTACION.md** - Resumen técnico de cambios
- **test-example.html** - Tests visuales interactivos
- **test-parser.js** - Tests del parser

---

## ❓ Problemas Comunes

### No se encuentran clases al compilar
- ✅ Verifica que `flexcss.config.js` apunte a tus archivos HTML
- ✅ Asegúrate de usar `[]` o `||` en las clases
- ✅ Revisa que las propiedades existan en la config

### Las referencias no funcionan
- ✅ Incluye `<script src="./dist/HUHM.js"></script>`
- ✅ Asegúrate que el elemento tenga un `id` válido
- ✅ Usa la sintaxis: `#elementId:property`

### El clamp no se genera
- ✅ Usa exactamente 3 valores: `[min, pref, max]`
- ✅ Enciérralos en corchetes: `w| [10px, 5vw, 20px] |`

---

## 🎉 ¡Eso es todo!

Ahora tienes un framework CSS súper poderoso con:
- 🆕 Sintaxis moderna con pipes
- 📐 Valores fluidos con clamp
- 📱 Media queries simplificadas
- 🧮 Cálculos automáticos
- 🔗 Referencias entre elementos
- 🎨 Colores mejorados

**¡Empieza a crear interfaces increíbles!** 🚀

