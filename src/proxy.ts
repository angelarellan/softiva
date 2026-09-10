import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Esta versión de Next.js renombró "middleware.ts" a "proxy.ts" (deprecó
// el nombre viejo). Todas las rutas públicas viven en app/[lang]/..., pero
// el español (idioma por defecto) no debe llevar prefijo en la URL para no
// romper las rutas ya indexadas (/, /servicios, etc.). Este proxy reescribe
// internamente esas rutas a /es/... -- la URL que ve el usuario/Google no
// cambia. El inglés (/en/...) ya matchea el segmento [lang] directo, sin
// necesidad de reescritura.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Cualquier archivo estático real (robots.txt, sitemap.xml, sitemap.xsl,
  // favicon.ico, imágenes, video, fuentes, etc.) tiene un punto en su
  // último segmento -- a diferencia de una ruta de página real
  // (/, /servicios, /contacto), que nunca lo tiene. Se excluye por esta
  // regla general en vez de mantener una lista de extensiones a mano:
  // ya se nos había escapado ".xsl" de esa lista una vez y rompió
  // /sitemap.xsl con un 404 (se reescribía a /es/sitemap.xsl, que no
  // existe).
  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/es${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Todo excepto _next y api -- el resto de la exclusión (archivos
    // estáticos) se resuelve arriba, adentro de la función.
    "/((?!_next|api).*)",
  ],
};
