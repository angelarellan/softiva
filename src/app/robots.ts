import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Vercel setea VERCEL_ENV distinto por deployment: "production" solo en el
// build atado al dominio de producción, "preview" en cada *.vercel.app de
// rama/PR. Se evalúa en build time (sin headers()/cookies()), así que esta
// ruta se sigue generando como estática -- Vercel simplemente construye un
// robots.txt distinto por entorno.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
