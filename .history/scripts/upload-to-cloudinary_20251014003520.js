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

// Función para subir todas las imágenes de una carpeta
async function uploadFolder(localFolder, cloudFolder) {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', localFolder);
  
  if (!fs.existsSync(assetsPath)) {
    console.log(`❌ La carpeta ${assetsPath} no existe`);
    return;
  }

  const files = fs.readdirSync(assetsPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
  );

  console.log(`📁 Subiendo ${imageFiles.length} imágenes de ${localFolder}...`);

  const uploadPromises = imageFiles.map(async (file) => {
    const filePath = path.join(assetsPath, file);
    const publicId = path.parse(file).name; // Nombre sin extensión
    
    return await uploadImage(filePath, cloudFolder, publicId);
  });

  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(url => url !== null);
  
  console.log(`\n🎉 Subidas completadas: ${successfulUploads.length}/${imageFiles.length}`);
  return successfulUploads;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida a Cloudinary...\n');
  
  try {
    // Subir carpetas específicas
    await uploadFolder('destacado', 'destacado');
    await uploadFolder('CasaDirube', 'casa-dirube');
    
    console.log('\n✅ Todas las imágenes han sido subidas a Cloudinary!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Actualiza tus URLs en proyectosData.ts');
    console.log('2. Usa el formato: https://res.cloudinary.com/dmfy5ohhf/image/upload/v1234567/folder/image.webp');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadFolder };
