const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dmfy5ohhf',
  api_key: 'nLlCPZSpgogMhCPsNi-irDUE4bk',
  api_secret: '151996193914522'
});

// Probar conexión
async function testConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Conexión exitosa:', result);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testConnection();
