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

// Función para subir todas las imágenes de fundadores
async function uploadFundadoresImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets');
  
  // Mapear las imágenes del componente Fundador
  const fundadoresImages = [
    { file: 'equipo2.JPG', publicId: 'equipo2' },
    { file: 'equipo.JPG', publicId: 'equipo' },
    { file: 'fundador2.jpg', publicId: 'fundador2' },
    { file: 'fundadores.webp', publicId: 'fundadores' },
    { file: 'Fundadorlogo.png', publicId: 'Fundadorlogo' }
  ];

  console.log(`📁 Subiendo ${fundadoresImages.length} imágenes de fundadores...`);

  const uploadPromises = fundadoresImages.map(async (imageInfo) => {
    const filePath = path.join(assetsPath, imageInfo.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ La imagen ${imageInfo.file} no existe`);
      return null;
    }

    return await uploadImage(filePath, 'fundadores', imageInfo.publicId);
  });

  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(url => url !== null);
  
  console.log(`\n🎉 Subidas completadas: ${successfulUploads.length}/${fundadoresImages.length}`);
  
  // Generar el array para copiar en Fundador.tsx
  console.log('\n📋 Array para copiar en Fundador.tsx:');
  console.log('const images = [');
  
  fundadoresImages.forEach((imageInfo, index) => {
    const result = results[index];
    if (result) {
      const altText = imageInfo.publicId === 'Fundadorlogo' ? 'Logo Arquimec' : 
                     imageInfo.publicId === 'equipo2' ? 'Equipo Arquimec 2' :
                     imageInfo.publicId === 'equipo' ? 'Equipo Arquimec' :
                     imageInfo.publicId === 'fundador2' ? 'Fundador 2' : 'Fundadores';
      
      console.log(`  { src: "${result}", alt: "${altText}" },`);
    }
  });
  
  console.log('];');
  
  return successfulUploads;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de imágenes de fundadores a Cloudinary...\n');
  
  try {
    await uploadFundadoresImages();
    console.log('\n✅ Imágenes de fundadores subidas a Cloudinary!');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadFundadoresImages };
