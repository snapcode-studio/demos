import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.join(process.cwd(), '..');
const targetDir = path.join(process.cwd(), 'public', 'images', 'gallery');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
  const galleryData = [];

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const parsedPath = path.parse(file);
    const targetFileName = `${parsedPath.name}.webp`;
    const targetPath = path.join(targetDir, targetFileName);

    try {
      const metadata = await sharp(sourcePath).metadata();
      const aspectRatio = metadata.width / metadata.height;
      
      let spanClass = 'col-span-1 row-span-1';
      if (aspectRatio > 1.2) {
        spanClass = 'col-span-1 md:col-span-2 row-span-1'; // landscape
      } else if (aspectRatio < 0.8) {
        spanClass = 'col-span-1 row-span-2'; // portrait
      }

      await sharp(sourcePath)
        .webp({ quality: 80 })
        .toFile(targetPath);

      galleryData.push({
        id: parsedPath.name,
        url: `/images/gallery/${targetFileName}`,
        width: metadata.width,
        height: metadata.height,
        span: spanClass
      });
      console.log(`Processed ${file} -> ${targetFileName}`);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }

  const outputJson = path.join(process.cwd(), 'src', 'data', 'galleryImages.json');
  if (!fs.existsSync(path.dirname(outputJson))) {
    fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  }
  fs.writeFileSync(outputJson, JSON.stringify(galleryData, null, 2));
  console.log(`Gallery data written to ${outputJson}`);
}

processImages();
