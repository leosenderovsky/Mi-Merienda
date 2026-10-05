import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDirectory = path.join(projectRoot, 'public', 'assets');
const outputFile = path.join(projectRoot, 'src', 'generated', 'imageDimensions.json');

async function listImageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listImageFiles(entryPath);
    return /\.(?:jpe?g|png|webp)$/i.test(entry.name) ? [entryPath] : [];
  }));
  return nestedFiles.flat();
}

const imageFiles = (await listImageFiles(assetsDirectory)).sort();
const dimensions = await Promise.all(imageFiles.map(async filePath => {
  const metadata = await sharp(filePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`No se pudieron leer las dimensiones de ${filePath}.`);
  }

  const relativePath = path.relative(assetsDirectory, filePath).split(path.sep).join('/');
  return [`/assets/${relativePath}`, { width: metadata.width, height: metadata.height }];
}));
const imageDimensions = Object.fromEntries(dimensions);
const output = `${JSON.stringify(imageDimensions, null, 2)}\n`;

// Se versiona el JSON para que las medidas estén disponibles y sincronizadas al clonar el sitio para cada cliente.
await mkdir(path.dirname(outputFile), { recursive: true });
let previousOutput;
try {
  previousOutput = await readFile(outputFile, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (previousOutput !== output) {
  await writeFile(outputFile, output);
}
