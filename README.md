# 🎨 HUHM Framework

Un framework CSS moderno con sintaxis intuitiva y compilación JIT (Just-In-Time).

## ✨ Características

- 🚀 **Compilación JIT** - Solo genera el CSS que usas
- 📱 **Responsive Design** - Sintaxis simple para breakpoints
- 🎯 **Valores Arbitrarios** - Usa cualquier valor CSS
- ⚡ **Rápido** - Compilación instantánea
- 🔧 **Configurable** - Personaliza todo según tus necesidades
- 🔌 **Plugins** - Integración con Vite y PostCSS
- 🆕 **Sintaxis con Pipes** - Usa `|` además de `[]`
- 📐 **Clamp Automático** - Valores fluidos con arrays
- 📱 **Media Queries @** - Sintaxis moderna con `@mobile`, `@tablets`, etc
- 🧮 **Calc Automático** - Operaciones matemáticas detectadas automáticamente
- 🔗 **Referencias a Elementos** - Usa propiedades de otros elementos en calc
- 📋 **Copiar Clases** - Hereda clases de otros elementos
- 🎨 **Colores Mejorados** - Soporte RGB sin paréntesis

## 📦 Instalación

```bash
npm install flexcss-framework
```

## 🚀 Inicio Rápido

### 1. Crea tu configuración

```bash
npx flexcss init
```

Esto crea un archivo `flexcss.config.js` con valores por defecto.

### 2. Compila tu CSS

```bash
# Compilación única
npx flexcss build

# Modo watch (desarrollo)
npx flexcss watch
```

### 3. Incluye los archivos generados

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <!-- Tu contenido aquí -->
  
  <!-- HUHM.js incluye referencias a elementos y copiar clases -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

### 4. Usa tus clases

```html
<div class="w|200px| h|100px| bg|#3b82f6| p|20px|">
  ¡Hola HUHM Framework!
</div>
```

## 📖 Sintaxis

### Clases Básicas

```html
<!-- Sintaxis con corchetes (tradicional) -->
<div class="w[200px] h[100px]">

<!-- Nueva sintaxis con pipes -->
<div class="w|200px| h|100px|">

<!-- Padding y margin -->
<div class="p|20px| m|10px|">

<!-- Colores -->
<div class="bg|#3b82f6| text|white|">

<!-- Border radius -->
<div class="rounded|8px|">
```

### 🆕 Nuevas Características

#### 1. Clamp - Valores Fluidos
```html
<!-- Ancho fluido entre 300px y 800px, preferido 50vw -->
<div class="w| [300px, 50vw, 800px] |">
  Ancho responsive fluido
</div>
```

#### 2. Media Queries con @
```html
<!-- Diferentes anchos según dispositivo -->
<div class="w| @mobile[100%], @tablets[50%], @midLaptop[33%], @largeScreen[25%] |">
  Ancho responsive
</div>
```

#### 3. Clamp + Media Queries
```html
<!-- Valores fluidos por breakpoint -->
<div class="w| @mobile[200px, 80vw, 400px], @tablets[400px, 60vw, 600px] |">
  Clamp responsive
</div>
```

#### 4. Calc Automático
```html
<!-- Los operadores se convierten automáticamente en calc() -->
<div class="w| [100vw - 40px] |">
  Ancho calculado
</div>
```

#### 5. Referencias a Elementos
```html
<!-- Usa propiedades CSS de otros elementos -->
<div id="sidebar" class="w|250px|">Sidebar</div>
<div class="w|[100vw - #sidebar:width]|">Contenido</div>
```

#### 6. Copiar Clases
```html
<!-- Copia las clases de otro elemento -->
<div id="original" class="w|200px| h|80px| rounded|12px|">Original</div>
<div class="#original.classes bg|blue|">Copia + modificación</div>
```

**✅ Referencias y Copiar Clases están integradas en `HUHM.js`**

#### 7. Colores RGB Simplificados
```html
<!-- RGB sin paréntesis -->
<div class="bgColor|255, 0, 0| bColor|0, 255, 0|">
  Se convierte automáticamente en rgb()
</div>
```

### Responsive Design

