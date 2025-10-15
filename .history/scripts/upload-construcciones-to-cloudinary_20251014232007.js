const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmfy5ohhf',
  api_key: process.env.CLOUDINARY_API_KEY || '151996193914522',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nLlCPZSpgogMhCPsNi-irDUE4bk'
});

// Lista de imágenes de construcciones
const construccionesImages = [
  { localPath: '537335388_18080363194929090_698246317290470406_n.jpg', publicId: 'construccion-01', titulo: 'Construcción 01' },
  { localPath: '528294308_18078779194929090_8052149658310212843_n.jpg', publicId: 'construccion-02', titulo: 'Construcción 02' },
  { localPath: '529867682_607876075719152_3998994537895451271_n.jpg', publicId: 'construccion-03', titulo: 'Construcción 03' },
  { localPath: '523155063_18077610511929090_1964931351793799760_n.jpg', publicId: 'construccion-04', titulo: 'Construcción 04' },
  { localPath: '523120341_18077610502929090_7075344581808302433_n.jpg', publicId: 'construccion-05', titulo: 'Construcción 05' },
  { localPath: '509157522_18074232295929090_2133481043393284197_n.jpg', publicId: 'construccion-06', titulo: 'Construcción 06' },
  { localPath: '504512911_2031007467707821_1886764582005411017_n.jpg', publicId: 'construccion-07', titulo: 'Construcción 07' },
  { localPath: '504855797_18073711933929090_5290277540889877315_n.jpg', publicId: 'construccion-08', titulo: 'Construcción 08' },
  { localPath: '503901732_18074953057929090_1004157300361258401_n.jpg', publicId: 'construccion-09', titulo: 'Construcción 09' },
  { localPath: '503830004_618250947940199_5171906905260854602_n.jpg', publicId: 'construccion-10', titulo: 'Construcción 10' },
  { localPath: '503346119_957145376406409_4761051158658781859_n.jpg', publicId: 'construccion-11', titulo: 'Construcción 11' },
  { localPath: '503306465_721780773597752_8534433002751941193_n.jpg', publicId: 'construccion-12', titulo: 'Construcción 12' },
  { localPath: '503267980_18072680893929090_1295036971698879033_n.jpg', publicId: 'construccion-13', titulo: 'Construcción 13' },
  { localPath: '503136088_1042951224688793_2027841161789816112_n.heic.jpg', publicId: 'construccion-14', titulo: 'Construcción 14' },
  { localPath: '503034286_18072680950929090_3773767965027649049_n.jpg', publicId: 'construccion-15', titulo: 'Construcción 15' },
  { localPath: '488293502_18067256713929090_4223707088700851098_n.jpg', publicId: 'construccion-16', titulo: 'Construcción 16' },
  { localPath: '491897173_503834272698268_5875447816259510050_n.heic.jpg', publicId: 'construccion-17', titulo: 'Construcción 17' },
  { localPath: '489496880_18068013436929090_6745359205398101800_n.jpg', publicId: 'construccion-18', titulo: 'Construcción 18' },
  { localPath: '482743511_18064831765929090_6689962033974419941_n.jpg', publicId: 'construccion-19', titulo: 'Construcción 19' },
  { localPath: '483592072_18064831786929090_1774459981994299598_n.jpg', publicId: 'construccion-20', titulo: 'Construcción 20' },
  { localPath: '483226831_18064831816929090_5602300553385130341_n.jpg', publicId: 'construccion-21', titulo: 'Construcción 21' },
  { localPath: '484568953_688341273872992_3487224064191707876_n.jpg', publicId: 'construccion-22', titulo: 'Construcción 22' },
  { localPath: '486715593_2077318989450815_190314742280390_n.jpg', publicId: 'construccion-23', titulo: 'Construcción 23' },
  { localPath: '481336510_18063318202929090_166833779773151604_n.jpg', publicId: 'construccion-24', titulo: 'Construcción 24' },
  { localPath: '482361800_18064251187929090_6997318268627457500_n.jpg', publicId: 'construccion-25', titulo: 'Construcción 25' },
  { localPath: '481079065_527905220334658_1695547445568198549_n.jpg', publicId: 'construccion-26', titulo: 'Construcción 26' },
  { localPath: '480941492_1712518649648401_5558569422689430276_n.jpg', publicId: 'construccion-27', titulo: 'Construcción 27' },
  { localPath: '482315603_18064251205929090_2104897626688266448_n.jpg', publicId: 'construccion-28', titulo: 'Construcción 28' },
  { localPath: '481088065_18063571171929090_7770771907929477399_n.jpg', publicId: 'construccion-29', titulo: 'Construcción 29' },
  { localPath: '479874732_18062810872929090_5970646825449667611_n.jpg', publicId: 'construccion-30', titulo: 'Construcción 30' },
  { localPath: '481226027_1373878234057270_6710614873167854625_n.jpg', publicId: 'construccion-31', titulo: 'Construcción 31' }
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
  const assetsPath = path.join(__dirname, '..', 'public', 'Assets', 'construcciones');
  const uploadedUrls = [];

  console.log(`📁 Subiendo ${construccionesImages.length} imágenes de construcciones...\n`);

  for (const image of construccionesImages) {
    const imagePath = path.join(assetsPath, image.localPath);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ La imagen ${image.localPath} no existe en ${imagePath}`);
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
  console.log('🚀 Iniciando subida de imágenes de construcciones a Cloudinary...\n');
  
  try {
    const uploadedImages = await uploadConstruccionesImages();
    
    console.log(`\n🎉 ${uploadedImages.length} imágenes de construcciones subidas exitosamente!`);
    
    console.log('\n📋 Código actualizado para constructora.tsx:');
    console.log('[');
    uploadedImages.forEach((img, index) => {
      const comma = index < uploadedImages.length - 1 ? ',' : '';
      console.log(`  {`);
      console.log(`    src: "${img.cloudinaryUrl}",`);
      console.log(`    alt: "${img.titulo.toLowerCase().replace(/\s+/g, '-')}",`);
      console.log(`    titulo: "${img.titulo}"`);
      console.log(`  }${comma}`);
    });
    console.log(']');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadImage, uploadConstruccionesImages };
