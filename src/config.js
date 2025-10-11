const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.defaultConfig = {
      content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
      output: './dist/flexcss.css',
      breakpoints: {
        'Phone': '(max-width: 767px)',
        'Tablet': '(min-width: 768px) and (max-width: 1023px)',
        'Computer': '(min-width: 1024px)',
        'Desktop': '(min-width: 1440px)'
      },
      properties: {
        'w': 'width',
        'h': 'height',
        'p': 'padding',
        'm': 'margin',
        'bg': 'background',
        'text': 'color',
        'rounded': 'border-radius',
        'border': 'border-width'
      },
      theme: {
        colors: {},
        spacing: {}
      },
      compiler: {
        minify: false,
        comments: true,
        autoprefixer: false
      }
    };
  }

  /**
   * Carga la configuración desde flexcss.config.js
   */
  load(configPath = null) {
    // Busca el archivo de configuración
    const possiblePaths = [
      configPath,
      path.join(process.cwd(), 'flexcss.config.js'),
      path.join(process.cwd(), 'flexcss.config.cjs')
    ].filter(Boolean);

    for (const configFile of possiblePaths) {
      if (fs.existsSync(configFile)) {
        try {
          const userConfig = require(configFile);
          return this.merge(this.defaultConfig, userConfig);
        } catch (error) {
          console.error(`Error cargando configuración: ${error.message}`);
          return this.defaultConfig;
        }
      }
    }

    console.warn('⚠️  No se encontró flexcss.config.js, usando configuración por defecto');
    return this.defaultConfig;
  }

  /**
   * Merge recursivo de objetos
   */
  merge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.merge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Valida la configuración
   */
  validate(config) {
    const errors = [];

    if (!config.content || config.content.length === 0) {
      errors.push('content: Debe especificar al menos un patrón de archivos');
    }

    if (!config.output) {
      errors.push('output: Debe especificar una ruta de salida');
    }

    if (errors.length > 0) {
      throw new Error(`Configuración inválida:\n${errors.join('\n')}`);
    }

    return true;
  }

  /**
   * Crea un archivo de configuración de ejemplo
   */
  static createTemplate(targetPath = './flexcss.config.js') {
    const templatePath = path.join(__dirname, '../templates/flexcss.config.js');
    
    if (fs.existsSync(targetPath)) {
      throw new Error(`El archivo ${targetPath} ya existe`);
    }

    fs.copyFileSync(templatePath, targetPath);
    console.log(`✅ Configuración creada en: ${targetPath}`);
  }
}

module.exports = Config;