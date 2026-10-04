// El banner de demostración se puede ocultar desde brand.config.ts.
export const demoBannerConfig = {
  companyName: (import.meta.env?.VITE_DEMO_BRAND_NAME ?? '').trim(),
  link: (import.meta.env?.VITE_DEMO_BRAND_URL ?? '').trim(),
};

export function getDemoLegend(): string {
  const base = 'Marca, productos y precios de ejemplo — prototipo de demostración';
  const companyName = demoBannerConfig.companyName;
  return companyName && companyName !== '[EMPRESA]' ? `${base} de ${companyName}` : base;
}

if (import.meta.env?.DEV && (!demoBannerConfig.companyName || demoBannerConfig.companyName === '[EMPRESA]')) {
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