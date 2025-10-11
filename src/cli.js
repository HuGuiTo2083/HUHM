#!/usr/bin/env node

const { program } = require('commander');
const colors = require('picocolors');
const FlexCSSCompiler = require('../src/compiler');
const Config = require('../src/config');
const packageJson = require('../package.json');

program
  .name('flexcss')
  .description('FlexCSS Framework - CSS moderno con sintaxis intuitiva')
  .version(packageJson.version);

// Comando: init
program
  .command('init')
  .description('Crea un archivo de configuración flexcss.config.js')
  .action(() => {
    try {
      Config.createTemplate();
      console.log(colors.green('✅ Configuración creada exitosamente'));
      console.log(colors.dim('\nPuedes personalizar tu configuración editando flexcss.config.js'));
    } catch (error) {
      console.error(colors.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

// Comando: build
program
  .command('build')
  .description('Compila CSS una vez')
  .option('-c, --config <path>', 'Ruta al archivo de configuración')
  .action(async (options) => {
    try {
      const compiler = new FlexCSSCompiler(options.config);
      await compiler.build();
    } catch (error) {
      console.error(colors.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

// Comando: watch
program
  .command('watch')
  .alias('dev')
  .description('Compila CSS y observa cambios')
  .option('-c, --config <path>', 'Ruta al archivo de configuración')
  .action(async (options) => {
    try {
      const compiler = new FlexCSSCompiler(options.config);
      await compiler.watch();
    } catch (error) {
      console.error(colors.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

// Muestra ayuda si no hay comandos
if (process.argv.length === 2) {
  program.help();
}

program.parse();