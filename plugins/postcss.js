const fs = require('fs');
const FlexCSSCompiler = require('../src/compiler');

/**
 * Plugin de PostCSS para FlexCSS
 * Uso en postcss.config.js:
 * 
 * module.exports = {
 *   plugins: [
 *     require('flexcss-framework/plugins/postcss')
 *   ]
 * }
 */
module.exports = (opts = {}) => {
  const compiler = new FlexCSSCompiler(opts.config);

  return {
    postcssPlugin: 'flexcss',
    
    async Once(root, { result }) {
      // Obtiene el contenido del archivo fuente
      const inputFile = result.opts.from;
      
      if (!inputFile) return;

      // Lee el archivo y procesa las clases
      try {
        const content = fs.readFileSync(inputFile, 'utf-8');
        const generatedCSS = compiler.processString(content);
        
        // Agrega el CSS generado al final del archivo
        root.append(generatedCSS);
      } catch (error) {
        console.error('Error procesando FlexCSS:', error.message);
      }
    }
  };
};

module.exports.postcss = true;