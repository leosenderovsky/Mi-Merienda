import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { generateIconBuffers } from './make-icons.mjs';
import { brandConfig } from '../src/brand.config.ts';

const surface = /^#([0-9a-f]{6})$/i.exec(brandConfig.theme.surface);
const [red, green, blue] = surface[1].match(/.{2}/g).map(channel => Number.parseInt(channel, 16));

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconDirectory = path.join(projectRoot, 'public', 'assets', 'logo');
let failed = false;

/**
 * Verifica la ocupación y bordes de un ícono
 * @param {Buffer} buffer
 * @param {string} name
 * @param {number} expectedSize
 */
async function validateIconBounds(buffer, name, expectedSize) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.width !== expectedSize || info.height !== expectedSize) {
    console.error(`${name}: debe medir ${expectedSize}x${expectedSize}.`);
    failed = true;
    return;
  }

  // Encontrar bounding box del contenido no transparente
  let minX = info.width, maxX = -1, minY = info.height, maxY = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const r = data[(y * info.width + x) * info.channels + 0];
      const g = data[(y * info.width + x) * info.channels + 1];
      const b = data[(y * info.width + x) * info.channels + 2];
      // Considerar contenido solo si NO es el color de fondo sólido de marca
      if (!(Math.abs(r - red) < 5 && Math.abs(g - green) < 5 && Math.abs(b - blue) < 5)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) {
    console.error(`${name}: no tiene contenido.`);
    failed = true;
    return;
  }

  const contentWidth = maxX - minX + 1;
  const contentHeight = maxY - minY + 1;
  const maxAxis = Math.max(contentWidth, contentHeight);
  const fillRatio = maxAxis / info.width;

  // Regla 1: Ocupación entre 70% y 95%
  if (fillRatio < 0.70) {
    console.error(`${name}: el favicon se ve demasiado chico: ajustá brand.faviconCrop (ocupación ${Math.round(fillRatio * 100)}%).`);
    failed = true;
  } else if (fillRatio > 0.95) {
    console.error(`${name}: el contenido ocupa demasiado espacio (${Math.round(fillRatio * 100)}%).`);
    failed = true;
  }

  // Regla 2: No toca el 2% exterior del lienzo
  const borderMargin = Math.round(info.width * 0.02);
  if (minX < borderMargin || maxX >= info.width - borderMargin ||
      minY < borderMargin || maxY >= info.height - borderMargin) {
    console.error(`${name}: el emblema toca el borde del ícono: recorte incorrecto.`);
    failed = true;
  }
}

const generatedIcons = await generateIconBuffers();
for (const { filename, buffer } of generatedIcons) {
  let currentBuffer;
  try {
    currentBuffer = await readFile(path.join(iconDirectory, filename));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.error('íconos desactualizados: ejecutá npm run make:icons');
    failed = true;
    continue;
  }
  if (!buffer.equals(currentBuffer)) {
    console.error('íconos desactualizados: ejecutá npm run make:icons');
    failed = true;
    continue;
  }

  // Validar dimensiones y ocupación
  if (filename === 'favicon-32.png') {
    await validateIconBounds(buffer, filename, 32);
  } else if (filename === 'apple-touch-icon.png') {
    await validateIconBounds(buffer, filename, 180);
  }
}

const appleTouchIcon = await sharp(path.join(iconDirectory, 'apple-touch-icon.png')).metadata();
if (appleTouchIcon.width !== 180 || appleTouchIcon.height !== 180) {
  console.error('apple-touch-icon.png debe medir 180x180.');
  failed = true;
} else {
  const { data, info } = await sharp(path.join(iconDirectory, 'apple-touch-icon.png'))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let index = 3; index < data.length; index += info.channels) {
    if (data[index] !== 255) {
      console.error('apple-touch-icon.png debe ser opaco.');
      failed = true;
      break;
    }
  }
}

if (failed) process.exitCode = 1;
else console.info('[check:icons] ✅ Todos los íconos están actualizados, opacos, bien dimensionados y con la ocupación correcta.');
