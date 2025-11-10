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
        
        // Detecta referencias a clases de otros elementos (#elementId.classes)
        const classRefRegex = /#([a-zA-Z0-9_-]+)\.classes/g;
        let classRefMatch;
        while ((classRefMatch = classRefRegex.exec(classString)) !== null) {
          const elementId = classRefMatch[1];
          // Busca el elemento con ese ID y extrae sus clases
          const elementRegex = new RegExp(`id=["']${elementId}["'][^>]*class(?:Name)?=["']([^"']+)["']`, 'g');
          const elementMatch = elementRegex.exec(content);
          if (elementMatch) {
            const referencedClasses = this.parseClassString(elementMatch[1]);
            referencedClasses.forEach(cls => this.classesFound.add(cls.trim()));
          }
        }
        
        // Extrae clases usando el parser mejorado
        const classes = this.parseClassString(classString);
        classes.forEach(cls => this.classesFound.add(cls.trim()));
      }
    });
  }

  /**
   * Parsea un string de clases respetando los delimitadores [] y ||
   * Maneja correctamente clases con espacios internos
   */
  parseClassString(classString) {
    const classes = [];
    let current = '';
    let inBrackets = 0;
    let inPipes = false;
    let pipeStart = -1;

    for (let i = 0; i < classString.length; i++) {
      const char = classString[i];
      const isSpace = /\s/.test(char);

      if (char === '[') {
        inBrackets++;
        current += char;
      } else if (char === ']') {
        inBrackets--;
        current += char;
      } else if (char === '|') {
        if (!inPipes) {
          // Inicio de pipes
          if (isSpace && i > 0 && current.trim()) {
            // Si hay contenido antes, guárdalo
            classes.push(current.trim());
            current = '';
          }
          inPipes = true;
          pipeStart = i;
          current += char;
        } else {
          // Podría ser el cierre
          current += char;
          // Cuenta pipes desde el inicio
          const pipeCount = (current.match(/\|/g) || []).length;
          // Si tenemos al menos 2 pipes y no estamos en corchetes, cerramos
          if (pipeCount >= 2 && inBrackets === 0) {
            inPipes = false;
          }
        }
      } else if (isSpace && inBrackets === 0 && !inPipes) {
        // Espacio fuera de delimitadores - fin de clase
        if (current.trim()) {
          classes.push(current.trim());
          current = '';
        }
      } else {
        current += char;
      }
    }

    // Agrega la última clase si existe
    if (current.trim()) {
      classes.push(current.trim());
    }

    // Filtra clases válidas
    return classes.filter(cls => {
      // Elimina referencias a clases (#elementId.classes)
      if (cls.includes('.classes')) return false;
      
      // Verifica sintaxis con corchetes: propiedad[valor]
      const hasBrackets = cls.includes('[') && cls.includes(']');
      
      // Verifica sintaxis con pipes: propiedad|valor| (debe tener al menos 2 pipes)
      const pipeCount = (cls.match(/\|/g) || []).length;
      const hasPipes = pipeCount >= 2;
      
      return hasBrackets || hasPipes;
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
   * Parsea una clase individual: "w[200px]", "w|12px|" o "h[50%:Phone, 80%:Computer]"
   */
  parseClass(className) {
    // Regex para capturar ambas sintaxis: propiedad[valores] o propiedad|valores|
    const bracketRegex = /^([a-zA-Z]+)\[([^\]]+)\]$/;
    const pipeRegex = /^([a-zA-Z]+)\|(.+)\|$/;
    
    let match = className.match(bracketRegex) || className.match(pipeRegex);

    if (!match) return null;

    const [, property, values] = match;
    
    // Verifica si es una propiedad válida
    const cssProperty = this.config.properties[property];
    if (!cssProperty) {
      console.warn(`⚠️  Propiedad desconocida: ${property}`);
      return null;
    }

    // Limpia espacios extras del valor
    const cleanValues = values.trim();
    
    // Detecta si usa sintaxis @ para media queries
    if (cleanValues.includes('@')) {
      return this.parseMediaQuerySyntax(className, property, cssProperty, cleanValues);
    }

    // Detecta si tiene valores responsive con : (pero no es un color hex o una referencia de elemento)
    // Color hex: #FFF, #3b82f6
    // Referencia: #elementId:property
    const isHexColor = /^#[0-9a-fA-F]{3,8}$/.test(cleanValues);
    const hasElementReference = /#[a-zA-Z0-9_-]+:/.test(cleanValues);
    
    if (cleanValues.includes(':') && !isHexColor && !hasElementReference) {
      return this.parseResponsive(className, property, cssProperty, cleanValues);
    }

    // Detecta si tiene corchetes (puede ser clamp o calc)
    if (cleanValues.startsWith('[') && cleanValues.endsWith(']')) {
      const innerValue = cleanValues.slice(1, -1).trim();
      
      // Verifica si es clamp (3 valores separados por comas)
      const parts = innerValue.split(',').map(v => v.trim());
      if (parts.length === 3) {
        // Es un clamp
        return {
          original: className,
          property: cssProperty,
          value: this.generateClamp(innerValue),
          responsive: false,
          isClamp: true
        };
      }
      
      // Si no es clamp, verifica si tiene operadores matemáticos (calc)
      if (this.hasCalculation(innerValue)) {
        return {
          original: className,
          property: cssProperty,
          value: this.generateCalc(innerValue),
          responsive: false,
          isCalc: true
        };
      }
      
      // Si no es ni clamp ni calc, usar el valor tal cual
      return {
        original: className,
        property: cssProperty,
        value: innerValue,
        responsive: false
      };
    }

    // Detecta si tiene operadores matemáticos sin corchetes (calc)
    if (this.hasCalculation(cleanValues)) {
      return {
        original: className,
        property: cssProperty,
        value: this.generateCalc(cleanValues),
        responsive: false,
        isCalc: true
      };
    }

    // Detecta si es un color RGB sin paréntesis (255,0,0)
    if (this.isRGBColor(cleanValues)) {
      // Agrega espacios solo para el valor CSS (mejor legibilidad)
      const rgbWithSpaces = cleanValues.replace(/,/g, ', ');
      
      return {
        original: className,
        property: cssProperty,
        value: `rgb(${rgbWithSpaces})`,
        responsive: false
      };
    }

    // Clase simple sin responsive
    return {
      original: className,
      property: cssProperty,
      value: cleanValues,
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
   * Parsea sintaxis de media queries con @: "@mobile[13px], @tablets[15px]"
   */
  parseMediaQuerySyntax(className, property, cssProperty, values) {
    const parsed = {
      original: className,
      property: cssProperty,
      responsive: true,
      rules: []
    };

    // Split por coma para obtener cada regla de media query
    const rules = values.split(',').map(v => v.trim());

    rules.forEach(rule => {
      // Regex para capturar @breakpoint[valor] o @breakpoint[valor1, valor2, valor3]
      const mediaRegex = /@([a-zA-Z]+)\[([^\]]+)\]/;
      const match = rule.match(mediaRegex);

      if (match) {
        const [, breakpoint, value] = match;
        const cleanValue = value.trim();
        
        if (this.config.breakpoints[breakpoint]) {
          // Verifica si el valor es un array para clamp
          let finalValue = cleanValue;
          if (cleanValue.includes(',')) {
            finalValue = this.generateClamp(cleanValue);
          } else if (this.hasCalculation(cleanValue)) {
            finalValue = this.generateCalc(cleanValue);
          }

          parsed.rules.push({
            value: finalValue,
            breakpoint,
            media: this.config.breakpoints[breakpoint]
          });
        } else {
          console.warn(`⚠️  Breakpoint desconocido: ${breakpoint}`);
        }
      }
    });

    return parsed;
  }

  /**
   * Genera una función clamp() desde valores separados por coma
   */
  generateClamp(values) {
    const parts = values.split(',').map(v => v.trim());
    if (parts.length === 3) {
      return `clamp(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    }
    console.warn(`⚠️  clamp() requiere exactamente 3 valores, se encontraron ${parts.length}`);
    return values;
  }

  /**
   * Detecta si una expresión contiene operadores matemáticos
   */
  hasCalculation(value) {
    // Busca operadores +, -, *, / pero no dentro de rgb() o clamp()
    const withoutFunctions = value.replace(/rgb\([^)]+\)/g, '').replace(/clamp\([^)]+\)/g, '');
    return /[\+\-\*\/]/.test(withoutFunctions);
  }

  /**
   * Genera una función calc() y resuelve referencias a elementos (#id:property)
   */
  generateCalc(expression) {
    let calcExpression = expression.trim();
    
    // Si ya está dentro de corchetes extras [], los removemos
    if (calcExpression.startsWith('[') && calcExpression.endsWith(']')) {
      calcExpression = calcExpression.slice(1, -1).trim();
    }

    // PASO 1: Agrega espacios alrededor de operadores + y - (requerido por calc())
    // Pero SOLO si no están después de # (para no romper #elementId)
    calcExpression = calcExpression
      .replace(/([^\s#])([\+\-])([^\s])/g, '$1 $2 $3')  // Agrega espacios alrededor de + y -
      .replace(/\s+/g, ' ')  // Normaliza múltiples espacios a uno solo
      .trim();

    // PASO 2: Reemplaza referencias a elementos #elementId:property con var(--elementId-property)
    // Esto se hace DESPUÉS de agregar espacios para que los guiones de las variables no se afecten
    const refRegex = /#([a-zA-Z0-9_-]+):([a-zA-Z-]+)/g;
    calcExpression = calcExpression.replace(refRegex, (match, elementId, property) => {
      return `var(--${elementId}-${property})`;
    });

    return `calc(${calcExpression})`;
  }

  /**
   * Detecta si un valor es un color RGB (formato: 255, 255, 0)
   */
  isRGBColor(value) {
    // Verifica si tiene el formato: número, número, número
    const rgbRegex = /^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*$/;
    return rgbRegex.test(value);
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
      .replace(/\)/g, '\\)')
      .replace(/\|/g, '\\|')
      .replace(/@/g, '\\@')
      .replace(/#/g, '\\#');  // ¡Importante! Escapar # para colores hex
  }
}

module.exports = Parser;