#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataDir = path.join(root, 'src', 'data');
const srcDir = path.join(root, 'src');
const configPath = path.join(root, 'scripts', 'check-coupling.config.json');
const config = JSON.parse(await readFile(configPath, 'utf8').catch(() => '{"exceptions":[]}'));
const catalog = JSON.parse(await readFile(path.join(dataDir, 'catalog.json'), 'utf8'));
const forbidden = new Set([
  ...(catalog.categories ?? []).map(item => item.id),
  ...(catalog.units ?? []).map(item => item.id),
]);
const exceptions = new Map((config.exceptions ?? []).map(item => [item.literal, item.reason]));
const excluded = new Set(['catalog.ts']);
const hits = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['data', 'generated'].includes(entry.name)) await walk(full);
      continue;
    }
    if (!/\.(?:ts|tsx|js|jsx)$/.test(entry.name) || excluded.has(entry.name)) continue;
    const relative = path.relative(root, full).replaceAll('\\', '/');
    if (relative === 'scripts/check-coupling.config.json') continue;
    const text = await readFile(full, 'utf8');
    for (const literal of forbidden) {
      if (exceptions.has(literal)) continue;
      const re = new RegExp(`(?:['"` + '`' + `])${literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:['"` + '`' + `])`, 'g');
      let match;
      while ((match = re.exec(text))) hits.push(`${relative}:${text.slice(0, match.index).split('\n').length}: literal "${literal}"`);
    }
  }
}
await walk(srcDir);
if (hits.length) {
  console.error('Acoplamientos de rubro detectados:');
  hits.forEach(hit => console.error(`  ✖ ${hit}`));
  process.exit(1);
}
console.log(`check:coupling OK: ${forbidden.size} ids de categorías/unidades no aparecen como literales en src.`);
