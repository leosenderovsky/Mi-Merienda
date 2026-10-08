import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { brandConfig } from './src/brand.config.ts';

type SiteUrlSource = 'VITE_SITE_URL' | 'URL' | 'DEPLOY_PRIME_URL' | 'none';

type ResolvedSiteUrl = {
  url: string;
  source: SiteUrlSource;
};

type BuildInfo = {
  commit: string;
  commitShort: string;
  branch: string;
  context: string;
  deployId: string | null;
  builtAt: string;
  siteUrl: string;
  siteUrlSource: SiteUrlSource;
  env: {
    VITE_SITE_URL: boolean;
    VITE_DEMO_BRAND_NAME: boolean;
    VITE_DEMO_BRAND_URL: boolean;
  };
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getEnvValue(env: Record<string, string>, key: string): string {
  return (env[key] || process.env[key] || '').trim();
}

function getGitValue(args: string[]): string | null {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
}

export function resolveSiteUrl(env: Record<string, string>): ResolvedSiteUrl {
  const viteSiteUrl = getEnvValue(env, 'VITE_SITE_URL');
  if (viteSiteUrl) {
    return { url: viteSiteUrl, source: 'VITE_SITE_URL' };
  }

  const netlifyUrl = (process.env.URL || '').trim();
  const deployPrimeUrl = (process.env.DEPLOY_PRIME_URL || '').trim();

  if (process.env.CONTEXT === 'production' && netlifyUrl) {
    return { url: netlifyUrl, source: 'URL' };
  }

  if (process.env.CONTEXT !== 'production' && deployPrimeUrl) {
    return { url: deployPrimeUrl, source: 'DEPLOY_PRIME_URL' };
  }

  if (netlifyUrl) {
    return { url: netlifyUrl, source: 'URL' };
  }

  if (deployPrimeUrl) {
    return { url: deployPrimeUrl, source: 'DEPLOY_PRIME_URL' };
  }

  return { url: '', source: 'none' };
}

function createBuildInfo(env: Record<string, string>, siteUrl: ResolvedSiteUrl): BuildInfo {
  const commit = (process.env.COMMIT_REF || '').trim() || getGitValue(['rev-parse', 'HEAD']) || 'unknown';
  const branch = (process.env.BRANCH || '').trim() || getGitValue(['rev-parse', '--abbrev-ref', 'HEAD']) || 'unknown';

  return {
    commit,
    commitShort: commit.slice(0, 7),
    branch,
    context: (process.env.CONTEXT || '').trim() || 'local',
    deployId: (process.env.DEPLOY_ID || '').trim() || null,
    builtAt: new Date().toISOString(),
    siteUrl: siteUrl.url,
    siteUrlSource: siteUrl.source,
    env: {
      VITE_SITE_URL: Boolean(getEnvValue(env, 'VITE_SITE_URL')),
      VITE_DEMO_BRAND_NAME: Boolean(getEnvValue(env, 'VITE_DEMO_BRAND_NAME')),
      VITE_DEMO_BRAND_URL: Boolean(getEnvValue(env, 'VITE_DEMO_BRAND_URL')),
    },
  };
}

export function buildInfoPlugin(info: BuildInfo): Plugin {
  return {
    name: 'build-info',
    apply: 'build',
    buildStart() {
      console.log(
        `[build-info] commit=${info.commitShort} context=${info.context} siteUrl=${info.siteUrl || '(relative)'} source=${info.siteUrlSource}`,
      );

      if (!info.env.VITE_SITE_URL) {
        console.warn(
          '[build-info] VITE_SITE_URL no definida: se usa la URL de Netlify; definila al conectar un dominio propio',
        );
      }

      if (info.siteUrlSource === 'none') {
        console.warn('[build-info] No hay URL del sitio definida; se usan rutas relativas');
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'build-info.json',
        source: `${JSON.stringify(info, null, 2)}\n`,
      });
    },
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'meta',
            attrs: {
              name: 'build-commit',
              content: info.commitShort,
            },
            injectTo: 'head',
          },
        ],
      };
    },
  };
}

export function brandMetadataPlugin(siteUrl: string): Plugin {
  const canonicalUrl = siteUrl ? new URL('/', siteUrl).href : '/';
  const imageUrl = siteUrl
    ? new URL(brandConfig.seo.socialImage, siteUrl).href
    : brandConfig.seo.socialImage;
  const title = `${brandConfig.brand.name} — ${brandConfig.seo.titleSuffix}`;
  const replacements: Record<string, string> = {
    __BRAND_TITLE__: escapeHtml(title),
    __BRAND_DESCRIPTION__: escapeHtml(brandConfig.seo.description),
    __BRAND_IMAGE__: escapeHtml(imageUrl),
    __BRAND_CANONICAL__: escapeHtml(canonicalUrl),
    __BRAND_FAVICON_32__: escapeHtml(brandConfig.brand.favicon32Url),
    __BRAND_APPLE_ICON__: escapeHtml(brandConfig.brand.appleTouchIconUrl),
    __BRAND_FONT_STYLESHEET__: escapeHtml(brandConfig.typography.stylesheetUrl),
  };

  return {
    name: 'brand-metadata',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [placeholder, value]) => result.replaceAll(placeholder, value),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = resolveSiteUrl(env);
  const buildInfo = createBuildInfo(env, siteUrl);

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(siteUrl.url), buildInfoPlugin(buildInfo)],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env VAR.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
