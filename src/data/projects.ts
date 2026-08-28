export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "nebula-store",
    title: "Nébula Store",
    category: "E-commerce · Shopify",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tienda online de indumentaria con checkout optimizado y una experiencia de compra fluida en mobile, logrando reducir el abandono de carrito.",
    tags: ["Shopify", "E-commerce", "UI/UX"],
  },
  {
    slug: "vertice-studio",
    title: "Vértice Studio",
    category: "Landing Page · Branding",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Landing page e identidad visual completa para un estudio creativo, con animaciones sutiles que refuerzan su propuesta de valor.",
    tags: ["Branding", "Landing Page", "Next.js"],
  },
  {
    slug: "aurea-finance",
    title: "Aurea Finance",
    category: "Web App · Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description:
      "Dashboard financiero con visualización de datos en tiempo real, pensado para que equipos no técnicos tomen decisiones rápidas.",
    tags: ["Web App", "Dashboard", "Data Viz"],
  },
  {
    slug: "lumen-real-estate",
    title: "Lumen Real Estate",
    category: "Sitio Corporativo",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sitio corporativo para una inmobiliaria, con buscador de propiedades filtrable y formularios de contacto integrados a su CRM.",
    tags: ["Corporativo", "SEO", "CRM"],
  },
  {
    slug: "orbita-fitness",
    title: "Órbita Fitness",
    category: "Landing Page · UI/UX",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Landing page de alta conversión para un estudio de entrenamiento, con formulario de reserva de clases y testimonios en video.",
    tags: ["Landing Page", "UI/UX", "Conversión"],
  },
  {
    slug: "prisma-legal",
    title: "Prisma Legal",
    category: "Sitio Corporativo · SEO",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sitio institucional para un estudio jurídico, optimizado para SEO local y con una estructura de contenidos pensada para captar consultas.",
    tags: ["Corporativo", "SEO Local"],
  },
];
