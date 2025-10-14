const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de procesos de trabajo
const protrabajosImages = [
  { localPath: '1.jpeg', publicId: '1', titulo: 'NOS CONOCEMOS' },
  { localPath: '2.jpeg', publicId: '2', titulo: 'ASESORAMIENTO Y DESARROLLO' },
  { localPath: '3.jpeg', publicId: '3', titulo: 'CONTRATO' },
  { localPath: '4.jpeg', publicId: '4', titulo: 'PLANIFICACIÓN Y DISEÑO' },
  { localPath: '5.jpeg', publicId: '5', titulo: 'CONSTRUCCIÓN' },
  { localPath: '6.jpeg', publicId: '6', titulo: 'TERMINACIONES Y ESTILO' }
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

// Función para subir todas las imágenes de procesos de trabajo
async function uploadProtrabajosImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'ptrabajis');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${protrabajosImages.length} imágenes de procesos de trabajo...\n`);

  for (const image of protrabajosImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
      continue;
    }

    try {
      const url = await uploadImage(imagePath, 'protrabajos', image.publicId);
      
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
  console.log('🚀 Iniciando subida de imágenes de procesos de trabajo a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadProtrabajosImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de procesos de trabajo subidas exitosamente!`);
    
    console.log('\n📋 Código actualizado para ProcesosTrabajo.tsx:');
    console.log('const procesos = [');
    uploadedImages.forEach((img, index) => {
      const numero = String(index + 1).padStart(2, '0');
      const titulo = img.titulo;
      const comma = index < uploadedImages.length - 1 ? ',' : '';
      console.log(`  {`);
      console.log(`    numero: "${numero}",`);
      console.log(`    titulo: "${titulo}",`);
      console.log(`    backgroundImage: "${img.cloudinaryUrl}"`);
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

module.exports = { uploadImage, uploadProtrabajosImages };
