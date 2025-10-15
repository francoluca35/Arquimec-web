const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de construcciones (basado en lo que veo en la imagen)
const construccionesImages = [
  { localPath: 'C1.jpg', publicId: 'C1_extra', titulo: 'Construcción Extra 1' },
  { localPath: 'C2.jpg', publicId: 'C2', titulo: 'Construcción 2' },
  { localPath: 'C3.jpg', publicId: 'C3', titulo: 'Construcción 3' },
  { localPath: 'C4.jpg', publicId: 'C4', titulo: 'Construcción 4' },
  { localPath: 'C5.jpg', publicId: 'C5', titulo: 'Construcción 5' },
  { localPath: 'C6.jpg', publicId: 'C6', titulo: 'Construcción 6' },
  { localPath: 'C7.jpg', publicId: 'C7', titulo: 'Construcción 7' },
  { localPath: 'C8.jpg', publicId: 'C8', titulo: 'Construcción 8' },
  { localPath: 'C9.jpg', publicId: 'C9', titulo: 'Construcción 9' },
  { localPath: 'C10.jpg', publicId: 'C10', titulo: 'Construcción 10' },
  { localPath: 'C11.jpg', publicId: 'C11', titulo: 'Construcción 11' },
  { localPath: 'C12.jpg', publicId: 'C12', titulo: 'Construcción 12' },
  { localPath: 'C13.jpg', publicId: 'C13', titulo: 'Construcción 13' },
  { localPath: 'C14.jpg', publicId: 'C14', titulo: 'Construcción 14' },
  { localPath: 'C15.jpg', publicId: 'C15', titulo: 'Construcción 15' },
  { localPath: 'C16.jpg', publicId: 'C16', titulo: 'Construcción 16' },
  { localPath: 'C17.jpg', publicId: 'C17', titulo: 'Construcción 17' },
  { localPath: 'C18.jpg', publicId: 'C18', titulo: 'Construcción 18' },
  { localPath: 'C19.jpg', publicId: 'C19', titulo: 'Construcción 19' },
  { localPath: 'C20.jpg', publicId: 'C20', titulo: 'Construcción 20' },
  { localPath: 'C21.jpg', publicId: 'C21', titulo: 'Construcción 21' },
  { localPath: 'C22.jpg', publicId: 'C22', titulo: 'Construcción 22' },
  { localPath: 'C23.jpg', publicId: 'C23', titulo: 'Construcción 23' },
  { localPath: 'C24.jpg', publicId: 'C24', titulo: 'Construcción 24' },
  { localPath: 'C25.jpg', publicId: 'C25', titulo: 'Construcción 25' },
  { localPath: 'C26.jpg', publicId: 'C26', titulo: 'Construcción 26' },
  { localPath: 'C27.jpg', publicId: 'C27', titulo: 'Construcción 27' },
  { localPath: 'C28.jpg', publicId: 'C28', titulo: 'Construcción 28' },
  { localPath: 'C29.jpg', publicId: 'C29', titulo: 'Construcción 29' },
  { localPath: 'C30.jpg', publicId: 'C30', titulo: 'Construcción 30' },
  { localPath: 'C31.jpg', publicId: 'C31', titulo: 'Construcción 31' },
  { localPath: 'C32.jpg', publicId: 'C32', titulo: 'Construcción 32' },
  { localPath: 'C33.jpg', publicId: 'C33', titulo: 'Construcción 33' },
  { localPath: 'C34.jpg', publicId: 'C34', titulo: 'Construcción 34' },
  { localPath: 'C35.jpg', publicId: 'C35', titulo: 'Construcción 35' },
  { localPath: 'C36.jpg', publicId: 'C36', titulo: 'Construcción 36' },
  { localPath: 'C37.jpg', publicId: 'C37', titulo: 'Construcción 37' },
  { localPath: 'C38.jpg', publicId: 'C38', titulo: 'Construcción 38' },
  { localPath: 'C39.jpg', publicId: 'C39', titulo: 'Construcción 39' },
  { localPath: 'C40.jpg', publicId: 'C40', titulo: 'Construcción 40' },
  { localPath: 'C41.jpg', publicId: 'C41', titulo: 'Construcción 41' },
  { localPath: 'C42.jpg', publicId: 'C42', titulo: 'Construcción 42' },
  { localPath: 'C43.jpg', publicId: 'C43', titulo: 'Construcción 43' },
  { localPath: 'C44.jpg', publicId: 'C44', titulo: 'Construcción 44' },
  { localPath: 'C45.jpg', publicId: 'C45', titulo: 'Construcción 45' },
  { localPath: 'C46.jpg', publicId: 'C46', titulo: 'Construcción 46' },
  { localPath: 'C47.jpg', publicId: 'C47', titulo: 'Construcción 47' },
  { localPath: 'C48.jpg', publicId: 'C48', titulo: 'Construcción 48' },
  { localPath: 'C49.jpg', publicId: 'C49', titulo: 'Construcción 49' },
  { localPath: 'C50.jpg', publicId: 'C50', titulo: 'Construcción 50' },
  { localPath: 'C51.jpg', publicId: 'C51', titulo: 'Construcción 51' },
  { localPath: 'C52.jpg', publicId: 'C52', titulo: 'Construcción 52' },
  { localPath: 'C53.jpg', publicId: 'C53', titulo: 'Construcción 53' },
  { localPath: 'C54.jpg', publicId: 'C54', titulo: 'Construcción 54' },
  { localPath: 'C55.jpg', publicId: 'C55', titulo: 'Construcción 55' },
  { localPath: 'C56.jpg', publicId: 'C56', titulo: 'Construcción 56' },
  { localPath: 'C57.jpg', publicId: 'C57', titulo: 'Construcción 57' },
  { localPath: 'C58.jpg', publicId: 'C58', titulo: 'Construcción 58' },
  { localPath: 'C59.jpg', publicId: 'C59', titulo: 'Construcción 59' },
  { localPath: 'C60.jpg', publicId: 'C60', titulo: 'Construcción 60' },
  { localPath: 'C61.jpg', publicId: 'C61', titulo: 'Construcción 61' },
  { localPath: 'C62.jpg', publicId: 'C62', titulo: 'Construcción 62' },
  { localPath: 'C63.jpg', publicId: 'C63', titulo: 'Construcción 63' },
  { localPath: 'C64.jpg', publicId: 'C64', titulo: 'Construcción 64' },
  { localPath: 'C65.jpg', publicId: 'C65', titulo: 'Construcción 65' },
  { localPath: 'C66.jpg', publicId: 'C66', titulo: 'Construcción 66' },
  { localPath: 'C67.jpg', publicId: 'C67', titulo: 'Construcción 67' },
  { localPath: 'C68.jpg', publicId: 'C68', titulo: 'Construcción 68' },
  { localPath: 'C69.jpg', publicId: 'C69', titulo: 'Construcción 69' },
  { localPath: 'C70.jpg', publicId: 'C70', titulo: 'Construcción 70' },
  { localPath: 'C71.jpg', publicId: 'C71', titulo: 'Construcción 71' },
  { localPath: 'C72.jpg', publicId: 'C72', titulo: 'Construcción 72' },
  { localPath: 'C73.jpg', publicId: 'C73', titulo: 'Construcción 73' },
  { localPath: 'C74.jpg', publicId: 'C74', titulo: 'Construcción 74' },
  { localPath: 'C75.jpg', publicId: 'C75', titulo: 'Construcción 75' },
  { localPath: 'C76.jpg', publicId: 'C76', titulo: 'Construcción 76' },
  { localPath: 'C77.jpg', publicId: 'C77', titulo: 'Construcción 77' },
  { localPath: 'C78.jpg', publicId: 'C78', titulo: 'Construcción 78' },
  { localPath: 'C79.jpg', publicId: 'C79', titulo: 'Construcción 79' },
  { localPath: 'C80.jpg', publicId: 'C80', titulo: 'Construcción 80' },
  { localPath: 'C81.jpg', publicId: 'C81', titulo: 'Construcción 81' },
  { localPath: 'C82.jpg', publicId: 'C82', titulo: 'Construcción 82' },
  { localPath: 'C83.jpg', publicId: 'C83', titulo: 'Construcción 83' },
  { localPath: 'C84.jpg', publicId: 'C84', titulo: 'Construcción 84' },
  { localPath: 'C85.jpg', publicId: 'C85', titulo: 'Construcción 85' },
  { localPath: 'C86.jpg', publicId: 'C86', titulo: 'Construcción 86' },
  { localPath: 'C87.jpg', publicId: 'C87', titulo: 'Construcción 87' },
  { localPath: 'C88.jpg', publicId: 'C88', titulo: 'Construcción 88' },
  { localPath: 'C89.jpg', publicId: 'C89', titulo: 'Construcción 89' },
  { localPath: 'C90.jpg', publicId: 'C90', titulo: 'Construcción 90' },
  { localPath: 'C91.jpg', publicId: 'C91', titulo: 'Construcción 91' },
  { localPath: 'C92.jpg', publicId: 'C92', titulo: 'Construcción 92' },
  { localPath: 'C93.jpg', publicId: 'C93', titulo: 'Construcción 93' },
  { localPath: 'C94.jpg', publicId: 'C94', titulo: 'Construcción 94' },
  { localPath: 'C95.jpg', publicId: 'C95', titulo: 'Construcción 95' },
  { localPath: 'C96.jpg', publicId: 'C96', titulo: 'Construcción 96' },
  { localPath: 'C97.jpg', publicId: 'C97', titulo: 'Construcción 97' },
  { localPath: 'C98.jpg', publicId: 'C98', titulo: 'Construcción 98' },
  { localPath: 'C99.jpg', publicId: 'C99', titulo: 'Construcción 99' },
  { localPath: 'C100.jpg', publicId: 'C100', titulo: 'Construcción 100' }
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

// Función para subir todas las imágenes de construcciones
async function uploadConstruccionesImages() {
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'Constru');
  const uploadedUrls = [];

  console.log(`📁 Subiendo imágenes de construcciones a la carpeta constru...\n`);

  for (const image of construccionesImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ La imagen ${image.localPath} no existe en ${imagePath} - saltando...`);
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
  console.log('🚀 Iniciando subida de imágenes de construcciones a Cloudinary (carpeta constru)...\n');
  
  try {
    const uploadedImages = await uploadConstruccionesImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de construcciones subidas exitosamente!`);
    
    if (uploadedImages.length > 0) {
      console.log('\n📋 Primeras 10 URLs generadas:');
      uploadedImages.slice(0, 10).forEach((img, index) => {
        console.log(`${index + 1}. ${img.titulo}: ${img.cloudinaryUrl}`);
      });
      
      if (uploadedImages.length > 10) {
        console.log(`\n... y ${uploadedImages.length - 10} imágenes más.`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadConstruccionesImages };
