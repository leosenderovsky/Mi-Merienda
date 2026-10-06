/**
 * CONFIGURACIÓN DE MARCA (BRAND CONFIG)
 * ============================================================================
 * Editá este archivo, public/assets y el catálogo para adaptar el sitio a un
 * cliente nuevo (panadería, pastelería o cafetería de barrio).
 * 
 * Contiene: identidad de marca, paleta de colores, tipografías, número de WhatsApp,
 * redes sociales, textos del Hero, horarios de atención y opciones de entrega.
 * ============================================================================
 */

import { getDemoLegend } from './demoBanner.config.ts';

export interface BrandConfig {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    logoUrl: string;
    favicon32Url: string;
    appleTouchIconUrl: string;
    badgeHeroKicker: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
    stylesheetUrl: string;
  };
  theme: {
    primary: string;
    primaryContainer: string;
    primaryFixed: string;
    onPrimaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    secondaryFixed: string;
    onSecondaryFixed: string;
    onSecondaryContainer: string;
    secondaryEmphasis: string;
    surface: string;
    surfaceContainer: string;
    surfaceContainerLow: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    tertiary: string;
    tertiaryContainer: string;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryMuted: string;
    error: string;
    errorContainer: string;
  };
  contact: {
    // DATOS DE EJEMPLO, reemplazar por cliente
    whatsappNumber: string; // formato internacional sin signos ni espacios, ej: 5491145218890
    // DATOS DE EJEMPLO, reemplazar por cliente
    whatsappDisplay: string;
    phonePlaceholder: string;
    customerNamePlaceholder: string;
    addressPlaceholder: string;
    addressDetailPlaceholder: string;
    instagramHandle: string;
    instagramUrl: string;
    // DATOS DE EJEMPLO, reemplazar por cliente
    address: string;
    city: string;
    // DATOS DE EJEMPLO, reemplazar por cliente
    scheduleWeekday: string;
    scheduleNote: string;
    // DATOS DE EJEMPLO, reemplazar por cliente
    closedWeekdays: number[];
  };
  delivery: {
    pickup: {
      title: string;
      price: number;
      label: string;
      description: string;
    };
    delivery: {
      title: string;
      price: number;
      label: string;
      description: string;
    };
    // DATOS DE EJEMPLO, reemplazar por cliente
    timeSlots: string[];
    leadNoticeCake: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badges: Array<{
      text: string;
      icon: string;
      style: 'secondary' | 'tertiary';
    }>;
    heroImage: string;
  };
  orderSteps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  disclaimer: {
    demoBadge: string;
    footerNote: string;
  };
  demo: {
    showPrototypeBanner: boolean;
    /** Activa los datos de ejemplo del checkout para demostraciones. Desactivado por defecto. */
    prefillCheckout: boolean;
    checkoutDefaults: {
      name: string;
      address: string;
      addressDetail: string;
      notes: string;
    };
  };
  storage: {
    cartKey: string;
  };
  seo: {
    titleSuffix: string;
    description: string;
    socialImage: string;
  };
}

