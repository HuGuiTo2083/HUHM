const fs = require('fs');
const HUHMCompiler = require('../src/compiler');

/**
 * Plugin de PostCSS para HUHM Framework
 * Uso en postcss.config.js:
 * 
 * module.exports = {
 *   plugins: [
 *     require('huhm-framework/plugins/postcss')
 *   ]
 * }
 */
module.exports = (opts = {}) => {
  const compiler = new HUHMCompiler(opts.config);

  return {
    postcssPlugin: 'huhm',
    
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
        console.error('Error procesando HUHM:', error.message);
      }
    }
  };
};

module.exports.postcss = true;