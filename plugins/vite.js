const FlexCSSCompiler = require('../src/compiler');
const path = require('path');

/**
 * Plugin de Vite para FlexCSS
 * 
 * Uso en vite.config.js:
 * 
 * import flexcss from 'flexcss-framework/plugins/vite'
 * 
 * export default {
 *   plugins: [
 *     flexcss()
 *   ]
 * }
 */
function flexcssPlugin(options = {}) {
  let compiler;
  let config;

  return {
    name: 'vite-plugin-flexcss',

    // Se ejecuta al iniciar Vite
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      compiler = new FlexCSSCompiler(options.config);
    },

    // Compila CSS al iniciar el servidor de desarrollo
    async buildStart() {
      console.log('🚀 FlexCSS: Compilando...');
      await compiler.build();
    },

    // Observa cambios en archivos y recompila
    async handleHotUpdate({ file, server }) {
      // Solo recompila si es un archivo de tu proyecto
      const shouldRecompile = compiler.config.content.some(pattern => {
        // Simplificado: verifica la extensión
        const ext = path.extname(file);
        return ['.html', '.jsx', '.tsx', '.js', '.ts', '.vue'].includes(ext);
      });

      if (shouldRecompile) {
        console.log('🔄 FlexCSS: Recompilando...');
        await compiler.build();
        
        // Fuerza recarga del CSS
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },

    // Para build de producción
    async buildEnd() {
      if (config.command === 'build') {
        console.log('📦 FlexCSS: Compilación final...');
        await compiler.build();
      }
    }
  };
}

module.exports = flexcssPlugin;