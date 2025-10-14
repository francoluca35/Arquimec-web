const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de lanus
const lanusImages = [
  { localPath: 'pricipal.jpg', publicId: 'principal', titulo: 'Vista Principal' },
  { localPath: 'proces05.jpg', publicId: 'proceso05', titulo: 'Proceso 05' },
  { localPath: 'proces06.jpg', publicId: 'proceso06', titulo: 'Proceso 06' },
  { localPath: 'proces08.jpg', publicId: 'proceso08', titulo: 'Proceso 08' }
];

// Función para subir una imagen
async function uploadImage(filePath, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: publicId,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
      flags: 'progressive'
    });
    
    console.log(`✅ Subida: ${publicId}`);
    console.log(`   URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error subiendo ${publicId}:`, error.message);
    return null;
  }
}

// Función para subir todas las imágenes de lanus
async function uploadLanusImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'lanus');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${lanusImages.length} imágenes de lanus...\n`);

  for (const image of lanusImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'lanus', image.publicId);
      
      if (url) {
        uploadedUrls.push({
          ...image,
          cloudinaryUrl: url
        });
      }
    } catch (error) {
      console.error(`❌ Error subiendo ${image.publicId}:`, error);
    }
  }

  return uploadedUrls;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de imágenes de lanus a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadLanusImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de lanus subidas exitosamente!`);
    
    console.log('\n📋 Código para Proyectos.tsx (ID 4):');
    console.log('{');
    console.log('  id: 4,');
    console.log('  titulo: "20 de septiembre 2485, LANUS",');
    console.log(`  imagen: "${uploadedImages[0].cloudinaryUrl}"`);
    console.log('},');
    
    console.log('\n📋 Código para proyectosData.ts (ID 4):');
    console.log('{');
    console.log('  id: 4,');
    console.log('  titulo: "20 de septiembre 2485, LANUS",');
    console.log('  categoria: "PROYECTO RESIDENCIAL",');
    console.log('  ubicacion: "Lanús, Buenos Aires",');
    console.log('  año: "2024",');
    console.log(`  imagenHero: "${uploadedImages[0].cloudinaryUrl}",`);
    console.log('  descripcion: "Proyecto residencial en Lanús...",');
    console.log('  conceptoArquitectonico: "Concepto arquitectónico...",');
    console.log('  galeriaVistas: [');
    console.log('    {');
    console.log('      titulo: "Vista Principal",');
    console.log('      imagenes: [');
    console.log(`        "${uploadedImages[0].cloudinaryUrl}"`);
    console.log('      ]');
    console.log('    },');
    console.log('    {');
    console.log('      titulo: "Procesos de Construcción",');
    console.log('      imagenes: [');
    uploadedImages.slice(1).forEach((img, index) => {
      const comma = index < uploadedImages.slice(1).length - 1 ? ',' : '';
      console.log(`        "${img.cloudinaryUrl}"${comma}`);
    });
    console.log('      ]');
    console.log('    }');
    console.log('  ],');
    console.log('  caracteristicas: [');
    console.log('    {');
    console.log('      titulo: "Superficie",');
    console.log('      valor: "XXX m²",');
    console.log('      descripcion: "Descripción",');
    console.log('      icono: "📏"');
    console.log('    }');
    console.log('  ],');
    console.log('  cronologia: {');
    console.log('    inicio: "Fecha inicio",');
    console.log('    duracion: "X meses",');
    console.log('    finalizacion: "Fecha fin",');
    console.log('    estado: "Estado"');
    console.log('  }');
    console.log('}');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadLanusImages };
