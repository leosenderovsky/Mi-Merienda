import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = path.join(projectRoot, 'public', 'assets', 'hero', 'hero-1.jpg');
const outputPath = path.join(projectRoot, 'public', 'assets', 'misc', 'og-image.jpg');
const maximumBytes = 200 * 1024;
let output;

for (const quality of [85, 80, 75, 70, 65, 60, 55]) {
  output = await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  if (output.byteLength <= maximumBytes) break;
}

if (!output || output.byteLength > maximumBytes) {
  throw new Error('No se pudo generar og-image.jpg con un peso máximo de 200 KB.');
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, output);
console.info(`[make:og] og-image.jpg generado: ${(output.byteLength / 1024).toFixed(1)} KB (1200x630).`);
