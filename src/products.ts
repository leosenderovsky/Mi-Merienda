/**
 * CATÁLOGO DE PRODUCTOS - "MI MERIENDA"
 * ============================================================================
 * Estructura de datos desacoplada de la interfaz gráfica.
 * 
 * --------------------------------------------------------------------------
 * CONEXIÓN FUTURA CON FIREBASE / CMS:
 * --------------------------------------------------------------------------
 * En una fase posterior, este dataset estático será reemplazado directamente
 * por una consulta en tiempo real a Firebase Firestore o un CMS headless:
 * 
 * ```typescript
 * import { collection, getDocs, onSnapshot } from 'firebase/firestore';
 * import { db } from './firebase';
 * 
 * export async function fetchProductsFromFirebase(): Promise<Product[]> {
 *   const querySnapshot = await getDocs(collection(db, "products"));
 *   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
 * }
 * ```
 * 
 * De esta forma, el comerciante podrá modificar precios, agregar o pausar productos
 * desde su panel de control privado sin necesidad de tocar los componentes visuales de React.
 * ============================================================================
 */

export type ProductCategory = 'panes' | 'facturas' | 'tortas' | 'salados';

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
  extraPrice?: number; // Para checkboxes individuales
}

export interface Product {
  id: string;
  nombre: string;
  categoría: ProductCategory;
  precio: number; // Precio base editable
  unidad: 'kilo' | 'unidad' | 'docena' | '500 grs' | string;
  imagen: string;
  descripción: string;
  badge?: string;
  requiresLeadTime?: boolean; // Requiere anticipación (ej. tortas artesanales)
  leadTimeHours?: number; // ej. 48 o 24
  opciones?: ProductOption[];
}

export const CATEGORIES: Array<{ id: 'all' | ProductCategory; name: string }> = [
  { id: 'all', name: 'Todos' },
  { id: 'panes', name: 'Panificados' },
  { id: 'facturas', name: 'Facturas & Medialunas' },
  { id: 'tortas', name: 'Tortas por encargo' },
  { id: 'salados', name: 'Salados & Sandwiches' },
];

/**
 * Catálogo editable de productos
 */
