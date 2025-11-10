# ⚡ Comandos Rápidos - HUHM Framework

Referencia rápida de comandos para usar HUHM en diferentes entornos.

---

## 🌐 HTML Estático

### Compilar CSS
```bash
# Compilación única
npm run build

# Modo watch (desarrollo)
npm run watch

# Minificar archivos
npm run minify
```

### Estructura de archivos
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  <!-- Tu contenido -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

---

## 🟢 Node.js / Express

### Instalación
```bash
npm install huhm-framework --save-dev
```

### package.json
```json
{
  "scripts": {
    "dev": "concurrently \"npm run watch:css\" \"nodemon server.js\"",
    "watch:css": "huhm watch",
    "build:css": "huhm build",
    "start": "node server.js"
  }
}
```

### Comandos
```bash
# Desarrollo
npm run dev

# Compilar CSS
npm run build:css

# Producción
npm run build:css && npm start
```

### flexcss.config.js
```javascript
module.exports = {
  content: [
    './views/**/*.ejs',
    './views/**/*.pug',
    './public/**/*.html'
  ],
  output: './public/css/huhm.css'
};
```

---

## 🅰️ Angular

### Instalación
```bash
npm install huhm-framework --save-dev
```

### package.json
```json
{
  "scripts": {
    "start": "npm run watch:css & ng serve",
    "build": "npm run build:css && ng build",
    "watch:css": "huhm watch",
    "build:css": "huhm build"
  }
}
```

### Comandos
```bash
# Desarrollo
npm start

# Build producción
npm run build

# Solo CSS
npm run build:css
```

### flexcss.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  output: './src/styles/huhm.css'
};
```

### Importar en src/styles.css
```css
@import './styles/huhm.css';
```

---

## ⚛️ React

### Instalación
```bash
npm install huhm-framework --save-dev
```

### package.json
```json
{
  "scripts": {
    "start": "npm run watch:css & react-scripts start",
    "build": "npm run build:css && react-scripts build",
    "watch:css": "huhm watch",
    "build:css": "huhm build"
  }
}
```

### Comandos
```bash
# Desarrollo
npm start

# Build producción
npm run build
```

### flexcss.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  output: './src/styles/huhm.css'
};
```

### Importar en src/App.js
```javascript
import './styles/huhm.css';
```

---

## 🟩 Vue.js

### Instalación
```bash
npm install huhm-framework --save-dev
```

### package.json
```json
{
  "scripts": {
    "serve": "npm run watch:css & vue-cli-service serve",
    "build": "npm run build:css && vue-cli-service build",
    "watch:css": "huhm watch",
    "build:css": "huhm build"
  }
}
```

### Comandos
```bash
# Desarrollo
npm run serve

# Build producción
npm run build
```

### flexcss.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  output: './src/assets/huhm.css'
};
```

### Importar en src/main.js
```javascript
import './assets/huhm.css';
```

---

## ⚡ Vite

### Instalación
```bash
npm install huhm-framework --save-dev
```

### vite.config.js
```javascript
import { defineConfig } from 'vite';
import flexcss from 'huhm-framework/plugins/vite';

export default defineConfig({
  plugins: [
    flexcss({
      content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}']
    })
  ]
});
```

### Comandos
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview
npm run preview
```

---

## 📦 CLI del Framework

### Comandos disponibles

```bash
# Inicializar configuración
npx huhm init

# Compilar una vez
npx huhm build

# Modo watch (recompila automáticamente)
npx huhm watch

# Ver versión
npx huhm --version

# Ayuda
npx huhm --help
```

### Opciones del CLI

```bash
# Build con config personalizada
npx huhm build --config ./my-config.js

# Watch con verbose
npx huhm watch --verbose

# Build con minificado
npx huhm build --minify
```

---

## 🛠️ Scripts NPM Recomendados

### Para cualquier proyecto

```json
{
  "scripts": {
    "huhm:init": "huhm init",
    "huhm:build": "huhm build",
    "huhm:watch": "huhm watch",
    "huhm:minify": "node scripts/minify.js"
  }
}
```

### Con servidor de desarrollo

```json
{
  "scripts": {
    "dev": "concurrently \"npm run huhm:watch\" \"npm run dev:server\"",
    "dev:server": "nodemon server.js",
    "build": "npm run huhm:build && npm run build:app"
  }
}
```

---

## 🔧 Configuración Rápida

### Mínima
```javascript
module.exports = {
  content: ['./src/**/*.html'],
  output: './dist/huhm.css'
};
```

### Completa
```javascript
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
  output: './dist/huhm.css',
  breakpoints: {
    mobile: '480px',
    tablets: '768px'
  },
  theme: {
    colors: {
      primary: '#3b82f6'
    }
  },
  minify: true
};
```

---

## 🚀 Inicio Rápido por Proyecto

### Proyecto nuevo (HTML)
```bash
mkdir mi-proyecto && cd mi-proyecto
npm init -y
npm install huhm-framework
npx huhm init
# Edita flexcss.config.js
npm run huhm:build
```

### Express existente
```bash
npm install huhm-framework --save-dev
npx huhm init
# Configura content: ['./views/**/*']
npm run huhm:build
```

### Angular existente
```bash
npm install huhm-framework --save-dev
npx huhm init
# Configura content: ['./src/**/*.{html,ts}']
# Importa en src/styles.css
npm run huhm:build
```

### React existente
```bash
npm install huhm-framework --save-dev
npx huhm init
# Configura content: ['./src/**/*.{js,jsx}']
# Importa en App.js
npm run huhm:build
```

---

## 💡 Tips

### 1. Desarrollo rápido
```bash
# Terminal 1: Watch CSS
npm run huhm:watch

# Terminal 2: Servidor
npm run dev
```

### 2. Pre-build hook
```json
{
  "scripts": {
    "prebuild": "npm run huhm:build",
    "build": "your-build-command"
  }
}
```

### 3. Post-install
```json
{
  "scripts": {
    "postinstall": "npm run huhm:build"
  }
}
```

---

## 🐛 Comandos de Debug

```bash
# Ver qué archivos se están escaneando
huhm build --verbose

# Ver las clases encontradas
node -e "const Parser = require('./src/parser'); console.log(Parser.extractClasses('<div class=\"w|200px|\">'));"

# Verificar configuración
node -e "console.log(require('./flexcss.config.js'));"
```

---

## 📚 Más Información

- [GUIA-INTEGRACION.md](./GUIA-INTEGRACION.md) - Guía completa de integración
- [USO-HUHM-JS.md](./USO-HUHM-JS.md) - Uso de HUHM.js
- [QUICK-START.md](./QUICK-START.md) - Inicio rápido

---

✨ **Tip:** Agrega estos scripts a tu `package.json` y simplifica tu workflow de desarrollo.

