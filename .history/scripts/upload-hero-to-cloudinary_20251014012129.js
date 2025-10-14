const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

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

// Función para subir imágenes del hero
async function uploadHeroImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'hero');
  
  if (!fs.existsSync(assetsPath)) {
    console.log(`❌ La carpeta ${assetsPath} no existe`);
    return;
  }

  const files = fs.readdirSync(assetsPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
  );

  console.log(`📁 Subiendo ${imageFiles.length} imágenes del hero...`);

  const uploadPromises = imageFiles.map(async (file) => {
    const filePath = path.join(assetsPath, file);
    const publicId = path.parse(file).name; // Nombre sin extensión
    
    return await uploadImage(filePath, 'hero', publicId);
  });

  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(url => url !== null);
  
  console.log(`\n🎉 Subidas completadas: ${successfulUploads.length}/${imageFiles.length}`);
  
  // Generar el array para copiar
  console.log('\n📋 Array para copiar en Hero.tsx:');
  console.log('const heroImages = [');
  successfulUploads.forEach((url, index) => {
    console.log(`  "${url}",`);
  });
  console.log('];');
  
  return successfulUploads;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de imágenes del hero a Cloudinary...\n');
  
  try {
    await uploadHeroImages();
    console.log('\n✅ Imágenes del hero subidas a Cloudinary!');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadHeroImages };
