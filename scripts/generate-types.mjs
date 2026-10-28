import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileFromFile } from 'json-schema-to-typescript';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const schemaPath = path.join(projectRoot, 'src/data/brand.schema.json');
const outPath = path.join(projectRoot, 'src/generated/brand.types.ts');

const types = await compileFromFile(schemaPath, {
  cwd: path.join(projectRoot, 'src/data'),
  bannerComment: '/* Types generated from src/data/brand.schema.json. Do not edit by hand. */',
  additionalProperties: false,
  unknownAny: false,
});

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, types, 'utf8');
console.log(`wrote ${path.relative(projectRoot, outPath).replaceAll('\\', '/')}`);
