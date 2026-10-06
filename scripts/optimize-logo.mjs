import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = path.join(projectRoot, 'public', 'assets', 'logo', 'logo.png');
const originalsDirectory = path.join(projectRoot, '.image-originals');
const originalPath = path.join(originalsDirectory, 'logo.png');
const maximumBytes = 120 * 1024;

async function getAlphaRange(image) {
  const { data, info } = await sharp(image).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minimum = 255;
  for (let index = 3; index < data.length; index += info.channels) {
    minimum = Math.min(minimum, data[index]);
  }
  return minimum;
}

const input = await readFile(logoPath);
const inputMetadata = await sharp(input).metadata();
const currentStats = await stat(logoPath);
const inputAlphaMinimum = inputMetadata.hasAlpha ? await getAlphaRange(input) : 255;
if (inputAlphaMinimum === 255) {
  throw new Error('El logo original debe contener píxeles transparentes.');
}

if (currentStats.size <= maximumBytes && inputMetadata.width <= 800) {
  console.info('[logo:optimize] ya optimizado');
} else {
  const output = await sharp(input)
    .resize({ width: 800, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10 })
    .toBuffer();
  if (output.byteLength > maximumBytes) {
    throw new Error(`El logo optimizado supera 120 KB (${output.byteLength} bytes).`);
  }

  const outputMetadata = await sharp(output).metadata();
  if (outputMetadata.width > 800 || !outputMetadata.hasAlpha) {
    throw new Error('La optimización no conservó el ancho máximo o la transparencia del logo.');
  }
  if ((await getAlphaRange(output)) === 255) {
    throw new Error('La optimización eliminó la transparencia del logo.');
  }

  await mkdir(originalsDirectory, { recursive: true });
  try {
    await copyFile(logoPath, originalPath, constants.COPYFILE_EXCL);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  await writeFile(logoPath, output);
  console.info(`[logo:optimize] logo.png optimizado: ${(output.byteLength / 1024).toFixed(1)} KB (${outputMetadata.width}x${outputMetadata.height}).`);
}
