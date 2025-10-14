const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes del componente Fundador
const fundadorImages = [
  { localPath: 'equipo2.JPG', publicId: 'equipo2', alt: 'Equipo Arquimec 2' },
  { localPath: 'equipo.JPG', publicId: 'equipo', alt: 'Equipo Arquimec' },
  { localPath: 'fundador2.jpg', publicId: 'fundador2', alt: 'Fundador 2' },
  { localPath: 'fundadores.webp', publicId: 'fundadores', alt: 'Fundadores' },
  { localPath: 'Fundadorlogo.png', publicId: 'fundadorlogo', alt: 'Logo Arquimec' }
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

// Función para subir todas las imágenes de fundadores
async function uploadFundadorImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${fundadorImages.length} imágenes de fundadores...\n`);

  for (const image of fundadorImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'fundadores', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de fundadores a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadFundadorImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de fundadores subidas exitosamente!`);
    
    console.log('\n📋 Código actualizado para Fundador.tsx:');
    console.log('const images = [');
    uploadedImages.forEach((img, index) => {
      const comma = index < uploadedImages.length - 1 ? ',' : '';
      console.log(`  { src: "${img.cloudinaryUrl}", alt: "${img.alt}" }${comma}`);
    });
    console.log('];');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadFundadorImages };
