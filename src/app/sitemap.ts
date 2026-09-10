import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES, localeHref } from "@/lib/i18n";

const ROUTES = ["", "/servicios", "/portafolio", "/nosotros", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localeHref(locale, route || "/")}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...LOCALES.map((l) => [l, `${SITE_URL}${localeHref(l, route || "/")}`]),
          ["x-default", `${SITE_URL}${route || "/"}`],
        ]),
      },
    }))
  );
}
