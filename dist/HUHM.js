/**
 * HUHM Framework - Runtime CSS Variables
 * https://github.com/HuGuiTo2083/HUHM
 * Generated: 2025-11-15T16:18:53.797Z
 * 
 * Este script actualiza dinámicamente las variables CSS
 * basadas en las dimensiones de elementos referenciados.
 */

(function() {
  'use strict';

  /**
   * Actualiza las variables CSS basadas en elementos referenciados
   */
  function updateHUHMVariables() {
    // Referencias para elemento: #boxReference
    const el_boxReference = document.getElementById('boxReference');
    if (el_boxReference) {
      document.documentElement.style.setProperty('--boxReference-width', el_boxReference.offsetWidth + 'px');
    } else {
      console.warn('[HUHM] Elemento no encontrado: #boxReference');
    }


  }

  /**
   * Copia clases de elementos referenciados a elementos que usan #elementId.classes
   */
  function copyReferencedClasses() {
    // Copiar clases de: #btnOriginal
    const source_btnOriginal = document.getElementById('btnOriginal');
    if (source_btnOriginal) {
      const sourceClasses = Array.from(source_btnOriginal.classList);
      // Buscar elementos que referencian #btnOriginal.classes
      document.querySelectorAll('[class*="#btnOriginal.classes"]').forEach(function(targetEl) {
        const currentClasses = targetEl.className;
        // Reemplazar #btnOriginal.classes con las clases reales
        const regex = /#btnOriginal\.classes/g;
        if (regex.test(currentClasses)) {
          // Remover la referencia y agregar clases reales
          let newClasses = currentClasses.replace(/#btnOriginal\.classes/g, '').trim();
          sourceClasses.forEach(function(cls) {
            if (!targetEl.classList.contains(cls)) {
              targetEl.classList.add(cls);
            }
          });
        }
      });
    } else {
      console.warn('[HUHM] Elemento fuente no encontrado para copiar clases: #btnOriginal');
    }


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
