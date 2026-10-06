import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { brandConfig } from '../src/brand.config.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = path.join(projectRoot, 'public', 'assets', 'logo', 'logo.png');
const outputDirectory = path.join(projectRoot, 'public', 'assets', 'logo');

const surface = /^#([0-9a-f]{6})$/i.exec(brandConfig.theme.surface);
if (!surface) {
  throw new Error(`El color de fondo del tema debe ser hexadecimal de 6 dígitos: "${brandConfig.theme.surface}"`);
}

const [red, green, blue] = surface[1].match(/.{2}/g).map(channel => Number.parseInt(channel, 16));

export async function generateIconBuffers() {
  const icons = [];
  for (const size of [32, 180]) {
    const padding = Math.round(size * 0.16);
    const logo = await sharp(logoPath)
      .resize(size - padding * 2, size - padding * 2, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const buffer = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: red, g: green, b: blue, alpha: 1 },
      },
    })
      .composite([{ input: logo, gravity: 'centre' }])
      .png()
      .toBuffer();

    icons.push({
      filename: size === 32 ? 'favicon-32.png' : 'apple-touch-icon.png',
      buffer,
    });
  }
  return icons;
}

async function main() {
  const icons = await generateIconBuffers();
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(icons.map(({ filename, buffer }) =>
    writeFile(path.join(outputDirectory, filename), buffer),
  ));
  console.info('[make-icons] Generados favicon-32.png y apple-touch-icon.png con fondo sólido.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
