# 🎨 FlexCSS Framework

Un framework CSS moderno con sintaxis intuitiva y compilación JIT (Just-In-Time).

## ✨ Características

- 🚀 **Compilación JIT** - Solo genera el CSS que usas
- 📱 **Responsive Design** - Sintaxis simple para breakpoints
- 🎯 **Valores Arbitrarios** - Usa cualquier valor CSS
- ⚡ **Rápido** - Compilación instantánea
- 🔧 **Configurable** - Personaliza todo según tus necesidades
- 🔌 **Plugins** - Integración con Vite y PostCSS

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

### 3. Usa tus clases

```html
<div class="w[200px] h[100px] bg[#3b82f6] p[20px]">
  ¡Hola FlexCSS!
</div>
```

## 📖 Sintaxis

### Clases Básicas

```html
<!-- Ancho y alto -->
<div class="w[200px] h[100px]">

<!-- Padding y margin -->
<div class="p[20px] m[10px]">

<!-- Colores -->
<div class="bg[#3b82f6] text[white]">

<!-- Border radius -->
<div class="rounded[8px]">
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

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor abre un issue o pull request.

## 📄 Licencia

MIT © Hugo Ubaldo Hernández Murillo

## 🔗 Links

- [Documentación](https://github.com/tu-usuario/flexcss)
- [NPM](https://npmjs.com/package/flexcss-framework)
- [Issues](https://github.com/tu-usuario/flexcss/issues)