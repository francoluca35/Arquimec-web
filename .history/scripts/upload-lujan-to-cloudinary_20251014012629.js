const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de lujan
const lujanImages = [
  { localPath: 'principal.jpg', publicId: 'principal', titulo: 'Vista Principal' },
  { localPath: 'corte3.jpg', publicId: 'corte3', titulo: 'Corte Arquitectónico' },
  { localPath: 'int12 .jpg', publicId: 'int12', titulo: 'Interior 12' },
  { localPath: 'I11.jpg', publicId: 'I11', titulo: 'Interior 11' },
  { localPath: 'I10.jpg', publicId: 'I10', titulo: 'Interior 10' },
  { localPath: 'I9.jpg', publicId: 'I9', titulo: 'Interior 9' },
  { localPath: 'I8.jpg', publicId: 'I8', titulo: 'Interior 8' },
  { localPath: 'I1.jpg', publicId: 'I1', titulo: 'Interior 1' },
  { localPath: 'i4.jpg', publicId: 'i4', titulo: 'Interior 4' },
  { localPath: 'FON4.jpg', publicId: 'FON4', titulo: 'Fondo 4' }
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

// Función para subir todas las imágenes de lujan
async function uploadLujanImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'lujan');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${lujanImages.length} imágenes de lujan...\n`);

  for (const image of lujanImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'lujan', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de lujan a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadLujanImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de lujan subidas exitosamente!`);
    
    console.log('\n📋 Código para Proyectos.tsx (ID 2):');
    console.log('{');
    console.log('  id: 2,');
    console.log('  titulo: "Oficinas Corporativas",');
    console.log(`  imagen: "${uploadedImages[0].cloudinaryUrl}"`);
    console.log('},');
    
    console.log('\n📋 Código para proyectosData.ts (ID 2):');
    console.log('{');
    console.log('  id: 2,');
    console.log('  titulo: "Oficinas Corporativas",');
    console.log('  categoria: "PROYECTO COMERCIAL",');
    console.log('  ubicacion: "Luján, Buenos Aires",');
    console.log('  año: "2023",');
    console.log(`  imagenHero: "${uploadedImages[0].cloudinaryUrl}",`);
    console.log('  descripcion: "Complejo de oficinas corporativas...",');
    console.log('  conceptoArquitectonico: "El diseño prioriza...",');
    console.log('  galeriaVistas: [');
    console.log('    {');
    console.log('      titulo: "Vista Principal",');
    console.log('      imagenes: [');
    console.log(`        "${uploadedImages[0].cloudinaryUrl}"`);
    console.log('      ]');
    console.log('    },');
    console.log('    {');
    console.log('      titulo: "Interiores",');
    console.log('      imagenes: [');
    uploadedImages.slice(1, 6).forEach((img, index) => {
      const comma = index < uploadedImages.slice(1, 6).length - 1 ? ',' : '';
      console.log(`        "${img.cloudinaryUrl}"${comma}`);
    });
    console.log('      ]');
    console.log('    },');
    console.log('    {');
    console.log('      titulo: "Detalles Arquitectónicos",');
    console.log('      imagenes: [');
    uploadedImages.slice(6).forEach((img, index) => {
      const comma = index < uploadedImages.slice(6).length - 1 ? ',' : '';
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

module.exports = { uploadImage, uploadLujanImages };
