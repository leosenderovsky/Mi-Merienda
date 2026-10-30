/**
 * Envoltorio del catálogo: los datos del catálogo viven en src/data/catalog.json
 * (esquema en src/data/catalog.schema.json; tabla de campos en docs/CAMPOS.md).
 * Exporta los productos, categorías, unidades y funciones auxiliares derivadas.
 */

import catalogData from './data/catalog.json' with { type: 'json' };
import { brandConfig, formatText } from './brand.config.ts';
import imageDimensions from './generated/imageDimensions.json';
import type {
  CatalogConfig,
  UnidadDeMedida,
} from './generated/catalog.types.ts';

const catalogJson = catalogData as unknown as CatalogConfig;
const imageDimensionsBySource: Record<string, { width: number; height: number }> = imageDimensions;

export type ProductCategory = string;

export interface ProductOptionChoice {
  id: string;
  name: string;
  description?: string;
  extraPrice: number;
  isDefault?: boolean;
}

export interface ProductOption {
  id: string;
  title: string;
  required: boolean;
  type: 'radio' | 'checkbox' | 'text';
  choices?: ProductOptionChoice[];
  placeholder?: string;
  maxLength?: number;
  extraPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  nombre: string;
  category: string;
  categoría: string;
  price: number;
  precio: number;
  unit: string;
  unidad: string;
  images: string[];
  imagen: string;
  description: string;
  descripción: string;
  badge?: string;
  requiresLeadTime?: boolean;
  leadTimeHours?: number;
  options?: ProductOption[];
  opciones?: ProductOption[];
}

export type { UnidadDeMedida };

export function getProductImageDimensions(src: string) {
  return imageDimensionsBySource[src];
}

/** Categorías visibles con la opción "Todos" al inicio */
export const CATEGORIES: Array<{ id: 'all' | string; name: string; label: string }> = [
  {
    id: 'all',
    name: brandConfig.ui.catalog.allCategoryLabel,
    label: brandConfig.ui.catalog.allCategoryLabel,
  },
  ...catalogJson.categories.map((c) => ({
    id: c.id,
    name: c.label,
    label: c.label,
  })),
];

/** Unidades de medida configuradas en catalog.json */
export const units: UnidadDeMedida[] = catalogJson.units;

/** Obtiene la configuración de una unidad de medida por su id */
export function getUnit(unitId: string): UnidadDeMedida | undefined {
  return units.find((u) => u.id === unitId);
}

/** Conserva el rótulo histórico para la unidad genérica no configurada. */
export function getUnitPriceLabel(unitId: string): string {
  const configured = getUnit(unitId);
  if (configured) return configured.priceLabel;
  if (unitId.startsWith('unidad')) return unitId;
  return formatText(brandConfig.ui.units.unitTemplate, { unit: unitId });
}

/** Categoría destacada con anticipación/especial (ej: tortas por encargo) */
export const specialCategoryId =
  catalogJson.products.find((p) => p.requiresLeadTime)?.category ??
  catalogJson.categories[0]?.id ??
  '';

/** Catálogo de productos con compatibilidad hacia los nombres anteriores */
export const products: Product[] = catalogJson.products.map((p) => {
  const options: ProductOption[] | undefined = p.options?.map((opt) => ({
    id: opt.id,
    title: opt.title,
    required: opt.required,
    type: opt.type as 'radio' | 'checkbox' | 'text',
    choices: opt.choices?.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      extraPrice: c.extraPrice,
      isDefault: c.isDefault,
    })),
    placeholder: opt.placeholder,
    maxLength: opt.maxLength,
    extraPrice: opt.extraPrice,
  }));

  return {
    id: p.id,
    name: p.name,
    nombre: p.name,
    category: p.category,
    categoría: p.category,
    price: p.price,
    precio: p.price,
    unit: p.unit,
    unidad: p.unit,
    images: p.images,
    imagen: p.images[0] ?? '',
    description: p.description,
    descripción: p.description,
    badge: p.badge,
    requiresLeadTime: p.requiresLeadTime,
    leadTimeHours: p.leadTimeHours,
    options,
    opciones: options,
  };
});
