// flexcss.config.js
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
      'Desktop': '(min-width: 1440px)',
      'Wide': '(min-width: 1920px)'
    },
  
    // Propiedades CSS abreviadas
    properties: {
      // Tamaño
      'w': 'width',
      'h': 'height',
      'minW': 'min-width',
      'maxW': 'max-width',
      'minH': 'min-height',
      'maxH': 'max-height',
      
      // Espaciado
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
      
      // Colores
      'bg': 'background',
      'bgColor': 'background-color',
      'text': 'color',
      'borderColor': 'border-color',
      
      // Bordes
      'border': 'border-width',
      'borderT': 'border-top-width',
      'borderR': 'border-right-width',
      'borderB': 'border-bottom-width',
      'borderL': 'border-left-width',
      'rounded': 'border-radius',
      
      // Flexbox
      'flex': 'flex',
      'gap': 'gap',
      'justify': 'justify-content',
      'items': 'align-items',
      
      // Grid
      'grid': 'display',
      'cols': 'grid-template-columns',
      'rows': 'grid-template-rows',
      
      // Tipografía
      'font': 'font-family',
      'fontSize': 'font-size',
      'fontWeight': 'font-weight',
      'lineHeight': 'line-height',
      
      // Display
      'display': 'display',
      'opacity': 'opacity',
      'overflow': 'overflow',
      
      // Posicionamiento
      'position': 'position',
      'top': 'top',
      'right': 'right',
      'bottom': 'bottom',
      'left': 'left',
      'z': 'z-index'
    },
  
    // Valores predefinidos (opcional)
    theme: {
      colors: {
        'primary': '#3b82f6',
        'secondary': '#8b5cf6',
        'success': '#10b981',
        'danger': '#ef4444',
        'warning': '#f59e0b',
        'dark': '#1f2937',
        'light': '#f3f4f6'
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem'
      }
    },
  
    // Opciones del compilador
    compiler: {
      // Minificar CSS
      minify: true,
      
      // Incluir comentarios
      comments: false,
      
      // Prefijos automáticos
      autoprefixer: true
    }
  };