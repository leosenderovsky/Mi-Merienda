import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { generateIconBuffers } from './make-icons.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconDirectory = path.join(projectRoot, 'public', 'assets', 'logo');
let failed = false;

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
else console.info('[check:icons] Los iconos están actualizados y apple-touch-icon.png es opaco y de 180x180.');
