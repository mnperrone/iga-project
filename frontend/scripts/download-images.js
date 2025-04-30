import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
    filename: 'hero-bg.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'live-classes.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'recipes.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'certification.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'pastry.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'cuisine.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    filename: 'wine.jpg'
  }
];

const imagesDir = path.join(__dirname, '../public/images');

// Crear el directorio de imágenes si no existe
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Descargar cada imagen
images.forEach(image => {
  const file = fs.createWriteStream(path.join(imagesDir, image.filename));
  https.get(image.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Descargada: ${image.filename}`);
    });
  }).on('error', err => {
    fs.unlink(path.join(imagesDir, image.filename));
    console.error(`Error al descargar ${image.filename}:`, err.message);
  });
}); 