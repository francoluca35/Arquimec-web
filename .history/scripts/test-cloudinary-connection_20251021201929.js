const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dmfy5ohhf',
  api_key: 'nLlCPZSpgogMhCPsNi-irDUE4bk',
  api_secret: '151996193914522'
});

// Probar conexión con una imagen simple
async function testUpload() {
  try {
    console.log('🔍 Probando conexión con Cloudinary...');
    
    // Probar con una imagen simple (URL externa)
    const result = await cloudinary.uploader.upload(
      'https://via.placeholder.com/150x150.png',
      {
        public_id: 'test_render_connection',
        folder: 'renders',
        resource_type: 'image'
      }
    );
    
    console.log('✅ Conexión exitosa!');
    console.log('URL:', result.secure_url);
    
    // Eliminar la imagen de prueba
    await cloudinary.uploader.destroy('renders/test_render_connection');
    console.log('🗑️ Imagen de prueba eliminada');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('Detalles:', error);
  }
}

testUpload();
