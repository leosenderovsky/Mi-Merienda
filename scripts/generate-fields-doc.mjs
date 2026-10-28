import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const schemaPath = path.join(projectRoot, 'src/data/brand.schema.json');
const outputPath = path.join(projectRoot, 'docs/CAMPOS.md');

const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

function formatAsset(asset) {
  if (!asset) return '';
  const parts = [];
  if (asset.path) parts.push(`path: ${asset.path}`);
  if (asset.minWidth) parts.push(`minWidth: ${asset.minWidth}px`);
  if (asset.ratio) parts.push(`ratio: ${asset.ratio}`);
  if (asset.maxKB) parts.push(`maxKB: ${asset.maxKB}KB`);
  return parts.join(', ');
}

function formatExample(val) {
  if (val === undefined || val === null) return '';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const rows = [];

function resolveRef(ref) {
  if (!ref.startsWith('#/definitions/')) return null;
  const name = ref.replace('#/definitions/', '');
  return schema.definitions?.[name] || null;
}

function traverse(node, currentPath = '') {
  if (!node) return;
  if (node.$ref) {
    const resolved = resolveRef(node.$ref);
    if (resolved) {
      traverse(resolved, currentPath);
    }
    return;
  }

  if (node.type === 'object' && node.properties) {
    for (const [key, prop] of Object.entries(node.properties)) {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;
      if (prop.type === 'object' && prop.properties) {
        traverse(prop, fieldPath);
      } else if (prop.type === 'array' && prop.items) {
        if (prop.items.type === 'object' && prop.items.properties) {
          traverse(prop.items, `${fieldPath}[]`);
        } else if (prop.items.$ref) {
          const resolved = resolveRef(prop.items.$ref);
          if (resolved) {
            traverse(resolved, `${fieldPath}[]`);
          } else {
            rows.push({
              path: fieldPath,
              title: prop.title || '',
              description: prop.description || '',
              widget: prop['x-widget'] || 'list',
              asset: formatAsset(prop['x-asset']),
              example: formatExample(prop.examples?.[0]),
            });
          }
        } else {
          rows.push({
            path: fieldPath,
            title: prop.title || '',
            description: prop.description || '',
            widget: prop['x-widget'] || 'list',
            asset: formatAsset(prop['x-asset']),
            example: formatExample(prop.examples?.[0]),
          });
        }
      } else if (prop.$ref) {
        const resolved = resolveRef(prop.$ref);
        if (resolved) {
          traverse(resolved, fieldPath);
        }
      } else {
        rows.push({
          path: fieldPath,
          title: prop.title || '',
          description: prop.description || '',
          widget: prop['x-widget'] || (prop.type === 'boolean' ? 'boolean' : prop.type === 'number' || prop.type === 'integer' ? 'number' : 'text'),
          asset: formatAsset(prop['x-asset']),
          example: formatExample(prop.examples?.[0]),
        });
      }
    }
  }
}

traverse(schema);

let md = '# Diccionario de Campos Editables\n\n';
md += 'Este documento lista todos los campos editables del archivo `src/data/brand.json` definidos en `src/data/brand.schema.json`.\n\n';
md += '| Ruta | Título | Descripción | Widget | Asset | Ejemplo |\n';
md += '|---|---|---|---|---|---|\n';

for (const row of rows) {
  const safeDesc = row.description.replaceAll('|', '\\|').replaceAll('\n', ' ');
  const safeTitle = row.title.replaceAll('|', '\\|').replaceAll('\n', ' ');
  const safeAsset = row.asset.replaceAll('|', '\\|');
  md += `| \`${row.path}\` | ${safeTitle} | ${safeDesc} | \`${row.widget}\` | ${safeAsset} | ${row.example} |\n`;
}

await writeFile(outputPath, md, 'utf8');
console.log(`wrote ${path.relative(projectRoot, outputPath).replaceAll('\\', '/')} (${rows.length} campos)`);
