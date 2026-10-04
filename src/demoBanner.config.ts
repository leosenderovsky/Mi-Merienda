// El banner de demostración se puede ocultar desde brand.config.ts.
export const demoBannerConfig = {
  companyName: (import.meta.env.VITE_DEMO_BRAND_NAME ?? '').trim(),
  link: (import.meta.env.VITE_DEMO_BRAND_URL ?? '').trim(),
};

if (import.meta.env.DEV && (!demoBannerConfig.companyName || demoBannerConfig.companyName === '[EMPRESA]')) {
  console.info('Banner DEMO: definí VITE_DEMO_BRAND_NAME y VITE_DEMO_BRAND_URL cuando exista la marca.');
}

export function getValidDemoBannerLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}