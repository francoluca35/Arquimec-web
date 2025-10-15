const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes para el carrusel de constructora
const carouselImages = [
  { localPath: 'construccion.jpg', publicId: 'construccion-carousel-1', titulo: 'Construcción en Progreso 1' },
  { localPath: 'construccion2.jpg', publicId: 'construccion-carousel-2', titulo: 'Construcción en Progreso 2' },
  { localPath: 'construccion3.jpg', publicId: 'construccion-carousel-3', titulo: 'Construcción en Progreso 3' }
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

// Función para subir todas las imágenes del carrusel
async function uploadCarouselImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${carouselImages.length} imágenes para carrusel de constructora...\n`);

  for (const image of carouselImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'constructora', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de carrusel a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadCarouselImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de carrusel subidas exitosamente!`);
    
    console.log('\n📋 Código actualizado para Constructora.tsx:');
    console.log('const carouselImages = [');
    uploadedImages.forEach((img, index) => {
      const comma = index < uploadedImages.length - 1 ? ',' : '';
      console.log(`  {`);
      console.log(`    src: "${img.cloudinaryUrl}",`);
      console.log(`    alt: "${img.titulo.toLowerCase().replace(/\s+/g, '-')}",`);
      console.log(`    titulo: "${img.titulo}"`);
      console.log(`  }${comma}`);
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

module.exports = { uploadImage, uploadCarouselImages };
