const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary con las credenciales correctas
cloudinary.config({
  cloud_name: 'dmfy5ohhf',
  api_key: 'nLlCPZSpgogMhCPsNi-irDUE4bk',
  api_secret: '151996193914522'
});

// Función para subir una imagen
async function uploadImage(imagePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      public_id: publicId,
      folder: 'renders',
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    console.log(`✅ Subido: ${publicId}`);
    console.log(`   URL: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Error subiendo ${publicId}:`, error.message);
    return null;
  }
}

// Función principal
async function uploadRenders() {
  const rendersDir = path.join(__dirname, '..', 'public', 'Assets', 'render');
  
  try {
    const files = fs.readdirSync(rendersDir);
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png') ||
      file.toLowerCase().endsWith('.webp')
    );

    console.log(`📁 Encontrados ${imageFiles.length} archivos de imagen en renders/`);
    
    const uploadPromises = imageFiles.map(async (file, index) => {
      const filePath = path.join(rendersDir, file);
      const fileName = path.parse(file).name;
      
      // Limpiar nombre del archivo para public_id
      const cleanName = fileName
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      const publicId = `render_${index + 1}_${cleanName}`;
      
      return uploadImage(filePath, publicId);
    });

    const results = await Promise.all(uploadPromises);
    const successful = results.filter(result => result !== null);
    
    console.log(`\n🎉 ¡Subida completada!`);
    console.log(`✅ Exitosos: ${successful.length}`);
    console.log(`❌ Fallidos: ${results.length - successful.length}`);
    
    // Generar array para usar en el código
    console.log('\n📋 Array para usar en el código:');
    console.log('const renderImages = [');
    successful.forEach((result, index) => {
      const fileName = path.parse(imageFiles[index]).name;
      const cleanName = fileName
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      console.log(`  {`);
      console.log(`    src: "${result.secure_url}",`);
      console.log(`    alt: "render-${index + 1}-${cleanName}",`);
      console.log(`    titulo: "Render ${index + 1}"`);
      console.log(`  },`);
    });
    console.log('];');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar
uploadRenders();