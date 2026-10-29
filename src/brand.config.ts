/**
 * Envoltorio de la configuración: los datos editables viven en src/data/brand.json
 * (esquema en src/data/brand.schema.json; tabla de campos en docs/CAMPOS.md).
 * Los componentes siguen importando brandConfig desde este archivo.
 */

import brandJson from './data/brand.json' with { type: 'json' };
import { getDemoLegend } from './demoBanner.config.ts';
import type { BrandConfig as BrandConfigJson } from './generated/brand.types.ts';

/** Formateador de moneda argentina con punto separador de miles ($4.800). */
export function formatCurrency(amount: number): string {
  return '$' + amount.toLocaleString('es-AR');
}

/** Reemplaza marcadores {clave} de un texto editable por sus valores. */
export function formatText(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? `{${key}}`);
}

/** Verdadero si el texto editable tiene contenido (los textos vacíos ocultan su elemento). */
export function hasText(value?: string | null): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

export type BrandConfig = Omit<BrandConfigJson, 'delivery'> & {
  delivery: Omit<BrandConfigJson['delivery'], 'pickup' | 'delivery'> & {
    pickup: BrandConfigJson['delivery']['pickup'] & { label: string };
    delivery: BrandConfigJson['delivery']['delivery'] & { label: string };
  };
};

export const brandConfig: BrandConfig = {
  ...(brandJson as unknown as BrandConfigJson),
  delivery: {
    ...brandJson.delivery,
    pickup: {
      ...brandJson.delivery.pickup,
      label:
        brandJson.delivery.pickup.price > 0
          ? '+' + formatCurrency(brandJson.delivery.pickup.price)
          : brandJson.ui.delivery.freeLabel,
    },
    delivery: {
      ...brandJson.delivery.delivery,
      label:
        brandJson.delivery.delivery.price > 0
          ? '+' + formatCurrency(brandJson.delivery.delivery.price)
          : brandJson.ui.delivery.freeLabel,
    },
  },
  disclaimer: {
    ...brandJson.disclaimer,
    demoBadge: getDemoLegend(),
  },
};
