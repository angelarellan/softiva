import { Code2, PenTool, Wrench, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "desarrollo-web",
    icon: Code2,
    title: "Desarrollo Web & Landing Pages",
    summary:
      "Sitios rápidos, adaptables y optimizados para convertir visitantes en clientes.",
    description:
      "Construimos sitios web y landing pages a medida, con foco en la performance y en la conversión. Cada proyecto se desarrolla con tecnología moderna, arquitectura escalable y una experiencia de usuario pensada para acompañar el crecimiento de tu negocio.",
    features: [
      "Diseño responsive para todos los dispositivos",
      "Optimización de velocidad y Core Web Vitals",
      "Integración con CMS, pasarelas de pago y CRMs",
      "SEO técnico desde el primer commit",
      "Analítica y seguimiento de conversiones",
    ],
  },
  {
    slug: "diseno-uiux",
    icon: PenTool,
    title: "Diseño UI/UX & Figma",
    summary:
      "Interfaces modernas, identidad de marca y prototipos que convierten visitantes en clientes.",
    description:
      "Diseñamos interfaces claras y atractivas, con procesos de investigación y prototipado en Figma. Trabajamos la identidad visual de tu marca para que cada pantalla comunique profesionalismo y genere confianza en quien te visita.",
    features: [
      "Investigación de usuarios y arquitectura de información",
      "Wireframes y prototipos interactivos en Figma",
      "Sistemas de diseño y guías de marca",
      "Pruebas de usabilidad antes del desarrollo",
      "Handoff detallado para el equipo de desarrollo",
    ],
  },
  {
    slug: "mantenimiento-web",
    icon: Wrench,
    title: "Mantenimiento Web",
    summary:
      "Velocidad, SEO y hosting gestionados de forma continua para que tu sitio esté siempre online.",
    description:
      "Nos encargamos de que tu sitio funcione siempre a la perfección: actualizaciones de seguridad, monitoreo de velocidad, copias de respaldo y mejoras continuas de SEO para que tu presencia digital crezca mes a mes.",
    features: [
      "Monitoreo de uptime y velocidad 24/7",
      "Actualizaciones de seguridad y backups periódicos",
      "Mejoras continuas de SEO on-page",
      "Gestión de hosting y dominios",
      "Soporte técnico prioritario",
    ],
  },
];