export const brandConfig: BrandConfig = {
  brand: {
    name: "Mi Merienda",
    tagline: "Horneando momentos felices desde 2009",
    subtagline: "Panadería & Pastelería Artesanal de Barrio",
    logoUrl: "/assets/logo/logo.png",
    favicon32Url: "/assets/logo/favicon-32.png",
    appleTouchIconUrl: "/assets/logo/apple-touch-icon.png",
    badgeHeroKicker: "Tradición y cariño de barrio",
  },

  typography: {
    displayFont: "'Vollkorn', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    stylesheetUrl:
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Vollkorn:ital,wght@0,600;0,700;1,600&display=swap",
  },

  theme: {
    primary: "#422316",
    primaryContainer: "#5c382a",
    primaryFixed: "#ffdbce",
    onPrimaryContainer: "#d4a28f",
    secondary: "#7e5700",
    secondaryContainer: "#fdbe50",
    secondaryFixed: "#ffdead",
    onSecondaryFixed: "#281900",
    onSecondaryContainer: "#714d00",
    secondaryEmphasis: "#604100",
    surface: "#fdf9f3",
    surfaceContainer: "#f1ede7",
    surfaceContainerLow: "#f7f3ed",
    surfaceContainerHigh: "#ebe8e2",
    surfaceContainerHighest: "#e6e2dc",
    onSurface: "#1c1c18",
    onSurfaceVariant: "#514440",
    outline: "#83746f",
    outlineVariant: "#d5c3bd",
    tertiary: "#173022",
    tertiaryContainer: "#2d4637",
    tertiaryFixed: "#cdead5",
    onTertiaryFixed: "#072013",
    tertiaryMuted: "#b1cdb9",
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
  },

  contact: {
    // DATOS DE EJEMPLO, reemplazar por cliente
    whatsappNumber: "5491145218890",
    // DATOS DE EJEMPLO, reemplazar por cliente
    whatsappDisplay: "+54 9 11 4521-8890",
    phonePlaceholder: "+54 9 11 ...",
    customerNamePlaceholder: "Ej: Valeria Gómez",
    addressPlaceholder: "Calle y altura (ej: Thames 1840)",
    addressDetailPlaceholder: "Piso / Depto / Timbre (ej: 4to B)",
    instagramHandle: "@mimerienda.panaderia",
    instagramUrl: "https://instagram.com/mimerienda.panaderia",
    // DATOS DE EJEMPLO, reemplazar por cliente
    address: "Av. San Martín 2840, Barrio Norte",
    city: "Buenos Aires",
    // DATOS DE EJEMPLO, reemplazar por cliente
    scheduleWeekday: "Martes a Domingo: 07:30 a 20:00 hs",
    scheduleNote: "Lunes cerrado por descanso de horno",
    // DATOS DE EJEMPLO, reemplazar por cliente
    closedWeekdays: [1],
  },

  delivery: {
    pickup: {
      title: "Retiro en el local",
      price: 0,
      label: "Gratis",
      description: "Av. San Martín 2840 • Horario a convenir",
    },
    delivery: {
      title: "Envío en el barrio",
      price: 1500,
      label: "+$1.500",
      description: "Reparto seguro en bicicleta y auto térmico",
    },
    // DATOS DE EJEMPLO, reemplazar por cliente
    timeSlots: [
      "Turno Mañana (10:00 a 12:30 hs)",
      "Turno Tarde (16:30 a 18:30 hs)",
      "Turno Cierre (18:30 a 20:00 hs)",
    ],
    leadNoticeCake:
      "Tu pedido incluye productos del día y una torta artesanal por encargo que requiere 48 hs de anticipación.",
  },

  hero: {
    kicker: "Tradición y cariño de barrio",
    title: "El sabor del barrio, horneado con amor cada mañana",
    description:
      "Panadería y pastelería artesanal. Productos frescos del día y pedidos especiales por encargo para tus momentos dulces.",
    ctaPrimary: "Ver catálogo del día",
    ctaSecondary: "Atención por WhatsApp",
    badges: [
      {
        text: "Hornadas cada 2 hs",
        icon: "local_fire_department",
        style: "secondary",
      },
      {
        text: "100% Masa Madre",
        icon: "eco",
        style: "tertiary",
      },
    ],
    heroImage: "/assets/hero/hero-1.jpg",
  },

  orderSteps: [
    {
      step: 1,
      title: "Elegí tus favoritos",
      description:
        "Seleccioná facturas del día o programá tortas con anticipación de 48hs.",
    },
    {
      step: 2,
      title: "Completá tus datos",
      description:
        "Elegí retiro sin cargo en nuestro local o entrega express en el barrio.",
    },
    {
      step: 3,
      title: "Confirmación directa por WhatsApp",
      description:
        "Te enviamos el resumen, coordinás el abono y recibís aviso cuando esté listo.",
    },
  ],

  disclaimer: {
    demoBadge: getDemoLegend(),
    footerNote: "Hecho con masa madre, harina orgánica y dedicación artesanal.",
  },

  demo: {
    showPrototypeBanner: true,
    prefillCheckout: false,
    checkoutDefaults: {
      name: "Valeria Gómez",
      address: "Thames 1840",
      addressDetail: "4to B",
      notes: "Por favor avisarme cuando esté lista la torta para pasar a buscarla con tiempo. ¡Gracias!",
    },
  },

  storage: {
    cartKey: "mi_merienda_cart",
  },

  seo: {
    titleSuffix: "Panadería & Pastelería",
    description:
      "Panadería y pastelería artesanal Mi Merienda. Productos frescos del día y pedidos especiales por encargo.",
    socialImage: "/assets/misc/og-image.jpg",
  },
};

/**
 * Formateador de moneda argentina con punto separador de miles ($4.800)
 */
export function formatCurrency(amount: number): string {
  return "$" + amount.toLocaleString("es-AR");
}
