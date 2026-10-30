#!/usr/bin/env node
/**
 * Valida src/data/brand.json y src/data/catalog.json contra sus esquemas.
 * Además revisa imágenes, URLs, colores, WhatsApp, variables de texto,
 * integridad del catálogo (ids únicos, kebab-case, categorías, precios, imágenes)
 * y marcadores en todos los src/data/*.json.
 * Con --strict también exige reemplazar datos de ejemplo y rechaza marcadores.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataPath = path.join(root, 'src/data/brand.json');
const schemaPath = path.join(root, 'src/data/brand.schema.json');
const catalogDataPath = path.join(root, 'src/data/catalog.json');
const catalogSchemaPath = path.join(root, 'src/data/catalog.schema.json');
const markersPath = path.join(root, 'src/data/prototype-markers.json');
const publicDir = path.join(root, 'public');
const strict = process.argv.includes('--strict');

/** Rutas de brand.json que deben contener solo dígitos (número de WhatsApp para wa.me). */
const DIGIT_FIELDS = (
  await readFile(new URL('./check-config.fields.json', import.meta.url), 'utf8')
    .then(JSON.parse)
    .catch(() => ({ digits: [] }))
).digits;

const errors = [];
const warnings = [];

// ─── AJV ────────────────────────────────────────────────────────────────────
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// ─── BRAND.JSON ──────────────────────────────────────────────────────────────
const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const markers = JSON.parse(await readFile(markersPath, 'utf8'));

const validateBrand = ajv.compile(schema);
if (!validateBrand(data))
  for (const err of validateBrand.errors ?? [])
    errors.push(
      `brand.json ${err.instancePath || '/'}: ${err.message}${err.params?.additionalProperty ? ` (${err.params.additionalProperty})` : ''}`,
    );

const getPath = (obj, p) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

