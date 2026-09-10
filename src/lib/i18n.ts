export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export const hasLocale = (locale: string): locale is Locale =>
  (LOCALES as string[]).includes(locale);

// El español (idioma por defecto) no lleva prefijo en la URL -- las rutas
// existentes (/, /servicios, etc.) no cambian, así que no se pierde nada
// del SEO/indexación ya acumulado. El inglés vive bajo /en/... El proxy
// (proxy.ts) es quien reescribe internamente "/" -> "/es" para que
// coincida con el segmento [lang] real sin que la URL visible cambie.
export function localeHref(locale: Locale, path: string): string {
  if (locale === "es") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

// `path` siempre es la variante canónica sin prefijo (ej: "/", "/servicios").
// Devuelve el canonical de la página actual + las variantes hreflang de
// cada idioma, para que Google indexe ambas versiones como traducciones
// entre sí en vez de como contenido duplicado.
export function buildAlternates(locale: Locale, path: string, siteUrl: string) {
  return {
    canonical: `${siteUrl}${localeHref(locale, path)}`,
    languages: {
      es: `${siteUrl}${path}`,
      en: `${siteUrl}${localeHref("en", path)}`,
      "x-default": `${siteUrl}${path}`,
    },
  };
}
