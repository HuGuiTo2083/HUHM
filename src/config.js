const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.defaultConfig = {
      // ✅ CAMBIO PRINCIPAL: Buscar en raíz y carpetas comunes
      content: [
        '*.html',                           // Raíz (index.html, etc)
        'src/**/*.{html,js,jsx,ts,tsx,vue}', // Carpeta src
        'pages/**/*.{html,jsx,tsx}',        // Carpeta pages
        'views/**/*.{html,ejs}',            // Carpeta views
        'app/**/*.{html,jsx,tsx}',          // Carpeta app (Next.js)
        'components/**/*.{jsx,tsx,vue}'     // Componentes
      ],
      output: './dist/HUHM.css',
      breakpoints: {
        'Phone': '(max-width: 767px)',
        'Tablet': '(min-width: 768px) and (max-width: 1023px)',
        'Computer': '(min-width: 1024px)',
        'Desktop': '(min-width: 1440px)',
        // Nuevos breakpoints con sintaxis @
        'mobile': '(max-width: 767px)',
        'tablets': '(min-width: 768px) and (max-width: 1023px)',
        'midLaptop': '(min-width: 1024px) and (max-width: 1439px)',
        'largeScreen': '(min-width: 1440px)'
      },
      properties: {
        'w': 'width',
        'h': 'height',
        'p': 'padding',
        'm': 'margin',
        'bg': 'background',
        'bgColor': 'background-color',
        'bColor': 'border-color',
        'text': 'color',
        'textColor': 'color',
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
   * Carga la configuración desde huhm.config.js
   */
  load(configPath = null) {
    // Busca el archivo de configuración
    const possiblePaths = [
      configPath,
      path.join(process.cwd(), 'huhm.config.js'),
      path.join(process.cwd(), 'huhm.config.cjs'),
      path.join(process.cwd(), '.huhmrc.js'),
      // Por compatibilidad, también busca flexcss.config.js
      path.join(process.cwd(), 'flexcss.config.js'),
      path.join(process.cwd(), 'flexcss.config.cjs')
    ].filter(Boolean);

    for (const configFile of possiblePaths) {
      if (fs.existsSync(configFile)) {
        try {
          const userConfig = require(configFile);
          console.log(`✅ Usando configuración: ${path.basename(configFile)}`);
          return this.merge(this.defaultConfig, userConfig);
        } catch (error) {
          console.error(`❌ Error cargando configuración: ${error.message}`);
          console.warn('⚠️  Usando configuración por defecto');
          return this.defaultConfig;
        }
      }
    }

    console.warn('⚠️  No se encontró huhm.config.js, usando configuración por defecto');
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

    if (!config.content || !Array.isArray(config.content) || config.content.length === 0) {
      errors.push('content: Debe especificar al menos un patrón de archivos');
    }

    if (!config.output || typeof config.output !== 'string') {
      errors.push('output: Debe especificar una ruta de salida válida');
    }

    if (errors.length > 0) {
      throw new Error(`Configuración inválida:\n${errors.join('\n')}`);
    }

    return true;
  }

  /**
   * Crea un archivo de configuración de ejemplo
   */
  static createTemplate(targetPath = './huhm.config.js') {
    const templateContent = `module.exports = {
  // Archivos a escanear para clases CSS
  content: [
    '*.html',
    'src/**/*.{html,js,jsx,ts,tsx,vue}',
    'pages/**/*.{html,jsx,tsx}',
    'components/**/*.{jsx,tsx,vue}'
  ],

  // Archivo de salida CSS
  output: './dist/HUHM.css',

  // Breakpoints responsivos personalizados
  breakpoints: {
    'mobile': '(max-width: 767px)',
    'tablet': '(min-width: 768px) and (max-width: 1023px)',
    'laptop': '(min-width: 1024px) and (max-width: 1439px)',
    'desktop': '(min-width: 1440px)'
  },

  // Abreviaturas de propiedades
  properties: {
    'w': 'width',
    'h': 'height',
    'p': 'padding',
    'm': 'margin',
    'bg': 'background',
    'bgColor': 'background-color',
    'text': 'color',
    'rounded': 'border-radius'
  },

  // Tema personalizado
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      success: '#10B981',
      danger: '#EF4444',
      warning: '#F59E0B'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    }
  },

  // Opciones del compilador
  compiler: {
    minify: process.env.NODE_ENV === 'production',
    comments: true,
    autoprefixer: false
  }
};
`;

    if (fs.existsSync(targetPath)) {
      throw new Error(`El archivo ${targetPath} ya existe`);
    }

    fs.writeFileSync(targetPath, templateContent, 'utf8');
    console.log(`✅ Configuración creada en: ${targetPath}`);
  }

  /**
   * Obtiene estadísticas de la configuración actual
   */
  getStats(config) {
    return {
      contentPatterns: config.content.length,
      breakpoints: Object.keys(config.breakpoints).length,
      properties: Object.keys(config.properties).length,
      themeColors: Object.keys(config.theme.colors).length,
      themeSpacing: Object.keys(config.theme.spacing).length
    };
  }
}

module.exports = Config;