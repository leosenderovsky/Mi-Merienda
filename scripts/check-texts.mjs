#!/usr/bin/env node
/**
 * Garantiza que NINGÚN texto visible esté escrito en el código: todo debe salir de src/data/brand.json
 * (o de los archivos de catálogo declarados en scripts/check-texts.config.json, que también son datos editables).
 * Recorre los componentes con un analizador sintáctico (@babel/parser) y marca:
 *   - texto dentro de JSX (<p>Hola</p>),
 *   - atributos visibles o accesibles (aria-label, alt, title, placeholder, label, value…),
 *   - cadenas y plantillas de texto en el código (mensajes, avisos, etiquetas).
 * Se ignoran los identificadores técnicos (clases de Tailwind, claves, comparaciones, errores de desarrollo y consola).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/check-texts.config.json'), 'utf8'));
const exclude = new Set(cfg.excludeFiles ?? []);
const allowStrings = new Set((cfg.allowStrings ?? []).map((s) => s.trim()));
const usedByTooling = new Map((cfg.usedByTooling ?? []).map(({ path: fieldPath, reason }) => [fieldPath, reason]));

const SKIP_ATTRS = new Set(['className', 'style', 'id', 'key', 'type', 'href', 'src', 'srcSet', 'rel', 'target', 'name', 'htmlFor', 'role', 'inputMode', 'autoComplete', 'loading', 'decoding', 'fetchPriority', 'sizes', 'method', 'viewBox', 'd', 'fill', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'xmlns', 'width', 'height', 'mode', 'variant', 'size', 'as', 'to', 'step', 'min', 'max', 'pattern', 'accept', 'lang', 'dir', 'tabIndex', 'crossOrigin', 'referrerPolicy', 'media', 'color', 'align', 'aria-modal', 'aria-hidden', 'aria-live', 'aria-busy', 'aria-haspopup', 'aria-orientation', 'aria-selected', 'aria-checked', 'aria-pressed', 'aria-expanded', 'aria-current', 'aria-controls', 'aria-describedby', 'aria-labelledby', 'data-testid']);
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(tsx?|jsx?)$/.test(f.name)) files.push(p); } })(path.join(ROOT, 'src'));

const brandSchema = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand.schema.json'), 'utf8'));
const brandData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand.json'), 'utf8'));
const textFields = [];
(function collectTextFields(schemaNode, dataNode, fieldPath = '') {
  if (!schemaNode || dataNode == null) return;
  if (schemaNode.type === 'object' && schemaNode.properties) {
    for (const [key, child] of Object.entries(schemaNode.properties))
      collectTextFields(child, dataNode[key], fieldPath ? `${fieldPath}.${key}` : key);
    return;
  }
  if (schemaNode.type === 'array' && schemaNode.items && Array.isArray(dataNode)) {
    for (const item of dataNode)
      collectTextFields(schemaNode.items, item, `${fieldPath}[]`);
    return;
  }
  if (
    typeof dataNode === 'string'
    && ['text', 'textarea'].includes(schemaNode['x-widget'])
    && (['Textos', 'Textos de interfaz'].includes(schemaNode['x-group']) || schemaNode['x-exampleData'])
  ) textFields.push(fieldPath);
})(brandSchema, brandData);

const typeOnlyFiles = new Set(['src/generated/brand.types.ts', 'src/generated/catalog.types.ts']);
const sourceEntries = [];
for (const file of files) {
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  if (!typeOnlyFiles.has(rel)) sourceEntries.push({ rel, text: fs.readFileSync(file, 'utf8') });
}
const visibleTextFiles = files.filter((file) => !exclude.has(path.relative(ROOT, file).replaceAll('\\', '/')));

function isTextFieldUsed(fieldPath) {
  const segments = fieldPath.split('.');
  const normalize = (segment) => segment.replace(/\[\]$/, '');
  const fullPath = segments.map(normalize);
  const escape = (segment) => segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const fullPattern = new RegExp(`(?:brandConfig\\s*\\.\\s*)?${fullPath.map(escape).join('\\s*\\.\\s*')}`);
  const parentPath = fullPath.slice(0, -1);
  const fieldName = escape(fullPath.at(-1));
  const parentPattern = parentPath.length
    ? new RegExp(`(?:brandConfig\\s*\\.\\s*)?${parentPath.map(escape).join('\\s*\\.\\s*')}`)
    : null;
  const fieldPattern = new RegExp(`(?:\\.\\s*${fieldName}\\b|\\[\\s*['"]${fieldName}['"]\\s*])`);
  return sourceEntries.some(({ text }) => fullPattern.test(text) || (parentPattern?.test(text) && fieldPattern.test(text)));
}

const looksLikeText = (s) => {
  const t = s.trim();
  if (!t || !/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}/.test(t)) return false;
  if (allowStrings.has(t)) return false;
  if (/^(\/|https?:|#|\.|data:|[\w.-]+\.(png|jpe?g|webp|svg|json|css|mjs|ts|tsx))/i.test(t)) return false;
  const tokens = t.split(/\s+/);
  const tailwind = tokens.every((k) => /^[\w\-:/[\].%#&!()>*,=@'"+_]+$/.test(k) && !/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(k)) && tokens.some((k) => /[-:[\]]/.test(k));
  if (tailwind) return false;
  if (/^[a-z][a-zA-Z0-9_-]*$/.test(t)) return false;                       // identificador (catalog, cart, all)
  if (/^[A-Z0-9_]+$/.test(t) && !/\s/.test(t) && t.length < 14) return false; // CONSTANTE
  return /[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+|\s|[áéíóúñ¿¡]/.test(t);
};

const findings = [];
for (const file of visibleTextFiles) {
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try { ast = parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] }); } catch (e) { console.error(`check:texts ERROR - no se pudo analizar ${rel}: ${e.message}`); process.exit(1); }
  const add = (kind, node, text) => { if (looksLikeText(text)) findings.push({ rel, line: node.loc.start.line, kind, text: text.replace(/\s+/g, ' ').trim() }); };
  (function visit(node, parent, ctx) {
    if (!node || typeof node.type !== 'string') return;
    switch (node.type) {
      case 'ImportDeclaration': case 'ExportAllDeclaration': case 'TSLiteralType': case 'TSTypeAnnotation': case 'TSTypeAliasDeclaration': case 'TSInterfaceDeclaration': return;
      case 'ThrowStatement': return;                                         // mensajes de error de desarrollo
      case 'CallExpression': if (node.callee?.object?.name === 'console') return; break;
      case 'JSXText': add('texto', node, node.value); return;
      case 'JSXAttribute': {
        const n = node.name.name; const v = node.value;
        if (v && v.type === 'StringLiteral' && !SKIP_ATTRS.has(n)) add(`atributo ${n}`, v, v.value);
        if (v && v.type === 'JSXExpressionContainer' && !SKIP_ATTRS.has(n)) visit(v.expression, node, { attr: n });
        return;
      }
      case 'StringLiteral':
        if (parent?.type === 'ObjectProperty' && parent.key === node) return;
        if (parent?.type === 'BinaryExpression' && ['===', '!==', '==', '!='].includes(parent.operator)) return;
        if (parent?.type === 'SwitchCase') return;
        add(ctx?.attr ? `atributo ${ctx.attr}` : 'cadena', node, node.value); return;
      case 'TemplateLiteral': add('plantilla', node, node.quasis.map((q) => q.value.cooked).join('{}')); node.expressions.forEach((e) => visit(e, node, ctx)); return;
    }
    for (const k of Object.keys(node)) { if (['loc', 'leadingComments', 'trailingComments'].includes(k)) continue; const v = node[k]; if (Array.isArray(v)) v.forEach((c) => visit(c, node, ctx)); else if (v && typeof v.type === 'string') visit(v, node, ctx); }
  })(ast.program, null, null);
}

console.log(`check:texts - ${visibleTextFiles.length} archivos revisados`);
if (findings.length) {
  findings.forEach((f) => console.error(`  ERROR ${f.rel}:${f.line} [${f.kind}] "${f.text.slice(0, 100)}"`));
  console.error(`\n${findings.length} texto(s) escrito(s) en el código. Movelos a src/data/brand.json (y a brand.schema.json) para que sean editables,`);
  console.error('o, si es un dato técnico, agregalo a "allowStrings" en scripts/check-texts.config.json.');
  process.exit(1);
}

const unusedTextFields = textFields.filter((fieldPath) => !usedByTooling.has(fieldPath) && !isTextFieldUsed(fieldPath));
if (unusedTextFields.length) {
  unusedTextFields.forEach((fieldPath) => console.error(`  ERROR brand.json ${fieldPath}: clave de texto sin uso en src/ ni declarada en usedByTooling.`));
  console.error(`\n${unusedTextFields.length} clave(s) de texto de brand.json sin uso.`);
  process.exit(1);
}
console.log(`Todos los textos visibles salen de brand.json; ${textFields.length} claves de texto tienen consumidor en src/ o usedByTooling.`);
