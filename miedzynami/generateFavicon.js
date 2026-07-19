import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceImage = 'C:\\Users\\natan\\.gemini\\antigravity\\brain\\c26e4710-125c-4a6a-8722-aeba25c2de17\\media__1783680299054.jpg';
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a circular SVG mask
function getCircleMask(size) {
  return Buffer.from(`
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
    </svg>
  `);
}

async function createRoundedImage(size, format = 'png') {
  return sharp(sourceImage)
    .resize(size, size)
    .composite([{
      input: getCircleMask(size),
      blend: 'dest-in'
    }])
    .toFormat(format);
}

async function generateFavicons() {
  try {
    const icoPath = path.join(publicDir, 'favicon.ico');
    await (await createRoundedImage(32)).toFile(icoPath);

    const pngPath = path.join(publicDir, 'favicon.png');
    await (await createRoundedImage(256)).toFile(pngPath);

    const applePath = path.join(publicDir, 'apple-touch-icon.png');
    await (await createRoundedImage(180)).toFile(applePath);

    const android192Path = path.join(publicDir, 'android-chrome-192x192.png');
    await (await createRoundedImage(192)).toFile(android192Path);

    const android512Path = path.join(publicDir, 'android-chrome-512x512.png');
    await (await createRoundedImage(512)).toFile(android512Path);

    const manifest = {
      name: "Między Nami Cafe",
      short_name: "Między Nami",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
    };

    fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

    console.log('Rounded favicons and manifest generated successfully.');
  } catch (err) {
    console.error('Error generating favicons:', err);
  }
}

generateFavicons();
