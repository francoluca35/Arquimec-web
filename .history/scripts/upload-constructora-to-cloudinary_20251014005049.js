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

// Función para subir imagen de constructora
async function uploadConstructoraImage() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets');
  const imagePath = path.join(assetsPath, 'nestudio.webp');
  
  if (!fs.existsSync(imagePath)) {
    console.log(`❌ La imagen ${imagePath} no existe`);
    return;
  }

  console.log(`📁 Subiendo imagen de constructora...`);

  try {
    const url = await uploadImage(imagePath, 'constructora', 'nestudio');
    
    if (url) {
      console.log(`\n🎉 Imagen de constructora subida exitosamente!`);
      console.log('\n📋 URL para copiar en Constructora.tsx:');
      console.log(`"${url}"`);
    }
    
    return url;
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de imagen de constructora a Cloudinary...\n');
  
  try {
    await uploadConstructoraImage();
    console.log('\n✅ Imagen de constructora subida a Cloudinary!');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadConstructoraImage };
