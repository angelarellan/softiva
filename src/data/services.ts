import {
  Sparkles,
  Globe,
  Target,
  Image as ImageIcon,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

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

const es: ServiceCategory[] = [
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
        summary: "Sitios web y tiendas Ecommerce optimizadas, con hosting incluido.",
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
        summary: "Estrategia omnicanal para maximizar conversiones al menor costo posible.",
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
        summary: "12 imágenes mensuales con línea gráfica propia y copywriting incluido.",
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
        summary: "6 Reels + 6 imágenes mensuales con planificación estratégica.",
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

const en: ServiceCategory[] = [
  {
    slug: "branding",
    icon: Sparkles,
    title: "Branding & Digital Presence",
    summary: "Name, logo, and brand identity to start off on the right foot.",
    description:
      "We build your brand's foundations: visual identity, business accounts set up, and your first pieces of content ready to publish.",
    plans: [
      {
        slug: "plan-emprende",
        title: "Launch Plan",
        summary: "Your brand is born: a complete visual identity and an initial presence ready to publish.",
        badge: "Great for getting started",
        features: [
          "Name, logo, and brand identity creation",
          "Business account setup (Facebook, Instagram, Google)",
          "12 initial posts with a custom visual style",
          "Ad account portfolio setup",
        ],
      },
    ],
  },
  {
    slug: "desarrollo-web-ecommerce",
    icon: Globe,
    title: "Web Development & Ecommerce",
    summary: "Fast, responsive sites and online stores, ready to sell.",
    description:
      "Custom websites and online stores, optimized for conversion and with hosting included.",
    plans: [
      {
        slug: "creacion-web-tiendas",
        title: "Website & Online Store Creation",
        summary: "Optimized websites and Ecommerce stores, with hosting included.",
        badge: "Most popular",
        features: [
          "Optimized, 100% responsive websites",
          "Hosting and domain included for 1 year",
          "Ecommerce stores with up to 100 products",
          "Integrated floating WhatsApp button",
        ],
      },
    ],
  },
  {
    slug: "marketing-performance",
    icon: Target,
    title: "Digital Marketing & Performance",
    summary: "Meta Ads, Google Ads campaigns, and omnichannel strategies that convert.",
    description:
      "Results-focused paid media: campaigns, technical tracking, and remarketing strategies on Meta and Google to capture and convert more customers.",
    plans: [
      {
        slug: "meta-ads",
        title: "Complete Meta Ads",
        summary: "Ad campaigns on Facebook, Instagram, and WhatsApp with full tracking.",
        features: [
          "Ad campaigns on Facebook, Instagram, and WhatsApp",
          "Unified message management",
          "Full technical setup (GA4, Pixel, GTM, events)",
          "Remarketing and prospecting strategies",
        ],
      },
      {
        slug: "google-ads",
        title: "Complete Google Ads",
        summary: "Positioning on Google Shopping, Search, and Display focused on conversion.",
        features: [
          "Positioning on Google Shopping, Search, and Display",
          "Ongoing conversion optimization",
          "Visibility and technical SEO improvements",
        ],
      },
      {
        slug: "combo-growth",
        title: "Growth Combo",
        summary: "An omnichannel strategy to maximize conversions at the lowest possible cost.",
        badge: "Maximum impact",
        features: [
          "Omnichannel strategy: Meta Ads + Google Ads + SEO + visual improvements",
          "Cyclical traffic and cross-remarketing",
          "Unified client management",
          "Focus on maximizing conversions at the lowest cost",
        ],
      },
    ],
  },
  {
    slug: "contenido-redes",
    icon: ImageIcon,
    title: "Content & Social Media Management",
    summary: "Content planned month by month to keep your social media always active.",
    description:
      "We plan, write, and design your social media content, with your own visual style and topics tailored to your business.",
    plans: [
      {
        slug: "plan-imagenes",
        title: "Images Plan",
        summary: "12 monthly images with your own visual style and copywriting included.",
        features: [
          "12 monthly images with a custom visual style",
          "Content planning",
          "Copywriting per post",
          "12 topics tailored to your business",
        ],
      },
      {
        slug: "plan-reels",
        title: "Reels + Dynamic Content Plan",
        summary: "6 Reels + 6 monthly images with strategic planning.",
        badge: "Dynamic content",
        features: [
          "6 Reels + 6 monthly images",
          "Strategic content planning",
          "Copywriting",
          "Topics tailored to your brand",
        ],
      },
    ],
  },
  {
    slug: "formacion",
    icon: GraduationCap,
    title: "Training & Coaching",
    summary: "Digital marketing courses by level, from fundamentals to advanced strategy.",
    description:
      "Hands-on training so your team (or you) can manage and grow your business's digital presence.",
    plans: [
      {
        slug: "cursos-marketing-digital",
        title: "Digital Marketing Courses",
        summary: "Level-based training, from the fundamentals to advanced analytics.",
        features: [
          "Level 1: Digital marketing fundamentals",
          "Level 2: SEO and Google Ads",
          "Level 3: Meta Ads and Social Media",
          "Level 4: Advanced strategies and analytics",
        ],
      },
    ],
  },
];

export const serviceCategoriesByLocale: Record<Locale, ServiceCategory[]> = { es, en };
