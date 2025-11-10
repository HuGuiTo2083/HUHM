# 🚀 Guía de Integración HUHM Framework

Esta guía explica cómo integrar HUHM en diferentes tipos de proyectos.

---

## 📋 Índice

1. [HTML Estático](#1-html-estático)
2. [Node.js / Express](#2-nodejs--express)
3. [Angular](#3-angular)
4. [React](#4-react)
5. [Vue.js](#5-vuejs)
6. [Vite](#6-vite)

---

## 1. HTML Estático

### Opción A: Usando archivos locales

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto con HUHM</title>
  
  <!-- HUHM CSS -->
  <link rel="stylesheet" href="./dist/HUHM.css">
</head>
<body>
  
  <div class="w|100%| h|100vh| bg|#3b82f6| text|center|">
    <h1 class="fontSize|[1.5rem,4vw,3rem]| textColor|#fff|">
      ¡Hola HUHM!
    </h1>
  </div>
  
  <!-- HUHM JS (incluye CSS References y Copy Classes) -->
  <script src="./dist/HUHM.js"></script>
</body>
</html>
```

### Opción B: Usando CDN (futuro)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Proyecto con HUHM</title>
  
  <!-- HUHM CSS desde CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/huhm-framework@1.0.0/dist/HUHM.min.css">
</head>
<body>
  
  <div class="w|200px| h|100px| bg|#3b82f6|">
    Contenido
  </div>
  
  <!-- HUHM JS desde CDN -->
  <script src="https://cdn.jsdelivr.net/npm/huhm-framework@1.0.0/dist/HUHM.min.js"></script>
</body>
</html>
```

### Compilación para HTML Estático

```bash
# 1. Instala HUHM (si usas npm)
npm install

# 2. Configura tus archivos HTML en flexcss.config.js
# content: ['./index.html', './pages/**/*.html']

# 3. Compila el CSS
npm run build

# 4. Copia los archivos generados a tu proyecto
# - dist/HUHM.css
# - dist/HUHM.js (o HUHM.min.js)

# 5. Modo watch para desarrollo
npm run watch
```

---

## 2. Node.js / Express

### Instalación

```bash
# En tu proyecto Node.js
npm install huhm-framework --save-dev
# O si estás usando el framework local
npm install path/to/HUHM
```

### Configuración

Crea `flexcss.config.js` en la raíz de tu proyecto:

```javascript
// flexcss.config.js
module.exports = {
  content: [
    './views/**/*.ejs',        // Si usas EJS
    './views/**/*.pug',        // Si usas Pug
    './views/**/*.hbs',        // Si usas Handlebars
    './public/**/*.html',      // HTML estático
  ],
  output: './public/css/huhm.css',
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    }
  }
};
```

### Uso en Express

```javascript
// server.js
const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos (donde está HUHM.css y HUHM.js)
app.use(express.static('public'));

// Configurar motor de vistas (ejemplo con EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

### Template EJS de ejemplo

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title>Express + HUHM</title>
  <link rel="stylesheet" href="/css/huhm.css">
</head>
<body>
  
  <div class="w|100%| p|2rem| bg|#3b82f6|">
    <h1 class="textColor|#fff| fontSize|2rem|">
      Express + HUHM Framework
    </h1>
  </div>
  
  <script src="/js/HUHM.js"></script>
</body>
</html>
```

### Scripts en package.json

```json
{
  "scripts": {
    "dev": "concurrently \"npm run watch:css\" \"nodemon server.js\"",
    "watch:css": "node node_modules/huhm-framework/src/cli.js watch",
    "build:css": "node node_modules/huhm-framework/src/cli.js build",
    "start": "node server.js"
  },
  "devDependencies": {
    "concurrently": "^8.0.0",
    "nodemon": "^3.0.0",
    "huhm-framework": "^1.0.0"
  }
}
```

### Comandos

```bash
# Desarrollo (con watch automático)
npm run dev

# Solo compilar CSS
npm run build:css

# Producción
npm run build:css && npm start
```

---

## 3. Angular

### Instalación

```bash
# En tu proyecto Angular
npm install huhm-framework --save-dev
```

### Configuración

Crea `flexcss.config.js` en la raíz:

```javascript
// flexcss.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/app/**/*.component.html',
  ],
  output: './src/styles/huhm.css',
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    }
  }
};
```

### Método 1: Importar en styles.css

```css
/* src/styles.css */
@import './styles/huhm.css';

/* Tus estilos globales */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Método 2: Agregar en angular.json

```json
{
  "projects": {
    "tu-proyecto": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "src/styles/huhm.css"
            ],
            "scripts": [
              "node_modules/huhm-framework/dist/HUHM.js"
            ]
          }
        }
      }
    }
  }
}
```

### Uso en Componentes

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi App con HUHM';
}
```

```html
<!-- app.component.html -->
<div class="w|100%| h|100vh| bg|#f3f4f6|">
  
  <!-- Header -->
  <header class="w|100%| h|60px| bg|#3b82f6| p|1rem| flex|flex|">
    <h1 class="textColor|#fff| fontSize|1.5rem|">
      {{ title }}
    </h1>
  </header>
  
  <!-- Contenido -->
  <main class="p|2rem|">
    <div class="w|[300px,50vw,800px]| p|1.5rem| rounded|12px| bg|#fff|">
      <h2 class="fontSize|[1rem,2vw,1.5rem]|">Card Responsive</h2>
      <p class="textColor|#666|">Con clamp automático</p>
    </div>
  </main>
  
</div>
```

### Scripts en package.json

```json
{
  "scripts": {
    "ng": "ng",
    "start": "npm run watch:css & ng serve",
    "build": "npm run build:css && ng build",
    "watch:css": "node node_modules/huhm-framework/src/cli.js watch",
    "build:css": "node node_modules/huhm-framework/src/cli.js build"
  }
}
```

### Comandos Angular

```bash
# Desarrollo con watch automático
npm start

# Build de producción
npm run build

# Solo compilar CSS de HUHM
npm run build:css
```

---

## 4. React

### Instalación

```bash
# Create React App o Vite
npm install huhm-framework --save-dev
```

### Configuración

```javascript
// flexcss.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  output: './src/styles/huhm.css',
};
```

### Importar en tu App

```jsx
// src/App.js
import React from 'react';
import './styles/huhm.css';

function App() {
  return (
    <div className="w|100%| h|100vh| bg|#f3f4f6|">
      
      {/* Header */}
      <header className="w|100%| h|60px| bg|#3b82f6| p|1rem|">
        <h1 className="textColor|#fff| fontSize|1.5rem|">
          React + HUHM Framework
        </h1>
      </header>
      
      {/* Card */}
      <div className="p|2rem|">
        <div className="w|[300px,50vw,800px]| p|1.5rem| rounded|12px| bg|#fff|">
          <h2 className="fontSize|[1rem,2vw,1.5rem]|">Card Responsive</h2>
          <p className="textColor|#666|">Con valores fluidos</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
```

### Incluir HUHM.js

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>React + HUHM</title>
</head>
<body>
  <div id="root"></div>
  
  <!-- HUHM.js para funcionalidades avanzadas -->
  <script src="%PUBLIC_URL%/HUHM.js"></script>
</body>
</html>
```

### Scripts

```json
{
  "scripts": {
    "start": "npm run watch:css & react-scripts start",
    "build": "npm run build:css && react-scripts build",
    "watch:css": "node node_modules/huhm-framework/src/cli.js watch",
    "build:css": "node node_modules/huhm-framework/src/cli.js build"
  }
}
```

---

## 5. Vue.js

### Instalación

```bash
npm install huhm-framework --save-dev
```

### Configuración

```javascript
// flexcss.config.js
module.exports = {
  content: [
    './src/**/*.{vue,js,ts}',
    './public/index.html',
  ],
  output: './src/assets/huhm.css',
};
```

### Importar en main.js

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './assets/huhm.css';

createApp(App).mount('#app');
```

### Uso en Componentes

```vue
<!-- src/App.vue -->
<template>
  <div class="w|100%| h|100vh| bg|#f3f4f6|">
    
    <!-- Header -->
    <header class="w|100%| h|60px| bg|#3b82f6| p|1rem|">
      <h1 class="textColor|#fff| fontSize|1.5rem|">
        Vue + HUHM Framework
      </h1>
    </header>
    
    <!-- Card -->
    <div class="p|2rem|">
      <div class="w|[300px,50vw,800px]| p|1.5rem| rounded|12px| bg|#fff|">
        <h2 class="fontSize|[1rem,2vw,1.5rem]|">{{ title }}</h2>
        <p class="textColor|#666|">{{ description }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Card Responsive',
      description: 'Con valores fluidos'
    };
  }
};
</script>
```

### Scripts

```json
{
  "scripts": {
    "serve": "npm run watch:css & vue-cli-service serve",
    "build": "npm run build:css && vue-cli-service build",
    "watch:css": "node node_modules/huhm-framework/src/cli.js watch",
    "build:css": "node node_modules/huhm-framework/src/cli.js build"
  }
}
```

---

## 6. Vite

### Instalación

```bash
npm install huhm-framework --save-dev
```

### Usando el Plugin de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import flexcss from 'huhm-framework/plugins/vite';

export default defineConfig({
  plugins: [
    flexcss({
      content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
      theme: {
        colors: {
          primary: '#3b82f6',
        }
      }
    })
  ]
});
```

### O manualmente

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // ... otras configuraciones
});
```

```javascript
// flexcss.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  output: './src/huhm.css',
};
```

### Importar en tu entrada principal

```javascript
// src/main.js
import './huhm.css';
import './style.css';
```

---

## 📦 Estructura Recomendada de Proyecto

### Node.js / Express
```
mi-proyecto/
├── public/
│   ├── css/
│   │   └── huhm.css          # CSS generado
│   └── js/
│       └── HUHM.js           # Framework JS
├── views/
│   └── index.ejs
├── server.js
├── flexcss.config.js
└── package.json
```

### Angular
```
mi-app-angular/
├── src/
│   ├── app/
│   │   └── components/
│   ├── styles/
│   │   └── huhm.css          # CSS generado
│   └── styles.css
├── angular.json
├── flexcss.config.js
└── package.json
```

### React / Vue
```
mi-app/
├── src/
│   ├── components/
│   ├── styles/ (o assets/)
│   │   └── huhm.css          # CSS generado
│   └── App.js
├── public/
│   └── HUHM.js               # Framework JS
├── flexcss.config.js
└── package.json
```

---

## 🔧 Configuración Avanzada

### flexcss.config.js completo

```javascript
module.exports = {
  // Archivos a escanear
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './public/**/*.html',
  ],
  
  // Archivo de salida
  output: './dist/huhm.css',
  
  // Propiedades personalizadas
  properties: {
    'p': 'padding',
    'w': 'width',
    'bg': 'background-color',
    // ... más propiedades
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablets: '768px',
    midLaptop: '1024px',
    largeScreen: '1440px',
  },
  
  // Tema
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      // ... más colores
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      // ... más espaciados
    }
  },
  
  // Opciones adicionales
  minify: true,
  comments: false,
};
```

---

## 🎯 Scripts Útiles para package.json

```json
{
  "scripts": {
    "huhm:build": "node node_modules/huhm-framework/src/cli.js build",
    "huhm:watch": "node node_modules/huhm-framework/src/cli.js watch",
    "dev": "npm run huhm:watch & npm run dev:server",
    "build": "npm run huhm:build && npm run build:prod"
  }
}
```

---

## 💡 Tips y Recomendaciones

### 1. Desarrollo
- Usa `npm run watch` para recompilar automáticamente
- El framework detecta cambios en tiempo real
- Usa el minificado (HUHM.min.js) solo en producción

### 2. Producción
- Ejecuta `npm run build` antes de desplegar
- Usa las versiones minificadas (HUHM.min.css, HUHM.min.js)
- Considera usar un CDN para mejor performance

### 3. Integración con CI/CD
```yaml
# .github/workflows/deploy.yml
- name: Build HUHM CSS
  run: npm run huhm:build
  
- name: Build Application
  run: npm run build
```

---

## 🐛 Troubleshooting

### Error: "No se encontró flexcss.config.js"
```bash
# Crea el archivo de configuración
npx huhm init
```

### Error: "No se encontraron clases"
- Verifica que los paths en `content` apunten a tus archivos
- Asegúrate de usar la sintaxis correcta: `w|200px|` o `w[200px]`

### Las funcionalidades JS no funcionan
- Verifica que HUHM.js esté incluido
- Revisa la consola del navegador por errores
- Asegúrate de que se cargue después del DOM

---

## 📚 Recursos Adicionales

- [USO-HUHM-JS.md](./USO-HUHM-JS.md) - Guía completa de HUHM.js
- [NUEVAS-CARACTERISTICAS.md](./NUEVAS-CARACTERISTICAS.md) - Todas las características
- [QUICK-START.md](./QUICK-START.md) - Inicio rápido

---

¿Necesitas ayuda con una integración específica? ¡Consulta la documentación o abre un issue!

