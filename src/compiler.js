const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const Config = require('./config');
const Parser = require('./parser');
const Generator = require('./generator');

class HUHMCompiler {
  constructor(configPath = null) {
    this.configLoader = new Config();
    this.config = this.configLoader.load(configPath);
    this.parser = new Parser(this.config);
    this.generator = new Generator(this.config, this.parser);
  }

  /**
   * Compila una vez (build mode)
   */
  async build() {
    console.log('🚀 Iniciando compilación...\n');

    try {
      // Escanea archivos
      const classes = await this.parser.scanFiles();

      if (classes.length === 0) {
        console.warn('⚠️  No se encontraron clases para compilar');
        return;
      }

      // Genera CSS y JS
      const { css, js } = this.generator.generate(classes);

      // Guarda archivos
      this.saveCSS(css);
      if (js) {
        this.saveJS(js);
      }

      // Muestra estadísticas
      const stats = this.generator.getStats(css);
      console.log('\n📊 Estadísticas:');
      console.log(`   Reglas CSS: ${stats.rules}`);
      console.log(`   Tamaño CSS: ${stats.size}`);
      console.log(`   Minificado: ${stats.minified ? 'Sí' : 'No'}`);
      if (js) {
        const jsSize = Buffer.byteLength(js, 'utf8');
        console.log(`   Tamaño JS: ${(jsSize / 1024).toFixed(2)} KB`);
      }

      console.log('\n✅ Compilación exitosa!');
    } catch (error) {
      console.error('❌ Error durante la compilación:', error.message);
      throw error;
    }
  }

  /**
   * Modo watch (desarrollo)
   */
  async watch() {
    console.log('👀 Modo watch activado...\n');

    // Compilación inicial
    await this.build();

    console.log('\n🔄 Esperando cambios...\n');

    // Observa cambios en archivos
    const watcher = chokidar.watch(this.config.content, {
      ignoreInitial: true,
      persistent: true,
      ignored: ['**/node_modules/**', '**/dist/**']
    });

    watcher.on('change', async (file) => {
      console.log(`\n📝 Cambio detectado: ${path.relative(process.cwd(), file)}`);
      await this.build();
      console.log('🔄 Esperando cambios...\n');
    });

    watcher.on('add', async (file) => {
      console.log(`\n➕ Archivo nuevo: ${path.relative(process.cwd(), file)}`);
      await this.build();
      console.log('🔄 Esperando cambios...\n');
    });

    // Maneja Ctrl+C
    process.on('SIGINT', () => {
      console.log('\n\n👋 Deteniendo watch mode...');
      watcher.close();
      process.exit(0);
    });
  }

  /**
   * Guarda el CSS generado
   */
  saveCSS(css) {
    const outputPath = path.resolve(this.config.output);
    const dir = path.dirname(outputPath);

    // Crea directorio si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, css, 'utf-8');
    console.log(`\n💾 CSS generado en: ${path.relative(process.cwd(), outputPath)}`);
  }

  /**
   * Guarda el JavaScript generado
   */
  saveJS(js) {
    const cssOutputPath = path.resolve(this.config.output);
    const jsOutputPath = cssOutputPath.replace(/\.css$/, '.js');
    const dir = path.dirname(jsOutputPath);

    // Crea directorio si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(jsOutputPath, js, 'utf-8');
    console.log(`💾 JS generado en: ${path.relative(process.cwd(), jsOutputPath)}`);
  }

  /**
   * Procesa un string directamente (útil para plugins)
   */
  processString(content) {
    this.parser.classesFound.clear();
    this.parser.extractClasses(content);
    const classes = Array.from(this.parser.classesFound);
    return this.generator.generate(classes);
  }
}

module.exports = HUHMCompiler;