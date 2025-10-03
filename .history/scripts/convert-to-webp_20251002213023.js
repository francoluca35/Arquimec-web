const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de optimización WebP EXTREMA para móvil
const webpOptions = {
  quality: 80, // Balance perfecto tamaño/calidad
  effort: 6, // Máximo esfuerzo de compresión
  lossless: false, // Lossy para máximo ahorro
  nearLossless: false,
  smartSubsample: true,
  reductionEffort: 6,
  // Optimizaciones específicas para móvil
  preset: 'photo',
  alphaQuality: 80,
};

// Imágenes a convertir
const imagesToConvert = [
  'public/Assets/logoarqmec.png',
  'public/Assets/Fundador-logo.png', 
  'public/Assets/fundador.jpeg',
  'public/Assets/icons/empresario.png',
  'public/Assets/icons/grua.png',
  'public/Assets/icons/presentacion.png'
];

async function convertToWebP() {
  console.log('🚀 CONVIRTIENDO IMÁGENES A WEBP - OPTIMIZACIÓN EXTREMA PARA MÓVIL');
  
  for (const imagePath of imagesToConvert) {
    try {
      if (fs.existsSync(imagePath)) {
        const outputPath = imagePath.replace(/\.(png|jpeg|jpg)$/i, '.webp');
        
        console.log(`📸 Convirtiendo: ${imagePath} → ${outputPath}`);
        
        await sharp(imagePath)
          .webp(webpOptions)
          .toFile(outputPath);
          
        // Obtener tamaños para comparación
        const originalSize = fs.statSync(imagePath).size;
        const webpSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(imagePath)}: ${(originalSize/1024).toFixed(1)}KB → ${(webpSize/1024).toFixed(1)}KB (${savings}% ahorro)`);
      } else {
        console.log(`⚠️  No encontrado: ${imagePath}`);
      }
    } catch (error) {
      console.error(`❌ Error convirtiendo ${imagePath}:`, error.message);
    }
  }
  
  console.log('🎯 CONVERSIÓN COMPLETADA - RENDIMIENTO MÓVIL OPTIMIZADO');
}

convertToWebP();
