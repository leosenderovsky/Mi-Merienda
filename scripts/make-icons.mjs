import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { brandConfig } from '../src/brand.config.ts';

const logoPath = fileURLToPath(new URL('../public/assets/logo/logo.png', import.meta.url));
const outputDirectory = new URL('../public/assets/logo/', import.meta.url);

if (!existsSync(logoPath)) {
  console.info(`[make-icons] No se encontró el logo "${logoPath}"; no se generaron iconos.`);
  process.exit(0);
}

const surface = /^#([0-9a-f]{6})$/i.exec(brandConfig.theme.surface);
if (!surface) {
  throw new Error(`El color de fondo del tema debe ser hexadecimal de 6 dígitos: "${brandConfig.theme.surface}"`);
}

const [red, green, blue] = surface[1].match(/.{2}/g).map((channel) => Number.parseInt(channel, 16));

async function createIcon(size, outputFile) {
  const padding = Math.round(size * 0.16);
  const logo = await sharp(logoPath)
    .resize(size - padding * 2, size - padding * 2, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: red, g: green, b: blue, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
  .toFile(fileURLToPath(new URL(outputFile, outputDirectory)));
}

await createIcon(32, 'favicon-32.png');
await createIcon(180, 'apple-touch-icon.png');
console.info('[make-icons] Generados favicon-32.png y apple-touch-icon.png con fondo sólido.');
