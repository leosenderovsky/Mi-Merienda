// DEMO ONLY. Al entregar el sitio a un cliente real: borrar este archivo, PrototypeBanner.tsx, su import en App.tsx (marcado DEMO ONLY) y, en Galpón, los offsets del banner en el wrapper de App.tsx.
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