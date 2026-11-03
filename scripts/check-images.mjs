import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { getImageConstraintIssues } from './image-constraints.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageDirectory = path.join(projectRoot, 'public', 'assets', 'products');
const catalogFile = path.join(projectRoot, 'src', 'data', 'catalog.json');
const catalogSchemaFile = path.join(projectRoot, 'src', 'data', 'catalog.schema.json');
const generatedDimensionsFile = path.join(projectRoot, 'src', 'generated', 'imageDimensions.json');
const assetsDirectory = path.join(projectRoot, 'public', 'assets');
const strict = process.argv.includes('--strict');
const warnings = [];
let failed = false;

const formatBytes = bytes => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

async function listImageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listImageFiles(entryPath);
    return /\.(?:jpe?g|png|webp)$/i.test(entry.name) ? [entryPath] : [];
  }));
  return nestedFiles.flat();
}

try {
  const assetPaths = (await listImageFiles(assetsDirectory)).sort();
  const currentDimensions = {};
  for (const assetPath of assetPaths) {
    const metadata = await sharp(assetPath).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`No se pudieron leer las dimensiones de ${assetPath}.`);
    }
    const publicPath = `/${path.relative(assetsDirectory, assetPath).split(path.sep).join('/')}`;
    currentDimensions[`/assets${publicPath}`] = {
      width: metadata.width,
      height: metadata.height,
    };
  }

  let generatedDimensions = {};
  try {
    generatedDimensions = JSON.parse(await readFile(generatedDimensionsFile, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (JSON.stringify(currentDimensions) !== JSON.stringify(generatedDimensions)) {
    warnings.push({
      filename: 'src/generated/imageDimensions.json',
      issue: 'no coincide con las imágenes reales; ejecutá npm run generate:image-dimensions',
    });
  }

  const catalog = JSON.parse(await readFile(catalogFile, 'utf8'));
  const catalogSchema = JSON.parse(await readFile(catalogSchemaFile, 'utf8'));
  const imageAsset = catalogSchema.properties.products.items.properties.images.items['x-asset'];
  if (!imageAsset) throw new Error('No se encontró x-asset para catalog.products[].images[].');
  const expectedFiles = new Set(
    (catalog.products ?? [])
      .flatMap(p => p.images ?? [])
      .map(img => path.basename(img))
      .filter(f => /\.jpg$/i.test(f)),
  );
  if (expectedFiles.size === 0) {
    throw new Error('No se encontraron imágenes de productos declaradas en src/data/catalog.json.');
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
    const constraintIssues = getImageConstraintIssues(imageAsset, image);
    if (constraintIssues.includes('minWidth')) issues.push('BAJA RESOLUCIÓN');
    if (constraintIssues.includes('maxWidth')) issues.push('ANCHO EXCESIVO');
    if (constraintIssues.includes('ratio')) issues.push('RATIO');
    if (constraintIssues.includes('maxKB')) issues.push('PESO EXCESIVO');
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
