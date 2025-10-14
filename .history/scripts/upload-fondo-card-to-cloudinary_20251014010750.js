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

// Función para subir fondo-card.webp
async function uploadFondoCard() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets');
  const imagePath = path.join(assetsPath, 'fondo-card.webp');
  
  if (!fs.existsSync(imagePath)) {
    console.log(`❌ La imagen fondo-card.webp no existe en ${imagePath}`);
    return;
  }

  console.log(`📁 Subiendo fondo-card.webp...`);

  try {
    const url = await uploadImage(imagePath, 'protrabajos', 'fondo-card');
    
    if (url) {
      console.log(`\n🎉 Fondo-card subido exitosamente!`);
      console.log('\n📋 URL para copiar en ProcesosTrabajo.tsx:');
      console.log(`"${url}"`);
    }
    
    return url;
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de fondo-card a Cloudinary...\n');
  
  try {
    await uploadFondoCard();
    console.log('\n✅ Fondo-card subido a Cloudinary!');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadFondoCard };
