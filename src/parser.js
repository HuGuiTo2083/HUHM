const fs = require('fs');
const glob = require('fast-glob');

class Parser {
  constructor(config) {
    this.config = config;
    this.classesFound = new Set();
  }

  /**
   * Extrae clases de un contenido
   */
  extractClasses(content) {
    // Regex para class="..." o className="..." o class={`...`}
    const patterns = [
      /class(?:Name)?=["']([^"']+)["']/g,
      /class(?:Name)?={`([^`]+)`}/g,
      /class(?:Name)?=\{["']([^"']+)["']\}/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const classString = match[1];
        // Divide por espacios y filtra clases válidas
        const classes = classString.split(/\s+/).filter(cls => 
          cls.includes('[') && cls.includes(']')
        );
        
        classes.forEach(cls => this.classesFound.add(cls.trim()));
      }
    });
  }

  /**
   * Escanea archivos según los patrones de configuración
   */
  async scanFiles() {
    console.log('🔍 Escaneando archivos...');
    
    const files = await glob(this.config.content, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    });

    if (files.length === 0) {
      console.warn('⚠️  No se encontraron archivos para escanear');
      return;
    }

    console.log(`📁 Encontrados ${files.length} archivos`);

    this.classesFound.clear();

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        this.extractClasses(content);
      } catch (error) {
        console.error(`Error leyendo ${file}:`, error.message);
      }
    }

    console.log(`✨ Encontradas ${this.classesFound.size} clases únicas`);
    
    return Array.from(this.classesFound);
  }

  /**
   * Parsea una clase individual: "w[200px]" o "h[50%:Phone, 80%:Computer]"
   */
  parseClass(className) {
    // Regex para capturar: propiedad[valores]
    const basicRegex = /^([a-zA-Z]+)\[([^\]]+)\]$/;
    const match = className.match(basicRegex);

    if (!match) return null;

    const [, property, values] = match;
    
    // Verifica si es una propiedad válida
    const cssProperty = this.config.properties[property];
    if (!cssProperty) {
      console.warn(`⚠️  Propiedad desconocida: ${property}`);
      return null;
    }

    // Detecta si tiene valores responsive
    if (values.includes(':')) {
      return this.parseResponsive(className, property, cssProperty, values);
    }

    // Clase simple sin responsive
    return {
      original: className,
      property: cssProperty,
      value: values,
      responsive: false
    };
  }

  /**
   * Parsea sintaxis responsive: "50%:Phone, 80%:Computer"
   */
  parseResponsive(className, property, cssProperty, values) {
    const rules = values.split(',').map(v => v.trim());
    const parsed = {
      original: className,
      property: cssProperty,
      responsive: true,
      rules: []
    };

    rules.forEach(rule => {
      const [value, breakpoint] = rule.split(':').map(v => v.trim());
      
      if (breakpoint && this.config.breakpoints[breakpoint]) {
        parsed.rules.push({
          value,
          breakpoint,
          media: this.config.breakpoints[breakpoint]
        });
      } else if (!breakpoint) {
        // Sin breakpoint = regla base
        parsed.baseValue = value;
      } else {
        console.warn(`⚠️  Breakpoint desconocido: ${breakpoint}`);
      }
    });

    return parsed;
  }

  /**
   * Escapa caracteres especiales para selectores CSS
   */
  escapeSelector(className) {
    return className
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/:/g, '\\:')
      .replace(/,/g, '\\,')
      .replace(/%/g, '\\%')
      .replace(/\s/g, '\\ ')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }
}

module.exports = Parser;