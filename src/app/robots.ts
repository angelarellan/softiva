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
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      // Permisos explícitos para crawlers de motores de IA (GEO/AEO):
      // ya quedan cubiertos por la regla "*" de arriba, pero se listan
      // aparte para que quede explícito y a prueba de que alguna de
      // estas IAs cambie su comportamiento default frente a "*".
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
