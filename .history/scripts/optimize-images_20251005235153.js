const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de optimización
const config = {
  qualities: {
    webp: 80,
    jpeg: 85,
    png: 90
  },
  sizes: {
    mobile: { width: 768, height: 1024 },
    tablet: { width: 1024, height: 768 },
    desktop: { width: 1920, height: 1080 },
    thumbnail: { width: 300, height: 200 }
  }
};

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizando: ${filename}`);
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generar diferentes tamaños y formatos
    const baseName = path.parse(filename).name;
    
    // WebP con diferentes tamaños
    for (const [sizeName, dimensions] of Object.entries(config.sizes)) {
      const outputPath = path.join(outputDir, `${baseName}-${sizeName}.webp`);
      
      await image
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: config.qualities.webp })
        .toFile(outputPath);
      
      console.log(`  ✓ Generado: ${outputPath}`);
    }

    // JPEG de alta calidad para fallback
    const jpegPath = path.join(outputDir, `${baseName}-desktop.jpg`);
    await image
      .resize(config.sizes.desktop.width, config.sizes.desktop.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: config.qualities.jpeg })
      .toFile(jpegPath);
    
    console.log(`  ✓ Generado: ${jpegPath}`);

    // Generar blur placeholder
    const blurPath = path.join(outputDir, `${baseName}-blur.webp`);
    await image
      .resize(20, 20, { fit: 'cover' })
      .webp({ quality: 20 })
      .toFile(blurPath);
    
    console.log(`  ✓ Generado: ${blurPath}`);

  } catch (error) {
    console.error(`Error optimizando ${filename}:`, error);
  }
}

// Función para procesar todas las imágenes
async function optimizeAllImages() {
  const inputDir = path.join(__dirname, '../public/Assets');
  const outputDir = path.join(__dirname, '../public/Assets/optimized');
  
  console.log('🚀 Iniciando optimización de imágenes...');
  console.log(`📁 Directorio de entrada: ${inputDir}`);
  console.log(`📁 Directorio de salida: ${outputDir}`);

  if (!fs.existsSync(inputDir)) {
    console.error('❌ Directorio de entrada no encontrado');
    return;
  }

  // Crear directorio de salida
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Procesar todas las imágenes
  const processDirectory = async (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        await processDirectory(itemPath);
      } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
        const relativePath = path.relative(inputDir, itemPath);
        const outputSubDir = path.join(outputDir, path.dirname(relativePath));
        
        await optimizeImage(itemPath, outputSubDir, item);
      }
    }
  };

  await processDirectory(inputDir);
  
  console.log('✅ Optimización completada!');
  
  // Generar reporte de tamaños
  generateSizeReport(outputDir);
}

// Función para generar reporte de tamaños
function generateSizeReport(outputDir) {
  const report = {
    totalFiles: 0,
    totalSize: 0,
    byFormat: {},
    bySize: {}
  };

  const processDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        const size = stat.size;
        
        report.totalFiles++;
        report.totalSize += size;
        
        // Por formato
        if (!report.byFormat[ext]) {
          report.byFormat[ext] = { count: 0, size: 0 };
        }
        report.byFormat[ext].count++;
        report.byFormat[ext].size += size;
        
        // Por tamaño
        const sizeName = item.includes('-mobile') ? 'mobile' :
                         item.includes('-tablet') ? 'tablet' :
                         item.includes('-desktop') ? 'desktop' :
                         item.includes('-thumbnail') ? 'thumbnail' : 'other';
        
        if (!report.bySize[sizeName]) {
          report.bySize[sizeName] = { count: 0, size: 0 };
        }
        report.bySize[sizeName].count++;
        report.bySize[sizeName].size += size;
      }
    }
  };

  processDirectory(outputDir);

  console.log('\n📊 REPORTE DE OPTIMIZACIÓN:');
  console.log(`Total de archivos: ${report.totalFiles}`);
  console.log(`Tamaño total: ${(report.totalSize / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\n📁 Por formato:');
  for (const [format, data] of Object.entries(report.byFormat)) {
    console.log(`  ${format}: ${data.count} archivos, ${(data.size / 1024 / 1024).toFixed(2)} MB`);
  }
  
  console.log('\n📏 Por tamaño:');
  for (const [size, data] of Object.entries(report.bySize)) {
    console.log(`  ${size}: ${data.count} archivos, ${(data.size / 1024 / 1024).toFixed(2)} MB`);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeImage, optimizeAllImages };
