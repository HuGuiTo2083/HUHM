const HUHMCompiler = require('../src/compiler');
const path = require('path');

/**
 * Plugin de Vite para HUHM Framework
 * 
 * Uso en vite.config.js:
 * 
 * import huhm from 'huhm-framework/plugins/vite'
 * 
 * export default {
 *   plugins: [
 *     huhm()
 *   ]
 * }
 */
function huhmPlugin(options = {}) {
  let compiler;
  let config;

  return {
    name: 'vite-plugin-huhm',

    // Se ejecuta al iniciar Vite
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      compiler = new HUHMCompiler(options.config);
    },

    // Compila CSS al iniciar el servidor de desarrollo
    async buildStart() {
      console.log('🚀 HUHM: Compilando...');
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
        console.log('🔄 HUHM: Recompilando...');
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
        console.log('📦 HUHM: Compilación final...');
        await compiler.build();
      }
    }
  };
}

module.exports = huhmPlugin;