import {
  Sparkles,
  Globe,
  Target,
  Image as ImageIcon,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type ServicePlan = {
  slug: string;
  title: string;
  summary: string;
  features: string[];
  badge?: string;
};

export type ServiceCategory = {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  plans: ServicePlan[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "branding",
    icon: Sparkles,
    title: "Branding & Presencia Digital",
    summary: "Nombre, logo e identidad de marca para arrancar con el pie derecho.",
    description:
      "Construimos las bases de tu marca: identidad visual, cuentas empresariales configuradas y los primeros contenidos listos para publicar.",
    plans: [
      {
        slug: "plan-emprende",
        title: "Plan Emprende",
        summary:
          "Nace tu marca: identidad visual completa y presencia inicial lista para publicar.",
        badge: "Ideal para empezar",
        features: [
          "Creación de nombre, logo e identidad de marca",
          "Configuración de cuentas empresariales (Facebook, Instagram, Google)",
          "12 publicaciones iniciales con línea gráfica",
          "Configuración de portafolio publicitario",
        ],
      },
    ],
  },
  {
    slug: "desarrollo-web-ecommerce",
    icon: Globe,
    title: "Desarrollo Web & Ecommerce",
    summary: "Sitios y tiendas online rápidas, responsive y listas para vender.",
    description:
      "Sitios web y tiendas online a medida, optimizados para conversión y con hosting incluido.",
    plans: [
      {
        slug: "creacion-web-tiendas",
        title: "Creación Web & Tiendas Online",
        summary:
          "Sitios web y tiendas Ecommerce optimizadas, con hosting incluido.",
        badge: "Más elegido",
        features: [
          "Sitios web optimizados y 100% responsive",
          "Hosting y dominio incluido por 1 año",
          "Tiendas Ecommerce de hasta 100 productos",
          "WhatsApp flotante integrado",
        ],
      },
    ],
  },
  {
    slug: "marketing-performance",
    icon: Target,
    title: "Marketing Digital & Performance",
    summary: "Campañas de Meta Ads, Google Ads y estrategias omnicanal que convierten.",
    description:
      "Paid media con foco en resultados: campañas, tracking técnico y estrategias de remarketing en Meta y Google para captar y convertir más clientes.",
    plans: [
      {
        slug: "meta-ads",
        title: "Meta Ads Completo",
        summary:
          "Campañas publicitarias en Facebook, Instagram y WhatsApp con tracking completo.",
        features: [
          "Campañas publicitarias en Facebook, Instagram y WhatsApp",
          "Gestión unificada de mensajes",
          "Instalación técnica completa (GA4, Pixel, GTM, eventos)",
          "Estrategias de remarketing y prospección",
        ],
      },
      {
        slug: "google-ads",
        title: "Google Ads Completo",
        summary:
          "Posicionamiento en Google Shopping, Search y Display con foco en conversión.",
        features: [
          "Posicionamiento en Google Shopping, Search y Display",
          "Optimización continua de conversiones",
          "Mejoras de visibilidad y SEO técnico",
        ],
      },
      {
        slug: "combo-growth",
        title: "Combo Growth",
        summary:
          "Estrategia omnicanal para maximizar conversiones al menor costo posible.",
        badge: "Máximo impacto",
        features: [
          "Estrategia omnicanal: Meta Ads + Google Ads + SEO + mejoras visuales",
          "Tráfico cíclico y remarketing cruzado",
          "Gestión unificada de clientes",
          "Enfoque en maximizar conversiones al menor costo",
        ],
      },
    ],
  },
  {
    slug: "contenido-redes",
    icon: ImageIcon,
    title: "Gestión de Contenido & Redes Sociales",
    summary: "Contenido planificado mes a mes para mantener tus redes siempre activas.",
    description:
      "Planificamos, redactamos y diseñamos el contenido de tus redes sociales, con línea gráfica propia y temas adaptados a tu negocio.",
    plans: [
      {
        slug: "plan-imagenes",
        title: "Plan Imágenes",
        summary:
          "12 imágenes mensuales con línea gráfica propia y copywriting incluido.",
        features: [
          "12 imágenes mensuales con línea gráfica personalizada",
          "Planificación de contenido",
          "Copywriting por publicación",
          "12 temas adaptables al negocio",
        ],
      },
      {
        slug: "plan-reels",
        title: "Plan Reels + Contenido Dinámico",
        summary:
          "6 Reels + 6 imágenes mensuales con planificación estratégica.",
        badge: "Contenido dinámico",
        features: [
          "6 Reels + 6 imágenes mensuales",
          "Planificación estratégica de contenido",
          "Redacción de textos (copywriting)",
          "Temas adaptables a la marca",
        ],
      },
    ],
  },
  {
    slug: "formacion",
    icon: GraduationCap,
    title: "Formación & Capacitación",
    summary: "Cursos de marketing digital por niveles, de fundamentos a estrategia avanzada.",
    description:
      "Formación práctica para que tu equipo o vos mismo puedan gestionar y potenciar la presencia digital de tu negocio.",
    plans: [
      {
        slug: "cursos-marketing-digital",
        title: "Cursos de Marketing Digital",
        summary: "Formación por niveles, de los fundamentos a la analítica avanzada.",
        features: [
          "Nivel 1: Fundamentos del marketing digital",
          "Nivel 2: SEO y Google Ads",
          "Nivel 3: Meta Ads y Redes Sociales",
          "Nivel 4: Estrategias avanzadas y analítica",
        ],
      },
    ],
  },
];
