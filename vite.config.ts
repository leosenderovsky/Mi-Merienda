import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { brandConfig } from './src/brand.config.ts';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
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
  const siteUrl = (
    env.VITE_SITE_URL
    || process.env.VITE_SITE_URL
    || process.env.DEPLOY_PRIME_URL
    || process.env.URL
    || ''
  ).trim();

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(siteUrl)],
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
