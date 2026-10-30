// DEMO ONLY. Al entregar el sitio a un cliente real, quitar este archivo y el banner.
export const DEFAULT_DEMO_BRAND_NAME = 'Tienda ON!';
// DEMO ONLY. Tienda ON! todavía no tiene un sitio público para enlazar.
export const DEFAULT_DEMO_BRAND_URL = '';

export const demoBannerConfig = {
  companyName: (import.meta.env?.VITE_DEMO_BRAND_NAME || DEFAULT_DEMO_BRAND_NAME).trim(),
  link: (import.meta.env?.VITE_DEMO_BRAND_URL || DEFAULT_DEMO_BRAND_URL).trim(),
};

export function getDemoLegend(): string {
  return 'Marca, productos y precios de ejemplo — prototipo de demostración';
}

export function getDemoBannerLegend(): string {
  return `prototipo de ${demoBannerConfig.companyName}`;
}

export function getValidDemoBannerLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}