/** Recorrido paralelo esquema ↔ datos (brand.json). */
async function walkBrand(sNode, dNode, p) {
  if (!sNode || dNode === undefined || dNode === null) return;
  if (sNode.type === 'object' && sNode.properties && typeof dNode === 'object') {
    for (const [k, child] of Object.entries(sNode.properties)) await walkBrand(child, dNode[k], p ? `${p}.${k}` : k);
    return;
  }
  if (sNode.type === 'array' && Array.isArray(dNode)) {
    for (const [i, item] of dNode.entries()) await walkBrand(sNode.items, item, `${p}[${i}]`);
    return;
  }
  if (typeof dNode !== 'string') return;
  const widget = sNode['x-widget'];
  if (widget === 'image' && dNode) {
    try {
      await stat(path.join(publicDir, dNode.replace(/^\//, '')));
    } catch {
      errors.push(`brand.json ${p}: la imagen no existe en public/: ${dNode}`);
    }
  }
  if (widget === 'url' && dNode && !/^https?:\/\//i.test(dNode))
    errors.push(`brand.json ${p}: la URL debe empezar con http:// o https:// ("${dNode}")`);
  if (widget === 'color' && !/^#[0-9a-fA-F]{6}$/.test(dNode))
    errors.push(`brand.json ${p}: color inválido "${dNode}" (usar #RRGGBB)`);
  // variables {x}: solo las declaradas en el esquema
  const allowed = new Set(sNode['x-vars'] ?? []);
  for (const m of dNode.matchAll(/\{(\w+)\}/g))
    if (!allowed.has(m[1]))
      errors.push(
        `brand.json ${p}: variable desconocida {${m[1]}} (permitidas: ${[...allowed].map((v) => `{${v}}`).join(', ') || 'ninguna'})`,
      );
  if (strict && sNode['x-exampleData'] && Array.isArray(sNode.examples) && dNode === sNode.examples[0])
    errors.push(`[strict] brand.json ${p}: sigue el texto de ejemplo ("${dNode.slice(0, 60)}")`);
}
await walkBrand(schema, data, '');

for (const field of DIGIT_FIELDS) {
  const v = getPath(data, field);
  if (typeof v === 'string' && !/^\d+$/.test(v)) errors.push(`brand.json ${field}: debe contener solo dígitos ("${v}")`);
}

// ─── CATALOG.JSON ─────────────────────────────────────────────────────────────
let catalog = null;
let catalogSchema = null;
try {
  catalogSchema = JSON.parse(await readFile(catalogSchemaPath, 'utf8'));
  catalog = JSON.parse(await readFile(catalogDataPath, 'utf8'));

  const validateCatalog = ajv.compile(catalogSchema);
  if (!validateCatalog(catalog))
    for (const err of validateCatalog.errors ?? [])
      errors.push(
        `catalog.json ${err.instancePath || '/'}: ${err.message}${err.params?.additionalProperty ? ` (${err.params.additionalProperty})` : ''}`,
      );

  const categoryIds = new Set((catalog.categories ?? []).map((c) => c.id));

  // IDs de producto: únicos y en kebab-case
  const KEBAB_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const seenIds = new Set();
  for (const product of catalog.products ?? []) {
    if (seenIds.has(product.id)) errors.push(`catalog.json products[${product.id}]: id duplicado`);
    seenIds.add(product.id);
    if (!KEBAB_RE.test(product.id)) errors.push(`catalog.json products[${product.id}]: id no está en kebab-case`);

    // category debe existir en categories[].id
    if (!categoryIds.has(product.category))
      errors.push(`catalog.json products[${product.id}]: category "${product.category}" no existe en categories`);

    // precios > 0
    if (typeof product.price === 'number' && product.price <= 0)
      errors.push(`catalog.json products[${product.id}]: price debe ser > 0`);
    if (
      typeof product.compareAtPrice === 'number' &&
      typeof product.price === 'number' &&
      product.compareAtPrice <= product.price
    )
      errors.push(`catalog.json products[${product.id}]: compareAtPrice debe ser > price`);

    // imágenes existen en public/
    for (const imgPath of product.images ?? []) {
      try {
        await stat(path.join(publicDir, imgPath.replace(/^\//, '')));
      } catch {
        errors.push(`catalog.json products[${product.id}]: imagen no existe en public/: ${imgPath}`);
      }
    }
  }

  // IDs de unidades: únicos y en kebab-case (las unidades pueden tener espacios como "500 grs", solo advertencia)
  const seenUnitIds = new Set();
  for (const unit of catalog.units ?? []) {
    if (seenUnitIds.has(unit.id)) errors.push(`catalog.json units[${unit.id}]: id duplicado`);
    seenUnitIds.add(unit.id);
  }

  // imágenes en public/assets/products/ sin producto asociado → advertencia
  const declaredImages = new Set(
    (catalog.products ?? [])
      .flatMap((p) => p.images ?? [])
      .map((img) => path.basename(img).toLowerCase()),
  );
  try {
    const productImagesDir = path.join(publicDir, 'assets', 'products');
    const filesInDir = await readdir(productImagesDir).catch(() => []);
    for (const file of filesInDir) {
      if (/\.(jpe?g|png|webp)$/i.test(file) && !declaredImages.has(file.toLowerCase()))
        warnings.push(`public/assets/products/${file}: imagen sin producto asociado en catalog.json`);
    }
  } catch { /* directorio inexistente */ }
} catch (e) {
  if (e.code === 'ENOENT') {
    warnings.push(`catalog.json o catalog.schema.json no encontrado: ${e.message}`);
  } else {
    errors.push(`Error al validar catalog.json: ${e.message}`);
  }
}

// ─── STRICT: marcadores en TODOS los src/data/*.json ─────────────────────────
if (strict) {
  // brand.json: skip de campos marcados con x-skipMarkers
  const skip = new Set();
  (function collect(n, p) {
    if (!n || typeof n !== 'object') return;
    if (n['x-skipMarkers'] && p) skip.add(p);
    for (const [k, c] of Object.entries(n.properties ?? {})) collect(c, p ? `${p}.${k}` : k);
    if (n.items) collect(n.items, p);
  })(schema, '');
  (function checkMarkers(node, p) {
    if (node == null) return;
    const base = p.replace(/\[\d+\]/g, '');
    if ([...skip].some((s) => base === s || base.startsWith(`${s}.`))) return;
    if (typeof node === 'string') {
      const lower = node.toLowerCase();
      for (const m of markers.strings ?? [])
        if (lower.includes(m.toLowerCase())) errors.push(`[strict] brand.json ${p}: contiene el marcador de prototipo "${m}"`);
    } else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkMarkers(v, p ? `${p}.${k}` : k);
  })(data, '');

  // catalog.json: buscar marcadores en todos los textos
  if (catalog) {
    (function checkCatalogMarkers(node, p) {
      if (node == null) return;
      if (typeof node === 'string') {
        const lower = node.toLowerCase();
        for (const m of markers.strings ?? [])
          if (lower.includes(m.toLowerCase())) errors.push(`[strict] catalog.json ${p}: contiene el marcador de prototipo "${m}"`);
      } else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkCatalogMarkers(v, p ? `${p}.${k}` : k);
    })(catalog, '');
  }
}

// ─── SALIDA ───────────────────────────────────────────────────────────────────
if (warnings.length) {
  console.warn(`\nAdvertencias (${warnings.length}):`);
  warnings.forEach((w) => console.warn(`  ⚠ ${w}`));
}
if (errors.length) {
  console.error(`\nErrores de configuración (${errors.length}):`);
  errors.forEach((e) => console.error(`  ✖ ${e}`));
  process.exit(1);
}
console.log(
  strict
    ? 'check:config:strict OK: brand.json y catalog.json no conservan datos de ejemplo.'
    : 'check:config OK: brand.json y catalog.json son válidos.',
);
