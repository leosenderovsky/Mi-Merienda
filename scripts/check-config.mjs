#!/usr/bin/env node
/**
 * Valida src/data/brand.json contra brand.schema.json y revisa imágenes, URLs, colores, WhatsApp y variables de texto.
 * Con --strict además exige reemplazar los datos de ejemplo y rechaza los marcadores de prototype-markers.json.
 */
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataPath = path.join(root, 'src/data/brand.json');
const schemaPath = path.join(root, 'src/data/brand.schema.json');
const markersPath = path.join(root, 'src/data/prototype-markers.json');
const publicDir = path.join(root, 'public');
const strict = process.argv.includes('--strict');
/** Rutas de brand.json que deben contener solo dígitos (número de WhatsApp para wa.me). */
const DIGIT_FIELDS = (await readFile(new URL('./check-config.fields.json', import.meta.url), 'utf8').then(JSON.parse).catch(() => ({ digits: [] }))).digits;

const errors = [];
const warnings = [];
const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const markers = JSON.parse(await readFile(markersPath, 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
if (!validate(data)) for (const err of validate.errors ?? []) errors.push(`brand.json ${err.instancePath || '/'}: ${err.message}${err.params?.additionalProperty ? ` (${err.params.additionalProperty})` : ''}`);

const getPath = (obj, p) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

// Recorrido paralelo esquema ↔ datos
async function walk(sNode, dNode, p) {
  if (!sNode || dNode === undefined || dNode === null) return;
  if (sNode.type === 'object' && sNode.properties && typeof dNode === 'object') {
    for (const [k, child] of Object.entries(sNode.properties)) await walk(child, dNode[k], p ? `${p}.${k}` : k);
    return;
  }
  if (sNode.type === 'array' && Array.isArray(dNode)) {
    for (const [i, item] of dNode.entries()) await walk(sNode.items, item, `${p}[${i}]`);
    return;
  }
  if (typeof dNode !== 'string') return;
  const widget = sNode['x-widget'];
  if (widget === 'image' && dNode) {
    try { await stat(path.join(publicDir, dNode.replace(/^\//, ''))); } catch { errors.push(`brand.json ${p}: la imagen no existe en public/: ${dNode}`); }
  }
  if (widget === 'url' && dNode && !/^https?:\/\//i.test(dNode)) errors.push(`brand.json ${p}: la URL debe empezar con http:// o https:// ("${dNode}")`);
  if (widget === 'color' && !/^#[0-9a-fA-F]{6}$/.test(dNode)) errors.push(`brand.json ${p}: color inválido "${dNode}" (usar #RRGGBB)`);
  // variables {x}: solo las declaradas en el esquema
  const allowed = new Set(sNode['x-vars'] ?? []);
  for (const m of dNode.matchAll(/\{(\w+)\}/g)) if (!allowed.has(m[1])) errors.push(`brand.json ${p}: variable desconocida {${m[1]}} (permitidas: ${[...allowed].map((v) => `{${v}}`).join(', ') || 'ninguna'})`);
  if (strict && sNode['x-exampleData'] && Array.isArray(sNode.examples) && dNode === sNode.examples[0]) errors.push(`[strict] brand.json ${p}: sigue el texto de ejemplo ("${dNode.slice(0, 60)}")`);
}
await walk(schema, data, '');

for (const field of DIGIT_FIELDS) {
  const v = getPath(data, field);
  if (typeof v === 'string' && !/^\d+$/.test(v)) errors.push(`brand.json ${field}: debe contener solo dígitos ("${v}")`);
}

if (strict) {
  const skip = new Set();
  (function collect(n, p) { if (!n || typeof n !== 'object') return; if (n['x-skipMarkers'] && p) skip.add(p); for (const [k, c] of Object.entries(n.properties ?? {})) collect(c, p ? `${p}.${k}` : k); if (n.items) collect(n.items, p); })(schema, '');
  (function checkMarkers(node, p) {
    if (node == null) return;
    const base = p.replace(/\[\d+\]/g, '');
    if ([...skip].some((s) => base === s || base.startsWith(`${s}.`))) return;
    if (typeof node === 'string') { const lower = node.toLowerCase(); for (const m of markers.strings ?? []) if (lower.includes(m.toLowerCase())) errors.push(`[strict] brand.json ${p}: contiene el marcador de prototipo "${m}"`); }
    else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkMarkers(v, p ? `${p}.${k}` : k);
  })(data, '');
}

if (warnings.length) { console.warn(`\nAdvertencias (${warnings.length}):`); warnings.forEach((w) => console.warn(`  ⚠ ${w}`)); }
if (errors.length) { console.error(`\nErrores de configuración (${errors.length}):`); errors.forEach((e) => console.error(`  ✖ ${e}`)); process.exit(1); }
console.log(strict ? 'check:config:strict OK: brand.json no conserva datos de ejemplo.' : 'check:config OK: brand.json es válido.');
