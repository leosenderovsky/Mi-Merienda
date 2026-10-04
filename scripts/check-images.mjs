import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageDirectory = path.join(projectRoot, 'public', 'assets', 'products');
const productsFile = path.join(projectRoot, 'src', 'products.ts');
const strict = process.argv.includes('--strict');
const minimumWidth = 1200;
const expectedRatio = 4 / 3;
const ratioTolerance = 0.05;
const warnings = [];
let failed = false;

const formatBytes = bytes => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

try {
  const productSource = await readFile(productsFile, 'utf8');
  const expectedFiles = new Set(
    [...productSource.matchAll(/imagen:\s*["']\/assets\/products\/([^"']+\.jpg)["']/g)]
      .map(([, filename]) => filename),
  );
  if (expectedFiles.size === 0) {
    throw new Error('No se encontraron imágenes de productos declaradas en src/products.ts.');
  }

  const filenames = (await readdir(imageDirectory))
    .filter(filename => /\.jpg$/i.test(filename))
    .sort((left, right) => left.localeCompare(right));
  const foundFiles = new Set(filenames);

  for (const filename of expectedFiles) {
    if (!foundFiles.has(filename)) {
      warnings.push({ filename, issue: 'FALTA (declarada en el catálogo)' });
    }
  }

  const inspected = [];
  for (const filename of filenames) {
    const filePath = path.join(imageDirectory, filename);
    const buffer = await readFile(filePath);
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`No se pudieron leer las dimensiones de ${filename}.`);
    }
    inspected.push({
      filename,
      bytes: buffer.byteLength,
      width: metadata.width,
      height: metadata.height,
      hash: createHash('md5').update(buffer).digest('hex'),
    });
  }

  const hashes = new Map();
  for (const image of inspected) {
    const matches = hashes.get(image.hash) ?? [];
    matches.push(image.filename);
    hashes.set(image.hash, matches);
  }

  console.log('Imagen'.padEnd(38) + 'Dimensiones'.padEnd(17) + 'Peso'.padEnd(12) + 'Resultado');
  console.log('-'.repeat(88));
  for (const image of inspected) {
    const issues = [];
    if (image.width < minimumWidth) issues.push('BAJA RESOLUCIÓN');
    const ratio = image.width / image.height;
    if (Math.abs(ratio - expectedRatio) > ratioTolerance) issues.push('RATIO');
    const duplicates = hashes.get(image.hash);
    if (duplicates.length > 1) issues.push(`DUPLICADA (${duplicates.filter(name => name !== image.filename).join(', ')})`);

    console.log(
      image.filename.padEnd(38)
      + `${image.width}x${image.height}`.padEnd(17)
      + formatBytes(image.bytes).padEnd(12)
      + (issues.join('; ') || 'OK'),
    );
    for (const issue of issues) warnings.push({ filename: image.filename, issue });
  }

  for (const warning of warnings) {
    console.warn(`ADVERTENCIA ${warning.filename}: ${warning.issue}`);
  }
  if (filenames.length === 0) {
    throw new Error(`No se encontraron archivos JPG en ${imageDirectory}.`);
  }
  if (strict && warnings.length > 0) failed = true;
} catch (error) {
  console.error(`Error al verificar imágenes: ${error.message}`);
  failed = true;
}

if (warnings.length > 0) {
  console.log(`\n${warnings.length} advertencia(s)${strict ? ' (modo estricto)' : ''}.`);
} else if (!failed) {
  console.log('\nTodas las imágenes cumplen las comprobaciones.');
}

process.exitCode = failed ? 1 : 0;