```html
<!-- Diferentes valores según el dispositivo -->
<div class="w[100%:Phone, 50%:Tablet, 33%:Computer]">

<!-- Altura responsive -->
<div class="h[300px:Phone, 500px:Computer]">

<!-- Padding responsive -->
<div class="p[1rem:Phone, 2rem:Tablet, 3rem:Computer]">
```

### Breakpoints Predefinidos

- `Phone` - Máximo 767px
- `Tablet` - 768px a 1023px
- `Computer` - Desde 1024px
- `Desktop` - Desde 1440px

## ⚙️ Configuración

### flexcss.config.js

```javascript
module.exports = {
  // Archivos a escanear
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './index.html'
  ],

  // Archivo de salida
  output: './dist/flexcss.css',

  // Breakpoints personalizados
  breakpoints: {
    'Phone': '(max-width: 767px)',
    'Tablet': '(min-width: 768px) and (max-width: 1023px)',
    'Computer': '(min-width: 1024px)',
  },

  // Propiedades CSS abreviadas
  properties: {
    'w': 'width',
    'h': 'height',
    'p': 'padding',
    'm': 'margin',
    'bg': 'background',
    'text': 'color',
    // ... más propiedades
  },

  // Opciones del compilador
  compiler: {
    minify: true,
    comments: false,
    autoprefixer: true
  }
};
```

## 🔌 Integración

### Con Vite

```javascript
// vite.config.js
import flexcss from 'flexcss-framework/plugins/vite'

export default {
  plugins: [
    flexcss()
  ]
}
```

### Con PostCSS

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('flexcss-framework/plugins/postcss')
  ]
}
```

## 📝 Propiedades Disponibles

| Abreviación | Propiedad CSS |
|-------------|---------------|
| `w` | width |
| `h` | height |
| `p` | padding |
| `pt` | padding-top |
| `pr` | padding-right |
| `pb` | padding-bottom |
| `pl` | padding-left |
| `m` | margin |
| `mt` | margin-top |
| `mr` | margin-right |
| `mb` | margin-bottom |
| `ml` | margin-left |
| `bg` | background |
| `text` | color |
| `rounded` | border-radius |
| `border` | border-width |

## 🎯 Ejemplos

### Card Responsive

```html
<div class="
  w[100%:Phone, 400px:Computer]
  p[1rem:Phone, 2rem:Computer]
  bg[white]
  rounded[8px]
  border[1px]
">
  <h2 class="text[24px:Phone, 32px:Computer]">
    Título
  </h2>
  <p class="text[14px:Phone, 16px:Computer]">
    Contenido
  </p>
</div>
```

### Grid Layout

```html
<div class="
  display[grid]
  cols[1:Phone, 2:Tablet, 3:Computer]
  gap[1rem:Phone, 2rem:Computer]
">
  <!-- Items del grid -->
</div>
```

## 📚 Documentación Completa

Para ver todas las nuevas características en detalle con ejemplos completos, consulta:
- **[COMANDOS-RAPIDOS.md](./COMANDOS-RAPIDOS.md)** - ⚡ Referencia rápida de comandos para todos los entornos
- **[GUIA-INTEGRACION.md](./GUIA-INTEGRACION.md)** - 🚀 Cómo integrar HUHM en Node.js, Angular, React, Vue, etc.
- **[USO-HUHM-JS.md](./USO-HUHM-JS.md)** - 📦 Guía completa de HUHM.js (CSS References y Copy Classes)
- **[NUEVAS-CARACTERISTICAS.md](./NUEVAS-CARACTERISTICAS.md)** - Documentación completa de todas las sintaxis nuevas
- **[QUICK-START.md](./QUICK-START.md)** - Guía rápida de inicio

## 🧪 Probar el Framework

```bash
# Inicializar configuración
npx huhm init

# Compilar una vez
npx huhm build

# Modo watch (desarrollo)
npx huhm watch
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor abre un issue o pull request.

## 📄 Licencia

MIT © Hugo Ubaldo Hernández Murillo

## 🔗 Links

- [Documentación](https://github.com/HuGuiTo2083/HUHM)
- [NPM](https://npmjs.com/package/huhm)
- [Issues](https://github.com/HuGuiTo2083/HUHM/issues)