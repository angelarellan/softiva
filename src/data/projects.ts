export type Project = {
  slug: string;
  title: string;
  category: string;
  gradient: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "nebula-store",
    title: "Nébula Store",
    category: "E-commerce · Shopify",
    gradient: "from-blue-400 via-indigo-500 to-violet-500",
    description:
      "Tienda online de indumentaria con checkout optimizado y una experiencia de compra fluida en mobile, logrando reducir el abandono de carrito.",
    tags: ["Shopify", "E-commerce", "UI/UX"],
  },
  {
    slug: "vertice-studio",
    title: "Vértice Studio",
    category: "Landing Page · Branding",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-400",
    description:
      "Landing page e identidad visual completa para un estudio creativo, con animaciones sutiles que refuerzan su propuesta de valor.",
    tags: ["Branding", "Landing Page", "Next.js"],
  },
  {
    slug: "aurea-finance",
    title: "Aurea Finance",
    category: "Web App · Dashboard",
    gradient: "from-cyan-400 via-blue-400 to-indigo-500",
    description:
      "Dashboard financiero con visualización de datos en tiempo real, pensado para que equipos no técnicos tomen decisiones rápidas.",
    tags: ["Web App", "Dashboard", "Data Viz"],
  },
  {
    slug: "lumen-real-estate",
    title: "Lumen Real Estate",
    category: "Sitio Corporativo",
    gradient: "from-indigo-400 via-purple-400 to-fuchsia-500",
    description:
      "Sitio corporativo para una inmobiliaria, con buscador de propiedades filtrable y formularios de contacto integrados a su CRM.",
    tags: ["Corporativo", "SEO", "CRM"],
  },
  {
    slug: "orbita-fitness",
    title: "Órbita Fitness",
    category: "Landing Page · UI/UX",
    gradient: "from-sky-400 via-blue-400 to-violet-400",
    description:
      "Landing page de alta conversión para un estudio de entrenamiento, con formulario de reserva de clases y testimonios en video.",
    tags: ["Landing Page", "UI/UX", "Conversión"],
  },
  {
    slug: "prisma-legal",
    title: "Prisma Legal",
    category: "Sitio Corporativo · SEO",
    gradient: "from-purple-400 via-violet-400 to-blue-500",
    description:
      "Sitio institucional para un estudio jurídico, optimizado para SEO local y con una estructura de contenidos pensada para captar consultas.",
    tags: ["Corporativo", "SEO Local"],
  },
];
