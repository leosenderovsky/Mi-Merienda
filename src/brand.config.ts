/**
 * CONFIGURACIÓN DE MARCA (BRAND CONFIG)
 * ============================================================================
 * Este es el único archivo de configuración que hace falta editar para adaptar
 * el sitio a un cliente nuevo (panadería, pastelería o cafetería de barrio).
 * 
 * Contiene: identidad de marca, paleta de colores, tipografías, número de WhatsApp,
 * redes sociales, textos del Hero, horarios de atención y opciones de entrega.
 * ============================================================================
 */

export interface BrandConfig {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    logoUrl: string;
    badgeHeroKicker: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
  };
  colors: {
    primary: string;
    primaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    surface: string;
    surfaceContainer: string;
    tertiary: string;
    tertiaryContainer: string;
  };
  contact: {
    whatsappNumber: string; // formato internacional sin signos ni espacios, ej: 5491145218890
    whatsappDisplay: string;
    instagramHandle: string;
    instagramUrl: string;
    address: string;
    city: string;
    scheduleWeekday: string;
    scheduleNote: string;
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
}

export const brandConfig: BrandConfig = {
  brand: {
    name: "Mi Merienda",
    tagline: "Horneando momentos felices desde 2009",
    subtagline: "Panadería & Pastelería Artesanal de Barrio",
    logoUrl: "/assets/logo/logo.png",
    badgeHeroKicker: "Tradición y cariño de barrio",
  },

  typography: {
    displayFont: "'Vollkorn', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
  },

  colors: {
    primary: "#422316",
    primaryContainer: "#5c382a",
    secondary: "#7e5700",
    secondaryContainer: "#fdbe50",
    surface: "#fdf9f3",
    surfaceContainer: "#f1ede7",
    tertiary: "#173022",
    tertiaryContainer: "#2d4637",
  },

  contact: {
    whatsappNumber: "5491145218890",
    whatsappDisplay: "+54 9 11 4521-8890",
    instagramHandle: "@mimerienda.panaderia",
    instagramUrl: "https://instagram.com/mimerienda.panaderia",
    address: "Av. San Martín 2840, Barrio Norte",
    city: "Buenos Aires",
    scheduleWeekday: "Martes a Domingo: 07:30 a 20:00 hs",
    scheduleNote: "Lunes cerrado por descanso de horno",
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
    demoBadge: "Marca, productos y precios de ejemplo — prototipo de demostración de sender.ia",
    footerNote: "Hecho con masa madre, harina orgánica y dedicación artesanal.",
  },

};

/**
 * Formateador de moneda argentina con punto separador de miles ($4.800)
 */
export function formatCurrency(amount: number): string {
  return "$" + amount.toLocaleString("es-AR");
}
