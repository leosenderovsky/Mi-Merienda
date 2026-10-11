import { execFileSync } from 'node:child_process';

const [, , siteArg] = process.argv;

if (!siteArg) {
  console.error('Uso: npm run verify:deploy -- https://<sitio>.netlify.app');
  process.exit(1);
}

function normalizeSiteUrl(value) {
  try {
    const url = new URL(value);
    url.hash = '';
    url.search = '';
    return url.href.endsWith('/') ? url.href : `${url.href}/`;
  } catch {
    throw new Error(`URL invalida: ${value}`);
  }
}

function gitLsRemoteMain() {
  return execFileSync('git', ['ls-remote', 'origin', 'refs/heads/main'], {
    encoding: 'utf8',
  })
    .trim()
    .split(/\s+/)[0];
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function findMetaContent(html, propertyName) {
  const tagPattern = /<meta\b[^>]*>/gi;
  const namePattern = new RegExp(`\\b(?:property|name)=["']${propertyName}["']`, 'i');
  const contentPattern = /\bcontent=["']([^"']+)["']/i;

  for (const [tag] of html.matchAll(tagPattern)) {
    if (!namePattern.test(tag)) {
      continue;
    }

    const content = tag.match(contentPattern)?.[1];
    if (content) {
      return decodeHtmlAttribute(content);
    }
  }

  return null;
}

function findCanonical(html) {
  const linkPattern = /<link\b[^>]*>/gi;
  const relPattern = /\brel=["']canonical["']/i;
  const hrefPattern = /\bhref=["']([^"']+)["']/i;

  for (const [tag] of html.matchAll(linkPattern)) {
    if (!relPattern.test(tag)) {
      continue;
    }

    const href = tag.match(hrefPattern)?.[1];
    if (href) {
      return decodeHtmlAttribute(href);
    }
  }

  return null;
}

async function fetchOk(url) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    await response.arrayBuffer();
    return response.status;
  } catch {
    return 0;
  }
}

function commitsMatch(published, main) {
  if (!published || published === 'unknown' || !main) {
    return false;
  }

  return published === main || published.startsWith(main) || main.startsWith(published);
}

const failures = [];
let siteUrl;

try {
  siteUrl = normalizeSiteUrl(siteArg);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const buildInfoUrl = new URL('build-info.json', siteUrl).href;
const homeUrl = siteUrl;

const buildInfoResponse = await fetch(buildInfoUrl, { method: 'GET', redirect: 'follow' });
if (!buildInfoResponse.ok) {
  console.error(`No se pudo leer build-info.json: HTTP ${buildInfoResponse.status}`);
  process.exit(1);
}

const buildInfo = await buildInfoResponse.json();
const mainCommit = gitLsRemoteMain();
const isUpToDate = commitsMatch(buildInfo.commit, mainCommit);

if (!isUpToDate) {
  failures.push('El commit publicado no coincide con origin/main.');
}

const homeResponse = await fetch(homeUrl, { method: 'GET', redirect: 'follow' });
if (!homeResponse.ok) {
  failures.push(`No se pudo leer el HTML del sitio: HTTP ${homeResponse.status}.`);
}

const html = homeResponse.ok ? await homeResponse.text() : '';
const canonical = html ? findCanonical(html) : null;
const ogImage = html ? findMetaContent(html, 'og:image') : null;

if (!canonical) {
  failures.push('Falta canonical.');
}

if (!ogImage) {
  failures.push('Falta og:image.');
}

const canonicalUrl = canonical ? new URL(canonical, siteUrl).href : null;
const ogImageUrl = ogImage ? new URL(ogImage, siteUrl).href : null;
const canonicalStatus = canonicalUrl ? await fetchOk(canonicalUrl) : 0;
const ogImageStatus = ogImageUrl ? await fetchOk(ogImageUrl) : 0;

if (canonicalUrl && canonicalStatus !== 200) {
  failures.push(`canonical no responde 200: HTTP ${canonicalStatus}.`);
}

if (ogImageUrl && ogImageStatus !== 200) {
  failures.push(`og:image no responde 200: HTTP ${ogImageStatus}.`);
}

const urlWarning =
  buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL'
    ? 'ATENCION: production usa DEPLOY_PRIME_URL'
    : 'OK';

const checks = [];

// Commit publicado
checks.push({
  Verificación: 'Commit publicado',
  Estado: isUpToDate ? 'OK' : 'ERROR',
  Detalle: buildInfo.commit || 'unknown',
});

// Commit main
checks.push({
  Verificación: 'Commit origen main',
  Estado: mainCommit ? 'OK' : 'ERROR',
  Detalle: mainCommit || 'no disponible',
});

// Contexto deploy
checks.push({
  Verificación: 'Contexto deploy',
  Estado: 'INFO',
  Detalle: buildInfo.context || 'unknown',
});

// URL sitio
const siteUrlStatus = !buildInfo.siteUrl
  ? buildInfo.context === 'production' ? 'ERROR' : 'INFO'
  : buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL'
    ? 'ATENCIÓN'
    : 'OK';

checks.push({
  Verificación: 'URL del sitio',
  Estado: siteUrlStatus,
  Detalle: buildInfo.siteUrl || '(relativa)',
});

// Fuente URL
checks.push({
  Verificación: 'Fuente URL sitio',
  Estado: siteUrlStatus,
  Detalle: buildInfo.siteUrlSource || 'desconocida',
});

// Variables de entorno
checks.push({
  Verificación: 'VITE_SITE_URL',
  Estado: buildInfo.env?.VITE_SITE_URL ? 'OK' : 'INFO',
  Detalle: buildInfo.env?.VITE_SITE_URL ? 'definida' : 'no definida',
});
checks.push({
  Verificación: 'VITE_DEMO_BRAND_NAME',
  Estado: buildInfo.env?.VITE_DEMO_BRAND_NAME ? 'OK' : 'INFO',
  Detalle: buildInfo.env?.VITE_DEMO_BRAND_NAME ? 'definida' : 'no definida',
});
checks.push({
  Verificación: 'VITE_DEMO_BRAND_URL',
  Estado: buildInfo.env?.VITE_DEMO_BRAND_URL ? 'OK' : 'INFO',
  Detalle: buildInfo.env?.VITE_DEMO_BRAND_URL ? 'definida' : 'no definida',
});

// Canonical
checks.push({
  Verificación: 'Canonical tag',
  Estado: canonicalStatus === 200 ? 'OK' : 'ERROR',
  Detalle: canonicalUrl || '(faltante)',
});

// OG Image
checks.push({
  Verificación: 'Imagen Open Graph',
  Estado: ogImageStatus === 200 ? 'OK' : 'ERROR',
  Detalle: ogImageUrl || '(faltante)',
});

console.table(checks);

// Exit code solo si hay algún ERROR
const hasErrors = checks.some(c => c.Estado === 'ERROR');
process.exitCode = hasErrors ? 1 : 0;

if (process.exitCode === 0) {
  console.log('\n✅ Deploy verificado correctamente.');
} else {
  console.log('\n❌ Hay errores bloqueantes en el deploy.');
}
