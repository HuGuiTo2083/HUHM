// scripts/build-browser.js
const fs = require('fs');
const path = require('path');
const pc = require('picocolors');

console.log(pc.cyan('\n🔨 Construyendo versión para navegador...\n'));

const rootDir = path.join(__dirname, '..');
const srcPath = path.join(rootDir, 'src', 'browser.js');
const distPath = path.join(rootDir, 'dist');
const outputPath = path.join(distPath, 'HUHM.js');

// Verificar que existe el archivo fuente
if (!fs.existsSync(srcPath)) {
  console.error(pc.red('❌ Error: No se encuentra src/browser.js'));
  console.log(pc.yellow('💡 Crea el archivo src/browser.js primero'));
  process.exit(1);
}

// Crear directorio dist si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
  console.log(pc.green('✅ Directorio dist/ creado'));
}

// Leer el contenido
const content = fs.readFileSync(srcPath, 'utf8');

// Leer package.json para obtener versión
const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')
);

// Banner con info del paquete
const banner = `/*!
 * HUHM (FlexCSS) v${packageJson.version}
 * Framework CSS utility-first con compilación JIT en navegador
 * 
 * Copyright (c) 2024 ${packageJson.author}
 * Released under the ${packageJson.license} License
 * 
 * Repository: ${packageJson.repository.url}
 * Build Date: ${new Date().toISOString()}
 */
`;

// Escribir el archivo
const finalContent = banner + '\n' + content;
fs.writeFileSync(outputPath, finalContent, 'utf8');

// Calcular tamaño
const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);

console.log(pc.green('✅ Build completado exitosamente\n'));
console.log(pc.dim('   Archivo: ') + pc.white('dist/flexcss.js'));
console.log(pc.dim('   Tamaño:  ') + pc.yellow(`${sizeKB} KB`));
console.log(pc.dim('   Versión: ') + pc.cyan(`v${packageJson.version}`));
console.log('');
console.log(pc.blue('💡 Siguiente paso: ') + pc.white('npm run minify'));
console.log('');