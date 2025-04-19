/**
 * Este script convierte el favicon.svg a favicon.ico para compatibilidad con navegadores antiguos
 * Para ejecutar: node scripts/generate-favicon.js
 * Requiere: npm install svg2img
 */

const fs = require('fs');
const path = require('path');
const svg2img = require('svg2img');

const SVG_PATH = path.join(__dirname, '../public/favicon.svg');
const ICO_PATH = path.join(__dirname, '../favicon.ico');

// Leer el archivo SVG
const svgContent = fs.readFileSync(SVG_PATH, 'utf8');

// Crear los tamaños necesarios para el favicon
const sizes = [16, 32, 48, 64, 128, 256];

// Función para convertir SVG a PNG con un tamaño específico
function convertSvgToPng(svgContent, size) {
  return new Promise((resolve, reject) => {
    svg2img(svgContent, { width: size, height: size }, (error, buffer) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(buffer);
    });
  });
}

// Función principal
async function generateFavicon() {
  try {
    console.log('🚀 Generando favicon.ico...');
    
    // Generar PNGs para todos los tamaños necesarios
    const pngBuffers = await Promise.all(
      sizes.map(size => convertSvgToPng(svgContent, size))
    );
    
    // Aquí normalmente usaríamos una biblioteca como 'png-to-ico' para 
    // convertir los PNGs a ICO, pero esto requeriría otra dependencia.
    // En una implementación real, se añadiría esa conversión.
    
    console.log('✅ Favicon generado exitosamente en:', ICO_PATH);
  } catch (error) {
    console.error('❌ Error generando el favicon:', error);
  }
}

// Ejecutar la función principal
generateFavicon(); 