export const products: Product[] = [
  {
    id: "medialunas-manteca",
    nombre: "Medialunas de Manteca Artesanales",
    categoría: "facturas",
    precio: 4800,
    unidad: "docena",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvCEgpmkptM0adef9qaNCWmoF6kFkedDiU6HGrcRIvKO5Hn9ri4vFDZ-XbtS1ZoowJtp8whxAXHDsmOhHOz_ru9P9eKEPlASv4FYWoJ9VdS7ZoAYvsDpWk6_cZm11X_IKuALeU5KTgnFntDUXmjyo0bax6feDHXOtEl5dFYoiPyZBMXyfyBQDTm0WLMJWynJAMexnxogeIeUhUWt8hfcKPPPibzbEvrMHLhucYrBpXS1e-S9V0klrqCg",
    descripción: "Elaboradas con 72 hs de fermentación lenta, manteca pura y almíbar cítrico perfumado.",
    badge: "Recién salidas",
    opciones: [
      {
        id: "variedad",
        title: "Variedad de la docena",
        required: true,
        type: "radio",
        choices: [
          { id: "surtidas", name: "Surtidas (8 dulces con almíbar, 4 saladas)", extraPrice: 0, isDefault: true },
          { id: "todas-dulces", name: "12 dulces con almíbar cítrico", extraPrice: 0 },
          { id: "todas-saladas", name: "12 saladas de manteca hojaldradas", extraPrice: 0 },
        ],
      },
    ],
  },
  {
    id: "pan-campo-masa-madre",
    nombre: "Pan de Campo con Masa Madre",
    categoría: "panes",
    precio: 2200,
    unidad: "kilo",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6muOweUlq1L5yVNpwoqfXRW6RtQb1g75X3TBEgfN41HGCInrkFMm7OdWZfIk1pyMLQmgQUBPiFpA5A12Xxy6QHe90wJya3GLCGYxfJpb0P1ss9scUpyufs08bznEzMvs8qO5q0QjzSXvxP2BS8tN1XM2pUqEU7JzIAVSq19GSIlrQTaOxmkcbqin1_p_Lne0ar2xyL0fXw5Ue-WBFbF8wqTMa2-cx6QSTtmnmOUgQwFZc1SirZK8fdw",
    descripción: "Corteza crocante, miga aireada y húmeda. Harinas orgánicas seleccionadas sin conservantes.",
    badge: "24h Fermentación",
    opciones: [
      {
        id: "corte",
        title: "Presentación",
        required: true,
        type: "radio",
        choices: [
          { id: "rebanadas-gruesas", name: "Cortado en rebanadas gruesas (1 kg)", extraPrice: 0, isDefault: true },
          { id: "entero", name: "Pieza entera para cortar en casa", extraPrice: 0 },
          { id: "rebanadas-finas", name: "Rebanadas finas para tostadas", extraPrice: 0 },
        ],
      },
    ],
  },
  {
    id: "chipa-correntino",
    nombre: "Chipá Correntino Calentito",
    categoría: "salados",
    precio: 5200,
    unidad: "500 grs",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwgvfBSyEbsNd1iZbYtY-0g0PLoLSxGzq7tF1Btmdn0Myw3Gx15m2RaCPasi6ZQZZacTNDTngTxYcAgjUkhKYcH5v9xkaA-J1qIGPYQP9R2bP72rRxu9wZqsWF-_FveVZHhZXuG3SwhWmQWkzQGcjL7EV8fSSqPia3hsSPwiVO2ogd3PwHbGOhjErDTKNf6bjkttmehuna-dlnSNbnd5FllmBEGSW4Vs4HEE5jKUJLS-9fah706TM2Mg",
    descripción: "Receta tradicional con queso cáscara colorada, provolone estacionado y fécula de mandioca.",
    badge: "Salen calientes",
  },
  {
    id: "torta-rogel-tradicional",
    nombre: "Torta Rogel Tradicional Artesanal",
    categoría: "tortas",
    precio: 18500, // Precio base (chico)
    unidad: "unidad",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvNs0slVULxqbh1_lfnOvkkKrHu_l978DsZ7sRgdfoc9R8aOmRGXrebFPMbTayovGMXXRUdBDUXLqcTW5rOyMsYhWnqYZbwFzVp98Pe9vRiQZsrRZ1g_OsecbXDqRvfvprNZ5ROrHHaKy02SlmYs7UwSPdGCm6T0krp7Hm8Ufe-l7PA50fswFeyA-cnIY7xHhSO4q8qmfTLbojh2uThOOp0ilAO8RspSS4zydaXUQhf4-bfJjrWejwkw",
    descripción: "Clásico infalible argentino. 8 capas ultra crocantes elaboradas a mano con harina seleccionada, rellenas con el mejor dulce de leche repostero de campo y coronada con generoso merengue italiano ligeramente dorado a soplete.",
    badge: "A pedido (48hs)",
    requiresLeadTime: true,
    leadTimeHours: 48,
    opciones: [
      {
        id: "tamano",
        title: "1. Seleccionar tamaño",
        required: true,
        type: "radio",
        choices: [
          {
            id: "chico",
            name: "Chico (10-12 porciones)",
            description: "Aprox. 1.5 kg",
            extraPrice: 0,
          },
          {
            id: "mediano",
            name: "Mediano (16-18 porciones)",
            description: "Aprox. 2.2 kg • Más elegido",
            extraPrice: 5000,
            isDefault: true,
          },
          {
            id: "grande",
            name: "Grande Fiesta (22-25 porciones)",
            description: "Aprox. 3.0 kg",
            extraPrice: 9500,
          },
        ],
      },
      {
        id: "dedicatoria",
        title: "Mensaje en chocolate sobre placa artesanal",
        required: false,
        type: "text",
        placeholder: "Ej: ¡Feliz Cumple Mamá!",
        maxLength: 30,
      },
      {
        id: "velita",
        title: "Pack Velita dorada + Bengalita artesanal",
        required: false,
        type: "checkbox",
        extraPrice: 1200,
      },
    ],
  },
  {
    id: "vigilantes-sacramentos",
    nombre: "Vigilantes & Sacramentos con Membrillo",
    categoría: "facturas",
    precio: 4800,
    unidad: "docena",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuA622kObrF5cCZyg2fS-OJSc04eMz5RUBcU3Qlw7fC3ecqDYwrgXVXNychqmMgBLq1vwQSkm8ZrVqNN6ecTwqvqwkIZW7zw7VWYNL_hrBROlr91cirKDnxEP3kmNW7UW09Q8ZtPzDetADt8BKQ84QqqMg_J02QGrw-HuH2AhZl86cHZhO0JxyYLWrMd2tWrnCCc3oZ74cPBHvgfKxf2GheXF_UiwnmD-IE3D7yRXkibBKTD8hYwJlLyRA",
    descripción: "Masa hojaldrada con grasa vacuna de primera, dulce de membrillo casero y lluvia de azúcar.",
    badge: "Por docena",
  },
  {
    id: "tarta-frutillas-pastelera",
    nombre: "Tarta de Frutillas con Pastelera",
    categoría: "tortas",
    precio: 16000,
    unidad: "unidad (24 cm)",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1r4um0x3OPk0O2Cs-BMyKu93jjcWQRmls_l-4m7rLfBVA-IsV-ncstoXZCzagOIQNkMdDQKvcfEcSKjhFEYe3dSxxYNj-_6oOKlq_ninrQNIqWJU1BbaNBvUXxFhdez0l7ReuJfi3FYVRdlyiWT7JRPNBKiTccQlrDlIrup7drVvRrgHzaixba2tX1gYOO12S-ar8LqYUyZG_pPZpyYxibWd4jFTsBzRjM5ACPzC6nQQN8vFu1crVgw",
    descripción: "Base sablée de manteca, suave crema pastelera con chaucha de vainilla natural y frutillas frescas de estación.",
    badge: "A pedido (24hs)",
    requiresLeadTime: true,
    leadTimeHours: 24,
    opciones: [
      {
        id: "tamano",
        title: "1. Seleccionar tamaño",
        required: true,
        type: "radio",
        choices: [
          {
            id: "mediana",
            name: "Mediana (24 cm • 8-10 porciones)",
            description: "Aprox. 1.4 kg",
            extraPrice: 0,
            isDefault: true,
          },
          {
            id: "grande",
            name: "Grande (28 cm • 12-14 porciones)",
            description: "Aprox. 2.0 kg",
            extraPrice: 4500,
          },
        ],
      },
      {
        id: "dedicatoria",
        title: "Mensaje en chocolate sobre placa artesanal",
        required: false,
        type: "text",
        placeholder: "Ej: ¡Feliz Aniversario!",
        maxLength: 30,
      },
      {
        id: "velita",
        title: "Pack Velita dorada + Bengalita artesanal",
        required: false,
        type: "checkbox",
        extraPrice: 1200,
      },
    ],
  },
  {
    id: "sandwiches-miga-especiales",
    nombre: "Sándwiches de Miga Jamón y Queso",
    categoría: "salados",
    precio: 6500,
    unidad: "docena",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwgvfBSyEbsNd1iZbYtY-0g0PLoLSxGzq7tF1Btmdn0Myw3Gx15m2RaCPasi6ZQZZacTNDTngTxYcAgjUkhKYcH5v9xkaA-J1qIGPYQP9R2bP72rRxu9wZqsWF-_FveVZHhZXuG3SwhWmQWkzQGcjL7EV8fSSqPia3hsSPwiVO2ogd3PwHbGOhjErDTKNf6bjkttmehuna-dlnSNbnd5FllmBEGSW4Vs4HEE5jKUJLS-9fah706TM2Mg",
    descripción: "Pan de miga casero extra blanco y húmedo, manteca untada a mano, jamón cocido natural y queso tybo suave.",
    badge: "Por docena",
    opciones: [
      {
        id: "variedad",
        title: "Variedad de miga",
        required: true,
        type: "radio",
        choices: [
          { id: "solo-jq", name: "12 Jamón y Queso clásico", extraPrice: 0, isDefault: true },
          { id: "surtido-tomate", name: "Surtido: 6 Jamón y Queso + 6 Jamón y Tomate", extraPrice: 500 },
          { id: "surtido-huevo", name: "Surtido: 6 Jamón y Queso + 6 Queso y Huevo", extraPrice: 500 },
        ],
      },
    ],
  },
  {
    id: "baguette-rustica",
    nombre: "Baguette Tradicional Francesa",
    categoría: "panes",
    precio: 1600,
    unidad: "unidad",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6muOweUlq1L5yVNpwoqfXRW6RtQb1g75X3TBEgfN41HGCInrkFMm7OdWZfIk1pyMLQmgQUBPiFpA5A12Xxy6QHe90wJya3GLCGYxfJpb0P1ss9scUpyufs08bznEzMvs8qO5q0QjzSXvxP2BS8tN1XM2pUqEU7JzIAVSq19GSIlrQTaOxmkcbqin1_p_Lne0ar2xyL0fXw5Ue-WBFbF8wqTMa2-cx6QSTtmnmOUgQwFZc1SirZK8fdw",
    descripción: "Miga aireada, alveolos abiertos y corteza ultra crocante. Horneada sobre piso de piedra.",
    badge: "Recién horneada",
  },
];
