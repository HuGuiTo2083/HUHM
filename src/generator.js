const Parser = require('./parser');
const JSGenerator = require('./jsGenerator');

class Generator {
  constructor(config, parser) {
    this.config = config;
    this.parser = parser;
    this.jsGenerator = new JSGenerator(config);
  }

  /**
   * Genera CSS completo a partir de las clases encontradas
   */
  generate(classes) {
    let css = this.generateHeader();
    let baseCSS = '';
    let mediaQueries = {};

    classes.forEach(className => {
      const parsed = this.parser.parseClass(className);
      if (!parsed) return;

      if (!parsed.responsive) {
        // Clase simple sin responsive
        baseCSS += this.generateRule(className, parsed.property, parsed.value);
      } else {
        // Clase con responsive
        if (parsed.baseValue) {
          baseCSS += this.generateRule(className, parsed.property, parsed.baseValue);
        }

        parsed.rules.forEach(({ value, media }) => {
          if (!mediaQueries[media]) {
            mediaQueries[media] = '';
          }
          mediaQueries[media] += this.generateRule(className, parsed.property, value, false);
        });
      }
    });

    css += baseCSS;
    css += this.generateMediaQueries(mediaQueries);

    if (this.config.compiler.minify) {
      css = this.minify(css);
    }

    // Genera JavaScript para referencias de elementos y copiado de clases
    const elementReferences = this.parser.getElementReferences();
    const classCopyReferences = this.parser.getClassCopyReferences();
    const js = this.jsGenerator.generate(elementReferences, classCopyReferences);

    return { css, js };
  }

  /**
   * Genera un comentario de cabecera
   */
  generateHeader() {
    if (!this.config.compiler.comments) return '';
    
    return `/*
 * Generado por HUHM Framework
 * https://github.com/HuGuiTo2083/HUHM
 * Fecha: ${new Date().toISOString()}
 */

`;
  }

  /**
   * Genera una regla CSS individual
   */
  generateRule(className, property, value, includeNewline = true) {
    const selector = this.parser.escapeSelector(className);
    
    // Maneja propiedades múltiples (como px = padding-left + padding-right)
    if (Array.isArray(property)) {
      const rules = property.map(prop => `  ${prop}: ${value};`).join('\n');
      return `.${selector} {\n${rules}\n}${includeNewline ? '\n\n' : '\n'}`;
    }

    return `.${selector} {
  ${property}: ${value};
}${includeNewline ? '\n\n' : '\n'}`;
  }

  /**
   * Genera todas las media queries
   */
  generateMediaQueries(mediaQueries) {
    let css = '';

    Object.entries(mediaQueries).forEach(([media, rules]) => {
      css += `@media ${media} {\n${rules}}\n\n`;
    });

    return css;
  }

  /**
   * Minifica el CSS (básico)
   */
  minify(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Elimina comentarios
      .replace(/\s*{\s*/g, '{')          // Elimina espacios antes/después de {
      .replace(/\s*}\s*/g, '}')          // Elimina espacios antes/después de }
      .replace(/\s*:\s*/g, ':')          // Elimina espacios alrededor de :
      .replace(/\s*;\s*/g, ';')          // Elimina espacios alrededor de ;
      .replace(/;\s*}/g, '}')            // Elimina ; antes de }
      .replace(/\n+/g, '')               // Elimina saltos de línea
      .trim();
  }

  /**
   * Genera estadísticas del CSS generado
   */
  getStats(css) {
    const lines = css.split('\n').length;
    const size = Buffer.byteLength(css, 'utf8');
    const rules = (css.match(/}/g) || []).length;

    return {
      lines,
      size: `${(size / 1024).toFixed(2)} KB`,
      rules,
      minified: this.config.compiler.minify
    };
  }
}

module.exports = Generator;