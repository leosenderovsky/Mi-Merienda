#!/usr/bin/env node
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const originalDir = path.join(root, '.image-originals');
const targets = [path.join(root, 'public/assets/products'), path.join(root, 'public/assets/hero')];
await mkdir(originalDir, { recursive: true });
for (const dir of targets) {
  for (const name of await readdir(dir)) {
    if (!/\.jpg$/i.test(name)) continue;
    const source = path.join(dir, name);
    const limit = dir.endsWith(path.join('assets', 'hero')) ? 350 * 1024 : 250 * 1024;
    const backup = path.join(originalDir, `${path.relative(root, source).replaceAll(path.sep, '_')}.original`);
    if (!(await stat(backup).catch(() => null))) await copyFile(source, backup);
    // Siempre recomprimir desde el original para que una segunda ejecución sea idéntica.
    const sourceBuffer = await readFile(backup);
    const input = await sharp(sourceBuffer).metadata();
    let quality = 82;
    let output;
    do {
      output = await sharp(sourceBuffer).jpeg({ quality, mozjpeg: true }).toBuffer();
      quality -= 4;
    } while (output.length > limit && quality >= 40);
    if (output.length < sourceBuffer.length) await writeFile(source, output);
    const after = await sharp(output.length < sourceBuffer.length ? output : sourceBuffer).metadata();
    if (after.width !== input.width || after.height !== input.height) throw new Error(`Cambió la dimensión de ${source}`);
    console.log(`${path.relative(root, source)}: ${output.length} bytes`);
  }
}
