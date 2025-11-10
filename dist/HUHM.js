/*!
 * HUHM (FlexCSS) v1.0.1
 * Framework CSS utility-first con compilación JIT en navegador
 * 
 * Copyright (c) 2024 Hugo Ubaldo Hernández Murillo
 * Released under the MIT License
 * 
 * Repository: https://github.com/HuGuiTo2083/HUHM.git
 * Build Date: 2025-11-10T22:44:09.315Z
 */

// src/browser.js - Entry point para compilación en navegador
// Este archivo será bundleado para usarse en CDN

(function(window) {
    'use strict';
  
    // Importar o copiar la lógica de tu parser.js y generator.js
    // Como esto será un bundle, puedes incluir la lógica aquí o importarla
    
    // Configuración por defecto (copia de tu huhm.config.js template)
    const defaultConfig = {
      properties: {
        'p': 'padding',
        'pt': 'padding-top',
        'pr': 'padding-right',
        'pb': 'padding-bottom',
        'pl': 'padding-left',
        'px': ['padding-left', 'padding-right'],
        'py': ['padding-top', 'padding-bottom'],
        'm': 'margin',
        'mt': 'margin-top',
        'mr': 'margin-right',
        'mb': 'margin-bottom',
        'ml': 'margin-left',
        'mx': ['margin-left', 'margin-right'],
        'my': ['margin-top', 'margin-bottom'],
        'w': 'width',
        'h': 'height',
        'minW': 'min-width',
        'maxW': 'max-width',
        'minH': 'min-height',
        'maxH': 'max-height',
        'bg': 'background-color',
        'text': 'color',
        'rounded': 'border-radius',
        'border': 'border-width',
        'flex': 'display',
        'gap': 'gap',
        'fontSize': 'font-size',
        'fontWeight': 'font-weight',
        'opacity': 'opacity'
      },
      theme: {
        colors: {
          'primary': '#3b82f6',
          'secondary': '#8b5cf6',
          'success': '#10b981',
          'danger': '#ef4444',
          'warning': '#f59e0b',
          'dark': '#1f2937',
          'light': '#f3f4f6',
          'white': '#ffffff',
          'black': '#000000'
        },
        spacing: {
          'xs': '0.5rem',
          'sm': '1rem',
          'md': '1.5rem',
          'lg': '2rem',
          'xl': '3rem'
        }
      }
    };
  
    // Cache de CSS generado
    const cssCache = new Set();
    let styleElement = null;
    let config = { ...defaultConfig };
  
    // Parser de clases (copia lógica de tu parser.js)
    function parseClass(className) {
      const match = className.match(/^([a-zA-Z]+)-(.+)$/);
      if (!match) return null;
  
      const [, prop, value] = match;
      return { prop, value };
    }
  
    // Resolver valores
    function resolveValue(value, prop) {
      // Colores del theme
      if ((prop === 'bg' || prop === 'text') && config.theme.colors[value]) {
        return config.theme.colors[value];
      }
  
      // Spacing del theme
      if (['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'].includes(prop)) {
        if (config.theme.spacing[value]) {
          return config.theme.spacing[value];
        }
      }
  
      // Color hex
      if (value.startsWith('#')) {
        return value;
      }
  
      // RGB/RGBA
      if (value.startsWith('rgb')) {
        return value;
      }
  
      // Porcentajes, rem, em, etc
      if (value.includes('%') || value.includes('rem') || value.includes('em') || value.includes('vh') || value.includes('vw')) {
        return value;
      }
  
      // Números puros -> agregar px (excepto algunas propiedades)
      if (/^\d+(\.\d+)?$/.test(value)) {
        const noPxProps = ['fontWeight', 'opacity', 'flex', 'z'];
        if (noPxProps.includes(prop)) {
          return value;
        }
        return value + 'px';
      }
  
      // Keywords CSS (auto, none, etc)
      return value;
    }
  
    // Generar CSS para una clase
    function generateCSS(className) {
      const parsed = parseClass(className);
      if (!parsed) return null;
  
      const { prop, value } = parsed;
      const cssProps = config.properties[prop];
      
      if (!cssProps) return null;
  
      const resolvedValue = resolveValue(value, prop);
      
      // Escapar caracteres especiales en el selector
      const escapedClass = className
        .replace(/\#/g, '\\#')
        .replace(/\//g, '\\/')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\./g, '\\.');
  
      let css = `.${escapedClass} {\n`;
  
      if (Array.isArray(cssProps)) {
        cssProps.forEach(cssProp => {
          css += `  ${cssProp}: ${resolvedValue};\n`;
        });
      } else {
        if (prop === 'flex' && value === 'flex') {
          css += `  display: flex;\n`;
        } else if (prop === 'flex' && value === 'grid') {
          css += `  display: grid;\n`;
        } else {
          css += `  ${cssProps}: ${resolvedValue};\n`;
        }
      }
  
      css += '}\n';
      return css;
    }
  
    // Inicializar <style>
    function init() {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'flexcss-jit';
        styleElement.setAttribute('data-flexcss', 'runtime');
        document.head.appendChild(styleElement);
      }
    }
  
    // Escanear DOM y generar CSS
    function scan(rootElement = document.body) {
      const elements = rootElement.querySelectorAll('*');
      const newCSS = [];
      let newClassCount = 0;
  
      elements.forEach(el => {
        const classes = Array.from(el.classList);
        
        classes.forEach(className => {
          if (cssCache.has(className)) return;
  
          const css = generateCSS(className);
          if (css) {
            newCSS.push(css);
            cssCache.add(className);
            newClassCount++;
          }
        });
      });
  
      if (newCSS.length > 0) {
        styleElement.textContent += newCSS.join('');
        console.log(`🎨 FlexCSS: ${newClassCount} nuevas clases generadas`);
      }
  
      return newClassCount;
    }
  
    // Observar cambios en el DOM
    function observe() {
      const observer = new MutationObserver(mutations => {
        let shouldScan = false;
  
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length) {
            shouldScan = true;
          } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            shouldScan = true;
          }
        });
  
        if (shouldScan) {
          scan();
        }
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
  
      return observer;
    }
  
    // API pública
    const FlexCSS = {
      version: '1.0.0',
      
      init: function(customConfig = {}) {
        // Merge config personalizado
        if (customConfig.properties) {
          config.properties = { ...config.properties, ...customConfig.properties };
        }
        if (customConfig.theme) {
          if (customConfig.theme.colors) {
            config.theme.colors = { ...config.theme.colors, ...customConfig.theme.colors };
          }
          if (customConfig.theme.spacing) {
            config.theme.spacing = { ...config.theme.spacing, ...customConfig.theme.spacing };
          }
        }
  
        init();
  
        // Escanear cuando el DOM esté listo
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            const count = scan();
            observe();
            console.log(`✅ FlexCSS inicializado (${count} clases generadas)`);
          });
        } else {
          const count = scan();
          observe();
          console.log(`✅ FlexCSS inicializado (${count} clases generadas)`);
        }
  
        return this;
      },
  
      scan: scan,
      
      getConfig: function() {
        return config;
      },
  
      reset: function() {
        cssCache.clear();
        if (styleElement) {
          styleElement.textContent = '';
        }
      }
    };
  
    // Auto-inicializar si tiene data-auto-init
    const currentScript = document.currentScript;
    if (currentScript && currentScript.hasAttribute('data-auto-init')) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FlexCSS.init());
      } else {
        FlexCSS.init();
      }
    }
  
    // Exponer globalmente
    window.HUHM = FlexCSS;
    window.FlexCSS = FlexCSS; // Mantener por compatibilidad
  
    // Para compatibilidad con module bundlers
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = FlexCSS;
    }
  
  })(typeof window !== 'undefined' ? window : global);