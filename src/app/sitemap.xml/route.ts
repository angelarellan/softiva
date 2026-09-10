import { SITE_URL } from "@/lib/site";
import { LOCALES, localeHref } from "@/lib/i18n";

// Reemplaza al sitemap.ts basado en el file convention de Next: ese
// helper tipado (MetadataRoute.Sitemap) no expone forma de agregar una
// processing instruction cruda como <?xml-stylesheet?> al inicio del
// documento, así que se arma el XML a mano acá para poder referenciar
// sitemap.xsl (solo estético: hace que el navegador muestre una tabla
// prolija en vez del texto corrido de siempre al abrir el XML crudo).
// El contenido/estructura generado es idéntico al que producía
// sitemap.ts -- mismas URLs, mismos hreflang, mismo priority.
export const dynamic = "force-static";
export const revalidate = false;

const ROUTES = ["", "/servicios", "/portafolio", "/nosotros", "/contacto"];

export async function GET() {
  const lastModified = new Date().toISOString();

  const urls = ROUTES.flatMap((route) =>
    LOCALES.map((locale) => {
      const loc = `${SITE_URL}${localeHref(locale, route || "/")}`;
      const priority = route === "" ? "1" : "0.8";
      const alternates = [
        ...LOCALES.map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${localeHref(l, route || "/")}" />`
        ),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route || "/"}" />`,
      ].join("\n");

      return `<url>
<loc>${loc}</loc>
${alternates}
<lastmod>${lastModified}</lastmod>
<changefreq>monthly</changefreq>
<priority>${priority}</priority>
</url>`;
    })
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
