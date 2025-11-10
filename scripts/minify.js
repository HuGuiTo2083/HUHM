// scripts/minify.js
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const pc = require('picocolors');

async function minifyFile() {
  console.log(pc.cyan('\n⚡ Minificando HUHM.js...\n'));

  const rootDir = path.join(__dirname, '..');
  const inputPath = path.join(rootDir, 'dist', 'HUHM.js');
  const outputPath = path.join(rootDir, 'dist', 'HUHM.min.js');

  // Verificar que existe el archivo de entrada
  if (!fs.existsSync(inputPath)) {
    console.error(pc.red('❌ Error: No se encuentra dist/HUHM.js'));
    console.log(pc.yellow('💡 Ejecuta primero: npm run build:browser'));
    process.exit(1);
  }

  try {
    // Leer el archivo
    const code = fs.readFileSync(inputPath, 'utf8');
    const originalSize = (Buffer.byteLength(code, 'utf8') / 1024).toFixed(2);

    // Opciones de minificación
    const options = {
      compress: {
        dead_code: true,
        drop_console: false, // Mantener console.log para debug
        drop_debugger: true,
        pure_funcs: ['console.debug'], // Solo eliminar console.debug
        passes: 2
      },
      mangle: {
        toplevel: false,
        reserved: ['FlexCSS'] // No minificar el nombre público
      },
      format: {
        comments: /^!/,  // Mantener comentarios con !
        preamble: '/* HUHM FlexCSS - MIT License */',
      }
    };

    console.log(pc.dim('   Comprimiendo código...'));
    
    // Minificar
    const result = await minify(code, options);

    if (result.error) {
      throw result.error;
    }

    // Escribir archivo minificado
    fs.writeFileSync(outputPath, result.code, 'utf8');

    // Calcular tamaños
    const minifiedSize = (Buffer.byteLength(result.code, 'utf8') / 1024).toFixed(2);
    const reduction = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1);

    // Calcular tamaño gzipped (aproximado)
    const zlib = require('zlib');
    const gzipped = zlib.gzipSync(result.code);
    const gzippedSize = (gzipped.length / 1024).toFixed(2);

    console.log(pc.green('\n✅ Minificación completada\n'));
    console.log(pc.dim('   Archivo original:  ') + pc.yellow(`${originalSize} KB`));
    console.log(pc.dim('   Archivo minificado:') + pc.green(`${minifiedSize} KB`) + pc.dim(` (-${reduction}%)`));
    console.log(pc.dim('   Gzipped:           ') + pc.cyan(`${gzippedSize} KB`));
    console.log('');
    console.log(pc.dim('   Salida: ') + pc.white('dist/HUHM.min.js'));
    console.log('');

  } catch (error) {
    console.error(pc.red('\n❌ Error al minificar:\n'));
    console.error(error.message);
    process.exit(1);
  }
}

minifyFile();