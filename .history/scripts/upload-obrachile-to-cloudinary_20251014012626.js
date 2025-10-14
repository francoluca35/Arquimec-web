const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de obra chile
const obraChileImages = [
  { localPath: 'Proceso08.jpg', publicId: 'proceso08', titulo: 'Proceso 08' },
  { localPath: 'Fontana.jpg', publicId: 'fontana', titulo: 'Fontana' }
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

// Función para subir todas las imágenes de obra chile
async function uploadObraChileImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'obrachile');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${obraChileImages.length} imágenes de obra chile...\n`);

  for (const image of obraChileImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'obra-chile', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de obra chile a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadObraChileImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de obra chile subidas exitosamente!`);
    
    console.log('\n📋 Código para Proyectos.tsx (ID 3):');
    console.log('{');
    console.log('  id: 3,');
    console.log('  titulo: "OBRA Chile y Catamarca-Avellaneda",');
    console.log(`  imagen: "${uploadedImages[0].cloudinaryUrl}"`);
    console.log('},');
    
    console.log('\n📋 Código para proyectosData.ts (ID 3):');
    console.log('{');
    console.log('  id: 3,');
    console.log('  titulo: "OBRA Chile y Catamarca-Avellaneda",');
    console.log('  categoria: "PROYECTO COMERCIAL",');
    console.log('  ubicacion: "Chile y Catamarca-Avellaneda",');
    console.log('  año: "2024",');
    console.log(`  imagenHero: "${uploadedImages[0].cloudinaryUrl}",`);
    console.log('  descripcion: "Descripción del proyecto...",');
    console.log('  conceptoArquitectonico: "Concepto arquitectónico...",');
    console.log('  galeriaVistas: [');
    console.log('    {');
    console.log('      titulo: "Vista General",');
    console.log('      imagenes: [');
    uploadedImages.forEach((img, index) => {
      const comma = index < uploadedImages.length - 1 ? ',' : '';
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

module.exports = { uploadImage, uploadObraChileImages };
