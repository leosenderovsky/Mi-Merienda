import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileFromFile } from 'json-schema-to-typescript';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

const schemas = [
  { schema: 'src/data/brand.schema.json', out: 'src/generated/brand.types.ts' },
  { schema: 'src/data/catalog.schema.json', out: 'src/generated/catalog.types.ts' },
  { schema: 'src/data/size-guide.schema.json', out: 'src/generated/size-guide.types.ts' },
];

for (const { schema, out } of schemas) {
  const schemaPath = path.join(projectRoot, schema);
  const outPath = path.join(projectRoot, out);

  if (!existsSync(schemaPath)) continue;

  const types = await compileFromFile(schemaPath, {
    cwd: path.join(projectRoot, 'src/data'),
    bannerComment: `/* Types generated from ${schema}. Do not edit by hand. */`,
    additionalProperties: false,
    unknownAny: false,
  });

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, types, 'utf8');
  console.log(`wrote ${path.relative(projectRoot, outPath).replaceAll('\\', '/')}`);
}
