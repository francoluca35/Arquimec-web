const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de constru
const construImages = [
  { localPath: 'proces05.jpg', publicId: 'proces05', titulo: 'Proceso 05' },
  { localPath: 'proces01.jpg', publicId: 'proces01', titulo: 'Proceso 01' },
  { localPath: 'proces02.jpg', publicId: 'proces02', titulo: 'Proceso 02' },
  { localPath: 'Proceso03.jpg', publicId: 'Proceso03', titulo: 'Proceso 03' },
  { localPath: 'C1.jpg', publicId: 'C1', titulo: 'Construcción 1' }
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

// Función para subir todas las imágenes de constru
async function uploadConstruImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'Constru');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${construImages.length} imágenes de constru...\n`);

  for (const image of construImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'constru', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de constru a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadConstruImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de constru subidas exitosamente!`);
    
    console.log('\n📋 Código actualizado para constructora.tsx:');
    console.log('{');
    uploadedImages.forEach((img, index) => {
      const comma = index < uploadedImages.length - 1 ? ',' : '';
      console.log(`  {`);
      console.log(`    src: "${img.cloudinaryUrl}",`);
      console.log(`    alt: "${img.titulo.toLowerCase().replace(/\s+/g, '-')}",`);
      console.log(`    titulo: "${img.titulo}"`);
      console.log(`  }${comma}`);
    });
    console.log('}');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadConstruImages };
