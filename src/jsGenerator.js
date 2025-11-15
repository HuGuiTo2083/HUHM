class JSGenerator {
  constructor(config) {
    this.config = config;
  }

  /**
   * Genera JavaScript para manejar referencias a elementos
   */
  generate(elementReferences, classCopyReferences) {
    if ((!elementReferences || elementReferences.length === 0) && 
        (!classCopyReferences || classCopyReferences.length === 0)) {
      return ''; // No hay referencias, no se genera JS
    }

    let js = this.generateHeader();
    js += this.generateMainFunction(elementReferences, classCopyReferences);
    
    if (this.config.compiler.minify) {
      return this.minify(js);
    }

    return js;
  }

  /**
   * Genera un comentario de cabecera
   */
  generateHeader() {
    if (!this.config.compiler.comments) return '';
    
    return `/**
 * HUHM Framework - Runtime CSS Variables
 * https://github.com/HuGuiTo2083/HUHM
 * Generated: ${new Date().toISOString()}
 * 
 * Este script actualiza dinámicamente las variables CSS
 * basadas en las dimensiones de elementos referenciados.
 */

`;
  }

  /**
   * Genera la función principal que actualiza las variables CSS
   */
  generateMainFunction(elementReferences, classCopyReferences) {
    let updateFunctionBody = '';
    let copyClassesBody = '';
    
    if (elementReferences && elementReferences.length > 0) {
      updateFunctionBody = this.generateUpdateLogic(elementReferences);
    }
    
    if (classCopyReferences && classCopyReferences.length > 0) {
      copyClassesBody = this.generateClassCopyLogic(classCopyReferences);
    }
    
    return `(function() {
  'use strict';

  /**
   * Actualiza las variables CSS basadas en elementos referenciados
   */
  function updateHUHMVariables() {
${updateFunctionBody}
  }

  /**
   * Copia clases de elementos referenciados a elementos que usan #elementId.classes
   */
  function copyReferencedClasses() {
${copyClassesBody}
  }

  // Ejecuta al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateHUHMVariables();
      copyReferencedClasses();
    });
  } else {
    updateHUHMVariables();
    copyReferencedClasses();
  }

  // Actualiza en resize con throttle para mejor rendimiento
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHUHMVariables, 100);
  });

  // Expone funciones globalmente
  window.HUHM = window.HUHM || {};
  window.HUHM.updateVariables = updateHUHMVariables;
  window.HUHM.copyClasses = copyReferencedClasses;
})();
`;
  }

  /**
   * Genera la lógica de actualización de variables
   */
  generateUpdateLogic(elementReferences) {
    let logic = '';
    
    // Agrupa referencias por elementId para optimización
    const groupedRefs = this.groupReferencesByElement(elementReferences);
    
    Object.entries(groupedRefs).forEach(([elementId, properties]) => {
      logic += `    // Referencias para elemento: #${elementId}\n`;
      logic += `    const el_${this.sanitizeId(elementId)} = document.getElementById('${elementId}');\n`;
      logic += `    if (el_${this.sanitizeId(elementId)}) {\n`;
      
      properties.forEach(property => {
        const value = this.getPropertyValue(elementId, property);
        logic += `      document.documentElement.style.setProperty('--${elementId}-${property}', ${value});\n`;
      });
      
      logic += `    } else {\n`;
      logic += `      console.warn('[HUHM] Elemento no encontrado: #${elementId}');\n`;
      logic += `    }\n\n`;
    });
    
    return logic;
  }

  /**
   * Genera la lógica para copiar clases
   */
  generateClassCopyLogic(classCopyReferences) {
    let logic = '';
    
    classCopyReferences.forEach(elementId => {
      logic += `    // Copiar clases de: #${elementId}\n`;
      logic += `    const source_${this.sanitizeId(elementId)} = document.getElementById('${elementId}');\n`;
      logic += `    if (source_${this.sanitizeId(elementId)}) {\n`;
      logic += `      const sourceClasses = Array.from(source_${this.sanitizeId(elementId)}.classList);\n`;
      logic += `      // Buscar elementos que referencian #${elementId}.classes\n`;
      logic += `      document.querySelectorAll('[class*="#${elementId}.classes"]').forEach(function(targetEl) {\n`;
      logic += `        const currentClasses = targetEl.className;\n`;
      logic += `        // Reemplazar #${elementId}.classes con las clases reales\n`;
      logic += `        const regex = /#${elementId}\\.classes/g;\n`;
      logic += `        if (regex.test(currentClasses)) {\n`;
      logic += `          // Remover la referencia y agregar clases reales\n`;
      logic += `          let newClasses = currentClasses.replace(/#${elementId}\\.classes/g, '').trim();\n`;
      logic += `          sourceClasses.forEach(function(cls) {\n`;
      logic += `            if (!targetEl.classList.contains(cls)) {\n`;
      logic += `              targetEl.classList.add(cls);\n`;
      logic += `            }\n`;
      logic += `          });\n`;
      logic += `        }\n`;
      logic += `      });\n`;
      logic += `    } else {\n`;
      logic += `      console.warn('[HUHM] Elemento fuente no encontrado para copiar clases: #${elementId}');\n`;
      logic += `    }\n\n`;
    });
    
    return logic;
  }

  /**
   * Agrupa referencias por elementId
   */
  groupReferencesByElement(elementReferences) {
    const grouped = {};
    
    elementReferences.forEach(ref => {
      if (!grouped[ref.elementId]) {
        grouped[ref.elementId] = [];
      }
      if (!grouped[ref.elementId].includes(ref.property)) {
        grouped[ref.elementId].push(ref.property);
      }
    });
    
    return grouped;
  }

  /**
   * Genera el código para obtener el valor de una propiedad
   */
  getPropertyValue(elementId, property) {
    const varName = `el_${this.sanitizeId(elementId)}`;
    
    // Mapeo de propiedades CSS comunes a propiedades de elemento
    const propertyMap = {
      // offsetWidth/Height incluye: width/height + padding + border (box visual real)
      'width': `${varName}.offsetWidth + 'px'`,
      'height': `${varName}.offsetHeight + 'px'`,
      
      // Para obtener solo el width sin padding ni border, usar estas alternativas:
      'innerWidth': `${varName}.clientWidth + 'px'`,  // width + padding (sin border)
      'innerHeight': `${varName}.clientHeight + 'px'`,
      'contentWidth': `parseFloat(getComputedStyle(${varName}).width) + 'px'`,  // solo width
      'contentHeight': `parseFloat(getComputedStyle(${varName}).height) + 'px'`,
      
      // Posiciones
      'top': `${varName}.offsetTop + 'px'`,
      'left': `${varName}.offsetLeft + 'px'`,
      'right': `(${varName}.offsetParent ? ${varName}.offsetParent.offsetWidth - ${varName}.offsetLeft - ${varName}.offsetWidth : 0) + 'px'`,
      'bottom': `(${varName}.offsetParent ? ${varName}.offsetParent.offsetHeight - ${varName}.offsetTop - ${varName}.offsetHeight : 0) + 'px'`
    };
    
    if (propertyMap[property]) {
      return propertyMap[property];
    }
    
    // Para propiedades no mapeadas, intenta obtener el estilo computado
    return `getComputedStyle(${varName}).${this.camelCase(property)}`;
  }

  /**
   * Sanitiza un ID para usarlo como nombre de variable
   */
  sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  /**
   * Convierte kebab-case a camelCase
   */
  camelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  /**
   * Minifica el JavaScript (básico)
   */
  minify(js) {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '') // Elimina comentarios /* */
      .replace(/\/\/.*/g, '')            // Elimina comentarios //
      .replace(/\s+/g, ' ')              // Reduce múltiples espacios a uno
      .replace(/\s*([{}();:,=])\s*/g, '$1') // Elimina espacios alrededor de operadores
      .trim();
  }
}

module.exports = JSGenerator;

